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
    t = new e.Error().stack;
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = "081fb0de-9f9e-40e7-8fce-2bf720ea1fc9"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-081fb0de-9f9e-40e7-8fce-2bf720ea1fc9"));
} catch (e) {}
(exports.id = 3626),
  (exports.ids = [3626]),
  (exports.modules = {
    252: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ReflectAdapter", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      class r {
        static get(e, t, r) {
          let n = Reflect.get(e, t, r);
          return "function" == typeof n ? n.bind(e) : n;
        }
        static set(e, t, r, n) {
          return Reflect.set(e, t, r, n);
        }
        static has(e, t) {
          return Reflect.has(e, t);
        }
        static deleteProperty(e, t) {
          return Reflect.deleteProperty(e, t);
        }
      }
    },
    1895: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SlicePathComponent = void 0);
      var n = r(88269);
      t.SlicePathComponent = (function () {
        function e(e, t) {
          (this.endIndex = null),
            (this.isArray = !0),
            (this.startIndex = e),
            (this.endIndex = t);
        }
        return (
          (e.fromString = function (t) {
            if (!e.regex.test(t)) return null;
            e.regex.lastIndex = 0;
            var r = e.regex.exec(t);
            if (null == r || null == r.groups) return null;
            var n = r.groups.startIndex,
              i = r.groups.endIndex,
              a = null == n || "" === n ? 0 : parseInt(n, 10),
              s = null == i ? null : parseInt(i, 10);
            return (null != a || null != s) && Number.isInteger(a)
              ? new e(a, s)
              : null;
          }),
          (e.prototype.toString = function () {
            return "["
              .concat(this.startIndex)
              .concat(null == this.endIndex ? "" : ":" + this.endIndex, "]");
          }),
          (e.prototype.jsonPointer = function () {
            throw Error("JSON Pointers don't work with wildcards");
          }),
          (e.prototype.query = function (e) {
            for (var t = [], r = 0; r < e.length; r++) {
              var i = e[r],
                a = i.object;
              if ("object" == typeof a && Array.isArray(a)) {
                var s = void 0;
                s =
                  null == this.endIndex
                    ? a.slice(this.startIndex)
                    : a.slice(this.startIndex, this.endIndex);
                for (var o = 0; o < s.length; o++) {
                  var l = s[o];
                  t.push(
                    new n.default(
                      i.depth + 1,
                      i.path.child("".concat(o + this.startIndex)),
                      l,
                    ),
                  );
                }
              }
            }
            return t;
          }),
          (e.regex = /^\[(?<startIndex>[0-9]*):(?<endIndex>\-?[0-9]*)?\]$/g),
          e
        );
      })();
    },
    27758: (e, t, r) => {
      "use strict";
      r.d(t, { aK: () => i });
      var n = r(77598);
      let i = n.webcrypto?.subtle || {};
    },
    29167: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__spreadArray) ||
        function (e, t, r) {
          if (r || 2 == arguments.length)
            for (var n, i = 0, a = t.length; i < a; i++)
              (!n && i in t) ||
                (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
          return e.concat(n || Array.prototype.slice.call(t));
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.JSONHeroPath = void 0);
      var i = r(54638),
        a = r(88269),
        s = r(88041);
      t.JSONHeroPath = (function () {
        function e(e) {
          if ("string" == typeof e) {
            var t = new i.default();
            this.components = t.parse(e);
            return;
          }
          0 == e.length && e.push(new s.default()),
            e[0] instanceof s.default || e.unshift(new s.default()),
            (this.components = e);
        }
        return (
          (e.fromPointer = function (t) {
            return new e(new i.default().parsePointer(t));
          }),
          Object.defineProperty(e.prototype, "root", {
            get: function () {
              return new e(this.components.slice(0, 1));
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "isRoot", {
            get: function () {
              return (
                !(this.components.length > 1) &&
                this.components[0] instanceof s.default
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "parent", {
            get: function () {
              return 1 == this.components.length
                ? null
                : new e(this.components.slice(0, -1));
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "lastComponent", {
            get: function () {
              if (0 !== this.components.length)
                return this.components[this.components.length - 1];
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.child = function (t) {
            return new e(this.toString().concat(".".concat(t)));
          }),
          (e.prototype.replaceComponent = function (t, r) {
            var a = new i.default().parseComponent(r),
              s = n([], this.components, !0);
            return (s[t] = a), new e(s);
          }),
          (e.prototype.toString = function () {
            return this.components
              .map(function (e) {
                return e.toString();
              })
              .join(".");
          }),
          (e.prototype.jsonPointer = function () {
            return 1 === this.components.length
              ? ""
              : this.components
                  .map(function (e) {
                    return e.jsonPointer();
                  })
                  .join("/");
          }),
          (e.prototype.first = function (e, t) {
            void 0 === t && (t = { includePath: !1 });
            var r = this.all(e, t);
            return null === r || 0 === r.length ? null : r[0];
          }),
          (e.prototype.all = function (e, t) {
            if (
              (void 0 === t && (t = { includePath: !1 }),
              0 == this.components.length ||
                (1 == this.components.length &&
                  this.components[0] instanceof s.default))
            )
              return [e];
            var r = [],
              n = new a.default(0, this.root, e);
            r.push(n);
            for (var i = 0; i < this.components.length; i++)
              if (null === (r = this.components[i].query(r)) || 0 === r.length)
                return [];
            var o = r.map(function (e) {
              return e.flatten();
            });
            if (!t.includePath)
              return o.map(function (e) {
                return e.object;
              });
            for (var l = [], i = 0; i < o.length; i++) {
              var u = o[i],
                c = { value: u.object };
              t.includePath && (c.path = u.path), l.push(c);
            }
            return l;
          }),
          (e.prototype.set = function (e, t) {
            this.all(e, { includePath: !0 }).forEach(function (r) {
              var n = r.path,
                i = n.parent,
                a = null == i ? void 0 : i.first(e);
              n.lastComponent && (a[n.lastComponent.toString()] = t);
            });
          }),
          (e.prototype.merge = function (e, t) {
            this.all(e, { includePath: !0 }).forEach(function (r) {
              var n = r.path,
                i = n.parent,
                a = null == i ? void 0 : i.first(e);
              if (n.lastComponent) {
                var s = a[n.lastComponent.toString()];
                if (Array.isArray(s))
                  a[n.lastComponent.toString()] = s.concat([t].flat());
                else {
                  if ("object" != typeof t || Array.isArray(t)) return;
                  for (var o in t) s[o] = t[o];
                }
              }
            });
          }),
          e
        );
      })();
    },
    29734: (e, t, r) => {
      "use strict";
      let n;
      r.d(t, { vB: () => lk }),
        (function (e) {
          (e.assertEqual = (e) => e),
            (e.assertIs = function (e) {}),
            (e.assertNever = function (e) {
              throw Error();
            }),
            (e.arrayToEnum = (e) => {
              let t = {};
              for (let r of e) t[r] = r;
              return t;
            }),
            (e.getValidEnumValues = (t) => {
              let r = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
                n = {};
              for (let e of r) n[e] = t[e];
              return e.objectValues(n);
            }),
            (e.objectValues = (t) =>
              e.objectKeys(t).map(function (e) {
                return t[e];
              })),
            (e.objectKeys =
              "function" == typeof Object.keys
                ? (e) => Object.keys(e)
                : (e) => {
                    let t = [];
                    for (let r in e)
                      Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                    return t;
                  }),
            (e.find = (e, t) => {
              for (let r of e) if (t(r)) return r;
            }),
            (e.isInteger =
              "function" == typeof Number.isInteger
                ? (e) => Number.isInteger(e)
                : (e) =>
                    "number" == typeof e && isFinite(e) && Math.floor(e) === e),
            (e.joinValues = function (e, t = " | ") {
              return e
                .map((e) => ("string" == typeof e ? `'${e}'` : e))
                .join(t);
            }),
            (e.jsonStringifyReplacer = (e, t) =>
              "bigint" == typeof t ? t.toString() : t);
        })(e8 || (e8 = {})),
        ((e7 || (e7 = {})).mergeShapes = (e, t) => ({ ...e, ...t }));
      let i = e8.arrayToEnum([
          "string",
          "nan",
          "number",
          "integer",
          "float",
          "boolean",
          "date",
          "bigint",
          "symbol",
          "function",
          "undefined",
          "null",
          "array",
          "object",
          "unknown",
          "promise",
          "void",
          "never",
          "map",
          "set",
        ]),
        a = (e) => {
          switch (typeof e) {
            case "undefined":
              return i.undefined;
            case "string":
              return i.string;
            case "number":
              return isNaN(e) ? i.nan : i.number;
            case "boolean":
              return i.boolean;
            case "function":
              return i.function;
            case "bigint":
              return i.bigint;
            case "symbol":
              return i.symbol;
            case "object":
              if (Array.isArray(e)) return i.array;
              if (null === e) return i.null;
              if (
                e.then &&
                "function" == typeof e.then &&
                e.catch &&
                "function" == typeof e.catch
              )
                return i.promise;
              if ("undefined" != typeof Map && e instanceof Map) return i.map;
              if ("undefined" != typeof Set && e instanceof Set) return i.set;
              if ("undefined" != typeof Date && e instanceof Date)
                return i.date;
              return i.object;
            default:
              return i.unknown;
          }
        },
        s = e8.arrayToEnum([
          "invalid_type",
          "invalid_literal",
          "custom",
          "invalid_union",
          "invalid_union_discriminator",
          "invalid_enum_value",
          "unrecognized_keys",
          "invalid_arguments",
          "invalid_return_type",
          "invalid_date",
          "invalid_string",
          "too_small",
          "too_big",
          "invalid_intersection_types",
          "not_multiple_of",
          "not_finite",
        ]);
      class o extends Error {
        constructor(e) {
          super(),
            (this.issues = []),
            (this.addIssue = (e) => {
              this.issues = [...this.issues, e];
            }),
            (this.addIssues = (e = []) => {
              this.issues = [...this.issues, ...e];
            });
          let t = new.target.prototype;
          Object.setPrototypeOf
            ? Object.setPrototypeOf(this, t)
            : (this.__proto__ = t),
            (this.name = "ZodError"),
            (this.issues = e);
        }
        get errors() {
          return this.issues;
        }
        format(e) {
          let t =
              e ||
              function (e) {
                return e.message;
              },
            r = { _errors: [] },
            n = (e) => {
              for (let i of e.issues)
                if ("invalid_union" === i.code) i.unionErrors.map(n);
                else if ("invalid_return_type" === i.code) n(i.returnTypeError);
                else if ("invalid_arguments" === i.code) n(i.argumentsError);
                else if (0 === i.path.length) r._errors.push(t(i));
                else {
                  let e = r,
                    n = 0;
                  for (; n < i.path.length; ) {
                    let r = i.path[n];
                    n === i.path.length - 1
                      ? ((e[r] = e[r] || { _errors: [] }),
                        e[r]._errors.push(t(i)))
                      : (e[r] = e[r] || { _errors: [] }),
                      (e = e[r]),
                      n++;
                  }
                }
            };
          return n(this), r;
        }
        static assert(e) {
          if (!(e instanceof o)) throw Error(`Not a ZodError: ${e}`);
        }
        toString() {
          return this.message;
        }
        get message() {
          return JSON.stringify(this.issues, e8.jsonStringifyReplacer, 2);
        }
        get isEmpty() {
          return 0 === this.issues.length;
        }
        flatten(e = (e) => e.message) {
          let t = {},
            r = [];
          for (let n of this.issues)
            n.path.length > 0
              ? ((t[n.path[0]] = t[n.path[0]] || []), t[n.path[0]].push(e(n)))
              : r.push(e(n));
          return { formErrors: r, fieldErrors: t };
        }
        get formErrors() {
          return this.flatten();
        }
      }
      o.create = (e) => new o(e);
      let l = (e, t) => {
          let r;
          switch (e.code) {
            case s.invalid_type:
              r =
                e.received === i.undefined
                  ? "Required"
                  : `Expected ${e.expected}, received ${e.received}`;
              break;
            case s.invalid_literal:
              r = `Invalid literal value, expected ${JSON.stringify(e.expected, e8.jsonStringifyReplacer)}`;
              break;
            case s.unrecognized_keys:
              r = `Unrecognized key(s) in object: ${e8.joinValues(e.keys, ", ")}`;
              break;
            case s.invalid_union:
              r = "Invalid input";
              break;
            case s.invalid_union_discriminator:
              r = `Invalid discriminator value. Expected ${e8.joinValues(e.options)}`;
              break;
            case s.invalid_enum_value:
              r = `Invalid enum value. Expected ${e8.joinValues(e.options)}, received '${e.received}'`;
              break;
            case s.invalid_arguments:
              r = "Invalid function arguments";
              break;
            case s.invalid_return_type:
              r = "Invalid function return type";
              break;
            case s.invalid_date:
              r = "Invalid date";
              break;
            case s.invalid_string:
              "object" == typeof e.validation
                ? "includes" in e.validation
                  ? ((r = `Invalid input: must include "${e.validation.includes}"`),
                    "number" == typeof e.validation.position &&
                      (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
                  : "startsWith" in e.validation
                    ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
                    : "endsWith" in e.validation
                      ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
                      : e8.assertNever(e.validation)
                : (r =
                    "regex" !== e.validation
                      ? `Invalid ${e.validation}`
                      : "Invalid");
              break;
            case s.too_small:
              r =
                "array" === e.type
                  ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`
                  : "string" === e.type
                    ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`
                    : "number" === e.type
                      ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`
                      : "date" === e.type
                        ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`
                        : "Invalid input";
              break;
            case s.too_big:
              r =
                "array" === e.type
                  ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`
                  : "string" === e.type
                    ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`
                    : "number" === e.type
                      ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`
                      : "bigint" === e.type
                        ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`
                        : "date" === e.type
                          ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`
                          : "Invalid input";
              break;
            case s.custom:
              r = "Invalid input";
              break;
            case s.invalid_intersection_types:
              r = "Intersection results could not be merged";
              break;
            case s.not_multiple_of:
              r = `Number must be a multiple of ${e.multipleOf}`;
              break;
            case s.not_finite:
              r = "Number must be finite";
              break;
            default:
              (r = t.defaultError), e8.assertNever(e);
          }
          return { message: r };
        },
        u = l;
      function c() {
        return u;
      }
      let d = (e) => {
        let { data: t, path: r, errorMaps: n, issueData: i } = e,
          a = [...r, ...(i.path || [])],
          s = { ...i, path: a };
        if (void 0 !== i.message) return { ...i, path: a, message: i.message };
        let o = "";
        for (let e of n
          .filter((e) => !!e)
          .slice()
          .reverse())
          o = e(s, { data: t, defaultError: o }).message;
        return { ...i, path: a, message: o };
      };
      function p(e, t) {
        let r = c(),
          n = d({
            issueData: t,
            data: e.data,
            path: e.path,
            errorMaps: [
              e.common.contextualErrorMap,
              e.schemaErrorMap,
              r,
              r === l ? void 0 : l,
            ].filter((e) => !!e),
          });
        e.common.issues.push(n);
      }
      class h {
        constructor() {
          this.value = "valid";
        }
        dirty() {
          "valid" === this.value && (this.value = "dirty");
        }
        abort() {
          "aborted" !== this.value && (this.value = "aborted");
        }
        static mergeArray(e, t) {
          let r = [];
          for (let n of t) {
            if ("aborted" === n.status) return g;
            "dirty" === n.status && e.dirty(), r.push(n.value);
          }
          return { status: e.value, value: r };
        }
        static async mergeObjectAsync(e, t) {
          let r = [];
          for (let e of t) {
            let t = await e.key,
              n = await e.value;
            r.push({ key: t, value: n });
          }
          return h.mergeObjectSync(e, r);
        }
        static mergeObjectSync(e, t) {
          let r = {};
          for (let n of t) {
            let { key: t, value: i } = n;
            if ("aborted" === t.status || "aborted" === i.status) return g;
            "dirty" === t.status && e.dirty(),
              "dirty" === i.status && e.dirty(),
              "__proto__" !== t.value &&
                (void 0 !== i.value || n.alwaysSet) &&
                (r[t.value] = i.value);
          }
          return { status: e.value, value: r };
        }
      }
      let g = Object.freeze({ status: "aborted" }),
        m = (e) => ({ status: "dirty", value: e }),
        f = (e) => ({ status: "valid", value: e }),
        y = (e) => "aborted" === e.status,
        b = (e) => "dirty" === e.status,
        v = (e) => "valid" === e.status,
        _ = (e) => "undefined" != typeof Promise && e instanceof Promise;
      function k(e, t, r, n) {
        if ("a" === r && !n)
          throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t ? e !== t || !n : !t.has(e))
          throw TypeError(
            "Cannot read private member from an object whose class did not declare it",
          );
        return "m" === r ? n : "a" === r ? n.call(e) : n ? n.value : t.get(e);
      }
      function T(e, t, r, n, i) {
        if ("m" === n) throw TypeError("Private method is not writable");
        if ("a" === n && !i)
          throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t ? e !== t || !i : !t.has(e))
          throw TypeError(
            "Cannot write private member to an object whose class did not declare it",
          );
        return "a" === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r;
      }
      "function" == typeof SuppressedError && SuppressedError,
        (function (e) {
          (e.errToObj = (e) =>
            "string" == typeof e ? { message: e } : e || {}),
            (e.toString = (e) =>
              "string" == typeof e ? e : null == e ? void 0 : e.message);
        })(te || (te = {}));
      class E {
        constructor(e, t, r, n) {
          (this._cachedPath = []),
            (this.parent = e),
            (this.data = t),
            (this._path = r),
            (this._key = n);
        }
        get path() {
          return (
            this._cachedPath.length ||
              (this._key instanceof Array
                ? this._cachedPath.push(...this._path, ...this._key)
                : this._cachedPath.push(...this._path, this._key)),
            this._cachedPath
          );
        }
      }
      let j = (e, t) => {
        if (v(t)) return { success: !0, data: t.value };
        if (!e.common.issues.length)
          throw Error("Validation failed but no issues detected.");
        return {
          success: !1,
          get error() {
            if (this._error) return this._error;
            let t = new o(e.common.issues);
            return (this._error = t), this._error;
          },
        };
      };
      function w(e) {
        if (!e) return {};
        let {
          errorMap: t,
          invalid_type_error: r,
          required_error: n,
          description: i,
        } = e;
        if (t && (r || n))
          throw Error(
            'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.',
          );
        return t
          ? { errorMap: t, description: i }
          : {
              errorMap: (t, i) => {
                var a, s;
                let { message: o } = e;
                return "invalid_enum_value" === t.code
                  ? { message: null != o ? o : i.defaultError }
                  : void 0 === i.data
                    ? {
                        message:
                          null != (a = null != o ? o : n) ? a : i.defaultError,
                      }
                    : "invalid_type" !== t.code
                      ? { message: i.defaultError }
                      : {
                          message:
                            null != (s = null != o ? o : r)
                              ? s
                              : i.defaultError,
                        };
              },
              description: i,
            };
      }
      class I {
        constructor(e) {
          (this.spa = this.safeParseAsync),
            (this._def = e),
            (this.parse = this.parse.bind(this)),
            (this.safeParse = this.safeParse.bind(this)),
            (this.parseAsync = this.parseAsync.bind(this)),
            (this.safeParseAsync = this.safeParseAsync.bind(this)),
            (this.spa = this.spa.bind(this)),
            (this.refine = this.refine.bind(this)),
            (this.refinement = this.refinement.bind(this)),
            (this.superRefine = this.superRefine.bind(this)),
            (this.optional = this.optional.bind(this)),
            (this.nullable = this.nullable.bind(this)),
            (this.nullish = this.nullish.bind(this)),
            (this.array = this.array.bind(this)),
            (this.promise = this.promise.bind(this)),
            (this.or = this.or.bind(this)),
            (this.and = this.and.bind(this)),
            (this.transform = this.transform.bind(this)),
            (this.brand = this.brand.bind(this)),
            (this.default = this.default.bind(this)),
            (this.catch = this.catch.bind(this)),
            (this.describe = this.describe.bind(this)),
            (this.pipe = this.pipe.bind(this)),
            (this.readonly = this.readonly.bind(this)),
            (this.isNullable = this.isNullable.bind(this)),
            (this.isOptional = this.isOptional.bind(this));
        }
        get description() {
          return this._def.description;
        }
        _getType(e) {
          return a(e.data);
        }
        _getOrReturnCtx(e, t) {
          return (
            t || {
              common: e.parent.common,
              data: e.data,
              parsedType: a(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent,
            }
          );
        }
        _processInputParams(e) {
          return {
            status: new h(),
            ctx: {
              common: e.parent.common,
              data: e.data,
              parsedType: a(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent,
            },
          };
        }
        _parseSync(e) {
          let t = this._parse(e);
          if (_(t)) throw Error("Synchronous parse encountered promise.");
          return t;
        }
        _parseAsync(e) {
          return Promise.resolve(this._parse(e));
        }
        parse(e, t) {
          let r = this.safeParse(e, t);
          if (r.success) return r.data;
          throw r.error;
        }
        safeParse(e, t) {
          var r;
          let n = {
              common: {
                issues: [],
                async: null != (r = null == t ? void 0 : t.async) && r,
                contextualErrorMap: null == t ? void 0 : t.errorMap,
              },
              path: (null == t ? void 0 : t.path) || [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: a(e),
            },
            i = this._parseSync({ data: e, path: n.path, parent: n });
          return j(n, i);
        }
        async parseAsync(e, t) {
          let r = await this.safeParseAsync(e, t);
          if (r.success) return r.data;
          throw r.error;
        }
        async safeParseAsync(e, t) {
          let r = {
              common: {
                issues: [],
                contextualErrorMap: null == t ? void 0 : t.errorMap,
                async: !0,
              },
              path: (null == t ? void 0 : t.path) || [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: a(e),
            },
            n = this._parse({ data: e, path: r.path, parent: r });
          return j(r, await (_(n) ? n : Promise.resolve(n)));
        }
        refine(e, t) {
          let r = (e) =>
            "string" == typeof t || void 0 === t
              ? { message: t }
              : "function" == typeof t
                ? t(e)
                : t;
          return this._refinement((t, n) => {
            let i = e(t),
              a = () => n.addIssue({ code: s.custom, ...r(t) });
            return "undefined" != typeof Promise && i instanceof Promise
              ? i.then((e) => !!e || (a(), !1))
              : !!i || (a(), !1);
          });
        }
        refinement(e, t) {
          return this._refinement(
            (r, n) =>
              !!e(r) || (n.addIssue("function" == typeof t ? t(r, n) : t), !1),
          );
        }
        _refinement(e) {
          return new ef({
            schema: this,
            typeName: tn.ZodEffects,
            effect: { type: "refinement", refinement: e },
          });
        }
        superRefine(e) {
          return this._refinement(e);
        }
        optional() {
          return ey.create(this, this._def);
        }
        nullable() {
          return eb.create(this, this._def);
        }
        nullish() {
          return this.nullable().optional();
        }
        array() {
          return Q.create(this, this._def);
        }
        promise() {
          return em.create(this, this._def);
        }
        or(e) {
          return et.create([this, e], this._def);
        }
        and(e) {
          return ei.create(this, e, this._def);
        }
        transform(e) {
          return new ef({
            ...w(this._def),
            schema: this,
            typeName: tn.ZodEffects,
            effect: { type: "transform", transform: e },
          });
        }
        default(e) {
          return new ev({
            ...w(this._def),
            innerType: this,
            defaultValue: "function" == typeof e ? e : () => e,
            typeName: tn.ZodDefault,
          });
        }
        brand() {
          return new eE({
            typeName: tn.ZodBranded,
            type: this,
            ...w(this._def),
          });
        }
        catch(e) {
          return new e_({
            ...w(this._def),
            innerType: this,
            catchValue: "function" == typeof e ? e : () => e,
            typeName: tn.ZodCatch,
          });
        }
        describe(e) {
          return new this.constructor({ ...this._def, description: e });
        }
        pipe(e) {
          return ej.create(this, e);
        }
        readonly() {
          return ew.create(this);
        }
        isOptional() {
          return this.safeParse(void 0).success;
        }
        isNullable() {
          return this.safeParse(null).success;
        }
      }
      let x = /^c[^\s-]{8,}$/i,
        S = /^[0-9a-z]+$/,
        R = /^[0-9A-HJKMNP-TV-Z]{26}$/,
        A =
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
        O = /^[a-z0-9_-]{21}$/i,
        C =
          /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
        P =
          /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
        N =
          /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
        M =
          /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
        U = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
        $ =
          "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
        D = RegExp(`^${$}$`);
      function L(e) {
        let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
        return (
          e.precision
            ? (t = `${t}\\.\\d{${e.precision}}`)
            : null == e.precision && (t = `${t}(\\.\\d+)?`),
          t
        );
      }
      function Z(e) {
        let t = `${$}T${L(e)}`,
          r = [];
        return (
          r.push(e.local ? "Z?" : "Z"),
          e.offset && r.push("([+-]\\d{2}:?\\d{2})"),
          (t = `${t}(${r.join("|")})`),
          RegExp(`^${t}$`)
        );
      }
      class K extends I {
        _parse(e) {
          var t, r;
          let a;
          if (
            (this._def.coerce && (e.data = String(e.data)),
            this._getType(e) !== i.string)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.string,
                received: t.parsedType,
              }),
              g
            );
          }
          let o = new h();
          for (let i of this._def.checks)
            if ("min" === i.kind)
              e.data.length < i.value &&
                (p((a = this._getOrReturnCtx(e, a)), {
                  code: s.too_small,
                  minimum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: i.message,
                }),
                o.dirty());
            else if ("max" === i.kind)
              e.data.length > i.value &&
                (p((a = this._getOrReturnCtx(e, a)), {
                  code: s.too_big,
                  maximum: i.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: i.message,
                }),
                o.dirty());
            else if ("length" === i.kind) {
              let t = e.data.length > i.value,
                r = e.data.length < i.value;
              (t || r) &&
                ((a = this._getOrReturnCtx(e, a)),
                t
                  ? p(a, {
                      code: s.too_big,
                      maximum: i.value,
                      type: "string",
                      inclusive: !0,
                      exact: !0,
                      message: i.message,
                    })
                  : r &&
                    p(a, {
                      code: s.too_small,
                      minimum: i.value,
                      type: "string",
                      inclusive: !0,
                      exact: !0,
                      message: i.message,
                    }),
                o.dirty());
            } else if ("email" === i.kind)
              P.test(e.data) ||
                (p((a = this._getOrReturnCtx(e, a)), {
                  validation: "email",
                  code: s.invalid_string,
                  message: i.message,
                }),
                o.dirty());
            else if ("emoji" === i.kind)
              n ||
                (n = RegExp(
                  "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
                  "u",
                )),
                n.test(e.data) ||
                  (p((a = this._getOrReturnCtx(e, a)), {
                    validation: "emoji",
                    code: s.invalid_string,
                    message: i.message,
                  }),
                  o.dirty());
            else if ("uuid" === i.kind)
              A.test(e.data) ||
                (p((a = this._getOrReturnCtx(e, a)), {
                  validation: "uuid",
                  code: s.invalid_string,
                  message: i.message,
                }),
                o.dirty());
            else if ("nanoid" === i.kind)
              O.test(e.data) ||
                (p((a = this._getOrReturnCtx(e, a)), {
                  validation: "nanoid",
                  code: s.invalid_string,
                  message: i.message,
                }),
                o.dirty());
            else if ("cuid" === i.kind)
              x.test(e.data) ||
                (p((a = this._getOrReturnCtx(e, a)), {
                  validation: "cuid",
                  code: s.invalid_string,
                  message: i.message,
                }),
                o.dirty());
            else if ("cuid2" === i.kind)
              S.test(e.data) ||
                (p((a = this._getOrReturnCtx(e, a)), {
                  validation: "cuid2",
                  code: s.invalid_string,
                  message: i.message,
                }),
                o.dirty());
            else if ("ulid" === i.kind)
              R.test(e.data) ||
                (p((a = this._getOrReturnCtx(e, a)), {
                  validation: "ulid",
                  code: s.invalid_string,
                  message: i.message,
                }),
                o.dirty());
            else if ("url" === i.kind)
              try {
                new URL(e.data);
              } catch (t) {
                p((a = this._getOrReturnCtx(e, a)), {
                  validation: "url",
                  code: s.invalid_string,
                  message: i.message,
                }),
                  o.dirty();
              }
            else
              "regex" === i.kind
                ? ((i.regex.lastIndex = 0),
                  i.regex.test(e.data) ||
                    (p((a = this._getOrReturnCtx(e, a)), {
                      validation: "regex",
                      code: s.invalid_string,
                      message: i.message,
                    }),
                    o.dirty()))
                : "trim" === i.kind
                  ? (e.data = e.data.trim())
                  : "includes" === i.kind
                    ? e.data.includes(i.value, i.position) ||
                      (p((a = this._getOrReturnCtx(e, a)), {
                        code: s.invalid_string,
                        validation: { includes: i.value, position: i.position },
                        message: i.message,
                      }),
                      o.dirty())
                    : "toLowerCase" === i.kind
                      ? (e.data = e.data.toLowerCase())
                      : "toUpperCase" === i.kind
                        ? (e.data = e.data.toUpperCase())
                        : "startsWith" === i.kind
                          ? e.data.startsWith(i.value) ||
                            (p((a = this._getOrReturnCtx(e, a)), {
                              code: s.invalid_string,
                              validation: { startsWith: i.value },
                              message: i.message,
                            }),
                            o.dirty())
                          : "endsWith" === i.kind
                            ? e.data.endsWith(i.value) ||
                              (p((a = this._getOrReturnCtx(e, a)), {
                                code: s.invalid_string,
                                validation: { endsWith: i.value },
                                message: i.message,
                              }),
                              o.dirty())
                            : "datetime" === i.kind
                              ? Z(i).test(e.data) ||
                                (p((a = this._getOrReturnCtx(e, a)), {
                                  code: s.invalid_string,
                                  validation: "datetime",
                                  message: i.message,
                                }),
                                o.dirty())
                              : "date" === i.kind
                                ? D.test(e.data) ||
                                  (p((a = this._getOrReturnCtx(e, a)), {
                                    code: s.invalid_string,
                                    validation: "date",
                                    message: i.message,
                                  }),
                                  o.dirty())
                                : "time" === i.kind
                                  ? RegExp(`^${L(i)}$`).test(e.data) ||
                                    (p((a = this._getOrReturnCtx(e, a)), {
                                      code: s.invalid_string,
                                      validation: "time",
                                      message: i.message,
                                    }),
                                    o.dirty())
                                  : "duration" === i.kind
                                    ? C.test(e.data) ||
                                      (p((a = this._getOrReturnCtx(e, a)), {
                                        validation: "duration",
                                        code: s.invalid_string,
                                        message: i.message,
                                      }),
                                      o.dirty())
                                    : "ip" === i.kind
                                      ? ((t = e.data),
                                        !(
                                          (("v4" === (r = i.version) || !r) &&
                                            N.test(t)) ||
                                          (("v6" === r || !r) && M.test(t))
                                        ) &&
                                          1 &&
                                          (p((a = this._getOrReturnCtx(e, a)), {
                                            validation: "ip",
                                            code: s.invalid_string,
                                            message: i.message,
                                          }),
                                          o.dirty()))
                                      : "base64" === i.kind
                                        ? U.test(e.data) ||
                                          (p((a = this._getOrReturnCtx(e, a)), {
                                            validation: "base64",
                                            code: s.invalid_string,
                                            message: i.message,
                                          }),
                                          o.dirty())
                                        : e8.assertNever(i);
          return { status: o.value, value: e.data };
        }
        _regex(e, t, r) {
          return this.refinement((t) => e.test(t), {
            validation: t,
            code: s.invalid_string,
            ...te.errToObj(r),
          });
        }
        _addCheck(e) {
          return new K({ ...this._def, checks: [...this._def.checks, e] });
        }
        email(e) {
          return this._addCheck({ kind: "email", ...te.errToObj(e) });
        }
        url(e) {
          return this._addCheck({ kind: "url", ...te.errToObj(e) });
        }
        emoji(e) {
          return this._addCheck({ kind: "emoji", ...te.errToObj(e) });
        }
        uuid(e) {
          return this._addCheck({ kind: "uuid", ...te.errToObj(e) });
        }
        nanoid(e) {
          return this._addCheck({ kind: "nanoid", ...te.errToObj(e) });
        }
        cuid(e) {
          return this._addCheck({ kind: "cuid", ...te.errToObj(e) });
        }
        cuid2(e) {
          return this._addCheck({ kind: "cuid2", ...te.errToObj(e) });
        }
        ulid(e) {
          return this._addCheck({ kind: "ulid", ...te.errToObj(e) });
        }
        base64(e) {
          return this._addCheck({ kind: "base64", ...te.errToObj(e) });
        }
        ip(e) {
          return this._addCheck({ kind: "ip", ...te.errToObj(e) });
        }
        datetime(e) {
          var t, r;
          return "string" == typeof e
            ? this._addCheck({
                kind: "datetime",
                precision: null,
                offset: !1,
                local: !1,
                message: e,
              })
            : this._addCheck({
                kind: "datetime",
                precision:
                  void 0 === (null == e ? void 0 : e.precision)
                    ? null
                    : null == e
                      ? void 0
                      : e.precision,
                offset: null != (t = null == e ? void 0 : e.offset) && t,
                local: null != (r = null == e ? void 0 : e.local) && r,
                ...te.errToObj(null == e ? void 0 : e.message),
              });
        }
        date(e) {
          return this._addCheck({ kind: "date", message: e });
        }
        time(e) {
          return "string" == typeof e
            ? this._addCheck({ kind: "time", precision: null, message: e })
            : this._addCheck({
                kind: "time",
                precision:
                  void 0 === (null == e ? void 0 : e.precision)
                    ? null
                    : null == e
                      ? void 0
                      : e.precision,
                ...te.errToObj(null == e ? void 0 : e.message),
              });
        }
        duration(e) {
          return this._addCheck({ kind: "duration", ...te.errToObj(e) });
        }
        regex(e, t) {
          return this._addCheck({ kind: "regex", regex: e, ...te.errToObj(t) });
        }
        includes(e, t) {
          return this._addCheck({
            kind: "includes",
            value: e,
            position: null == t ? void 0 : t.position,
            ...te.errToObj(null == t ? void 0 : t.message),
          });
        }
        startsWith(e, t) {
          return this._addCheck({
            kind: "startsWith",
            value: e,
            ...te.errToObj(t),
          });
        }
        endsWith(e, t) {
          return this._addCheck({
            kind: "endsWith",
            value: e,
            ...te.errToObj(t),
          });
        }
        min(e, t) {
          return this._addCheck({ kind: "min", value: e, ...te.errToObj(t) });
        }
        max(e, t) {
          return this._addCheck({ kind: "max", value: e, ...te.errToObj(t) });
        }
        length(e, t) {
          return this._addCheck({
            kind: "length",
            value: e,
            ...te.errToObj(t),
          });
        }
        nonempty(e) {
          return this.min(1, te.errToObj(e));
        }
        trim() {
          return new K({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
          });
        }
        toLowerCase() {
          return new K({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
          });
        }
        toUpperCase() {
          return new K({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
          });
        }
        get isDatetime() {
          return !!this._def.checks.find((e) => "datetime" === e.kind);
        }
        get isDate() {
          return !!this._def.checks.find((e) => "date" === e.kind);
        }
        get isTime() {
          return !!this._def.checks.find((e) => "time" === e.kind);
        }
        get isDuration() {
          return !!this._def.checks.find((e) => "duration" === e.kind);
        }
        get isEmail() {
          return !!this._def.checks.find((e) => "email" === e.kind);
        }
        get isURL() {
          return !!this._def.checks.find((e) => "url" === e.kind);
        }
        get isEmoji() {
          return !!this._def.checks.find((e) => "emoji" === e.kind);
        }
        get isUUID() {
          return !!this._def.checks.find((e) => "uuid" === e.kind);
        }
        get isNANOID() {
          return !!this._def.checks.find((e) => "nanoid" === e.kind);
        }
        get isCUID() {
          return !!this._def.checks.find((e) => "cuid" === e.kind);
        }
        get isCUID2() {
          return !!this._def.checks.find((e) => "cuid2" === e.kind);
        }
        get isULID() {
          return !!this._def.checks.find((e) => "ulid" === e.kind);
        }
        get isIP() {
          return !!this._def.checks.find((e) => "ip" === e.kind);
        }
        get isBase64() {
          return !!this._def.checks.find((e) => "base64" === e.kind);
        }
        get minLength() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return e;
        }
        get maxLength() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return e;
        }
      }
      K.create = (e) => {
        var t;
        return new K({
          checks: [],
          typeName: tn.ZodString,
          coerce: null != (t = null == e ? void 0 : e.coerce) && t,
          ...w(e),
        });
      };
      class G extends I {
        constructor() {
          super(...arguments),
            (this.min = this.gte),
            (this.max = this.lte),
            (this.step = this.multipleOf);
        }
        _parse(e) {
          let t;
          if (
            (this._def.coerce && (e.data = Number(e.data)),
            this._getType(e) !== i.number)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.number,
                received: t.parsedType,
              }),
              g
            );
          }
          let r = new h();
          for (let n of this._def.checks)
            "int" === n.kind
              ? e8.isInteger(e.data) ||
                (p((t = this._getOrReturnCtx(e, t)), {
                  code: s.invalid_type,
                  expected: "integer",
                  received: "float",
                  message: n.message,
                }),
                r.dirty())
              : "min" === n.kind
                ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
                  (p((t = this._getOrReturnCtx(e, t)), {
                    code: s.too_small,
                    minimum: n.value,
                    type: "number",
                    inclusive: n.inclusive,
                    exact: !1,
                    message: n.message,
                  }),
                  r.dirty())
                : "max" === n.kind
                  ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
                    (p((t = this._getOrReturnCtx(e, t)), {
                      code: s.too_big,
                      maximum: n.value,
                      type: "number",
                      inclusive: n.inclusive,
                      exact: !1,
                      message: n.message,
                    }),
                    r.dirty())
                  : "multipleOf" === n.kind
                    ? 0 !==
                        (function (e, t) {
                          let r = (e.toString().split(".")[1] || "").length,
                            n = (t.toString().split(".")[1] || "").length,
                            i = r > n ? r : n;
                          return (
                            (parseInt(e.toFixed(i).replace(".", "")) %
                              parseInt(t.toFixed(i).replace(".", ""))) /
                            Math.pow(10, i)
                          );
                        })(e.data, n.value) &&
                      (p((t = this._getOrReturnCtx(e, t)), {
                        code: s.not_multiple_of,
                        multipleOf: n.value,
                        message: n.message,
                      }),
                      r.dirty())
                    : "finite" === n.kind
                      ? Number.isFinite(e.data) ||
                        (p((t = this._getOrReturnCtx(e, t)), {
                          code: s.not_finite,
                          message: n.message,
                        }),
                        r.dirty())
                      : e8.assertNever(n);
          return { status: r.value, value: e.data };
        }
        gte(e, t) {
          return this.setLimit("min", e, !0, te.toString(t));
        }
        gt(e, t) {
          return this.setLimit("min", e, !1, te.toString(t));
        }
        lte(e, t) {
          return this.setLimit("max", e, !0, te.toString(t));
        }
        lt(e, t) {
          return this.setLimit("max", e, !1, te.toString(t));
        }
        setLimit(e, t, r, n) {
          return new G({
            ...this._def,
            checks: [
              ...this._def.checks,
              { kind: e, value: t, inclusive: r, message: te.toString(n) },
            ],
          });
        }
        _addCheck(e) {
          return new G({ ...this._def, checks: [...this._def.checks, e] });
        }
        int(e) {
          return this._addCheck({ kind: "int", message: te.toString(e) });
        }
        positive(e) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !1,
            message: te.toString(e),
          });
        }
        negative(e) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !1,
            message: te.toString(e),
          });
        }
        nonpositive(e) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !0,
            message: te.toString(e),
          });
        }
        nonnegative(e) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !0,
            message: te.toString(e),
          });
        }
        multipleOf(e, t) {
          return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: te.toString(t),
          });
        }
        finite(e) {
          return this._addCheck({ kind: "finite", message: te.toString(e) });
        }
        safe(e) {
          return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: te.toString(e),
          })._addCheck({
            kind: "max",
            inclusive: !0,
            value: Number.MAX_SAFE_INTEGER,
            message: te.toString(e),
          });
        }
        get minValue() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return e;
        }
        get maxValue() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return e;
        }
        get isInt() {
          return !!this._def.checks.find(
            (e) =>
              "int" === e.kind ||
              ("multipleOf" === e.kind && e8.isInteger(e.value)),
          );
        }
        get isFinite() {
          let e = null,
            t = null;
          for (let r of this._def.checks)
            if (
              "finite" === r.kind ||
              "int" === r.kind ||
              "multipleOf" === r.kind
            )
              return !0;
            else
              "min" === r.kind
                ? (null === t || r.value > t) && (t = r.value)
                : "max" === r.kind &&
                  (null === e || r.value < e) &&
                  (e = r.value);
          return Number.isFinite(t) && Number.isFinite(e);
        }
      }
      G.create = (e) =>
        new G({
          checks: [],
          typeName: tn.ZodNumber,
          coerce: (null == e ? void 0 : e.coerce) || !1,
          ...w(e),
        });
      class F extends I {
        constructor() {
          super(...arguments), (this.min = this.gte), (this.max = this.lte);
        }
        _parse(e) {
          let t;
          if (
            (this._def.coerce && (e.data = BigInt(e.data)),
            this._getType(e) !== i.bigint)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.bigint,
                received: t.parsedType,
              }),
              g
            );
          }
          let r = new h();
          for (let n of this._def.checks)
            "min" === n.kind
              ? (n.inclusive ? e.data < n.value : e.data <= n.value) &&
                (p((t = this._getOrReturnCtx(e, t)), {
                  code: s.too_small,
                  type: "bigint",
                  minimum: n.value,
                  inclusive: n.inclusive,
                  message: n.message,
                }),
                r.dirty())
              : "max" === n.kind
                ? (n.inclusive ? e.data > n.value : e.data >= n.value) &&
                  (p((t = this._getOrReturnCtx(e, t)), {
                    code: s.too_big,
                    type: "bigint",
                    maximum: n.value,
                    inclusive: n.inclusive,
                    message: n.message,
                  }),
                  r.dirty())
                : "multipleOf" === n.kind
                  ? e.data % n.value !== BigInt(0) &&
                    (p((t = this._getOrReturnCtx(e, t)), {
                      code: s.not_multiple_of,
                      multipleOf: n.value,
                      message: n.message,
                    }),
                    r.dirty())
                  : e8.assertNever(n);
          return { status: r.value, value: e.data };
        }
        gte(e, t) {
          return this.setLimit("min", e, !0, te.toString(t));
        }
        gt(e, t) {
          return this.setLimit("min", e, !1, te.toString(t));
        }
        lte(e, t) {
          return this.setLimit("max", e, !0, te.toString(t));
        }
        lt(e, t) {
          return this.setLimit("max", e, !1, te.toString(t));
        }
        setLimit(e, t, r, n) {
          return new F({
            ...this._def,
            checks: [
              ...this._def.checks,
              { kind: e, value: t, inclusive: r, message: te.toString(n) },
            ],
          });
        }
        _addCheck(e) {
          return new F({ ...this._def, checks: [...this._def.checks, e] });
        }
        positive(e) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !1,
            message: te.toString(e),
          });
        }
        negative(e) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !1,
            message: te.toString(e),
          });
        }
        nonpositive(e) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !0,
            message: te.toString(e),
          });
        }
        nonnegative(e) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !0,
            message: te.toString(e),
          });
        }
        multipleOf(e, t) {
          return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: te.toString(t),
          });
        }
        get minValue() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return e;
        }
        get maxValue() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return e;
        }
      }
      F.create = (e) => {
        var t;
        return new F({
          checks: [],
          typeName: tn.ZodBigInt,
          coerce: null != (t = null == e ? void 0 : e.coerce) && t,
          ...w(e),
        });
      };
      class W extends I {
        _parse(e) {
          if (
            (this._def.coerce && (e.data = !!e.data),
            this._getType(e) !== i.boolean)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.boolean,
                received: t.parsedType,
              }),
              g
            );
          }
          return f(e.data);
        }
      }
      W.create = (e) =>
        new W({
          typeName: tn.ZodBoolean,
          coerce: (null == e ? void 0 : e.coerce) || !1,
          ...w(e),
        });
      class q extends I {
        _parse(e) {
          let t;
          if (
            (this._def.coerce && (e.data = new Date(e.data)),
            this._getType(e) !== i.date)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.date,
                received: t.parsedType,
              }),
              g
            );
          }
          if (isNaN(e.data.getTime()))
            return p(this._getOrReturnCtx(e), { code: s.invalid_date }), g;
          let r = new h();
          for (let n of this._def.checks)
            "min" === n.kind
              ? e.data.getTime() < n.value &&
                (p((t = this._getOrReturnCtx(e, t)), {
                  code: s.too_small,
                  message: n.message,
                  inclusive: !0,
                  exact: !1,
                  minimum: n.value,
                  type: "date",
                }),
                r.dirty())
              : "max" === n.kind
                ? e.data.getTime() > n.value &&
                  (p((t = this._getOrReturnCtx(e, t)), {
                    code: s.too_big,
                    message: n.message,
                    inclusive: !0,
                    exact: !1,
                    maximum: n.value,
                    type: "date",
                  }),
                  r.dirty())
                : e8.assertNever(n);
          return { status: r.value, value: new Date(e.data.getTime()) };
        }
        _addCheck(e) {
          return new q({ ...this._def, checks: [...this._def.checks, e] });
        }
        min(e, t) {
          return this._addCheck({
            kind: "min",
            value: e.getTime(),
            message: te.toString(t),
          });
        }
        max(e, t) {
          return this._addCheck({
            kind: "max",
            value: e.getTime(),
            message: te.toString(t),
          });
        }
        get minDate() {
          let e = null;
          for (let t of this._def.checks)
            "min" === t.kind && (null === e || t.value > e) && (e = t.value);
          return null != e ? new Date(e) : null;
        }
        get maxDate() {
          let e = null;
          for (let t of this._def.checks)
            "max" === t.kind && (null === e || t.value < e) && (e = t.value);
          return null != e ? new Date(e) : null;
        }
      }
      q.create = (e) =>
        new q({
          checks: [],
          coerce: (null == e ? void 0 : e.coerce) || !1,
          typeName: tn.ZodDate,
          ...w(e),
        });
      class V extends I {
        _parse(e) {
          if (this._getType(e) !== i.symbol) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.symbol,
                received: t.parsedType,
              }),
              g
            );
          }
          return f(e.data);
        }
      }
      V.create = (e) => new V({ typeName: tn.ZodSymbol, ...w(e) });
      class H extends I {
        _parse(e) {
          if (this._getType(e) !== i.undefined) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.undefined,
                received: t.parsedType,
              }),
              g
            );
          }
          return f(e.data);
        }
      }
      H.create = (e) => new H({ typeName: tn.ZodUndefined, ...w(e) });
      class z extends I {
        _parse(e) {
          if (this._getType(e) !== i.null) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.null,
                received: t.parsedType,
              }),
              g
            );
          }
          return f(e.data);
        }
      }
      z.create = (e) => new z({ typeName: tn.ZodNull, ...w(e) });
      class B extends I {
        constructor() {
          super(...arguments), (this._any = !0);
        }
        _parse(e) {
          return f(e.data);
        }
      }
      B.create = (e) => new B({ typeName: tn.ZodAny, ...w(e) });
      class Y extends I {
        constructor() {
          super(...arguments), (this._unknown = !0);
        }
        _parse(e) {
          return f(e.data);
        }
      }
      Y.create = (e) => new Y({ typeName: tn.ZodUnknown, ...w(e) });
      class J extends I {
        _parse(e) {
          let t = this._getOrReturnCtx(e);
          return (
            p(t, {
              code: s.invalid_type,
              expected: i.never,
              received: t.parsedType,
            }),
            g
          );
        }
      }
      J.create = (e) => new J({ typeName: tn.ZodNever, ...w(e) });
      class X extends I {
        _parse(e) {
          if (this._getType(e) !== i.undefined) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.void,
                received: t.parsedType,
              }),
              g
            );
          }
          return f(e.data);
        }
      }
      X.create = (e) => new X({ typeName: tn.ZodVoid, ...w(e) });
      class Q extends I {
        _parse(e) {
          let { ctx: t, status: r } = this._processInputParams(e),
            n = this._def;
          if (t.parsedType !== i.array)
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.array,
                received: t.parsedType,
              }),
              g
            );
          if (null !== n.exactLength) {
            let e = t.data.length > n.exactLength.value,
              i = t.data.length < n.exactLength.value;
            (e || i) &&
              (p(t, {
                code: e ? s.too_big : s.too_small,
                minimum: i ? n.exactLength.value : void 0,
                maximum: e ? n.exactLength.value : void 0,
                type: "array",
                inclusive: !0,
                exact: !0,
                message: n.exactLength.message,
              }),
              r.dirty());
          }
          if (
            (null !== n.minLength &&
              t.data.length < n.minLength.value &&
              (p(t, {
                code: s.too_small,
                minimum: n.minLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: n.minLength.message,
              }),
              r.dirty()),
            null !== n.maxLength &&
              t.data.length > n.maxLength.value &&
              (p(t, {
                code: s.too_big,
                maximum: n.maxLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: n.maxLength.message,
              }),
              r.dirty()),
            t.common.async)
          )
            return Promise.all(
              [...t.data].map((e, r) =>
                n.type._parseAsync(new E(t, e, t.path, r)),
              ),
            ).then((e) => h.mergeArray(r, e));
          let a = [...t.data].map((e, r) =>
            n.type._parseSync(new E(t, e, t.path, r)),
          );
          return h.mergeArray(r, a);
        }
        get element() {
          return this._def.type;
        }
        min(e, t) {
          return new Q({
            ...this._def,
            minLength: { value: e, message: te.toString(t) },
          });
        }
        max(e, t) {
          return new Q({
            ...this._def,
            maxLength: { value: e, message: te.toString(t) },
          });
        }
        length(e, t) {
          return new Q({
            ...this._def,
            exactLength: { value: e, message: te.toString(t) },
          });
        }
        nonempty(e) {
          return this.min(1, e);
        }
      }
      Q.create = (e, t) =>
        new Q({
          type: e,
          minLength: null,
          maxLength: null,
          exactLength: null,
          typeName: tn.ZodArray,
          ...w(t),
        });
      class ee extends I {
        constructor() {
          super(...arguments),
            (this._cached = null),
            (this.nonstrict = this.passthrough),
            (this.augment = this.extend);
        }
        _getCached() {
          if (null !== this._cached) return this._cached;
          let e = this._def.shape(),
            t = e8.objectKeys(e);
          return (this._cached = { shape: e, keys: t });
        }
        _parse(e) {
          if (this._getType(e) !== i.object) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.object,
                received: t.parsedType,
              }),
              g
            );
          }
          let { status: t, ctx: r } = this._processInputParams(e),
            { shape: n, keys: a } = this._getCached(),
            o = [];
          if (
            !(
              this._def.catchall instanceof J &&
              "strip" === this._def.unknownKeys
            )
          )
            for (let e in r.data) a.includes(e) || o.push(e);
          let l = [];
          for (let e of a) {
            let t = n[e],
              i = r.data[e];
            l.push({
              key: { status: "valid", value: e },
              value: t._parse(new E(r, i, r.path, e)),
              alwaysSet: e in r.data,
            });
          }
          if (this._def.catchall instanceof J) {
            let e = this._def.unknownKeys;
            if ("passthrough" === e)
              for (let e of o)
                l.push({
                  key: { status: "valid", value: e },
                  value: { status: "valid", value: r.data[e] },
                });
            else if ("strict" === e)
              o.length > 0 &&
                (p(r, { code: s.unrecognized_keys, keys: o }), t.dirty());
            else if ("strip" === e);
            else
              throw Error(
                "Internal ZodObject error: invalid unknownKeys value.",
              );
          } else {
            let e = this._def.catchall;
            for (let t of o) {
              let n = r.data[t];
              l.push({
                key: { status: "valid", value: t },
                value: e._parse(new E(r, n, r.path, t)),
                alwaysSet: t in r.data,
              });
            }
          }
          return r.common.async
            ? Promise.resolve()
                .then(async () => {
                  let e = [];
                  for (let t of l) {
                    let r = await t.key,
                      n = await t.value;
                    e.push({ key: r, value: n, alwaysSet: t.alwaysSet });
                  }
                  return e;
                })
                .then((e) => h.mergeObjectSync(t, e))
            : h.mergeObjectSync(t, l);
        }
        get shape() {
          return this._def.shape();
        }
        strict(e) {
          return (
            te.errToObj,
            new ee({
              ...this._def,
              unknownKeys: "strict",
              ...(void 0 !== e
                ? {
                    errorMap: (t, r) => {
                      var n, i, a, s;
                      let o =
                        null !=
                        (a =
                          null == (i = (n = this._def).errorMap)
                            ? void 0
                            : i.call(n, t, r).message)
                          ? a
                          : r.defaultError;
                      return "unrecognized_keys" === t.code
                        ? {
                            message:
                              null != (s = te.errToObj(e).message) ? s : o,
                          }
                        : { message: o };
                    },
                  }
                : {}),
            })
          );
        }
        strip() {
          return new ee({ ...this._def, unknownKeys: "strip" });
        }
        passthrough() {
          return new ee({ ...this._def, unknownKeys: "passthrough" });
        }
        extend(e) {
          return new ee({
            ...this._def,
            shape: () => ({ ...this._def.shape(), ...e }),
          });
        }
        merge(e) {
          return new ee({
            unknownKeys: e._def.unknownKeys,
            catchall: e._def.catchall,
            shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
            typeName: tn.ZodObject,
          });
        }
        setKey(e, t) {
          return this.augment({ [e]: t });
        }
        catchall(e) {
          return new ee({ ...this._def, catchall: e });
        }
        pick(e) {
          let t = {};
          return (
            e8.objectKeys(e).forEach((r) => {
              e[r] && this.shape[r] && (t[r] = this.shape[r]);
            }),
            new ee({ ...this._def, shape: () => t })
          );
        }
        omit(e) {
          let t = {};
          return (
            e8.objectKeys(this.shape).forEach((r) => {
              e[r] || (t[r] = this.shape[r]);
            }),
            new ee({ ...this._def, shape: () => t })
          );
        }
        deepPartial() {
          return (function e(t) {
            if (t instanceof ee) {
              let r = {};
              for (let n in t.shape) {
                let i = t.shape[n];
                r[n] = ey.create(e(i));
              }
              return new ee({ ...t._def, shape: () => r });
            }
            if (t instanceof Q) return new Q({ ...t._def, type: e(t.element) });
            if (t instanceof ey) return ey.create(e(t.unwrap()));
            if (t instanceof eb) return eb.create(e(t.unwrap()));
            if (t instanceof ea) return ea.create(t.items.map((t) => e(t)));
            else return t;
          })(this);
        }
        partial(e) {
          let t = {};
          return (
            e8.objectKeys(this.shape).forEach((r) => {
              let n = this.shape[r];
              e && !e[r] ? (t[r] = n) : (t[r] = n.optional());
            }),
            new ee({ ...this._def, shape: () => t })
          );
        }
        required(e) {
          let t = {};
          return (
            e8.objectKeys(this.shape).forEach((r) => {
              if (e && !e[r]) t[r] = this.shape[r];
              else {
                let e = this.shape[r];
                for (; e instanceof ey; ) e = e._def.innerType;
                t[r] = e;
              }
            }),
            new ee({ ...this._def, shape: () => t })
          );
        }
        keyof() {
          return ep(e8.objectKeys(this.shape));
        }
      }
      (ee.create = (e, t) =>
        new ee({
          shape: () => e,
          unknownKeys: "strip",
          catchall: J.create(),
          typeName: tn.ZodObject,
          ...w(t),
        })),
        (ee.strictCreate = (e, t) =>
          new ee({
            shape: () => e,
            unknownKeys: "strict",
            catchall: J.create(),
            typeName: tn.ZodObject,
            ...w(t),
          })),
        (ee.lazycreate = (e, t) =>
          new ee({
            shape: e,
            unknownKeys: "strip",
            catchall: J.create(),
            typeName: tn.ZodObject,
            ...w(t),
          }));
      class et extends I {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            r = this._def.options;
          if (t.common.async)
            return Promise.all(
              r.map(async (e) => {
                let r = {
                  ...t,
                  common: { ...t.common, issues: [] },
                  parent: null,
                };
                return {
                  result: await e._parseAsync({
                    data: t.data,
                    path: t.path,
                    parent: r,
                  }),
                  ctx: r,
                };
              }),
            ).then(function (e) {
              for (let t of e) if ("valid" === t.result.status) return t.result;
              for (let r of e)
                if ("dirty" === r.result.status)
                  return t.common.issues.push(...r.ctx.common.issues), r.result;
              let r = e.map((e) => new o(e.ctx.common.issues));
              return p(t, { code: s.invalid_union, unionErrors: r }), g;
            });
          {
            let e,
              n = [];
            for (let i of r) {
              let r = {
                  ...t,
                  common: { ...t.common, issues: [] },
                  parent: null,
                },
                a = i._parseSync({ data: t.data, path: t.path, parent: r });
              if ("valid" === a.status) return a;
              "dirty" !== a.status || e || (e = { result: a, ctx: r }),
                r.common.issues.length && n.push(r.common.issues);
            }
            if (e)
              return t.common.issues.push(...e.ctx.common.issues), e.result;
            let i = n.map((e) => new o(e));
            return p(t, { code: s.invalid_union, unionErrors: i }), g;
          }
        }
        get options() {
          return this._def.options;
        }
      }
      et.create = (e, t) =>
        new et({ options: e, typeName: tn.ZodUnion, ...w(t) });
      let er = (e) => {
        if (e instanceof ec) return er(e.schema);
        if (e instanceof ef) return er(e.innerType());
        if (e instanceof ed) return [e.value];
        if (e instanceof eh) return e.options;
        if (e instanceof eg) return e8.objectValues(e.enum);
        else if (e instanceof ev) return er(e._def.innerType);
        else if (e instanceof H) return [void 0];
        else if (e instanceof z) return [null];
        else if (e instanceof ey) return [void 0, ...er(e.unwrap())];
        else if (e instanceof eb) return [null, ...er(e.unwrap())];
        else if (e instanceof eE) return er(e.unwrap());
        else if (e instanceof ew) return er(e.unwrap());
        else if (e instanceof e_) return er(e._def.innerType);
        else return [];
      };
      class en extends I {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          if (t.parsedType !== i.object)
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.object,
                received: t.parsedType,
              }),
              g
            );
          let r = this.discriminator,
            n = t.data[r],
            a = this.optionsMap.get(n);
          return a
            ? t.common.async
              ? a._parseAsync({ data: t.data, path: t.path, parent: t })
              : a._parseSync({ data: t.data, path: t.path, parent: t })
            : (p(t, {
                code: s.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [r],
              }),
              g);
        }
        get discriminator() {
          return this._def.discriminator;
        }
        get options() {
          return this._def.options;
        }
        get optionsMap() {
          return this._def.optionsMap;
        }
        static create(e, t, r) {
          let n = new Map();
          for (let r of t) {
            let t = er(r.shape[e]);
            if (!t.length)
              throw Error(
                `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
              );
            for (let i of t) {
              if (n.has(i))
                throw Error(
                  `Discriminator property ${String(e)} has duplicate value ${String(i)}`,
                );
              n.set(i, r);
            }
          }
          return new en({
            typeName: tn.ZodDiscriminatedUnion,
            discriminator: e,
            options: t,
            optionsMap: n,
            ...w(r),
          });
        }
      }
      class ei extends I {
        _parse(e) {
          let { status: t, ctx: r } = this._processInputParams(e),
            n = (e, n) => {
              if (y(e) || y(n)) return g;
              let o = (function e(t, r) {
                let n = a(t),
                  s = a(r);
                if (t === r) return { valid: !0, data: t };
                if (n === i.object && s === i.object) {
                  let n = e8.objectKeys(r),
                    i = e8.objectKeys(t).filter((e) => -1 !== n.indexOf(e)),
                    a = { ...t, ...r };
                  for (let n of i) {
                    let i = e(t[n], r[n]);
                    if (!i.valid) return { valid: !1 };
                    a[n] = i.data;
                  }
                  return { valid: !0, data: a };
                }
                if (n === i.array && s === i.array) {
                  if (t.length !== r.length) return { valid: !1 };
                  let n = [];
                  for (let i = 0; i < t.length; i++) {
                    let a = e(t[i], r[i]);
                    if (!a.valid) return { valid: !1 };
                    n.push(a.data);
                  }
                  return { valid: !0, data: n };
                }
                if (n === i.date && s === i.date && +t == +r)
                  return { valid: !0, data: t };
                return { valid: !1 };
              })(e.value, n.value);
              return o.valid
                ? ((b(e) || b(n)) && t.dirty(),
                  { status: t.value, value: o.data })
                : (p(r, { code: s.invalid_intersection_types }), g);
            };
          return r.common.async
            ? Promise.all([
                this._def.left._parseAsync({
                  data: r.data,
                  path: r.path,
                  parent: r,
                }),
                this._def.right._parseAsync({
                  data: r.data,
                  path: r.path,
                  parent: r,
                }),
              ]).then(([e, t]) => n(e, t))
            : n(
                this._def.left._parseSync({
                  data: r.data,
                  path: r.path,
                  parent: r,
                }),
                this._def.right._parseSync({
                  data: r.data,
                  path: r.path,
                  parent: r,
                }),
              );
        }
      }
      ei.create = (e, t, r) =>
        new ei({ left: e, right: t, typeName: tn.ZodIntersection, ...w(r) });
      class ea extends I {
        _parse(e) {
          let { status: t, ctx: r } = this._processInputParams(e);
          if (r.parsedType !== i.array)
            return (
              p(r, {
                code: s.invalid_type,
                expected: i.array,
                received: r.parsedType,
              }),
              g
            );
          if (r.data.length < this._def.items.length)
            return (
              p(r, {
                code: s.too_small,
                minimum: this._def.items.length,
                inclusive: !0,
                exact: !1,
                type: "array",
              }),
              g
            );
          !this._def.rest &&
            r.data.length > this._def.items.length &&
            (p(r, {
              code: s.too_big,
              maximum: this._def.items.length,
              inclusive: !0,
              exact: !1,
              type: "array",
            }),
            t.dirty());
          let n = [...r.data]
            .map((e, t) => {
              let n = this._def.items[t] || this._def.rest;
              return n ? n._parse(new E(r, e, r.path, t)) : null;
            })
            .filter((e) => !!e);
          return r.common.async
            ? Promise.all(n).then((e) => h.mergeArray(t, e))
            : h.mergeArray(t, n);
        }
        get items() {
          return this._def.items;
        }
        rest(e) {
          return new ea({ ...this._def, rest: e });
        }
      }
      ea.create = (e, t) => {
        if (!Array.isArray(e))
          throw Error("You must pass an array of schemas to z.tuple([ ... ])");
        return new ea({ items: e, typeName: tn.ZodTuple, rest: null, ...w(t) });
      };
      class es extends I {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e) {
          let { status: t, ctx: r } = this._processInputParams(e);
          if (r.parsedType !== i.object)
            return (
              p(r, {
                code: s.invalid_type,
                expected: i.object,
                received: r.parsedType,
              }),
              g
            );
          let n = [],
            a = this._def.keyType,
            o = this._def.valueType;
          for (let e in r.data)
            n.push({
              key: a._parse(new E(r, e, r.path, e)),
              value: o._parse(new E(r, r.data[e], r.path, e)),
              alwaysSet: e in r.data,
            });
          return r.common.async
            ? h.mergeObjectAsync(t, n)
            : h.mergeObjectSync(t, n);
        }
        get element() {
          return this._def.valueType;
        }
        static create(e, t, r) {
          return new es(
            t instanceof I
              ? { keyType: e, valueType: t, typeName: tn.ZodRecord, ...w(r) }
              : {
                  keyType: K.create(),
                  valueType: e,
                  typeName: tn.ZodRecord,
                  ...w(t),
                },
          );
        }
      }
      class eo extends I {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e) {
          let { status: t, ctx: r } = this._processInputParams(e);
          if (r.parsedType !== i.map)
            return (
              p(r, {
                code: s.invalid_type,
                expected: i.map,
                received: r.parsedType,
              }),
              g
            );
          let n = this._def.keyType,
            a = this._def.valueType,
            o = [...r.data.entries()].map(([e, t], i) => ({
              key: n._parse(new E(r, e, r.path, [i, "key"])),
              value: a._parse(new E(r, t, r.path, [i, "value"])),
            }));
          if (r.common.async) {
            let e = new Map();
            return Promise.resolve().then(async () => {
              for (let r of o) {
                let n = await r.key,
                  i = await r.value;
                if ("aborted" === n.status || "aborted" === i.status) return g;
                ("dirty" === n.status || "dirty" === i.status) && t.dirty(),
                  e.set(n.value, i.value);
              }
              return { status: t.value, value: e };
            });
          }
          {
            let e = new Map();
            for (let r of o) {
              let n = r.key,
                i = r.value;
              if ("aborted" === n.status || "aborted" === i.status) return g;
              ("dirty" === n.status || "dirty" === i.status) && t.dirty(),
                e.set(n.value, i.value);
            }
            return { status: t.value, value: e };
          }
        }
      }
      eo.create = (e, t, r) =>
        new eo({ valueType: t, keyType: e, typeName: tn.ZodMap, ...w(r) });
      class el extends I {
        _parse(e) {
          let { status: t, ctx: r } = this._processInputParams(e);
          if (r.parsedType !== i.set)
            return (
              p(r, {
                code: s.invalid_type,
                expected: i.set,
                received: r.parsedType,
              }),
              g
            );
          let n = this._def;
          null !== n.minSize &&
            r.data.size < n.minSize.value &&
            (p(r, {
              code: s.too_small,
              minimum: n.minSize.value,
              type: "set",
              inclusive: !0,
              exact: !1,
              message: n.minSize.message,
            }),
            t.dirty()),
            null !== n.maxSize &&
              r.data.size > n.maxSize.value &&
              (p(r, {
                code: s.too_big,
                maximum: n.maxSize.value,
                type: "set",
                inclusive: !0,
                exact: !1,
                message: n.maxSize.message,
              }),
              t.dirty());
          let a = this._def.valueType;
          function o(e) {
            let r = new Set();
            for (let n of e) {
              if ("aborted" === n.status) return g;
              "dirty" === n.status && t.dirty(), r.add(n.value);
            }
            return { status: t.value, value: r };
          }
          let l = [...r.data.values()].map((e, t) =>
            a._parse(new E(r, e, r.path, t)),
          );
          return r.common.async ? Promise.all(l).then((e) => o(e)) : o(l);
        }
        min(e, t) {
          return new el({
            ...this._def,
            minSize: { value: e, message: te.toString(t) },
          });
        }
        max(e, t) {
          return new el({
            ...this._def,
            maxSize: { value: e, message: te.toString(t) },
          });
        }
        size(e, t) {
          return this.min(e, t).max(e, t);
        }
        nonempty(e) {
          return this.min(1, e);
        }
      }
      el.create = (e, t) =>
        new el({
          valueType: e,
          minSize: null,
          maxSize: null,
          typeName: tn.ZodSet,
          ...w(t),
        });
      class eu extends I {
        constructor() {
          super(...arguments), (this.validate = this.implement);
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          if (t.parsedType !== i.function)
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.function,
                received: t.parsedType,
              }),
              g
            );
          function r(e, r) {
            return d({
              data: e,
              path: t.path,
              errorMaps: [
                t.common.contextualErrorMap,
                t.schemaErrorMap,
                c(),
                l,
              ].filter((e) => !!e),
              issueData: { code: s.invalid_arguments, argumentsError: r },
            });
          }
          function n(e, r) {
            return d({
              data: e,
              path: t.path,
              errorMaps: [
                t.common.contextualErrorMap,
                t.schemaErrorMap,
                c(),
                l,
              ].filter((e) => !!e),
              issueData: { code: s.invalid_return_type, returnTypeError: r },
            });
          }
          let a = { errorMap: t.common.contextualErrorMap },
            u = t.data;
          if (this._def.returns instanceof em) {
            let e = this;
            return f(async function (...t) {
              let i = new o([]),
                s = await e._def.args.parseAsync(t, a).catch((e) => {
                  throw (i.addIssue(r(t, e)), i);
                }),
                l = await Reflect.apply(u, this, s);
              return await e._def.returns._def.type
                .parseAsync(l, a)
                .catch((e) => {
                  throw (i.addIssue(n(l, e)), i);
                });
            });
          }
          {
            let e = this;
            return f(function (...t) {
              let i = e._def.args.safeParse(t, a);
              if (!i.success) throw new o([r(t, i.error)]);
              let s = Reflect.apply(u, this, i.data),
                l = e._def.returns.safeParse(s, a);
              if (!l.success) throw new o([n(s, l.error)]);
              return l.data;
            });
          }
        }
        parameters() {
          return this._def.args;
        }
        returnType() {
          return this._def.returns;
        }
        args(...e) {
          return new eu({ ...this._def, args: ea.create(e).rest(Y.create()) });
        }
        returns(e) {
          return new eu({ ...this._def, returns: e });
        }
        implement(e) {
          return this.parse(e);
        }
        strictImplement(e) {
          return this.parse(e);
        }
        static create(e, t, r) {
          return new eu({
            args: e || ea.create([]).rest(Y.create()),
            returns: t || Y.create(),
            typeName: tn.ZodFunction,
            ...w(r),
          });
        }
      }
      class ec extends I {
        get schema() {
          return this._def.getter();
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          return this._def
            .getter()
            ._parse({ data: t.data, path: t.path, parent: t });
        }
      }
      ec.create = (e, t) =>
        new ec({ getter: e, typeName: tn.ZodLazy, ...w(t) });
      class ed extends I {
        _parse(e) {
          if (e.data !== this._def.value) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                received: t.data,
                code: s.invalid_literal,
                expected: this._def.value,
              }),
              g
            );
          }
          return { status: "valid", value: e.data };
        }
        get value() {
          return this._def.value;
        }
      }
      function ep(e, t) {
        return new eh({ values: e, typeName: tn.ZodEnum, ...w(t) });
      }
      ed.create = (e, t) =>
        new ed({ value: e, typeName: tn.ZodLiteral, ...w(t) });
      class eh extends I {
        constructor() {
          super(...arguments), tt.set(this, void 0);
        }
        _parse(e) {
          if ("string" != typeof e.data) {
            let t = this._getOrReturnCtx(e),
              r = this._def.values;
            return (
              p(t, {
                expected: e8.joinValues(r),
                received: t.parsedType,
                code: s.invalid_type,
              }),
              g
            );
          }
          if (
            (k(this, tt, "f") || T(this, tt, new Set(this._def.values), "f"),
            !k(this, tt, "f").has(e.data))
          ) {
            let t = this._getOrReturnCtx(e),
              r = this._def.values;
            return (
              p(t, {
                received: t.data,
                code: s.invalid_enum_value,
                options: r,
              }),
              g
            );
          }
          return f(e.data);
        }
        get options() {
          return this._def.values;
        }
        get enum() {
          let e = {};
          for (let t of this._def.values) e[t] = t;
          return e;
        }
        get Values() {
          let e = {};
          for (let t of this._def.values) e[t] = t;
          return e;
        }
        get Enum() {
          let e = {};
          for (let t of this._def.values) e[t] = t;
          return e;
        }
        extract(e, t = this._def) {
          return eh.create(e, { ...this._def, ...t });
        }
        exclude(e, t = this._def) {
          return eh.create(
            this.options.filter((t) => !e.includes(t)),
            { ...this._def, ...t },
          );
        }
      }
      (tt = new WeakMap()), (eh.create = ep);
      class eg extends I {
        constructor() {
          super(...arguments), tr.set(this, void 0);
        }
        _parse(e) {
          let t = e8.getValidEnumValues(this._def.values),
            r = this._getOrReturnCtx(e);
          if (r.parsedType !== i.string && r.parsedType !== i.number) {
            let e = e8.objectValues(t);
            return (
              p(r, {
                expected: e8.joinValues(e),
                received: r.parsedType,
                code: s.invalid_type,
              }),
              g
            );
          }
          if (
            (k(this, tr, "f") ||
              T(
                this,
                tr,
                new Set(e8.getValidEnumValues(this._def.values)),
                "f",
              ),
            !k(this, tr, "f").has(e.data))
          ) {
            let e = e8.objectValues(t);
            return (
              p(r, {
                received: r.data,
                code: s.invalid_enum_value,
                options: e,
              }),
              g
            );
          }
          return f(e.data);
        }
        get enum() {
          return this._def.values;
        }
      }
      (tr = new WeakMap()),
        (eg.create = (e, t) =>
          new eg({ values: e, typeName: tn.ZodNativeEnum, ...w(t) }));
      class em extends I {
        unwrap() {
          return this._def.type;
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          return t.parsedType !== i.promise && !1 === t.common.async
            ? (p(t, {
                code: s.invalid_type,
                expected: i.promise,
                received: t.parsedType,
              }),
              g)
            : f(
                (t.parsedType === i.promise
                  ? t.data
                  : Promise.resolve(t.data)
                ).then((e) =>
                  this._def.type.parseAsync(e, {
                    path: t.path,
                    errorMap: t.common.contextualErrorMap,
                  }),
                ),
              );
        }
      }
      em.create = (e, t) =>
        new em({ type: e, typeName: tn.ZodPromise, ...w(t) });
      class ef extends I {
        innerType() {
          return this._def.schema;
        }
        sourceType() {
          return this._def.schema._def.typeName === tn.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
        }
        _parse(e) {
          let { status: t, ctx: r } = this._processInputParams(e),
            n = this._def.effect || null,
            i = {
              addIssue: (e) => {
                p(r, e), e.fatal ? t.abort() : t.dirty();
              },
              get path() {
                return r.path;
              },
            };
          if (((i.addIssue = i.addIssue.bind(i)), "preprocess" === n.type)) {
            let e = n.transform(r.data, i);
            if (r.common.async)
              return Promise.resolve(e).then(async (e) => {
                if ("aborted" === t.value) return g;
                let n = await this._def.schema._parseAsync({
                  data: e,
                  path: r.path,
                  parent: r,
                });
                return "aborted" === n.status
                  ? g
                  : "dirty" === n.status || "dirty" === t.value
                    ? m(n.value)
                    : n;
              });
            {
              if ("aborted" === t.value) return g;
              let n = this._def.schema._parseSync({
                data: e,
                path: r.path,
                parent: r,
              });
              return "aborted" === n.status
                ? g
                : "dirty" === n.status || "dirty" === t.value
                  ? m(n.value)
                  : n;
            }
          }
          if ("refinement" === n.type) {
            let e = (e) => {
              let t = n.refinement(e, i);
              if (r.common.async) return Promise.resolve(t);
              if (t instanceof Promise)
                throw Error(
                  "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
                );
              return e;
            };
            if (!1 !== r.common.async)
              return this._def.schema
                ._parseAsync({ data: r.data, path: r.path, parent: r })
                .then((r) =>
                  "aborted" === r.status
                    ? g
                    : ("dirty" === r.status && t.dirty(),
                      e(r.value).then(() => ({
                        status: t.value,
                        value: r.value,
                      }))),
                );
            {
              let n = this._def.schema._parseSync({
                data: r.data,
                path: r.path,
                parent: r,
              });
              return "aborted" === n.status
                ? g
                : ("dirty" === n.status && t.dirty(),
                  e(n.value),
                  { status: t.value, value: n.value });
            }
          }
          if ("transform" === n.type)
            if (!1 !== r.common.async)
              return this._def.schema
                ._parseAsync({ data: r.data, path: r.path, parent: r })
                .then((e) =>
                  v(e)
                    ? Promise.resolve(n.transform(e.value, i)).then((e) => ({
                        status: t.value,
                        value: e,
                      }))
                    : e,
                );
            else {
              let e = this._def.schema._parseSync({
                data: r.data,
                path: r.path,
                parent: r,
              });
              if (!v(e)) return e;
              let a = n.transform(e.value, i);
              if (a instanceof Promise)
                throw Error(
                  "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
                );
              return { status: t.value, value: a };
            }
          e8.assertNever(n);
        }
      }
      (ef.create = (e, t, r) =>
        new ef({ schema: e, typeName: tn.ZodEffects, effect: t, ...w(r) })),
        (ef.createWithPreprocess = (e, t, r) =>
          new ef({
            schema: t,
            effect: { type: "preprocess", transform: e },
            typeName: tn.ZodEffects,
            ...w(r),
          }));
      class ey extends I {
        _parse(e) {
          return this._getType(e) === i.undefined
            ? f(void 0)
            : this._def.innerType._parse(e);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      ey.create = (e, t) =>
        new ey({ innerType: e, typeName: tn.ZodOptional, ...w(t) });
      class eb extends I {
        _parse(e) {
          return this._getType(e) === i.null
            ? f(null)
            : this._def.innerType._parse(e);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      eb.create = (e, t) =>
        new eb({ innerType: e, typeName: tn.ZodNullable, ...w(t) });
      class ev extends I {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            r = t.data;
          return (
            t.parsedType === i.undefined && (r = this._def.defaultValue()),
            this._def.innerType._parse({ data: r, path: t.path, parent: t })
          );
        }
        removeDefault() {
          return this._def.innerType;
        }
      }
      ev.create = (e, t) =>
        new ev({
          innerType: e,
          typeName: tn.ZodDefault,
          defaultValue:
            "function" == typeof t.default ? t.default : () => t.default,
          ...w(t),
        });
      class e_ extends I {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            r = { ...t, common: { ...t.common, issues: [] } },
            n = this._def.innerType._parse({
              data: r.data,
              path: r.path,
              parent: { ...r },
            });
          return _(n)
            ? n.then((e) => ({
                status: "valid",
                value:
                  "valid" === e.status
                    ? e.value
                    : this._def.catchValue({
                        get error() {
                          return new o(r.common.issues);
                        },
                        input: r.data,
                      }),
              }))
            : {
                status: "valid",
                value:
                  "valid" === n.status
                    ? n.value
                    : this._def.catchValue({
                        get error() {
                          return new o(r.common.issues);
                        },
                        input: r.data,
                      }),
              };
        }
        removeCatch() {
          return this._def.innerType;
        }
      }
      e_.create = (e, t) =>
        new e_({
          innerType: e,
          typeName: tn.ZodCatch,
          catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
          ...w(t),
        });
      class ek extends I {
        _parse(e) {
          if (this._getType(e) !== i.nan) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: s.invalid_type,
                expected: i.nan,
                received: t.parsedType,
              }),
              g
            );
          }
          return { status: "valid", value: e.data };
        }
      }
      ek.create = (e) => new ek({ typeName: tn.ZodNaN, ...w(e) });
      let eT = Symbol("zod_brand");
      class eE extends I {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            r = t.data;
          return this._def.type._parse({ data: r, path: t.path, parent: t });
        }
        unwrap() {
          return this._def.type;
        }
      }
      class ej extends I {
        _parse(e) {
          let { status: t, ctx: r } = this._processInputParams(e);
          if (r.common.async)
            return (async () => {
              let e = await this._def.in._parseAsync({
                data: r.data,
                path: r.path,
                parent: r,
              });
              return "aborted" === e.status
                ? g
                : "dirty" === e.status
                  ? (t.dirty(), m(e.value))
                  : this._def.out._parseAsync({
                      data: e.value,
                      path: r.path,
                      parent: r,
                    });
            })();
          {
            let e = this._def.in._parseSync({
              data: r.data,
              path: r.path,
              parent: r,
            });
            return "aborted" === e.status
              ? g
              : "dirty" === e.status
                ? (t.dirty(), { status: "dirty", value: e.value })
                : this._def.out._parseSync({
                    data: e.value,
                    path: r.path,
                    parent: r,
                  });
          }
        }
        static create(e, t) {
          return new ej({ in: e, out: t, typeName: tn.ZodPipeline });
        }
      }
      class ew extends I {
        _parse(e) {
          let t = this._def.innerType._parse(e),
            r = (e) => (v(e) && (e.value = Object.freeze(e.value)), e);
          return _(t) ? t.then((e) => r(e)) : r(t);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      function eI(e, t = {}, r) {
        return e
          ? B.create().superRefine((n, i) => {
              var a, s;
              if (!e(n)) {
                let e =
                    "function" == typeof t
                      ? t(n)
                      : "string" == typeof t
                        ? { message: t }
                        : t,
                  o = null == (s = null != (a = e.fatal) ? a : r) || s,
                  l = "string" == typeof e ? { message: e } : e;
                i.addIssue({ code: "custom", ...l, fatal: o });
              }
            })
          : B.create();
      }
      ew.create = (e, t) =>
        new ew({ innerType: e, typeName: tn.ZodReadonly, ...w(t) });
      let ex = { object: ee.lazycreate };
      !(function (e) {
        (e.ZodString = "ZodString"),
          (e.ZodNumber = "ZodNumber"),
          (e.ZodNaN = "ZodNaN"),
          (e.ZodBigInt = "ZodBigInt"),
          (e.ZodBoolean = "ZodBoolean"),
          (e.ZodDate = "ZodDate"),
          (e.ZodSymbol = "ZodSymbol"),
          (e.ZodUndefined = "ZodUndefined"),
          (e.ZodNull = "ZodNull"),
          (e.ZodAny = "ZodAny"),
          (e.ZodUnknown = "ZodUnknown"),
          (e.ZodNever = "ZodNever"),
          (e.ZodVoid = "ZodVoid"),
          (e.ZodArray = "ZodArray"),
          (e.ZodObject = "ZodObject"),
          (e.ZodUnion = "ZodUnion"),
          (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
          (e.ZodIntersection = "ZodIntersection"),
          (e.ZodTuple = "ZodTuple"),
          (e.ZodRecord = "ZodRecord"),
          (e.ZodMap = "ZodMap"),
          (e.ZodSet = "ZodSet"),
          (e.ZodFunction = "ZodFunction"),
          (e.ZodLazy = "ZodLazy"),
          (e.ZodLiteral = "ZodLiteral"),
          (e.ZodEnum = "ZodEnum"),
          (e.ZodEffects = "ZodEffects"),
          (e.ZodNativeEnum = "ZodNativeEnum"),
          (e.ZodOptional = "ZodOptional"),
          (e.ZodNullable = "ZodNullable"),
          (e.ZodDefault = "ZodDefault"),
          (e.ZodCatch = "ZodCatch"),
          (e.ZodPromise = "ZodPromise"),
          (e.ZodBranded = "ZodBranded"),
          (e.ZodPipeline = "ZodPipeline"),
          (e.ZodReadonly = "ZodReadonly");
      })(tn || (tn = {}));
      let eS = K.create,
        eR = G.create,
        eA = ek.create,
        eO = F.create,
        eC = W.create,
        eP = q.create,
        eN = V.create,
        eM = H.create,
        eU = z.create,
        e$ = B.create,
        eD = Y.create,
        eL = J.create,
        eZ = X.create,
        eK = Q.create,
        eG = ee.create,
        eF = ee.strictCreate,
        eW = et.create,
        eq = en.create,
        eV = ei.create,
        eH = ea.create,
        ez = es.create,
        eB = eo.create,
        eY = el.create,
        eJ = eu.create,
        eX = ec.create,
        eQ = ed.create,
        e1 = eh.create,
        e0 = eg.create,
        e2 = em.create,
        e4 = ef.create,
        e9 = ey.create,
        e3 = eb.create,
        e5 = ef.createWithPreprocess,
        e6 = ej.create;
      var e8,
        e7,
        te,
        tt,
        tr,
        tn,
        ti,
        ta,
        ts,
        to,
        tl,
        tu,
        tc,
        td,
        tp,
        th,
        tg,
        tm,
        tf,
        ty,
        tb,
        tv,
        t_,
        tk,
        tT,
        tE,
        tj,
        tw,
        tI,
        tx,
        tS,
        tR,
        tA,
        tO,
        tC,
        tP,
        tN = Object.freeze({
          __proto__: null,
          defaultErrorMap: l,
          setErrorMap: function (e) {
            u = e;
          },
          getErrorMap: c,
          makeIssue: d,
          EMPTY_PATH: [],
          addIssueToContext: p,
          ParseStatus: h,
          INVALID: g,
          DIRTY: m,
          OK: f,
          isAborted: y,
          isDirty: b,
          isValid: v,
          isAsync: _,
          get util() {
            return e8;
          },
          get objectUtil() {
            return e7;
          },
          ZodParsedType: i,
          getParsedType: a,
          ZodType: I,
          datetimeRegex: Z,
          ZodString: K,
          ZodNumber: G,
          ZodBigInt: F,
          ZodBoolean: W,
          ZodDate: q,
          ZodSymbol: V,
          ZodUndefined: H,
          ZodNull: z,
          ZodAny: B,
          ZodUnknown: Y,
          ZodNever: J,
          ZodVoid: X,
          ZodArray: Q,
          ZodObject: ee,
          ZodUnion: et,
          ZodDiscriminatedUnion: en,
          ZodIntersection: ei,
          ZodTuple: ea,
          ZodRecord: es,
          ZodMap: eo,
          ZodSet: el,
          ZodFunction: eu,
          ZodLazy: ec,
          ZodLiteral: ed,
          ZodEnum: eh,
          ZodNativeEnum: eg,
          ZodPromise: em,
          ZodEffects: ef,
          ZodTransformer: ef,
          ZodOptional: ey,
          ZodNullable: eb,
          ZodDefault: ev,
          ZodCatch: e_,
          ZodNaN: ek,
          BRAND: eT,
          ZodBranded: eE,
          ZodPipeline: ej,
          ZodReadonly: ew,
          custom: eI,
          Schema: I,
          ZodSchema: I,
          late: ex,
          get ZodFirstPartyTypeKind() {
            return tn;
          },
          coerce: {
            string: (e) => K.create({ ...e, coerce: !0 }),
            number: (e) => G.create({ ...e, coerce: !0 }),
            boolean: (e) => W.create({ ...e, coerce: !0 }),
            bigint: (e) => F.create({ ...e, coerce: !0 }),
            date: (e) => q.create({ ...e, coerce: !0 }),
          },
          any: e$,
          array: eK,
          bigint: eO,
          boolean: eC,
          date: eP,
          discriminatedUnion: eq,
          effect: e4,
          enum: e1,
          function: eJ,
          instanceof: (e, t = { message: `Input not instance of ${e.name}` }) =>
            eI((t) => t instanceof e, t),
          intersection: eV,
          lazy: eX,
          literal: eQ,
          map: eB,
          nan: eA,
          nativeEnum: e0,
          never: eL,
          null: eU,
          nullable: e3,
          number: eR,
          object: eG,
          oboolean: () => eC().optional(),
          onumber: () => eR().optional(),
          optional: e9,
          ostring: () => eS().optional(),
          pipeline: e6,
          preprocess: e5,
          promise: e2,
          record: ez,
          set: eY,
          strictObject: eF,
          string: eS,
          symbol: eN,
          transformer: e4,
          tuple: eH,
          undefined: eM,
          union: eW,
          unknown: eD,
          void: eZ,
          NEVER: g,
          ZodIssueCode: s,
          quotelessJson: (e) =>
            JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
          ZodError: o,
        });
      let tM = "3.3.17";
      async function tU(e) {
        let { SignJWT: t } = await r.e(7399).then(r.bind(r, 87399)),
          n = new TextEncoder().encode(e.secretKey);
        return new t(e.payload)
          .setIssuer("https://id.trigger.dev")
          .setAudience("https://api.trigger.dev")
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime(e.expirationTime ?? "15m")
          .sign(n);
      }
      tN.object({ url: tN.string().url(), authorizationCode: tN.string() }),
        tN.object({ authorizationCode: tN.string() }),
        tN.object({
          token: tN
            .object({ token: tN.string(), obfuscatedToken: tN.string() })
            .nullable(),
        });
      let t$ = tN.union([tN.string(), tN.number(), tN.boolean(), tN.null()]),
        tD = tN.lazy(() => tN.union([t$, tN.array(tD), tN.record(tD)])),
        tL = tN.union([
          tN.string(),
          tN.number(),
          tN.boolean(),
          tN.null(),
          tN.date(),
          tN.undefined(),
          tN.symbol(),
        ]),
        tZ = tN.lazy(() => tN.union([tL, tN.array(tZ), tN.record(tZ)])),
        tK = tN.object({
          type: tN.literal("update"),
          value: tN.record(tN.unknown()),
        }),
        tG = tN.object({
          type: tN.literal("set"),
          key: tN.string(),
          value: tD,
        }),
        tF = tN.object({ type: tN.literal("delete"), key: tN.string() }),
        tW = tN.object({
          type: tN.literal("append"),
          key: tN.string(),
          value: tD,
        }),
        tq = tN.object({
          type: tN.literal("remove"),
          key: tN.string(),
          value: tD,
        }),
        tV = tN.object({
          type: tN.literal("increment"),
          key: tN.string(),
          value: tN.number(),
        }),
        tH = tN.discriminatedUnion("type", [tK, tG, tF, tW, tq, tV]),
        tz = tN.object({
          metadata: tN.record(tD).optional(),
          operations: tN.array(tH).optional(),
          parentOperations: tN.array(tH).optional(),
          rootOperations: tN.array(tH).optional(),
        }),
        tB = tN.union([
          tN.literal(0.25),
          tN.literal(0.5),
          tN.literal(1),
          tN.literal(2),
          tN.literal(4),
        ]),
        tY = tN.union([
          tN.literal(0.25),
          tN.literal(0.5),
          tN.literal(1),
          tN.literal(2),
          tN.literal(4),
          tN.literal(8),
        ]),
        tJ = tN.enum([
          "micro",
          "small-1x",
          "small-2x",
          "medium-1x",
          "medium-2x",
          "large-1x",
          "large-2x",
        ]),
        tX = tN.object({
          cpu: tB.optional(),
          memory: tY.optional(),
          preset: tJ.optional(),
        }),
        tQ = tN.object({
          name: tJ,
          cpu: tN.number(),
          memory: tN.number(),
          centsPerMs: tN.number(),
        }),
        t1 = tN.object({
          type: tN.literal("BUILT_IN_ERROR"),
          name: tN.string(),
          message: tN.string(),
          stackTrace: tN.string(),
        }),
        t0 = tN.object({ type: tN.literal("CUSTOM_ERROR"), raw: tN.string() }),
        t2 = tN.object({ type: tN.literal("STRING_ERROR"), raw: tN.string() }),
        t4 = tN.object({
          type: tN.literal("INTERNAL_ERROR"),
          code: tN.enum([
            "COULD_NOT_FIND_EXECUTOR",
            "COULD_NOT_FIND_TASK",
            "COULD_NOT_IMPORT_TASK",
            "CONFIGURED_INCORRECTLY",
            "TASK_ALREADY_RUNNING",
            "TASK_EXECUTION_FAILED",
            "TASK_EXECUTION_ABORTED",
            "TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE",
            "TASK_PROCESS_SIGKILL_TIMEOUT",
            "TASK_PROCESS_SIGSEGV",
            "TASK_PROCESS_SIGTERM",
            "TASK_PROCESS_OOM_KILLED",
            "TASK_PROCESS_MAYBE_OOM_KILLED",
            "TASK_RUN_CANCELLED",
            "TASK_INPUT_ERROR",
            "TASK_OUTPUT_ERROR",
            "HANDLE_ERROR_ERROR",
            "GRACEFUL_EXIT_TIMEOUT",
            "TASK_RUN_HEARTBEAT_TIMEOUT",
            "TASK_RUN_CRASHED",
            "MAX_DURATION_EXCEEDED",
            "DISK_SPACE_EXCEEDED",
            "POD_EVICTED",
            "POD_UNKNOWN_ERROR",
            "OUTDATED_SDK_VERSION",
            "TASK_DID_CONCURRENT_WAIT",
            "RECURSIVE_WAIT_DEADLOCK",
          ]),
          message: tN.string().optional(),
          stackTrace: tN.string().optional(),
        }),
        t9 = t4.shape.code.enum,
        t3 = tN.discriminatedUnion("type", [t1, t0, t2, t4]),
        t5 = tN.object({
          id: tN.string(),
          payload: tN.string(),
          payloadType: tN.string(),
          context: tN.any(),
          tags: tN.array(tN.string()),
          isTest: tN.boolean().default(!1),
          createdAt: tN.coerce.date(),
          startedAt: tN.coerce.date().default(() => new Date()),
          idempotencyKey: tN.string().optional(),
          maxAttempts: tN.number().optional(),
          durationMs: tN.number().default(0),
          costInCents: tN.number().default(0),
          baseCostInCents: tN.number().default(0),
          version: tN.string().optional(),
          metadata: tN.record(tD).optional(),
          maxDuration: tN.number().optional(),
        }),
        t6 = tN.object({
          id: tN.string(),
          filePath: tN.string(),
          exportName: tN.string(),
        }),
        t8 = tN.object({
          id: tN.string(),
          number: tN.number(),
          startedAt: tN.coerce.date(),
          backgroundWorkerId: tN.string(),
          backgroundWorkerTaskId: tN.string(),
          status: tN.string(),
        }),
        t7 = tN.object({
          id: tN.string(),
          slug: tN.string(),
          type: tN.enum(["PRODUCTION", "STAGING", "DEVELOPMENT", "PREVIEW"]),
        }),
        re = tN.object({
          id: tN.string(),
          slug: tN.string(),
          name: tN.string(),
        }),
        rt = tN.object({
          id: tN.string(),
          ref: tN.string(),
          slug: tN.string(),
          name: tN.string(),
        }),
        rr = tN.object({ id: tN.string(), name: tN.string() }),
        rn = tN.object({ id: tN.string() }),
        ri = tN.object({
          task: t6,
          attempt: t8,
          run: t5,
          queue: rr,
          environment: t7,
          organization: re,
          project: rt,
          batch: rn.optional(),
          machine: tQ.optional(),
        });
      tN.object({
        task: t6,
        attempt: t8.omit({
          backgroundWorkerId: !0,
          backgroundWorkerTaskId: !0,
        }),
        run: t5.omit({ payload: !0, payloadType: !0, metadata: !0 }),
        queue: rr,
        environment: t7,
        organization: re,
        project: rt,
        batch: rn.optional(),
        machine: tQ.optional(),
      });
      let ra = tN.object({
          timestamp: tN.number(),
          delay: tN.number(),
          error: tN.unknown().optional(),
        }),
        rs = tN.object({ durationMs: tN.number() }),
        ro = tN.object({
          ok: tN.literal(!1),
          id: tN.string(),
          error: t3,
          retry: ra.optional(),
          skippedRetrying: tN.boolean().optional(),
          usage: rs.optional(),
          taskIdentifier: tN.string().optional(),
          metadata: tz.optional(),
        }),
        rl = tN.object({
          ok: tN.literal(!0),
          id: tN.string(),
          output: tN.string().optional(),
          outputType: tN.string(),
          usage: rs.optional(),
          taskIdentifier: tN.string().optional(),
          metadata: tz.optional(),
        }),
        ru = tN.discriminatedUnion("ok", [rl, ro]),
        rc = tN.object({ id: tN.string(), items: ru.array() }),
        rd = tN.object({
          message: tN.string(),
          name: tN.string().optional(),
          stackTrace: tN.string().optional(),
        }),
        rp = tN.enum(["PRODUCTION", "STAGING", "DEVELOPMENT", "PREVIEW"]),
        rh = tN.object({
          name: tN.string(),
          event: tN.string(),
          timestamp: tN.number(),
          duration: tN.number(),
        }),
        rg = tN.array(rh);
      tN.object({
        execution: ri,
        traceContext: tN.record(tN.unknown()),
        environment: tN.record(tN.string()).optional(),
        metrics: rg.optional(),
      });
      let rm = ri.extend({
          worker: tN.object({
            id: tN.string(),
            contentHash: tN.string(),
            version: tN.string(),
          }),
          machine: tQ.default({
            name: "small-1x",
            cpu: 1,
            memory: 1,
            centsPerMs: 0,
          }),
        }),
        rf = tN.object({
          execution: rm,
          traceContext: tN.record(tN.unknown()),
          environment: tN.record(tN.string()).optional(),
          metrics: rg.optional(),
        }),
        ry = tN.object({
          type: tN.literal("fixed-window"),
          limit: tN.number(),
          window: tN.union([
            tN.object({ seconds: tN.number() }),
            tN.object({ minutes: tN.number() }),
            tN.object({ hours: tN.number() }),
          ]),
        }),
        rb = tN.object({
          type: tN.literal("sliding-window"),
          limit: tN.number(),
          window: tN.union([
            tN.object({ seconds: tN.number() }),
            tN.object({ minutes: tN.number() }),
            tN.object({ hours: tN.number() }),
          ]),
        });
      tN.discriminatedUnion("type", [ry, rb]);
      let rv = tN.object({
          maxAttempts: tN.number().int().optional(),
          factor: tN.number().optional(),
          minTimeoutInMs: tN.number().int().optional(),
          maxTimeoutInMs: tN.number().int().optional(),
          randomize: tN.boolean().optional(),
          outOfMemory: tN.object({ machine: tJ.optional() }).optional(),
        }),
        r_ = tN.object({
          name: tN.string().optional(),
          concurrencyLimit: tN
            .number()
            .int()
            .min(0)
            .max(1e3)
            .optional()
            .nullable(),
        }),
        rk = tN.object({ cron: tN.string(), timezone: tN.string() }),
        rT = {
          id: tN.string(),
          description: tN.string().optional(),
          queue: r_.optional(),
          retry: rv.optional(),
          machine: tX.optional(),
          triggerSource: tN.string().optional(),
          schedule: rk.optional(),
          maxDuration: tN.number().optional(),
        };
      tN.object(rT);
      let rE = tN.object({ entry: tN.string(), out: tN.string() }),
        rj = {
          filePath: tN.string(),
          exportName: tN.string(),
          entryPoint: tN.string(),
        };
      tN.object(rj);
      let rw = tN.object({ ...rT, ...rj });
      tN.enum(["index", "create", "restore"]), tN.enum(["terminate"]);
      let rI = tN.custom((e) => {
        try {
          return "function" == typeof e.test;
        } catch {
          return !1;
        }
      });
      tN.object({
        project: tN.string(),
        triggerDirectories: tN.string().array().optional(),
        triggerUrl: tN.string().optional(),
        projectDir: tN.string().optional(),
        tsconfigPath: tN.string().optional(),
        retries: tN
          .object({
            enabledInDev: tN.boolean().default(!0),
            default: rv.optional(),
          })
          .optional(),
        additionalPackages: tN.string().array().optional(),
        additionalFiles: tN.string().array().optional(),
        dependenciesToBundle: tN.array(tN.union([tN.string(), rI])).optional(),
        logLevel: tN.string().optional(),
        enableConsoleLogging: tN.boolean().optional(),
        postInstall: tN.string().optional(),
        extraCACerts: tN.string().optional(),
      });
      let rx = tN.enum([
          "WAIT_FOR_DURATION",
          "WAIT_FOR_TASK",
          "WAIT_FOR_BATCH",
        ]),
        rS = tN.object({
          runId: tN.string(),
          attemptCount: tN.number().optional(),
          messageId: tN.string(),
          isTest: tN.boolean(),
          traceContext: tN.record(tN.unknown()),
          environment: tN.record(tN.string()).optional(),
          metrics: rg.optional(),
        });
      tN.object({
        attemptId: tN.string(),
        previousRunStatus: tN.string(),
        previousAttemptStatus: tN.string(),
      });
      let rR = tN.object({
          id: tN.string(),
          description: tN.string().optional(),
          filePath: tN.string(),
          exportName: tN.string(),
          queue: r_.optional(),
          retry: rv.optional(),
          machine: tX.optional(),
          triggerSource: tN.string().optional(),
          schedule: rk.optional(),
          maxDuration: tN.number().optional(),
        }),
        rA = tN.object({
          filePath: tN.string(),
          contents: tN.string(),
          contentHash: tN.string(),
          taskIds: tN.array(tN.string()),
        }),
        rO = tN.object({
          packageVersion: tN.string(),
          contentHash: tN.string(),
          cliPackageVersion: tN.string().optional(),
          tasks: tN.array(rR),
          sourceFiles: tN.array(rA).optional(),
        });
      tN.object({ contentHash: tN.string(), imageTag: tN.string() }),
        tN.object({
          userId: tN.string(),
          email: tN.string().email(),
          dashboardUrl: tN.string(),
        });
      let rC = tN.object({
        id: tN.string(),
        externalRef: tN.string(),
        name: tN.string(),
        slug: tN.string(),
        createdAt: tN.coerce.date(),
        organization: tN.object({
          id: tN.string(),
          title: tN.string(),
          slug: tN.string(),
          createdAt: tN.coerce.date(),
        }),
      });
      tN.array(rC),
        tN.object({
          apiKey: tN.string(),
          name: tN.string(),
          apiUrl: tN.string(),
          projectId: tN.string(),
        }),
        tN.object({
          localOnly: tN.boolean(),
          metadata: rO,
          supportsLazyAttempts: tN.boolean().optional(),
        }),
        tN.object({
          id: tN.string(),
          version: tN.string(),
          contentHash: tN.string(),
        });
      let rP = tN.string().max(128, "Tags must be less than 128 characters"),
        rN = tN.union([rP, rP.array()]),
        rM = tN.object({
          payload: tN.any(),
          context: tN.any(),
          options: tN
            .object({
              concurrencyKey: tN.string().optional(),
              delay: tN.string().or(tN.coerce.date()).optional(),
              dependentAttempt: tN.string().optional(),
              dependentBatch: tN.string().optional(),
              idempotencyKey: tN.string().optional(),
              idempotencyKeyTTL: tN.string().optional(),
              lockToVersion: tN.string().optional(),
              machine: tJ.optional(),
              maxAttempts: tN.number().int().optional(),
              maxDuration: tN.number().optional(),
              metadata: tN.any(),
              metadataType: tN.string().optional(),
              parentAttempt: tN.string().optional(),
              parentBatch: tN.string().optional(),
              payloadType: tN.string().optional(),
              queue: r_.optional(),
              tags: rN.optional(),
              test: tN.boolean().optional(),
              ttl: tN.string().or(tN.number().nonnegative().int()).optional(),
            })
            .optional(),
        }),
        rU = tN.object({ id: tN.string() });
      tN.object({
        items: rM.array(),
        dependentAttempt: tN.string().optional(),
      });
      let r$ = tN.object({
        task: tN.string(),
        payload: tN.any(),
        context: tN.any(),
        options: tN
          .object({
            concurrencyKey: tN.string().optional(),
            delay: tN.string().or(tN.coerce.date()).optional(),
            idempotencyKey: tN.string().optional(),
            idempotencyKeyTTL: tN.string().optional(),
            lockToVersion: tN.string().optional(),
            machine: tJ.optional(),
            maxAttempts: tN.number().int().optional(),
            maxDuration: tN.number().optional(),
            metadata: tN.any(),
            metadataType: tN.string().optional(),
            parentAttempt: tN.string().optional(),
            payloadType: tN.string().optional(),
            queue: r_.optional(),
            tags: rN.optional(),
            test: tN.boolean().optional(),
            ttl: tN.string().or(tN.number().nonnegative().int()).optional(),
          })
          .optional(),
      });
      tN.object({
        items: r$.array(),
        dependentAttempt: tN.string().optional(),
      });
      let rD = tN.object({
        id: tN.string(),
        isCached: tN.boolean(),
        idempotencyKey: tN.string().optional(),
        runs: tN.array(
          tN.object({
            id: tN.string(),
            taskIdentifier: tN.string(),
            isCached: tN.boolean(),
            idempotencyKey: tN.string().optional(),
          }),
        ),
      });
      tN.object({ batchId: tN.string(), runs: tN.string().array() }),
        tN.object({
          id: tN.string(),
          items: tN.array(
            tN.object({
              id: tN.string(),
              taskRunId: tN.string(),
              status: tN.enum(["PENDING", "CANCELED", "COMPLETED", "FAILED"]),
            }),
          ),
        }),
        tN.object({ tags: rN }),
        tN.object({ delay: tN.string().or(tN.coerce.date()) }),
        tN.object({ variables: tN.record(tN.string()) }),
        tN.object({
          imageReference: tN.string(),
          selfHosted: tN.boolean().optional(),
        }),
        tN.object({ id: tN.string(), contentHash: tN.string() }),
        tN.object({
          imageReference: tN.string(),
          selfHosted: tN.boolean().optional(),
          skipRegistryProxy: tN.boolean().optional(),
          skipPromotion: tN.boolean().optional(),
        });
      let rL = tN.object({
        buildId: tN.string(),
        buildToken: tN.string(),
        projectId: tN.string(),
      });
      tN.object({
        id: tN.string(),
        contentHash: tN.string(),
        shortCode: tN.string(),
        version: tN.string(),
        imageTag: tN.string(),
        externalBuildData: rL.optional().nullable(),
        registryHost: tN.string().optional(),
      }),
        tN.object({
          contentHash: tN.string(),
          userId: tN.string().optional(),
          registryHost: tN.string().optional(),
          selfHosted: tN.boolean().optional(),
          namespace: tN.string().optional(),
        });
      let rZ = tN.object({
        name: tN.string(),
        message: tN.string(),
        stack: tN.string().optional(),
        stderr: tN.string().optional(),
      });
      tN.object({ error: rZ }),
        tN.object({ id: tN.string() }),
        tN.object({
          id: tN.string(),
          version: tN.string(),
          shortCode: tN.string(),
        }),
        tN.object({
          id: tN.string(),
          status: tN.enum([
            "PENDING",
            "BUILDING",
            "DEPLOYING",
            "DEPLOYED",
            "FAILED",
            "CANCELED",
            "TIMED_OUT",
          ]),
          contentHash: tN.string(),
          shortCode: tN.string(),
          version: tN.string(),
          imageReference: tN.string().nullish(),
          errorData: rZ.nullish(),
          worker: tN
            .object({
              id: tN.string(),
              version: tN.string(),
              tasks: tN.array(
                tN.object({
                  id: tN.string(),
                  slug: tN.string(),
                  filePath: tN.string(),
                  exportName: tN.string(),
                }),
              ),
            })
            .optional(),
        });
      let rK = tN.object({ presignedUrl: tN.string() }),
        rG = tN.object({ id: tN.string() }),
        rF = tN.object({ id: tN.string() }),
        rW = tN.union([tN.literal("DECLARATIVE"), tN.literal("IMPERATIVE")]);
      tN.object({
        scheduleId: tN.string(),
        type: rW,
        timestamp: tN.date(),
        lastTimestamp: tN.date().optional(),
        externalId: tN.string().optional(),
        timezone: tN.string(),
        upcoming: tN.array(tN.date()),
      }),
        tN
          .object({
            task: tN.string(),
            cron: tN.string(),
            deduplicationKey: tN.string(),
            externalId: tN.string().optional(),
            timezone: tN.string().optional(),
          })
          .omit({ deduplicationKey: !0 });
      let rq = tN.object({
          type: tN.literal("CRON"),
          expression: tN.string(),
          description: tN.string(),
        }),
        rV = tN.object({
          id: tN.string(),
          type: rW,
          task: tN.string(),
          active: tN.boolean(),
          deduplicationKey: tN.string().nullish(),
          externalId: tN.string().nullish(),
          generator: rq,
          timezone: tN.string(),
          nextRun: tN.coerce.date().nullish(),
          environments: tN.array(
            tN.object({
              id: tN.string(),
              type: tN.string(),
              userName: tN.string().nullish(),
            }),
          ),
        }),
        rH = tN.object({ id: tN.string() });
      tN.object({
        data: tN.array(rV),
        pagination: tN.object({
          currentPage: tN.number(),
          totalPages: tN.number(),
          count: tN.number(),
        }),
      }),
        tN.object({
          page: tN.number().optional(),
          perPage: tN.number().optional(),
        }),
        tN.object({ timezones: tN.array(tN.string()) });
      let rz = tN.enum([
          "WAITING_FOR_DEPLOY",
          "QUEUED",
          "EXECUTING",
          "REATTEMPTING",
          "FROZEN",
          "COMPLETED",
          "CANCELED",
          "FAILED",
          "CRASHED",
          "INTERRUPTED",
          "SYSTEM_FAILURE",
          "DELAYED",
          "EXPIRED",
          "TIMED_OUT",
        ]),
        rB = tN.enum([
          "PENDING",
          "EXECUTING",
          "PAUSED",
          "COMPLETED",
          "FAILED",
          "CANCELED",
        ]),
        rY = tN.object({
          id: tN.string(),
          name: tN.string(),
          user: tN.string().optional(),
        }),
        rJ = tN.object({
          id: tN.string(),
          externalId: tN.string().optional(),
          deduplicationKey: tN.string().optional(),
          generator: rq,
        });
      tN.enum([
        "triggerAndWait",
        "trigger",
        "batchTriggerAndWait",
        "batchTrigger",
      ]);
      let rX = {
          id: tN.string(),
          status: rz,
          taskIdentifier: tN.string(),
          idempotencyKey: tN.string().optional(),
          version: tN.string().optional(),
          isQueued: tN.boolean(),
          isExecuting: tN.boolean(),
          isCompleted: tN.boolean(),
          isSuccess: tN.boolean(),
          isFailed: tN.boolean(),
          isCancelled: tN.boolean(),
          isTest: tN.boolean(),
          createdAt: tN.coerce.date(),
          updatedAt: tN.coerce.date(),
          startedAt: tN.coerce.date().optional(),
          finishedAt: tN.coerce.date().optional(),
          delayedUntil: tN.coerce.date().optional(),
          ttl: tN.string().optional(),
          expiredAt: tN.coerce.date().optional(),
          tags: tN.string().array(),
          costInCents: tN.number(),
          baseCostInCents: tN.number(),
          durationMs: tN.number(),
          metadata: tN.record(tN.any()).optional(),
        },
        rQ = {
          ...rX,
          depth: tN.number(),
          triggerFunction: tN.enum([
            "triggerAndWait",
            "trigger",
            "batchTriggerAndWait",
            "batchTrigger",
          ]),
          batchId: tN.string().optional(),
        },
        r1 = tN.object(rQ),
        r0 = tN.object({
          ...rQ,
          payload: tN.any().optional(),
          payloadPresignedUrl: tN.string().optional(),
          output: tN.any().optional(),
          outputPresignedUrl: tN.string().optional(),
          error: rd.optional(),
          schedule: rJ.optional(),
          relatedRuns: tN.object({
            root: r1.optional(),
            parent: r1.optional(),
            children: tN.array(r1).optional(),
          }),
          attempts: tN.array(
            tN
              .object({
                id: tN.string(),
                status: rB,
                createdAt: tN.coerce.date(),
                updatedAt: tN.coerce.date(),
                startedAt: tN.coerce.date().optional(),
                completedAt: tN.coerce.date().optional(),
                error: rd.optional(),
              })
              .optional(),
          ),
          attemptCount: tN.number().default(0),
        }),
        r2 = tN.object({ ...rX, env: rY });
      tN.object({
        data: tN.array(r2),
        pagination: tN.object({
          next: tN.string().optional(),
          previous: tN.string().optional(),
        }),
      }),
        tN.object({ name: tN.string(), value: tN.string() }),
        tN.object({ value: tN.string() }),
        tN.object({
          variables: tN.record(tN.string()),
          override: tN.boolean().optional(),
        });
      let r4 = tN.object({ success: tN.boolean() }),
        r9 = tN.object({ value: tN.string() }),
        r3 = tN.object({ name: tN.string(), value: tN.string() }),
        r5 = tN.array(r3),
        r6 = tN.object({ metadata: tN.record(tD) }),
        r8 = tN
          .string()
          .transform((e) => `${e}Z`)
          .pipe(tN.coerce.date()),
        r7 = tN
          .string()
          .nullish()
          .transform((e) => (e ? new Date(`${e}Z`) : e)),
        ne = tN.object({
          id: tN.string(),
          idempotencyKey: tN.string().nullish(),
          createdAt: r8,
          updatedAt: r8,
          startedAt: r7,
          delayUntil: r7,
          queuedAt: r7,
          expiredAt: r7,
          completedAt: r7,
          taskIdentifier: tN.string(),
          friendlyId: tN.string(),
          number: tN.number(),
          isTest: tN.boolean(),
          status: tN.string(),
          usageDurationMs: tN.number(),
          costInCents: tN.number(),
          baseCostInCents: tN.number(),
          ttl: tN.string().nullish(),
          payload: tN.string().nullish(),
          payloadType: tN.string().nullish(),
          metadata: tN.string().nullish(),
          metadataType: tN.string().nullish(),
          output: tN.string().nullish(),
          outputType: tN.string().nullish(),
          runTags: tN.array(tN.string()).nullish().default([]),
          error: t3.nullish(),
        }),
        nt = tN.enum(["PENDING", "COMPLETED"]),
        nr = tN.object({
          id: tN.string(),
          status: nt,
          idempotencyKey: tN.string().optional(),
          createdAt: tN.coerce.date(),
          updatedAt: tN.coerce.date(),
          runCount: tN.number(),
        });
      tN.object({
        id: tN.string(),
        runId: tN.string(),
        sequence: tN.number(),
        key: tN.string(),
        value: tN.string(),
        createdAt: tN.coerce.date(),
      });
      let nn = tN.object({ project: tN.string(), dirs: tN.string().array() }),
        ni = tN.object({ name: tN.string(), version: tN.string() }),
        na = tN.enum(["dev", "deploy"]),
        ns = tN.enum(["node", "bun"]),
        no = tN.object({
          target: na,
          packageVersion: tN.string(),
          cliPackageVersion: tN.string(),
          contentHash: tN.string(),
          runtime: ns,
          environment: tN.string(),
          config: nn,
          files: tN.array(rE),
          sources: tN.record(
            tN.object({ contents: tN.string(), contentHash: tN.string() }),
          ),
          outputPath: tN.string(),
          runWorkerEntryPoint: tN.string(),
          runControllerEntryPoint: tN.string().optional(),
          indexWorkerEntryPoint: tN.string(),
          indexControllerEntryPoint: tN.string().optional(),
          loaderEntryPoint: tN.string().optional(),
          configPath: tN.string(),
          externals: ni.array().optional(),
          build: tN.object({
            env: tN.record(tN.string()).optional(),
            commands: tN.array(tN.string()).optional(),
          }),
          customConditions: tN.array(tN.string()).optional(),
          deploy: tN.object({
            env: tN.record(tN.string()).optional(),
            sync: tN
              .object({ env: tN.record(tN.string()).optional() })
              .optional(),
          }),
          image: tN
            .object({
              pkgs: tN.array(tN.string()).optional(),
              instructions: tN.array(tN.string()).optional(),
            })
            .optional(),
          otelImportHook: tN
            .object({
              include: tN.array(tN.string()).optional(),
              exclude: tN.array(tN.string()).optional(),
            })
            .optional(),
        });
      tN.object({ type: tN.literal("index"), data: tN.object({ build: no }) });
      let nl = tN.object({
        configPath: tN.string(),
        tasks: rw.array(),
        workerEntryPoint: tN.string(),
        controllerEntryPoint: tN.string().optional(),
        loaderEntryPoint: tN.string().optional(),
        runtime: ns,
        customConditions: tN.array(tN.string()).optional(),
        otelImportHook: tN
          .object({
            include: tN.array(tN.string()).optional(),
            exclude: tN.array(tN.string()).optional(),
          })
          .optional(),
      });
      tN.object({
        type: tN.literal("worker-manifest"),
        data: tN.object({ manifest: nl }),
      });
      let nu = tN.object({
          message: tN.string(),
          file: tN.string(),
          stack: tN.string().optional(),
          name: tN.string().optional(),
        }),
        nc = tN.array(nu);
      tN.discriminatedUnion("success", [
        tN.object({
          success: tN.literal(!1),
          error: tN.object({
            name: tN.string(),
            message: tN.string(),
            stack: tN.string().optional(),
            stderr: tN.string().optional(),
          }),
        }),
        tN.object({ success: tN.literal(!0) }),
      ]);
      let nd = tN.discriminatedUnion("type", [
        tN.object({
          type: tN.literal("CANCEL_ATTEMPT"),
          taskAttemptId: tN.string(),
          taskRunId: tN.string(),
        }),
        tN.object({
          type: tN.literal("SCHEDULE_ATTEMPT"),
          image: tN.string(),
          version: tN.string(),
          machine: tQ,
          nextAttemptNumber: tN.number().optional(),
          id: tN.string().optional(),
          envId: tN.string(),
          envType: rp,
          orgId: tN.string(),
          projectId: tN.string(),
          runId: tN.string(),
          dequeuedAt: tN.number().optional(),
        }),
        tN.object({
          type: tN.literal("EXECUTE_RUN_LAZY_ATTEMPT"),
          payload: rS,
        }),
      ]);
      tN.object({ version: tN.literal("v1").default("v1"), id: tN.string() }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          backgroundWorkerId: tN.string(),
          data: nd,
        });
      let np = tN.discriminatedUnion("type", [
          tN.object({
            version: tN.literal("v1").default("v1"),
            type: tN.literal("TASK_RUN_COMPLETED"),
            completion: ru,
            execution: ri,
          }),
          tN.object({
            version: tN.literal("v1").default("v1"),
            type: tN.literal("TASK_RUN_FAILED_TO_RUN"),
            completion: ro,
          }),
          tN.object({
            version: tN.literal("v1").default("v1"),
            type: tN.literal("TASK_HEARTBEAT"),
            id: tN.string(),
          }),
          tN.object({
            version: tN.literal("v1").default("v1"),
            type: tN.literal("TASK_RUN_HEARTBEAT"),
            id: tN.string(),
          }),
        ]),
        nh = tN.object({
          id: tN.string(),
          version: tN.string(),
          contentHash: tN.string(),
        });
      tN.object({
        version: tN.literal("v1").default("v1"),
        backgroundWorkerId: tN.string(),
        inProgressRuns: tN.string().array().optional(),
      }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          backgroundWorkerId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          backgroundWorkerId: tN.string(),
          data: np,
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          error: tN.object({
            name: tN.string(),
            message: tN.string(),
            stack: tN.string().optional(),
          }),
          origin: tN.enum(["uncaughtException", "unhandledRejection"]),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          tasks: tN.unknown(),
          zodIssues: tN.custom(
            (e) =>
              Array.isArray(e) &&
              e.every((e) => "object" == typeof e && "message" in e),
          ),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          manifest: nl,
          importErrors: nc,
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          execution: ri,
          result: ru,
        }),
        tN.object({ version: tN.literal("v1").default("v1"), id: tN.string() }),
        tN.undefined(),
        tN.object({
          version: tN.literal("v1").default("v1"),
          ms: tN.number(),
          now: tN.number(),
          waitThresholdInMs: tN.number(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          friendlyId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          batchFriendlyId: tN.string(),
          runFriendlyIds: tN.string().array(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          execution: ri,
          traceContext: tN.record(tN.unknown()),
          metadata: nh,
          metrics: rg.optional(),
        }),
        tN.discriminatedUnion("version", [
          tN.object({
            version: tN.literal("v1"),
            completion: ru,
            execution: ri,
          }),
          tN.object({ version: tN.literal("v2"), completion: ru }),
        ]),
        tN.object({ version: tN.literal("v1").default("v1") }),
        tN.object({ timeoutInMs: tN.number() }),
        tN.void(),
        tN.object({
          version: tN.literal("v1").default("v1"),
          data: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          data: tN.string(),
        }),
        tN.object({ status: tN.literal("ok") }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          reason: tN.string().optional(),
          exitCode: tN.number().optional(),
          message: tN.string().optional(),
          logs: tN.string().optional(),
          overrideCompletion: tN.boolean().optional(),
          errorCode: t4.shape.code.optional(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          deploymentId: tN.string(),
          error: tN.object({
            name: tN.string(),
            message: tN.string(),
            stack: tN.string().optional(),
            stderr: tN.string().optional(),
          }),
          overrideCompletion: tN.boolean().optional(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          imageTag: tN.string(),
          shortCode: tN.string(),
          apiKey: tN.string(),
          apiUrl: tN.string(),
          envId: tN.string(),
          envType: rp,
          orgId: tN.string(),
          projectId: tN.string(),
          deploymentId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          type: tN.enum(["DOCKER", "KUBERNETES"]),
          location: tN.string(),
          reason: tN.string().optional(),
          imageRef: tN.string(),
          attemptNumber: tN.number().optional(),
          machine: tQ,
          checkpointId: tN.string(),
          envId: tN.string(),
          envType: rp,
          orgId: tN.string(),
          projectId: tN.string(),
          runId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          imageRef: tN.string(),
          shortCode: tN.string(),
          envId: tN.string(),
          envType: rp,
          orgId: tN.string(),
          projectId: tN.string(),
          deploymentId: tN.string(),
        });
      let ng = tN.object({
        projectRef: tN.string(),
        envId: tN.string(),
        deploymentId: tN.string(),
        metadata: tN.object({
          cliPackageVersion: tN.string().optional(),
          contentHash: tN.string(),
          packageVersion: tN.string(),
          tasks: rR.array(),
        }),
      });
      tN.object({
        version: tN.literal("v1").default("v1"),
        metadata: tN.any(),
        text: tN.string(),
      }),
        tN.discriminatedUnion("version", [
          ng.extend({ version: tN.literal("v1") }),
          ng.extend({
            version: tN.literal("v2"),
            supportsLazyAttempts: tN.boolean(),
          }),
        ]),
        tN.discriminatedUnion("success", [
          tN.object({ success: tN.literal(!1) }),
          tN.object({ success: tN.literal(!0) }),
        ]),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          envId: tN.string(),
        }),
        tN.discriminatedUnion("success", [
          tN.object({
            success: tN.literal(!1),
            reason: tN.string().optional(),
          }),
          tN.object({ success: tN.literal(!0), executionPayload: rf }),
        ]),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          totalCompletions: tN.number(),
        }),
        tN.discriminatedUnion("success", [
          tN.object({ success: tN.literal(!1) }),
          tN.object({ success: tN.literal(!0), payload: rf }),
        ]),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          envId: tN.string(),
          totalCompletions: tN.number(),
        }),
        tN.discriminatedUnion("success", [
          tN.object({
            success: tN.literal(!1),
            reason: tN.string().optional(),
          }),
          tN.object({ success: tN.literal(!0), lazyPayload: rS }),
        ]),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptFriendlyId: tN.string(),
          type: rx,
        }),
        tN.object({
          version: tN.enum(["v1", "v2"]).default("v1"),
          execution: rm,
          completion: ru,
          checkpoint: tN
            .object({ docker: tN.boolean(), location: tN.string() })
            .optional(),
        }),
        tN.object({
          version: tN.enum(["v1", "v2"]).default("v2"),
          execution: rm,
          completion: ru,
          checkpoint: tN
            .object({ docker: tN.boolean(), location: tN.string() })
            .optional(),
        }),
        tN.object({ version: tN.literal("v1").default("v1"), completion: ro }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptFriendlyId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string().optional(),
          attemptFriendlyId: tN.string(),
          docker: tN.boolean(),
          location: tN.string(),
          reason: tN.discriminatedUnion("type", [
            tN.object({
              type: tN.literal("WAIT_FOR_DURATION"),
              ms: tN.number(),
              now: tN.number(),
            }),
            tN.object({
              type: tN.literal("WAIT_FOR_BATCH"),
              batchFriendlyId: tN.string(),
              runFriendlyIds: tN.string().array(),
            }),
            tN.object({
              type: tN.literal("WAIT_FOR_TASK"),
              friendlyId: tN.string(),
            }),
            tN.object({
              type: tN.literal("RETRYING_AFTER_FAILURE"),
              attemptNumber: tN.number(),
            }),
            tN.object({
              type: tN.literal("MANUAL"),
              restoreAtUnixTimeMs: tN.number().optional(),
            }),
          ]),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          keepRunAlive: tN.boolean(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          deploymentId: tN.string(),
          error: tN.object({
            name: tN.string(),
            message: tN.string(),
            stack: tN.string().optional(),
            stderr: tN.string().optional(),
          }),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          error: tN.object({
            name: tN.string(),
            message: tN.string(),
            stack: tN.string().optional(),
          }),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          attemptId: tN.string(),
          attemptFriendlyId: tN.string(),
          completions: ru.array(),
          executions: ri.array(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          attemptId: tN.string(),
          attemptFriendlyId: tN.string(),
          completions: ru.array(),
          executions: ri.array(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptId: tN.string(),
          attemptFriendlyId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptId: tN.string(),
          attemptFriendlyId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          delayInMs: tN.number().optional(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          checkpointThresholdInMs: tN.number(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          backgroundWorkerId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          backgroundWorkerId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          backgroundWorkerId: tN.string(),
          data: np,
        }),
        tN.object({ version: tN.literal("v1").default("v1"), id: tN.string() }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          backgroundWorkerId: tN.string(),
          data: nd,
        });
      let nm = tN.object({
        version: tN.literal("v1"),
        deploymentId: tN.string(),
        tasks: rR.array(),
        packageVersion: tN.string(),
      });
      tN.object({ version: tN.literal("v1").default("v1") }),
        tN.void(),
        tN.discriminatedUnion("version", [
          nm.extend({ version: tN.literal("v1") }),
          nm.extend({
            version: tN.literal("v2"),
            supportsLazyAttempts: tN.boolean(),
          }),
        ]),
        tN.discriminatedUnion("success", [
          tN.object({ success: tN.literal(!1) }),
          tN.object({ success: tN.literal(!0) }),
        ]),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          totalCompletions: tN.number(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
          totalCompletions: tN.number(),
          startTime: tN.number().optional(),
        }),
        tN.discriminatedUnion("version", [
          tN.object({
            version: tN.literal("v1"),
            attemptFriendlyId: tN.string(),
            type: rx,
          }),
          tN.object({
            version: tN.literal("v2"),
            attemptFriendlyId: tN.string(),
            attemptNumber: tN.number(),
            type: rx,
          }),
        ]),
        tN.object({ version: tN.literal("v1").default("v1") }),
        tN
          .discriminatedUnion("version", [
            tN.object({ version: tN.literal("v1") }),
            tN.object({ version: tN.literal("v2"), reason: rx.optional() }),
          ])
          .default({ version: "v1" }),
        tN.object({
          version: tN.literal("v2").default("v2"),
          checkpointCanceled: tN.boolean(),
          reason: rx.optional(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptFriendlyId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
        }),
        tN.object({
          version: tN.enum(["v1", "v2"]).default("v1"),
          execution: rm,
          completion: ru,
        }),
        tN.object({
          willCheckpointAndRestore: tN.boolean(),
          shouldExit: tN.boolean(),
        }),
        tN.object({ version: tN.literal("v1").default("v1"), completion: ro }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          ms: tN.number(),
          now: tN.number(),
          attemptFriendlyId: tN.string(),
        }),
        tN.object({ willCheckpointAndRestore: tN.boolean() }),
        tN.object({
          version: tN.enum(["v1", "v2"]).default("v1"),
          friendlyId: tN.string(),
          attemptFriendlyId: tN.string(),
        }),
        tN.object({ willCheckpointAndRestore: tN.boolean() }),
        tN.object({
          version: tN.enum(["v1", "v2"]).default("v1"),
          batchFriendlyId: tN.string(),
          runFriendlyIds: tN.string().array(),
          attemptFriendlyId: tN.string(),
        }),
        tN.object({ willCheckpointAndRestore: tN.boolean() }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          deploymentId: tN.string(),
          error: tN.object({
            name: tN.string(),
            message: tN.string(),
            stack: tN.string().optional(),
            stderr: tN.string().optional(),
          }),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
        }),
        tN.discriminatedUnion("success", [
          tN.object({
            success: tN.literal(!1),
            reason: tN.string().optional(),
          }),
          tN.object({ success: tN.literal(!0), executionPayload: rf }),
        ]),
        tN.object({
          version: tN.literal("v1").default("v1"),
          error: tN.object({
            name: tN.string(),
            message: tN.string(),
            stack: tN.string().optional(),
          }),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptFriendlyId: tN.string().optional(),
          attemptNumber: tN.string().optional(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptId: tN.string(),
          completions: ru.array(),
          executions: ri.array(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptId: tN.string(),
        }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          executionPayload: rf,
        }),
        tN.object({ version: tN.literal("v1").default("v1"), lazyPayload: rS }),
        tN.object({
          version: tN.literal("v1").default("v1"),
          attemptId: tN.string(),
        }),
        tN.discriminatedUnion("version", [
          tN.object({ version: tN.literal("v1") }),
          tN.object({
            version: tN.literal("v2"),
            delayInMs: tN.number().optional(),
          }),
        ]),
        tN.object({
          version: tN.literal("v1").default("v1"),
          runId: tN.string(),
        }),
        tN.object({
          contentHash: tN.string(),
          projectRef: tN.string(),
          envId: tN.string(),
          runId: tN.string(),
          attemptFriendlyId: tN.string().optional(),
          attemptNumber: tN.string().optional(),
          podName: tN.string(),
          deploymentId: tN.string(),
          deploymentVersion: tN.string(),
          requiresCheckpointResumeWithMessage: tN.string().optional(),
        }),
        tN.object({ supportsDynamicConfig: tN.string().optional() });
      let nf = tN.enum(["primary"]),
        ny = tN.object({
          text: tN.string(),
          variant: tN.string().optional(),
          url: tN.string().optional(),
        }),
        nb = tN.object({
          items: tN.array(ny),
          style: tN.enum(["codepath"]).optional(),
        });
      tN.object({
        icon: tN.string().optional(),
        variant: nf.optional(),
        accessory: nb.optional(),
      }).default({ icon: void 0, variant: void 0 });
      let nv = [
          tN.object({ $endsWith: tN.string() }),
          tN.object({ $startsWith: tN.string() }),
          tN.object({ $ignoreCaseEquals: tN.string() }),
        ],
        n_ = tN.union([
          tN.array(tN.string()),
          tN.array(tN.number()),
          tN.array(tN.boolean()),
          tN.array(
            tN.union([
              ...nv,
              tN.object({ $exists: tN.boolean() }),
              tN.object({ $isNull: tN.boolean() }),
              tN.object({
                $anythingBut: tN.union([
                  tN.string(),
                  tN.number(),
                  tN.boolean(),
                ]),
              }),
              tN.object({
                $anythingBut: tN.union([
                  tN.array(tN.string()),
                  tN.array(tN.number()),
                  tN.array(tN.boolean()),
                ]),
              }),
              tN.object({ $gt: tN.number() }),
              tN.object({ $lt: tN.number() }),
              tN.object({ $gte: tN.number() }),
              tN.object({ $lte: tN.number() }),
              tN.object({ $between: tN.tuple([tN.number(), tN.number()]) }),
              tN.object({
                $includes: tN.union([tN.string(), tN.number(), tN.boolean()]),
              }),
              tN.object({
                $not: tN.union([tN.string(), tN.number(), tN.boolean()]),
              }),
            ]),
          ),
        ]),
        nk = tN.lazy(() => tN.record(tN.union([n_, nk]))),
        nT = tN.object({
          strategy: tN.literal("headers"),
          limitHeader: tN.string(),
          remainingHeader: tN.string(),
          resetHeader: tN.string(),
          bodyFilter: nk.optional(),
          resetFormat: tN
            .enum([
              "unix_timestamp",
              "unix_timestamp_in_ms",
              "iso_8601",
              "iso_8601_duration_openai_variant",
            ])
            .default("unix_timestamp")
            .optional(),
        }),
        nE = rv.extend({
          strategy: tN.literal("backoff"),
          bodyFilter: nk.optional(),
        }),
        nj = tN.discriminatedUnion("strategy", [nT, nE]),
        nw = tN.record(tN.string(), nj);
      tN.object({ durationInMs: tN.number().optional(), retry: rv.optional() }),
        tN.object({
          byStatus: nw.optional(),
          timeout: rv.optional(),
          connectionError: rv.optional(),
        });
      let nI = tN.object({
          type: tN.string().optional(),
          message: tN.string().optional(),
          stacktrace: tN.string().optional(),
        }),
        nx = tN.object({
          name: tN.literal("exception"),
          time: tN.coerce.date(),
          properties: tN.object({ exception: nI }),
        }),
        nS = tN.object({
          name: tN.literal("cancellation"),
          time: tN.coerce.date(),
          properties: tN.object({ reason: tN.string() }),
        }),
        nR = tN.object({
          name: tN.string(),
          time: tN.coerce.date(),
          properties: tN.record(tN.unknown()),
        }),
        nA = tN.union([nx, nS, nR]);
      tN.array(nA),
        tN.object({
          system: tN.string().optional(),
          client_id: tN.string().optional(),
          operation: tN.enum(["publish", "create", "receive", "deliver"]),
          message: tN.any(),
          destination: tN.string().optional(),
        });
      let nO = tN.object({
          message: tN.string(),
          name: tN.string().optional(),
          stack: tN.string().optional(),
        }),
        nC = tN.object({ path: tN.array(tN.string()), message: tN.string() }),
        nP = [
          tN.object({ $endsWith: tN.string() }),
          tN.object({ $startsWith: tN.string() }),
          tN.object({ $ignoreCaseEquals: tN.string() }),
        ],
        nN = tN.union([
          tN.array(tN.string()),
          tN.array(tN.number()),
          tN.array(tN.boolean()),
          tN.array(
            tN.union([
              ...nP,
              tN.object({ $exists: tN.boolean() }),
              tN.object({ $isNull: tN.boolean() }),
              tN.object({
                $anythingBut: tN.union([
                  tN.string(),
                  tN.number(),
                  tN.boolean(),
                ]),
              }),
              tN.object({
                $anythingBut: tN.union([
                  tN.array(tN.string()),
                  tN.array(tN.number()),
                  tN.array(tN.boolean()),
                ]),
              }),
              tN.object({ $gt: tN.number() }),
              tN.object({ $lt: tN.number() }),
              tN.object({ $gte: tN.number() }),
              tN.object({ $lte: tN.number() }),
              tN.object({ $between: tN.tuple([tN.number(), tN.number()]) }),
              tN.object({
                $includes: tN.union([tN.string(), tN.number(), tN.boolean()]),
              }),
              tN.object({
                $not: tN.union([tN.string(), tN.number(), tN.boolean()]),
              }),
            ]),
          ),
        ]),
        nM = tN.lazy(() => tN.record(tN.union([nN, nM]))),
        nU = tN.object({
          event: tN.string().or(tN.array(tN.string())),
          source: tN.string(),
          payload: nM.optional(),
          context: nM.optional(),
        }),
        n$ = tN.object({
          type: tN.enum(["oauth2", "apiKey"]),
          accessToken: tN.string(),
          scopes: tN.array(tN.string()).optional(),
          additionalFields: tN.record(tN.string()).optional(),
        }),
        nD = tN.object({
          id: tN.string(),
          name: tN.string(),
          instructions: tN.string().optional(),
        }),
        nL = tN.object({
          id: tN.string(),
          metadata: nD,
          authSource: tN.enum(["HOSTED", "LOCAL", "RESOLVER"]),
        }),
        nZ = tN.object({
          label: tN.string(),
          text: tN.string(),
          url: tN.string().optional(),
          imageUrl: tN.array(tN.string()).optional(),
        });
      tN.array(nZ);
      let nK = tN.object({
        style: tN.enum(["normal", "minimal"]),
        variant: tN.string().optional(),
      });
      tN.object({
        ts: tN.coerce.date(),
        lastTimestamp: tN.coerce.date().optional(),
      });
      let nG = tN.object({
          seconds: tN.number().int().positive().min(20).max(2592e3),
        }),
        nF = tN.object({ cron: tN.string() }),
        nW = tN.object({
          type: tN.literal("cron"),
          options: nF,
          accountId: tN.string().optional(),
          metadata: tN.any(),
        }),
        nq = tN.object({
          type: tN.literal("interval"),
          options: nG,
          accountId: tN.string().optional(),
          metadata: tN.any(),
        }),
        nV = tN.discriminatedUnion("type", [nq, nW]),
        nH = tN.object({
          id: tN.string(),
          jobs: tN.array(tN.object({ id: tN.string(), version: tN.string() })),
        }),
        nz = tN.enum([
          "PENDING",
          "WAITING",
          "RUNNING",
          "COMPLETED",
          "ERRORED",
          "CANCELED",
        ]),
        nB = tN.object({
          id: tN.string(),
          name: tN.string(),
          icon: tN.string().optional().nullable(),
          noop: tN.boolean(),
          startedAt: tN.coerce.date().optional().nullable(),
          completedAt: tN.coerce.date().optional().nullable(),
          delayUntil: tN.coerce.date().optional().nullable(),
          status: nz,
          description: tN.string().optional().nullable(),
          properties: tN.array(nZ).optional().nullable(),
          outputProperties: tN.array(nZ).optional().nullable(),
          params: tD.optional().nullable(),
          output: tD.optional().nullable(),
          context: tD.optional().nullable(),
          error: tN.string().optional().nullable(),
          parentId: tN.string().optional().nullable(),
          style: nK.optional().nullable(),
          operation: tN.string().optional().nullable(),
          callbackUrl: tN.string().optional().nullable(),
          childExecutionMode: tN
            .enum(["SEQUENTIAL", "PARALLEL"])
            .optional()
            .nullable(),
        }),
        nY = nB.extend({
          idempotencyKey: tN.string(),
          attempts: tN.number(),
          forceYield: tN.boolean().optional().nullable(),
        }),
        nJ = tN.object({
          id: tN.string(),
          idempotencyKey: tN.string(),
          status: nz,
          noop: tN.boolean().default(!1),
          output: tD.optional().nullable(),
          parentId: tN.string().optional().nullable(),
        }),
        nX = tN.object({
          id: tN.string(),
          icon: tN.string().optional(),
          name: tN.string(),
          payload: tN.any(),
        }),
        nQ = tN.object({
          name: tN.string().or(tN.array(tN.string())),
          title: tN.string(),
          source: tN.string(),
          icon: tN.string(),
          filter: nM.optional(),
          properties: tN.array(nZ).optional(),
          schema: tN.any().optional(),
          examples: tN.array(nX).optional(),
        }),
        n1 = tN.object({ type: tN.literal("dynamic"), id: tN.string() }),
        n0 = tN.object({
          noRuns: tN
            .object({ text: tN.string(), link: tN.string().optional() })
            .optional(),
        }),
        n2 = tN.object({
          type: tN.literal("static"),
          title: tN.union([tN.string(), tN.array(tN.string())]),
          properties: tN.array(nZ).optional(),
          rule: nU,
          link: tN.string().optional(),
          help: n0.optional(),
        }),
        n4 = tN.object({ type: tN.literal("invoke") }),
        n9 = tN.object({ type: tN.literal("scheduled"), schedule: nV }),
        n3 = tN.discriminatedUnion("type", [n1, n2, n9, n4]),
        n5 = tN.union([
          tN.literal("loading"),
          tN.literal("success"),
          tN.literal("failure"),
        ]),
        n6 = tN.record(tZ),
        n8 = tN.object({
          label: tN.string().optional(),
          state: n5.optional(),
          data: n6.optional(),
        }),
        n7 = n8.required({ label: !0 }),
        ie = tN.array(n8),
        it = n7.extend({ key: tN.string(), history: ie }),
        ir = tN.union([
          tN.literal("PENDING"),
          tN.literal("QUEUED"),
          tN.literal("WAITING_ON_CONNECTIONS"),
          tN.literal("PREPROCESSING"),
          tN.literal("STARTED"),
          tN.literal("SUCCESS"),
          tN.literal("FAILURE"),
          tN.literal("TIMED_OUT"),
          tN.literal("ABORTED"),
          tN.literal("CANCELED"),
          tN.literal("UNRESOLVED_AUTH"),
          tN.literal("INVALID_PAYLOAD"),
          tN.literal("EXECUTING"),
          tN.literal("WAITING_TO_CONTINUE"),
          tN.literal("WAITING_TO_EXECUTE"),
        ]),
        ii = tN
          .object({
            id: tN.string(),
            displayKey: tN.string().nullable(),
            status: nz,
            name: tN.string(),
            icon: tN.string().nullable(),
            startedAt: tN.coerce.date().nullable(),
            completedAt: tN.coerce.date().nullable(),
          })
          .extend({ subtasks: tN.lazy(() => ii.array()).optional() });
      tN.object({
        subtasks: tN.boolean().optional(),
        cursor: tN.string().optional(),
        take: tN.number().optional(),
      }).extend({ taskdetails: tN.boolean().optional() });
      let ia = tN.object({
        id: tN.string(),
        status: ir,
        startedAt: tN.coerce.date().nullable(),
        updatedAt: tN.coerce.date().nullable(),
        completedAt: tN.coerce.date().nullable(),
      });
      ia.extend({
        output: tN.any().optional(),
        tasks: tN.array(ii),
        statuses: tN.array(it).default([]),
        nextCursor: tN.string().optional(),
      }),
        tN.object({
          cursor: tN.string().optional(),
          take: tN.number().optional(),
        }),
        tN.object({ runs: ia.array(), nextCursor: tN.string().optional() });
      let is = tN.union([tN.array(tN.string()), tN.array(tN.union(nP))]),
        io = tN.union([
          tN.literal("GET"),
          tN.literal("POST"),
          tN.literal("PUT"),
          tN.literal("PATCH"),
          tN.literal("DELETE"),
          tN.literal("HEAD"),
          tN.literal("OPTIONS"),
        ]),
        il = tN.object({
          method: tN.array(io).optional(),
          headers: tN.record(is).optional(),
          query: tN.record(is).optional(),
          body: nM.optional(),
        });
      il
        .omit({ method: !0, query: !0 })
        .extend({ status: tN.array(tN.number()).optional() }),
        tN.object({
          registeredEvents: tN.array(tN.string()),
          secret: tN.string().optional(),
          data: tZ.optional(),
        }),
        tN.object({
          secret: tN.string().optional(),
          data: tZ.optional(),
          options: tN
            .object({ event: tN.array(tN.string()) })
            .and(tN.record(tN.string(), tN.array(tN.string())).optional()),
        }),
        tN.discriminatedUnion("active", [
          tN.object({ active: tN.literal(!1) }),
          tN.object({
            active: tN.literal(!0),
            config: tN.record(tN.string().array()),
          }),
        ]);
      let iu = tN.object({ type: tN.literal("HTTP"), url: tN.string().url() }),
        ic = tN.object({ type: tN.literal("SMTP") }),
        id = tN.object({ type: tN.literal("SQS") }),
        ip = tN.discriminatedUnion("type", [iu, ic, id]);
      tN.object({
        key: tN.string(),
        params: tN.any(),
        config: tN.any(),
        active: tN.boolean(),
        secret: tN.string(),
        url: tN.string(),
        data: tD.optional(),
        clientId: tN.string().optional(),
      }),
        tN.object({
          active: tN.boolean(),
          params: tN.any().optional(),
          config: tN.object({
            current: tN.record(tN.string().array()),
            desired: tN.record(tN.string().array()),
          }),
          url: tN.string(),
          secret: tN.string(),
        });
      let ih = tN.object({
        key: tN.string(),
        params: tN.any(),
        active: tN.boolean(),
        secret: tN.string(),
        data: tD.optional(),
        channel: ip,
        clientId: tN.string().optional(),
      });
      tN.object({ name: tN.string(), value: tN.string() }),
        tN.object({
          id: tN.string(),
          source: ih,
          events: tN.array(tN.string()),
          missingEvents: tN.array(tN.string()),
          orphanedEvents: tN.array(tN.string()),
          dynamicTriggerId: tN.string().optional(),
        });
      let ig = tN.object({
          desired: tN.array(tN.string()),
          missing: tN.array(tN.string()),
          orphaned: tN.array(tN.string()),
        }),
        im = tN.object({ event: ig }).and(tN.record(tN.string(), ig));
      tN.object({
        id: tN.string(),
        source: ih,
        options: im,
        dynamicTriggerId: tN.string().optional(),
      }),
        tN.object({ id: tN.string(), key: tN.string() }),
        tN.object({
          key: tN.string(),
          secret: tN.string(),
          data: tN.any(),
          params: tN.any(),
          auth: n$.optional(),
          metadata: tD.optional(),
        }),
        tN.object({
          "x-ts-key": tN.string(),
          "x-ts-dynamic-id": tN.string().optional(),
          "x-ts-secret": tN.string(),
          "x-ts-data": tN.string().transform((e) => JSON.parse(e)),
          "x-ts-params": tN.string().transform((e) => JSON.parse(e)),
          "x-ts-http-url": tN.string(),
          "x-ts-http-method": tN.string(),
          "x-ts-http-headers": tN
            .string()
            .transform((e) => tN.record(tN.string()).parse(JSON.parse(e))),
          "x-ts-auth": tN
            .string()
            .optional()
            .transform((e) => {
              if (void 0 === e) return;
              let t = JSON.parse(e);
              return n$.parse(t);
            }),
          "x-ts-metadata": tN
            .string()
            .optional()
            .transform((e) => {
              if (void 0 === e) return;
              let t = JSON.parse(e);
              return tD.parse(t);
            }),
        }),
        tN.object({
          "x-ts-key": tN.string(),
          "x-ts-http-url": tN.string(),
          "x-ts-http-method": tN.string(),
          "x-ts-http-headers": tN
            .string()
            .transform((e) => tN.record(tN.string()).parse(JSON.parse(e))),
        }),
        tN.object({
          "x-ts-key": tN.string(),
          "x-ts-dynamic-id": tN.string().optional(),
          "x-ts-secret": tN.string(),
          "x-ts-params": tN.string().transform((e) => JSON.parse(e)),
          "x-ts-http-url": tN.string(),
          "x-ts-http-method": tN.string(),
          "x-ts-http-headers": tN
            .string()
            .transform((e) => tN.record(tN.string()).parse(JSON.parse(e))),
        });
      let iy = tN.object({
          ok: tN.literal(!0),
          triggerVersion: tN.string().optional(),
          triggerSdkVersion: tN.string().optional(),
        }),
        ib = tN.object({
          ok: tN.literal(!1),
          error: tN.string(),
          triggerVersion: tN.string().optional(),
          triggerSdkVersion: tN.string().optional(),
        });
      tN.discriminatedUnion("ok", [iy, ib]);
      let iv = tN.object({
          ok: tN.literal(!0),
          endpointId: tN.string(),
          triggerVersion: tN.string().optional(),
        }),
        i_ = tN.object({
          ok: tN.literal(!1),
          error: tN.string(),
          triggerVersion: tN.string().optional(),
        });
      tN.discriminatedUnion("ok", [iv, i_]),
        tN.object({ name: tN.string(), maxConcurrent: tN.number().optional() });
      let ik = tN.object({ id: tN.string(), limit: tN.number() }),
        iT = tN.object({
          id: tN.string(),
          name: tN.string(),
          version: tN.string(),
          event: nQ,
          trigger: n3,
          integrations: tN.record(nL),
          internal: tN.boolean().default(!1),
          enabled: tN.boolean(),
          startPosition: tN.enum(["initial", "latest"]),
          preprocessRuns: tN.boolean(),
          concurrencyLimit: ik.or(tN.number().int().positive()).optional(),
        }),
        iE = tN.object({
          version: tN.literal("1"),
          channel: tN.enum(["HTTP", "SQS", "SMTP"]),
          integration: nL,
          key: tN.string(),
          params: tN.any(),
          events: tN.array(tN.string()),
          registerSourceJob: tN
            .object({ id: tN.string(), version: tN.string() })
            .optional(),
        }),
        ij = tN.object({
          version: tN.literal("2"),
          channel: tN.enum(["HTTP", "SQS", "SMTP"]),
          integration: nL,
          key: tN.string(),
          params: tN.any(),
          options: tN.record(tN.array(tN.string())),
          registerSourceJob: tN
            .object({ id: tN.string(), version: tN.string() })
            .optional(),
        }),
        iw = tN.preprocess(
          function (e) {
            return null === e || "object" != typeof e || "version" in e
              ? e
              : { ...e, version: "1" };
          },
          tN.discriminatedUnion("version", [iE, ij]),
        ),
        iI = tN.object({
          key: tN.string(),
          params: tN.any(),
          config: tN.record(tN.array(tN.string())),
          integration: nL,
          httpEndpoint: tN.object({ id: tN.string() }),
        });
      tN.object({
        params: tN.any(),
        config: tN.record(tN.string().array()),
        secret: tN.string(),
      });
      let ix = tN.object({
          id: tN.string(),
          jobs: tN.array(iT.pick({ id: !0, version: !0 })),
          registerSourceJob: tN
            .object({ id: tN.string(), version: tN.string() })
            .optional(),
        }),
        iS = tN.object({
          id: tN.string(),
          version: tN.string(),
          enabled: tN.boolean(),
          title: tN.string().optional(),
          icon: tN.string().optional(),
          properties: tN.array(nZ).optional(),
          event: nQ,
          immediateResponseFilter: il.optional(),
          skipTriggeringRuns: tN.boolean().optional(),
          source: tN.string(),
        });
      tN.object({
        jobs: tN.array(iT),
        sources: tN.array(iw),
        webhooks: tN.array(iI).optional(),
        dynamicTriggers: tN.array(ix),
        dynamicSchedules: tN.array(nH),
        httpEndpoints: tN.array(iS).optional(),
      });
      let iR = tN.object({ message: tN.string(), raw: tN.any().optional() }),
        iA = tN.object({
          jobs: tN.number(),
          sources: tN.number(),
          webhooks: tN.number().optional(),
          dynamicTriggers: tN.number(),
          dynamicSchedules: tN.number(),
          disabledJobs: tN.number().default(0),
          httpEndpoints: tN.number().default(0),
        });
      tN.discriminatedUnion("status", [
        tN.object({
          status: tN.literal("PENDING"),
          updatedAt: tN.coerce.date(),
        }),
        tN.object({
          status: tN.literal("STARTED"),
          updatedAt: tN.coerce.date(),
        }),
        tN.object({
          status: tN.literal("SUCCESS"),
          stats: iA,
          updatedAt: tN.coerce.date(),
        }),
        tN.object({
          status: tN.literal("FAILURE"),
          error: iR,
          updatedAt: tN.coerce.date(),
        }),
      ]);
      let iO = tN.object({
          "trigger-version": tN.string().optional(),
          "trigger-sdk-version": tN.string().optional(),
        }),
        iC = tN.object({
          successSubscription: tN.boolean().optional(),
          failedSubscription: tN.boolean().optional(),
        });
      iO.extend({
        "x-trigger-run-metadata": tN
          .preprocess((e) => "string" == typeof e && JSON.parse(e), iC)
          .optional(),
      });
      let iP = tN.object({
          name: tN.string(),
          payload: tN.any(),
          context: tN.any().optional(),
          id: tN.string().default(() => globalThis.crypto.randomUUID()),
          timestamp: tN.coerce.date().optional(),
          source: tN.string().optional(),
          payloadType: tN
            .union([tN.literal("JSON"), tN.literal("REQUEST")])
            .optional(),
        }),
        iN = tN.object({
          id: tN.string(),
          name: tN.string(),
          payload: tD,
          context: tD.optional().nullable(),
          timestamp: tN.coerce.date(),
          deliverAt: tN.coerce.date().optional().nullable(),
          deliveredAt: tN.coerce.date().optional().nullable(),
          cancelledAt: tN.coerce.date().optional().nullable(),
        }),
        iM = tN.object({
          deliverAt: tN.coerce.date().optional(),
          deliverAfter: tN.number().int().optional(),
          accountId: tN.string().optional(),
        });
      tN.object({ event: iP, options: iM.optional() }),
        tN.object({ events: iP.array(), options: iM.optional() }),
        tN.object({ deliveredAt: tN.string().datetime() });
      let iU = tN.enum(["PRODUCTION", "STAGING", "DEVELOPMENT", "PREVIEW"]),
        i$ = tN.object({ id: tN.string(), metadata: tN.any() }),
        iD = tN.object({
          startTaskThreshold: tN.number(),
          beforeExecuteTaskThreshold: tN.number(),
          beforeCompleteTaskThreshold: tN.number(),
          afterCompleteTaskThreshold: tN.number(),
        });
      tN.object({
        event: iN,
        job: tN.object({ id: tN.string(), version: tN.string() }),
        run: tN.object({
          id: tN.string(),
          isTest: tN.boolean(),
          isRetry: tN.boolean().default(!1),
          startedAt: tN.coerce.date(),
        }),
        environment: tN.object({
          id: tN.string(),
          slug: tN.string(),
          type: iU,
        }),
        organization: tN.object({
          id: tN.string(),
          title: tN.string(),
          slug: tN.string(),
        }),
        project: tN
          .object({ id: tN.string(), name: tN.string(), slug: tN.string() })
          .optional(),
        account: tN.object({ id: tN.string(), metadata: tN.any() }).optional(),
        source: i$.optional(),
        tasks: tN.array(nJ).optional(),
        cachedTaskCursor: tN.string().optional(),
        noopTasksSet: tN.string().optional(),
        connections: tN.record(n$).optional(),
        yieldedExecutions: tN.string().array().optional(),
        runChunkExecutionLimit: tN.number().optional(),
        autoYieldConfig: iD.optional(),
      });
      let iL = tN.object({
          status: tN.literal("ERROR"),
          error: nO,
          task: nB.optional(),
        }),
        iZ = tN.object({
          status: tN.literal("YIELD_EXECUTION"),
          key: tN.string(),
        }),
        iK = tN.object({
          location: tN.string(),
          timeRemaining: tN.number(),
          timeElapsed: tN.number(),
          limit: tN.number().optional(),
        }),
        iG = iK.extend({ status: tN.literal("AUTO_YIELD_EXECUTION") }),
        iF = tN.object({
          status: tN.literal("AUTO_YIELD_EXECUTION_WITH_COMPLETED_TASK"),
          id: tN.string(),
          properties: tN.array(nZ).optional(),
          output: tN.string().optional(),
          data: iK,
        }),
        iW = tN.object({
          status: tN.literal("AUTO_YIELD_RATE_LIMIT"),
          reset: tN.coerce.number(),
        }),
        iq = tN.object({
          status: tN.literal("INVALID_PAYLOAD"),
          errors: tN.array(nC),
        }),
        iV = tN.object({
          status: tN.literal("UNRESOLVED_AUTH_ERROR"),
          issues: tN.record(tN.object({ id: tN.string(), error: tN.string() })),
        }),
        iH = tN.object({ status: tN.literal("RESUME_WITH_TASK"), task: nB }),
        iz = tN.object({
          status: tN.literal("RETRY_WITH_TASK"),
          task: nB,
          error: nO,
          retryAt: tN.coerce.date(),
        }),
        iB = tN.object({ status: tN.literal("CANCELED"), task: nB }),
        iY = tN.object({
          status: tN.literal("SUCCESS"),
          output: tD.optional(),
        }),
        iJ = tN.union([iG, iF, iZ, iW, iL, iV, iq, iH, iz, iB]),
        iX = tN.object({
          status: tN.literal("RESUME_WITH_PARALLEL_TASK"),
          task: nB,
          childErrors: tN.array(iJ),
        });
      tN.discriminatedUnion("status", [
        iG,
        iF,
        iZ,
        iW,
        iL,
        iV,
        iq,
        iH,
        iX,
        iz,
        iB,
        iY,
      ]),
        tN.object({
          event: iN,
          job: tN.object({ id: tN.string(), version: tN.string() }),
          run: tN.object({ id: tN.string(), isTest: tN.boolean() }),
          environment: tN.object({
            id: tN.string(),
            slug: tN.string(),
            type: iU,
          }),
          organization: tN.object({
            id: tN.string(),
            title: tN.string(),
            slug: tN.string(),
          }),
          account: tN
            .object({ id: tN.string(), metadata: tN.any() })
            .optional(),
        }),
        tN.object({ abort: tN.boolean(), properties: tN.array(nZ).optional() });
      let iQ = tN.object({
          ok: tN.literal(!0),
          data: tN.object({ id: tN.string() }),
        }),
        i1 = tN.object({ ok: tN.literal(!1), error: tN.string() });
      tN.discriminatedUnion("ok", [iQ, i1]),
        tN.object({
          __redactedString: tN.literal(!0),
          strings: tN.array(tN.string()),
          interpolations: tN.array(tN.string()),
        }),
        tN.object({
          level: tN.enum(["DEBUG", "INFO", "WARN", "ERROR"]),
          message: tN.string(),
          data: tZ.optional(),
        });
      let i0 = tN.object({ paths: tN.array(tN.string()) }),
        i2 = tN.object({
          limit: tN.number().optional(),
          factor: tN.number().optional(),
          minTimeoutInMs: tN.number().optional(),
          maxTimeoutInMs: tN.number().optional(),
          randomize: tN.boolean().optional(),
        }),
        i4 = tN
          .object({
            name: tN.string().optional(),
            delayUntil: tN.coerce.date().optional(),
            retry: i2.optional(),
            icon: tN.string().optional(),
            displayKey: tN.string().optional(),
            description: tN.string().optional(),
            properties: tN.array(nZ).optional(),
            params: tN.any(),
            style: nK.optional(),
            callback: tN
              .object({ enabled: tN.boolean(), timeoutInSeconds: tN.number() })
              .partial()
              .optional(),
            connectionKey: tN.string().optional(),
            operation: tN
              .enum(["fetch", "fetch-response", "fetch-poll"])
              .optional(),
            noop: tN.boolean().default(!1),
            redact: i0.optional(),
            parallel: tN.boolean().optional(),
          })
          .extend({
            idempotencyKey: tN.string(),
            parentId: tN.string().optional(),
          });
      i4.extend({
        properties: tN.array(nZ.partial()).optional(),
        params: tD.optional().nullable(),
        callback: tN
          .object({
            enabled: tN.boolean(),
            timeoutInSeconds: tN.number().default(3600),
          })
          .optional(),
      }),
        tN.object({
          task: nY,
          cachedTasks: tN
            .object({ tasks: tN.array(nJ), cursor: tN.string().optional() })
            .optional(),
        }),
        i4
          .pick({ properties: !0, description: !0, params: !0 })
          .extend({
            output: tZ
              .optional()
              .transform((e) =>
                e ? tD.parse(JSON.parse(JSON.stringify(e))) : {},
              ),
          }),
        i4
          .pick({ properties: !0, description: !0, params: !0 })
          .extend({ output: tN.string().optional() }),
        tN.object({ error: nO }),
        tN.object({
          headers: tN.record(tN.string()),
          method: tN.string(),
          query: tN.record(tN.string()),
          url: tN.string(),
          body: tN.any(),
        });
      let i9 = tN.object({
        status: tN.number(),
        body: tN.any(),
        headers: tN.record(tN.string()).optional(),
      });
      tN.object({
        response: i9,
        events: tN.array(iP),
        metadata: tD.optional(),
      }),
        tN.object({
          response: i9,
          verified: tN.boolean(),
          error: tN.string().optional(),
        }),
        tN.object({ rule: nU, source: iE }),
        tN.object({ rule: nU, source: ij, accountId: tN.string().optional() }),
        tN.object({
          id: tN.string(),
          params: tN.any(),
          accountId: tN.string().optional(),
          metadata: tN.any().optional(),
        });
      let i3 = tN.object({
          id: tN.string(),
          metadata: tN.any(),
          accountId: tN.string().optional(),
        }),
        i5 = i3.merge(nq),
        i6 = i3.merge(nW);
      tN.discriminatedUnion("type", [i5, i6]),
        tN.object({
          id: tN.string(),
          schedule: nV,
          metadata: tN.any(),
          active: tN.boolean(),
        }),
        tN.object({
          accessToken: tN.string(),
          type: tN.enum(["oauth2"]),
          scopes: tN.array(tN.string()).optional(),
          metadata: tN.any(),
        }),
        tN.object({
          run: tN.object({
            id: tN.string(),
            status: ir,
            output: tN.any().optional(),
          }),
          statuses: tN.array(it),
        }),
        tN.object({ id: tN.string() }),
        tN.object({
          payload: tN.any(),
          context: tN.any().optional(),
          options: tN
            .object({
              accountId: tN.string().optional(),
              callbackUrl: tN.string().optional(),
            })
            .optional(),
        }),
        tN.object({
          accountId: tN.string().optional(),
          idempotencyKey: tN.string().optional(),
          context: tN.any().optional(),
          callbackUrl: tN.string().optional(),
        }),
        tN.object({
          url: tN.string(),
          name: tN.string().or(tN.array(tN.string())),
          source: tN.string().optional(),
          filter: nM.optional(),
          contextFilter: nM.optional(),
          accountId: tN.string().optional(),
          timeoutInSeconds: tN
            .number()
            .int()
            .positive()
            .min(10)
            .max(31536e3)
            .default(3600),
        }),
        tN.object({ id: tN.string() }),
        tN.discriminatedUnion("action", [
          tN.object({
            action: tN.literal("DELETE"),
            key: tN.string(),
            deleted: tN.boolean(),
          }),
          tN.object({
            action: tN.literal("GET"),
            key: tN.string(),
            value: tN.string().optional(),
          }),
          tN.object({
            action: tN.literal("HAS"),
            key: tN.string(),
            has: tN.boolean(),
          }),
          tN.object({
            action: tN.literal("SET"),
            key: tN.string(),
            value: tN.string().optional(),
          }),
        ]);
      let i8 = tN.object({
          task: tN.object({
            id: tN.string(),
            filePath: tN.string(),
            exportName: tN.string(),
            version: tN.string(),
            sdkVersion: tN.string(),
            cliVersion: tN.string(),
          }),
          run: tN.object({
            id: tN.string(),
            number: tN.number(),
            status: rz,
            createdAt: tN.coerce.date(),
            startedAt: tN.coerce.date().optional(),
            completedAt: tN.coerce.date().optional(),
            isTest: tN.boolean(),
            idempotencyKey: tN.string().optional(),
            tags: tN.array(tN.string()),
            error: t3,
            isOutOfMemoryError: tN.boolean(),
            machine: tN.string(),
            dashboardUrl: tN.string(),
          }),
          environment: tN.object({
            id: tN.string(),
            type: iU,
            slug: tN.string(),
          }),
          organization: tN.object({
            id: tN.string(),
            slug: tN.string(),
            name: tN.string(),
          }),
          project: tN.object({
            id: tN.string(),
            ref: tN.string(),
            slug: tN.string(),
            name: tN.string(),
          }),
        }),
        i7 = tN.object({
          name: tN.string(),
          message: tN.string(),
          stack: tN.string().optional(),
          stderr: tN.string().optional(),
        }),
        ae = {
          environment: tN.object({
            id: tN.string(),
            type: iU,
            slug: tN.string(),
          }),
          organization: tN.object({
            id: tN.string(),
            slug: tN.string(),
            name: tN.string(),
          }),
          project: tN.object({
            id: tN.string(),
            ref: tN.string(),
            slug: tN.string(),
            name: tN.string(),
          }),
        },
        at = {
          id: tN.string(),
          status: tN.string(),
          version: tN.string(),
          shortCode: tN.string(),
        },
        ar = tN.object({
          ...ae,
          deployment: tN.object({ ...at, deployedAt: tN.coerce.date() }),
          tasks: tN.array(
            tN.object({
              id: tN.string(),
              filePath: tN.string(),
              exportName: tN.string(),
              triggerSource: tN.string(),
            }),
          ),
        }),
        an = tN.object({
          ...ae,
          deployment: tN.object({ ...at, failedAt: tN.coerce.date() }),
          error: i7,
        }),
        ai = {
          id: tN.string(),
          created: tN.coerce.date(),
          webhookVersion: tN.string(),
        },
        aa =
          (tN.discriminatedUnion("type", [
            tN.object({
              ...ai,
              type: tN.literal("alert.run.failed"),
              object: i8,
            }),
            tN.object({
              ...ai,
              type: tN.literal("alert.deployment.success"),
              object: ar,
            }),
            tN.object({
              ...ai,
              type: tN.literal("alert.deployment.failed"),
              object: an,
            }),
          ]),
          {
            ENVIRONMENT_ID: "ctx.environment.id",
            ENVIRONMENT_TYPE: "ctx.environment.type",
            ORGANIZATION_ID: "ctx.organization.id",
            ORGANIZATION_SLUG: "ctx.organization.slug",
            ORGANIZATION_NAME: "ctx.organization.name",
            PROJECT_ID: "ctx.project.id",
            PROJECT_REF: "ctx.project.ref",
            PROJECT_NAME: "ctx.project.title",
            ATTEMPT_ID: "ctx.attempt.id",
            ATTEMPT_NUMBER: "ctx.attempt.number",
            RUN_ID: "ctx.run.id",
            RUN_IS_TEST: "ctx.run.isTest",
            BATCH_ID: "ctx.batch.id",
            TASK_SLUG: "ctx.task.id",
            TASK_PATH: "ctx.task.filePath",
            TASK_EXPORT_NAME: "ctx.task.exportName",
            QUEUE_NAME: "ctx.queue.name",
            QUEUE_ID: "ctx.queue.id",
            MACHINE_PRESET_NAME: "ctx.machine.name",
            MACHINE_PRESET_CPU: "ctx.machine.cpu",
            MACHINE_PRESET_MEMORY: "ctx.machine.memory",
            MACHINE_PRESET_CENTS_PER_MS: "ctx.machine.centsPerMs",
            SPAN_PARTIAL: "$span.partial",
            SPAN_ID: "$span.span_id",
            STYLE_ICON: "$style.icon",
            STYLE_ACCESSORY: "$style.accessory",
            WORKER_ID: "worker.id",
            WORKER_VERSION: "worker.version",
            IDEMPOTENCY_KEY: "ctx.run.idempotencyKey",
            USAGE_DURATION_MS: "$usage.durationMs",
            USAGE_COST_IN_CENTS: "$usage.costInCents",
            METRIC_EVENTS: "$metrics.events",
          }),
        as = "object" == typeof globalThis ? globalThis : global,
        ao = Symbol.for("dev.trigger.ts.api");
      function al(e, t, r = !1) {
        let n = (as[ao] = as[ao] ?? {});
        return !r && n[e]
          ? (Error(
              `trigger.dev: Attempted duplicate registration of API: ${e}`,
            ),
            !1)
          : ((n[e] = t), !0);
      }
      function au(e) {
        return as[ao]?.[e];
      }
      function ac(e) {
        let t = as[ao];
        t && delete t[e];
      }
      let ad = "task-context";
      class ap {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new ap()), this._instance;
        }
        get isInsideTask() {
          return void 0 !== this.#e();
        }
        get ctx() {
          return this.#e()?.ctx;
        }
        get worker() {
          return this.#e()?.worker;
        }
        get attributes() {
          return this.ctx
            ? { ...this.contextAttributes, ...this.workerAttributes }
            : {};
        }
        get workerAttributes() {
          return this.worker
            ? {
                [aa.WORKER_ID]: this.worker.id,
                [aa.WORKER_VERSION]: this.worker.version,
              }
            : {};
        }
        get contextAttributes() {
          return this.ctx
            ? {
                [aa.ATTEMPT_ID]: this.ctx.attempt.id,
                [aa.ATTEMPT_NUMBER]: this.ctx.attempt.number,
                [aa.TASK_SLUG]: this.ctx.task.id,
                [aa.TASK_PATH]: this.ctx.task.filePath,
                [aa.TASK_EXPORT_NAME]: this.ctx.task.exportName,
                [aa.QUEUE_NAME]: this.ctx.queue.name,
                [aa.QUEUE_ID]: this.ctx.queue.id,
                [aa.ENVIRONMENT_ID]: this.ctx.environment.id,
                [aa.ENVIRONMENT_TYPE]: this.ctx.environment.type,
                [aa.ORGANIZATION_ID]: this.ctx.organization.id,
                [aa.PROJECT_ID]: this.ctx.project.id,
                [aa.PROJECT_REF]: this.ctx.project.ref,
                [aa.PROJECT_NAME]: this.ctx.project.name,
                [aa.RUN_ID]: this.ctx.run.id,
                [aa.RUN_IS_TEST]: this.ctx.run.isTest,
                [aa.ORGANIZATION_SLUG]: this.ctx.organization.slug,
                [aa.ORGANIZATION_NAME]: this.ctx.organization.name,
                [aa.BATCH_ID]: this.ctx.batch?.id,
                [aa.IDEMPOTENCY_KEY]: this.ctx.run.idempotencyKey,
                [aa.MACHINE_PRESET_NAME]: this.ctx.machine?.name,
                [aa.MACHINE_PRESET_CPU]: this.ctx.machine?.cpu,
                [aa.MACHINE_PRESET_MEMORY]: this.ctx.machine?.memory,
                [aa.MACHINE_PRESET_CENTS_PER_MS]: this.ctx.machine?.centsPerMs,
              }
            : {};
        }
        disable() {
          ac(ad);
        }
        setGlobalTaskContext(e) {
          return al(ad, e);
        }
        #e() {
          return au(ad);
        }
      }
      let ah = ap.getInstance(),
        ag = /[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*/u,
        am = "Validation error";
      class af extends Error {
        details;
        name;
        constructor(e, t = []) {
          super(e), (this.details = t), (this.name = "ZodValidationError");
        }
        toString() {
          return this.message;
        }
      }
      let ay = {
          maxAttempts: 3,
          factor: 2,
          minTimeoutInMs: 1e3,
          maxTimeoutInMs: 6e4,
          randomize: !0,
        },
        ab = {
          byStatus: { "429,408,409,5xx": { strategy: "backoff", ...ay } },
          connectionError: ay,
          timeout: ay,
        };
      function av(e, t) {
        let r = { ...ay, ...e };
        if (t >= r.maxAttempts) return;
        let {
          factor: n,
          minTimeoutInMs: i,
          maxTimeoutInMs: a,
          randomize: s,
        } = r;
        return Math.round(
          Math.min(a, (s ? Math.random() + 1 : 1) * i * Math.pow(n, t - 1)),
        );
      }
      class a_ extends Error {
        status;
        headers;
        error;
        code;
        param;
        type;
        constructor(e, t, r, n) {
          super(`${a_.makeMessage(e, t, r)}`),
            (this.name = "TriggerApiError"),
            (this.status = e),
            (this.headers = n),
            (this.error = t),
            (this.code = t?.code),
            (this.param = t?.param),
            (this.type = t?.type);
        }
        static makeMessage(e, t, r) {
          let n = t?.message
            ? "string" == typeof t.message
              ? t.message
              : JSON.stringify(t.message)
            : t
              ? JSON.stringify(t)
              : r;
          return e && n
            ? `${e} ${n}`
            : e
              ? `${e} status code (no body)`
              : n || "(no status code or body)";
        }
        static generate(e, t, r, n) {
          if (!e) {
            var i;
            return new ak({ cause: (i = t) instanceof Error ? i : Error(i) });
          }
          let a = t?.error;
          return 400 === e
            ? new aT(e, a, r, n)
            : 401 === e
              ? new aE(e, a, r, n)
              : 403 === e
                ? new aj(e, a, r, n)
                : 404 === e
                  ? new aw(e, a, r, n)
                  : 409 === e
                    ? new aI(e, a, r, n)
                    : 422 === e
                      ? new ax(e, a, r, n)
                      : 429 === e
                        ? new aS(e, a, r, n)
                        : e >= 500
                          ? new aR(e, a, r, n)
                          : new a_(e, a, r, n);
        }
      }
      class ak extends a_ {
        status = void 0;
        constructor({ message: e, cause: t }) {
          super(void 0, void 0, e || "Connection error.", void 0),
            t && (this.cause = t);
        }
      }
      class aT extends a_ {
        status = 400;
      }
      class aE extends a_ {
        status = 401;
      }
      class aj extends a_ {
        status = 403;
      }
      class aw extends a_ {
        status = 404;
      }
      class aI extends a_ {
        status = 409;
      }
      class ax extends a_ {
        status = 422;
      }
      class aS extends a_ {
        status = 429;
        get millisecondsUntilReset() {
          let e = (this.headers ?? {})["x-ratelimit-reset"];
          if ("string" == typeof e) {
            let t = parseInt(e, 10);
            if (isNaN(t)) return;
            return Math.max(
              t - Date.now() + Math.floor(2e3 * Math.random()),
              0,
            );
          }
        }
      }
      class aR extends a_ {}
      class aA extends a_ {
        status = 200;
        rawBody;
        constructor({
          message: e,
          cause: t,
          status: r,
          rawBody: n,
          headers: i,
        }) {
          super(r, void 0, e || "Validation error.", i),
            t && (this.cause = t),
            (this.rawBody = n);
        }
      }
      var aO = r(75422),
        aC = r(62540);
      let aP = "$@null((";
      function aN(e, t, r = new WeakSet()) {
        let n = {};
        if (void 0 === e) return n;
        if (null === e) return (n[t || ""] = aP), n;
        if (
          "string" == typeof e ||
          "number" == typeof e ||
          "boolean" == typeof e
        )
          return (n[t || ""] = e), n;
        if (e instanceof Date) return (n[t || ""] = e.toISOString()), n;
        if (null !== e && "object" == typeof e && r.has(e))
          return (n[t || ""] = "$@circular(("), n;
        for (let [a, s] of (null !== e && "object" == typeof e && r.add(e),
        Object.entries(e))) {
          let o = `${t ? `${t}.` : ""}${Array.isArray(e) ? `[${a}]` : a}`;
          if (Array.isArray(s))
            for (let e = 0; e < s.length; e++)
              "object" == typeof s[e] && null !== s[e]
                ? Object.assign(n, aN(s[e], `${o}.[${e}]`, r))
                : null === s[e]
                  ? (n[`${o}.[${e}]`] = aP)
                  : (n[`${o}.[${e}]`] = s[e]);
          else {
            var i;
            null === (i = s) || "object" != typeof i || Array.isArray(i)
              ? "number" == typeof s ||
                "string" == typeof s ||
                "boolean" == typeof s
                ? (n[o] = s)
                : null === s && (n[o] = aP)
              : Object.assign(n, aN(s, o, r));
          }
        }
        return n;
      }
      function aM(e) {
        return aN(e, aa.STYLE_ACCESSORY);
      }
      class aU {
        pageFetcher;
        data;
        pagination;
        constructor(e, t, r) {
          (this.pageFetcher = r), (this.data = e), (this.pagination = t);
        }
        getPaginatedItems() {
          return this.data ?? [];
        }
        hasNextPage() {
          return !!this.pagination.next;
        }
        hasPreviousPage() {
          return !!this.pagination.previous;
        }
        getNextPage() {
          if (!this.pagination.next) throw Error("No next page available");
          return this.pageFetcher({ after: this.pagination.next });
        }
        getPreviousPage() {
          if (!this.pagination.previous)
            throw Error("No previous page available");
          return this.pageFetcher({ before: this.pagination.previous });
        }
        async *iterPages() {
          let e = this;
          for (yield e; e.hasNextPage(); ) (e = await e.getNextPage()), yield e;
        }
        async *[Symbol.asyncIterator]() {
          for await (let e of this.iterPages())
            for (let t of e.getPaginatedItems()) yield t;
        }
      }
      class a$ {
        pageFetcher;
        data;
        pagination;
        constructor(e, t, r) {
          (this.pageFetcher = r), (this.data = e), (this.pagination = t);
        }
        getPaginatedItems() {
          return this.data ?? [];
        }
        hasNextPage() {
          return this.pagination.currentPage < this.pagination.totalPages;
        }
        hasPreviousPage() {
          return this.pagination.currentPage > 1;
        }
        getNextPage() {
          if (!this.hasNextPage()) throw Error("No next page available");
          return this.pageFetcher({ page: this.pagination.currentPage + 1 });
        }
        getPreviousPage() {
          if (!this.hasPreviousPage())
            throw Error("No previous page available");
          return this.pageFetcher({ page: this.pagination.currentPage - 1 });
        }
        async *iterPages() {
          let e = this;
          for (yield e; e.hasNextPage(); ) (e = await e.getNextPage()), yield e;
        }
        async *[Symbol.asyncIterator]() {
          for await (let e of this.iterPages())
            for (let t of e.getPaginatedItems()) yield t;
        }
      }
      let aD = {
          maxAttempts: 3,
          factor: 2,
          minTimeoutInMs: 1e3,
          maxTimeoutInMs: 6e4,
          randomize: !1,
        },
        aL = { retry: !0 };
      function aZ(e, t, r, n) {
        return new aB(aW(e, t, r, n));
      }
      function aK(e, t, r, n, i) {
        let a = new URLSearchParams(r.query);
        r.limit && a.set("page[size]", String(r.limit)),
          r.after && a.set("page[after]", r.after),
          r.before && a.set("page[before]", r.before);
        let s = tN.object({
            data: tN.array(e),
            pagination: tN.object({
              next: tN.string().optional(),
              previous: tN.string().optional(),
            }),
          }),
          o = new URL(t);
        return (
          (o.search = a.toString()), new aY(aW(s, o.href, n, i), e, t, r, n, i)
        );
      }
      function aG(e, t, r, n, i) {
        let a = new URLSearchParams(r.query);
        r.limit && a.set("perPage", String(r.limit)),
          r.page && a.set("page", String(r.page));
        let s = tN.object({
            data: tN.array(e),
            pagination: tN.object({
              currentPage: tN.coerce.number(),
              totalPages: tN.coerce.number(),
              count: tN.coerce.number(),
            }),
          }),
          o = new URL(t);
        return (
          (o.search = a.toString()), new aJ(aW(s, o.href, n, i), e, t, r, n, i)
        );
      }
      async function aF(e, t) {
        if (!e.options?.tracer) return t();
        let r = new URL(e.url),
          n = e.requestInit?.method ?? "GET",
          i = e.options.name ?? `${n} ${r.pathname}`;
        return await e.options.tracer.startActiveSpan(
          i,
          async (e) => await t(e),
          {
            attributes: {
              [aa.STYLE_ICON]: e.options?.icon ?? "api",
              ...e.options.attributes,
            },
          },
        );
      }
      async function aW(e, t, r, n) {
        let i = await r;
        return aF({ url: t, requestInit: i, options: n }, async (r) => {
          i = (function (e) {
            let t = new Headers(e?.headers);
            if ("true" !== t.get("x-trigger-worker")) return e;
            let r = Object.fromEntries(t.entries());
            return (
              aO.$.inject(aC._.active(), r), { ...e, headers: new Headers(r) }
            );
          })(i);
          let a = await aq(e, t, i, n);
          return (
            n?.onResponseBody && r && n.onResponseBody(a.data, r),
            n?.prepareData && (a.data = await n.prepareData(a.data)),
            a
          );
        });
      }
      async function aq(e, t, r, n, i = 1) {
        try {
          var a;
          let s = await fetch(
              t,
              (function (e) {
                try {
                  let t = { ...e, cache: "no-cache" };
                  return new Request("http://localhost", t), t;
                } catch (t) {
                  return e ?? {};
                }
              })(r),
            ),
            o =
              ((a = s.headers),
              new Proxy(Object.fromEntries(a.entries()), {
                get(e, t) {
                  let r = t.toString();
                  return e[r.toLowerCase()] || e[r];
                },
              }));
          if (!s.ok) {
            let a = (function (e, t, r) {
              function n() {
                let e = av({ ...aD, ...r }, t);
                return e ? { retry: !0, delay: e } : { retry: !1 };
              }
              let i = e.headers.get("x-should-retry");
              if ("true" === i) return n();
              if ("false" === i) return { retry: !1 };
              if (408 === e.status || 409 === e.status) return n();
              if (429 === e.status) {
                if (
                  t >= ("number" == typeof r?.maxAttempts ? r?.maxAttempts : 3)
                )
                  return { retry: !1 };
                let i = e.headers.get("x-ratelimit-reset");
                if (i) {
                  let e =
                    parseInt(i, 10) -
                    Date.now() +
                    Math.floor(1e3 * Math.random());
                  if (e > 0) return { retry: !0, delay: e };
                }
                return n();
              }
              return e.status >= 500 ? n() : { retry: !1 };
            })(s, i, n?.retry);
            if (a.retry)
              return (
                await aX(t, i + 1, a.delay, n, r, s),
                await aq(e, t, r, n, i + 1)
              );
            {
              let e = await s.text().catch((e) => aH(e).message),
                t = az(e),
                r = t ? void 0 : e;
              throw a_.generate(s.status, t, r, o);
            }
          }
          let l = await aV(s),
            u = e.safeParse(l);
          if (u.success) return { data: u.data, response: s };
          let c = (function (e, t = {}) {
            var r, n, i;
            let {
              maxIssuesInMessage: a = 99,
              issueSeparator: s = "; ",
              unionSeparator: o = ", or ",
              prefixSeparator: l = ": ",
              prefix: u = am,
            } = t;
            return new af(
              ((r = e.errors
                .slice(0, a)
                .map((e) =>
                  (function e(t, r, n) {
                    if ("invalid_union" === t.code)
                      return t.unionErrors
                        .reduce((t, i) => {
                          let a = i.issues.map((t) => e(t, r, n)).join(r);
                          return t.includes(a) || t.push(a), t;
                        }, [])
                        .join(n);
                    if (0 !== t.path.length) {
                      var i;
                      if (1 === t.path.length) {
                        let e = t.path[0];
                        if ("number" == typeof e)
                          return `${t.message} at index ${e}`;
                      }
                      return `${t.message} at "${
                        1 === (i = t.path).length
                          ? i[0].toString()
                          : i.reduce((e, t) => {
                              if ("number" == typeof t)
                                return e + "[" + t.toString() + "]";
                              if (t.includes('"'))
                                return e + '["' + t.replace(/"/g, '\\"') + '"]';
                              if (!ag.test(t)) return e + '["' + t + '"]';
                              let r = 0 === e.length ? "" : ".";
                              return e + r + t;
                            }, "")
                      }"`;
                    }
                    return t.message;
                  })(e, s, o),
                )
                .join(s)),
              (n = u),
              (i = l),
              null !== n
                ? r.length > 0
                  ? [n, r].join(i)
                  : n
                : r.length > 0
                  ? r
                  : am),
              e.errors,
            );
          })(u.error);
          throw new aA({
            status: s.status,
            cause: c,
            message: c.message,
            rawBody: l,
            headers: o,
          });
        } catch (a) {
          if (a instanceof a_) throw a;
          if ((a instanceof af, n?.retry)) {
            let a = av({ ...aD, ...n.retry }, i);
            if (a)
              return await aX(t, i + 1, a, n, r), await aq(e, t, r, n, i + 1);
          }
          throw new ak({ cause: aH(a) });
        }
      }
      async function aV(e) {
        try {
          return await e.clone().json();
        } catch (e) {
          return;
        }
      }
      function aH(e) {
        return e instanceof Error ? e : Error(e);
      }
      function az(e) {
        try {
          return JSON.parse(e);
        } catch (e) {
          return;
        }
      }
      class aB extends Promise {
        responsePromise;
        constructor(e) {
          super((e) => {
            e(null);
          }),
            (this.responsePromise = e);
        }
        asResponse() {
          return this.responsePromise.then((e) => e.response);
        }
        async withResponse() {
          let [e, t] = await Promise.all([this.parse(), this.asResponse()]);
          return { data: e, response: t };
        }
        parse() {
          return this.responsePromise.then((e) => e.data);
        }
        then(e, t) {
          return this.parse().then(e, t);
        }
        catch(e) {
          return this.parse().catch(e);
        }
        finally(e) {
          return this.parse().finally(e);
        }
      }
      class aY extends aB {
        schema;
        url;
        params;
        requestInit;
        options;
        constructor(e, t, r, n, i, a) {
          super(
            e.then((e) => ({
              data: new aU(e.data.data, e.data.pagination, this.#t.bind(this)),
              response: e.response,
            })),
          ),
            (this.schema = t),
            (this.url = r),
            (this.params = n),
            (this.requestInit = i),
            (this.options = a);
        }
        #t(e) {
          return aK(
            this.schema,
            this.url,
            { ...this.params, ...e },
            this.requestInit,
            this.options,
          );
        }
        async *[Symbol.asyncIterator]() {
          for await (let e of await this) yield e;
        }
      }
      class aJ extends aB {
        schema;
        url;
        params;
        requestInit;
        options;
        constructor(e, t, r, n, i, a) {
          super(
            e.then((e) => ({
              data: new a$(e.data.data, e.data.pagination, this.#t.bind(this)),
              response: e.response,
            })),
          ),
            (this.schema = t),
            (this.url = r),
            (this.params = n),
            (this.requestInit = i),
            (this.options = a);
        }
        #t(e) {
          return aG(
            this.schema,
            this.url,
            { ...this.params, ...e },
            this.requestInit,
            this.options,
          );
        }
        async *[Symbol.asyncIterator]() {
          for await (let e of await this) yield e;
        }
      }
      async function aX(e, t, r, n, i, a) {
        if (n?.tracer) {
          let e = i?.method ?? "GET";
          return n.tracer.startActiveSpan(
            a ? `wait after ${a.status}` : "wait after error",
            async (e) => {
              await new Promise((e) => setTimeout(e, r));
            },
            {
              attributes: {
                [aa.STYLE_ICON]: "wait",
                ...aM({
                  items: [
                    {
                      text: `retrying ${n?.name ?? e.toUpperCase()} in ${r}ms`,
                      variant: "normal",
                    },
                  ],
                  style: "codepath",
                }),
              },
            },
          );
        }
        await new Promise((e) => setTimeout(e, r));
      }
      class aQ extends Error {
        constructor(e, t) {
          super(e),
            (this.name = "ParseError"),
            (this.type = t.type),
            (this.field = t.field),
            (this.value = t.value),
            (this.line = t.line);
        }
      }
      function a1(e) {}
      class a0 extends TransformStream {
        constructor({ onError: e, onRetry: t, onComment: r } = {}) {
          let n;
          super({
            start(i) {
              n = (function (e) {
                if ("function" == typeof e)
                  throw TypeError(
                    "`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?",
                  );
                let {
                    onEvent: t = a1,
                    onError: r = a1,
                    onRetry: n = a1,
                    onComment: i,
                  } = e,
                  a = "",
                  s = !0,
                  o,
                  l = "",
                  u = "";
                function c(e) {
                  if ("" === e)
                    return void (l.length > 0 &&
                      t({
                        id: o,
                        event: u || void 0,
                        data: l.endsWith(`
`)
                          ? l.slice(0, -1)
                          : l,
                      }),
                    (o = void 0),
                    (l = ""),
                    (u = ""));
                  if (e.startsWith(":")) {
                    i && i(e.slice(e.startsWith(": ") ? 2 : 1));
                    return;
                  }
                  let r = e.indexOf(":");
                  if (-1 !== r) {
                    let t = e.slice(0, r),
                      n = " " === e[r + 1] ? 2 : 1;
                    d(t, e.slice(r + n), e);
                    return;
                  }
                  d(e, "", e);
                }
                function d(e, t, i) {
                  switch (e) {
                    case "event":
                      u = t;
                      break;
                    case "data":
                      l = `${l}${t}
`;
                      break;
                    case "id":
                      o = t.includes("\0") ? void 0 : t;
                      break;
                    case "retry":
                      /^\d+$/.test(t)
                        ? n(parseInt(t, 10))
                        : r(
                            new aQ(`Invalid \`retry\` value: "${t}"`, {
                              type: "invalid-retry",
                              value: t,
                              line: i,
                            }),
                          );
                      break;
                    default:
                      r(
                        new aQ(
                          `Unknown field "${e.length > 20 ? `${e.slice(0, 20)}\u2026` : e}"`,
                          {
                            type: "unknown-field",
                            field: e,
                            value: t,
                            line: i,
                          },
                        ),
                      );
                  }
                }
                return {
                  feed: function (e) {
                    let t = s ? e.replace(/^\xEF\xBB\xBF/, "") : e,
                      [r, n] = (function (e) {
                        let t = [],
                          r = "",
                          n = 0;
                        for (; n < e.length; ) {
                          let i = e.indexOf("\r", n),
                            a = e.indexOf(
                              `
`,
                              n,
                            ),
                            s = -1;
                          if (
                            (-1 !== i && -1 !== a
                              ? (s = Math.min(i, a))
                              : -1 !== i
                                ? (s = i)
                                : -1 !== a && (s = a),
                            -1 === s)
                          ) {
                            r = e.slice(n);
                            break;
                          }
                          {
                            let r = e.slice(n, s);
                            t.push(r),
                              "\r" === e[(n = s + 1) - 1] &&
                                e[n] ===
                                  `
` &&
                                n++;
                          }
                        }
                        return [t, r];
                      })(`${a}${t}`);
                    for (let e of r) c(e);
                    (a = n), (s = !1);
                  },
                  reset: function (e = {}) {
                    a && e.consume && c(a),
                      (s = !0),
                      (o = void 0),
                      (l = ""),
                      (u = ""),
                      (a = "");
                  },
                };
              })({
                onEvent: (e) => {
                  i.enqueue(e);
                },
                onError(t) {
                  "terminate" === e
                    ? i.error(t)
                    : "function" == typeof e && e(t);
                },
                onRetry: t,
                onComment: r,
              });
            },
            transform(e) {
              n.feed(e);
            },
          });
        }
      }
      let a2 = {
          docs: {
            config: {
              home: "https://trigger.dev/docs/config/config-file",
              additionalPackages:
                "https://trigger.dev/docs/config/config-file#additionalpackages",
              extensions:
                "https://trigger.dev/docs/config/config-file#extensions",
              prisma: "https://trigger.dev/docs/config/config-file#prisma",
            },
            machines: { home: "https://trigger.dev/docs/v3/machines" },
            upgrade: { beta: "https://trigger.dev/docs/upgrading-beta" },
            troubleshooting: {
              concurrentWaits:
                "https://trigger.dev/docs/troubleshooting#parallel-waits-are-not-supported",
            },
            concurrency: {
              recursiveDeadlock:
                "https://trigger.dev/docs/queue-concurrency#waiting-for-a-subtask-on-the-same-queue",
            },
          },
          site: {
            home: "https://trigger.dev",
            contact: "https://trigger.dev/contact",
          },
        },
        a4 = {
          TASK_PROCESS_OOM_KILLED: {
            message:
              "Your task ran out of memory. Try increasing the machine specs. If this doesn't fix it there might be a memory leak.",
            link: { name: "Machines", href: a2.docs.machines.home },
          },
          TASK_PROCESS_MAYBE_OOM_KILLED: {
            message:
              "We think your task ran out of memory, but we can't be certain. If this keeps happening, try increasing the machine specs.",
            link: { name: "Machines", href: a2.docs.machines.home },
          },
          TASK_PROCESS_SIGSEGV: {
            message:
              "Your task crashed with a segmentation fault (SIGSEGV). Most likely there's a bug in a package or binary you're using. If this keeps happening and you're unsure why, please get in touch.",
            link: {
              name: "Contact us",
              href: a2.site.contact,
              magic: "CONTACT_FORM",
            },
          },
          TASK_PROCESS_SIGTERM: {
            message:
              "Your task exited after receiving SIGTERM but we don't know why. If this keeps happening, please get in touch so we can investigate.",
            link: {
              name: "Contact us",
              href: a2.site.contact,
              magic: "CONTACT_FORM",
            },
          },
          OUTDATED_SDK_VERSION: {
            message:
              "Your task is using an outdated version of the SDK. Please upgrade to the latest version.",
            link: { name: "Beta upgrade guide", href: a2.docs.upgrade.beta },
          },
          TASK_DID_CONCURRENT_WAIT: {
            message:
              "Parallel waits are not supported, e.g. using Promise.all() around our wait functions.",
            link: {
              name: "Read the docs for solutions",
              href: a2.docs.troubleshooting.concurrentWaits,
            },
          },
          RECURSIVE_WAIT_DEADLOCK: {
            message:
              "This run will never execute because it was triggered recursively and the task has no remaining concurrency available.",
            link: {
              name: "See docs for help",
              href: a2.docs.concurrency.recursiveDeadlock,
            },
          },
        },
        a9 = (e) => ({ type: "INTERNAL_ERROR", code: e, ...a4[e] }),
        a3 = (e, t = 100) => {
          if (!e) return;
          let r = t ? e.slice(0, t) : e;
          return r.includes("SIGTERM")
            ? "SIGTERM"
            : r.includes("SIGSEGV")
              ? "SIGSEGV"
              : r.includes("SIGKILL")
                ? "SIGKILL"
                : void 0;
        };
      function a5(e, t) {
        return "undefined" != typeof process &&
          "object" == typeof process.env &&
          null !== process.env
          ? (process.env[e] ?? t)
          : t;
      }
      let a6 = "api-client";
      class a8 extends Error {
        constructor(e) {
          super(e), (this.name = "ApiClientMissingError");
        }
      }
      class a7 {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new a7()), this._instance;
        }
        disable() {
          ac(a6);
        }
        get baseURL() {
          let e = this.#r();
          return (
            e?.baseURL ?? a5("TRIGGER_API_URL") ?? "https://api.trigger.dev"
          );
        }
        get accessToken() {
          let e = this.#r();
          return (
            e?.secretKey ??
            e?.accessToken ??
            a5("TRIGGER_SECRET_KEY") ??
            a5("TRIGGER_ACCESS_TOKEN")
          );
        }
        get client() {
          if (this.baseURL && this.accessToken)
            return new oe(this.baseURL, this.accessToken);
        }
        clientOrThrow() {
          if (!this.baseURL || !this.accessToken)
            throw new a8(this.apiClientMissingError());
          return new oe(this.baseURL, this.accessToken);
        }
        runWithConfig(e, t) {
          let r = this.#r();
          return (
            al(a6, { ...r, ...e }, !0),
            t().finally(() => {
              al(a6, r, !0);
            })
          );
        }
        setGlobalAPIClientConfiguration(e) {
          return al(a6, e);
        }
        #r() {
          return au(a6);
        }
        apiClientMissingError() {
          let e = !!this.baseURL,
            t = !!this.accessToken;
          return e || t
            ? e
              ? t
                ? "Unknown error"
                : "You need to set the TRIGGER_SECRET_KEY environment variable. See https://trigger.dev/docs/management/overview#authentication"
              : "You need to set the TRIGGER_API_URL environment variable. See https://trigger.dev/docs/management/overview#authentication"
            : "You need to set the TRIGGER_API_URL and TRIGGER_SECRET_KEY environment variables. See https://trigger.dev/docs/management/overview#authentication";
        }
      }
      let se = a7.getInstance();
      async function st(e, t) {
        if (e.data)
          switch (e.dataType) {
            case "application/json":
              return JSON.parse(
                e.data,
                (function (e) {
                  if (e)
                    return function (t, r) {
                      if (!e?.filteredKeys?.includes(t)) return r;
                    };
                })(t),
              );
            case "application/super+json":
              let { parse: r } = await sl();
              return r(e.data);
            case "text/plain":
            default:
              return e.data;
            case "application/store":
              throw Error(
                `Cannot parse an application/store packet (${e.data}). Needs to be imported first.`,
              );
          }
      }
      async function sr(e, t) {
        let r = await sa(e, void 0, t);
        return await st(r);
      }
      async function sn(e) {
        if (void 0 === e) return { dataType: "application/json" };
        if ("string" == typeof e) return { data: e, dataType: "text/plain" };
        try {
          let { stringify: t } = await sl();
          return { data: t(e), dataType: "application/super+json" };
        } catch {
          return { data: e, dataType: "application/json" };
        }
      }
      let si = {
        minTimeoutInMs: 500,
        maxTimeoutInMs: 5e3,
        maxAttempts: 5,
        factor: 2,
        randomize: !0,
      };
      async function sa(e, t, r) {
        return "application/store" !== e.dataType
          ? e
          : t
            ? ((await t.startActiveSpan(
                "store.downloadPayload",
                async (t) => await so(e, t, r),
                { attributes: { [aa.STYLE_ICON]: "cloud-download" } },
              )) ?? e)
            : await so(e, void 0, r);
      }
      async function ss(e, t) {
        try {
          let t = await fetch(e);
          if (!t.ok) return;
          let r = await t.text(),
            n = t.headers.get("content-type") ?? "application/json";
          return await st({ data: r, dataType: n });
        } catch (e) {
          return;
        }
      }
      async function so(e, t, r) {
        if (!e.data) return e;
        let n = r ?? se.client;
        if (!n) return e;
        let i = await n.getPayloadUrl(e.data),
          a = await aZ(tN.any(), i.presignedUrl, void 0, {
            retry: si,
          }).asResponse();
        if (!a.ok)
          throw Error(
            `Failed to import packet ${i.presignedUrl}: ${a.statusText}`,
          );
        let s = await a.text();
        return (
          t?.setAttribute("size", Buffer.byteLength(s, "utf8")),
          {
            data: s,
            dataType: a.headers.get("content-type") ?? "application/json",
          }
        );
      }
      async function sl() {
        let e = await r.e(2140).then(r.bind(r, 32140));
        return (
          e.registerCustom(
            {
              isApplicable: (e) =>
                "function" == typeof Buffer && Buffer.isBuffer(e),
              serialize: (e) => [...e],
              deserialize: (e) => Buffer.from(e),
            },
            "buffer",
          ),
          e
        );
      }
      var su = Object.defineProperty,
        sc = Object.defineProperties,
        sd = Object.getOwnPropertyDescriptors,
        sp = Object.getOwnPropertySymbols,
        sh = Object.prototype.hasOwnProperty,
        sg = Object.prototype.propertyIsEnumerable,
        sm = (e) => {
          throw TypeError(e);
        },
        sf = (e, t, r) =>
          t in e
            ? su(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: r,
              })
            : (e[t] = r),
        sy = (e, t) => {
          for (var r in t || (t = {})) sh.call(t, r) && sf(e, r, t[r]);
          if (sp) for (var r of sp(t)) sg.call(t, r) && sf(e, r, t[r]);
          return e;
        },
        sb = (e, t) => sc(e, sd(t)),
        sv = (e, t) => {
          var r = {};
          for (var n in e) sh.call(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
          if (null != e && sp)
            for (var n of sp(e))
              0 > t.indexOf(n) && sg.call(e, n) && (r[n] = e[n]);
          return r;
        },
        s_ = (e, t, r) => t.has(e) || sm("Cannot " + r),
        sk = (e, t, r) => (
          s_(e, t, "read from private field"), r ? r.call(e) : t.get(e)
        ),
        sT = (e, t, r) =>
          t.has(e)
            ? sm("Cannot add the same private member more than once")
            : t instanceof WeakSet
              ? t.add(e)
              : t.set(e, r),
        sE = (e, t, r, n) => (
          s_(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r
        ),
        sj = (e, t, r) => (s_(e, t, "access private method"), r),
        sw = (e, t, r) =>
          new Promise((n, i) => {
            var a = (e) => {
                try {
                  o(r.next(e));
                } catch (e) {
                  i(e);
                }
              },
              s = (e) => {
                try {
                  o(r.throw(e));
                } catch (e) {
                  i(e);
                }
              },
              o = (e) =>
                e.done ? n(e.value) : Promise.resolve(e.value).then(a, s);
            o((r = r.apply(e, t)).next());
          }),
        sI = class e extends Error {
          constructor(e, t, r, n, i, a) {
            super(
              a ||
                `HTTP Error ${e} at ${i}: ${null != t ? t : JSON.stringify(r)}`,
            ),
              (this.url = i),
              (this.name = "FetchError"),
              (this.status = e),
              (this.text = t),
              (this.json = r),
              (this.headers = n);
          }
          static fromResponse(t, r) {
            return sw(this, null, function* () {
              let n,
                i,
                a = t.status,
                s = Object.fromEntries([...t.headers.entries()]),
                o = t.headers.get("content-type");
              return (
                o && o.includes("application/json")
                  ? (i = yield t.json())
                  : (n = yield t.text()),
                new e(a, n, i, s, r)
              );
            });
          }
        },
        sx = class extends Error {
          constructor() {
            super("Fetch with backoff aborted"),
              (this.name = "FetchBackoffAbortError");
          }
        },
        sS = class extends Error {
          constructor() {
            super("Invalid shape options: missing required url parameter"),
              (this.name = "MissingShapeUrlError");
          }
        },
        sR = class extends Error {
          constructor() {
            super(
              "Invalid signal option. It must be an instance of AbortSignal.",
            ),
              (this.name = "InvalidSignalError");
          }
        },
        sA = class extends Error {
          constructor() {
            super(
              "shapeHandle is required if this isn't an initial fetch (i.e. offset > -1)",
            ),
              (this.name = "MissingShapeHandleError");
          }
        },
        sO = class extends Error {
          constructor(e) {
            super(
              `Cannot use reserved Electric parameter names in custom params: ${e.join(", ")}`,
            ),
              (this.name = "ReservedParamError");
          }
        },
        sC = class extends Error {
          constructor(e) {
            super(
              `Column "${null != e ? e : "unknown"}" does not allow NULL values`,
            ),
              (this.name = "ParserNullValueError");
          }
        },
        sP = class extends Error {
          constructor(e, t) {
            let r = `The response for the shape request to ${e} didn't include the following required headers:
`;
            t.forEach((e) => {
              r += `- ${e}
`;
            }),
              super(
                (r += `
This is often due to a proxy not setting CORS correctly so that all Electric headers can be read by the client.
For more information visit the troubleshooting guide: /docs/guides/troubleshooting/missing-headers`),
              );
          }
        },
        sN = (e) => Number(e),
        sM = (e) => JSON.parse(e),
        sU = (e) => e,
        s$ = {
          int2: sN,
          int4: sN,
          int8: (e) => BigInt(e),
          bool: (e) => "true" === e || "t" === e,
          float4: sN,
          float8: sN,
          json: sM,
          jsonb: sM,
        },
        sD = class {
          constructor(e) {
            this.parser = sy(sy({}, s$), e);
          }
          parse(e, t) {
            return JSON.parse(
              e,
              (e, r) => (
                "value" === e &&
                  "object" == typeof r &&
                  null !== r &&
                  Object.keys(r).forEach((e) => {
                    r[e] = this.parseRow(e, r[e], t);
                  }),
                r
              ),
            );
          }
          parseRow(e, t, r) {
            var n;
            let i = r[e];
            if (!i) return t;
            let { type: a, dims: s } = i,
              o = sv(i, ["type", "dims"]),
              l = sL(null != (n = this.parser[a]) ? n : sU, i, e);
            return s && s > 0
              ? sL(
                  (e, t) => {
                    let r, n, i, a, s, o;
                    return (
                      (r = 0),
                      (n = null),
                      (i = ""),
                      (a = !1),
                      (s = 0),
                      (function e(t) {
                        let u = [];
                        for (; r < t.length; r++) {
                          if (((n = t[r]), a))
                            "\\" === n
                              ? (i += t[++r])
                              : '"' === n
                                ? (u.push(l ? l(i) : i),
                                  (i = ""),
                                  (a = '"' === t[r + 1]),
                                  (s = r + 2))
                                : (i += n);
                          else if ('"' === n) a = !0;
                          else if ("{" === n) (s = ++r), u.push(e(t));
                          else if ("}" === n) {
                            (a = !1),
                              s < r &&
                                u.push(l ? l(t.slice(s, r)) : t.slice(s, r)),
                              (s = r + 1);
                            break;
                          } else
                            "," === n &&
                              "}" !== o &&
                              '"' !== o &&
                              (u.push(l ? l(t.slice(s, r)) : t.slice(s, r)),
                              (s = r + 1));
                          o = n;
                        }
                        return (
                          s < r &&
                            u.push(
                              l ? l(t.slice(s, r + 1)) : t.slice(s, r + 1),
                            ),
                          u
                        );
                      })(e)[0]
                    );
                  },
                  i,
                  e,
                )(t)
              : l(t, o);
          }
        };
      function sL(e, t, r) {
        var n;
        let i = !(null != (n = t.not_null) && n);
        return (n) => {
          var a;
          if (null === (a = n) || "NULL" === a) {
            if (!i) throw new sC(null != r ? r : "unknown");
            return null;
          }
          return e(n, t);
        };
      }
      function sZ(e) {
        return "key" in e;
      }
      var sK = "electric-handle",
        sG = "electric-offset",
        sF = "cursor",
        sW = "handle",
        sq = "live",
        sV = "offset",
        sH = [429],
        sz = { initialDelay: 100, maxDelay: 1e4, multiplier: 1.3 },
        sB = { maxChunksToPrefetch: 2 },
        sY = ["electric-offset", "electric-handle"],
        sJ = ["electric-cursor"],
        sX = ["electric-schema"],
        sQ = class {
          constructor(e) {
            var t;
            sT(this, tu),
              sT(this, ti),
              sT(this, ta),
              sT(this, ts, new Map()),
              sT(this, to),
              sT(this, tl),
              sE(
                this,
                ti,
                null != (t = e.fetchClient) ? t : (...e) => fetch(...e),
              ),
              sE(this, ta, e.maxPrefetchedRequests),
              sE(this, to, e.url.toString()),
              sE(this, tl, sk(this, to)),
              sj(this, tu, tc).call(this, e.url, e.requestInit);
          }
          abort() {
            sk(this, ts).forEach(([e, t]) => t.abort());
          }
          consume(...e) {
            var t;
            let r = e[0].toString(),
              n = null == (t = sk(this, ts).get(r)) ? void 0 : t[0];
            if (n && r === sk(this, to))
              return (
                sk(this, ts).delete(r),
                n
                  .then((t) => {
                    let n = s1(r, t);
                    sE(this, to, n),
                      sk(this, tl) &&
                        !sk(this, ts).has(sk(this, tl)) &&
                        sj(this, tu, tc).call(this, sk(this, tl), e[1]);
                  })
                  .catch(() => {}),
                n
              );
          }
        };
      function s1(e, t) {
        let r = t.headers.get(sK),
          n = t.headers.get(sG),
          i = t.headers.has("electric-up-to-date");
        if (!r || !n || i) return;
        let a = new URL(e);
        if (!a.searchParams.has(sq))
          return (
            a.searchParams.set(sW, r),
            a.searchParams.set(sV, n),
            a.searchParams.sort(),
            a.toString()
          );
      }
      (ti = new WeakMap()),
        (ta = new WeakMap()),
        (ts = new WeakMap()),
        (to = new WeakMap()),
        (tl = new WeakMap()),
        (tu = new WeakSet()),
        (tc = function (...e) {
          var t, r, n, i;
          let a = e[0].toString();
          if (sk(this, ts).size >= sk(this, ta)) return;
          let s = new AbortController();
          try {
            let o = sk(this, ti).call(
              this,
              a,
              sb(sy({}, null != (t = e[1]) ? t : {}), {
                signal:
                  ((n = s),
                  (i = null == (r = e[1]) ? void 0 : r.signal) &&
                    (i.aborted
                      ? n.abort()
                      : i.addEventListener("abort", () => n.abort(), {
                          once: !0,
                        })),
                  n.signal),
              }),
            );
            sk(this, ts).set(a, [o, s]),
              o
                .then((t) => {
                  if (!t.ok || s.signal.aborted) return;
                  let r = s1(a, t);
                  return r && r !== a
                    ? (sE(this, tl, r), sj(this, tu, tc).call(this, r, e[1]))
                    : void sE(this, tl, void 0);
                })
                .catch(() => {});
          } catch (e) {}
        });
      var s0 = new Set([sF, sW, sq, sV]),
        s2 = class {
          constructor(e) {
            var t, r, n;
            sT(this, tE),
              sT(this, td, null),
              sT(this, tp),
              sT(this, th),
              sT(this, tg, new Map()),
              sT(this, tm),
              sT(this, tf),
              sT(this, ty),
              sT(this, tb, !1),
              sT(this, tv, !1),
              sT(this, t_),
              sT(this, tk),
              sT(this, tT),
              (this.options = sy({ subscribe: !0 }, e)),
              (function (e) {
                if (!e.url) throw new sS();
                if (e.signal && !(e.signal instanceof AbortSignal))
                  throw new sR();
                if (void 0 !== e.offset && "-1" !== e.offset && !e.handle)
                  throw new sA();
                if (e.params) {
                  let t = Object.keys(e.params).filter((e) => s0.has(e));
                  if (t.length > 0) throw new sO(t);
                }
              })(this.options),
              sE(this, tm, null != (t = this.options.offset) ? t : "-1"),
              sE(this, tf, ""),
              sE(this, t_, this.options.handle),
              sE(this, th, new sD(e.parser)),
              sE(this, tT, this.options.onError);
            let i = (function (e, t = sz) {
              let {
                initialDelay: r,
                maxDelay: n,
                multiplier: i,
                debug: a = !1,
                onFailedAttempt: s,
              } = t;
              return (...t) =>
                sw(this, null, function* () {
                  var o;
                  let l = t[0],
                    u = t[1],
                    c = r,
                    d = 0;
                  for (;;)
                    try {
                      let r = yield e(...t);
                      if (r.ok) return r;
                      throw yield sI.fromResponse(r, l.toString());
                    } catch (e) {
                      if (
                        (null == s || s(),
                        null == (o = null == u ? void 0 : u.signal)
                          ? void 0
                          : o.aborted)
                      )
                        throw new sx();
                      if (
                        e instanceof sI &&
                        !sH.includes(e.status) &&
                        e.status >= 400 &&
                        e.status < 500
                      )
                        throw e;
                      yield new Promise((e) => setTimeout(e, c)),
                        (c = Math.min(c * i, n)),
                        a &&
                          (d++,
                          console.log(`Retry attempt #${d} after ${c}ms`));
                    }
                });
            })(
              null != (r = e.fetchClient) ? r : (...e) => fetch(...e),
              sb(sy({}, null != (n = e.backoffOptions) ? n : sz), {
                onFailedAttempt: () => {
                  var t, r;
                  sE(this, tv, !1),
                    null ==
                      (r =
                        null == (t = e.backoffOptions)
                          ? void 0
                          : t.onFailedAttempt) || r.call(t);
                },
              }),
            );
            sE(
              this,
              tp,
              (function (e) {
                return (...t) =>
                  sw(this, null, function* () {
                    let r = yield e(...t);
                    if (r.ok) {
                      let e = r.headers,
                        n = [],
                        i = (t) => n.push(...t.filter((t) => !e.has(t)));
                      i(sY);
                      let a = t[0].toString(),
                        s = new URL(a);
                      if (
                        ("true" === s.searchParams.get(sq) && i(sJ),
                        (s.searchParams.has(sq) &&
                          "false" !== s.searchParams.get(sq)) ||
                          i(sX),
                        n.length > 0)
                      )
                        throw new sP(a, n);
                    }
                    return r;
                  });
              })(
                (function (e, t = sB) {
                  let r,
                    { maxChunksToPrefetch: n } = t;
                  return (...t) =>
                    sw(this, null, function* () {
                      let i = t[0].toString(),
                        a = null == r ? void 0 : r.consume(...t);
                      if (a) return a;
                      null == r || r.abort();
                      let s = yield e(...t),
                        o = s1(i, s);
                      return (
                        o &&
                          (r = new sQ({
                            fetchClient: e,
                            maxPrefetchedRequests: n,
                            url: o,
                            requestInit: t[1],
                          })),
                        s
                      );
                    });
                })(i),
              ),
            ),
              sj(this, tE, tj).call(this);
          }
          get shapeHandle() {
            return sk(this, t_);
          }
          get error() {
            return sk(this, td);
          }
          get isUpToDate() {
            return sk(this, tb);
          }
          get lastOffset() {
            return sk(this, tm);
          }
          subscribe(e, t = () => {}) {
            let r = Math.random();
            return (
              sk(this, tg).set(r, [e, t]),
              () => {
                sk(this, tg).delete(r);
              }
            );
          }
          unsubscribeAll() {
            sk(this, tg).clear();
          }
          lastSyncedAt() {
            return sk(this, ty);
          }
          lastSynced() {
            return void 0 === sk(this, ty) ? 1 / 0 : Date.now() - sk(this, ty);
          }
          isConnected() {
            return sk(this, tv);
          }
          isLoading() {
            return !sk(this, tb);
          }
        };
      function s4(e, t, r) {
        return new ReadableStream({
          async start(n) {
            let i = e.pipeThrough(new TransformStream(t)).getReader();
            for (
              r.addEventListener("abort", () => {
                queueMicrotask(() => {
                  i.cancel(), n.close();
                });
              });
              ;

            ) {
              let { done: e, value: t } = await i.read();
              if (e) {
                n.close();
                break;
              }
              n.enqueue(t);
            }
          },
        });
      }
      (td = new WeakMap()),
        (tp = new WeakMap()),
        (th = new WeakMap()),
        (tg = new WeakMap()),
        (tm = new WeakMap()),
        (tf = new WeakMap()),
        (ty = new WeakMap()),
        (tb = new WeakMap()),
        (tv = new WeakMap()),
        (t_ = new WeakMap()),
        (tk = new WeakMap()),
        (tT = new WeakMap()),
        (tE = new WeakSet()),
        (tj = function () {
          return sw(this, null, function* () {
            var e, t, r;
            try {
              for (
                ;
                (!(null == (e = this.options.signal) ? void 0 : e.aborted) &&
                  !sk(this, tb)) ||
                this.options.subscribe;

              ) {
                let e,
                  { url: n, signal: i } = this.options,
                  a = new URL(n);
                if (this.options.params) {
                  let e = Object.keys(this.options.params).filter((e) =>
                    s0.has(e),
                  );
                  if (e.length > 0)
                    throw Error(
                      `Cannot use reserved Electric parameter names in custom params: ${e.join(", ")}`,
                    );
                  let t = (function (e) {
                    let t = {};
                    for (let [r, n] of Object.entries(e))
                      t[r] = Array.isArray(n) ? n.join(",") : n;
                    return t;
                  })(this.options.params);
                  t.table && a.searchParams.set("table", t.table),
                    t.where && a.searchParams.set("where", t.where),
                    t.columns && a.searchParams.set("columns", t.columns),
                    t.replica && a.searchParams.set("replica", t.replica);
                  let r = sy({}, t);
                  for (let [e, t] of (delete r.table,
                  delete r.where,
                  delete r.columns,
                  delete r.replica,
                  Object.entries(r)))
                    a.searchParams.set(e, t);
                }
                a.searchParams.set(sV, sk(this, tm)),
                  sk(this, tb) &&
                    (a.searchParams.set(sq, "true"),
                    a.searchParams.set(sF, sk(this, tf))),
                  sk(this, t_) && a.searchParams.set(sW, sk(this, t_)),
                  a.searchParams.sort();
                try {
                  (e = yield sk(this, tp).call(this, a.toString(), {
                    signal: i,
                    headers: this.options.headers,
                  })),
                    sE(this, tv, !0);
                } catch (e) {
                  if (e instanceof sx) break;
                  if (!(e instanceof sI)) throw e;
                  if (409 == e.status) {
                    let t = e.headers[sK];
                    sj(this, tE, tx).call(this, t),
                      yield sj(this, tE, tw).call(this, e.json);
                    continue;
                  }
                  if (e.status >= 400 && e.status < 500)
                    throw (sj(this, tE, tI).call(this, e), e);
                }
                let { headers: s, status: o } = e,
                  l = s.get(sK);
                l && sE(this, t_, l);
                let u = s.get(sG);
                u && sE(this, tm, u);
                let c = s.get("electric-cursor");
                c && sE(this, tf, c);
                let d = () => {
                  let e = s.get("electric-schema");
                  return e ? JSON.parse(e) : {};
                };
                sE(this, tk, null != (t = sk(this, tk)) ? t : d());
                let p = 204 === o ? "[]" : yield e.text();
                204 === o && sE(this, ty, Date.now());
                let h = sk(this, th).parse(p, sk(this, tk));
                if (h.length > 0) {
                  (r = h[h.length - 1]),
                    sZ(r) ||
                      "up-to-date" !== r.headers.control ||
                      (sE(this, ty, Date.now()), sE(this, tb, !0)),
                    yield sj(this, tE, tw).call(this, h);
                }
              }
            } catch (e) {
              if ((sE(this, td, e), sk(this, tT))) {
                let t = yield sk(this, tT).call(this, e);
                "object" == typeof t &&
                  (sj(this, tE, tx).call(this),
                  "params" in t && (this.options.params = t.params),
                  "headers" in t && (this.options.headers = t.headers),
                  sj(this, tE, tj).call(this));
                return;
              }
              throw e;
            } finally {
              sE(this, tv, !1);
            }
          });
        }),
        (tw = function (e) {
          return sw(this, null, function* () {
            yield Promise.all(
              Array.from(sk(this, tg).values()).map((t) =>
                sw(this, [t], function* ([t, r]) {
                  try {
                    yield t(e);
                  } catch (e) {
                    queueMicrotask(() => {
                      throw e;
                    });
                  }
                }),
              ),
            );
          });
        }),
        (tI = function (e) {
          sk(this, tg).forEach(([t, r]) => {
            null == r || r(e);
          });
        }),
        (tx = function (e) {
          sE(this, tm, "-1"),
            sE(this, tf, ""),
            sE(this, t_, e),
            sE(this, tb, !1),
            sE(this, tv, !1),
            sE(this, tk, void 0);
        }),
        (s2.Replica = { FULL: "full", DEFAULT: "default" }),
        (tS = new WeakMap()),
        (tR = new WeakMap()),
        (tA = new WeakMap()),
        (tO = new WeakMap()),
        (tC = new WeakSet()),
        (tP = function () {
          sk(this, tR).forEach((e) => {
            e({ value: this.currentValue, rows: this.currentRows });
          });
        });
      class s9 {
        #n;
        #i = new Map();
        #a;
        #s = !1;
        #o;
        stop() {
          this.#o?.();
        }
        constructor(e) {
          this.#n = e;
          let t = new ReadableStream({
            start: (e) => {
              this.#o = this.#n.subscribe(
                (t) => e.enqueue(t),
                this.#l.bind(this),
              );
            },
          });
          this.#a = (function (e, t) {
            let r = e.pipeThrough(new TransformStream(t));
            return (
              (r[Symbol.asyncIterator] = () => {
                let e = r.getReader();
                return {
                  async next() {
                    let { done: t, value: r } = await e.read();
                    return t
                      ? { done: !0, value: void 0 }
                      : { done: !1, value: r };
                  },
                };
              }),
              r
            );
          })(t, {
            transform: (e, t) => {
              let r = new Set();
              for (let t of e)
                if (sZ(t)) {
                  let e = t.key;
                  switch (t.headers.operation) {
                    case "insert":
                      this.#i.set(e, t.value), r.add(e);
                      break;
                    case "update": {
                      let n = this.#i.get(e),
                        i = n ? { ...n, ...t.value } : t.value;
                      this.#i.set(e, i), r.add(e);
                    }
                  }
                } else
                  sZ(t) ||
                    "must-refetch" !== t.headers.control ||
                    (this.#i.clear(), (this.#s = !1));
              for (let e of r) {
                let r = this.#i.get(e);
                r && t.enqueue(r);
              }
            },
          });
        }
        get stream() {
          return this.#a;
        }
        get isUpToDate() {
          return this.#n.isUpToDate;
        }
        get lastOffset() {
          return this.#n.lastOffset;
        }
        get handle() {
          return this.#n.shapeHandle;
        }
        get error() {
          return this.#s;
        }
        lastSyncedAt() {
          return this.#n.lastSyncedAt();
        }
        lastSynced() {
          return this.#n.lastSynced();
        }
        isLoading() {
          return this.#n.isLoading();
        }
        isConnected() {
          return this.#n.isConnected();
        }
        #l(e) {
          e instanceof sI && (this.#s = e);
        }
      }
      function s3(e, t) {
        let r = new AbortController(),
          n = new s6(
            a5("TRIGGER_STREAM_URL", a5("TRIGGER_API_URL")) ??
              "https://api.trigger.dev",
            { headers: t?.headers, signal: r.signal },
          );
        t?.signal?.addEventListener(
          "abort",
          () => {
            r.signal.aborted || r.abort();
          },
          { once: !0 },
        );
        let i = (function (e, t, r) {
          let n = new AbortController();
          return (
            r?.signal?.addEventListener(
              "abort",
              () => {
                n.abort();
              },
              { once: !0 },
            ),
            {
              stream: new s9(
                new s2({
                  url: t,
                  headers: {
                    ...r?.headers,
                    "x-trigger-electric-version": "1.0.0-beta.1",
                  },
                  fetchClient: r?.fetchClient,
                  signal: n.signal,
                  onError: (e) => {
                    r?.onError?.(e);
                  },
                }),
              ).stream.pipeThrough(
                new TransformStream({
                  async transform(t, r) {
                    let n = e.safeParse(t);
                    n.success
                      ? r.enqueue(n.data)
                      : r.error(
                          Error(`Unable to parse shape: ${n.error.message}`),
                        );
                  },
                }),
              ),
              stop: (e) => {
                e
                  ? setTimeout(() => {
                      n.signal.aborted || n.abort();
                    }, e)
                  : n.abort();
              },
            }
          );
        })(ne, e, {
          ...t,
          signal: r.signal,
          onError: (e) => {
            t?.onFetchError?.(e);
          },
        });
        return new s8({
          runShapeStream: i.stream,
          stopRunShapeStream: () => i.stop(3e4),
          streamFactory: n,
          abortController: r,
          ...t,
        });
      }
      TransformStream;
      class s5 {
        url;
        options;
        constructor(e, t) {
          (this.url = e), (this.options = t);
        }
        async subscribe() {
          return fetch(this.url, {
            headers: { Accept: "text/event-stream", ...this.options.headers },
            signal: this.options.signal,
          }).then((e) => {
            if (!e.ok)
              throw a_.generate(
                e.status,
                {},
                "Could not subscribe to stream",
                Object.fromEntries(e.headers),
              );
            if (!e.body) throw Error("No response body");
            return e.body
              .pipeThrough(new TextDecoderStream())
              .pipeThrough(new a0())
              .pipeThrough(
                new TransformStream({
                  transform(e, t) {
                    t.enqueue(
                      (function (e) {
                        try {
                          return JSON.parse(e);
                        } catch (t) {
                          return e;
                        }
                      })(e.data),
                    );
                  },
                }),
              );
          });
        }
      }
      class s6 {
        baseUrl;
        options;
        constructor(e, t) {
          (this.baseUrl = e), (this.options = t);
        }
        createSubscription(e, t, r) {
          if (!e || !t) throw Error("runId and streamKey are required");
          return new s5(
            `${r ?? this.baseUrl}/realtime/v1/streams/${e}/${t}`,
            this.options,
          );
        }
      }
      class s8 {
        options;
        stream;
        packetCache = new Map();
        _closeOnComplete;
        _isRunComplete = !1;
        constructor(e) {
          (this.options = e),
            (this._closeOnComplete =
              void 0 === e.closeOnComplete || e.closeOnComplete),
            (this.stream = s4(
              this.options.runShapeStream,
              {
                transform: async (e, t) => {
                  let r = await this.transformRunShape(e);
                  t.enqueue(r),
                    (this._isRunComplete = !!r.finishedAt),
                    this._closeOnComplete &&
                      this._isRunComplete &&
                      !this.options.abortController.signal.aborted &&
                      this.options.stopRunShapeStream();
                },
              },
              this.options.abortController.signal,
            ));
        }
        unsubscribe() {
          this.options.abortController.signal.aborted ||
            this.options.abortController.abort(),
            this.options.stopRunShapeStream();
        }
        [Symbol.asyncIterator]() {
          return this.stream[Symbol.asyncIterator]();
        }
        getReader() {
          return this.stream.getReader();
        }
        withStreams() {
          let e = new Set();
          return s4(
            this.stream,
            {
              transform: async (t, r) => {
                if (
                  (r.enqueue({ type: "run", run: t }),
                  t.metadata &&
                    "$$streams" in t.metadata &&
                    Array.isArray(t.metadata.$$streams))
                )
                  for (let n of t.metadata.$$streams)
                    "string" == typeof n &&
                      (e.has(n) ||
                        (e.add(n),
                        this.options.streamFactory
                          .createSubscription(
                            t.id,
                            n,
                            this.options.client?.baseUrl,
                          )
                          .subscribe()
                          .then((e) => {
                            e.pipeThrough(
                              new TransformStream({
                                transform(e, r) {
                                  r.enqueue({ type: n, chunk: e, run: t });
                                },
                              }),
                            )
                              .pipeTo(
                                new WritableStream({
                                  write(e) {
                                    r.enqueue(e);
                                  },
                                }),
                              )
                              .catch((e) => {
                                console.error(`Error in stream ${n}:`, e);
                              });
                          })
                          .catch((e) => {
                            console.error(
                              `Error subscribing to stream ${n}:`,
                              e,
                            );
                          })));
              },
            },
            this.options.abortController.signal,
          );
        }
        async transformRunShape(e) {
          let t = e.payloadType
              ? { data: e.payload ?? void 0, dataType: e.payloadType }
              : void 0,
            r = e.outputType
              ? { data: e.output ?? void 0, dataType: e.outputType }
              : void 0,
            [n, i] = await Promise.all(
              [
                { packet: t, key: "payload" },
                { packet: r, key: "output" },
              ].map(async ({ packet: t, key: r }) => {
                if (!t) return;
                let n = this.packetCache.get(`${e.friendlyId}/${r}`);
                if (void 0 !== n) return n;
                let i = await sr(t, this.options.client);
                return this.packetCache.set(`${e.friendlyId}/${r}`, i), i;
              }),
            ),
            a =
              e.metadata && e.metadataType
                ? await st({ data: e.metadata, dataType: e.metadataType })
                : void 0;
          return {
            id: e.friendlyId,
            payload: n,
            output: i,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            taskIdentifier: e.taskIdentifier,
            number: e.number,
            status: (function (e) {
              switch (e) {
                case "DELAYED":
                  return "DELAYED";
                case "WAITING_FOR_DEPLOY":
                  return "WAITING_FOR_DEPLOY";
                case "PENDING":
                  return "QUEUED";
                case "PAUSED":
                case "WAITING_TO_RESUME":
                  return "FROZEN";
                case "RETRYING_AFTER_FAILURE":
                  return "REATTEMPTING";
                case "EXECUTING":
                  return "EXECUTING";
                case "CANCELED":
                  return "CANCELED";
                case "COMPLETED_SUCCESSFULLY":
                  return "COMPLETED";
                case "SYSTEM_FAILURE":
                  return "SYSTEM_FAILURE";
                case "INTERRUPTED":
                  return "INTERRUPTED";
                case "CRASHED":
                  return "CRASHED";
                case "COMPLETED_WITH_ERRORS":
                  return "FAILED";
                case "EXPIRED":
                  return "EXPIRED";
                case "TIMED_OUT":
                  return "TIMED_OUT";
                default:
                  throw Error(`Unknown status: ${e}`);
              }
            })(e.status),
            durationMs: e.usageDurationMs,
            costInCents: e.costInCents,
            baseCostInCents: e.baseCostInCents,
            tags: e.runTags ?? [],
            idempotencyKey: e.idempotencyKey ?? void 0,
            expiredAt: e.expiredAt ?? void 0,
            finishedAt: e.completedAt ?? void 0,
            startedAt: e.startedAt ?? void 0,
            delayedUntil: e.delayUntil ?? void 0,
            queuedAt: e.queuedAt ?? void 0,
            error: e.error
              ? (function (e) {
                  let t = (function (e) {
                    switch (e.type) {
                      case "BUILT_IN_ERROR":
                        if (
                          "UnexpectedExitError" === e.name &&
                          e.message.startsWith("Unexpected exit with code -1")
                        )
                          switch (a3(e.stackTrace)) {
                            case "SIGTERM":
                              return { ...a9("TASK_PROCESS_SIGTERM") };
                            case "SIGSEGV":
                              return { ...a9("TASK_PROCESS_SIGSEGV") };
                            case "SIGKILL":
                              return { ...a9("TASK_PROCESS_MAYBE_OOM_KILLED") };
                            default:
                              return {
                                ...a9("TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE"),
                                message: e.message,
                                stackTrace: e.stackTrace,
                              };
                          }
                        if (
                          ("Error" === e.name &&
                            "ffmpeg was killed with signal SIGKILL" ===
                              e.message) ||
                          ("BUILT_IN_ERROR" === e.type &&
                            e.message &&
                            "MANUAL_OOM_KILL_ERROR" === e.message)
                        )
                          return { ...a9("TASK_PROCESS_OOM_KILLED") };
                        break;
                      case "STRING_ERROR":
                      case "CUSTOM_ERROR":
                        break;
                      case "INTERNAL_ERROR":
                        if (
                          e.code === t9.TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE
                        )
                          switch (a3(e.message)) {
                            case "SIGTERM":
                              return { ...a9("TASK_PROCESS_SIGTERM") };
                            case "SIGSEGV":
                              return { ...a9("TASK_PROCESS_SIGSEGV") };
                            case "SIGKILL":
                              return { ...a9("TASK_PROCESS_MAYBE_OOM_KILLED") };
                            default:
                              return {
                                ...a9("TASK_PROCESS_EXITED_WITH_NON_ZERO_CODE"),
                                message: e.message,
                                stackTrace: e.stackTrace,
                              };
                          }
                        return { ...e, ...a9(e.code) };
                    }
                    return e;
                  })(e);
                  switch (t.type) {
                    case "BUILT_IN_ERROR":
                      return {
                        name: t.name,
                        message: t.message,
                        stackTrace: t.stackTrace,
                      };
                    case "STRING_ERROR":
                    case "CUSTOM_ERROR":
                      return { message: t.raw };
                    case "INTERNAL_ERROR":
                      return {
                        message: `trigger.dev internal error (${t.code})`,
                      };
                  }
                })(e.error)
              : void 0,
            isTest: e.isTest,
            metadata: a,
          };
        }
      }
      "undefined" != typeof window &&
        "undefined" != typeof navigator &&
        "string" == typeof navigator.userAgent &&
        (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
          /iPad|iPhone|iPod/.test(navigator.userAgent)) &&
        ((ReadableStream.prototype.values ??= function ({
          preventCancel: e = !1,
        } = {}) {
          let t = this.getReader();
          return {
            async next() {
              try {
                let e = await t.read();
                return e.done && t.releaseLock(), e;
              } catch (e) {
                throw (t.releaseLock(), e);
              }
            },
            async return(r) {
              if (e) t.releaseLock();
              else {
                let e = t.cancel(r);
                t.releaseLock(), await e;
              }
              return { done: !0, value: r };
            },
            [Symbol.asyncIterator]() {
              return this;
            },
          };
        }),
        (ReadableStream.prototype[Symbol.asyncIterator] ??=
          ReadableStream.prototype.values));
      let s7 = {
        retry: {
          maxAttempts: 5,
          minTimeoutInMs: 1e3,
          maxTimeoutInMs: 3e4,
          factor: 1.6,
          randomize: !1,
        },
      };
      class oe {
        baseUrl;
        accessToken;
        defaultRequestOptions;
        constructor(e, t, r = {}) {
          (this.accessToken = t),
            (this.baseUrl = e.replace(/\/$/, "")),
            (this.defaultRequestOptions = or(s7, r));
        }
        get fetchClient() {
          let e = this.#u(!1);
          return (t, r) => fetch(t, { ...r, headers: { ...r?.headers, ...e } });
        }
        getHeaders() {
          return this.#u(!1);
        }
        async getRunResult(e, t) {
          try {
            return await aZ(
              ru,
              `${this.baseUrl}/api/v1/runs/${e}/result`,
              { method: "GET", headers: this.#u(!1) },
              or(this.defaultRequestOptions, t),
            );
          } catch (e) {
            if (e instanceof a_ && 404 === e.status) return;
            throw e;
          }
        }
        async getBatchResults(e, t) {
          return await aZ(
            rc,
            `${this.baseUrl}/api/v1/batches/${e}/results`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        triggerTask(e, t, r, n) {
          let i = encodeURIComponent(e);
          return aZ(
            rU,
            `${this.baseUrl}/api/v1/tasks/${i}/trigger`,
            {
              method: "POST",
              headers: this.#u(r?.spanParentAsLink ?? !1),
              body: JSON.stringify(t),
            },
            or(this.defaultRequestOptions, n),
          )
            .withResponse()
            .then(async ({ response: e, data: t }) => {
              let r = e.headers.get("x-trigger-jwt");
              if ("string" == typeof r) return { ...t, publicAccessToken: r };
              let i = e.headers.get("x-trigger-jwt-claims"),
                a = i ? JSON.parse(i) : void 0,
                s = await tU({
                  secretKey: this.accessToken,
                  payload: { ...a, scopes: [`read:runs:${t.id}`] },
                  expirationTime: n?.publicAccessToken?.expirationTime ?? "1h",
                });
              return { ...t, publicAccessToken: s };
            });
        }
        batchTriggerV2(e, t, r) {
          return aZ(
            rD,
            `${this.baseUrl}/api/v1/tasks/batch`,
            {
              method: "POST",
              headers: this.#u(t?.spanParentAsLink ?? !1, {
                "idempotency-key": t?.idempotencyKey,
                "idempotency-key-ttl": t?.idempotencyKeyTTL,
                "batch-processing-strategy": t?.processingStrategy,
              }),
              body: JSON.stringify(e),
            },
            or(this.defaultRequestOptions, r),
          )
            .withResponse()
            .then(async ({ response: e, data: t }) => {
              let n = e.headers.get("x-trigger-jwt-claims"),
                i = n ? JSON.parse(n) : void 0,
                a = await tU({
                  secretKey: this.accessToken,
                  payload: { ...i, scopes: [`read:batch:${t.id}`] },
                  expirationTime: r?.publicAccessToken?.expirationTime ?? "1h",
                });
              return { ...t, publicAccessToken: a };
            });
        }
        createUploadPayloadUrl(e, t) {
          return aZ(
            rK,
            `${this.baseUrl}/api/v1/packets/${e}`,
            { method: "PUT", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        getPayloadUrl(e, t) {
          return aZ(
            rK,
            `${this.baseUrl}/api/v1/packets/${e}`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        retrieveRun(e, t) {
          return aZ(
            r0,
            `${this.baseUrl}/api/v3/runs/${e}`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        listRuns(e, t) {
          let r = ot(e);
          return aK(
            r2,
            `${this.baseUrl}/api/v1/runs`,
            { query: r, limit: e?.limit, after: e?.after, before: e?.before },
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        listProjectRuns(e, t, r) {
          let n = ot(t);
          return (
            t?.env &&
              n.append(
                "filter[env]",
                Array.isArray(t.env) ? t.env.join(",") : t.env,
              ),
            aK(
              r2,
              `${this.baseUrl}/api/v1/projects/${e}/runs`,
              { query: n, limit: t?.limit, after: t?.after, before: t?.before },
              { method: "GET", headers: this.#u(!1) },
              or(this.defaultRequestOptions, r),
            )
          );
        }
        replayRun(e, t) {
          return aZ(
            rG,
            `${this.baseUrl}/api/v1/runs/${e}/replay`,
            { method: "POST", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        cancelRun(e, t) {
          return aZ(
            rF,
            `${this.baseUrl}/api/v2/runs/${e}/cancel`,
            { method: "POST", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        rescheduleRun(e, t, r) {
          return aZ(
            r0,
            `${this.baseUrl}/api/v1/runs/${e}/reschedule`,
            { method: "POST", headers: this.#u(!1), body: JSON.stringify(t) },
            or(this.defaultRequestOptions, r),
          );
        }
        addTags(e, t, r) {
          return aZ(
            tN.object({ message: tN.string() }),
            `${this.baseUrl}/api/v1/runs/${e}/tags`,
            { method: "POST", headers: this.#u(!1), body: JSON.stringify(t) },
            or(this.defaultRequestOptions, r),
          );
        }
        createSchedule(e, t) {
          return aZ(
            rV,
            `${this.baseUrl}/api/v1/schedules`,
            { method: "POST", headers: this.#u(!1), body: JSON.stringify(e) },
            or(this.defaultRequestOptions, t),
          );
        }
        listSchedules(e, t) {
          let r = new URLSearchParams();
          return (
            e?.page && r.append("page", e.page.toString()),
            e?.perPage && r.append("perPage", e.perPage.toString()),
            aG(
              rV,
              `${this.baseUrl}/api/v1/schedules`,
              { page: e?.page, limit: e?.perPage },
              { method: "GET", headers: this.#u(!1) },
              or(this.defaultRequestOptions, t),
            )
          );
        }
        retrieveSchedule(e, t) {
          return aZ(
            rV,
            `${this.baseUrl}/api/v1/schedules/${e}`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        updateSchedule(e, t, r) {
          return aZ(
            rV,
            `${this.baseUrl}/api/v1/schedules/${e}`,
            { method: "PUT", headers: this.#u(!1), body: JSON.stringify(t) },
            or(this.defaultRequestOptions, r),
          );
        }
        deactivateSchedule(e, t) {
          return aZ(
            rV,
            `${this.baseUrl}/api/v1/schedules/${e}/deactivate`,
            { method: "POST", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        activateSchedule(e, t) {
          return aZ(
            rV,
            `${this.baseUrl}/api/v1/schedules/${e}/activate`,
            { method: "POST", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        deleteSchedule(e, t) {
          return aZ(
            rH,
            `${this.baseUrl}/api/v1/schedules/${e}`,
            { method: "DELETE", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        listEnvVars(e, t, r) {
          return aZ(
            r5,
            `${this.baseUrl}/api/v1/projects/${e}/envvars/${t}`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, r),
          );
        }
        importEnvVars(e, t, r, n) {
          return aZ(
            r4,
            `${this.baseUrl}/api/v1/projects/${e}/envvars/${t}/import`,
            { method: "POST", headers: this.#u(!1), body: JSON.stringify(r) },
            or(this.defaultRequestOptions, n),
          );
        }
        retrieveEnvVar(e, t, r, n) {
          return aZ(
            r9,
            `${this.baseUrl}/api/v1/projects/${e}/envvars/${t}/${r}`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, n),
          );
        }
        createEnvVar(e, t, r, n) {
          return aZ(
            r4,
            `${this.baseUrl}/api/v1/projects/${e}/envvars/${t}`,
            { method: "POST", headers: this.#u(!1), body: JSON.stringify(r) },
            or(this.defaultRequestOptions, n),
          );
        }
        updateEnvVar(e, t, r, n, i) {
          return aZ(
            r4,
            `${this.baseUrl}/api/v1/projects/${e}/envvars/${t}/${r}`,
            { method: "PUT", headers: this.#u(!1), body: JSON.stringify(n) },
            or(this.defaultRequestOptions, i),
          );
        }
        deleteEnvVar(e, t, r, n) {
          return aZ(
            r4,
            `${this.baseUrl}/api/v1/projects/${e}/envvars/${t}/${r}`,
            { method: "DELETE", headers: this.#u(!1) },
            or(this.defaultRequestOptions, n),
          );
        }
        updateRunMetadata(e, t, r) {
          return aZ(
            r6,
            `${this.baseUrl}/api/v1/runs/${e}/metadata`,
            { method: "PUT", headers: this.#u(!1), body: JSON.stringify(t) },
            or(this.defaultRequestOptions, r),
          );
        }
        getRunMetadata(e, t) {
          return aZ(
            r6,
            `${this.baseUrl}/api/v1/runs/${e}/metadata`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        subscribeToRun(e, t) {
          return s3(`${this.baseUrl}/realtime/v1/runs/${e}`, {
            closeOnComplete:
              "boolean" != typeof t?.closeOnComplete || t.closeOnComplete,
            headers: this.#c(),
            client: this,
            signal: t?.signal,
            onFetchError: t?.onFetchError,
          });
        }
        subscribeToRunsWithTag(e, t) {
          let r = (function (e) {
            let t = new URLSearchParams();
            return (
              e &&
                (e.tasks &&
                  t.append(
                    "tasks",
                    Array.isArray(e.tasks) ? e.tasks.join(",") : e.tasks,
                  ),
                e.tags &&
                  t.append(
                    "tags",
                    Array.isArray(e.tags) ? e.tags.join(",") : e.tags,
                  )),
              t
            );
          })({ tags: e });
          return s3(`${this.baseUrl}/realtime/v1/runs${r ? `?${r}` : ""}`, {
            closeOnComplete: !1,
            headers: this.#c(),
            client: this,
            signal: t?.signal,
            onFetchError: t?.onFetchError,
          });
        }
        subscribeToBatch(e, t) {
          return s3(`${this.baseUrl}/realtime/v1/batches/${e}`, {
            closeOnComplete: !1,
            headers: this.#c(),
            client: this,
            signal: t?.signal,
            onFetchError: t?.onFetchError,
          });
        }
        async fetchStream(e, t, r) {
          let n = new s6(r?.baseUrl ?? this.baseUrl, {
            headers: this.getHeaders(),
            signal: r?.signal,
          }).createSubscription(e, t);
          return await n.subscribe();
        }
        async generateJWTClaims(e) {
          return aZ(
            tN.record(tN.any()),
            `${this.baseUrl}/api/v1/auth/jwt/claims`,
            { method: "POST", headers: this.#u(!1) },
            or(this.defaultRequestOptions, e),
          );
        }
        retrieveBatch(e, t) {
          return aZ(
            nr,
            `${this.baseUrl}/api/v1/batches/${e}`,
            { method: "GET", headers: this.#u(!1) },
            or(this.defaultRequestOptions, t),
          );
        }
        #u(e, t) {
          let r = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
            "trigger-version": tM,
            ...Object.entries(t ?? {}).reduce(
              (e, [t, r]) => (void 0 !== r && (e[t] = r), e),
              {},
            ),
          };
          return (
            ah.isInsideTask &&
              ((r["x-trigger-worker"] = "true"),
              e && (r["x-trigger-span-parent-as-link"] = "1")),
            "undefined" != typeof window &&
              void 0 !== window.document &&
              (r["x-trigger-client"] = "browser"),
            r
          );
        }
        #c() {
          return {
            Authorization: `Bearer ${this.accessToken}`,
            "trigger-version": tM,
          };
        }
      }
      function ot(e) {
        let t = new URLSearchParams();
        return (
          e &&
            (e.status &&
              t.append(
                "filter[status]",
                Array.isArray(e.status) ? e.status.join(",") : e.status,
              ),
            e.taskIdentifier &&
              t.append(
                "filter[taskIdentifier]",
                Array.isArray(e.taskIdentifier)
                  ? e.taskIdentifier.join(",")
                  : e.taskIdentifier,
              ),
            e.version &&
              t.append(
                "filter[version]",
                Array.isArray(e.version) ? e.version.join(",") : e.version,
              ),
            e.bulkAction && t.append("filter[bulkAction]", e.bulkAction),
            e.tag &&
              t.append(
                "filter[tag]",
                Array.isArray(e.tag) ? e.tag.join(",") : e.tag,
              ),
            e.schedule && t.append("filter[schedule]", e.schedule),
            "boolean" == typeof e.isTest &&
              t.append("filter[isTest]", String(e.isTest)),
            e.from &&
              t.append(
                "filter[createdAt][from]",
                e.from instanceof Date
                  ? e.from.getTime().toString()
                  : e.from.toString(),
              ),
            e.to &&
              t.append(
                "filter[createdAt][to]",
                e.to instanceof Date
                  ? e.to.getTime().toString()
                  : e.to.toString(),
              ),
            e.period && t.append("filter[createdAt][period]", e.period),
            e.batch && t.append("filter[batch]", e.batch)),
          t
        );
      }
      function or(e, t) {
        return t ? { ...e, ...t, retry: { ...e.retry, ...t.retry } } : e;
      }
      var on = r(40971);
      class oi {
        preciseNow() {
          let e = new on.G().toStruct();
          return [e.seconds, e.nanos];
        }
        reset() {}
      }
      let oa = "clock",
        os = new oi();
      class oo {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new oo()), this._instance;
        }
        setGlobalClock(e) {
          return al(oa, e);
        }
        preciseNow() {
          return this.#d().preciseNow();
        }
        reset() {
          this.#d().reset();
        }
        #d() {
          return au(oa) ?? os;
        }
      }
      let ol = oo.getInstance();
      class ou {
        debug() {}
        log() {}
        info() {}
        warn() {}
        error() {}
        trace(e, t) {
          return t({});
        }
        startSpan() {
          return {};
        }
      }
      let oc = "logger",
        od = new ou();
      class op {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new op()), this._instance;
        }
        disable() {
          ac(oc);
        }
        setGlobalTaskLogger(e) {
          return al(oc, e);
        }
        debug(e, t) {
          this.#p().debug(e, t);
        }
        log(e, t) {
          this.#p().log(e, t);
        }
        info(e, t) {
          this.#p().info(e, t);
        }
        warn(e, t) {
          this.#p().warn(e, t);
        }
        error(e, t) {
          this.#p().error(e, t);
        }
        trace(e, t, r) {
          return this.#p().trace(e, t, r);
        }
        startSpan(e, t) {
          return this.#p().startSpan(e, t);
        }
        #p() {
          return au(oc) ?? od;
        }
      }
      op.getInstance();
      class oh {
        disable() {}
        waitForDuration(e) {
          return Promise.resolve();
        }
        waitUntil(e) {
          return Promise.resolve();
        }
        waitForTask(e) {
          return Promise.resolve({
            ok: !1,
            id: e.id,
            error: { type: "INTERNAL_ERROR", code: t9.CONFIGURED_INCORRECTLY },
          });
        }
        waitForBatch(e) {
          return Promise.resolve({ id: e.id, items: [] });
        }
      }
      class og {
        disable() {}
        start() {
          return { sample: () => ({ cpuTime: 0, wallTime: 0 }) };
        }
        stop(e) {
          return e.sample();
        }
        pauseAsync(e) {
          return e();
        }
        sample() {}
      }
      let om = "usage",
        of = new og();
      class oy {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new oy()), this._instance;
        }
        setGlobalUsageManager(e) {
          return al(om, e);
        }
        disable() {
          this.#h().disable(), ac(om);
        }
        start() {
          return this.#h().start();
        }
        stop(e) {
          return this.#h().stop(e);
        }
        pauseAsync(e) {
          return this.#h().pauseAsync(e);
        }
        sample() {
          return this.#h().sample();
        }
        #h() {
          return au(om) ?? of;
        }
      }
      let ob = oy.getInstance(),
        ov = "runtime",
        o_ = new oh();
      class ok {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new ok()), this._instance;
        }
        waitForDuration(e) {
          return ob.pauseAsync(() => this.#g().waitForDuration(e));
        }
        waitUntil(e) {
          return ob.pauseAsync(() => this.#g().waitUntil(e));
        }
        waitForTask(e) {
          return ob.pauseAsync(() => this.#g().waitForTask(e));
        }
        waitForBatch(e) {
          return ob.pauseAsync(() => this.#g().waitForBatch(e));
        }
        setGlobalRuntimeManager(e) {
          return al(ov, e);
        }
        disable() {
          this.#g().disable(), ac(ov);
        }
        #g() {
          return au(ov) ?? o_;
        }
      }
      let oT = ok.getInstance();
      class oE {
        append(e, t) {
          throw Error("Method not implemented.");
        }
        remove(e, t) {
          throw Error("Method not implemented.");
        }
        increment(e, t) {
          throw Error("Method not implemented.");
        }
        decrement(e, t) {
          throw Error("Method not implemented.");
        }
        stream(e, t) {
          throw Error("Method not implemented.");
        }
        fetchStream(e, t) {
          throw Error("Method not implemented.");
        }
        flush(e) {
          throw Error("Method not implemented.");
        }
        refresh(e) {
          throw Error("Method not implemented.");
        }
        enterWithMetadata(e) {}
        current() {
          throw Error("Method not implemented.");
        }
        getKey(e) {
          throw Error("Method not implemented.");
        }
        set(e, t) {
          throw Error("Method not implemented.");
        }
        del(e) {
          throw Error("Method not implemented.");
        }
        update(e) {
          throw Error("Method not implemented.");
        }
        get parent() {
          return {
            append: () => this.parent,
            set: () => this.parent,
            del: () => this.parent,
            increment: () => this.parent,
            decrement: () => this.parent,
            remove: () => this.parent,
            stream: () =>
              Promise.resolve({
                [Symbol.asyncIterator]: () => ({
                  next: () => Promise.resolve({ done: !0, value: void 0 }),
                }),
              }),
            update: () => this.parent,
          };
        }
        get root() {
          return {
            append: () => this.root,
            set: () => this.root,
            del: () => this.root,
            increment: () => this.root,
            decrement: () => this.root,
            remove: () => this.root,
            stream: () =>
              Promise.resolve({
                [Symbol.asyncIterator]: () => ({
                  next: () => Promise.resolve({ done: !0, value: void 0 }),
                }),
              }),
            update: () => this.root,
          };
        }
      }
      let oj = "run-metadata",
        ow = new oE();
      class oI {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new oI()), this._instance;
        }
        setGlobalManager(e) {
          return al(oj, e);
        }
        #m() {
          return au(oj) ?? ow;
        }
        enterWithMetadata(e) {
          this.#m().enterWithMetadata(e);
        }
        current() {
          return this.#m().current();
        }
        getKey(e) {
          return this.#m().getKey(e);
        }
        set(e, t) {
          return this.#m().set(e, t), this;
        }
        del(e) {
          return this.#m().del(e), this;
        }
        increment(e, t) {
          return this.#m().increment(e, t), this;
        }
        decrement(e, t) {
          return this.#m().decrement(e, t), this;
        }
        append(e, t) {
          return this.#m().append(e, t), this;
        }
        remove(e, t) {
          return this.#m().remove(e, t), this;
        }
        update(e) {
          return this.#m().update(e), this;
        }
        stream(e, t, r) {
          return this.#m().stream(e, t, r);
        }
        fetchStream(e, t) {
          return this.#m().fetchStream(e, t);
        }
        flush(e) {
          return this.#m().flush(e);
        }
        refresh(e) {
          return this.#m().refresh(e);
        }
        get parent() {
          return this.#m().parent;
        }
        get root() {
          return this.#m().root;
        }
      }
      r(29167);
      var ox = Object.prototype.hasOwnProperty;
      let oS = oI.getInstance(),
        oR = "wait-until";
      class oA {
        register(e) {}
        blockUntilSettled(e) {
          return Promise.resolve();
        }
        requiresResolving() {
          return !1;
        }
      }
      let oO = new oA();
      class oC {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new oC()), this._instance;
        }
        setGlobalManager(e) {
          return al(oR, e);
        }
        #m() {
          return au(oR) ?? oO;
        }
        register(e) {
          return this.#m().register(e);
        }
        blockUntilSettled(e) {
          return this.#m().blockUntilSettled(e);
        }
        requiresResolving() {
          return this.#m().requiresResolving();
        }
      }
      oC.getInstance();
      let oP = "timeout";
      class oN {
        abortAfterTimeout(e) {
          return new AbortController().signal;
        }
      }
      let oM = new oN();
      class oU {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new oU()), this._instance;
        }
        get signal() {
          return this.#f().signal;
        }
        abortAfterTimeout(e) {
          return this.#f().abortAfterTimeout(e);
        }
        setGlobalManager(e) {
          return al(oP, e);
        }
        disable() {
          ac(oP);
        }
        #f() {
          return au(oP) ?? oM;
        }
      }
      let o$ = oU.getInstance();
      class oD {
        registerMetric(e) {}
        getMetrics() {
          return [];
        }
      }
      let oL = "run-timeline-metrics",
        oZ = new oD();
      class oK {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new oK()), this._instance;
        }
        registerMetric(e) {
          this.#m().registerMetric(e);
        }
        getMetrics() {
          return this.#m().getMetrics();
        }
        async measureMetric(e, t, r, n) {
          let i,
            a = {};
          if ("function" == typeof r) i = r;
          else {
            if (((a = r || {}), !n))
              throw Error(
                "Callback function is required when attributes are provided",
              );
            i = n;
          }
          let s = Date.now();
          try {
            let r = await i(),
              n = Date.now() - s;
            return (
              this.registerMetric({
                name: e,
                event: t,
                attributes: { ...a, duration: n },
                timestamp: s,
              }),
              r
            );
          } catch (n) {
            let r = Date.now() - s;
            throw (
              (this.registerMetric({
                name: e,
                event: t,
                attributes: {
                  ...a,
                  duration: r,
                  error: n instanceof Error ? n.message : String(n),
                  status: "failed",
                },
                timestamp: s,
              }),
              n)
            );
          }
        }
        convertMetricsToSpanEvents() {
          return this.getMetrics().map((e) => ({
            name: e.name,
            startTime: e.timestamp,
            attributes: { ...e.attributes, event: e.event },
          }));
        }
        convertMetricsToSpanAttributes() {
          let e = this.getMetrics();
          if (0 === e.length) return {};
          let t = e.reduce(
              (e, t) => (e[t.name] || (e[t.name] = []), e[t.name].push(t), e),
              {},
            ),
            r = e.reduce(
              (e, t) => (
                (e[t.event] = {
                  name: t.name,
                  timestamp: t.timestamp,
                  event: t.event,
                  ...aN(t.attributes, "attributes"),
                }),
                e
              ),
              {},
            ),
            n = {};
          for (let [e, r] of Object.entries(t)) {
            if (0 === r.length) continue;
            let t = [...r].sort((e, t) => e.timestamp - t.timestamp),
              i = t[0].timestamp,
              a = t[t.length - 1],
              s = a.attributes?.duration ?? 0,
              o = a.timestamp + s - i;
            n[e] = { name: e, duration: o, timestamp: i };
          }
          return { ...aN(r, aa.METRIC_EVENTS), ...aN(n, aa.METRIC_EVENTS) };
        }
        setGlobalManager(e) {
          return al(oL, e);
        }
        #m() {
          return au(oL) ?? oZ;
        }
      }
      oK.getInstance();
      class oG {
        registerTaskMetadata(e) {}
        registerTaskFileMetadata(e, t) {}
        updateTaskMetadata(e, t) {}
        listTaskManifests() {
          return [];
        }
        getTaskManifest(e) {}
        getTask(e) {}
        taskExists(e) {
          return !1;
        }
        disable() {}
      }
      let oF = "task-catalog",
        oW = new oG();
      class oq {
        static _instance;
        constructor() {}
        static getInstance() {
          return this._instance || (this._instance = new oq()), this._instance;
        }
        setGlobalTaskCatalog(e) {
          return al(oF, e);
        }
        disable() {
          ac(oF);
        }
        registerTaskMetadata(e) {
          this.#y().registerTaskMetadata(e);
        }
        updateTaskMetadata(e, t) {
          this.#y().updateTaskMetadata(e, t);
        }
        registerTaskFileMetadata(e, t) {
          this.#y().registerTaskFileMetadata(e, t);
        }
        listTaskManifests() {
          return this.#y().listTaskManifests();
        }
        getTaskManifest(e) {
          return this.#y().getTaskManifest(e);
        }
        getTask(e) {
          return this.#y().getTask(e);
        }
        taskExists(e) {
          return this.#y().taskExists(e);
        }
        #y() {
          return au(oF) ?? oW;
        }
      }
      oq.getInstance();
      class oV extends Error {
        taskId;
        runId;
        cause;
        constructor(e, t, r) {
          r instanceof Error
            ? (super(`Error in ${e}: ${r.message}`),
              (this.cause = r),
              (this.name = "SubtaskUnwrapError"))
            : (super(`Error in ${e}`),
              (this.name = "SubtaskUnwrapError"),
              (this.cause = r)),
            (this.taskId = e),
            (this.runId = t);
        }
      }
      class oH extends Promise {
        taskId;
        constructor(e, t) {
          super(e), (this.taskId = t);
        }
        unwrap() {
          return this.then((e) => {
            if (e.ok) return e.output;
            throw new oV(this.taskId, e.id, e.error);
          });
        }
      }
      async function oz(e) {
        if (e)
          return "string" == typeof e && 64 === e.length
            ? e
            : await oB(e, { scope: "global" });
      }
      async function oB(e, t) {
        return await oY(
          [...(Array.isArray(e) ? e : [e])].concat(
            (function (e) {
              switch (e) {
                case "run":
                  if (ah?.ctx) return [ah.ctx.run.id];
                  break;
                case "attempt":
                  if (ah?.ctx) return [ah.ctx.attempt.id];
              }
              return [];
            })(t?.scope ?? "run"),
          ),
        );
      }
      async function oY(e) {
        return Array.from(
          new Uint8Array(
            await crypto.subtle.digest(
              "SHA-256",
              new TextEncoder().encode(e.join("-")),
            ),
          ),
        )
          .map((e) => e.toString(16).padStart(2, "0"))
          .join("");
      }
      r(33260);
      var oJ = r(35130),
        oX = r(43964),
        oQ = "object" == typeof globalThis ? globalThis : global,
        o1 = Symbol.for("io.opentelemetry.js.api.logs"),
        o0 = (function () {
          function e() {}
          return (e.prototype.emit = function (e) {}), e;
        })();
      new o0();
      var o2 = new ((function () {
          function e() {}
          return (
            (e.prototype.getLogger = function (e, t, r) {
              return new o0();
            }),
            e
          );
        })())(),
        o4 = (function () {
          function e() {}
          return (
            (e.getInstance = function () {
              return (
                this._instance || (this._instance = new e()), this._instance
              );
            }),
            (e.prototype.setGlobalLoggerProvider = function (e) {
              return oQ[o1]
                ? this.getLoggerProvider()
                : ((oQ[o1] = function (t) {
                    return 1 === t ? e : o2;
                  }),
                  e);
            }),
            (e.prototype.getLoggerProvider = function () {
              var e, t;
              return null != (t = null == (e = oQ[o1]) ? void 0 : e.call(oQ, 1))
                ? t
                : o2;
            }),
            (e.prototype.getLogger = function (e, t, r) {
              return this.getLoggerProvider().getLogger(e, t, r);
            }),
            (e.prototype.disable = function () {
              delete oQ[o1];
            }),
            e
          );
        })().getInstance();
      class o9 {
        _config;
        constructor(e) {
          this._config = e;
        }
        _tracer;
        get tracer() {
          if (!this._tracer) {
            if ("tracer" in this._config) return this._config.tracer;
            this._tracer = oJ.u.getTracer(
              this._config.name,
              this._config.version,
            );
          }
          return this._tracer;
        }
        _logger;
        get logger() {
          if (!this._logger) {
            if ("logger" in this._config) return this._config.logger;
            this._logger = o4.getLogger(
              this._config.name,
              this._config.version,
            );
          }
          return this._logger;
        }
        extractContext(e) {
          return aO.$.extract(aC._.active(), e ?? {});
        }
        startActiveSpan(e, t, r, n, i) {
          let a = n ?? aC._.active(),
            s = r?.attributes ?? {},
            o = !1;
          return this.tracer.startActiveSpan(
            e,
            { ...r, attributes: s, startTime: ol.preciseNow() },
            a,
            async (n) => {
              if (
                (i?.addEventListener("abort", () => {
                  if (!o) {
                    var e;
                    (o = !0),
                      (e = i.reason) instanceof Error
                        ? n.recordException(
                            (function (e) {
                              let t = Error(e.message.replace(/\0/g, ""));
                              return (
                                (t.name = e.name.replace(/\0/g, "")),
                                (t.stack = e.stack?.replace(/\0/g, "")),
                                t
                              );
                            })(e),
                          )
                        : "string" == typeof e
                          ? n.recordException(e.replace(/\0/g, ""))
                          : n.recordException(
                              JSON.stringify(e).replace(/\0/g, ""),
                            ),
                      n.setStatus({ code: oX.s.ERROR }),
                      n.end();
                  }
                }),
                ah.ctx)
              ) {
                let t = this.tracer.startSpan(
                  e,
                  {
                    ...r,
                    attributes: {
                      ...s,
                      [aa.SPAN_PARTIAL]: !0,
                      [aa.SPAN_ID]: n.spanContext().spanId,
                    },
                  },
                  a,
                );
                if (r?.events)
                  for (let e of r.events)
                    t.addEvent(e.name, e.attributes, e.startTime);
                t.end();
              }
              if (r?.events)
                for (let e of r.events)
                  n.addEvent(e.name, e.attributes, e.startTime);
              let l = ob.start();
              try {
                return await t(n);
              } catch (e) {
                throw (
                  (o ||
                    (("string" == typeof e || e instanceof Error) &&
                      n.recordException(e),
                    n.setStatus({ code: oX.s.ERROR })),
                  e)
                );
              } finally {
                if (!o) {
                  if (((o = !0), ah.ctx)) {
                    let e = ob.stop(l),
                      t = ah.ctx.machine;
                    n.setAttributes({
                      [aa.USAGE_DURATION_MS]: e.cpuTime,
                      [aa.USAGE_COST_IN_CENTS]: t?.centsPerMs
                        ? e.cpuTime * t.centsPerMs
                        : 0,
                    });
                  }
                  n.end(ol.preciseNow());
                }
              }
            },
          );
        }
        startSpan(e, t, r) {
          let n = r ?? aC._.active(),
            i = t?.attributes ?? {},
            a = this.tracer.startSpan(e, t, r);
          return (
            this.tracer
              .startSpan(
                e,
                {
                  ...t,
                  attributes: {
                    ...i,
                    [aa.SPAN_PARTIAL]: !0,
                    [aa.SPAN_ID]: a.spanContext().spanId,
                  },
                },
                n,
              )
              .end(),
            a
          );
        }
      }
      let o3 = new o9({ name: "@trigger.dev/sdk", version: "3.3.17" });
      var o5 = "http.status_code";
      let o6 = (e) =>
          "string" == typeof e
            ? new URL(e)
            : e instanceof URL
              ? e
              : new URL(e.url),
        o8 = (e, t) =>
          "string" == typeof e || e instanceof URL
            ? (t?.method || "GET").toUpperCase()
            : (e.method ?? t?.method ?? "GET").toUpperCase();
      class o7 extends Error {
        originalError;
        span;
        constructor(e, t) {
          super("Fetch error"), (this.originalError = e), (this.span = t);
        }
      }
      let le = async (e, t) => {
          let r = Object.keys(t),
            n = e.clone();
          for (let i = 0; i < r.length; i++) {
            let a = r[i];
            if (!a) continue;
            let s = t[a];
            if (s && lt(e.status, a)) {
              if (s.bodyFilter) {
                let e = ln(await n.text());
                if (
                  !e ||
                  !(function e(t, r) {
                    if (null == t)
                      if (0 === Object.entries(r).length) return !0;
                      else return !1;
                    for (let [n, i] of Object.entries(r)) {
                      let r = t[n];
                      if (Array.isArray(i)) {
                        if (0 === i.length) continue;
                        if (
                          i.every((e) => "string" == typeof e) ||
                          i.every((e) => "number" == typeof e) ||
                          i.every((e) => "boolean" == typeof e)
                        ) {
                          if (i.includes(r)) continue;
                          return !1;
                        }
                        if (
                          !(function (e, t) {
                            for (let i of t) {
                              var r, n;
                              if (
                                "object" == typeof i &&
                                ((r = e),
                                "$endsWith" in (n = i)
                                  ? !(
                                      "string" == typeof r &&
                                      r.endsWith(n.$endsWith)
                                    )
                                  : "$startsWith" in n
                                    ? !(
                                        "string" == typeof r &&
                                        r.startsWith(n.$startsWith)
                                      )
                                    : "$anythingBut" in n
                                      ? !!(
                                          Array.isArray(n.$anythingBut) &&
                                          n.$anythingBut.includes(r)
                                        ) || n.$anythingBut === r
                                      : "$exists" in n
                                        ? n.$exists
                                          ? void 0 === r
                                          : void 0 !== r
                                        : "$gt" in n
                                          ? "number" != typeof r || !(r > n.$gt)
                                          : "$lt" in n
                                            ? "number" != typeof r ||
                                              !(r < n.$lt)
                                            : "$gte" in n
                                              ? "number" != typeof r ||
                                                !(r >= n.$gte)
                                              : "$lte" in n
                                                ? "number" != typeof r ||
                                                  !(r <= n.$lte)
                                                : "$between" in n
                                                  ? "number" != typeof r ||
                                                    !(r >= n.$between[0]) ||
                                                    !(r <= n.$between[1])
                                                  : "$includes" in n
                                                    ? !(
                                                        !!Array.isArray(r) &&
                                                        r.includes(n.$includes)
                                                      )
                                                    : "$ignoreCaseEquals" in n
                                                      ? "string" != typeof r ||
                                                        0 !==
                                                          r.localeCompare(
                                                            n.$ignoreCaseEquals,
                                                            void 0,
                                                            {
                                                              sensitivity:
                                                                "accent",
                                                            },
                                                          )
                                                      : "$isNull" in n
                                                        ? n.$isNull
                                                          ? null !== r
                                                          : null === r
                                                        : "$not" in n &&
                                                          (Array.isArray(r)
                                                            ? !!r.includes(
                                                                n.$not,
                                                              )
                                                            : ("number" !=
                                                                typeof r &&
                                                                "boolean" !=
                                                                  typeof r &&
                                                                "string" !=
                                                                  typeof r) ||
                                                              r === n.$not))
                              )
                                return !1;
                            }
                            return !0;
                          })(r, i)
                        )
                          return !1;
                        continue;
                      }
                      if ("object" == typeof i) {
                        if (Array.isArray(r)) {
                          if (!r.some((t) => e(t, i))) return !1;
                        } else if (!e(r, i)) return !1;
                      }
                    }
                    return !0;
                  })(e, s.bodyFilter)
                )
                  continue;
              }
              return s;
            }
          }
        },
        lt = (e, t) => {
          if ("all" === t) return !0;
          if (t.includes(","))
            return t
              .split(",")
              .map((e) => e.trim())
              .some((t) => lt(e, t));
          let [r, n] = t.split("-");
          if (n) return e >= parseInt(r ?? "0", 10) && e <= parseInt(n, 10);
          if (r?.endsWith("xx")) {
            let t = r.slice(0, -2);
            return Math.floor(e / 100).toString() === t;
          }
          if (!r) return !1;
          let i = e.toString(),
            a = r.slice(0, -1);
          return (
            !!(r.endsWith("x") && i.startsWith(a)) || e === parseInt(r, 10)
          );
        },
        lr = (e) => {
          let t = {},
            r = (e) => e.toLowerCase();
          return (
            e.forEach((e, n) => {
              t[`http.response.header.${r(n)}`] = e;
            }),
            t
          );
        },
        ln = (e) => {
          try {
            return JSON.parse(e);
          } catch (e) {
            return null;
          }
        },
        li = (e, t, r) => (e && void 0 !== e[t] && null !== e[t] ? e[t] : r),
        la = (e, t) => {
          let r = o6(e);
          return {
            "http.method": o8(e, t),
            "http.url": r.href,
            "http.host": r.hostname,
            "server.host": r.hostname,
            "server.port": r.port,
            "http.scheme": r.protocol.replace(":", ""),
            ...aM({
              items: [{ text: r.hostname, variant: "normal" }],
              style: "codepath",
            }),
          };
        },
        ls = (e) => ({
          [o5]: e.status,
          "http.status_text": e.statusText,
          "http.response_content_length":
            e.headers.get("content-length") || "0",
          ...lr(e.headers),
        });
      var lo = r(72759);
      let ll = {
        retrieve: function (e, t) {
          let r = se.clientOrThrow(),
            n = or(
              {
                tracer: o3,
                name: "runs.retrieve()",
                icon: "runs",
                attributes: {
                  runId: "string" == typeof e ? e : e.id,
                  ...aM({
                    items: [
                      {
                        text: "string" == typeof e ? e : e.id,
                        variant: "normal",
                      },
                    ],
                    style: "codepath",
                  }),
                },
                prepareData: lu,
              },
              t,
            ),
            i = "string" == typeof e ? e : e.id;
          return r.retrieveRun(i, n);
        },
        poll: lc,
      };
      async function lu(e) {
        let t = { ...e };
        if (e.payloadPresignedUrl && e.outputPresignedUrl) {
          let [r, n] = await Promise.all([
            ss(e.payloadPresignedUrl, o3),
            ss(e.outputPresignedUrl, o3),
          ]);
          (t.payload = r), (t.output = n);
        } else
          e.payloadPresignedUrl
            ? (t.payload = await ss(e.payloadPresignedUrl, o3))
            : e.outputPresignedUrl &&
              (t.output = await ss(e.outputPresignedUrl, o3));
        return t;
      }
      async function lc(e, t, r) {
        let n = 0;
        for (; n++ < 500; ) {
          let n = await ll.retrieve(e, r);
          if (n.isCompleted) return n;
          await new Promise((e) => setTimeout(e, t?.pollIntervalMs ?? 1e3));
        }
        throw Error(
          `Run ${"string" == typeof e ? e : e.id} did not complete after 500 attempts`,
        );
      }
      async function ld(e, t, r, n) {
        return await lm("tasks.trigger()", e, t, void 0, r, n);
      }
      async function lp(e, t, r, n) {
        return await lb("tasks.batchTriggerAndWait()", e, t, void 0, r, n);
      }
      async function lh(e, t, r, n) {
        let i = await ld(e, t, r, n);
        return ll.poll(i, r, n);
      }
      async function lg(e, t, r, n) {
        return await lf("tasks.batchTrigger()", e, t, r, void 0, n);
      }
      async function lm(e, t, r, n, i, a) {
        let s = se.clientOrThrow(),
          o = n ? await n(r) : r,
          l = await sn(o);
        return await s.triggerTask(
          t,
          {
            payload: l.data,
            options: {
              queue: i?.queue,
              concurrencyKey: i?.concurrencyKey,
              test: ah.ctx?.run.isTest,
              payloadType: l.dataType,
              idempotencyKey: await oz(i?.idempotencyKey),
              idempotencyKeyTTL: i?.idempotencyKeyTTL,
              delay: i?.delay,
              ttl: i?.ttl,
              tags: i?.tags,
              maxAttempts: i?.maxAttempts,
              parentAttempt: ah.ctx?.attempt.id,
              metadata: i?.metadata,
              maxDuration: i?.maxDuration,
              machine: i?.machine,
              lockToVersion: i?.version ?? a5("TRIGGER_VERSION"),
            },
          },
          { spanParentAsLink: !0 },
          {
            name: e,
            tracer: o3,
            icon: "trigger",
            onResponseBody: (e, t) => {
              e &&
                "object" == typeof e &&
                !Array.isArray(e) &&
                "id" in e &&
                "string" == typeof e.id &&
                t.setAttribute("runId", e.id);
            },
            ...a,
          },
        );
      }
      async function lf(e, t, r, n, i, a, s) {
        let o = se.clientOrThrow(),
          l = await o.batchTriggerV2(
            {
              items: await Promise.all(
                r.map(async (e) => {
                  let r = i ? await i(e.payload) : e.payload,
                    n = await sn(r);
                  return {
                    task: t,
                    payload: n.data,
                    options: {
                      queue: e.options?.queue ?? s,
                      concurrencyKey: e.options?.concurrencyKey,
                      test: ah.ctx?.run.isTest,
                      payloadType: n.dataType,
                      idempotencyKey: await oz(e.options?.idempotencyKey),
                      idempotencyKeyTTL: e.options?.idempotencyKeyTTL,
                      delay: e.options?.delay,
                      ttl: e.options?.ttl,
                      tags: e.options?.tags,
                      maxAttempts: e.options?.maxAttempts,
                      parentAttempt: ah.ctx?.attempt.id,
                      metadata: e.options?.metadata,
                      maxDuration: e.options?.maxDuration,
                      machine: e.options?.machine,
                      lockToVersion:
                        e.options?.version ?? a5("TRIGGER_VERSION"),
                    },
                  };
                }),
              ),
            },
            {
              spanParentAsLink: !0,
              idempotencyKey: await oz(n?.idempotencyKey),
              idempotencyKeyTTL: n?.idempotencyKeyTTL,
              processingStrategy: n?.triggerSequentially
                ? "sequential"
                : void 0,
            },
            {
              name: e,
              tracer: o3,
              icon: "trigger",
              onResponseBody(e, t) {
                e &&
                  "object" == typeof e &&
                  !Array.isArray(e) &&
                  ("id" in e &&
                    "string" == typeof e.id &&
                    t.setAttribute("batchId", e.id),
                  "runs" in e &&
                    Array.isArray(e.runs) &&
                    t.setAttribute("runCount", e.runs.length),
                  "isCached" in e &&
                    "boolean" == typeof e.isCached &&
                    (e.isCached &&
                      console.warn(
                        "Result is a cached response because the request was idempotent.",
                      ),
                    t.setAttribute("isCached", e.isCached)),
                  "idempotencyKey" in e &&
                    "string" == typeof e.idempotencyKey &&
                    t.setAttribute("idempotencyKey", e.idempotencyKey));
              },
              ...a,
            },
          );
        return {
          batchId: l.id,
          isCached: l.isCached,
          idempotencyKey: l.idempotencyKey,
          runs: l.runs,
          publicAccessToken: l.publicAccessToken,
        };
      }
      async function ly(e, t, r, n, i, a) {
        let s = ah.ctx;
        if (!s)
          throw Error(
            "triggerAndWait can only be used from inside a task.run()",
          );
        let o = se.clientOrThrow(),
          l = n ? await n(r) : r,
          u = await sn(l);
        return await o3.startActiveSpan(
          e,
          async (e) => {
            let r = await o.triggerTask(
              t,
              {
                payload: u.data,
                options: {
                  dependentAttempt: s.attempt.id,
                  lockToVersion: ah.worker?.version,
                  queue: i?.queue,
                  concurrencyKey: i?.concurrencyKey,
                  test: ah.ctx?.run.isTest,
                  payloadType: u.dataType,
                  delay: i?.delay,
                  ttl: i?.ttl,
                  tags: i?.tags,
                  maxAttempts: i?.maxAttempts,
                  metadata: i?.metadata,
                  maxDuration: i?.maxDuration,
                  machine: i?.machine,
                },
              },
              {},
              a,
            );
            e.setAttribute("runId", r.id);
            let n = await oT.waitForTask({ id: r.id, ctx: s });
            return await l_(n, t);
          },
          {
            kind: lo.v.PRODUCER,
            attributes: {
              [aa.STYLE_ICON]: "trigger",
              ...aM({
                items: [{ text: t, variant: "normal" }],
                style: "codepath",
              }),
            },
          },
        );
      }
      async function lb(e, t, r, n, i, a, s) {
        let o = ah.ctx;
        if (!o)
          throw Error(
            "batchTriggerAndWait can only be used from inside a task.run()",
          );
        let l = se.clientOrThrow();
        return await o3.startActiveSpan(
          e,
          async (e) => {
            let u = await l.batchTriggerV2(
              {
                items: await Promise.all(
                  r.map(async (e) => {
                    let r = n ? await n(e.payload) : e.payload,
                      i = await sn(r);
                    return {
                      task: t,
                      payload: i.data,
                      options: {
                        lockToVersion: ah.worker?.version,
                        queue: e.options?.queue ?? s,
                        concurrencyKey: e.options?.concurrencyKey,
                        test: ah.ctx?.run.isTest,
                        payloadType: i.dataType,
                        delay: e.options?.delay,
                        ttl: e.options?.ttl,
                        tags: e.options?.tags,
                        maxAttempts: e.options?.maxAttempts,
                        metadata: e.options?.metadata,
                        maxDuration: e.options?.maxDuration,
                        machine: e.options?.machine,
                      },
                    };
                  }),
                ),
                dependentAttempt: o.attempt.id,
              },
              {
                processingStrategy: i?.triggerSequentially
                  ? "sequential"
                  : void 0,
              },
              a,
            );
            e.setAttribute("batchId", u.id),
              e.setAttribute("runCount", u.runs.length),
              e.setAttribute("isCached", u.isCached),
              u.isCached &&
                console.warn(
                  "Result is a cached response because the request was idempotent.",
                ),
              u.idempotencyKey &&
                e.setAttribute("idempotencyKey", u.idempotencyKey);
            let c = await oT.waitForBatch({
                id: u.id,
                runs: u.runs.map((e) => e.id),
                ctx: o,
              }),
              d = await lv(c.items, t);
            return { id: c.id, runs: d };
          },
          {
            kind: lo.v.PRODUCER,
            attributes: {
              [aa.STYLE_ICON]: "trigger",
              ...aM({
                items: [{ text: t, variant: "normal" }],
                style: "codepath",
              }),
            },
          },
        );
      }
      async function lv(e, t) {
        return e.some((e) => e.ok && "application/store" === e.outputType)
          ? await o3.startActiveSpan(
              "store.downloadPayloads",
              async (r) =>
                await Promise.all(e.map(async (e) => await l_(e, t))),
              { kind: lo.v.INTERNAL, [aa.STYLE_ICON]: "cloud-download" },
            )
          : await Promise.all(e.map(async (e) => await l_(e, t)));
      }
      async function l_(e, t) {
        if (!e.ok)
          return {
            ok: !1,
            id: e.id,
            taskIdentifier: e.taskIdentifier ?? t,
            error: (function (e) {
              switch (e.type) {
                case "BUILT_IN_ERROR": {
                  let t = Error(e.message);
                  return (t.name = e.name), (t.stack = e.stackTrace), t;
                }
                case "STRING_ERROR":
                  return e.raw;
                case "CUSTOM_ERROR":
                  return JSON.parse(e.raw);
                case "INTERNAL_ERROR": {
                  let t = Error(e.message ?? `Internal error (${e.code})`);
                  return (t.name = e.code), (t.stack = e.stackTrace), t;
                }
              }
            })(e.error),
          };
        {
          let r = { data: e.output, dataType: e.outputType },
            n = await sa(r, o3);
          return {
            ok: !0,
            id: e.id,
            taskIdentifier: e.taskIdentifier ?? t,
            output: await st(n),
          };
        }
      }
      let lk = {
        trigger: ld,
        triggerAndPoll: lh,
        batchTrigger: lg,
        triggerAndWait: function (e, t, r, n) {
          return new oH((i, a) => {
            ly("tasks.triggerAndWait()", e, t, void 0, r, n)
              .then((e) => {
                i(e);
              })
              .catch((e) => {
                a(e);
              });
          }, e);
        },
        batchTriggerAndWait: lp,
      };
      oS.parent, oS.root;
      let lT = {
        set: function (e, t) {
          return oS.set(e, t), lT;
        },
        del: function (e) {
          return oS.del(e), lT;
        },
        append: function (e, t) {
          return oS.append(e, t), lT;
        },
        remove: function (e, t) {
          return oS.remove(e, t), lT;
        },
        increment: function (e, t = 1) {
          return oS.increment(e, t), lT;
        },
        decrement: function (e, t = 1) {
          return oS.decrement(e, t), lT;
        },
        flush: lE,
      };
      async function lE(e) {
        let t = or(
          { tracer: o3, name: "metadata.flush()", icon: "code-plus" },
          e,
        );
        await oS.flush(t);
      }
      ({ ...lT }), o$.signal;
      var lj = r(27758);
      class lw extends Error {
        constructor(e) {
          super(e), (this.name = "WebhookError");
        }
      }
      function lI(e) {
        let t = [];
        for (let [r, n] of Object.entries(e))
          if (n) {
            if ("boolean" == typeof n && n) t.push(r);
            else if ("object" == typeof n)
              for (let [e, i] of Object.entries(n))
                if (Array.isArray(i)) for (let n of i) t.push(`${r}:${e}:${n}`);
                else
                  "string" == typeof i
                    ? t.push(`${r}:${e}:${i}`)
                    : "boolean" == typeof i && i && t.push(`${r}:${e}`);
          }
        return t;
      }
    },
    33260: (e, t, r) => {
      var n;
      !(function () {
        var i =
            Object.assign ||
            function (e) {
              for (var t, r = 1; r < arguments.length; r++)
                for (var n in (t = arguments[r])) m(t, n) && (e[n] = t[n]);
              return e;
            },
          a =
            Array.isArray ||
            function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            },
          s = l(
            function (e) {
              return 1 === e ? "χρόνος" : "χρόνια";
            },
            function (e) {
              return 1 === e ? "μήνας" : "μήνες";
            },
            function (e) {
              return 1 === e ? "εβδομάδα" : "εβδομάδες";
            },
            function (e) {
              return 1 === e ? "μέρα" : "μέρες";
            },
            function (e) {
              return 1 === e ? "ώρα" : "ώρες";
            },
            function (e) {
              return 1 === e ? "λεπτό" : "λεπτά";
            },
            function (e) {
              return 1 === e ? "δευτερόλεπτο" : "δευτερόλεπτα";
            },
            function (e) {
              return (1 === e ? "χιλιοστό" : "χιλιοστά") + " του δευτερολέπτου";
            },
            ",",
          ),
          o = {
            af: l(
              "jaar",
              function (e) {
                return "maand" + (1 === e ? "" : "e");
              },
              function (e) {
                return 1 === e ? "week" : "weke";
              },
              function (e) {
                return 1 === e ? "dag" : "dae";
              },
              function (e) {
                return 1 === e ? "uur" : "ure";
              },
              function (e) {
                return 1 === e ? "minuut" : "minute";
              },
              function (e) {
                return "sekonde" + (1 === e ? "" : "s");
              },
              function (e) {
                return "millisekonde" + (1 === e ? "" : "s");
              },
              ",",
            ),
            am: l("ዓመት", "ወር", "ሳምንት", "ቀን", "ሰዓት", "ደቂቃ", "ሰከንድ", "ሚሊሰከንድ"),
            ar: i(
              l(
                function (e) {
                  return ["سنة", "سنتان", "سنوات"][u(e)];
                },
                function (e) {
                  return ["شهر", "شهران", "أشهر"][u(e)];
                },
                function (e) {
                  return ["أسبوع", "أسبوعين", "أسابيع"][u(e)];
                },
                function (e) {
                  return ["يوم", "يومين", "أيام"][u(e)];
                },
                function (e) {
                  return ["ساعة", "ساعتين", "ساعات"][u(e)];
                },
                function (e) {
                  return ["دقيقة", "دقيقتان", "دقائق"][u(e)];
                },
                function (e) {
                  return ["ثانية", "ثانيتان", "ثواني"][u(e)];
                },
                function (e) {
                  return [
                    "جزء من الثانية",
                    "جزآن من الثانية",
                    "أجزاء من الثانية",
                  ][u(e)];
                },
                ",",
              ),
              {
                delimiter: " ﻭ ",
                _hideCountIf2: !0,
                _digitReplacements: [
                  "۰",
                  "١",
                  "٢",
                  "٣",
                  "٤",
                  "٥",
                  "٦",
                  "٧",
                  "٨",
                  "٩",
                ],
              },
            ),
            bg: l(
              function (e) {
                return ["години", "година", "години"][d(e)];
              },
              function (e) {
                return ["месеца", "месец", "месеца"][d(e)];
              },
              function (e) {
                return ["седмици", "седмица", "седмици"][d(e)];
              },
              function (e) {
                return ["дни", "ден", "дни"][d(e)];
              },
              function (e) {
                return ["часа", "час", "часа"][d(e)];
              },
              function (e) {
                return ["минути", "минута", "минути"][d(e)];
              },
              function (e) {
                return ["секунди", "секунда", "секунди"][d(e)];
              },
              function (e) {
                return ["милисекунди", "милисекунда", "милисекунди"][d(e)];
              },
              ",",
            ),
            bn: l(
              "বছর",
              "মাস",
              "সপ্তাহ",
              "দিন",
              "ঘন্টা",
              "মিনিট",
              "সেকেন্ড",
              "মিলিসেকেন্ড",
            ),
            ca: l(
              function (e) {
                return "any" + (1 === e ? "" : "s");
              },
              function (e) {
                return "mes" + (1 === e ? "" : "os");
              },
              function (e) {
                return "setman" + (1 === e ? "a" : "es");
              },
              function (e) {
                return "di" + (1 === e ? "a" : "es");
              },
              function (e) {
                return "hor" + (1 === e ? "a" : "es");
              },
              function (e) {
                return "minut" + (1 === e ? "" : "s");
              },
              function (e) {
                return "segon" + (1 === e ? "" : "s");
              },
              function (e) {
                return "milisegon" + (1 === e ? "" : "s");
              },
              ",",
            ),
            ckb: l(
              "ساڵ",
              "مانگ",
              "هەفتە",
              "ڕۆژ",
              "کاژێر",
              "خولەک",
              "چرکە",
              "میلی چرکە",
              ".",
            ),
            cs: l(
              function (e) {
                return ["rok", "roku", "roky", "let"][p(e)];
              },
              function (e) {
                return ["měs\xedc", "měs\xedce", "měs\xedce", "měs\xedců"][
                  p(e)
                ];
              },
              function (e) {
                return ["t\xfdden", "t\xfddne", "t\xfddny", "t\xfddnů"][p(e)];
              },
              function (e) {
                return ["den", "dne", "dny", "dn\xed"][p(e)];
              },
              function (e) {
                return ["hodina", "hodiny", "hodiny", "hodin"][p(e)];
              },
              function (e) {
                return ["minuta", "minuty", "minuty", "minut"][p(e)];
              },
              function (e) {
                return ["sekunda", "sekundy", "sekundy", "sekund"][p(e)];
              },
              function (e) {
                return [
                  "milisekunda",
                  "milisekundy",
                  "milisekundy",
                  "milisekund",
                ][p(e)];
              },
              ",",
            ),
            cy: l(
              "flwyddyn",
              "mis",
              "wythnos",
              "diwrnod",
              "awr",
              "munud",
              "eiliad",
              "milieiliad",
            ),
            da: l(
              "\xe5r",
              function (e) {
                return "m\xe5ned" + (1 === e ? "" : "er");
              },
              function (e) {
                return "uge" + (1 === e ? "" : "r");
              },
              function (e) {
                return "dag" + (1 === e ? "" : "e");
              },
              function (e) {
                return "time" + (1 === e ? "" : "r");
              },
              function (e) {
                return "minut" + (1 === e ? "" : "ter");
              },
              function (e) {
                return "sekund" + (1 === e ? "" : "er");
              },
              function (e) {
                return "millisekund" + (1 === e ? "" : "er");
              },
              ",",
            ),
            de: l(
              function (e) {
                return "Jahr" + (1 === e ? "" : "e");
              },
              function (e) {
                return "Monat" + (1 === e ? "" : "e");
              },
              function (e) {
                return "Woche" + (1 === e ? "" : "n");
              },
              function (e) {
                return "Tag" + (1 === e ? "" : "e");
              },
              function (e) {
                return "Stunde" + (1 === e ? "" : "n");
              },
              function (e) {
                return "Minute" + (1 === e ? "" : "n");
              },
              function (e) {
                return "Sekunde" + (1 === e ? "" : "n");
              },
              function (e) {
                return "Millisekunde" + (1 === e ? "" : "n");
              },
              ",",
            ),
            el: s,
            en: l(
              function (e) {
                return "year" + (1 === e ? "" : "s");
              },
              function (e) {
                return "month" + (1 === e ? "" : "s");
              },
              function (e) {
                return "week" + (1 === e ? "" : "s");
              },
              function (e) {
                return "day" + (1 === e ? "" : "s");
              },
              function (e) {
                return "hour" + (1 === e ? "" : "s");
              },
              function (e) {
                return "minute" + (1 === e ? "" : "s");
              },
              function (e) {
                return "second" + (1 === e ? "" : "s");
              },
              function (e) {
                return "millisecond" + (1 === e ? "" : "s");
              },
            ),
            eo: l(
              function (e) {
                return "jaro" + (1 === e ? "" : "j");
              },
              function (e) {
                return "monato" + (1 === e ? "" : "j");
              },
              function (e) {
                return "semajno" + (1 === e ? "" : "j");
              },
              function (e) {
                return "tago" + (1 === e ? "" : "j");
              },
              function (e) {
                return "horo" + (1 === e ? "" : "j");
              },
              function (e) {
                return "minuto" + (1 === e ? "" : "j");
              },
              function (e) {
                return "sekundo" + (1 === e ? "" : "j");
              },
              function (e) {
                return "milisekundo" + (1 === e ? "" : "j");
              },
              ",",
            ),
            es: l(
              function (e) {
                return "a\xf1o" + (1 === e ? "" : "s");
              },
              function (e) {
                return "mes" + (1 === e ? "" : "es");
              },
              function (e) {
                return "semana" + (1 === e ? "" : "s");
              },
              function (e) {
                return "d\xeda" + (1 === e ? "" : "s");
              },
              function (e) {
                return "hora" + (1 === e ? "" : "s");
              },
              function (e) {
                return "minuto" + (1 === e ? "" : "s");
              },
              function (e) {
                return "segundo" + (1 === e ? "" : "s");
              },
              function (e) {
                return "milisegundo" + (1 === e ? "" : "s");
              },
              ",",
            ),
            et: l(
              function (e) {
                return "aasta" + (1 === e ? "" : "t");
              },
              function (e) {
                return "kuu" + (1 === e ? "" : "d");
              },
              function (e) {
                return "n\xe4dal" + (1 === e ? "" : "at");
              },
              function (e) {
                return "p\xe4ev" + (1 === e ? "" : "a");
              },
              function (e) {
                return "tund" + (1 === e ? "" : "i");
              },
              function (e) {
                return "minut" + (1 === e ? "" : "it");
              },
              function (e) {
                return "sekund" + (1 === e ? "" : "it");
              },
              function (e) {
                return "millisekund" + (1 === e ? "" : "it");
              },
              ",",
            ),
            eu: l(
              "urte",
              "hilabete",
              "aste",
              "egun",
              "ordu",
              "minutu",
              "segundo",
              "milisegundo",
              ",",
            ),
            fa: l(
              "سال",
              "ماه",
              "هفته",
              "روز",
              "ساعت",
              "دقیقه",
              "ثانیه",
              "میلی ثانیه",
            ),
            fi: l(
              function (e) {
                return 1 === e ? "vuosi" : "vuotta";
              },
              function (e) {
                return 1 === e ? "kuukausi" : "kuukautta";
              },
              function (e) {
                return "viikko" + (1 === e ? "" : "a");
              },
              function (e) {
                return "p\xe4iv\xe4" + (1 === e ? "" : "\xe4");
              },
              function (e) {
                return "tunti" + (1 === e ? "" : "a");
              },
              function (e) {
                return "minuutti" + (1 === e ? "" : "a");
              },
              function (e) {
                return "sekunti" + (1 === e ? "" : "a");
              },
              function (e) {
                return "millisekunti" + (1 === e ? "" : "a");
              },
              ",",
            ),
            fo: l(
              "\xe1r",
              function (e) {
                return 1 === e ? "m\xe1na\xf0ur" : "m\xe1na\xf0ir";
              },
              function (e) {
                return 1 === e ? "vika" : "vikur";
              },
              function (e) {
                return 1 === e ? "dagur" : "dagar";
              },
              function (e) {
                return 1 === e ? "t\xedmi" : "t\xedmar";
              },
              function (e) {
                return 1 === e ? "minuttur" : "minuttir";
              },
              "sekund",
              "millisekund",
              ",",
            ),
            fr: l(
              function (e) {
                return "an" + (e >= 2 ? "s" : "");
              },
              "mois",
              function (e) {
                return "semaine" + (e >= 2 ? "s" : "");
              },
              function (e) {
                return "jour" + (e >= 2 ? "s" : "");
              },
              function (e) {
                return "heure" + (e >= 2 ? "s" : "");
              },
              function (e) {
                return "minute" + (e >= 2 ? "s" : "");
              },
              function (e) {
                return "seconde" + (e >= 2 ? "s" : "");
              },
              function (e) {
                return "milliseconde" + (e >= 2 ? "s" : "");
              },
              ",",
            ),
            gr: s,
            he: l(
              function (e) {
                return 1 === e ? "שנה" : "שנים";
              },
              function (e) {
                return 1 === e ? "חודש" : "חודשים";
              },
              function (e) {
                return 1 === e ? "שבוע" : "שבועות";
              },
              function (e) {
                return 1 === e ? "יום" : "ימים";
              },
              function (e) {
                return 1 === e ? "שעה" : "שעות";
              },
              function (e) {
                return 1 === e ? "דקה" : "דקות";
              },
              function (e) {
                return 1 === e ? "שניה" : "שניות";
              },
              function (e) {
                return 1 === e ? "מילישנייה" : "מילישניות";
              },
            ),
            hr: l(
              function (e) {
                return e % 10 == 2 || e % 10 == 3 || e % 10 == 4
                  ? "godine"
                  : "godina";
              },
              function (e) {
                return 1 === e
                  ? "mjesec"
                  : 2 === e || 3 === e || 4 === e
                    ? "mjeseca"
                    : "mjeseci";
              },
              function (e) {
                return e % 10 == 1 && 11 !== e ? "tjedan" : "tjedna";
              },
              function (e) {
                return 1 === e ? "dan" : "dana";
              },
              function (e) {
                return 1 === e
                  ? "sat"
                  : 2 === e || 3 === e || 4 === e
                    ? "sata"
                    : "sati";
              },
              function (e) {
                var t = e % 10;
                return (2 === t || 3 === t || 4 === t) && (e < 10 || e > 14)
                  ? "minute"
                  : "minuta";
              },
              function (e) {
                var t = e % 10;
                if (5 === t || (Math.floor(e) === e && e >= 10 && e <= 19));
                else if (1 === t) return "sekunda";
                else if (2 === t || 3 === t || 4 === t) return "sekunde";
                return "sekundi";
              },
              function (e) {
                return 1 === e
                  ? "milisekunda"
                  : e % 10 == 2 || e % 10 == 3 || e % 10 == 4
                    ? "milisekunde"
                    : "milisekundi";
              },
              ",",
            ),
            hi: l(
              "साल",
              function (e) {
                return 1 === e ? "महीना" : "महीने";
              },
              function (e) {
                return 1 === e ? "हफ़्ता" : "हफ्ते";
              },
              "दिन",
              function (e) {
                return 1 === e ? "घंटा" : "घंटे";
              },
              "मिनट",
              "सेकंड",
              "मिलीसेकंड",
            ),
            hu: l(
              "\xe9v",
              "h\xf3nap",
              "h\xe9t",
              "nap",
              "\xf3ra",
              "perc",
              "m\xe1sodperc",
              "ezredm\xe1sodperc",
              ",",
            ),
            id: l(
              "tahun",
              "bulan",
              "minggu",
              "hari",
              "jam",
              "menit",
              "detik",
              "milidetik",
            ),
            is: l(
              "\xe1r",
              function (e) {
                return "m\xe1nu\xf0" + (1 === e ? "ur" : "ir");
              },
              function (e) {
                return "vik" + (1 === e ? "a" : "ur");
              },
              function (e) {
                return "dag" + (1 === e ? "ur" : "ar");
              },
              function (e) {
                return "klukkut\xedm" + (1 === e ? "i" : "ar");
              },
              function (e) {
                return "m\xedn\xfat" + (1 === e ? "a" : "ur");
              },
              function (e) {
                return "sek\xfand" + (1 === e ? "a" : "ur");
              },
              function (e) {
                return "millisek\xfand" + (1 === e ? "a" : "ur");
              },
            ),
            it: l(
              function (e) {
                return "ann" + (1 === e ? "o" : "i");
              },
              function (e) {
                return "mes" + (1 === e ? "e" : "i");
              },
              function (e) {
                return "settiman" + (1 === e ? "a" : "e");
              },
              function (e) {
                return "giorn" + (1 === e ? "o" : "i");
              },
              function (e) {
                return "or" + (1 === e ? "a" : "e");
              },
              function (e) {
                return "minut" + (1 === e ? "o" : "i");
              },
              function (e) {
                return "second" + (1 === e ? "o" : "i");
              },
              function (e) {
                return "millisecond" + (1 === e ? "o" : "i");
              },
              ",",
            ),
            ja: l("年", "ヶ月", "週間", "日", "時間", "分", "秒", "ミリ秒"),
            km: l(
              "ឆ្នាំ",
              "ខែ",
              "សប្តាហ៍",
              "ថ្ងៃ",
              "ម៉ោង",
              "នាទី",
              "វិនាទី",
              "មិល្លីវិនាទី",
            ),
            kn: l(
              function (e) {
                return 1 === e ? "ವರ್ಷ" : "ವರ್ಷಗಳು";
              },
              function (e) {
                return 1 === e ? "ತಿಂಗಳು" : "ತಿಂಗಳುಗಳು";
              },
              function (e) {
                return 1 === e ? "ವಾರ" : "ವಾರಗಳು";
              },
              function (e) {
                return 1 === e ? "ದಿನ" : "ದಿನಗಳು";
              },
              function (e) {
                return 1 === e ? "ಗಂಟೆ" : "ಗಂಟೆಗಳು";
              },
              function (e) {
                return 1 === e ? "ನಿಮಿಷ" : "ನಿಮಿಷಗಳು";
              },
              function (e) {
                return 1 === e ? "ಸೆಕೆಂಡ್" : "ಸೆಕೆಂಡುಗಳು";
              },
              function (e) {
                return 1 === e ? "ಮಿಲಿಸೆಕೆಂಡ್" : "ಮಿಲಿಸೆಕೆಂಡುಗಳು";
              },
            ),
            ko: l("년", "개월", "주일", "일", "시간", "분", "초", "밀리 초"),
            ku: l(
              "sal",
              "meh",
              "hefte",
              "roj",
              "seet",
              "deqe",
              "saniye",
              "m\xeel\xee\xe7irk",
              ",",
            ),
            lo: l(
              "ປີ",
              "ເດືອນ",
              "ອາທິດ",
              "ມື້",
              "ຊົ່ວໂມງ",
              "ນາທີ",
              "ວິນາທີ",
              "ມິນລິວິນາທີ",
              ",",
            ),
            lt: l(
              function (e) {
                return e % 10 == 0 || (e % 100 >= 10 && e % 100 <= 20)
                  ? "metų"
                  : "metai";
              },
              function (e) {
                return ["mėnuo", "mėnesiai", "mėnesių"][h(e)];
              },
              function (e) {
                return ["savaitė", "savaitės", "savaičių"][h(e)];
              },
              function (e) {
                return ["diena", "dienos", "dienų"][h(e)];
              },
              function (e) {
                return ["valanda", "valandos", "valandų"][h(e)];
              },
              function (e) {
                return ["minutė", "minutės", "minučių"][h(e)];
              },
              function (e) {
                return ["sekundė", "sekundės", "sekundžių"][h(e)];
              },
              function (e) {
                return ["milisekundė", "milisekundės", "milisekundžių"][h(e)];
              },
              ",",
            ),
            lv: l(
              function (e) {
                return g(e) ? "gads" : "gadi";
              },
              function (e) {
                return g(e) ? "mēnesis" : "mēneši";
              },
              function (e) {
                return g(e) ? "nedēļa" : "nedēļas";
              },
              function (e) {
                return g(e) ? "diena" : "dienas";
              },
              function (e) {
                return g(e) ? "stunda" : "stundas";
              },
              function (e) {
                return g(e) ? "minūte" : "minūtes";
              },
              function (e) {
                return g(e) ? "sekunde" : "sekundes";
              },
              function (e) {
                return g(e) ? "milisekunde" : "milisekundes";
              },
              ",",
            ),
            mk: l(
              function (e) {
                return 1 === e ? "година" : "години";
              },
              function (e) {
                return 1 === e ? "месец" : "месеци";
              },
              function (e) {
                return 1 === e ? "недела" : "недели";
              },
              function (e) {
                return 1 === e ? "ден" : "дена";
              },
              function (e) {
                return 1 === e ? "час" : "часа";
              },
              function (e) {
                return 1 === e ? "минута" : "минути";
              },
              function (e) {
                return 1 === e ? "секунда" : "секунди";
              },
              function (e) {
                return 1 === e ? "милисекунда" : "милисекунди";
              },
              ",",
            ),
            mn: l(
              "жил",
              "сар",
              "долоо хоног",
              "өдөр",
              "цаг",
              "минут",
              "секунд",
              "миллисекунд",
            ),
            mr: l(
              function (e) {
                return 1 === e ? "वर्ष" : "वर्षे";
              },
              function (e) {
                return 1 === e ? "महिना" : "महिने";
              },
              function (e) {
                return 1 === e ? "आठवडा" : "आठवडे";
              },
              "दिवस",
              "तास",
              function (e) {
                return 1 === e ? "मिनिट" : "मिनिटे";
              },
              "सेकंद",
              "मिलिसेकंद",
            ),
            ms: l(
              "tahun",
              "bulan",
              "minggu",
              "hari",
              "jam",
              "minit",
              "saat",
              "milisaat",
            ),
            nl: l(
              "jaar",
              function (e) {
                return 1 === e ? "maand" : "maanden";
              },
              function (e) {
                return 1 === e ? "week" : "weken";
              },
              function (e) {
                return 1 === e ? "dag" : "dagen";
              },
              "uur",
              function (e) {
                return 1 === e ? "minuut" : "minuten";
              },
              function (e) {
                return 1 === e ? "seconde" : "seconden";
              },
              function (e) {
                return 1 === e ? "milliseconde" : "milliseconden";
              },
              ",",
            ),
            no: l(
              "\xe5r",
              function (e) {
                return "m\xe5ned" + (1 === e ? "" : "er");
              },
              function (e) {
                return "uke" + (1 === e ? "" : "r");
              },
              function (e) {
                return "dag" + (1 === e ? "" : "er");
              },
              function (e) {
                return "time" + (1 === e ? "" : "r");
              },
              function (e) {
                return "minutt" + (1 === e ? "" : "er");
              },
              function (e) {
                return "sekund" + (1 === e ? "" : "er");
              },
              function (e) {
                return "millisekund" + (1 === e ? "" : "er");
              },
              ",",
            ),
            pl: l(
              function (e) {
                return ["rok", "roku", "lata", "lat"][c(e)];
              },
              function (e) {
                return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][c(e)];
              },
              function (e) {
                return ["tydzień", "tygodnia", "tygodnie", "tygodni"][c(e)];
              },
              function (e) {
                return ["dzień", "dnia", "dni", "dni"][c(e)];
              },
              function (e) {
                return ["godzina", "godziny", "godziny", "godzin"][c(e)];
              },
              function (e) {
                return ["minuta", "minuty", "minuty", "minut"][c(e)];
              },
              function (e) {
                return ["sekunda", "sekundy", "sekundy", "sekund"][c(e)];
              },
              function (e) {
                return [
                  "milisekunda",
                  "milisekundy",
                  "milisekundy",
                  "milisekund",
                ][c(e)];
              },
              ",",
            ),
            pt: l(
              function (e) {
                return "ano" + (1 === e ? "" : "s");
              },
              function (e) {
                return 1 === e ? "m\xeas" : "meses";
              },
              function (e) {
                return "semana" + (1 === e ? "" : "s");
              },
              function (e) {
                return "dia" + (1 === e ? "" : "s");
              },
              function (e) {
                return "hora" + (1 === e ? "" : "s");
              },
              function (e) {
                return "minuto" + (1 === e ? "" : "s");
              },
              function (e) {
                return "segundo" + (1 === e ? "" : "s");
              },
              function (e) {
                return "milissegundo" + (1 === e ? "" : "s");
              },
              ",",
            ),
            ro: l(
              function (e) {
                return 1 === e ? "an" : "ani";
              },
              function (e) {
                return 1 === e ? "lună" : "luni";
              },
              function (e) {
                return 1 === e ? "săptăm\xe2nă" : "săptăm\xe2ni";
              },
              function (e) {
                return 1 === e ? "zi" : "zile";
              },
              function (e) {
                return 1 === e ? "oră" : "ore";
              },
              function (e) {
                return 1 === e ? "minut" : "minute";
              },
              function (e) {
                return 1 === e ? "secundă" : "secunde";
              },
              function (e) {
                return 1 === e ? "milisecundă" : "milisecunde";
              },
              ",",
            ),
            ru: l(
              function (e) {
                return ["лет", "год", "года"][d(e)];
              },
              function (e) {
                return ["месяцев", "месяц", "месяца"][d(e)];
              },
              function (e) {
                return ["недель", "неделя", "недели"][d(e)];
              },
              function (e) {
                return ["дней", "день", "дня"][d(e)];
              },
              function (e) {
                return ["часов", "час", "часа"][d(e)];
              },
              function (e) {
                return ["минут", "минута", "минуты"][d(e)];
              },
              function (e) {
                return ["секунд", "секунда", "секунды"][d(e)];
              },
              function (e) {
                return ["миллисекунд", "миллисекунда", "миллисекунды"][d(e)];
              },
              ",",
            ),
            sq: l(
              function (e) {
                return 1 === e ? "vit" : "vjet";
              },
              "muaj",
              "jav\xeb",
              "dit\xeb",
              "or\xeb",
              function (e) {
                return "minut" + (1 === e ? "\xeb" : "a");
              },
              function (e) {
                return "sekond" + (1 === e ? "\xeb" : "a");
              },
              function (e) {
                return "milisekond" + (1 === e ? "\xeb" : "a");
              },
              ",",
            ),
            sr: l(
              function (e) {
                return ["години", "година", "године"][d(e)];
              },
              function (e) {
                return ["месеци", "месец", "месеца"][d(e)];
              },
              function (e) {
                return ["недељи", "недеља", "недеље"][d(e)];
              },
              function (e) {
                return ["дани", "дан", "дана"][d(e)];
              },
              function (e) {
                return ["сати", "сат", "сата"][d(e)];
              },
              function (e) {
                return ["минута", "минут", "минута"][d(e)];
              },
              function (e) {
                return ["секунди", "секунда", "секунде"][d(e)];
              },
              function (e) {
                return ["милисекунди", "милисекунда", "милисекунде"][d(e)];
              },
              ",",
            ),
            sr_Latn: l(
              function (e) {
                return ["godini", "godina", "godine"][d(e)];
              },
              function (e) {
                return ["meseci", "mesec", "meseca"][d(e)];
              },
              function (e) {
                return ["nedelji", "nedelja", "nedelje"][d(e)];
              },
              function (e) {
                return ["dani", "dan", "dana"][d(e)];
              },
              function (e) {
                return ["sati", "sat", "sata"][d(e)];
              },
              function (e) {
                return ["minuta", "minut", "minuta"][d(e)];
              },
              function (e) {
                return ["sekundi", "sekunda", "sekunde"][d(e)];
              },
              function (e) {
                return ["milisekundi", "milisekunda", "milisekunde"][d(e)];
              },
              ",",
            ),
            ta: l(
              function (e) {
                return 1 === e ? "வருடம்" : "ஆண்டுகள்";
              },
              function (e) {
                return 1 === e ? "மாதம்" : "மாதங்கள்";
              },
              function (e) {
                return 1 === e ? "வாரம்" : "வாரங்கள்";
              },
              function (e) {
                return 1 === e ? "நாள்" : "நாட்கள்";
              },
              function (e) {
                return 1 === e ? "மணி" : "மணிநேரம்";
              },
              function (e) {
                return "நிமிட" + (1 === e ? "ம்" : "ங்கள்");
              },
              function (e) {
                return "வினாடி" + (1 === e ? "" : "கள்");
              },
              function (e) {
                return "மில்லி விநாடி" + (1 === e ? "" : "கள்");
              },
            ),
            te: l(
              function (e) {
                return "సంవత్స" + (1 === e ? "రం" : "రాల");
              },
              function (e) {
                return "నెల" + (1 === e ? "" : "ల");
              },
              function (e) {
                return 1 === e ? "వారం" : "వారాలు";
              },
              function (e) {
                return "రోజు" + (1 === e ? "" : "లు");
              },
              function (e) {
                return "గంట" + (1 === e ? "" : "లు");
              },
              function (e) {
                return 1 === e ? "నిమిషం" : "నిమిషాలు";
              },
              function (e) {
                return 1 === e ? "సెకను" : "సెకన్లు";
              },
              function (e) {
                return 1 === e ? "మిల్లీసెకన్" : "మిల్లీసెకన్లు";
              },
            ),
            uk: l(
              function (e) {
                return ["років", "рік", "роки"][d(e)];
              },
              function (e) {
                return ["місяців", "місяць", "місяці"][d(e)];
              },
              function (e) {
                return ["тижнів", "тиждень", "тижні"][d(e)];
              },
              function (e) {
                return ["днів", "день", "дні"][d(e)];
              },
              function (e) {
                return ["годин", "година", "години"][d(e)];
              },
              function (e) {
                return ["хвилин", "хвилина", "хвилини"][d(e)];
              },
              function (e) {
                return ["секунд", "секунда", "секунди"][d(e)];
              },
              function (e) {
                return ["мілісекунд", "мілісекунда", "мілісекунди"][d(e)];
              },
              ",",
            ),
            ur: l(
              "سال",
              function (e) {
                return 1 === e ? "مہینہ" : "مہینے";
              },
              function (e) {
                return 1 === e ? "ہفتہ" : "ہفتے";
              },
              "دن",
              function (e) {
                return 1 === e ? "گھنٹہ" : "گھنٹے";
              },
              "منٹ",
              "سیکنڈ",
              "ملی سیکنڈ",
            ),
            sk: l(
              function (e) {
                return ["rok", "roky", "roky", "rokov"][p(e)];
              },
              function (e) {
                return ["mesiac", "mesiace", "mesiace", "mesiacov"][p(e)];
              },
              function (e) {
                return ["t\xfdždeň", "t\xfdždne", "t\xfdždne", "t\xfdždňov"][
                  p(e)
                ];
              },
              function (e) {
                return ["deň", "dni", "dni", "dn\xed"][p(e)];
              },
              function (e) {
                return ["hodina", "hodiny", "hodiny", "hod\xedn"][p(e)];
              },
              function (e) {
                return ["min\xfata", "min\xfaty", "min\xfaty", "min\xfat"][
                  p(e)
                ];
              },
              function (e) {
                return ["sekunda", "sekundy", "sekundy", "sek\xfand"][p(e)];
              },
              function (e) {
                return [
                  "milisekunda",
                  "milisekundy",
                  "milisekundy",
                  "milisek\xfand",
                ][p(e)];
              },
              ",",
            ),
            sl: l(
              function (e) {
                return e % 10 == 1
                  ? "leto"
                  : e % 100 == 2
                    ? "leti"
                    : e % 100 == 3 ||
                        e % 100 == 4 ||
                        (Math.floor(e) !== e && e % 100 <= 5)
                      ? "leta"
                      : "let";
              },
              function (e) {
                return e % 10 == 1
                  ? "mesec"
                  : e % 100 == 2 || (Math.floor(e) !== e && e % 100 <= 5)
                    ? "meseca"
                    : e % 10 == 3 || e % 10 == 4
                      ? "mesece"
                      : "mesecev";
              },
              function (e) {
                return e % 10 == 1
                  ? "teden"
                  : e % 10 == 2 || (Math.floor(e) !== e && e % 100 <= 4)
                    ? "tedna"
                    : e % 10 == 3 || e % 10 == 4
                      ? "tedne"
                      : "tednov";
              },
              function (e) {
                return e % 100 == 1 ? "dan" : "dni";
              },
              function (e) {
                return e % 10 == 1
                  ? "ura"
                  : e % 100 == 2
                    ? "uri"
                    : e % 10 == 3 || e % 10 == 4 || Math.floor(e) !== e
                      ? "ure"
                      : "ur";
              },
              function (e) {
                return e % 10 == 1
                  ? "minuta"
                  : e % 10 == 2
                    ? "minuti"
                    : e % 10 == 3 ||
                        e % 10 == 4 ||
                        (Math.floor(e) !== e && e % 100 <= 4)
                      ? "minute"
                      : "minut";
              },
              function (e) {
                return e % 10 == 1
                  ? "sekunda"
                  : e % 100 == 2
                    ? "sekundi"
                    : e % 100 == 3 || e % 100 == 4 || Math.floor(e) !== e
                      ? "sekunde"
                      : "sekund";
              },
              function (e) {
                return e % 10 == 1
                  ? "milisekunda"
                  : e % 100 == 2
                    ? "milisekundi"
                    : e % 100 == 3 || e % 100 == 4 || Math.floor(e) !== e
                      ? "milisekunde"
                      : "milisekund";
              },
              ",",
            ),
            sv: l(
              "\xe5r",
              function (e) {
                return "m\xe5nad" + (1 === e ? "" : "er");
              },
              function (e) {
                return "veck" + (1 === e ? "a" : "or");
              },
              function (e) {
                return "dag" + (1 === e ? "" : "ar");
              },
              function (e) {
                return "timm" + (1 === e ? "e" : "ar");
              },
              function (e) {
                return "minut" + (1 === e ? "" : "er");
              },
              function (e) {
                return "sekund" + (1 === e ? "" : "er");
              },
              function (e) {
                return "millisekund" + (1 === e ? "" : "er");
              },
              ",",
            ),
            sw: i(
              l(
                function (e) {
                  return 1 === e ? "mwaka" : "miaka";
                },
                function (e) {
                  return 1 === e ? "mwezi" : "miezi";
                },
                "wiki",
                function (e) {
                  return 1 === e ? "siku" : "masiku";
                },
                function (e) {
                  return 1 === e ? "saa" : "masaa";
                },
                "dakika",
                "sekunde",
                "milisekunde",
              ),
              { _numberFirst: !0 },
            ),
            tr: l(
              "yıl",
              "ay",
              "hafta",
              "g\xfcn",
              "saat",
              "dakika",
              "saniye",
              "milisaniye",
              ",",
            ),
            th: l(
              "ปี",
              "เดือน",
              "สัปดาห์",
              "วัน",
              "ชั่วโมง",
              "นาที",
              "วินาที",
              "มิลลิวินาที",
            ),
            uz: l(
              "yil",
              "oy",
              "hafta",
              "kun",
              "soat",
              "minut",
              "sekund",
              "millisekund",
            ),
            uz_CYR: l(
              "йил",
              "ой",
              "ҳафта",
              "кун",
              "соат",
              "минут",
              "секунд",
              "миллисекунд",
            ),
            vi: l(
              "năm",
              "th\xe1ng",
              "tuần",
              "ng\xe0y",
              "giờ",
              "ph\xfat",
              "gi\xe2y",
              "mili gi\xe2y",
              ",",
            ),
            zh_CN: l("年", "个月", "周", "天", "小时", "分钟", "秒", "毫秒"),
            zh_TW: l("年", "個月", "周", "天", "小時", "分鐘", "秒", "毫秒"),
          };
        function l(e, t, r, n, i, a, s, o, l) {
          var u = { y: e, mo: t, w: r, d: n, h: i, m: a, s: s, ms: o };
          return void 0 !== l && (u.decimal = l), u;
        }
        function u(e) {
          return 2 === e ? 1 : 2 * (e > 2 && e < 11);
        }
        function c(e) {
          return 1 === e
            ? 0
            : Math.floor(e) !== e
              ? 1
              : e % 10 >= 2 && e % 10 <= 4 && !(e % 100 > 10 && e % 100 < 20)
                ? 2
                : 3;
        }
        function d(e) {
          return Math.floor(e) !== e
            ? 2
            : (e % 100 >= 5 && e % 100 <= 20) ||
                (e % 10 >= 5 && e % 10 <= 9) ||
                e % 10 == 0
              ? 0
              : e % 10 == 1
                ? 1
                : 2 * (e > 1);
        }
        function p(e) {
          return 1 === e
            ? 0
            : Math.floor(e) !== e
              ? 1
              : e % 10 >= 2 && e % 10 <= 4 && e % 100 < 10
                ? 2
                : 3;
        }
        function h(e) {
          return 1 === e || (e % 10 == 1 && e % 100 > 20)
            ? 0
            : Math.floor(e) !== e ||
                (e % 10 >= 2 && e % 100 > 20) ||
                (e % 10 >= 2 && e % 100 < 10)
              ? 1
              : 2;
        }
        function g(e) {
          return e % 10 == 1 && e % 100 != 11;
        }
        function m(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        function f(e, t, r) {
          var n,
            i,
            a,
            s,
            o = e.unitName,
            l = e.unitCount,
            u = r.spacer,
            c = r.maxDecimalPoints;
          (n = m(r, "decimal") ? r.decimal : m(t, "decimal") ? t.decimal : "."),
            "digitReplacements" in r
              ? (i = r.digitReplacements)
              : "_digitReplacements" in t && (i = t._digitReplacements);
          var d = (
            void 0 === c ? l : Math.floor(l * Math.pow(10, c)) / Math.pow(10, c)
          ).toString();
          if (t._hideCountIf2 && 2 === l) (a = ""), (u = "");
          else if (i) {
            a = "";
            for (var p = 0; p < d.length; p++) {
              var h = d[p];
              "." === h ? (a += n) : (a += i[h]);
            }
          } else a = d.replace(".", n);
          var g = t[o];
          return ((s = "function" == typeof g ? g(l) : g), t._numberFirst)
            ? s + u + a
            : a + u + s;
        }
        function y(e) {
          var t = function (e, r) {
            e = Math.abs(e);
            var n = i({}, t, r || {});
            return (function (e, t) {
              var r,
                n = (function (e) {
                  var t = [e.language];
                  if (m(e, "fallbacks"))
                    if (a(e.fallbacks) && e.fallbacks.length)
                      t = t.concat(e.fallbacks);
                    else
                      throw Error(
                        "fallbacks must be an array with at least one element",
                      );
                  for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    if (m(e.languages, n)) return e.languages[n];
                    if (m(o, n)) return o[n];
                  }
                  throw Error("No language found.");
                })(t);
              if (!e.length) {
                var i = t.units;
                return f({ unitName: i[i.length - 1], unitCount: 0 }, n, t);
              }
              var s = t.conjunction,
                l = t.serialComma;
              r = m(t, "delimiter")
                ? t.delimiter
                : m(n, "delimiter")
                  ? n.delimiter
                  : ", ";
              for (var u = [], c = 0; c < e.length; c++) u.push(f(e[c], n, t));
              return s && 1 !== e.length
                ? 2 === e.length
                  ? u.join(s)
                  : u.slice(0, -1).join(r) + (l ? "," : "") + s + u.slice(-1)
                : u.join(r);
            })(
              (function (e, t) {
                var r,
                  n,
                  i,
                  a,
                  s = t.units,
                  o = t.unitMeasures,
                  l = "largest" in t ? t.largest : 1 / 0;
                if (!s.length) return [];
                var u = {};
                for (n = 0, a = e; n < s.length; n++) {
                  var c = o[(r = s[n])];
                  (i = n === s.length - 1 ? a / c : Math.floor(a / c)),
                    (u[r] = i),
                    (a -= i * c);
                }
                if (t.round) {
                  var d = l;
                  for (n = 0; n < s.length; n++)
                    if (0 !== (i = u[(r = s[n])]) && 0 == --d) {
                      for (var p = n + 1; p < s.length; p++) {
                        var h = s[p],
                          g = u[h];
                        (u[r] += (g * o[h]) / o[r]), (u[h] = 0);
                      }
                      break;
                    }
                  for (n = s.length - 1; n >= 0; n--)
                    if (0 !== (i = u[(r = s[n])])) {
                      var m = Math.round(i);
                      if (((u[r] = m), 0 === n)) break;
                      var f = s[n - 1],
                        y = o[f],
                        b = Math.floor((m * o[r]) / y);
                      if (b) (u[f] += b), (u[r] = 0);
                      else break;
                    }
                }
                var v = [];
                for (n = 0; n < s.length && v.length < l; n++)
                  (i = u[(r = s[n])]) && v.push({ unitName: r, unitCount: i });
                return v;
              })(e, n),
              n,
            );
          };
          return i(
            t,
            {
              language: "en",
              spacer: " ",
              conjunction: "",
              serialComma: !0,
              units: ["y", "mo", "w", "d", "h", "m", "s"],
              languages: {},
              round: !1,
              unitMeasures: {
                y: 315576e5,
                mo: 26298e5,
                w: 6048e5,
                d: 864e5,
                h: 36e5,
                m: 6e4,
                s: 1e3,
                ms: 1,
              },
            },
            e,
          );
        }
        var b = i(y({}), {
          getSupportedLanguages: function () {
            var e = [];
            for (var t in o) m(o, t) && "gr" !== t && e.push(t);
            return e;
          },
          humanizer: y,
        });
        void 0 ===
          (n = function () {
            return b;
          }.call(t, r, t, e)) || (e.exports = n);
      })();
    },
    40971: (e, t) => {
      "use strict";
      var r;
      t.G = void 0;
      let n = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{4,9}Z/,
        i =
          "BigInt only available in Node >= v10.7. Consider using getFullTimeString instead.";
      !(function (e) {
        (e[(e.NEGATIVE = -1)] = "NEGATIVE"),
          (e[(e.POSITIVE = 1)] = "POSITIVE"),
          (e[(e.ZERO = 0)] = "ZERO");
      })(r || (r = {}));
      class a extends Date {
        constructor(e) {
          if (
            (super(),
            (this._micros = 0),
            (this._nanos = 0),
            e && "number" != typeof e && !(e instanceof Date))
          )
            return void this.setFullTime(a.parseFull(e));
          let t = Array.from(arguments),
            r = new Date(...t.slice(0, 7)),
            n = 9 === t.length ? t.pop() : 0,
            i = 8 === t.length ? t.pop() : 0;
          this.setTime(r.getTime()),
            this.setMicroseconds(i),
            this.setNanoseconds(n);
        }
        getFullTime() {
          if ("function" != typeof BigInt) throw Error(i);
          return BigInt(this.getFullTimeString());
        }
        getFullTimeString() {
          let e = this._getSeconds(),
            t = this._getNanos();
          return (
            t && Math.sign(e) === r.NEGATIVE && (t = 1e9 - t), `${e}${s(t, 9)}`
          );
        }
        getMicroseconds() {
          return this._micros;
        }
        getNanoseconds() {
          return this._nanos;
        }
        setMicroseconds(e) {
          let t = Math.abs(e),
            n = this.getUTCMilliseconds();
          return (
            t >= 1e3 && ((n += Math.floor(t / 1e3) * Math.sign(e)), (e %= 1e3)),
            Math.sign(e) === r.NEGATIVE && ((n -= 1), (e += 1e3)),
            (this._micros = e),
            this.setUTCMilliseconds(n),
            this.getFullTimeString()
          );
        }
        setNanoseconds(e) {
          let t = Math.abs(e),
            n = this._micros;
          return (
            t >= 1e3 && ((n += Math.floor(t / 1e3) * Math.sign(e)), (e %= 1e3)),
            Math.sign(e) === r.NEGATIVE && ((n -= 1), (e += 1e3)),
            (this._nanos = e),
            this.setMicroseconds(n)
          );
        }
        setFullTime(e) {
          "string" != typeof e && (e = e.toString());
          let t = Math.sign(Number(e)),
            r = Number((e = e.replace(/^-/, "")).substr(0, e.length - 9)) * t,
            n = Number(e.substr(-9)) * t;
          return this.setTime(1e3 * r), this.setNanoseconds(n);
        }
        setTime(e) {
          return (this._micros = 0), (this._nanos = 0), super.setTime(e);
        }
        toISOString() {
          let e = s(this._micros, 3),
            t = s(this._nanos, 3);
          return super.toISOString().replace(/z$/i, `${e}${t}Z`);
        }
        toStruct() {
          let e = this._getSeconds(),
            t = this._getNanos();
          return (
            Math.sign(e) === r.NEGATIVE && t && (e -= 1),
            { seconds: e, nanos: t }
          );
        }
        toTuple() {
          let { seconds: e, nanos: t } = this.toStruct();
          return [e, t];
        }
        _getSeconds() {
          let e = this.getTime(),
            t = Math.sign(e);
          return Math.floor(Math.abs(e) / 1e3) * t;
        }
        _getNanos() {
          let e = 1e6 * this.getUTCMilliseconds(),
            t = 1e3 * this._micros;
          return this._nanos + e + t;
        }
        static parseFull(e) {
          var t, r, i;
          let s = new a();
          if (Array.isArray(e)) {
            let [t, r] = e;
            e = { seconds: t, nanos: r };
          }
          if (
            "bigint" == typeof (t = e) ||
            ("string" == typeof t && /^\d+$/.test(t))
          )
            s.setFullTime(e);
          else {
            if (
              ("object" == typeof (r = e) && void 0 !== r.seconds) ||
              "number" == typeof r.nanos
            ) {
              let { seconds: t, nanos: r } = (function ({
                seconds: e = 0,
                nanos: t = 0,
              }) {
                return (
                  "function" == typeof e.toNumber && (e = e.toNumber()),
                  { seconds: (e = Number(e)), nanos: (t = Number(t)) }
                );
              })(e);
              s.setTime(1e3 * t), s.setNanoseconds(r);
            } else {
              "string" == typeof (i = e) && n.test(i)
                ? s.setFullTime(
                    (function (e) {
                      let t = "0";
                      e = e.replace(/\.(\d+)/, (e, r) => ((t = r), ".000"));
                      let r = Number(
                        (function (e, t) {
                          let r = o(e, 9);
                          return `${e}${r}`;
                        })(t, 9),
                      );
                      return new a(e).setNanoseconds(r);
                    })(e),
                  )
                : s.setTime(new Date(e).getTime());
            }
          }
          return s.getFullTimeString();
        }
        static fullUTC(...e) {
          if ("function" != typeof BigInt) throw Error(i);
          return BigInt(a.fullUTCString(...e));
        }
        static fullUTCString(...e) {
          let t = new a(Date.UTC(...e.slice(0, 7)));
          return (
            9 === e.length && t.setNanoseconds(e.pop()),
            8 === e.length && t.setMicroseconds(e.pop()),
            t.getFullTimeString()
          );
        }
      }
      function s(e, t) {
        let r = o(e, t);
        return `${r}${e}`;
      }
      function o(e, t) {
        let r = Math.max(t - e.toString().length, 0);
        return "0".repeat(r);
      }
      t.G = a;
    },
    54638: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(62761),
        i = r(74359),
        a = r(88041),
        s = r(1895);
      t.default = (function () {
        function e() {}
        return (
          (e.prototype.parse = function (t) {
            e.pathPattern.lastIndex = 0;
            var r = t.match(e.pathPattern),
              n = [new a.default()];
            if (null == r || 0 == r.length || (1 == r.length && "" == r[0]))
              return n;
            var i = 0;
            "$" == r[0] && (i = 1);
            for (var s = i; s < r.length; s++) {
              var o = r[s],
                l = this.parseComponent(o);
              n.push(l);
            }
            return n;
          }),
          (e.prototype.parsePointer = function (t) {
            e.pathPattern.lastIndex = 0;
            var r = t.match(e.pointerPattern),
              n = [new a.default()];
            if (null == r || 0 == r.length || (1 == r.length && "" == r[0]))
              return n;
            for (var i = 0; i < r.length; i++) {
              var s = r[i];
              n.push(this.parseComponent(s));
            }
            return n;
          }),
          (e.prototype.parseComponent = function (e) {
            var t = i.WildcardPathComponent.fromString(e);
            if (null != t) return t;
            if (null == e) throw SyntaxError("Cannot create a path from null");
            if ("" == e)
              throw SyntaxError("Cannot create a path from an empty string");
            var r = s.SlicePathComponent.fromString(e);
            return null != r ? r : n.SimpleKeyPathComponent.fromString(e);
          }),
          (e.pathPattern = /(?:[^\.\\]|\\.)+/g),
          (e.pointerPattern = /(?:[^\/\\]|\\\/)+/g),
          e
        );
      })();
    },
    62761: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SimpleKeyPathComponent = void 0);
      var n = r(88269);
      t.SimpleKeyPathComponent = (function () {
        function e(e) {
          (this.isArray = !1), (this.keyName = e);
          var t = parseInt(this.keyName, 10);
          !isNaN(t) && Number.isInteger(t) && (t < 0 || (this.isArray = !0));
        }
        return (
          (e.fromString = function (t) {
            var r = t;
            return (
              e.unescapeExpressions.forEach(function (e) {
                r = r.replace(e.search, e.replacement);
              }),
              new e(r)
            );
          }),
          (e.prototype.toString = function () {
            var t = this.keyName;
            return (
              e.escapeExpressions.forEach(function (e) {
                t = t.replace(e.search, e.replacement);
              }),
              t
            );
          }),
          (e.prototype.jsonPointer = function () {
            var e = this.keyName;
            return (e = e.replace(/(\~)/g, "~0")).replace(/(\/)/g, "~1");
          }),
          (e.prototype.query = function (e) {
            for (var t = [], r = 0; r < e.length; r++) {
              var i = e[r],
                a = i.object;
              if ("object" == typeof a) {
                var s = a[this.keyName];
                if (null !== s) {
                  var o = new n.default(i.depth, i.path.child(this.keyName), s);
                  t.push(o);
                }
              }
            }
            return t;
          }),
          (e.escapeExpressions = [
            { search: new RegExp(/(\\)/g), replacement: "\\" },
            { search: new RegExp(/(\.)/g), replacement: "\\." },
          ]),
          (e.unescapeExpressions = [
            { search: new RegExp(/(\\\.)/g), replacement: "." },
            { search: new RegExp(/(\\\\)/g), replacement: "\\" },
            { search: "~1", replacement: "/" },
          ]),
          e
        );
      })();
    },
    74359: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WildcardPathComponent = void 0);
      var n = r(88269);
      t.WildcardPathComponent = (function () {
        function e() {
          (this.keyName = "*"), (this.isArray = !0);
        }
        return (
          (e.fromString = function (t) {
            return "*" === t ? new e() : null;
          }),
          (e.prototype.toString = function () {
            return this.keyName;
          }),
          (e.prototype.jsonPointer = function () {
            throw Error("JSON Pointers don't work with wildcards");
          }),
          (e.prototype.query = function (e) {
            for (var t = [], r = 0; r < e.length; r++) {
              var i = e[r],
                a = i.object;
              if ("object" == typeof a)
                for (var s in a) {
                  var o = a[s],
                    l = new n.default(i.depth + 1, i.path.child(s), o);
                  t.push(l);
                }
            }
            return t;
          }),
          e
        );
      })();
    },
    88041: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = (function () {
          function e() {
            (this.keyName = "$"), (this.isArray = !1);
          }
          return (
            (e.fromString = function (t) {
              return "$" === t ? new e() : null;
            }),
            (e.prototype.toString = function () {
              return this.keyName;
            }),
            (e.prototype.jsonPointer = function () {
              return "";
            }),
            (e.prototype.query = function (e) {
              return e;
            }),
            e
          );
        })());
    },
    88269: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = (function () {
          function e(e, t, r) {
            (this.depth = 0),
              (this.depth = e),
              (this.path = t),
              (this.object = r);
          }
          return (
            (e.prototype.flatten = function () {
              var t = this.object;
              return (
                "object" == typeof this.object &&
                  Array.isArray(this.object) &&
                  this.depth > 0 &&
                  (t = this.object.flat(this.depth)),
                new e(0, this.path, t)
              );
            }),
            e
          );
        })());
    },
    90020: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var r in t)
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
        })(t, {
          isRequestAPICallableInsideAfter: function () {
            return l;
          },
          throwForSearchParamsAccessInUseCache: function () {
            return o;
          },
          throwWithStaticGenerationBailoutError: function () {
            return a;
          },
          throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
            return s;
          },
        });
      let n = r(57154),
        i = r(3295);
      function a(e, t) {
        throw Object.defineProperty(
          new n.StaticGenBailoutError(
            `Route ${e} couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E576", enumerable: !1, configurable: !0 },
        );
      }
      function s(e, t) {
        throw Object.defineProperty(
          new n.StaticGenBailoutError(
            `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E543", enumerable: !1, configurable: !0 },
        );
      }
      function o(e) {
        throw Object.defineProperty(
          Error(
            `Route ${e} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E634", enumerable: !1, configurable: !0 },
        );
      }
      function l() {
        let e = i.afterTaskAsyncStorage.getStore();
        return (null == e ? void 0 : e.rootTaskSpawnPhase) === "action";
      }
    },
  });
//# sourceMappingURL=3626.js.map
