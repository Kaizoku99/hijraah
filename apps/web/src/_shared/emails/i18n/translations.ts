export type Locale = "en" | "es" | "ar" | "fr";

interface TranslationObject {
  [key: string]: string;
}

interface EmailTranslations {
  common: {
    greeting: string;
    footer: {
      copyright: string;
      automated: string;
    };
    cta: {
      ignore: string;
      expiry: string;
      regards: string;
      team: string;
    };
  };
  passwordReset: {
    subject: string;
    previewText: string;
    title: string;
    description: string;
    button: string;
    ignoreText: string;
    expiryText: string;
  };
  emailConfirmation: {
    subject: string;
    previewText: string;
    title: string;
    description: string;
    button: string;
    ignoreText: string;
    expiryText: string;
    welcomeText: string;
  };
  magicLink: {
    subject: string;
    previewText: string;
    title: string;
    description: string;
    button: string;
    ignoreText: string;
    expiryText: string;
  };
  emailChange: {
    subject: string;
    previewText: string;
    title: string;
    description: string;
    button: string;
    securityText: string;
    expiryText: string;
  };
  userInvitation: {
    subject: string;
    previewText: string;
    title: string;
    description: string;
    platformDescription: string;
    button: string;
    ignoreText: string;
    welcomeText: string;
  };
}

type Translations = {
  [locale in Locale]: EmailTranslations;
};

