try {
  let e =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    i = new e.Error().stack;
  i &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[i] = "451d5315-8a16-4a58-841c-a1df4abbd291"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-451d5315-8a16-4a58-841c-a1df4abbd291"));
} catch (e) {}
(() => {
  var e = {};
  (e.id = 249),
    (e.ids = [249]),
    (e.modules = {
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      8086: (e) => {
        "use strict";
        e.exports = require("module");
      },
      10846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      11362: (e, i, t) => {
        Promise.resolve().then(t.bind(t, 42350));
      },
      19121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      19771: (e) => {
        "use strict";
        e.exports = require("process");
      },
      21820: (e) => {
        "use strict";
        e.exports = require("os");
      },
      25754: (e, i, t) => {
        "use strict";
        t.r(i),
          t.d(i, {
            GlobalError: () => o.default,
            __next_app__: () => d,
            pages: () => l,
            routeModule: () => u,
            tree: () => c,
          });
        var r = t(11610),
          a = t(51293),
          o = t(59059),
          n = t(17770),
          s = {};
        for (let e in n)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (s[e] = () => n[e]);
        t.d(i, s);
        let c = {
            children: [
              "",
              {
                children: [
                  "(admin)",
                  {
                    children: [
                      "admin",
                      {
                        children: [
                          "emails",
                          {
                            children: [
                              "__PAGE__",
                              {},
                              {
                                page: [
                                  () =>
                                    Promise.resolve().then(t.bind(t, 42350)),
                                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\emails\\page.tsx",
                                ],
                              },
                            ],
                          },
                          {},
                        ],
                      },
                      {},
                    ],
                  },
                  {
                    forbidden: [
                      () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                      "next/dist/client/components/forbidden-error",
                    ],
                    unauthorized: [
                      () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                      "next/dist/client/components/unauthorized-error",
                    ],
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(t.bind(t, 22630)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\layout.tsx",
                ],
                error: [
                  () => Promise.resolve().then(t.bind(t, 94745)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\error.tsx",
                ],
                "global-error": [
                  () => Promise.resolve().then(t.bind(t, 59059)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\global-error.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(t.bind(t, 53974)),
                  "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\not-found.tsx",
                ],
                forbidden: [
                  () => Promise.resolve().then(t.t.bind(t, 57382, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(t.t.bind(t, 87039, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          l = [
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\emails\\page.tsx",
          ],
          d = { require: t, loadChunk: () => Promise.resolve() },
          u = new r.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/(admin)/admin/emails/page",
              pathname: "/admin/emails",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: c },
          });
      },
      27910: (e) => {
        "use strict";
        e.exports = require("stream");
      },
      28354: (e) => {
        "use strict";
        e.exports = require("util");
      },
      29021: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      29294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      31421: (e) => {
        "use strict";
        e.exports = require("node:child_process");
      },
      33873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      36686: (e) => {
        "use strict";
        e.exports = require("diagnostics_channel");
      },
      37067: (e) => {
        "use strict";
        e.exports = require("node:http");
      },
      38522: (e) => {
        "use strict";
        e.exports = require("node:zlib");
      },
      41692: (e) => {
        "use strict";
        e.exports = require("node:tls");
      },
      42350: (e, i, t) => {
        "use strict";
        let r;
        t.r(i),
          t.d(i, {
            default: () => m,
            generateImageMetadata: () => u,
            generateMetadata: () => d,
            generateViewport: () => p,
          });
        var a = t(63033),
          o = t(26394),
          n = t(60442),
          s = (0, o.registerClientReference)(
            function () {
              throw Error(
                "Attempted to call the default export of \"E:\\\\downloads\\\\Hijraah\\\\apps\\\\web\\\\src\\\\app\\\\(admin)\\\\admin\\\\emails\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
              );
            },
            "E:\\downloads\\Hijraah\\apps\\web\\src\\app\\(admin)\\admin\\emails\\page.tsx",
            "default",
          );
        let c = { ...a },
          l =
            "workUnitAsyncStorage" in c
              ? c.workUnitAsyncStorage
              : "requestAsyncStorage" in c
                ? c.requestAsyncStorage
                : void 0;
        r =
          "function" == typeof s
            ? new Proxy(s, {
                apply: (e, i, t) => {
                  let r, a, o;
                  try {
                    let e = l?.getStore();
                    (r = e?.headers.get("sentry-trace") ?? void 0),
                      (a = e?.headers.get("baggage") ?? void 0),
                      (o = e?.headers);
                  } catch (e) {}
                  return n
                    .wrapServerComponentWithSentry(e, {
                      componentRoute: "/(admin)/admin/emails",
                      componentType: "Page",
                      sentryTraceHeader: r,
                      baggageHeader: a,
                      headers: o,
                    })
                    .apply(i, t);
                },
              })
            : s;
        let d = void 0,
          u = void 0,
          p = void 0,
          m = r;
      },
      44708: (e) => {
        "use strict";
        e.exports = require("node:https");
      },
      45866: (e, i, t) => {
        Promise.resolve().then(t.bind(t, 51703));
      },
      48161: (e) => {
        "use strict";
        e.exports = require("node:os");
      },
      51703: (e, i, t) => {
        "use strict";
        t.r(i), t.d(i, { default: () => p });
        var r = t(61268),
          a = t(84205),
          o = t(89437);
        let n = {
          en: {
            common: {
              greeting: "Hello",
              footer: {
                copyright: "\xa9 {year} Hijraah. All rights reserved.",
                automated: "This is an automated message, please do not reply.",
              },
              cta: {
                ignore:
                  "If you didn't request this, you can safely ignore this email.",
                expiry: "This link will expire in {time}.",
                regards: "Best regards,",
                team: "The Hijraah Team",
              },
            },
            passwordReset: {
              subject: "Reset Your Password",
              previewText: "Reset your Hijraah password",
              title: "Reset Your Password",
              description:
                "We received a request to reset the password for your Hijraah account ({email}). Click the button below to reset it.",
              button: "Reset Password",
              ignoreText:
                "If you did not request a password reset, please ignore this email or contact us if you have questions.",
              expiryText: "This link is only valid for the next 24 hours.",
            },
            emailConfirmation: {
              subject: "Confirm Your Email",
              previewText: "Confirm your Hijraah email address",
              title: "Verify Your Email Address",
              description:
                "Thank you for signing up for Hijraah! Please confirm your email address by clicking the button below.",
              button: "Confirm Email Address",
              ignoreText:
                "If you didn't create an account with us, you can safely ignore this email.",
              expiryText:
                "This confirmation link will expire in 24 hours. If you don't confirm within that time, you'll need to sign up again.",
              welcomeText: "Welcome to Hijraah!",
            },
            magicLink: {
              subject: "Your Magic Link",
              previewText: "Sign in to your Hijraah account",
              title: "Sign In to Hijraah",
              description:
                "You requested to sign in to Hijraah using a magic link. Click the button below to securely sign in to your account.",
              button: "Sign In to Hijraah",
              ignoreText:
                "If you didn't request this login link, you can safely ignore this email.",
              expiryText:
                "This link will expire in 10 minutes and can only be used once.",
            },
            emailChange: {
              subject: "Email Change Confirmation",
              previewText: "Confirm your new email address for Hijraah",
              title: "Confirm Email Change",
              description:
                "You recently requested to change your email address for your Hijraah account from {oldEmail} to {newEmail}.",
              button: "Confirm Email Change",
              securityText:
                "If you didn't request this change, please contact us immediately as your account security might be compromised.",
              expiryText: "This confirmation link will expire in 24 hours.",
            },
            userInvitation: {
              subject: "You've been invited to join {organizationName}",
              previewText: "You've been invited to join {organizationName}",
              title: "You've Been Invited",
              description:
                "{inviterName} ({inviterEmail}) has invited you to join {organizationName} on Hijraah.",
              platformDescription:
                "Hijraah is an immigration platform that simplifies and streamlines the immigration process. Once you accept this invitation, you'll be able to access the organization's immigration services and tools.",
              button: "Accept Invitation",
              ignoreText:
                "This invitation was sent to {recipientEmail}. If you weren't expecting this invitation, you can safely ignore it.",
              welcomeText: "We're excited to have you on board!",
            },
          },
          es: {
            common: {
              greeting: "Hola",
              footer: {
                copyright:
                  "\xa9 {year} Hijraah. Todos los derechos reservados.",
                automated:
                  "Este es un mensaje automatizado, por favor no responda.",
              },
              cta: {
                ignore:
                  "Si no solicit\xf3 esto, puede ignorar este correo electr\xf3nico de forma segura.",
                expiry: "Este enlace caducar\xe1 en {time}.",
                regards: "Saludos cordiales,",
                team: "El Equipo de Hijraah",
              },
            },
            passwordReset: {
              subject: "Restablecer Su Contrase\xf1a",
              previewText: "Restablezca su contrase\xf1a de Hijraah",
              title: "Restablecer Su Contrase\xf1a",
              description:
                "Recibimos una solicitud para restablecer la contrase\xf1a de su cuenta Hijraah ({email}). Haga clic en el bot\xf3n a continuaci\xf3n para restablecerla.",
              button: "Restablecer Contrase\xf1a",
              ignoreText:
                "Si no solicit\xf3 restablecer la contrase\xf1a, ignore este correo electr\xf3nico o cont\xe1ctenos si tiene preguntas.",
              expiryText:
                "Este enlace solo es v\xe1lido durante las pr\xf3ximas 24 horas.",
            },
            emailConfirmation: {
              subject: "Confirme Su Correo Electr\xf3nico",
              previewText:
                "Confirme su direcci\xf3n de correo electr\xf3nico de Hijraah",
              title: "Verifique Su Direcci\xf3n de Correo Electr\xf3nico",
              description:
                "\xa1Gracias por registrarse en Hijraah! Confirme su direcci\xf3n de correo electr\xf3nico haciendo clic en el bot\xf3n a continuaci\xf3n.",
              button: "Confirmar Correo Electr\xf3nico",
              ignoreText:
                "Si no cre\xf3 una cuenta con nosotros, puede ignorar este correo electr\xf3nico de forma segura.",
              expiryText:
                "Este enlace de confirmaci\xf3n caducar\xe1 en 24 horas. Si no confirma dentro de ese tiempo, deber\xe1 registrarse nuevamente.",
              welcomeText: "\xa1Bienvenido a Hijraah!",
            },
            magicLink: {
              subject: "Su Enlace M\xe1gico",
              previewText: "Inicie sesi\xf3n en su cuenta de Hijraah",
              title: "Iniciar Sesi\xf3n en Hijraah",
              description:
                "Solicit\xf3 iniciar sesi\xf3n en Hijraah mediante un enlace m\xe1gico. Haga clic en el bot\xf3n a continuaci\xf3n para iniciar sesi\xf3n de forma segura en su cuenta.",
              button: "Iniciar Sesi\xf3n en Hijraah",
              ignoreText:
                "Si no solicit\xf3 este enlace de inicio de sesi\xf3n, puede ignorar este correo electr\xf3nico de forma segura.",
              expiryText:
                "Este enlace caducar\xe1 en 10 minutos y solo se puede usar una vez.",
            },
            emailChange: {
              subject: "Confirmaci\xf3n de Cambio de Correo Electr\xf3nico",
              previewText:
                "Confirme su nueva direcci\xf3n de correo electr\xf3nico para Hijraah",
              title: "Confirmar Cambio de Correo Electr\xf3nico",
              description:
                "Recientemente solicit\xf3 cambiar la direcci\xf3n de correo electr\xf3nico de su cuenta Hijraah de {oldEmail} a {newEmail}.",
              button: "Confirmar Cambio de Correo Electr\xf3nico",
              securityText:
                "Si no solicit\xf3 este cambio, cont\xe1ctenos de inmediato ya que la seguridad de su cuenta podr\xeda estar comprometida.",
              expiryText:
                "Este enlace de confirmaci\xf3n caducar\xe1 en 24 horas.",
            },
            userInvitation: {
              subject: "Ha sido invitado a unirse a {organizationName}",
              previewText: "Ha sido invitado a unirse a {organizationName}",
              title: "Ha Sido Invitado",
              description:
                "{inviterName} ({inviterEmail}) le ha invitado a unirse a {organizationName} en Hijraah.",
              platformDescription:
                "Hijraah es una plataforma de inmigraci\xf3n que simplifica y agiliza el proceso de inmigraci\xf3n. Una vez que acepte esta invitaci\xf3n, podr\xe1 acceder a los servicios y herramientas de inmigraci\xf3n de la organizaci\xf3n.",
              button: "Aceptar Invitaci\xf3n",
              ignoreText:
                "Esta invitaci\xf3n fue enviada a {recipientEmail}. Si no esperaba esta invitaci\xf3n, puede ignorarla de forma segura.",
              welcomeText: "\xa1Estamos emocionados de tenerle a bordo!",
            },
          },
          ar: {
            common: {
              greeting: "مرحباً",
              footer: {
                copyright: "\xa9 {year} هجرة. جميع الحقوق محفوظة.",
                automated: "هذه رسالة آلية، يرجى عدم الرد عليها.",
              },
              cta: {
                ignore:
                  "إذا لم تطلب هذا، يمكنك تجاهل هذا البريد الإلكتروني بأمان.",
                expiry: "ستنتهي صلاحية هذا الرابط في {time}.",
                regards: "مع أطيب التحيات،",
                team: "فريق هجرة",
              },
            },
            passwordReset: {
              subject: "إعادة تعيين كلمة المرور",
              previewText: "إعادة تعيين كلمة مرور هجرة الخاصة بك",
              title: "إعادة تعيين كلمة المرور",
              description:
                "تلقينا طلبًا لإعادة تعيين كلمة المرور لحساب هجرة الخاص بك ({email}). انقر على الزر أدناه لإعادة تعيينها.",
              button: "إعادة تعيين كلمة المرور",
              ignoreText:
                "إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا البريد الإلكتروني أو الاتصال بنا إذا كان لديك أسئلة.",
              expiryText: "هذا الرابط صالح فقط لمدة 24 ساعة القادمة.",
            },
            emailConfirmation: {
              subject: "تأكيد بريدك الإلكتروني",
              previewText: "تأكيد عنوان بريدك الإلكتروني على هجرة",
              title: "التحقق من عنوان بريدك الإلكتروني",
              description:
                "شكرًا لتسجيلك في هجرة! يرجى تأكيد عنوان بريدك الإلكتروني بالنقر على الزر أدناه.",
              button: "تأكيد البريد الإلكتروني",
              ignoreText:
                "إذا لم تقم بإنشاء حساب معنا، يمكنك تجاهل هذا البريد الإلكتروني بأمان.",
              expiryText:
                "ستنتهي صلاحية رابط التأكيد هذا في غضون 24 ساعة. إذا لم تؤكد خلال ذلك الوقت، ستحتاج إلى التسجيل مرة أخرى.",
              welcomeText: "مرحبًا بك في هجرة!",
            },
            magicLink: {
              subject: "رابط التسجيل السحري",
              previewText: "تسجيل الدخول إلى حساب هجرة الخاص بك",
              title: "تسجيل الدخول إلى هجرة",
              description:
                "لقد طلبت تسجيل الدخول إلى هجرة باستخدام رابط سحري. انقر على الزر أدناه لتسجيل الدخول بأمان إلى حسابك.",
              button: "تسجيل الدخول إلى هجرة",
              ignoreText:
                "إذا لم تطلب رابط تسجيل الدخول هذا، يمكنك تجاهل هذا البريد الإلكتروني بأمان.",
              expiryText:
                "ستنتهي صلاحية هذا الرابط في غضون 10 دقائق ويمكن استخدامه مرة واحدة فقط.",
            },
            emailChange: {
              subject: "تأكيد تغيير البريد الإلكتروني",
              previewText: "تأكيد عنوان بريدك الإلكتروني الجديد لـ هجرة",
              title: "تأكيد تغيير البريد الإلكتروني",
              description:
                "لقد طلبت مؤخرًا تغيير عنوان البريد الإلكتروني لحساب هجرة الخاص بك من {oldEmail} إلى {newEmail}.",
              button: "تأكيد تغيير البريد الإلكتروني",
              securityText:
                "إذا لم تطلب هذا التغيير، يرجى الاتصال بنا على الفور لأن أمان حسابك قد يكون معرضًا للخطر.",
              expiryText: "ستنتهي صلاحية رابط التأكيد هذا في غضون 24 ساعة.",
            },
            userInvitation: {
              subject: "تمت دعوتك للانضمام إلى {organizationName}",
              previewText: "تمت دعوتك للانضمام إلى {organizationName}",
              title: "تمت دعوتك",
              description:
                "قام {inviterName} ({inviterEmail}) بدعوتك للانضمام إلى {organizationName} على هجرة.",
              platformDescription:
                "هجرة هي منصة للهجرة تبسط وتسهل عملية الهجرة. بمجرد قبول هذه الدعوة، ستتمكن من الوصول إلى خدمات وأدوات الهجرة الخاصة بالمنظمة.",
              button: "قبول الدعوة",
              ignoreText:
                "تم إرسال هذه الدعوة إلى {recipientEmail}. إذا لم تكن تتوقع هذه الدعوة، يمكنك تجاهلها بأمان.",
              welcomeText: "نحن متحمسون لانضمامك إلينا!",
            },
          },
          fr: {
            common: {
              greeting: "Bonjour",
              footer: {
                copyright: "\xa9 {year} Hijraah. Tous droits r\xe9serv\xe9s.",
                automated:
                  "Ceci est un message automatis\xe9, veuillez ne pas r\xe9pondre.",
              },
              cta: {
                ignore:
                  "Si vous n'avez pas demand\xe9 cela, vous pouvez ignorer cet e-mail en toute s\xe9curit\xe9.",
                expiry: "Ce lien expirera dans {time}.",
                regards: "Cordialement,",
                team: "L'\xe9quipe Hijraah",
              },
            },
            passwordReset: {
              subject: "R\xe9initialiser Votre Mot de Passe",
              previewText: "R\xe9initialisez votre mot de passe Hijraah",
              title: "R\xe9initialiser Votre Mot de Passe",
              description:
                "Nous avons re\xe7u une demande de r\xe9initialisation du mot de passe pour votre compte Hijraah ({email}). Cliquez sur le bouton ci-dessous pour le r\xe9initialiser.",
              button: "R\xe9initialiser le Mot de Passe",
              ignoreText:
                "Si vous n'avez pas demand\xe9 de r\xe9initialisation de mot de passe, veuillez ignorer cet e-mail ou nous contacter si vous avez des questions.",
              expiryText:
                "Ce lien n'est valable que pour les prochaines 24 heures.",
            },
            emailConfirmation: {
              subject: "Confirmez Votre Email",
              previewText: "Confirmez votre adresse e-mail Hijraah",
              title: "V\xe9rifiez Votre Adresse Email",
              description:
                "Merci de vous \xeatre inscrit \xe0 Hijraah ! Veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.",
              button: "Confirmer l'Adresse Email",
              ignoreText:
                "Si vous n'avez pas cr\xe9\xe9 de compte chez nous, vous pouvez ignorer cet e-mail en toute s\xe9curit\xe9.",
              expiryText:
                "Ce lien de confirmation expirera dans 24 heures. Si vous ne confirmez pas dans ce d\xe9lai, vous devrez vous r\xe9inscrire.",
              welcomeText: "Bienvenue sur Hijraah !",
            },
            magicLink: {
              subject: "Votre Lien Magique",
              previewText: "Connectez-vous \xe0 votre compte Hijraah",
              title: "Se Connecter \xe0 Hijraah",
              description:
                "Vous avez demand\xe9 \xe0 vous connecter \xe0 Hijraah \xe0 l'aide d'un lien magique. Cliquez sur le bouton ci-dessous pour vous connecter en toute s\xe9curit\xe9 \xe0 votre compte.",
              button: "Se Connecter \xe0 Hijraah",
              ignoreText:
                "Si vous n'avez pas demand\xe9 ce lien de connexion, vous pouvez ignorer cet e-mail en toute s\xe9curit\xe9.",
              expiryText:
                "Ce lien expirera dans 10 minutes et ne peut \xeatre utilis\xe9 qu'une seule fois.",
            },
            emailChange: {
              subject: "Confirmation de Changement d'Email",
              previewText:
                "Confirmez votre nouvelle adresse e-mail pour Hijraah",
              title: "Confirmer le Changement d'Email",
              description:
                "Vous avez r\xe9cemment demand\xe9 \xe0 changer l'adresse e-mail de votre compte Hijraah de {oldEmail} \xe0 {newEmail}.",
              button: "Confirmer le Changement d'Email",
              securityText:
                "Si vous n'avez pas demand\xe9 ce changement, veuillez nous contacter imm\xe9diatement car la s\xe9curit\xe9 de votre compte pourrait \xeatre compromise.",
              expiryText: "Ce lien de confirmation expirera dans 24 heures.",
            },
            userInvitation: {
              subject:
                "Vous avez \xe9t\xe9 invit\xe9 \xe0 rejoindre {organizationName}",
              previewText:
                "Vous avez \xe9t\xe9 invit\xe9 \xe0 rejoindre {organizationName}",
              title: "Vous Avez \xc9t\xe9 Invit\xe9",
              description:
                "{inviterName} ({inviterEmail}) vous a invit\xe9 \xe0 rejoindre {organizationName} sur Hijraah.",
              platformDescription:
                "Hijraah est une plateforme d'immigration qui simplifie et rationalise le processus d'immigration. Une fois que vous aurez accept\xe9 cette invitation, vous pourrez acc\xe9der aux services et outils d'immigration de l'organisation.",
              button: "Accepter l'Invitation",
              ignoreText:
                "Cette invitation a \xe9t\xe9 envoy\xe9e \xe0 {recipientEmail}. Si vous ne vous attendiez pas \xe0 cette invitation, vous pouvez l'ignorer en toute s\xe9curit\xe9.",
              welcomeText: "Nous sommes ravis de vous avoir \xe0 bord !",
            },
          },
        };
        function s(e = "en") {
          return n[e] || n.en;
        }
        function c(e, i) {
          return Object.entries(i).reduce(
            (e, [i, t]) => e.replace(RegExp(`{${i}}`, "g"), String(t)),
            e,
          );
        }
        let l = ({
            locale: e = "en",
            previewText: i,
            children: t,
            title: a,
            footerText: o,
            direction: n = "ar" === e ? "rtl" : "ltr",
            brandColor: l = "#134e4a",
          }) => {
            let d = s(e),
              u = new Date().getFullYear(),
              p = c(d.common.footer.copyright, { year: u });
            return (0, r.jsxs)("html", {
              dir: n,
              children: [
                (0, r.jsxs)("head", {
                  children: [
                    (0, r.jsx)("meta", {
                      name: "viewport",
                      content: "width=device-width, initial-scale=1.0",
                    }),
                    (0, r.jsx)("meta", {
                      httpEquiv: "Content-Type",
                      content: "text/html; charset=UTF-8",
                    }),
                    (0, r.jsx)("title", { children: a }),
                    i &&
                      (0, r.jsx)("meta", { name: "description", content: i }),
                    (0, r.jsx)("style", {
                      dangerouslySetInnerHTML: {
                        __html: `
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f6f6f6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: ${l};
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
          }
          .button {
            display: inline-block;
            background-color: ${l};
            color: white !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
          h1, h2, h3 {
            color: ${l};
          }
          a {
            color: ${l};
          }
          .text-center {
            text-align: center;
          }
          .text-secondary {
            color: #666;
          }
          .mb-4 {
            margin-bottom: 16px;
          }
          .mb-2 {
            margin-bottom: 8px;
          }
          .mt-4 {
            margin-top: 16px;
          }
          
          /* RTL specific styles */
          [dir="rtl"] .content {
            text-align: right;
          }
          
          /* Mobile responsive */
          @media only screen and (max-width: 620px) {
            .container {
              width: 100% !important;
            }
            
            .content, .header {
              padding: 10px !important;
            }
          }
        `,
                      },
                    }),
                  ],
                }),
                (0, r.jsx)("body", {
                  children: (0, r.jsxs)("div", {
                    className: "container",
                    children: [
                      (0, r.jsx)("div", {
                        className: "header",
                        children: (0, r.jsx)("h1", { children: "Hijraah" }),
                      }),
                      (0, r.jsx)("div", { className: "content", children: t }),
                      (0, r.jsxs)("div", {
                        className: "footer",
                        children: [
                          (0, r.jsx)("p", { children: o || p }),
                          (0, r.jsx)("p", {
                            children: d.common.footer.automated,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            });
          },
          d = ({ href: e, text: i, fullWidth: t = !1, align: a = "center" }) =>
            (0, r.jsx)("div", {
              className: `text-${a}`,
              style: { textAlign: a },
              children: (0, r.jsx)("a", {
                href: e,
                className: "button",
                style: {
                  width: t ? "100%" : "auto",
                  display: t ? "block" : "inline-block",
                },
                children: i,
              }),
            }),
          u = ({ actionUrl: e, email: i, name: t, locale: a = "en" }) => {
            let o = s(a),
              n = t ? `${o.common.greeting}, ${t}` : o.common.greeting,
              u = c(o.passwordReset.description, { email: i });
            return (0, r.jsxs)(l, {
              locale: a,
              previewText: o.passwordReset.previewText,
              title: o.passwordReset.subject,
              children: [
                (0, r.jsx)("h2", { children: o.passwordReset.title }),
                (0, r.jsxs)("p", { children: [n, ","] }),
                (0, r.jsx)("p", { children: u }),
                (0, r.jsx)(d, {
                  href: e,
                  text: o.passwordReset.button,
                  align: "center",
                }),
                (0, r.jsx)("p", { children: o.passwordReset.ignoreText }),
                (0, r.jsx)("p", {
                  className: "text-secondary",
                  children: o.passwordReset.expiryText,
                }),
                (0, r.jsxs)("p", {
                  className: "mb-2",
                  children: [
                    o.common.cta.regards,
                    (0, r.jsx)("br", {}),
                    o.common.cta.team,
                  ],
                }),
              ],
            });
          };
        function p() {
          let [e, i] = (0, a.useState)("passwordReset"),
            [t, n] = (0, a.useState)("en"),
            [s, c] = (0, a.useState)(""),
            l = (0, a.useRef)(null),
            {
              generateEmailHtml: d,
              loading: p,
              error: m,
            } = (function (e = {}) {
              let { defaultLocale: i = "en" } = e,
                [t, n] = (0, a.useState)(!1),
                [s, c] = (0, a.useState)(null);
              return {
                generateEmailHtml: (0, a.useCallback)(
                  (e) => {
                    let { locale: t = i, type: a, props: n } = e;
                    try {
                      let e;
                      if ("passwordReset" === a)
                        e = (0, r.jsx)(u, { locale: t, ...n });
                      else throw Error(`Unsupported email type: ${a}`);
                      return (0, o.renderToStaticMarkup)(e);
                    } catch (e) {
                      throw (
                        (console.error("Error generating email HTML:", e), e)
                      );
                    }
                  },
                  [i],
                ),
                generateEmailHtmlAsync: (0, a.useCallback)(
                  async (e) => {
                    n(!0), c(null);
                    try {
                      let t = await fetch(
                        `${process.env.NEXT_PUBLIC_APP_URL}/api/email/template`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            type: e.type,
                            metadata: { ...e.props, locale: e.locale || i },
                          }),
                        },
                      );
                      if (!t.ok)
                        throw Error(
                          `API request failed with status ${t.status}`,
                        );
                      let r = await t.json();
                      return n(!1), r.html;
                    } catch (e) {
                      throw (
                        (c(e instanceof Error ? e : Error(String(e))), n(!1), e)
                      );
                    }
                  },
                  [i],
                ),
                loading: t,
                error: s,
              };
            })({ defaultLocale: t }),
            x = (0, a.useCallback)(() => {
              try {
                let e = d({
                  type: "passwordReset",
                  locale: t,
                  props: {
                    actionUrl:
                      "https://example.com/reset-password?token=example",
                    email: "user@example.com",
                    name: "John Doe",
                  },
                });
                if ((c(e), l.current)) {
                  let i = l.current,
                    t = i.contentDocument || i.contentWindow?.document;
                  t && (t.open(), t.write(e), t.close());
                }
              } catch (e) {
                console.error("Failed to generate preview:", e);
              }
            }, [t, d]);
          return (0, r.jsxs)("div", {
            className: "container mx-auto p-6",
            children: [
              (0, r.jsx)("h1", {
                className: "text-2xl font-bold mb-6",
                children: "Email Template Preview",
              }),
              (0, r.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
                children: [
                  (0, r.jsxs)("div", {
                    children: [
                      (0, r.jsx)("label", {
                        className: "block text-sm font-medium mb-2",
                        children: "Template",
                      }),
                      (0, r.jsxs)("select", {
                        value: e,
                        onChange: (e) => {
                          i(e.target.value);
                        },
                        className: "w-full p-2 border rounded",
                        children: [
                          (0, r.jsx)("option", {
                            value: "passwordReset",
                            children: "Password Reset",
                          }),
                          (0, r.jsx)("option", {
                            value: "emailConfirmation",
                            disabled: !0,
                            children: "Email Confirmation",
                          }),
                          (0, r.jsx)("option", {
                            value: "magicLink",
                            disabled: !0,
                            children: "Magic Link",
                          }),
                          (0, r.jsx)("option", {
                            value: "emailChange",
                            disabled: !0,
                            children: "Email Change",
                          }),
                          (0, r.jsx)("option", {
                            value: "userInvitation",
                            disabled: !0,
                            children: "User Invitation",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsxs)("div", {
                    children: [
                      (0, r.jsx)("label", {
                        className: "block text-sm font-medium mb-2",
                        children: "Language",
                      }),
                      (0, r.jsxs)("select", {
                        value: t,
                        onChange: (e) => {
                          n(e.target.value);
                        },
                        className: "w-full p-2 border rounded",
                        children: [
                          (0, r.jsx)("option", {
                            value: "en",
                            children: "English",
                          }),
                          (0, r.jsx)("option", {
                            value: "es",
                            children: "Spanish",
                          }),
                          (0, r.jsx)("option", {
                            value: "fr",
                            children: "French",
                          }),
                          (0, r.jsx)("option", {
                            value: "ar",
                            children: "Arabic",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsx)("div", {
                    className: "flex items-end",
                    children: (0, r.jsx)("button", {
                      onClick: x,
                      disabled: p,
                      className:
                        "px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 disabled:opacity-50",
                      children: p ? "Generating..." : "Generate Preview",
                    }),
                  }),
                ],
              }),
              m &&
                (0, r.jsxs)("div", {
                  className: "bg-red-100 text-red-700 p-4 mb-6 rounded",
                  children: ["Error: ", m.message],
                }),
              (0, r.jsxs)("div", {
                className: "bg-gray-100 p-4 rounded",
                children: [
                  (0, r.jsx)("h2", {
                    className: "text-lg font-semibold mb-4",
                    children: "Preview",
                  }),
                  (0, r.jsx)("div", {
                    className:
                      "bg-white border rounded overflow-hidden h-[600px]",
                    children: (0, r.jsx)("iframe", {
                      ref: l,
                      className: "w-full h-full",
                      title: "Email Preview",
                      sandbox: "allow-same-origin",
                    }),
                  }),
                ],
              }),
              (0, r.jsxs)("div", {
                className: "mt-6",
                children: [
                  (0, r.jsx)("h2", {
                    className: "text-lg font-semibold mb-4",
                    children: "Raw HTML",
                  }),
                  (0, r.jsx)("div", {
                    className:
                      "bg-gray-800 text-white p-4 rounded overflow-auto max-h-[300px]",
                    children: (0, r.jsx)("pre", { children: s }),
                  }),
                ],
              }),
            ],
          });
        }
      },
      53053: (e) => {
        "use strict";
        e.exports = require("node:diagnostics_channel");
      },
      55511: (e) => {
        "use strict";
        e.exports = require("crypto");
      },
      57075: (e) => {
        "use strict";
        e.exports = require("node:stream");
      },
      57975: (e) => {
        "use strict";
        e.exports = require("node:util");
      },
      63033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      73024: (e) => {
        "use strict";
        e.exports = require("node:fs");
      },
      73566: (e) => {
        "use strict";
        e.exports = require("worker_threads");
      },
      74998: (e) => {
        "use strict";
        e.exports = require("perf_hooks");
      },
      75919: (e) => {
        "use strict";
        e.exports = require("node:worker_threads");
      },
      76760: (e) => {
        "use strict";
        e.exports = require("node:path");
      },
      77030: (e) => {
        "use strict";
        e.exports = require("node:net");
      },
      77598: (e) => {
        "use strict";
        e.exports = require("node:crypto");
      },
      79551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      79646: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      80481: (e) => {
        "use strict";
        e.exports = require("node:readline");
      },
      83997: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      84297: (e) => {
        "use strict";
        e.exports = require("async_hooks");
      },
      85488: (e) => {
        "use strict";
        e.exports = import("ai");
      },
      86592: (e) => {
        "use strict";
        e.exports = require("node:inspector");
      },
      94735: (e) => {
        "use strict";
        e.exports = require("events");
      },
    });
  var i = require("../../../../webpack-runtime.js");
  i.C(e);
  var t = (e) => i((i.s = e)),
    r = i.X(0, [827, 6518, 2033, 4027, 9437, 4630], () => t(25754));
  module.exports = r;
})();
//# sourceMappingURL=page.js.map
