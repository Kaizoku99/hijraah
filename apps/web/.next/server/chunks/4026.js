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
    o = new e.Error().stack;
  o &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[o] = "c091530c-01bf-4d3f-acd0-4444d4788bc1"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-c091530c-01bf-4d3f-acd0-4444d4788bc1"));
} catch (e) {}
("use strict");
(exports.id = 4026),
  (exports.ids = [4026]),
  (exports.modules = {
    34026: (e) => {
      e.exports = JSON.parse(
        '{"common":{"appName":"Hijraah","tagline":"Inmigraci\xf3n simplificada","loading":"Cargando...","menu":"Men\xfa","close":"Cerrar","cancel":"Cancelar","save":"Guardar","submit":"Enviar","edit":"Editar","delete":"Eliminar","back":"Atr\xe1s","next":"Siguiente","previous":"Anterior","continue":"Continuar","languageName":"Espa\xf1ol"},"Home":{"title":"Bienvenido a Hijraah","description":"Compara pol\xedticas de inmigraci\xf3n entre pa\xedses con informaci\xf3n impulsada por IA"},"nav":{"home":"Inicio","about":"Acerca de","services":"Servicios","contact":"Contacto","blog":"Blog","login":"Iniciar sesi\xf3n","register":"Registrarse","dashboard":"Panel","account":"Cuenta","logout":"Cerrar sesi\xf3n"},"api":{"hello":{"success":"\xa1Hola! Est\xe1s usando el idioma {{language}}."},"users":{"retrieved":"Usuario con ID {{id}} recuperado con \xe9xito","created":"Usuario creado con \xe9xito","updated":"Usuario actualizado con \xe9xito","deleted":"Usuario eliminado con \xe9xito"}},"auth":{"signIn":"Iniciar sesi\xf3n","signUp":"Registrarse","forgotPassword":"\xbfOlvidaste tu contrase\xf1a?","resetPassword":"Restablecer contrase\xf1a","emailAddress":"Correo electr\xf3nico","password":"Contrase\xf1a","confirmPassword":"Confirmar contrase\xf1a","fullName":"Nombre completo","phoneNumber":"N\xfamero de tel\xe9fono","rememberMe":"Recordarme","orContinueWith":"O continuar con","dontHaveAccount":"\xbfNo tienes una cuenta?","alreadyHaveAccount":"\xbfYa tienes una cuenta?"},"forms":{"required":"Este campo es obligatorio","invalidEmail":"Direcci\xf3n de correo electr\xf3nico inv\xe1lida","passwordsMustMatch":"Las contrase\xf1as deben coincidir","passwordTooShort":"La contrase\xf1a debe tener al menos {{length}} caracteres","invalidPhone":"N\xfamero de tel\xe9fono inv\xe1lido"},"errors":{"generic":"Ha ocurrido un error","notFound":"P\xe1gina No Encontrada","pageNotFound":"La p\xe1gina que est\xe1s buscando no existe.","backHome":"Volver al Inicio","unauthorized":"No autorizado","forbidden":"Acceso denegado","invalidRequest":"Solicitud inv\xe1lida","serverError":"Error del servidor","server":"Algo sali\xf3 mal en nuestro sistema","offline":"Est\xe1s desconectado","timeoutError":"La solicitud ha caducado","users":{"notFound":"Usuario con ID {{id}} no encontrado"}},"success":{"generic":"\xc9xito","saved":"Guardado con \xe9xito","updated":"Actualizado con \xe9xito","deleted":"Eliminado con \xe9xito"},"dates":{"today":"Hoy","yesterday":"Ayer","tomorrow":"Ma\xf1ana","daysAgo":"hace {{days}} d\xedas","inDays":"en {{days}} d\xedas","monthsAgo":"hace {{months}} meses","inMonths":"en {{months}} meses","yearsAgo":"hace {{years}} a\xf1os","inYears":"en {{years}} a\xf1os","format":{"short":"DD/MM/YYYY","medium":"D MMM, YYYY","long":"D de MMMM, YYYY","full":"dddd, D de MMMM, YYYY"}}}',
      );
    },
  });