export const translations: Translations = {
  en: {
    common: {
      greeting: "Hello",
      footer: {
        copyright: "© {year} Hijraah. All rights reserved.",
        automated: "This is an automated message, please do not reply.",
      },
      cta: {
        ignore: "If you didn't request this, you can safely ignore this email.",
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
        copyright: "© {year} Hijraah. Todos los derechos reservados.",
        automated: "Este es un mensaje automatizado, por favor no responda.",
      },
      cta: {
        ignore:
          "Si no solicitó esto, puede ignorar este correo electrónico de forma segura.",
        expiry: "Este enlace caducará en {time}.",
        regards: "Saludos cordiales,",
        team: "El Equipo de Hijraah",
      },
    },
    passwordReset: {
      subject: "Restablecer Su Contraseña",
      previewText: "Restablezca su contraseña de Hijraah",
      title: "Restablecer Su Contraseña",
      description:
        "Recibimos una solicitud para restablecer la contraseña de su cuenta Hijraah ({email}). Haga clic en el botón a continuación para restablecerla.",
      button: "Restablecer Contraseña",
      ignoreText:
        "Si no solicitó restablecer la contraseña, ignore este correo electrónico o contáctenos si tiene preguntas.",
      expiryText: "Este enlace solo es válido durante las próximas 24 horas.",
    },
    emailConfirmation: {
      subject: "Confirme Su Correo Electrónico",
      previewText: "Confirme su dirección de correo electrónico de Hijraah",
      title: "Verifique Su Dirección de Correo Electrónico",
      description:
        "¡Gracias por registrarse en Hijraah! Confirme su dirección de correo electrónico haciendo clic en el botón a continuación.",
      button: "Confirmar Correo Electrónico",
      ignoreText:
        "Si no creó una cuenta con nosotros, puede ignorar este correo electrónico de forma segura.",
      expiryText:
        "Este enlace de confirmación caducará en 24 horas. Si no confirma dentro de ese tiempo, deberá registrarse nuevamente.",
      welcomeText: "¡Bienvenido a Hijraah!",
    },
    magicLink: {
      subject: "Su Enlace Mágico",
      previewText: "Inicie sesión en su cuenta de Hijraah",
      title: "Iniciar Sesión en Hijraah",
      description:
        "Solicitó iniciar sesión en Hijraah mediante un enlace mágico. Haga clic en el botón a continuación para iniciar sesión de forma segura en su cuenta.",
      button: "Iniciar Sesión en Hijraah",
      ignoreText:
        "Si no solicitó este enlace de inicio de sesión, puede ignorar este correo electrónico de forma segura.",
      expiryText:
        "Este enlace caducará en 10 minutos y solo se puede usar una vez.",
    },
    emailChange: {
      subject: "Confirmación de Cambio de Correo Electrónico",
      previewText:
        "Confirme su nueva dirección de correo electrónico para Hijraah",
      title: "Confirmar Cambio de Correo Electrónico",
      description:
        "Recientemente solicitó cambiar la dirección de correo electrónico de su cuenta Hijraah de {oldEmail} a {newEmail}.",
      button: "Confirmar Cambio de Correo Electrónico",
      securityText:
        "Si no solicitó este cambio, contáctenos de inmediato ya que la seguridad de su cuenta podría estar comprometida.",
      expiryText: "Este enlace de confirmación caducará en 24 horas.",
    },
    userInvitation: {
      subject: "Ha sido invitado a unirse a {organizationName}",
      previewText: "Ha sido invitado a unirse a {organizationName}",
      title: "Ha Sido Invitado",
      description:
        "{inviterName} ({inviterEmail}) le ha invitado a unirse a {organizationName} en Hijraah.",
      platformDescription:
        "Hijraah es una plataforma de inmigración que simplifica y agiliza el proceso de inmigración. Una vez que acepte esta invitación, podrá acceder a los servicios y herramientas de inmigración de la organización.",
      button: "Aceptar Invitación",
      ignoreText:
        "Esta invitación fue enviada a {recipientEmail}. Si no esperaba esta invitación, puede ignorarla de forma segura.",
      welcomeText: "¡Estamos emocionados de tenerle a bordo!",
    },
  },
  ar: {
    common: {
      greeting: "مرحباً",
      footer: {
        copyright: "© {year} هجرة. جميع الحقوق محفوظة.",
        automated: "هذه رسالة آلية، يرجى عدم الرد عليها.",
      },
      cta: {
        ignore: "إذا لم تطلب هذا، يمكنك تجاهل هذا البريد الإلكتروني بأمان.",
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
        copyright: "© {year} Hijraah. Tous droits réservés.",
        automated: "Ceci est un message automatisé, veuillez ne pas répondre.",
      },
      cta: {
        ignore:
          "Si vous n'avez pas demandé cela, vous pouvez ignorer cet e-mail en toute sécurité.",
        expiry: "Ce lien expirera dans {time}.",
        regards: "Cordialement,",
        team: "L'équipe Hijraah",
      },
    },
    passwordReset: {
      subject: "Réinitialiser Votre Mot de Passe",
      previewText: "Réinitialisez votre mot de passe Hijraah",
      title: "Réinitialiser Votre Mot de Passe",
      description:
        "Nous avons reçu une demande de réinitialisation du mot de passe pour votre compte Hijraah ({email}). Cliquez sur le bouton ci-dessous pour le réinitialiser.",
      button: "Réinitialiser le Mot de Passe",
      ignoreText:
        "Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail ou nous contacter si vous avez des questions.",
      expiryText: "Ce lien n'est valable que pour les prochaines 24 heures.",
    },
    emailConfirmation: {
      subject: "Confirmez Votre Email",
      previewText: "Confirmez votre adresse e-mail Hijraah",
      title: "Vérifiez Votre Adresse Email",
      description:
        "Merci de vous être inscrit à Hijraah ! Veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.",
      button: "Confirmer l'Adresse Email",
      ignoreText:
        "Si vous n'avez pas créé de compte chez nous, vous pouvez ignorer cet e-mail en toute sécurité.",
      expiryText:
        "Ce lien de confirmation expirera dans 24 heures. Si vous ne confirmez pas dans ce délai, vous devrez vous réinscrire.",
      welcomeText: "Bienvenue sur Hijraah !",
    },
    magicLink: {
      subject: "Votre Lien Magique",
      previewText: "Connectez-vous à votre compte Hijraah",
      title: "Se Connecter à Hijraah",
      description:
        "Vous avez demandé à vous connecter à Hijraah à l'aide d'un lien magique. Cliquez sur le bouton ci-dessous pour vous connecter en toute sécurité à votre compte.",
      button: "Se Connecter à Hijraah",
      ignoreText:
        "Si vous n'avez pas demandé ce lien de connexion, vous pouvez ignorer cet e-mail en toute sécurité.",
      expiryText:
        "Ce lien expirera dans 10 minutes et ne peut être utilisé qu'une seule fois.",
    },
    emailChange: {
      subject: "Confirmation de Changement d'Email",
      previewText: "Confirmez votre nouvelle adresse e-mail pour Hijraah",
      title: "Confirmer le Changement d'Email",
      description:
        "Vous avez récemment demandé à changer l'adresse e-mail de votre compte Hijraah de {oldEmail} à {newEmail}.",
      button: "Confirmer le Changement d'Email",
      securityText:
        "Si vous n'avez pas demandé ce changement, veuillez nous contacter immédiatement car la sécurité de votre compte pourrait être compromise.",
      expiryText: "Ce lien de confirmation expirera dans 24 heures.",
    },
    userInvitation: {
      subject: "Vous avez été invité à rejoindre {organizationName}",
      previewText: "Vous avez été invité à rejoindre {organizationName}",
      title: "Vous Avez Été Invité",
      description:
        "{inviterName} ({inviterEmail}) vous a invité à rejoindre {organizationName} sur Hijraah.",
      platformDescription:
        "Hijraah est une plateforme d'immigration qui simplifie et rationalise le processus d'immigration. Une fois que vous aurez accepté cette invitation, vous pourrez accéder aux services et outils d'immigration de l'organisation.",
      button: "Accepter l'Invitation",
      ignoreText:
        "Cette invitation a été envoyée à {recipientEmail}. Si vous ne vous attendiez pas à cette invitation, vous pouvez l'ignorer en toute sécurité.",
      welcomeText: "Nous sommes ravis de vous avoir à bord !",
    },
  },
};

// Helper function to get translations for a specific locale
export function getTranslations(locale: Locale = "en"): EmailTranslations {
  return translations[locale] || translations.en;
}

// Helper function to format a string with variables
export function formatString(
  str: string,
  variables: Record<string, string | number>,
): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) =>
      result.replace(new RegExp(`{${key}}`, "g"), String(value)),
    str,
  );
}
