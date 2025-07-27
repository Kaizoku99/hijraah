(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  "chunks/[root-of-the-server]__1099446e._.js",
  {
    "[externals]/node:buffer [external] (node:buffer, cjs)": function (
      __turbopack_context__,
    ) {
      var {
        g: global,
        __dirname,
        m: module,
        e: exports,
      } = __turbopack_context__;
      {
        const mod = __turbopack_context__.x("node:buffer", () =>
          require("node:buffer"),
        );

        module.exports = mod;
      }
    },
    "[externals]/node:async_hooks [external] (node:async_hooks, cjs)":
      function (__turbopack_context__) {
        var {
          g: global,
          __dirname,
          m: module,
          e: exports,
        } = __turbopack_context__;
        {
          const mod = __turbopack_context__.x("node:async_hooks", () =>
            require("node:async_hooks"),
          );

          module.exports = mod;
        }
      },
    "[project]/apps/web/src/i18n/i18n.ts [middleware-edge] (ecmascript)": (
      __turbopack_context__,
    ) => {
      "use strict";

      var { g: global, __dirname } = __turbopack_context__;
      {
        /**
         * List of supported locales
         */ __turbopack_context__.s({
          defaultLocale: () => defaultLocale,
          getCalendarSystem: () => getCalendarSystem,
          getDateFormat: () => getDateFormat,
          getHtmlLang: () => getHtmlLang,
          getLocaleConfig: () => getLocaleConfig,
          getLocaleFont: () => getLocaleFont,
          isRTL: () => isRTL,
          localeConfigs: () => localeConfigs,
          locales: () => locales,
        });
        const locales = ["en", "ar", "es", "fr"];
        const defaultLocale = "en";
        const localeConfigs = {
          en: {
            nativeName: "English",
            englishName: "English",
            direction: "ltr",
            dateFormat: "MM/DD/YYYY",
            flag: "🇺🇸",
            htmlLang: "en",
            calendar: "gregory",
            number: {
              decimal: ".",
              thousands: ",",
            },
          },
          ar: {
            nativeName: "العربية",
            englishName: "Arabic",
            direction: "rtl",
            dateFormat: "DD/MM/YYYY",
            flag: "🇸🇦",
            htmlLang: "ar",
            calendar: "islamic",
            fontClass: "font-arabic",
            number: {
              decimal: "٫",
              thousands: "٬",
            },
          },
          fr: {
            nativeName: "Français",
            englishName: "French",
            direction: "ltr",
            dateFormat: "DD/MM/YYYY",
            flag: "🇫🇷",
            htmlLang: "fr",
            calendar: "gregory",
            number: {
              decimal: ",",
              thousands: " ",
            },
          },
          es: {
            nativeName: "Español",
            englishName: "Spanish",
            direction: "ltr",
            dateFormat: "DD/MM/YYYY",
            flag: "🇪🇸",
            htmlLang: "es",
            calendar: "gregory",
            number: {
              decimal: ",",
              thousands: ".",
            },
          },
        };
        function getLocaleConfig(locale) {
          return localeConfigs[locale] || localeConfigs[defaultLocale];
        }
        function isRTL(locale) {
          return getLocaleConfig(locale).direction === "rtl";
        }
        function getLocaleFont(locale) {
          return getLocaleConfig(locale).fontClass;
        }
        function getCalendarSystem(locale) {
          return getLocaleConfig(locale).calendar || "gregory";
        }
        function getHtmlLang(locale) {
          return getLocaleConfig(locale).htmlLang;
        }
        function getDateFormat(locale) {
          return getLocaleConfig(locale).dateFormat;
        }
      }
    },
    "[project]/apps/web/src/lib/supabase/middleware.ts [middleware-edge] (ecmascript)":
      (__turbopack_context__) => {
        "use strict";

        var { g: global, __dirname } = __turbopack_context__;
        {
          __turbopack_context__.s({
            updateSession: () => updateSession,
          });
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supaba_44edeb5a897948ab4aa73f364d88caba$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
            __turbopack_context__.i(
              "[project]/node_modules/.pnpm/@supabase+ssr@0.5.2_@supaba_44edeb5a897948ab4aa73f364d88caba/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <module evaluation>",
            );
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supaba_44edeb5a897948ab4aa73f364d88caba$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              "[project]/node_modules/.pnpm/@supabase+ssr@0.5.2_@supaba_44edeb5a897948ab4aa73f364d88caba/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)",
            );
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
            __turbopack_context__.i(
              "[project]/node_modules/.pnpm/next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>",
            );
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              "[project]/node_modules/.pnpm/next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)",
            );
          async function updateSession(request) {
            let response =
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                "NextResponse"
              ].next({
                request: {
                  headers: request.headers,
                },
              });
            const supabase = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supaba_44edeb5a897948ab4aa73f364d88caba$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "createServerClient"
            ])(
              process.env.NEXT_PUBLIC_SUPABASE_URL,
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
              {
                cookies: {
                  get(name) {
                    return request.cookies.get(name)?.value;
                  },
                  set(name, value, options) {
                    // This will set a cookie on the response
                    request.cookies.set(name, value);
                    response =
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                        "NextResponse"
                      ].next({
                        request: {
                          headers: request.headers,
                        },
                      });
                    response.cookies.set(name, value, options);
                  },
                  remove(name, options) {
                    // This will remove a cookie from the response
                    request.cookies.set(name, "");
                    response =
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                        "NextResponse"
                      ].next({
                        request: {
                          headers: request.headers,
                        },
                      });
                    response.cookies.set(name, "", {
                      ...options,
                      maxAge: 0,
                    });
                  },
                },
              },
            );
            // This will refresh the user's session if needed
            await supabase.auth.getUser();
            return response;
          }
        }
      },
    "[project]/apps/web/src/middleware.ts [middleware-edge] (ecmascript)": (
      __turbopack_context__,
    ) => {
      "use strict";

      var { g: global, __dirname } = __turbopack_context__;
      {
        /**
         * Root middleware
         */ __turbopack_context__.s({
          config: () => config,
          middleware: () => middleware,
        });
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
          __turbopack_context__.i(
            "[project]/node_modules/.pnpm/next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/.pnpm/next@15.3.0-canary.31_@babe_be67f368de2727c847f3a61f5e6cf4fa/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$3$2e$_7e4e666345518ee87977d0efacc37596$2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/.pnpm/next-intl@3.26.5_next@15.3._7e4e666345518ee87977d0efacc37596/node_modules/next-intl/dist/middleware.js [middleware-edge] (ecmascript)",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supaba_44edeb5a897948ab4aa73f364d88caba$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ =
          __turbopack_context__.i(
            "[project]/node_modules/.pnpm/@supabase+ssr@0.5.2_@supaba_44edeb5a897948ab4aa73f364d88caba/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <module evaluation>",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supaba_44edeb5a897948ab4aa73f364d88caba$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/node_modules/.pnpm/@supabase+ssr@0.5.2_@supaba_44edeb5a897948ab4aa73f364d88caba/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/apps/web/src/i18n/i18n.ts [middleware-edge] (ecmascript)",
          );
        var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            "[project]/apps/web/src/lib/supabase/middleware.ts [middleware-edge] (ecmascript)",
          );
        // Create i18n middleware
        const intlMiddleware = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$3$2e$_7e4e666345518ee87977d0efacc37596$2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
          "default"
        ])({
          // A list of all locales that are supported
          locales:
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "locales"
            ],
          // Used when no locale matches
          defaultLocale:
            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$i18n$2f$i18n$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "defaultLocale"
            ],
          // Set the locale prefix strategy: 'always' adds locale prefixes for all routes
          localePrefix: "always",
        });
        // Context7 - Provider Isolation: Middleware configuration with (ai-unified) routes
        const AUTH_ROUTES = ["/login", "/register", "/auth"];
        const PROTECTED_ROUTES = ["/dashboard", "/admin", "/profile"];
        const PUBLIC_ROUTES = ["/", "/about", "/contact", "/api/auth/guest"];
        const GUEST_ALLOWED_ROUTES = [
          "/chat",
          "/ai-unified/chat",
          "/artifacts",
          "/ai-unified/ocr",
          "/api/chat",
          "/api/(ai-unified)",
          "/api/artifacts",
          "/api/document",
          "/api/suggestions",
          "/api/vote",
        ];
        // Context7 - Data-as-Code: Route mapping for legacy to unified migration
        const LEGACY_ROUTE_MAPPINGS = {
          "/api/chat": "/api/(ai-unified)/api/chat",
          "/chat": "/ai-unified/chat",
          "/chat/new": "/ai-unified/chat/new",
          "/artifacts": "/ai-unified/chat",
        };
        /**
         * Create middleware context for observability
         * Context7 - Data-as-Code: Structured context creation
         */ function createMiddlewareContext(request) {
          const pathname = request.nextUrl.pathname;
          const userAgent = request.headers.get("user-agent") || "";
          const forwardedFor = request.headers.get("x-forwarded-for") || "";
          const realIp = request.headers.get("x-real-ip") || "";
          const ipAddress = forwardedFor.split(",")[0] || realIp || "unknown";
          return {
            pathname,
            isAuthRoute: AUTH_ROUTES.some((route) =>
              pathname.startsWith(route),
            ),
            isProtectedRoute: PROTECTED_ROUTES.some((route) =>
              pathname.startsWith(route),
            ),
            isPublicRoute: PUBLIC_ROUTES.some(
              (route) => pathname === route || pathname.startsWith(route),
            ),
            isGuestAllowedRoute: GUEST_ALLOWED_ROUTES.some((route) =>
              pathname.startsWith(route),
            ),
            userAgent: userAgent.substring(0, 100),
            ipAddress,
          };
        }
        /**
         * Check if user has guest session
         * Context7 - Provider Isolation: Guest session validation
         */ function hasGuestSession(request) {
          const isGuest =
            request.cookies.get("is_guest_user")?.value === "true";
          const guestData = request.cookies.get("guest_data")?.value;
          return isGuest && !!guestData;
        }
        /**
         * Create Supabase client for middleware
         * Context7 - Provider Isolation: Middleware-specific client
         */ function createMiddlewareSupabaseClient(request, response) {
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$5$2e$2_$40$supaba_44edeb5a897948ab4aa73f364d88caba$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
            "createServerClient"
          ])(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
              cookies: {
                get(name) {
                  return request.cookies.get(name)?.value;
                },
                set(name, value, options) {
                  response.cookies.set(name, value, options);
                },
                remove(name, options) {
                  response.cookies.set(name, "", {
                    ...options,
                    maxAge: 0,
                  });
                },
              },
              auth: {
                persistSession: true,
                autoRefreshToken: true,
              },
            },
          );
        }
        /**
         * Handle guest user redirect
         * Context7 - Modularity: Dedicated guest handling
         */ async function handleGuestUser(request, context) {
          // Allow guest users on guest-allowed routes
          if (context.isGuestAllowedRoute || context.isPublicRoute) {
            // Context7 - Observability: Log guest access
            console.log("Guest access granted:", {
              pathname: context.pathname,
              ip: context.ipAddress,
            });
            return null; // Continue processing
          }
          // Redirect guest users to guest signup for protected routes
          if (context.isProtectedRoute) {
            console.log("Guest redirected from protected route:", {
              pathname: context.pathname,
              ip: context.ipAddress,
            });
            const redirectUrl = new URL("/guest-signup", request.url);
            redirectUrl.searchParams.set("redirect", context.pathname);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "NextResponse"
            ].redirect(redirectUrl);
          }
          return null; // Continue processing
        }
        /**
         * Handle authenticated user
         * Context7 - Modularity: Authenticated user routing
         */ async function handleAuthenticatedUser(request, context, user) {
          // Redirect authenticated users away from auth routes
          if (context.isAuthRoute) {
            console.log("Authenticated user redirected from auth route:", {
              userId: user.id,
              pathname: context.pathname,
            });
            const redirectUrl = new URL("/dashboard", request.url);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "NextResponse"
            ].redirect(redirectUrl);
          }
          // Check role-based access for admin routes
          if (context.pathname.startsWith("/admin")) {
            const userRole = user.user_metadata?.role || "client";
            if (userRole !== "admin") {
              console.warn("Unauthorized admin access attempt:", {
                userId: user.id,
                role: userRole,
                pathname: context.pathname,
              });
              const redirectUrl = new URL("/unauthorized", request.url);
              return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                "NextResponse"
              ].redirect(redirectUrl);
            }
          }
          return null; // Continue processing
        }
        /**
         * Handle route mapping for legacy to unified migration
         * Context7 - Provider Isolation: Route migration strategy
         */ function handleRouteMigration(request) {
          const pathname = request.nextUrl.pathname;
          // Check for legacy route mappings
          for (const [legacyPath, unifiedPath] of Object.entries(
            LEGACY_ROUTE_MAPPINGS,
          )) {
            if (
              pathname === legacyPath ||
              pathname.startsWith(legacyPath + "/")
            ) {
              const newPathname = pathname.replace(legacyPath, unifiedPath);
              const redirectUrl = new URL(newPathname, request.url);
              // Preserve query parameters
              request.nextUrl.searchParams.forEach((value, key) => {
                redirectUrl.searchParams.set(key, value);
              });
              console.log("Route migration redirect:", {
                from: pathname,
                to: newPathname,
                preservedParams: Array.from(
                  request.nextUrl.searchParams.keys(),
                ),
              });
              return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                "NextResponse"
              ].redirect(redirectUrl, {
                status: 308,
              }); // Permanent redirect
            }
          }
          return null;
        }
        /**
         * Handle unauthenticated user
         * Context7 - Modularity: Unauthenticated user routing with unified endpoints
         */ async function handleUnauthenticatedUser(request, context) {
          // Allow access to public and auth routes
          if (context.isPublicRoute || context.isAuthRoute) {
            return null; // Continue processing
          }
          // Check if guest authentication is enabled for protected routes
          const guestAuthEnabled =
            process.env.NEXT_PUBLIC_GUEST_AUTH_ENABLED === "true";
          if (guestAuthEnabled && context.isGuestAllowedRoute) {
            // Automatically create guest session for allowed routes
            console.log("Creating guest session for unauthenticated user:", {
              pathname: context.pathname,
              ip: context.ipAddress,
            });
            const redirectUrl = new URL("/api/auth/guest", request.url);
            redirectUrl.searchParams.set("action", "create");
            redirectUrl.searchParams.set("redirect", context.pathname);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "NextResponse"
            ].redirect(redirectUrl);
          }
          // Redirect to login for protected routes
          if (context.isProtectedRoute) {
            console.log("Unauthenticated user redirected to login:", {
              pathname: context.pathname,
              ip: context.ipAddress,
            });
            const redirectUrl = new URL("/login", request.url);
            redirectUrl.searchParams.set("redirect", context.pathname);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
              "NextResponse"
            ].redirect(redirectUrl);
          }
          return null; // Continue processing
        }
        async function middleware(request) {
          try {
            // Context7 - Data-as-Code: Create structured context
            const context = createMiddlewareContext(request);
            // Skip middleware for static files and API routes (except auth)
            if (
              context.pathname.startsWith("/_next") ||
              context.pathname.startsWith("/static") ||
              context.pathname.includes(".") ||
              (context.pathname.startsWith("/api") &&
                !context.pathname.startsWith("/api/auth") &&
                !context.pathname.startsWith("/api/(ai-unified)"))
            ) {
              return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                "NextResponse"
              ].next();
            }
            // Context7 - Provider Isolation: Handle route migration first
            const migrationResponse = handleRouteMigration(request);
            if (migrationResponse) {
              return migrationResponse;
            }
            // Then handle authentication logic
            let authResponse = null;
            // Context7 - Provider Isolation: Check guest session first
            if (hasGuestSession(request)) {
              authResponse = await handleGuestUser(request, context);
            } else {
              // Create response for Supabase operations
              const response =
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$3$2e$0$2d$canary$2e$31_$40$babe_be67f368de2727c847f3a61f5e6cf4fa$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                  "NextResponse"
                ].next();
              // Check regular Supabase authentication
              const supabase = createMiddlewareSupabaseClient(
                request,
                response,
              );
              const {
                data: { user },
                error,
              } = await supabase.auth.getUser();
              if (!error && user) {
                // Handle authenticated user
                authResponse = await handleAuthenticatedUser(
                  request,
                  context,
                  user,
                );
              } else {
                // Handle unauthenticated user
                authResponse = await handleUnauthenticatedUser(
                  request,
                  context,
                );
              }
              // Update session for Supabase
              if (!authResponse) {
                authResponse = await (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__[
                  "updateSession"
                ])(request);
              }
            }
            // If auth handling returned a response (redirect), use it
            if (authResponse) {
              return authResponse;
            }
            // Context7 - Observability: Log successful requests
            if (("TURBOPACK compile-time truthy", 1)) {
              console.log("Middleware completed:", {
                pathname: context.pathname,
                ip: context.ipAddress,
                hasGuest: hasGuestSession(request),
              });
            }
            // Apply i18n middleware for routes that don't need auth redirects
            return intlMiddleware(request);
          } catch (error) {
            // Context7 - Observability: Error tracking
            console.error("Middleware error:", error);
            // In case of auth errors, apply i18n middleware
            return intlMiddleware(request);
          }
        }
        const config = {
          matcher: [
            /*
             * Match all request paths except for the ones starting with:
             * - _next/static (static files)
             * - _next/image (image optimization files)
             * - favicon.ico (favicon file)
             * - public files (public folder)
             */ "/((?!_next/static|_next/image|favicon.ico|public|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
          ],
        };
      }
    },
  },
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1099446e._.js.map
