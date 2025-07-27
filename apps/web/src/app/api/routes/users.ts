import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import type { AppEnv } from "@/app/api/[[...route]]/route"; // Adjust if AppEnv moves
import type { User, PaginatedResponse, ApiResponse } from "@/app/api/types"; // Adjust if types move

// --- Schemas (ported from src/app/api/core/route.ts) ---
const querySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
  search: z.string().optional(),
});

const createUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field (name or email) must be provided for update",
  });

// --- Error Handling Helper (adapted for Hono) ---
const handleRouteError = (error: any, defaultMessage: string, c: any) => {
  console.error(`Error: ${defaultMessage}:`, error);
  let message = defaultMessage;
  let status = 500;

  if (error?.code === "PGRST116" || error?.message?.includes("PGRST116")) {
    // Suabase v2/v3 check
    message = "Resource not found";
    status = 404;
  } else if (error?.code === "23505" || error?.message?.includes("23505")) {
    // Uniqueness violation
    message = "Resource already exists or conflicts with existing data";
    status = 409;
  } else if (error instanceof z.ZodError) {
    throw new HTTPException(400, {
      message: "Invalid input",
      cause: error.errors,
    });
  }
  throw new HTTPException(status, { message });
};

// --- Hono Router for Users ---
export const setupUserRoutes = (app: Hono<AppEnv>) => {
  const users = new Hono<AppEnv>();

  // Middleware: Check for authenticated user for all user routes
  users.use("*", async (c, next) => {
    const user = c.get("user");
    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }
    await next();
  });

  // GET / (List Users)
  users.get("/", async (c) => {
    try {
      const validationResult = querySchema.safeParse(c.req.query());
      if (!validationResult.success) {
        throw new HTTPException(400, {
          message: "Invalid query parameters",
          cause: validationResult.error.errors,
        });
      }
      const { page, limit, search } = validationResult.data;
      const offset = (page - 1) * limit;
      const db = c.get("db");

      let query = db
        .from("users")
        .select("id, name, email, created_at", { count: "exact" });

      if (search) {
        query = query.ilike("name", `%${search}%`); // Ensure your 'users' table and RLS allow this
      }

      const { data, count, error } = await query
        .range(offset, offset + limit - 1)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const responseData: PaginatedResponse<Partial<User>> = {
        data: data || [],
        pagination: {
          total: count || 0,
          page,
          limit,
          hasMore: (count || 0) > offset + (data?.length || 0),
        },
      };
      const apiResponse: ApiResponse<PaginatedResponse<Partial<User>>> = {
        data: responseData,
      };
      return c.json(apiResponse);
    } catch (error) {
      return handleRouteError(error, "Error fetching users", c);
    }
  });

  // POST / (Create User)
  users.post("/", async (c) => {
    try {
      const rawBody = await c.req.json();
      const validationResult = createUserSchema.safeParse(rawBody);
      if (!validationResult.success) {
        throw new HTTPException(400, {
          message: "Invalid request body",
          cause: validationResult.error.errors,
        });
      }
      const { name, email } = validationResult.data;
      const db = c.get("db");

      const { data: existingUser, error: checkError } = await db
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") {
        // Ignore not found for maybeSingle
        console.error("Error checking for existing user:", checkError);
        // Potentially throw, but be careful not to mask the 409 below
      }
      if (existingUser) {
        return handleRouteError({ code: "23505" }, "User already exists", c);
      }

      const { data: newUser, error: insertError } = await db
        .from("users")
        .insert({ name, email })
        .select("id, name, email, created_at")
        .single();

      if (insertError) throw insertError;
      if (!newUser) throw new Error("User data was not returned after insert.");

      const apiResponse: ApiResponse<Partial<User>> = { data: newUser };
      return c.json(apiResponse, 201);
    } catch (error) {
      return handleRouteError(error, "Error creating user", c);
    }
  });

  // GET /:id (Get User by ID)
  users.get("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      if (!id) {
        throw new HTTPException(400, { message: "User ID is required" });
      }
      const db = c.get("db");
      const { data: user, error } = await db
        .from("users")
        .select("id, name, email, created_at")
        .eq("id", id)
        .single();

      if (error) throw error; // This will be caught by handleRouteError, PGRST116 for not found

      const apiResponse: ApiResponse<Partial<User>> = { data: user };
      return c.json(apiResponse);
    } catch (error) {
      return handleRouteError(error, "Error fetching user", c);
    }
  });

  // PATCH /:id (Update User)
  users.patch("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      if (!id) {
        throw new HTTPException(400, { message: "User ID is required" });
      }

      const rawBody = await c.req.json();
      const validationResult = updateUserSchema.safeParse(rawBody);
      if (!validationResult.success) {
        throw new HTTPException(400, {
          message: "Invalid request body",
          cause: validationResult.error.errors,
        });
      }
      const updateData = validationResult.data;
      const db = c.get("db");

      const { data: updatedUser, error } = await db
        .from("users")
        .update(updateData)
        .eq("id", id)
        .select("id, name, email, created_at")
        .single();

      if (error) throw error;
      if (!updatedUser)
        throw new Error("User data was not returned after update."); // Should be caught by PGRST116 if not found

      const apiResponse: ApiResponse<Partial<User>> = { data: updatedUser };
      return c.json(apiResponse);
    } catch (error) {
      return handleRouteError(error, "Error updating user", c);
    }
  });

  // DELETE /:id (Delete User)
  users.delete("/:id", async (c) => {
    try {
      const id = c.req.param("id");
      if (!id) {
        throw new HTTPException(400, { message: "User ID is required" });
      }
      const db = c.get("db");

      // Check if user exists before deleting, to return 404 if not found
      const { data: existingUser, error: checkError } = await db
        .from("users")
        .select("id")
        .eq("id", id)
        .maybeSingle();

      if (checkError && checkError.code !== "PGRST116") throw checkError;
      if (!existingUser) {
        throw new HTTPException(404, { message: "User not found" });
      }

      const { error: deleteError } = await db
        .from("users")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      return c.json({ message: "User deleted successfully" }, 200);
    } catch (error) {
      return handleRouteError(error, "Error deleting user", c);
    }
  });

  return users;
};
