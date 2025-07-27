try {
  let i =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
          ? global
          : "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
              ? self
              : {},
    e = new i.Error().stack;
  e &&
    ((i._sentryDebugIds = i._sentryDebugIds || {}),
    (i._sentryDebugIds[e] = "68a1e637-a30e-4037-bdaa-5b23d7f903fb"),
    (i._sentryDebugIdIdentifier =
      "sentry-dbid-68a1e637-a30e-4037-bdaa-5b23d7f903fb"));
} catch (i) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [83],
  {
    36083: (i, e, o) => {
      "use strict";
      o.d(e, { Rp: () => a.R }), o(39330);
      var a = o(86856);
      o(73659),
        "undefined" == typeof URLPattern || URLPattern,
        o(55566),
        o(72283),
        o(62299),
        o(41301),
        o(78614),
        o(43209),
        o(37627),
        o(29659),
        new WeakMap();
    },
    43209: (i, e, o) => {
      "use strict";
      o.d(e, { iC: () => r }), o(41301);
      var a = o(25770);
      function r() {
        let i = a.Z.getStore();
        return (null == i ? void 0 : i.rootTaskSpawnPhase) === "action";
      }
    },
    73659: (i, e, o) => {
      var a;
      (() => {
        var r = {
            226: function (r, t) {
              !(function (n, s) {
                "use strict";
                var b = "function",
                  w = "undefined",
                  d = "object",
                  l = "string",
                  c = "major",
                  u = "model",
                  p = "name",
                  m = "type",
                  f = "vendor",
                  h = "version",
                  v = "architecture",
                  g = "console",
                  k = "mobile",
                  x = "tablet",
                  y = "smarttv",
                  _ = "wearable",
                  T = "embedded",
                  S = "Amazon",
                  q = "Apple",
                  N = "ASUS",
                  z = "BlackBerry",
                  A = "Browser",
                  C = "Chrome",
                  E = "Firefox",
                  U = "Google",
                  O = "Huawei",
                  R = "Microsoft",
                  P = "Motorola",
                  j = "Opera",
                  D = "Samsung",
                  M = "Sharp",
                  I = "Sony",
                  B = "Xiaomi",
                  V = "Zebra",
                  L = "Facebook",
                  G = "Chromium OS",
                  W = "Mac OS",
                  Z = function (i, e) {
                    var o = {};
                    for (var a in i)
                      e[a] && e[a].length % 2 == 0
                        ? (o[a] = e[a].concat(i[a]))
                        : (o[a] = i[a]);
                    return o;
                  },
                  F = function (i) {
                    for (var e = {}, o = 0; o < i.length; o++)
                      e[i[o].toUpperCase()] = i[o];
                    return e;
                  },
                  H = function (i, e) {
                    return typeof i === l && -1 !== $(e).indexOf($(i));
                  },
                  $ = function (i) {
                    return i.toLowerCase();
                  },
                  X = function (i, e) {
                    if (typeof i === l)
                      return (
                        (i = i.replace(/^\s\s*/, "")),
                        typeof e === w ? i : i.substring(0, 350)
                      );
                  },
                  K = function (i, e) {
                    for (var o, a, r, t, n, w, l = 0; l < e.length && !n; ) {
                      var c = e[l],
                        u = e[l + 1];
                      for (o = a = 0; o < c.length && !n && c[o]; )
                        if ((n = c[o++].exec(i)))
                          for (r = 0; r < u.length; r++)
                            (w = n[++a]),
                              typeof (t = u[r]) === d && t.length > 0
                                ? 2 === t.length
                                  ? typeof t[1] == b
                                    ? (this[t[0]] = t[1].call(this, w))
                                    : (this[t[0]] = t[1])
                                  : 3 === t.length
                                    ? typeof t[1] !== b ||
                                      (t[1].exec && t[1].test)
                                      ? (this[t[0]] = w
                                          ? w.replace(t[1], t[2])
                                          : void 0)
                                      : (this[t[0]] = w
                                          ? t[1].call(this, w, t[2])
                                          : void 0)
                                    : 4 === t.length &&
                                      (this[t[0]] = w
                                        ? t[3].call(this, w.replace(t[1], t[2]))
                                        : s)
                                : (this[t] = w || s);
                      l += 2;
                    }
                  },
                  Q = function (i, e) {
                    for (var o in e)
                      if (typeof e[o] === d && e[o].length > 0) {
                        for (var a = 0; a < e[o].length; a++)
                          if (H(e[o][a], i)) return "?" === o ? s : o;
                      } else if (H(e[o], i)) return "?" === o ? s : o;
                    return i;
                  },
                  Y = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: ["NT 6.4", "NT 10.0"],
                    RT: "ARM",
                  },
                  J = {
                    browser: [
                      [/\b(?:crmo|crios)\/([\w\.]+)/i],
                      [h, [p, "Chrome"]],
                      [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                      [h, [p, "Edge"]],
                      [
                        /(opera mini)\/([-\w\.]+)/i,
                        /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                        /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                      ],
                      [p, h],
                      [/opios[\/ ]+([\w\.]+)/i],
                      [h, [p, j + " Mini"]],
                      [/\bopr\/([\w\.]+)/i],
                      [h, [p, j]],
                      [
                        /(kindle)\/([\w\.]+)/i,
                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                        /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                        /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                        /(?:ms|\()(ie) ([\w\.]+)/i,
                        /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                        /(heytap|ovi)browser\/([\d\.]+)/i,
                        /(weibo)__([\d\.]+)/i,
                      ],
                      [p, h],
                      [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                      [h, [p, "UC" + A]],
                      [
                        /microm.+\bqbcore\/([\w\.]+)/i,
                        /\bqbcore\/([\w\.]+).+microm/i,
                      ],
                      [h, [p, "WeChat(Win) Desktop"]],
                      [/micromessenger\/([\w\.]+)/i],
                      [h, [p, "WeChat"]],
                      [/konqueror\/([\w\.]+)/i],
                      [h, [p, "Konqueror"]],
                      [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                      [h, [p, "IE"]],
                      [/ya(?:search)?browser\/([\w\.]+)/i],
                      [h, [p, "Yandex"]],
                      [/(avast|avg)\/([\w\.]+)/i],
                      [[p, /(.+)/, "$1 Secure " + A], h],
                      [/\bfocus\/([\w\.]+)/i],
                      [h, [p, E + " Focus"]],
                      [/\bopt\/([\w\.]+)/i],
                      [h, [p, j + " Touch"]],
                      [/coc_coc\w+\/([\w\.]+)/i],
                      [h, [p, "Coc Coc"]],
                      [/dolfin\/([\w\.]+)/i],
                      [h, [p, "Dolphin"]],
                      [/coast\/([\w\.]+)/i],
                      [h, [p, j + " Coast"]],
                      [/miuibrowser\/([\w\.]+)/i],
                      [h, [p, "MIUI " + A]],
                      [/fxios\/([-\w\.]+)/i],
                      [h, [p, E]],
                      [/\bqihu|(qi?ho?o?|360)browser/i],
                      [[p, "360 " + A]],
                      [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                      [[p, /(.+)/, "$1 " + A], h],
                      [/(comodo_dragon)\/([\w\.]+)/i],
                      [[p, /_/g, " "], h],
                      [
                        /(electron)\/([\w\.]+) safari/i,
                        /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                        /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                      ],
                      [p, h],
                      [
                        /(metasr)[\/ ]?([\w\.]+)/i,
                        /(lbbrowser)/i,
                        /\[(linkedin)app\]/i,
                      ],
                      [p],
                      [
                        /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
                      ],
                      [[p, L], h],
                      [
                        /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                        /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                        /safari (line)\/([\w\.]+)/i,
                        /\b(line)\/([\w\.]+)\/iab/i,
                        /(chromium|instagram)[\/ ]([-\w\.]+)/i,
                      ],
                      [p, h],
                      [/\bgsa\/([\w\.]+) .*safari\//i],
                      [h, [p, "GSA"]],
                      [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                      [h, [p, "TikTok"]],
                      [/headlesschrome(?:\/([\w\.]+)| )/i],
                      [h, [p, C + " Headless"]],
                      [/ wv\).+(chrome)\/([\w\.]+)/i],
                      [[p, C + " WebView"], h],
                      [
                        /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i,
                      ],
                      [h, [p, "Android " + A]],
                      [
                        /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i,
                      ],
                      [p, h],
                      [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                      [h, [p, "Mobile Safari"]],
                      [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                      [h, p],
                      [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                      [
                        p,
                        [
                          h,
                          Q,
                          {
                            "1.0": "/8",
                            1.2: "/1",
                            1.3: "/3",
                            "2.0": "/412",
                            "2.0.2": "/416",
                            "2.0.3": "/417",
                            "2.0.4": "/419",
                            "?": "/",
                          },
                        ],
                      ],
                      [/(webkit|khtml)\/([\w\.]+)/i],
                      [p, h],
                      [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                      [[p, "Netscape"], h],
                      [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                      [h, [p, E + " Reality"]],
                      [
                        /ekiohf.+(flow)\/([\w\.]+)/i,
                        /(swiftfox)/i,
                        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                        /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                        /(firefox)\/([\w\.]+)/i,
                        /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                        /(links) \(([\w\.]+)/i,
                        /panasonic;(viera)/i,
                      ],
                      [p, h],
                      [/(cobalt)\/([\w\.]+)/i],
                      [p, [h, /master.|lts./, ""]],
                    ],
                    cpu: [
                      [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                      [[v, "amd64"]],
                      [/(ia32(?=;))/i],
                      [[v, $]],
                      [/((?:i[346]|x)86)[;\)]/i],
                      [[v, "ia32"]],
                      [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                      [[v, "arm64"]],
                      [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                      [[v, "armhf"]],
                      [/windows (ce|mobile); ppc;/i],
                      [[v, "arm"]],
                      [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                      [[v, /ower/, "", $]],
                      [/(sun4\w)[;\)]/i],
                      [[v, "sparc"]],
                      [
                        /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                      ],
                      [[v, $]],
                    ],
                    device: [
                      [
                        /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                      ],
                      [u, [f, D], [m, x]],
                      [
                        /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                        /samsung[- ]([-\w]+)/i,
                        /sec-(sgh\w+)/i,
                      ],
                      [u, [f, D], [m, k]],
                      [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                      [u, [f, q], [m, k]],
                      [
                        /\((ipad);[-\w\),; ]+apple/i,
                        /applecoremedia\/[\w\.]+ \((ipad)/i,
                        /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                      ],
                      [u, [f, q], [m, x]],
                      [/(macintosh);/i],
                      [u, [f, q]],
                      [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                      [u, [f, M], [m, k]],
                      [
                        /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i,
                      ],
                      [u, [f, O], [m, x]],
                      [
                        /(?:huawei|honor)([-\w ]+)[;\)]/i,
                        /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                      ],
                      [u, [f, O], [m, k]],
                      [
                        /\b(poco[\w ]+)(?: bui|\))/i,
                        /\b; (\w+) build\/hm\1/i,
                        /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                        /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                        /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                      ],
                      [
                        [u, /_/g, " "],
                        [f, B],
                        [m, k],
                      ],
                      [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                      [
                        [u, /_/g, " "],
                        [f, B],
                        [m, x],
                      ],
                      [
                        /; (\w+) bui.+ oppo/i,
                        /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                      ],
                      [u, [f, "OPPO"], [m, k]],
                      [
                        /vivo (\w+)(?: bui|\))/i,
                        /\b(v[12]\d{3}\w?[at])(?: bui|;)/i,
                      ],
                      [u, [f, "Vivo"], [m, k]],
                      [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                      [u, [f, "Realme"], [m, k]],
                      [
                        /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                        /\bmot(?:orola)?[- ](\w*)/i,
                        /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                      ],
                      [u, [f, P], [m, k]],
                      [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                      [u, [f, P], [m, x]],
                      [
                        /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                      ],
                      [u, [f, "LG"], [m, x]],
                      [
                        /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                        /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                        /\blg-?([\d\w]+) bui/i,
                      ],
                      [u, [f, "LG"], [m, k]],
                      [
                        /(ideatab[-\w ]+)/i,
                        /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                      ],
                      [u, [f, "Lenovo"], [m, x]],
                      [
                        /(?:maemo|nokia).*(n900|lumia \d+)/i,
                        /nokia[-_ ]?([-\w\.]*)/i,
                      ],
                      [
                        [u, /_/g, " "],
                        [f, "Nokia"],
                        [m, k],
                      ],
                      [/(pixel c)\b/i],
                      [u, [f, U], [m, x]],
                      [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                      [u, [f, U], [m, k]],
                      [
                        /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                      ],
                      [u, [f, I], [m, k]],
                      [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                      [
                        [u, "Xperia Tablet"],
                        [f, I],
                        [m, x],
                      ],
                      [
                        / (kb2005|in20[12]5|be20[12][59])\b/i,
                        /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                      ],
                      [u, [f, "OnePlus"], [m, k]],
                      [
                        /(alexa)webm/i,
                        /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                        /(kf[a-z]+)( bui|\)).+silk\//i,
                      ],
                      [u, [f, S], [m, x]],
                      [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                      [
                        [u, /(.+)/g, "Fire Phone $1"],
                        [f, S],
                        [m, k],
                      ],
                      [/(playbook);[-\w\),; ]+(rim)/i],
                      [u, f, [m, x]],
                      [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                      [u, [f, z], [m, k]],
                      [
                        /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                      ],
                      [u, [f, N], [m, x]],
                      [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                      [u, [f, N], [m, k]],
                      [/(nexus 9)/i],
                      [u, [f, "HTC"], [m, x]],
                      [
                        /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                        /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                        /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                      ],
                      [f, [u, /_/g, " "], [m, k]],
                      [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                      [u, [f, "Acer"], [m, x]],
                      [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                      [u, [f, "Meizu"], [m, k]],
                      [
                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                        /(hp) ([\w ]+\w)/i,
                        /(asus)-?(\w+)/i,
                        /(microsoft); (lumia[\w ]+)/i,
                        /(lenovo)[-_ ]?([-\w]+)/i,
                        /(jolla)/i,
                        /(oppo) ?([\w ]+) bui/i,
                      ],
                      [f, u, [m, k]],
                      [
                        /(kobo)\s(ereader|touch)/i,
                        /(archos) (gamepad2?)/i,
                        /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                        /(kindle)\/([\w\.]+)/i,
                        /(nook)[\w ]+build\/(\w+)/i,
                        /(dell) (strea[kpr\d ]*[\dko])/i,
                        /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                        /(trinity)[- ]*(t\d{3}) bui/i,
                        /(gigaset)[- ]+(q\w{1,9}) bui/i,
                        /(vodafone) ([\w ]+)(?:\)| bui)/i,
                      ],
                      [f, u, [m, x]],
                      [/(surface duo)/i],
                      [u, [f, R], [m, x]],
                      [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                      [u, [f, "Fairphone"], [m, k]],
                      [/(u304aa)/i],
                      [u, [f, "AT&T"], [m, k]],
                      [/\bsie-(\w*)/i],
                      [u, [f, "Siemens"], [m, k]],
                      [/\b(rct\w+) b/i],
                      [u, [f, "RCA"], [m, x]],
                      [/\b(venue[\d ]{2,7}) b/i],
                      [u, [f, "Dell"], [m, x]],
                      [/\b(q(?:mv|ta)\w+) b/i],
                      [u, [f, "Verizon"], [m, x]],
                      [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                      [u, [f, "Barnes & Noble"], [m, x]],
                      [/\b(tm\d{3}\w+) b/i],
                      [u, [f, "NuVision"], [m, x]],
                      [/\b(k88) b/i],
                      [u, [f, "ZTE"], [m, x]],
                      [/\b(nx\d{3}j) b/i],
                      [u, [f, "ZTE"], [m, k]],
                      [/\b(gen\d{3}) b.+49h/i],
                      [u, [f, "Swiss"], [m, k]],
                      [/\b(zur\d{3}) b/i],
                      [u, [f, "Swiss"], [m, x]],
                      [/\b((zeki)?tb.*\b) b/i],
                      [u, [f, "Zeki"], [m, x]],
                      [
                        /\b([yr]\d{2}) b/i,
                        /\b(dragon[- ]+touch |dt)(\w{5}) b/i,
                      ],
                      [[f, "Dragon Touch"], u, [m, x]],
                      [/\b(ns-?\w{0,9}) b/i],
                      [u, [f, "Insignia"], [m, x]],
                      [/\b((nxa|next)-?\w{0,9}) b/i],
                      [u, [f, "NextBook"], [m, x]],
                      [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                      [[f, "Voice"], u, [m, k]],
                      [/\b(lvtel\-)?(v1[12]) b/i],
                      [[f, "LvTel"], u, [m, k]],
                      [/\b(ph-1) /i],
                      [u, [f, "Essential"], [m, k]],
                      [/\b(v(100md|700na|7011|917g).*\b) b/i],
                      [u, [f, "Envizen"], [m, x]],
                      [/\b(trio[-\w\. ]+) b/i],
                      [u, [f, "MachSpeed"], [m, x]],
                      [/\btu_(1491) b/i],
                      [u, [f, "Rotor"], [m, x]],
                      [/(shield[\w ]+) b/i],
                      [u, [f, "Nvidia"], [m, x]],
                      [/(sprint) (\w+)/i],
                      [f, u, [m, k]],
                      [/(kin\.[onetw]{3})/i],
                      [
                        [u, /\./g, " "],
                        [f, R],
                        [m, k],
                      ],
                      [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                      [u, [f, V], [m, x]],
                      [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                      [u, [f, V], [m, k]],
                      [/smart-tv.+(samsung)/i],
                      [f, [m, y]],
                      [/hbbtv.+maple;(\d+)/i],
                      [
                        [u, /^/, "SmartTV"],
                        [f, D],
                        [m, y],
                      ],
                      [
                        /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i,
                      ],
                      [
                        [f, "LG"],
                        [m, y],
                      ],
                      [/(apple) ?tv/i],
                      [f, [u, q + " TV"], [m, y]],
                      [/crkey/i],
                      [
                        [u, C + "cast"],
                        [f, U],
                        [m, y],
                      ],
                      [/droid.+aft(\w)( bui|\))/i],
                      [u, [f, S], [m, y]],
                      [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                      [u, [f, M], [m, y]],
                      [/(bravia[\w ]+)( bui|\))/i],
                      [u, [f, I], [m, y]],
                      [/(mitv-\w{5}) bui/i],
                      [u, [f, B], [m, y]],
                      [/Hbbtv.*(technisat) (.*);/i],
                      [f, u, [m, y]],
                      [
                        /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                        /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                      ],
                      [
                        [f, X],
                        [u, X],
                        [m, y],
                      ],
                      [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                      [[m, y]],
                      [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                      [f, u, [m, g]],
                      [/droid.+; (shield) bui/i],
                      [u, [f, "Nvidia"], [m, g]],
                      [/(playstation [345portablevi]+)/i],
                      [u, [f, I], [m, g]],
                      [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                      [u, [f, R], [m, g]],
                      [/((pebble))app/i],
                      [f, u, [m, _]],
                      [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                      [u, [f, q], [m, _]],
                      [/droid.+; (glass) \d/i],
                      [u, [f, U], [m, _]],
                      [/droid.+; (wt63?0{2,3})\)/i],
                      [u, [f, V], [m, _]],
                      [/(quest( 2| pro)?)/i],
                      [u, [f, L], [m, _]],
                      [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                      [f, [m, T]],
                      [/(aeobc)\b/i],
                      [u, [f, S], [m, T]],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i,
                      ],
                      [u, [m, k]],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i,
                      ],
                      [u, [m, x]],
                      [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                      [[m, x]],
                      [
                        /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                      ],
                      [[m, k]],
                      [/(android[-\w\. ]{0,9});.+buil/i],
                      [u, [f, "Generic"]],
                    ],
                    engine: [
                      [/windows.+ edge\/([\w\.]+)/i],
                      [h, [p, "EdgeHTML"]],
                      [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                      [h, [p, "Blink"]],
                      [
                        /(presto)\/([\w\.]+)/i,
                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                        /ekioh(flow)\/([\w\.]+)/i,
                        /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                        /(icab)[\/ ]([23]\.[\d\.]+)/i,
                        /\b(libweb)/i,
                      ],
                      [p, h],
                      [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                      [h, p],
                    ],
                    os: [
                      [/microsoft (windows) (vista|xp)/i],
                      [p, h],
                      [
                        /(windows) nt 6\.2; (arm)/i,
                        /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                        /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                      ],
                      [p, [h, Q, Y]],
                      [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                      [
                        [p, "Windows"],
                        [h, Q, Y],
                      ],
                      [
                        /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                        /ios;fbsv\/([\d\.]+)/i,
                        /cfnetwork\/.+darwin/i,
                      ],
                      [
                        [h, /_/g, "."],
                        [p, "iOS"],
                      ],
                      [
                        /(mac os x) ?([\w\. ]*)/i,
                        /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                      ],
                      [
                        [p, W],
                        [h, /_/g, "."],
                      ],
                      [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                      [h, p],
                      [
                        /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                        /(blackberry)\w*\/([\w\.]*)/i,
                        /(tizen|kaios)[\/ ]([\w\.]+)/i,
                        /\((series40);/i,
                      ],
                      [p, h],
                      [/\(bb(10);/i],
                      [h, [p, z]],
                      [
                        /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i,
                      ],
                      [h, [p, "Symbian"]],
                      [
                        /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                      ],
                      [h, [p, E + " OS"]],
                      [
                        /web0s;.+rt(tv)/i,
                        /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i,
                      ],
                      [h, [p, "webOS"]],
                      [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                      [h, [p, "watchOS"]],
                      [/crkey\/([\d\.]+)/i],
                      [h, [p, C + "cast"]],
                      [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                      [[p, G], h],
                      [
                        /panasonic;(viera)/i,
                        /(netrange)mmh/i,
                        /(nettv)\/(\d+\.[\w\.]+)/i,
                        /(nintendo|playstation) ([wids345portablevuch]+)/i,
                        /(xbox); +xbox ([^\);]+)/i,
                        /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                        /(mint)[\/\(\) ]?(\w*)/i,
                        /(mageia|vectorlinux)[; ]/i,
                        /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                        /(hurd|linux) ?([\w\.]*)/i,
                        /(gnu) ?([\w\.]*)/i,
                        /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                        /(haiku) (\w+)/i,
                      ],
                      [p, h],
                      [/(sunos) ?([\w\.\d]*)/i],
                      [[p, "Solaris"], h],
                      [
                        /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                        /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                        /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                        /(unix) ?([\w\.]*)/i,
                      ],
                      [p, h],
                    ],
                  },
                  ii = function (i, e) {
                    if (
                      (typeof i === d && ((e = i), (i = s)),
                      !(this instanceof ii))
                    )
                      return new ii(i, e).getResult();
                    var o = typeof n !== w && n.navigator ? n.navigator : s,
                      a = i || (o && o.userAgent ? o.userAgent : ""),
                      r = o && o.userAgentData ? o.userAgentData : s,
                      t = e ? Z(J, e) : J,
                      g = o && o.userAgent == a;
                    return (
                      (this.getBrowser = function () {
                        var i,
                          e = {};
                        return (
                          (e[p] = s),
                          (e[h] = s),
                          K.call(e, a, t.browser),
                          (e[c] =
                            typeof (i = e[h]) === l
                              ? i.replace(/[^\d\.]/g, "").split(".")[0]
                              : s),
                          g &&
                            o &&
                            o.brave &&
                            typeof o.brave.isBrave == b &&
                            (e[p] = "Brave"),
                          e
                        );
                      }),
                      (this.getCPU = function () {
                        var i = {};
                        return (i[v] = s), K.call(i, a, t.cpu), i;
                      }),
                      (this.getDevice = function () {
                        var i = {};
                        return (
                          (i[f] = s),
                          (i[u] = s),
                          (i[m] = s),
                          K.call(i, a, t.device),
                          g && !i[m] && r && r.mobile && (i[m] = k),
                          g &&
                            "Macintosh" == i[u] &&
                            o &&
                            typeof o.standalone !== w &&
                            o.maxTouchPoints &&
                            o.maxTouchPoints > 2 &&
                            ((i[u] = "iPad"), (i[m] = x)),
                          i
                        );
                      }),
                      (this.getEngine = function () {
                        var i = {};
                        return (
                          (i[p] = s), (i[h] = s), K.call(i, a, t.engine), i
                        );
                      }),
                      (this.getOS = function () {
                        var i = {};
                        return (
                          (i[p] = s),
                          (i[h] = s),
                          K.call(i, a, t.os),
                          g &&
                            !i[p] &&
                            r &&
                            "Unknown" != r.platform &&
                            (i[p] = r.platform
                              .replace(/chrome os/i, G)
                              .replace(/macos/i, W)),
                          i
                        );
                      }),
                      (this.getResult = function () {
                        return {
                          ua: this.getUA(),
                          browser: this.getBrowser(),
                          engine: this.getEngine(),
                          os: this.getOS(),
                          device: this.getDevice(),
                          cpu: this.getCPU(),
                        };
                      }),
                      (this.getUA = function () {
                        return a;
                      }),
                      (this.setUA = function (i) {
                        return (
                          (a =
                            typeof i === l && i.length > 350 ? X(i, 350) : i),
                          this
                        );
                      }),
                      this.setUA(a),
                      this
                    );
                  };
                (ii.VERSION = "1.0.35"),
                  (ii.BROWSER = F([p, h, c])),
                  (ii.CPU = F([v])),
                  (ii.DEVICE = F([u, f, m, g, k, y, x, _, T])),
                  (ii.ENGINE = ii.OS = F([p, h])),
                  typeof t !== w
                    ? (r.exports && (t = r.exports = ii), (t.UAParser = ii))
                    : o.amdO
                      ? void 0 ===
                          (a = function () {
                            return ii;
                          }.call(e, o, e, i)) || (i.exports = a)
                      : typeof n !== w && (n.UAParser = ii);
                var ie = typeof n !== w && (n.jQuery || n.Zepto);
                if (ie && !ie.ua) {
                  var io = new ii();
                  (ie.ua = io.getResult()),
                    (ie.ua.get = function () {
                      return io.getUA();
                    }),
                    (ie.ua.set = function (i) {
                      io.setUA(i);
                      var e = io.getResult();
                      for (var o in e) ie.ua[o] = e[o];
                    });
                }
              })("object" == typeof window ? window : this);
            },
          },
          t = {};
        function n(i) {
          var e = t[i];
          if (void 0 !== e) return e.exports;
          var o = (t[i] = { exports: {} }),
            a = !0;
          try {
            r[i].call(o.exports, o, o.exports, n), (a = !1);
          } finally {
            a && delete t[i];
          }
          return o.exports;
        }
        (n.ab = "//"), (i.exports = n(226));
      })();
    },
  },
]);
//# sourceMappingURL=83.js.map
