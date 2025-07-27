import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DEFAULT_MODEL_NAME } from "@/lib/ai/models";
import { auth } from "@/lib/auth"; // Assuming auth path
import { generateUUID } from "@/lib/utils"; // Assuming utils path

import ChatClientPage from "./chat-client-page"; // Import the new client component

// Server Component - Default export for the page
export default async function Page() {
  const supabaseSession = await auth();

  if (!supabaseSession) {
    redirect("/api/auth/guest"); // Ensure this redirect path is correct
  }

  // Adapt Supabase session
  const session = {
    ...supabaseSession,
    user: supabaseSession.user,
    expires: supabaseSession.expires_at
      ? new Date(supabaseSession.expires_at * 1000).toISOString()
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const id = generateUUID();
  const cookieStore = await cookies();
  const modelIdFromCookie =
    cookieStore.get("chat-model")?.value || DEFAULT_MODEL_NAME;

  return (
    <ChatClientPage
      session={session}
      id={id}
      initialChatModel={modelIdFromCookie}
    />
  );
}
