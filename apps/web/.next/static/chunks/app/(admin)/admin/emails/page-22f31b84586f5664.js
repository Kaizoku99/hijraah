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
    (e._sentryDebugIds[i] = "09cc1d8e-746d-441a-a728-b736c0baca94"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-09cc1d8e-746d-441a-a728-b736c0baca94"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [249],
  {
    33039: (e, i, t) => {
      "use strict";
      t.r(i), t.d(i, { default: () => p });
      var n = t(30602),
        a = t(85218),
        r = t(64444);
      let o = {
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
              copyright: "\xa9 {year} Hijraah. Todos los derechos reservados.",
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
            previewText: "Confirmez votre nouvelle adresse e-mail pour Hijraah",
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
      function s() {
        let e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "en";
        return o[e] || o.en;
      }
      function c(e, i) {
        return Object.entries(i).reduce((e, i) => {
          let [t, n] = i;
          return e.replace(RegExp("{".concat(t, "}"), "g"), String(n));
        }, e);
      }
      let l = (e) => {
          let {
              locale: i = "en",
              previewText: t,
              children: a,
              title: r,
              footerText: o,
              direction: l = "ar" === i ? "rtl" : "ltr",
              brandColor: d = "#134e4a",
            } = e,
            u = s(i),
            m = new Date().getFullYear(),
            p = c(u.common.footer.copyright, { year: m });
          return (0, n.jsxs)("html", {
            dir: l,
            children: [
              (0, n.jsxs)("head", {
                children: [
                  (0, n.jsx)("meta", {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0",
                  }),
                  (0, n.jsx)("meta", {
                    httpEquiv: "Content-Type",
                    content: "text/html; charset=UTF-8",
                  }),
                  (0, n.jsx)("title", { children: r }),
                  t && (0, n.jsx)("meta", { name: "description", content: t }),
                  (0, n.jsx)("style", {
                    dangerouslySetInnerHTML: {
                      __html:
                        "\n          /* Base styles */\n          body {\n            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n            background-color: #f6f6f6;\n            color: #333;\n            margin: 0;\n            padding: 0;\n          }\n          .container {\n            max-width: 600px;\n            margin: 0 auto;\n            padding: 20px;\n          }\n          .header {\n            background-color: "
                          .concat(
                            d,
                            ";\n            color: white;\n            padding: 20px;\n            text-align: center;\n            border-radius: 5px 5px 0 0;\n          }\n          .content {\n            background-color: white;\n            padding: 20px;\n            border-radius: 0 0 5px 5px;\n            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);\n          }\n          .button {\n            display: inline-block;\n            background-color: ",
                          )
                          .concat(
                            d,
                            ";\n            color: white !important;\n            text-decoration: none;\n            padding: 10px 20px;\n            border-radius: 5px;\n            margin: 20px 0;\n            font-weight: bold;\n          }\n          .footer {\n            margin-top: 20px;\n            text-align: center;\n            font-size: 12px;\n            color: #999;\n          }\n          h1, h2, h3 {\n            color: ",
                          )
                          .concat(
                            d,
                            ";\n          }\n          a {\n            color: ",
                          )
                          .concat(
                            d,
                            ';\n          }\n          .text-center {\n            text-align: center;\n          }\n          .text-secondary {\n            color: #666;\n          }\n          .mb-4 {\n            margin-bottom: 16px;\n          }\n          .mb-2 {\n            margin-bottom: 8px;\n          }\n          .mt-4 {\n            margin-top: 16px;\n          }\n          \n          /* RTL specific styles */\n          [dir="rtl"] .content {\n            text-align: right;\n          }\n          \n          /* Mobile responsive */\n          @media only screen and (max-width: 620px) {\n            .container {\n              width: 100% !important;\n            }\n            \n            .content, .header {\n              padding: 10px !important;\n            }\n          }\n        ',
                          ),
                    },
                  }),
                ],
              }),
              (0, n.jsx)("body", {
                children: (0, n.jsxs)("div", {
                  className: "container",
                  children: [
                    (0, n.jsx)("div", {
                      className: "header",
                      children: (0, n.jsx)("h1", { children: "Hijraah" }),
                    }),
                    (0, n.jsx)("div", { className: "content", children: a }),
                    (0, n.jsxs)("div", {
                      className: "footer",
                      children: [
                        (0, n.jsx)("p", { children: o || p }),
                        (0, n.jsx)("p", {
                          children: u.common.footer.automated,
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          });
        },
        d = (e) => {
          let { href: i, text: t, fullWidth: a = !1, align: r = "center" } = e;
          return (0, n.jsx)("div", {
            className: "text-".concat(r),
            style: { textAlign: r },
            children: (0, n.jsx)("a", {
              href: i,
              className: "button",
              style: {
                width: a ? "100%" : "auto",
                display: a ? "block" : "inline-block",
              },
              children: t,
            }),
          });
        },
        u = (e) => {
          let { actionUrl: i, email: t, name: a, locale: r = "en" } = e,
            o = s(r),
            u = a
              ? "".concat(o.common.greeting, ", ").concat(a)
              : o.common.greeting,
            m = c(o.passwordReset.description, { email: t });
          return (0, n.jsxs)(l, {
            locale: r,
            previewText: o.passwordReset.previewText,
            title: o.passwordReset.subject,
            children: [
              (0, n.jsx)("h2", { children: o.passwordReset.title }),
              (0, n.jsxs)("p", { children: [u, ","] }),
              (0, n.jsx)("p", { children: m }),
              (0, n.jsx)(d, {
                href: i,
                text: o.passwordReset.button,
                align: "center",
              }),
              (0, n.jsx)("p", { children: o.passwordReset.ignoreText }),
              (0, n.jsx)("p", {
                className: "text-secondary",
                children: o.passwordReset.expiryText,
              }),
              (0, n.jsxs)("p", {
                className: "mb-2",
                children: [
                  o.common.cta.regards,
                  (0, n.jsx)("br", {}),
                  o.common.cta.team,
                ],
              }),
            ],
          });
        };
      var m = t(40459);
      function p() {
        let [e, i] = (0, a.useState)("passwordReset"),
          [t, o] = (0, a.useState)("en"),
          [s, c] = (0, a.useState)(""),
          l = (0, a.useRef)(null),
          {
            generateEmailHtml: d,
            loading: p,
            error: h,
          } = (function () {
            let e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              { defaultLocale: i = "en" } = e,
              [t, o] = (0, a.useState)(!1),
              [s, c] = (0, a.useState)(null);
            return {
              generateEmailHtml: (0, a.useCallback)(
                (e) => {
                  let { locale: t = i, type: a, props: o } = e;
                  try {
                    let e;
                    if ("passwordReset" === a)
                      e = (0, n.jsx)(u, { locale: t, ...o });
                    else throw Error("Unsupported email type: ".concat(a));
                    return (0, r.qV)(e);
                  } catch (e) {
                    throw (console.error("Error generating email HTML:", e), e);
                  }
                },
                [i],
              ),
              generateEmailHtmlAsync: (0, a.useCallback)(
                async (e) => {
                  o(!0), c(null);
                  try {
                    let t = await fetch(
                      "".concat(
                        m.env.NEXT_PUBLIC_APP_URL,
                        "/api/email/template",
                      ),
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
                        "API request failed with status ".concat(t.status),
                      );
                    let n = await t.json();
                    return o(!1), n.html;
                  } catch (e) {
                    throw (
                      (c(e instanceof Error ? e : Error(String(e))), o(!1), e)
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
              let i = d({
                type: "passwordReset",
                locale: t,
                props: {
                  actionUrl: "https://example.com/reset-password?token=example",
                  email: "user@example.com",
                  name: "John Doe",
                },
              });
              if ((c(i), l.current)) {
                var e;
                let t = l.current,
                  n =
                    t.contentDocument ||
                    (null == (e = t.contentWindow) ? void 0 : e.document);
                n && (n.open(), n.write(i), n.close());
              }
            } catch (e) {
              console.error("Failed to generate preview:", e);
            }
          }, [t, d]);
        return (0, n.jsxs)("div", {
          className: "container mx-auto p-6",
          children: [
            (0, n.jsx)("h1", {
              className: "text-2xl font-bold mb-6",
              children: "Email Template Preview",
            }),
            (0, n.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
              children: [
                (0, n.jsxs)("div", {
                  children: [
                    (0, n.jsx)("label", {
                      className: "block text-sm font-medium mb-2",
                      children: "Template",
                    }),
                    (0, n.jsxs)("select", {
                      value: e,
                      onChange: (e) => {
                        i(e.target.value);
                      },
                      className: "w-full p-2 border rounded",
                      children: [
                        (0, n.jsx)("option", {
                          value: "passwordReset",
                          children: "Password Reset",
                        }),
                        (0, n.jsx)("option", {
                          value: "emailConfirmation",
                          disabled: !0,
                          children: "Email Confirmation",
                        }),
                        (0, n.jsx)("option", {
                          value: "magicLink",
                          disabled: !0,
                          children: "Magic Link",
                        }),
                        (0, n.jsx)("option", {
                          value: "emailChange",
                          disabled: !0,
                          children: "Email Change",
                        }),
                        (0, n.jsx)("option", {
                          value: "userInvitation",
                          disabled: !0,
                          children: "User Invitation",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, n.jsxs)("div", {
                  children: [
                    (0, n.jsx)("label", {
                      className: "block text-sm font-medium mb-2",
                      children: "Language",
                    }),
                    (0, n.jsxs)("select", {
                      value: t,
                      onChange: (e) => {
                        o(e.target.value);
                      },
                      className: "w-full p-2 border rounded",
                      children: [
                        (0, n.jsx)("option", {
                          value: "en",
                          children: "English",
                        }),
                        (0, n.jsx)("option", {
                          value: "es",
                          children: "Spanish",
                        }),
                        (0, n.jsx)("option", {
                          value: "fr",
                          children: "French",
                        }),
                        (0, n.jsx)("option", {
                          value: "ar",
                          children: "Arabic",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, n.jsx)("div", {
                  className: "flex items-end",
                  children: (0, n.jsx)("button", {
                    onClick: x,
                    disabled: p,
                    className:
                      "px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 disabled:opacity-50",
                    children: p ? "Generating..." : "Generate Preview",
                  }),
                }),
              ],
            }),
            h &&
              (0, n.jsxs)("div", {
                className: "bg-red-100 text-red-700 p-4 mb-6 rounded",
                children: ["Error: ", h.message],
              }),
            (0, n.jsxs)("div", {
              className: "bg-gray-100 p-4 rounded",
              children: [
                (0, n.jsx)("h2", {
                  className: "text-lg font-semibold mb-4",
                  children: "Preview",
                }),
                (0, n.jsx)("div", {
                  className:
                    "bg-white border rounded overflow-hidden h-[600px]",
                  children: (0, n.jsx)("iframe", {
                    ref: l,
                    className: "w-full h-full",
                    title: "Email Preview",
                    sandbox: "allow-same-origin",
                  }),
                }),
              ],
            }),
            (0, n.jsxs)("div", {
              className: "mt-6",
              children: [
                (0, n.jsx)("h2", {
                  className: "text-lg font-semibold mb-4",
                  children: "Raw HTML",
                }),
                (0, n.jsx)("div", {
                  className:
                    "bg-gray-800 text-white p-4 rounded overflow-auto max-h-[300px]",
                  children: (0, n.jsx)("pre", { children: s }),
                }),
              ],
            }),
          ],
        });
      }
    },
    46262: (e, i, t) => {
      Promise.resolve().then(t.bind(t, 33039));
    },
  },
  (e) => {
    var i = (i) => e((e.s = i));
    e.O(0, [6593, 3209, 7358], () => i(46262)), (_N_E = e.O());
  },
]);
