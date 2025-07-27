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
    s = new e.Error().stack;
  s &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[s] = "dbae7abe-1d83-4f6e-a575-da158980e2ef"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-dbae7abe-1d83-4f6e-a575-da158980e2ef"));
} catch (e) {}
("use strict");
(exports.id = 3586),
  (exports.ids = [3586]),
  (exports.modules = {
    53586: (e) => {
      e.exports = JSON.parse(
        '{"common":{"appName":"Hijraah","tagline":"L\'immigration simplifi\xe9e","loading":"Chargement...","menu":"Menu","close":"Fermer","cancel":"Annuler","save":"Enregistrer","submit":"Soumettre","edit":"Modifier","delete":"Supprimer","back":"Retour","next":"Suivant","previous":"Pr\xe9c\xe9dent","continue":"Continuer","languageName":"Fran\xe7ais"},"Home":{"title":"Bienvenue sur Hijraah","description":"Comparez les politiques d\'immigration entre les pays avec des informations bas\xe9es sur l\'IA"},"nav":{"home":"Accueil","about":"\xc0 propos","services":"Services","contact":"Contact","blog":"Blog","login":"Connexion","register":"S\'inscrire","dashboard":"Tableau de bord","account":"Compte","logout":"D\xe9connexion"},"api":{"hello":{"success":"Bonjour! Vous utilisez la langue {{language}}."},"users":{"retrieved":"L\'utilisateur avec l\'ID {{id}} a \xe9t\xe9 r\xe9cup\xe9r\xe9 avec succ\xe8s","created":"Utilisateur cr\xe9\xe9 avec succ\xe8s","updated":"Utilisateur mis \xe0 jour avec succ\xe8s","deleted":"Utilisateur supprim\xe9 avec succ\xe8s"}},"auth":{"signIn":"Se connecter","signUp":"S\'inscrire","forgotPassword":"Mot de passe oubli\xe9?","resetPassword":"R\xe9initialiser le mot de passe","emailAddress":"Adresse e-mail","password":"Mot de passe","confirmPassword":"Confirmer le mot de passe","fullName":"Nom complet","phoneNumber":"Num\xe9ro de t\xe9l\xe9phone","rememberMe":"Se souvenir de moi","orContinueWith":"Ou continuer avec","dontHaveAccount":"Vous n\'avez pas de compte?","alreadyHaveAccount":"Vous avez d\xe9j\xe0 un compte?"},"forms":{"required":"Ce champ est obligatoire","invalidEmail":"Adresse e-mail invalide","passwordsMustMatch":"Les mots de passe doivent correspondre","passwordTooShort":"Le mot de passe doit comporter au moins {{length}} caract\xe8res","invalidPhone":"Num\xe9ro de t\xe9l\xe9phone invalide"},"errors":{"generic":"Une erreur s\'est produite","notFound":"Page Non Trouv\xe9e","pageNotFound":"La page que vous recherchez n\'existe pas.","backHome":"Retour \xe0 l\'Accueil","unauthorized":"Non autoris\xe9","forbidden":"Acc\xe8s refus\xe9","invalidRequest":"Requ\xeate invalide","serverError":"Erreur du serveur","server":"Une erreur s\'est produite de notre c\xf4t\xe9","offline":"Vous \xeates hors ligne","timeoutError":"La requ\xeate a expir\xe9","users":{"notFound":"Utilisateur avec l\'ID {{id}} non trouv\xe9"}},"success":{"generic":"Succ\xe8s","saved":"Enregistr\xe9 avec succ\xe8s","updated":"Mis \xe0 jour avec succ\xe8s","deleted":"Supprim\xe9 avec succ\xe8s"},"dates":{"today":"Aujourd\'hui","yesterday":"Hier","tomorrow":"Demain","daysAgo":"Il y a {{days}} jours","inDays":"Dans {{days}} jours","monthsAgo":"Il y a {{months}} mois","inMonths":"Dans {{months}} mois","yearsAgo":"Il y a {{years}} ans","inYears":"Dans {{years}} ans","format":{"short":"DD/MM/YYYY","medium":"D MMM, YYYY","long":"D MMMM, YYYY","full":"dddd D MMMM, YYYY"}}}',
      );
    },
  });
