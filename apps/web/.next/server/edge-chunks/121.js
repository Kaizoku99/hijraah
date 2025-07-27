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
    (e._sentryDebugIds[t] = "0bc89798-04d6-493a-9c69-9c373bc459f4"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-0bc89798-04d6-493a-9c69-9c373bc459f4"));
} catch (e) {}
("use strict");
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [121],
  {
    15138: (e, t, s) => {
      s.r(t),
        s.d(t, {
          Headers: () => n,
          Request: () => o,
          Response: () => l,
          default: () => a,
          fetch: () => i,
        });
      var r = (function () {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if (void 0 !== s.g) return s.g;
        throw Error("unable to locate global object");
      })();
      let i = r.fetch,
        a = r.fetch.bind(r),
        n = r.Headers,
        o = r.Request,
        l = r.Response;
    },
    16209: (e) => {
      e.exports = function () {
        throw Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object",
        );
      };
    },
    20032: (e, t, s) => {
      var r, i, a, n;
      let o;
      s.d(t, {
        kY: () => n,
        Ii: () => ew,
        bz: () => eP,
        YO: () => e$,
        zM: () => eC,
        gM: () => eN,
        k5: () => eD,
        eu: () => eU,
        fc: () => eM,
        ai: () => eA,
        Ik: () => eI,
        g1: () => eL,
        Yj: () => eE,
        KC: () => eR,
      }),
        (function (e) {
          (e.assertEqual = (e) => {}),
            (e.assertIs = function (e) {}),
            (e.assertNever = function (e) {
              throw Error();
            }),
            (e.arrayToEnum = (e) => {
              let t = {};
              for (let s of e) t[s] = s;
              return t;
            }),
            (e.getValidEnumValues = (t) => {
              let s = e.objectKeys(t).filter((e) => "number" != typeof t[t[e]]),
                r = {};
              for (let e of s) r[e] = t[e];
              return e.objectValues(r);
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
                    for (let s in e)
                      Object.prototype.hasOwnProperty.call(e, s) && t.push(s);
                    return t;
                  }),
            (e.find = (e, t) => {
              for (let s of e) if (t(s)) return s;
            }),
            (e.isInteger =
              "function" == typeof Number.isInteger
                ? (e) => Number.isInteger(e)
                : (e) =>
                    "number" == typeof e &&
                    Number.isFinite(e) &&
                    Math.floor(e) === e),
            (e.joinValues = function (e, t = " | ") {
              return e
                .map((e) => ("string" == typeof e ? `'${e}'` : e))
                .join(t);
            }),
            (e.jsonStringifyReplacer = (e, t) =>
              "bigint" == typeof t ? t.toString() : t);
        })(r || (r = {})),
        ((i || (i = {})).mergeShapes = (e, t) => ({ ...e, ...t }));
      let l = r.arrayToEnum([
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
        u = (e) => {
          switch (typeof e) {
            case "undefined":
              return l.undefined;
            case "string":
              return l.string;
            case "number":
              return Number.isNaN(e) ? l.nan : l.number;
            case "boolean":
              return l.boolean;
            case "function":
              return l.function;
            case "bigint":
              return l.bigint;
            case "symbol":
              return l.symbol;
            case "object":
              if (Array.isArray(e)) return l.array;
              if (null === e) return l.null;
              if (
                e.then &&
                "function" == typeof e.then &&
                e.catch &&
                "function" == typeof e.catch
              )
                return l.promise;
              if ("undefined" != typeof Map && e instanceof Map) return l.map;
              if ("undefined" != typeof Set && e instanceof Set) return l.set;
              if ("undefined" != typeof Date && e instanceof Date)
                return l.date;
              return l.object;
            default:
              return l.unknown;
          }
        },
        h = r.arrayToEnum([
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
      class c extends Error {
        get errors() {
          return this.issues;
        }
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
        format(e) {
          let t =
              e ||
              function (e) {
                return e.message;
              },
            s = { _errors: [] },
            r = (e) => {
              for (let i of e.issues)
                if ("invalid_union" === i.code) i.unionErrors.map(r);
                else if ("invalid_return_type" === i.code) r(i.returnTypeError);
                else if ("invalid_arguments" === i.code) r(i.argumentsError);
                else if (0 === i.path.length) s._errors.push(t(i));
                else {
                  let e = s,
                    r = 0;
                  for (; r < i.path.length; ) {
                    let s = i.path[r];
                    r === i.path.length - 1
                      ? ((e[s] = e[s] || { _errors: [] }),
                        e[s]._errors.push(t(i)))
                      : (e[s] = e[s] || { _errors: [] }),
                      (e = e[s]),
                      r++;
                  }
                }
            };
          return r(this), s;
        }
        static assert(e) {
          if (!(e instanceof c)) throw Error(`Not a ZodError: ${e}`);
        }
        toString() {
          return this.message;
        }
        get message() {
          return JSON.stringify(this.issues, r.jsonStringifyReplacer, 2);
        }
        get isEmpty() {
          return 0 === this.issues.length;
        }
        flatten(e = (e) => e.message) {
          let t = {},
            s = [];
          for (let r of this.issues)
            if (r.path.length > 0) {
              let s = r.path[0];
              (t[s] = t[s] || []), t[s].push(e(r));
            } else s.push(e(r));
          return { formErrors: s, fieldErrors: t };
        }
        get formErrors() {
          return this.flatten();
        }
      }
      c.create = (e) => new c(e);
      let d = (e, t) => {
        let s;
        switch (e.code) {
          case h.invalid_type:
            s =
              e.received === l.undefined
                ? "Required"
                : `Expected ${e.expected}, received ${e.received}`;
            break;
          case h.invalid_literal:
            s = `Invalid literal value, expected ${JSON.stringify(e.expected, r.jsonStringifyReplacer)}`;
            break;
          case h.unrecognized_keys:
            s = `Unrecognized key(s) in object: ${r.joinValues(e.keys, ", ")}`;
            break;
          case h.invalid_union:
            s = "Invalid input";
            break;
          case h.invalid_union_discriminator:
            s = `Invalid discriminator value. Expected ${r.joinValues(e.options)}`;
            break;
          case h.invalid_enum_value:
            s = `Invalid enum value. Expected ${r.joinValues(e.options)}, received '${e.received}'`;
            break;
          case h.invalid_arguments:
            s = "Invalid function arguments";
            break;
          case h.invalid_return_type:
            s = "Invalid function return type";
            break;
          case h.invalid_date:
            s = "Invalid date";
            break;
          case h.invalid_string:
            "object" == typeof e.validation
              ? "includes" in e.validation
                ? ((s = `Invalid input: must include "${e.validation.includes}"`),
                  "number" == typeof e.validation.position &&
                    (s = `${s} at one or more positions greater than or equal to ${e.validation.position}`))
                : "startsWith" in e.validation
                  ? (s = `Invalid input: must start with "${e.validation.startsWith}"`)
                  : "endsWith" in e.validation
                    ? (s = `Invalid input: must end with "${e.validation.endsWith}"`)
                    : r.assertNever(e.validation)
              : (s =
                  "regex" !== e.validation
                    ? `Invalid ${e.validation}`
                    : "Invalid");
            break;
          case h.too_small:
            s =
              "array" === e.type
                ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`
                : "string" === e.type
                  ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`
                  : "number" === e.type || "bigint" === e.type
                    ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`
                    : "date" === e.type
                      ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`
                      : "Invalid input";
            break;
          case h.too_big:
            s =
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
          case h.custom:
            s = "Invalid input";
            break;
          case h.invalid_intersection_types:
            s = "Intersection results could not be merged";
            break;
          case h.not_multiple_of:
            s = `Number must be a multiple of ${e.multipleOf}`;
            break;
          case h.not_finite:
            s = "Number must be finite";
            break;
          default:
            (s = t.defaultError), r.assertNever(e);
        }
        return { message: s };
      };
      !(function (e) {
        (e.errToObj = (e) => ("string" == typeof e ? { message: e } : e || {})),
          (e.toString = (e) => ("string" == typeof e ? e : e?.message));
      })(a || (a = {}));
      let f = (e) => {
        let { data: t, path: s, errorMaps: r, issueData: i } = e,
          a = [...s, ...(i.path || [])],
          n = { ...i, path: a };
        if (void 0 !== i.message) return { ...i, path: a, message: i.message };
        let o = "";
        for (let e of r
          .filter((e) => !!e)
          .slice()
          .reverse())
          o = e(n, { data: t, defaultError: o }).message;
        return { ...i, path: a, message: o };
      };
      function p(e, t) {
        let s = f({
          issueData: t,
          data: e.data,
          path: e.path,
          errorMaps: [
            e.common.contextualErrorMap,
            e.schemaErrorMap,
            d,
            d == d ? void 0 : d,
          ].filter((e) => !!e),
        });
        e.common.issues.push(s);
      }
      class g {
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
          let s = [];
          for (let r of t) {
            if ("aborted" === r.status) return m;
            "dirty" === r.status && e.dirty(), s.push(r.value);
          }
          return { status: e.value, value: s };
        }
        static async mergeObjectAsync(e, t) {
          let s = [];
          for (let e of t) {
            let t = await e.key,
              r = await e.value;
            s.push({ key: t, value: r });
          }
          return g.mergeObjectSync(e, s);
        }
        static mergeObjectSync(e, t) {
          let s = {};
          for (let r of t) {
            let { key: t, value: i } = r;
            if ("aborted" === t.status || "aborted" === i.status) return m;
            "dirty" === t.status && e.dirty(),
              "dirty" === i.status && e.dirty(),
              "__proto__" !== t.value &&
                (void 0 !== i.value || r.alwaysSet) &&
                (s[t.value] = i.value);
          }
          return { status: e.value, value: s };
        }
      }
      let m = Object.freeze({ status: "aborted" }),
        y = (e) => ({ status: "dirty", value: e }),
        _ = (e) => ({ status: "valid", value: e }),
        v = (e) => "aborted" === e.status,
        w = (e) => "dirty" === e.status,
        b = (e) => "valid" === e.status,
        k = (e) => "undefined" != typeof Promise && e instanceof Promise;
      class T {
        constructor(e, t, s, r) {
          (this._cachedPath = []),
            (this.parent = e),
            (this.data = t),
            (this._path = s),
            (this._key = r);
        }
        get path() {
          return (
            this._cachedPath.length ||
              (Array.isArray(this._key)
                ? this._cachedPath.push(...this._path, ...this._key)
                : this._cachedPath.push(...this._path, this._key)),
            this._cachedPath
          );
        }
      }
      let S = (e, t) => {
        if (b(t)) return { success: !0, data: t.value };
        if (!e.common.issues.length)
          throw Error("Validation failed but no issues detected.");
        return {
          success: !1,
          get error() {
            if (this._error) return this._error;
            let t = new c(e.common.issues);
            return (this._error = t), this._error;
          },
        };
      };
      function x(e) {
        if (!e) return {};
        let {
          errorMap: t,
          invalid_type_error: s,
          required_error: r,
          description: i,
        } = e;
        if (t && (s || r))
          throw Error(
            'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.',
          );
        return t
          ? { errorMap: t, description: i }
          : {
              errorMap: (t, i) => {
                let { message: a } = e;
                return "invalid_enum_value" === t.code
                  ? { message: a ?? i.defaultError }
                  : void 0 === i.data
                    ? { message: a ?? r ?? i.defaultError }
                    : "invalid_type" !== t.code
                      ? { message: i.defaultError }
                      : { message: a ?? s ?? i.defaultError };
              },
              description: i,
            };
      }
      class j {
        get description() {
          return this._def.description;
        }
        _getType(e) {
          return u(e.data);
        }
        _getOrReturnCtx(e, t) {
          return (
            t || {
              common: e.parent.common,
              data: e.data,
              parsedType: u(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent,
            }
          );
        }
        _processInputParams(e) {
          return {
            status: new g(),
            ctx: {
              common: e.parent.common,
              data: e.data,
              parsedType: u(e.data),
              schemaErrorMap: this._def.errorMap,
              path: e.path,
              parent: e.parent,
            },
          };
        }
        _parseSync(e) {
          let t = this._parse(e);
          if (k(t)) throw Error("Synchronous parse encountered promise.");
          return t;
        }
        _parseAsync(e) {
          return Promise.resolve(this._parse(e));
        }
        parse(e, t) {
          let s = this.safeParse(e, t);
          if (s.success) return s.data;
          throw s.error;
        }
        safeParse(e, t) {
          let s = {
              common: {
                issues: [],
                async: t?.async ?? !1,
                contextualErrorMap: t?.errorMap,
              },
              path: t?.path || [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: u(e),
            },
            r = this._parseSync({ data: e, path: s.path, parent: s });
          return S(s, r);
        }
        "~validate"(e) {
          let t = {
            common: { issues: [], async: !!this["~standard"].async },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: u(e),
          };
          if (!this["~standard"].async)
            try {
              let s = this._parseSync({ data: e, path: [], parent: t });
              return b(s) ? { value: s.value } : { issues: t.common.issues };
            } catch (e) {
              e?.message?.toLowerCase()?.includes("encountered") &&
                (this["~standard"].async = !0),
                (t.common = { issues: [], async: !0 });
            }
          return this._parseAsync({ data: e, path: [], parent: t }).then((e) =>
            b(e) ? { value: e.value } : { issues: t.common.issues },
          );
        }
        async parseAsync(e, t) {
          let s = await this.safeParseAsync(e, t);
          if (s.success) return s.data;
          throw s.error;
        }
        async safeParseAsync(e, t) {
          let s = {
              common: {
                issues: [],
                contextualErrorMap: t?.errorMap,
                async: !0,
              },
              path: t?.path || [],
              schemaErrorMap: this._def.errorMap,
              parent: null,
              data: e,
              parsedType: u(e),
            },
            r = this._parse({ data: e, path: s.path, parent: s });
          return S(s, await (k(r) ? r : Promise.resolve(r)));
        }
        refine(e, t) {
          let s = (e) =>
            "string" == typeof t || void 0 === t
              ? { message: t }
              : "function" == typeof t
                ? t(e)
                : t;
          return this._refinement((t, r) => {
            let i = e(t),
              a = () => r.addIssue({ code: h.custom, ...s(t) });
            return "undefined" != typeof Promise && i instanceof Promise
              ? i.then((e) => !!e || (a(), !1))
              : !!i || (a(), !1);
          });
        }
        refinement(e, t) {
          return this._refinement(
            (s, r) =>
              !!e(s) || (r.addIssue("function" == typeof t ? t(s, r) : t), !1),
          );
        }
        _refinement(e) {
          return new ev({
            schema: this,
            typeName: n.ZodEffects,
            effect: { type: "refinement", refinement: e },
          });
        }
        superRefine(e) {
          return this._refinement(e);
        }
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
            (this.isOptional = this.isOptional.bind(this)),
            (this["~standard"] = {
              version: 1,
              vendor: "zod",
              validate: (e) => this["~validate"](e),
            });
        }
        optional() {
          return ew.create(this, this._def);
        }
        nullable() {
          return eb.create(this, this._def);
        }
        nullish() {
          return this.nullable().optional();
        }
        array() {
          return es.create(this);
        }
        promise() {
          return e_.create(this, this._def);
        }
        or(e) {
          return ei.create([this, e], this._def);
        }
        and(e) {
          return eo.create(this, e, this._def);
        }
        transform(e) {
          return new ev({
            ...x(this._def),
            schema: this,
            typeName: n.ZodEffects,
            effect: { type: "transform", transform: e },
          });
        }
        default(e) {
          return new ek({
            ...x(this._def),
            innerType: this,
            defaultValue: "function" == typeof e ? e : () => e,
            typeName: n.ZodDefault,
          });
        }
        brand() {
          return new ex({
            typeName: n.ZodBranded,
            type: this,
            ...x(this._def),
          });
        }
        catch(e) {
          return new eT({
            ...x(this._def),
            innerType: this,
            catchValue: "function" == typeof e ? e : () => e,
            typeName: n.ZodCatch,
          });
        }
        describe(e) {
          return new this.constructor({ ...this._def, description: e });
        }
        pipe(e) {
          return ej.create(this, e);
        }
        readonly() {
          return eO.create(this);
        }
        isOptional() {
          return this.safeParse(void 0).success;
        }
        isNullable() {
          return this.safeParse(null).success;
        }
      }
      let O = /^c[^\s-]{8,}$/i,
        E = /^[0-9a-z]+$/,
        A = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
        C =
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
        P = /^[a-z0-9_-]{21}$/i,
        $ = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
        I =
          /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
        R =
          /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
        N =
          /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
        L =
          /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
        U =
          /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
        D =
          /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
        M = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
        Z =
          /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
        F =
          "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
        q = RegExp(`^${F}$`);
      function B(e) {
        let t = "[0-5]\\d";
        e.precision
          ? (t = `${t}\\.\\d{${e.precision}}`)
          : null == e.precision && (t = `${t}(\\.\\d+)?`);
        let s = e.precision ? "+" : "?";
        return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${s}`;
      }
      class z extends j {
        _parse(e) {
          var t, s, i, a;
          let n;
          if (
            (this._def.coerce && (e.data = String(e.data)),
            this._getType(e) !== l.string)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.string,
                received: t.parsedType,
              }),
              m
            );
          }
          let u = new g();
          for (let l of this._def.checks)
            if ("min" === l.kind)
              e.data.length < l.value &&
                (p((n = this._getOrReturnCtx(e, n)), {
                  code: h.too_small,
                  minimum: l.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: l.message,
                }),
                u.dirty());
            else if ("max" === l.kind)
              e.data.length > l.value &&
                (p((n = this._getOrReturnCtx(e, n)), {
                  code: h.too_big,
                  maximum: l.value,
                  type: "string",
                  inclusive: !0,
                  exact: !1,
                  message: l.message,
                }),
                u.dirty());
            else if ("length" === l.kind) {
              let t = e.data.length > l.value,
                s = e.data.length < l.value;
              (t || s) &&
                ((n = this._getOrReturnCtx(e, n)),
                t
                  ? p(n, {
                      code: h.too_big,
                      maximum: l.value,
                      type: "string",
                      inclusive: !0,
                      exact: !0,
                      message: l.message,
                    })
                  : s &&
                    p(n, {
                      code: h.too_small,
                      minimum: l.value,
                      type: "string",
                      inclusive: !0,
                      exact: !0,
                      message: l.message,
                    }),
                u.dirty());
            } else if ("email" === l.kind)
              R.test(e.data) ||
                (p((n = this._getOrReturnCtx(e, n)), {
                  validation: "email",
                  code: h.invalid_string,
                  message: l.message,
                }),
                u.dirty());
            else if ("emoji" === l.kind)
              o ||
                (o = RegExp(
                  "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
                  "u",
                )),
                o.test(e.data) ||
                  (p((n = this._getOrReturnCtx(e, n)), {
                    validation: "emoji",
                    code: h.invalid_string,
                    message: l.message,
                  }),
                  u.dirty());
            else if ("uuid" === l.kind)
              C.test(e.data) ||
                (p((n = this._getOrReturnCtx(e, n)), {
                  validation: "uuid",
                  code: h.invalid_string,
                  message: l.message,
                }),
                u.dirty());
            else if ("nanoid" === l.kind)
              P.test(e.data) ||
                (p((n = this._getOrReturnCtx(e, n)), {
                  validation: "nanoid",
                  code: h.invalid_string,
                  message: l.message,
                }),
                u.dirty());
            else if ("cuid" === l.kind)
              O.test(e.data) ||
                (p((n = this._getOrReturnCtx(e, n)), {
                  validation: "cuid",
                  code: h.invalid_string,
                  message: l.message,
                }),
                u.dirty());
            else if ("cuid2" === l.kind)
              E.test(e.data) ||
                (p((n = this._getOrReturnCtx(e, n)), {
                  validation: "cuid2",
                  code: h.invalid_string,
                  message: l.message,
                }),
                u.dirty());
            else if ("ulid" === l.kind)
              A.test(e.data) ||
                (p((n = this._getOrReturnCtx(e, n)), {
                  validation: "ulid",
                  code: h.invalid_string,
                  message: l.message,
                }),
                u.dirty());
            else if ("url" === l.kind)
              try {
                new URL(e.data);
              } catch {
                p((n = this._getOrReturnCtx(e, n)), {
                  validation: "url",
                  code: h.invalid_string,
                  message: l.message,
                }),
                  u.dirty();
              }
            else
              "regex" === l.kind
                ? ((l.regex.lastIndex = 0),
                  l.regex.test(e.data) ||
                    (p((n = this._getOrReturnCtx(e, n)), {
                      validation: "regex",
                      code: h.invalid_string,
                      message: l.message,
                    }),
                    u.dirty()))
                : "trim" === l.kind
                  ? (e.data = e.data.trim())
                  : "includes" === l.kind
                    ? e.data.includes(l.value, l.position) ||
                      (p((n = this._getOrReturnCtx(e, n)), {
                        code: h.invalid_string,
                        validation: { includes: l.value, position: l.position },
                        message: l.message,
                      }),
                      u.dirty())
                    : "toLowerCase" === l.kind
                      ? (e.data = e.data.toLowerCase())
                      : "toUpperCase" === l.kind
                        ? (e.data = e.data.toUpperCase())
                        : "startsWith" === l.kind
                          ? e.data.startsWith(l.value) ||
                            (p((n = this._getOrReturnCtx(e, n)), {
                              code: h.invalid_string,
                              validation: { startsWith: l.value },
                              message: l.message,
                            }),
                            u.dirty())
                          : "endsWith" === l.kind
                            ? e.data.endsWith(l.value) ||
                              (p((n = this._getOrReturnCtx(e, n)), {
                                code: h.invalid_string,
                                validation: { endsWith: l.value },
                                message: l.message,
                              }),
                              u.dirty())
                            : "datetime" === l.kind
                              ? (function (e) {
                                  let t = `${F}T${B(e)}`,
                                    s = [];
                                  return (
                                    s.push(e.local ? "Z?" : "Z"),
                                    e.offset && s.push("([+-]\\d{2}:?\\d{2})"),
                                    (t = `${t}(${s.join("|")})`),
                                    RegExp(`^${t}$`)
                                  );
                                })(l).test(e.data) ||
                                (p((n = this._getOrReturnCtx(e, n)), {
                                  code: h.invalid_string,
                                  validation: "datetime",
                                  message: l.message,
                                }),
                                u.dirty())
                              : "date" === l.kind
                                ? q.test(e.data) ||
                                  (p((n = this._getOrReturnCtx(e, n)), {
                                    code: h.invalid_string,
                                    validation: "date",
                                    message: l.message,
                                  }),
                                  u.dirty())
                                : "time" === l.kind
                                  ? RegExp(`^${B(l)}$`).test(e.data) ||
                                    (p((n = this._getOrReturnCtx(e, n)), {
                                      code: h.invalid_string,
                                      validation: "time",
                                      message: l.message,
                                    }),
                                    u.dirty())
                                  : "duration" === l.kind
                                    ? I.test(e.data) ||
                                      (p((n = this._getOrReturnCtx(e, n)), {
                                        validation: "duration",
                                        code: h.invalid_string,
                                        message: l.message,
                                      }),
                                      u.dirty())
                                    : "ip" === l.kind
                                      ? ((t = e.data),
                                        !(
                                          (("v4" === (s = l.version) || !s) &&
                                            N.test(t)) ||
                                          (("v6" === s || !s) && U.test(t))
                                        ) &&
                                          1 &&
                                          (p((n = this._getOrReturnCtx(e, n)), {
                                            validation: "ip",
                                            code: h.invalid_string,
                                            message: l.message,
                                          }),
                                          u.dirty()))
                                      : "jwt" === l.kind
                                        ? !(function (e, t) {
                                            if (!$.test(e)) return !1;
                                            try {
                                              let [s] = e.split(".");
                                              if (!s) return !1;
                                              let r = s
                                                  .replace(/-/g, "+")
                                                  .replace(/_/g, "/")
                                                  .padEnd(
                                                    s.length +
                                                      ((4 - (s.length % 4)) %
                                                        4),
                                                    "=",
                                                  ),
                                                i = JSON.parse(atob(r));
                                              if (
                                                "object" != typeof i ||
                                                null === i ||
                                                ("typ" in i &&
                                                  i?.typ !== "JWT") ||
                                                !i.alg ||
                                                (t && i.alg !== t)
                                              )
                                                return !1;
                                              return !0;
                                            } catch {
                                              return !1;
                                            }
                                          })(e.data, l.alg) &&
                                          (p((n = this._getOrReturnCtx(e, n)), {
                                            validation: "jwt",
                                            code: h.invalid_string,
                                            message: l.message,
                                          }),
                                          u.dirty())
                                        : "cidr" === l.kind
                                          ? ((i = e.data),
                                            !(
                                              (("v4" === (a = l.version) ||
                                                !a) &&
                                                L.test(i)) ||
                                              (("v6" === a || !a) && D.test(i))
                                            ) &&
                                              1 &&
                                              (p(
                                                (n = this._getOrReturnCtx(
                                                  e,
                                                  n,
                                                )),
                                                {
                                                  validation: "cidr",
                                                  code: h.invalid_string,
                                                  message: l.message,
                                                },
                                              ),
                                              u.dirty()))
                                          : "base64" === l.kind
                                            ? M.test(e.data) ||
                                              (p(
                                                (n = this._getOrReturnCtx(
                                                  e,
                                                  n,
                                                )),
                                                {
                                                  validation: "base64",
                                                  code: h.invalid_string,
                                                  message: l.message,
                                                },
                                              ),
                                              u.dirty())
                                            : "base64url" === l.kind
                                              ? Z.test(e.data) ||
                                                (p(
                                                  (n = this._getOrReturnCtx(
                                                    e,
                                                    n,
                                                  )),
                                                  {
                                                    validation: "base64url",
                                                    code: h.invalid_string,
                                                    message: l.message,
                                                  },
                                                ),
                                                u.dirty())
                                              : r.assertNever(l);
          return { status: u.value, value: e.data };
        }
        _regex(e, t, s) {
          return this.refinement((t) => e.test(t), {
            validation: t,
            code: h.invalid_string,
            ...a.errToObj(s),
          });
        }
        _addCheck(e) {
          return new z({ ...this._def, checks: [...this._def.checks, e] });
        }
        email(e) {
          return this._addCheck({ kind: "email", ...a.errToObj(e) });
        }
        url(e) {
          return this._addCheck({ kind: "url", ...a.errToObj(e) });
        }
        emoji(e) {
          return this._addCheck({ kind: "emoji", ...a.errToObj(e) });
        }
        uuid(e) {
          return this._addCheck({ kind: "uuid", ...a.errToObj(e) });
        }
        nanoid(e) {
          return this._addCheck({ kind: "nanoid", ...a.errToObj(e) });
        }
        cuid(e) {
          return this._addCheck({ kind: "cuid", ...a.errToObj(e) });
        }
        cuid2(e) {
          return this._addCheck({ kind: "cuid2", ...a.errToObj(e) });
        }
        ulid(e) {
          return this._addCheck({ kind: "ulid", ...a.errToObj(e) });
        }
        base64(e) {
          return this._addCheck({ kind: "base64", ...a.errToObj(e) });
        }
        base64url(e) {
          return this._addCheck({ kind: "base64url", ...a.errToObj(e) });
        }
        jwt(e) {
          return this._addCheck({ kind: "jwt", ...a.errToObj(e) });
        }
        ip(e) {
          return this._addCheck({ kind: "ip", ...a.errToObj(e) });
        }
        cidr(e) {
          return this._addCheck({ kind: "cidr", ...a.errToObj(e) });
        }
        datetime(e) {
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
                precision: void 0 === e?.precision ? null : e?.precision,
                offset: e?.offset ?? !1,
                local: e?.local ?? !1,
                ...a.errToObj(e?.message),
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
                precision: void 0 === e?.precision ? null : e?.precision,
                ...a.errToObj(e?.message),
              });
        }
        duration(e) {
          return this._addCheck({ kind: "duration", ...a.errToObj(e) });
        }
        regex(e, t) {
          return this._addCheck({ kind: "regex", regex: e, ...a.errToObj(t) });
        }
        includes(e, t) {
          return this._addCheck({
            kind: "includes",
            value: e,
            position: t?.position,
            ...a.errToObj(t?.message),
          });
        }
        startsWith(e, t) {
          return this._addCheck({
            kind: "startsWith",
            value: e,
            ...a.errToObj(t),
          });
        }
        endsWith(e, t) {
          return this._addCheck({
            kind: "endsWith",
            value: e,
            ...a.errToObj(t),
          });
        }
        min(e, t) {
          return this._addCheck({ kind: "min", value: e, ...a.errToObj(t) });
        }
        max(e, t) {
          return this._addCheck({ kind: "max", value: e, ...a.errToObj(t) });
        }
        length(e, t) {
          return this._addCheck({ kind: "length", value: e, ...a.errToObj(t) });
        }
        nonempty(e) {
          return this.min(1, a.errToObj(e));
        }
        trim() {
          return new z({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
          });
        }
        toLowerCase() {
          return new z({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
          });
        }
        toUpperCase() {
          return new z({
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
        get isCIDR() {
          return !!this._def.checks.find((e) => "cidr" === e.kind);
        }
        get isBase64() {
          return !!this._def.checks.find((e) => "base64" === e.kind);
        }
        get isBase64url() {
          return !!this._def.checks.find((e) => "base64url" === e.kind);
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
      z.create = (e) =>
        new z({
          checks: [],
          typeName: n.ZodString,
          coerce: e?.coerce ?? !1,
          ...x(e),
        });
      class K extends j {
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
            this._getType(e) !== l.number)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.number,
                received: t.parsedType,
              }),
              m
            );
          }
          let s = new g();
          for (let i of this._def.checks)
            "int" === i.kind
              ? r.isInteger(e.data) ||
                (p((t = this._getOrReturnCtx(e, t)), {
                  code: h.invalid_type,
                  expected: "integer",
                  received: "float",
                  message: i.message,
                }),
                s.dirty())
              : "min" === i.kind
                ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
                  (p((t = this._getOrReturnCtx(e, t)), {
                    code: h.too_small,
                    minimum: i.value,
                    type: "number",
                    inclusive: i.inclusive,
                    exact: !1,
                    message: i.message,
                  }),
                  s.dirty())
                : "max" === i.kind
                  ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
                    (p((t = this._getOrReturnCtx(e, t)), {
                      code: h.too_big,
                      maximum: i.value,
                      type: "number",
                      inclusive: i.inclusive,
                      exact: !1,
                      message: i.message,
                    }),
                    s.dirty())
                  : "multipleOf" === i.kind
                    ? 0 !==
                        (function (e, t) {
                          let s = (e.toString().split(".")[1] || "").length,
                            r = (t.toString().split(".")[1] || "").length,
                            i = s > r ? s : r;
                          return (
                            (Number.parseInt(e.toFixed(i).replace(".", "")) %
                              Number.parseInt(t.toFixed(i).replace(".", ""))) /
                            10 ** i
                          );
                        })(e.data, i.value) &&
                      (p((t = this._getOrReturnCtx(e, t)), {
                        code: h.not_multiple_of,
                        multipleOf: i.value,
                        message: i.message,
                      }),
                      s.dirty())
                    : "finite" === i.kind
                      ? Number.isFinite(e.data) ||
                        (p((t = this._getOrReturnCtx(e, t)), {
                          code: h.not_finite,
                          message: i.message,
                        }),
                        s.dirty())
                      : r.assertNever(i);
          return { status: s.value, value: e.data };
        }
        gte(e, t) {
          return this.setLimit("min", e, !0, a.toString(t));
        }
        gt(e, t) {
          return this.setLimit("min", e, !1, a.toString(t));
        }
        lte(e, t) {
          return this.setLimit("max", e, !0, a.toString(t));
        }
        lt(e, t) {
          return this.setLimit("max", e, !1, a.toString(t));
        }
        setLimit(e, t, s, r) {
          return new K({
            ...this._def,
            checks: [
              ...this._def.checks,
              { kind: e, value: t, inclusive: s, message: a.toString(r) },
            ],
          });
        }
        _addCheck(e) {
          return new K({ ...this._def, checks: [...this._def.checks, e] });
        }
        int(e) {
          return this._addCheck({ kind: "int", message: a.toString(e) });
        }
        positive(e) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !1,
            message: a.toString(e),
          });
        }
        negative(e) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !1,
            message: a.toString(e),
          });
        }
        nonpositive(e) {
          return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !0,
            message: a.toString(e),
          });
        }
        nonnegative(e) {
          return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !0,
            message: a.toString(e),
          });
        }
        multipleOf(e, t) {
          return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: a.toString(t),
          });
        }
        finite(e) {
          return this._addCheck({ kind: "finite", message: a.toString(e) });
        }
        safe(e) {
          return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: a.toString(e),
          })._addCheck({
            kind: "max",
            inclusive: !0,
            value: Number.MAX_SAFE_INTEGER,
            message: a.toString(e),
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
              ("multipleOf" === e.kind && r.isInteger(e.value)),
          );
        }
        get isFinite() {
          let e = null,
            t = null;
          for (let s of this._def.checks)
            if (
              "finite" === s.kind ||
              "int" === s.kind ||
              "multipleOf" === s.kind
            )
              return !0;
            else
              "min" === s.kind
                ? (null === t || s.value > t) && (t = s.value)
                : "max" === s.kind &&
                  (null === e || s.value < e) &&
                  (e = s.value);
          return Number.isFinite(t) && Number.isFinite(e);
        }
      }
      K.create = (e) =>
        new K({
          checks: [],
          typeName: n.ZodNumber,
          coerce: e?.coerce || !1,
          ...x(e),
        });
      class W extends j {
        constructor() {
          super(...arguments), (this.min = this.gte), (this.max = this.lte);
        }
        _parse(e) {
          let t;
          if (this._def.coerce)
            try {
              e.data = BigInt(e.data);
            } catch {
              return this._getInvalidInput(e);
            }
          if (this._getType(e) !== l.bigint) return this._getInvalidInput(e);
          let s = new g();
          for (let i of this._def.checks)
            "min" === i.kind
              ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
                (p((t = this._getOrReturnCtx(e, t)), {
                  code: h.too_small,
                  type: "bigint",
                  minimum: i.value,
                  inclusive: i.inclusive,
                  message: i.message,
                }),
                s.dirty())
              : "max" === i.kind
                ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
                  (p((t = this._getOrReturnCtx(e, t)), {
                    code: h.too_big,
                    type: "bigint",
                    maximum: i.value,
                    inclusive: i.inclusive,
                    message: i.message,
                  }),
                  s.dirty())
                : "multipleOf" === i.kind
                  ? e.data % i.value !== BigInt(0) &&
                    (p((t = this._getOrReturnCtx(e, t)), {
                      code: h.not_multiple_of,
                      multipleOf: i.value,
                      message: i.message,
                    }),
                    s.dirty())
                  : r.assertNever(i);
          return { status: s.value, value: e.data };
        }
        _getInvalidInput(e) {
          let t = this._getOrReturnCtx(e);
          return (
            p(t, {
              code: h.invalid_type,
              expected: l.bigint,
              received: t.parsedType,
            }),
            m
          );
        }
        gte(e, t) {
          return this.setLimit("min", e, !0, a.toString(t));
        }
        gt(e, t) {
          return this.setLimit("min", e, !1, a.toString(t));
        }
        lte(e, t) {
          return this.setLimit("max", e, !0, a.toString(t));
        }
        lt(e, t) {
          return this.setLimit("max", e, !1, a.toString(t));
        }
        setLimit(e, t, s, r) {
          return new W({
            ...this._def,
            checks: [
              ...this._def.checks,
              { kind: e, value: t, inclusive: s, message: a.toString(r) },
            ],
          });
        }
        _addCheck(e) {
          return new W({ ...this._def, checks: [...this._def.checks, e] });
        }
        positive(e) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !1,
            message: a.toString(e),
          });
        }
        negative(e) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !1,
            message: a.toString(e),
          });
        }
        nonpositive(e) {
          return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !0,
            message: a.toString(e),
          });
        }
        nonnegative(e) {
          return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !0,
            message: a.toString(e),
          });
        }
        multipleOf(e, t) {
          return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: a.toString(t),
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
      W.create = (e) =>
        new W({
          checks: [],
          typeName: n.ZodBigInt,
          coerce: e?.coerce ?? !1,
          ...x(e),
        });
      class V extends j {
        _parse(e) {
          if (
            (this._def.coerce && (e.data = !!e.data),
            this._getType(e) !== l.boolean)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.boolean,
                received: t.parsedType,
              }),
              m
            );
          }
          return _(e.data);
        }
      }
      V.create = (e) =>
        new V({ typeName: n.ZodBoolean, coerce: e?.coerce || !1, ...x(e) });
      class J extends j {
        _parse(e) {
          let t;
          if (
            (this._def.coerce && (e.data = new Date(e.data)),
            this._getType(e) !== l.date)
          ) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.date,
                received: t.parsedType,
              }),
              m
            );
          }
          if (Number.isNaN(e.data.getTime()))
            return p(this._getOrReturnCtx(e), { code: h.invalid_date }), m;
          let s = new g();
          for (let i of this._def.checks)
            "min" === i.kind
              ? e.data.getTime() < i.value &&
                (p((t = this._getOrReturnCtx(e, t)), {
                  code: h.too_small,
                  message: i.message,
                  inclusive: !0,
                  exact: !1,
                  minimum: i.value,
                  type: "date",
                }),
                s.dirty())
              : "max" === i.kind
                ? e.data.getTime() > i.value &&
                  (p((t = this._getOrReturnCtx(e, t)), {
                    code: h.too_big,
                    message: i.message,
                    inclusive: !0,
                    exact: !1,
                    maximum: i.value,
                    type: "date",
                  }),
                  s.dirty())
                : r.assertNever(i);
          return { status: s.value, value: new Date(e.data.getTime()) };
        }
        _addCheck(e) {
          return new J({ ...this._def, checks: [...this._def.checks, e] });
        }
        min(e, t) {
          return this._addCheck({
            kind: "min",
            value: e.getTime(),
            message: a.toString(t),
          });
        }
        max(e, t) {
          return this._addCheck({
            kind: "max",
            value: e.getTime(),
            message: a.toString(t),
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
      J.create = (e) =>
        new J({
          checks: [],
          coerce: e?.coerce || !1,
          typeName: n.ZodDate,
          ...x(e),
        });
      class H extends j {
        _parse(e) {
          if (this._getType(e) !== l.symbol) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.symbol,
                received: t.parsedType,
              }),
              m
            );
          }
          return _(e.data);
        }
      }
      H.create = (e) => new H({ typeName: n.ZodSymbol, ...x(e) });
      class G extends j {
        _parse(e) {
          if (this._getType(e) !== l.undefined) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.undefined,
                received: t.parsedType,
              }),
              m
            );
          }
          return _(e.data);
        }
      }
      G.create = (e) => new G({ typeName: n.ZodUndefined, ...x(e) });
      class Y extends j {
        _parse(e) {
          if (this._getType(e) !== l.null) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.null,
                received: t.parsedType,
              }),
              m
            );
          }
          return _(e.data);
        }
      }
      Y.create = (e) => new Y({ typeName: n.ZodNull, ...x(e) });
      class X extends j {
        constructor() {
          super(...arguments), (this._any = !0);
        }
        _parse(e) {
          return _(e.data);
        }
      }
      X.create = (e) => new X({ typeName: n.ZodAny, ...x(e) });
      class Q extends j {
        constructor() {
          super(...arguments), (this._unknown = !0);
        }
        _parse(e) {
          return _(e.data);
        }
      }
      Q.create = (e) => new Q({ typeName: n.ZodUnknown, ...x(e) });
      class ee extends j {
        _parse(e) {
          let t = this._getOrReturnCtx(e);
          return (
            p(t, {
              code: h.invalid_type,
              expected: l.never,
              received: t.parsedType,
            }),
            m
          );
        }
      }
      ee.create = (e) => new ee({ typeName: n.ZodNever, ...x(e) });
      class et extends j {
        _parse(e) {
          if (this._getType(e) !== l.undefined) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.void,
                received: t.parsedType,
              }),
              m
            );
          }
          return _(e.data);
        }
      }
      et.create = (e) => new et({ typeName: n.ZodVoid, ...x(e) });
      class es extends j {
        _parse(e) {
          let { ctx: t, status: s } = this._processInputParams(e),
            r = this._def;
          if (t.parsedType !== l.array)
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.array,
                received: t.parsedType,
              }),
              m
            );
          if (null !== r.exactLength) {
            let e = t.data.length > r.exactLength.value,
              i = t.data.length < r.exactLength.value;
            (e || i) &&
              (p(t, {
                code: e ? h.too_big : h.too_small,
                minimum: i ? r.exactLength.value : void 0,
                maximum: e ? r.exactLength.value : void 0,
                type: "array",
                inclusive: !0,
                exact: !0,
                message: r.exactLength.message,
              }),
              s.dirty());
          }
          if (
            (null !== r.minLength &&
              t.data.length < r.minLength.value &&
              (p(t, {
                code: h.too_small,
                minimum: r.minLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: r.minLength.message,
              }),
              s.dirty()),
            null !== r.maxLength &&
              t.data.length > r.maxLength.value &&
              (p(t, {
                code: h.too_big,
                maximum: r.maxLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: r.maxLength.message,
              }),
              s.dirty()),
            t.common.async)
          )
            return Promise.all(
              [...t.data].map((e, s) =>
                r.type._parseAsync(new T(t, e, t.path, s)),
              ),
            ).then((e) => g.mergeArray(s, e));
          let i = [...t.data].map((e, s) =>
            r.type._parseSync(new T(t, e, t.path, s)),
          );
          return g.mergeArray(s, i);
        }
        get element() {
          return this._def.type;
        }
        min(e, t) {
          return new es({
            ...this._def,
            minLength: { value: e, message: a.toString(t) },
          });
        }
        max(e, t) {
          return new es({
            ...this._def,
            maxLength: { value: e, message: a.toString(t) },
          });
        }
        length(e, t) {
          return new es({
            ...this._def,
            exactLength: { value: e, message: a.toString(t) },
          });
        }
        nonempty(e) {
          return this.min(1, e);
        }
      }
      es.create = (e, t) =>
        new es({
          type: e,
          minLength: null,
          maxLength: null,
          exactLength: null,
          typeName: n.ZodArray,
          ...x(t),
        });
      class er extends j {
        constructor() {
          super(...arguments),
            (this._cached = null),
            (this.nonstrict = this.passthrough),
            (this.augment = this.extend);
        }
        _getCached() {
          if (null !== this._cached) return this._cached;
          let e = this._def.shape(),
            t = r.objectKeys(e);
          return (this._cached = { shape: e, keys: t }), this._cached;
        }
        _parse(e) {
          if (this._getType(e) !== l.object) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.object,
                received: t.parsedType,
              }),
              m
            );
          }
          let { status: t, ctx: s } = this._processInputParams(e),
            { shape: r, keys: i } = this._getCached(),
            a = [];
          if (
            !(
              this._def.catchall instanceof ee &&
              "strip" === this._def.unknownKeys
            )
          )
            for (let e in s.data) i.includes(e) || a.push(e);
          let n = [];
          for (let e of i) {
            let t = r[e],
              i = s.data[e];
            n.push({
              key: { status: "valid", value: e },
              value: t._parse(new T(s, i, s.path, e)),
              alwaysSet: e in s.data,
            });
          }
          if (this._def.catchall instanceof ee) {
            let e = this._def.unknownKeys;
            if ("passthrough" === e)
              for (let e of a)
                n.push({
                  key: { status: "valid", value: e },
                  value: { status: "valid", value: s.data[e] },
                });
            else if ("strict" === e)
              a.length > 0 &&
                (p(s, { code: h.unrecognized_keys, keys: a }), t.dirty());
            else if ("strip" === e);
            else
              throw Error(
                "Internal ZodObject error: invalid unknownKeys value.",
              );
          } else {
            let e = this._def.catchall;
            for (let t of a) {
              let r = s.data[t];
              n.push({
                key: { status: "valid", value: t },
                value: e._parse(new T(s, r, s.path, t)),
                alwaysSet: t in s.data,
              });
            }
          }
          return s.common.async
            ? Promise.resolve()
                .then(async () => {
                  let e = [];
                  for (let t of n) {
                    let s = await t.key,
                      r = await t.value;
                    e.push({ key: s, value: r, alwaysSet: t.alwaysSet });
                  }
                  return e;
                })
                .then((e) => g.mergeObjectSync(t, e))
            : g.mergeObjectSync(t, n);
        }
        get shape() {
          return this._def.shape();
        }
        strict(e) {
          return (
            a.errToObj,
            new er({
              ...this._def,
              unknownKeys: "strict",
              ...(void 0 !== e
                ? {
                    errorMap: (t, s) => {
                      let r =
                        this._def.errorMap?.(t, s).message ?? s.defaultError;
                      return "unrecognized_keys" === t.code
                        ? { message: a.errToObj(e).message ?? r }
                        : { message: r };
                    },
                  }
                : {}),
            })
          );
        }
        strip() {
          return new er({ ...this._def, unknownKeys: "strip" });
        }
        passthrough() {
          return new er({ ...this._def, unknownKeys: "passthrough" });
        }
        extend(e) {
          return new er({
            ...this._def,
            shape: () => ({ ...this._def.shape(), ...e }),
          });
        }
        merge(e) {
          return new er({
            unknownKeys: e._def.unknownKeys,
            catchall: e._def.catchall,
            shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
            typeName: n.ZodObject,
          });
        }
        setKey(e, t) {
          return this.augment({ [e]: t });
        }
        catchall(e) {
          return new er({ ...this._def, catchall: e });
        }
        pick(e) {
          let t = {};
          for (let s of r.objectKeys(e))
            e[s] && this.shape[s] && (t[s] = this.shape[s]);
          return new er({ ...this._def, shape: () => t });
        }
        omit(e) {
          let t = {};
          for (let s of r.objectKeys(this.shape))
            e[s] || (t[s] = this.shape[s]);
          return new er({ ...this._def, shape: () => t });
        }
        deepPartial() {
          return (function e(t) {
            if (t instanceof er) {
              let s = {};
              for (let r in t.shape) {
                let i = t.shape[r];
                s[r] = ew.create(e(i));
              }
              return new er({ ...t._def, shape: () => s });
            }
            if (t instanceof es)
              return new es({ ...t._def, type: e(t.element) });
            if (t instanceof ew) return ew.create(e(t.unwrap()));
            if (t instanceof eb) return eb.create(e(t.unwrap()));
            if (t instanceof el) return el.create(t.items.map((t) => e(t)));
            else return t;
          })(this);
        }
        partial(e) {
          let t = {};
          for (let s of r.objectKeys(this.shape)) {
            let r = this.shape[s];
            e && !e[s] ? (t[s] = r) : (t[s] = r.optional());
          }
          return new er({ ...this._def, shape: () => t });
        }
        required(e) {
          let t = {};
          for (let s of r.objectKeys(this.shape))
            if (e && !e[s]) t[s] = this.shape[s];
            else {
              let e = this.shape[s];
              for (; e instanceof ew; ) e = e._def.innerType;
              t[s] = e;
            }
          return new er({ ...this._def, shape: () => t });
        }
        keyof() {
          return eg(r.objectKeys(this.shape));
        }
      }
      (er.create = (e, t) =>
        new er({
          shape: () => e,
          unknownKeys: "strip",
          catchall: ee.create(),
          typeName: n.ZodObject,
          ...x(t),
        })),
        (er.strictCreate = (e, t) =>
          new er({
            shape: () => e,
            unknownKeys: "strict",
            catchall: ee.create(),
            typeName: n.ZodObject,
            ...x(t),
          })),
        (er.lazycreate = (e, t) =>
          new er({
            shape: e,
            unknownKeys: "strip",
            catchall: ee.create(),
            typeName: n.ZodObject,
            ...x(t),
          }));
      class ei extends j {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = this._def.options;
          if (t.common.async)
            return Promise.all(
              s.map(async (e) => {
                let s = {
                  ...t,
                  common: { ...t.common, issues: [] },
                  parent: null,
                };
                return {
                  result: await e._parseAsync({
                    data: t.data,
                    path: t.path,
                    parent: s,
                  }),
                  ctx: s,
                };
              }),
            ).then(function (e) {
              for (let t of e) if ("valid" === t.result.status) return t.result;
              for (let s of e)
                if ("dirty" === s.result.status)
                  return t.common.issues.push(...s.ctx.common.issues), s.result;
              let s = e.map((e) => new c(e.ctx.common.issues));
              return p(t, { code: h.invalid_union, unionErrors: s }), m;
            });
          {
            let e,
              r = [];
            for (let i of s) {
              let s = {
                  ...t,
                  common: { ...t.common, issues: [] },
                  parent: null,
                },
                a = i._parseSync({ data: t.data, path: t.path, parent: s });
              if ("valid" === a.status) return a;
              "dirty" !== a.status || e || (e = { result: a, ctx: s }),
                s.common.issues.length && r.push(s.common.issues);
            }
            if (e)
              return t.common.issues.push(...e.ctx.common.issues), e.result;
            let i = r.map((e) => new c(e));
            return p(t, { code: h.invalid_union, unionErrors: i }), m;
          }
        }
        get options() {
          return this._def.options;
        }
      }
      ei.create = (e, t) =>
        new ei({ options: e, typeName: n.ZodUnion, ...x(t) });
      let ea = (e) => {
        if (e instanceof ef) return ea(e.schema);
        if (e instanceof ev) return ea(e.innerType());
        if (e instanceof ep) return [e.value];
        if (e instanceof em) return e.options;
        if (e instanceof ey) return r.objectValues(e.enum);
        else if (e instanceof ek) return ea(e._def.innerType);
        else if (e instanceof G) return [void 0];
        else if (e instanceof Y) return [null];
        else if (e instanceof ew) return [void 0, ...ea(e.unwrap())];
        else if (e instanceof eb) return [null, ...ea(e.unwrap())];
        else if (e instanceof ex) return ea(e.unwrap());
        else if (e instanceof eO) return ea(e.unwrap());
        else if (e instanceof eT) return ea(e._def.innerType);
        else return [];
      };
      class en extends j {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          if (t.parsedType !== l.object)
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.object,
                received: t.parsedType,
              }),
              m
            );
          let s = this.discriminator,
            r = t.data[s],
            i = this.optionsMap.get(r);
          return i
            ? t.common.async
              ? i._parseAsync({ data: t.data, path: t.path, parent: t })
              : i._parseSync({ data: t.data, path: t.path, parent: t })
            : (p(t, {
                code: h.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [s],
              }),
              m);
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
        static create(e, t, s) {
          let r = new Map();
          for (let s of t) {
            let t = ea(s.shape[e]);
            if (!t.length)
              throw Error(
                `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
              );
            for (let i of t) {
              if (r.has(i))
                throw Error(
                  `Discriminator property ${String(e)} has duplicate value ${String(i)}`,
                );
              r.set(i, s);
            }
          }
          return new en({
            typeName: n.ZodDiscriminatedUnion,
            discriminator: e,
            options: t,
            optionsMap: r,
            ...x(s),
          });
        }
      }
      class eo extends j {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e),
            i = (e, i) => {
              if (v(e) || v(i)) return m;
              let a = (function e(t, s) {
                let i = u(t),
                  a = u(s);
                if (t === s) return { valid: !0, data: t };
                if (i === l.object && a === l.object) {
                  let i = r.objectKeys(s),
                    a = r.objectKeys(t).filter((e) => -1 !== i.indexOf(e)),
                    n = { ...t, ...s };
                  for (let r of a) {
                    let i = e(t[r], s[r]);
                    if (!i.valid) return { valid: !1 };
                    n[r] = i.data;
                  }
                  return { valid: !0, data: n };
                }
                if (i === l.array && a === l.array) {
                  if (t.length !== s.length) return { valid: !1 };
                  let r = [];
                  for (let i = 0; i < t.length; i++) {
                    let a = e(t[i], s[i]);
                    if (!a.valid) return { valid: !1 };
                    r.push(a.data);
                  }
                  return { valid: !0, data: r };
                }
                if (i === l.date && a === l.date && +t == +s)
                  return { valid: !0, data: t };
                return { valid: !1 };
              })(e.value, i.value);
              return a.valid
                ? ((w(e) || w(i)) && t.dirty(),
                  { status: t.value, value: a.data })
                : (p(s, { code: h.invalid_intersection_types }), m);
            };
          return s.common.async
            ? Promise.all([
                this._def.left._parseAsync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
                this._def.right._parseAsync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
              ]).then(([e, t]) => i(e, t))
            : i(
                this._def.left._parseSync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
                this._def.right._parseSync({
                  data: s.data,
                  path: s.path,
                  parent: s,
                }),
              );
        }
      }
      eo.create = (e, t, s) =>
        new eo({ left: e, right: t, typeName: n.ZodIntersection, ...x(s) });
      class el extends j {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== l.array)
            return (
              p(s, {
                code: h.invalid_type,
                expected: l.array,
                received: s.parsedType,
              }),
              m
            );
          if (s.data.length < this._def.items.length)
            return (
              p(s, {
                code: h.too_small,
                minimum: this._def.items.length,
                inclusive: !0,
                exact: !1,
                type: "array",
              }),
              m
            );
          !this._def.rest &&
            s.data.length > this._def.items.length &&
            (p(s, {
              code: h.too_big,
              maximum: this._def.items.length,
              inclusive: !0,
              exact: !1,
              type: "array",
            }),
            t.dirty());
          let r = [...s.data]
            .map((e, t) => {
              let r = this._def.items[t] || this._def.rest;
              return r ? r._parse(new T(s, e, s.path, t)) : null;
            })
            .filter((e) => !!e);
          return s.common.async
            ? Promise.all(r).then((e) => g.mergeArray(t, e))
            : g.mergeArray(t, r);
        }
        get items() {
          return this._def.items;
        }
        rest(e) {
          return new el({ ...this._def, rest: e });
        }
      }
      el.create = (e, t) => {
        if (!Array.isArray(e))
          throw Error("You must pass an array of schemas to z.tuple([ ... ])");
        return new el({ items: e, typeName: n.ZodTuple, rest: null, ...x(t) });
      };
      class eu extends j {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== l.object)
            return (
              p(s, {
                code: h.invalid_type,
                expected: l.object,
                received: s.parsedType,
              }),
              m
            );
          let r = [],
            i = this._def.keyType,
            a = this._def.valueType;
          for (let e in s.data)
            r.push({
              key: i._parse(new T(s, e, s.path, e)),
              value: a._parse(new T(s, s.data[e], s.path, e)),
              alwaysSet: e in s.data,
            });
          return s.common.async
            ? g.mergeObjectAsync(t, r)
            : g.mergeObjectSync(t, r);
        }
        get element() {
          return this._def.valueType;
        }
        static create(e, t, s) {
          return new eu(
            t instanceof j
              ? { keyType: e, valueType: t, typeName: n.ZodRecord, ...x(s) }
              : {
                  keyType: z.create(),
                  valueType: e,
                  typeName: n.ZodRecord,
                  ...x(t),
                },
          );
        }
      }
      class eh extends j {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== l.map)
            return (
              p(s, {
                code: h.invalid_type,
                expected: l.map,
                received: s.parsedType,
              }),
              m
            );
          let r = this._def.keyType,
            i = this._def.valueType,
            a = [...s.data.entries()].map(([e, t], a) => ({
              key: r._parse(new T(s, e, s.path, [a, "key"])),
              value: i._parse(new T(s, t, s.path, [a, "value"])),
            }));
          if (s.common.async) {
            let e = new Map();
            return Promise.resolve().then(async () => {
              for (let s of a) {
                let r = await s.key,
                  i = await s.value;
                if ("aborted" === r.status || "aborted" === i.status) return m;
                ("dirty" === r.status || "dirty" === i.status) && t.dirty(),
                  e.set(r.value, i.value);
              }
              return { status: t.value, value: e };
            });
          }
          {
            let e = new Map();
            for (let s of a) {
              let r = s.key,
                i = s.value;
              if ("aborted" === r.status || "aborted" === i.status) return m;
              ("dirty" === r.status || "dirty" === i.status) && t.dirty(),
                e.set(r.value, i.value);
            }
            return { status: t.value, value: e };
          }
        }
      }
      eh.create = (e, t, s) =>
        new eh({ valueType: t, keyType: e, typeName: n.ZodMap, ...x(s) });
      class ec extends j {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.parsedType !== l.set)
            return (
              p(s, {
                code: h.invalid_type,
                expected: l.set,
                received: s.parsedType,
              }),
              m
            );
          let r = this._def;
          null !== r.minSize &&
            s.data.size < r.minSize.value &&
            (p(s, {
              code: h.too_small,
              minimum: r.minSize.value,
              type: "set",
              inclusive: !0,
              exact: !1,
              message: r.minSize.message,
            }),
            t.dirty()),
            null !== r.maxSize &&
              s.data.size > r.maxSize.value &&
              (p(s, {
                code: h.too_big,
                maximum: r.maxSize.value,
                type: "set",
                inclusive: !0,
                exact: !1,
                message: r.maxSize.message,
              }),
              t.dirty());
          let i = this._def.valueType;
          function a(e) {
            let s = new Set();
            for (let r of e) {
              if ("aborted" === r.status) return m;
              "dirty" === r.status && t.dirty(), s.add(r.value);
            }
            return { status: t.value, value: s };
          }
          let n = [...s.data.values()].map((e, t) =>
            i._parse(new T(s, e, s.path, t)),
          );
          return s.common.async ? Promise.all(n).then((e) => a(e)) : a(n);
        }
        min(e, t) {
          return new ec({
            ...this._def,
            minSize: { value: e, message: a.toString(t) },
          });
        }
        max(e, t) {
          return new ec({
            ...this._def,
            maxSize: { value: e, message: a.toString(t) },
          });
        }
        size(e, t) {
          return this.min(e, t).max(e, t);
        }
        nonempty(e) {
          return this.min(1, e);
        }
      }
      ec.create = (e, t) =>
        new ec({
          valueType: e,
          minSize: null,
          maxSize: null,
          typeName: n.ZodSet,
          ...x(t),
        });
      class ed extends j {
        constructor() {
          super(...arguments), (this.validate = this.implement);
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          if (t.parsedType !== l.function)
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.function,
                received: t.parsedType,
              }),
              m
            );
          function s(e, s) {
            return f({
              data: e,
              path: t.path,
              errorMaps: [
                t.common.contextualErrorMap,
                t.schemaErrorMap,
                d,
                d,
              ].filter((e) => !!e),
              issueData: { code: h.invalid_arguments, argumentsError: s },
            });
          }
          function r(e, s) {
            return f({
              data: e,
              path: t.path,
              errorMaps: [
                t.common.contextualErrorMap,
                t.schemaErrorMap,
                d,
                d,
              ].filter((e) => !!e),
              issueData: { code: h.invalid_return_type, returnTypeError: s },
            });
          }
          let i = { errorMap: t.common.contextualErrorMap },
            a = t.data;
          if (this._def.returns instanceof e_) {
            let e = this;
            return _(async function (...t) {
              let n = new c([]),
                o = await e._def.args.parseAsync(t, i).catch((e) => {
                  throw (n.addIssue(s(t, e)), n);
                }),
                l = await Reflect.apply(a, this, o);
              return await e._def.returns._def.type
                .parseAsync(l, i)
                .catch((e) => {
                  throw (n.addIssue(r(l, e)), n);
                });
            });
          }
          {
            let e = this;
            return _(function (...t) {
              let n = e._def.args.safeParse(t, i);
              if (!n.success) throw new c([s(t, n.error)]);
              let o = Reflect.apply(a, this, n.data),
                l = e._def.returns.safeParse(o, i);
              if (!l.success) throw new c([r(o, l.error)]);
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
          return new ed({ ...this._def, args: el.create(e).rest(Q.create()) });
        }
        returns(e) {
          return new ed({ ...this._def, returns: e });
        }
        implement(e) {
          return this.parse(e);
        }
        strictImplement(e) {
          return this.parse(e);
        }
        static create(e, t, s) {
          return new ed({
            args: e || el.create([]).rest(Q.create()),
            returns: t || Q.create(),
            typeName: n.ZodFunction,
            ...x(s),
          });
        }
      }
      class ef extends j {
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
      ef.create = (e, t) => new ef({ getter: e, typeName: n.ZodLazy, ...x(t) });
      class ep extends j {
        _parse(e) {
          if (e.data !== this._def.value) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                received: t.data,
                code: h.invalid_literal,
                expected: this._def.value,
              }),
              m
            );
          }
          return { status: "valid", value: e.data };
        }
        get value() {
          return this._def.value;
        }
      }
      function eg(e, t) {
        return new em({ values: e, typeName: n.ZodEnum, ...x(t) });
      }
      ep.create = (e, t) =>
        new ep({ value: e, typeName: n.ZodLiteral, ...x(t) });
      class em extends j {
        _parse(e) {
          if ("string" != typeof e.data) {
            let t = this._getOrReturnCtx(e),
              s = this._def.values;
            return (
              p(t, {
                expected: r.joinValues(s),
                received: t.parsedType,
                code: h.invalid_type,
              }),
              m
            );
          }
          if (
            (this._cache || (this._cache = new Set(this._def.values)),
            !this._cache.has(e.data))
          ) {
            let t = this._getOrReturnCtx(e),
              s = this._def.values;
            return (
              p(t, {
                received: t.data,
                code: h.invalid_enum_value,
                options: s,
              }),
              m
            );
          }
          return _(e.data);
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
          return em.create(e, { ...this._def, ...t });
        }
        exclude(e, t = this._def) {
          return em.create(
            this.options.filter((t) => !e.includes(t)),
            { ...this._def, ...t },
          );
        }
      }
      em.create = eg;
      class ey extends j {
        _parse(e) {
          let t = r.getValidEnumValues(this._def.values),
            s = this._getOrReturnCtx(e);
          if (s.parsedType !== l.string && s.parsedType !== l.number) {
            let e = r.objectValues(t);
            return (
              p(s, {
                expected: r.joinValues(e),
                received: s.parsedType,
                code: h.invalid_type,
              }),
              m
            );
          }
          if (
            (this._cache ||
              (this._cache = new Set(r.getValidEnumValues(this._def.values))),
            !this._cache.has(e.data))
          ) {
            let e = r.objectValues(t);
            return (
              p(s, {
                received: s.data,
                code: h.invalid_enum_value,
                options: e,
              }),
              m
            );
          }
          return _(e.data);
        }
        get enum() {
          return this._def.values;
        }
      }
      ey.create = (e, t) =>
        new ey({ values: e, typeName: n.ZodNativeEnum, ...x(t) });
      class e_ extends j {
        unwrap() {
          return this._def.type;
        }
        _parse(e) {
          let { ctx: t } = this._processInputParams(e);
          return t.parsedType !== l.promise && !1 === t.common.async
            ? (p(t, {
                code: h.invalid_type,
                expected: l.promise,
                received: t.parsedType,
              }),
              m)
            : _(
                (t.parsedType === l.promise
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
      e_.create = (e, t) =>
        new e_({ type: e, typeName: n.ZodPromise, ...x(t) });
      class ev extends j {
        innerType() {
          return this._def.schema;
        }
        sourceType() {
          return this._def.schema._def.typeName === n.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
        }
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e),
            i = this._def.effect || null,
            a = {
              addIssue: (e) => {
                p(s, e), e.fatal ? t.abort() : t.dirty();
              },
              get path() {
                return s.path;
              },
            };
          if (((a.addIssue = a.addIssue.bind(a)), "preprocess" === i.type)) {
            let e = i.transform(s.data, a);
            if (s.common.async)
              return Promise.resolve(e).then(async (e) => {
                if ("aborted" === t.value) return m;
                let r = await this._def.schema._parseAsync({
                  data: e,
                  path: s.path,
                  parent: s,
                });
                return "aborted" === r.status
                  ? m
                  : "dirty" === r.status || "dirty" === t.value
                    ? y(r.value)
                    : r;
              });
            {
              if ("aborted" === t.value) return m;
              let r = this._def.schema._parseSync({
                data: e,
                path: s.path,
                parent: s,
              });
              return "aborted" === r.status
                ? m
                : "dirty" === r.status || "dirty" === t.value
                  ? y(r.value)
                  : r;
            }
          }
          if ("refinement" === i.type) {
            let e = (e) => {
              let t = i.refinement(e, a);
              if (s.common.async) return Promise.resolve(t);
              if (t instanceof Promise)
                throw Error(
                  "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
                );
              return e;
            };
            if (!1 !== s.common.async)
              return this._def.schema
                ._parseAsync({ data: s.data, path: s.path, parent: s })
                .then((s) =>
                  "aborted" === s.status
                    ? m
                    : ("dirty" === s.status && t.dirty(),
                      e(s.value).then(() => ({
                        status: t.value,
                        value: s.value,
                      }))),
                );
            {
              let r = this._def.schema._parseSync({
                data: s.data,
                path: s.path,
                parent: s,
              });
              return "aborted" === r.status
                ? m
                : ("dirty" === r.status && t.dirty(),
                  e(r.value),
                  { status: t.value, value: r.value });
            }
          }
          if ("transform" === i.type)
            if (!1 !== s.common.async)
              return this._def.schema
                ._parseAsync({ data: s.data, path: s.path, parent: s })
                .then((e) =>
                  b(e)
                    ? Promise.resolve(i.transform(e.value, a)).then((e) => ({
                        status: t.value,
                        value: e,
                      }))
                    : m,
                );
            else {
              let e = this._def.schema._parseSync({
                data: s.data,
                path: s.path,
                parent: s,
              });
              if (!b(e)) return m;
              let r = i.transform(e.value, a);
              if (r instanceof Promise)
                throw Error(
                  "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
                );
              return { status: t.value, value: r };
            }
          r.assertNever(i);
        }
      }
      (ev.create = (e, t, s) =>
        new ev({ schema: e, typeName: n.ZodEffects, effect: t, ...x(s) })),
        (ev.createWithPreprocess = (e, t, s) =>
          new ev({
            schema: t,
            effect: { type: "preprocess", transform: e },
            typeName: n.ZodEffects,
            ...x(s),
          }));
      class ew extends j {
        _parse(e) {
          return this._getType(e) === l.undefined
            ? _(void 0)
            : this._def.innerType._parse(e);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      ew.create = (e, t) =>
        new ew({ innerType: e, typeName: n.ZodOptional, ...x(t) });
      class eb extends j {
        _parse(e) {
          return this._getType(e) === l.null
            ? _(null)
            : this._def.innerType._parse(e);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      eb.create = (e, t) =>
        new eb({ innerType: e, typeName: n.ZodNullable, ...x(t) });
      class ek extends j {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = t.data;
          return (
            t.parsedType === l.undefined && (s = this._def.defaultValue()),
            this._def.innerType._parse({ data: s, path: t.path, parent: t })
          );
        }
        removeDefault() {
          return this._def.innerType;
        }
      }
      ek.create = (e, t) =>
        new ek({
          innerType: e,
          typeName: n.ZodDefault,
          defaultValue:
            "function" == typeof t.default ? t.default : () => t.default,
          ...x(t),
        });
      class eT extends j {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = { ...t, common: { ...t.common, issues: [] } },
            r = this._def.innerType._parse({
              data: s.data,
              path: s.path,
              parent: { ...s },
            });
          return k(r)
            ? r.then((e) => ({
                status: "valid",
                value:
                  "valid" === e.status
                    ? e.value
                    : this._def.catchValue({
                        get error() {
                          return new c(s.common.issues);
                        },
                        input: s.data,
                      }),
              }))
            : {
                status: "valid",
                value:
                  "valid" === r.status
                    ? r.value
                    : this._def.catchValue({
                        get error() {
                          return new c(s.common.issues);
                        },
                        input: s.data,
                      }),
              };
        }
        removeCatch() {
          return this._def.innerType;
        }
      }
      eT.create = (e, t) =>
        new eT({
          innerType: e,
          typeName: n.ZodCatch,
          catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
          ...x(t),
        });
      class eS extends j {
        _parse(e) {
          if (this._getType(e) !== l.nan) {
            let t = this._getOrReturnCtx(e);
            return (
              p(t, {
                code: h.invalid_type,
                expected: l.nan,
                received: t.parsedType,
              }),
              m
            );
          }
          return { status: "valid", value: e.data };
        }
      }
      (eS.create = (e) => new eS({ typeName: n.ZodNaN, ...x(e) })),
        Symbol("zod_brand");
      class ex extends j {
        _parse(e) {
          let { ctx: t } = this._processInputParams(e),
            s = t.data;
          return this._def.type._parse({ data: s, path: t.path, parent: t });
        }
        unwrap() {
          return this._def.type;
        }
      }
      class ej extends j {
        _parse(e) {
          let { status: t, ctx: s } = this._processInputParams(e);
          if (s.common.async)
            return (async () => {
              let e = await this._def.in._parseAsync({
                data: s.data,
                path: s.path,
                parent: s,
              });
              return "aborted" === e.status
                ? m
                : "dirty" === e.status
                  ? (t.dirty(), y(e.value))
                  : this._def.out._parseAsync({
                      data: e.value,
                      path: s.path,
                      parent: s,
                    });
            })();
          {
            let e = this._def.in._parseSync({
              data: s.data,
              path: s.path,
              parent: s,
            });
            return "aborted" === e.status
              ? m
              : "dirty" === e.status
                ? (t.dirty(), { status: "dirty", value: e.value })
                : this._def.out._parseSync({
                    data: e.value,
                    path: s.path,
                    parent: s,
                  });
          }
        }
        static create(e, t) {
          return new ej({ in: e, out: t, typeName: n.ZodPipeline });
        }
      }
      class eO extends j {
        _parse(e) {
          let t = this._def.innerType._parse(e),
            s = (e) => (b(e) && (e.value = Object.freeze(e.value)), e);
          return k(t) ? t.then((e) => s(e)) : s(t);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      (eO.create = (e, t) =>
        new eO({ innerType: e, typeName: n.ZodReadonly, ...x(t) })),
        er.lazycreate,
        (function (e) {
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
        })(n || (n = {}));
      let eE = z.create,
        eA = K.create;
      eS.create, W.create;
      let eC = V.create;
      J.create, H.create, G.create, Y.create;
      let eP = X.create;
      Q.create, ee.create, et.create;
      let e$ = es.create,
        eI = er.create;
      er.strictCreate;
      let eR = ei.create,
        eN = en.create;
      eo.create, el.create;
      let eL = eu.create;
      eh.create, ec.create, ed.create, ef.create;
      let eU = ep.create,
        eD = em.create,
        eM = ey.create;
      e_.create,
        ev.create,
        ew.create,
        eb.create,
        ev.createWithPreprocess,
        ej.create;
    },
    20913: function (e, t, s) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PostgrestError =
          t.PostgrestBuilder =
          t.PostgrestTransformBuilder =
          t.PostgrestFilterBuilder =
          t.PostgrestQueryBuilder =
          t.PostgrestClient =
            void 0);
      let i = r(s(49111));
      t.PostgrestClient = i.default;
      let a = r(s(72519));
      t.PostgrestQueryBuilder = a.default;
      let n = r(s(21203));
      t.PostgrestFilterBuilder = n.default;
      let o = r(s(48699));
      t.PostgrestTransformBuilder = o.default;
      let l = r(s(80701));
      t.PostgrestBuilder = l.default;
      let u = r(s(25528));
      (t.PostgrestError = u.default),
        (t.default = {
          PostgrestClient: i.default,
          PostgrestQueryBuilder: a.default,
          PostgrestFilterBuilder: n.default,
          PostgrestTransformBuilder: o.default,
          PostgrestBuilder: l.default,
          PostgrestError: u.default,
        });
    },
    21203: function (e, t, s) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = r(s(48699));
      class a extends i.default {
        eq(e, t) {
          return this.url.searchParams.append(e, `eq.${t}`), this;
        }
        neq(e, t) {
          return this.url.searchParams.append(e, `neq.${t}`), this;
        }
        gt(e, t) {
          return this.url.searchParams.append(e, `gt.${t}`), this;
        }
        gte(e, t) {
          return this.url.searchParams.append(e, `gte.${t}`), this;
        }
        lt(e, t) {
          return this.url.searchParams.append(e, `lt.${t}`), this;
        }
        lte(e, t) {
          return this.url.searchParams.append(e, `lte.${t}`), this;
        }
        like(e, t) {
          return this.url.searchParams.append(e, `like.${t}`), this;
        }
        likeAllOf(e, t) {
          return (
            this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this
          );
        }
        likeAnyOf(e, t) {
          return (
            this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this
          );
        }
        ilike(e, t) {
          return this.url.searchParams.append(e, `ilike.${t}`), this;
        }
        ilikeAllOf(e, t) {
          return (
            this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this
          );
        }
        ilikeAnyOf(e, t) {
          return (
            this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this
          );
        }
        is(e, t) {
          return this.url.searchParams.append(e, `is.${t}`), this;
        }
        in(e, t) {
          let s = Array.from(new Set(t))
            .map((e) =>
              "string" == typeof e && RegExp("[,()]").test(e)
                ? `"${e}"`
                : `${e}`,
            )
            .join(",");
          return this.url.searchParams.append(e, `in.(${s})`), this;
        }
        contains(e, t) {
          return (
            "string" == typeof t
              ? this.url.searchParams.append(e, `cs.${t}`)
              : Array.isArray(t)
                ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`)
                : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`),
            this
          );
        }
        containedBy(e, t) {
          return (
            "string" == typeof t
              ? this.url.searchParams.append(e, `cd.${t}`)
              : Array.isArray(t)
                ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`)
                : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`),
            this
          );
        }
        rangeGt(e, t) {
          return this.url.searchParams.append(e, `sr.${t}`), this;
        }
        rangeGte(e, t) {
          return this.url.searchParams.append(e, `nxl.${t}`), this;
        }
        rangeLt(e, t) {
          return this.url.searchParams.append(e, `sl.${t}`), this;
        }
        rangeLte(e, t) {
          return this.url.searchParams.append(e, `nxr.${t}`), this;
        }
        rangeAdjacent(e, t) {
          return this.url.searchParams.append(e, `adj.${t}`), this;
        }
        overlaps(e, t) {
          return (
            "string" == typeof t
              ? this.url.searchParams.append(e, `ov.${t}`)
              : this.url.searchParams.append(e, `ov.{${t.join(",")}}`),
            this
          );
        }
        textSearch(e, t, { config: s, type: r } = {}) {
          let i = "";
          "plain" === r
            ? (i = "pl")
            : "phrase" === r
              ? (i = "ph")
              : "websearch" === r && (i = "w");
          let a = void 0 === s ? "" : `(${s})`;
          return this.url.searchParams.append(e, `${i}fts${a}.${t}`), this;
        }
        match(e) {
          return (
            Object.entries(e).forEach(([e, t]) => {
              this.url.searchParams.append(e, `eq.${t}`);
            }),
            this
          );
        }
        not(e, t, s) {
          return this.url.searchParams.append(e, `not.${t}.${s}`), this;
        }
        or(e, { foreignTable: t, referencedTable: s = t } = {}) {
          let r = s ? `${s}.or` : "or";
          return this.url.searchParams.append(r, `(${e})`), this;
        }
        filter(e, t, s) {
          return this.url.searchParams.append(e, `${t}.${s}`), this;
        }
      }
      t.default = a;
    },
    25528: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 });
      class s extends Error {
        constructor(e) {
          super(e.message),
            (this.name = "PostgrestError"),
            (this.details = e.details),
            (this.hint = e.hint),
            (this.code = e.code);
        }
      }
      t.default = s;
    },
    48256: (e, t, s) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DEFAULT_HEADERS = void 0);
      let r = s(65809);
      t.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${r.version}` };
    },
    48699: function (e, t, s) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = r(s(80701));
      class a extends i.default {
        select(e) {
          let t = !1,
            s = (null != e ? e : "*")
              .split("")
              .map((e) =>
                /\s/.test(e) && !t ? "" : ('"' === e && (t = !t), e),
              )
              .join("");
          return (
            this.url.searchParams.set("select", s),
            this.headers.Prefer && (this.headers.Prefer += ","),
            (this.headers.Prefer += "return=representation"),
            this
          );
        }
        order(
          e,
          {
            ascending: t = !0,
            nullsFirst: s,
            foreignTable: r,
            referencedTable: i = r,
          } = {},
        ) {
          let a = i ? `${i}.order` : "order",
            n = this.url.searchParams.get(a);
          return (
            this.url.searchParams.set(
              a,
              `${n ? `${n},` : ""}${e}.${t ? "asc" : "desc"}${void 0 === s ? "" : s ? ".nullsfirst" : ".nullslast"}`,
            ),
            this
          );
        }
        limit(e, { foreignTable: t, referencedTable: s = t } = {}) {
          let r = void 0 === s ? "limit" : `${s}.limit`;
          return this.url.searchParams.set(r, `${e}`), this;
        }
        range(e, t, { foreignTable: s, referencedTable: r = s } = {}) {
          let i = void 0 === r ? "offset" : `${r}.offset`,
            a = void 0 === r ? "limit" : `${r}.limit`;
          return (
            this.url.searchParams.set(i, `${e}`),
            this.url.searchParams.set(a, `${t - e + 1}`),
            this
          );
        }
        abortSignal(e) {
          return (this.signal = e), this;
        }
        single() {
          return (
            (this.headers.Accept = "application/vnd.pgrst.object+json"), this
          );
        }
        maybeSingle() {
          return (
            "GET" === this.method
              ? (this.headers.Accept = "application/json")
              : (this.headers.Accept = "application/vnd.pgrst.object+json"),
            (this.isMaybeSingle = !0),
            this
          );
        }
        csv() {
          return (this.headers.Accept = "text/csv"), this;
        }
        geojson() {
          return (this.headers.Accept = "application/geo+json"), this;
        }
        explain({
          analyze: e = !1,
          verbose: t = !1,
          settings: s = !1,
          buffers: r = !1,
          wal: i = !1,
          format: a = "text",
        } = {}) {
          var n;
          let o = [
              e ? "analyze" : null,
              t ? "verbose" : null,
              s ? "settings" : null,
              r ? "buffers" : null,
              i ? "wal" : null,
            ]
              .filter(Boolean)
              .join("|"),
            l = null != (n = this.headers.Accept) ? n : "application/json";
          return (
            (this.headers.Accept = `application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),
            this
          );
        }
        rollback() {
          var e;
          return (
            (null != (e = this.headers.Prefer) ? e : "").trim().length > 0
              ? (this.headers.Prefer += ",tx=rollback")
              : (this.headers.Prefer = "tx=rollback"),
            this
          );
        }
        returns() {
          return this;
        }
      }
      t.default = a;
    },
    49111: function (e, t, s) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = r(s(72519)),
        a = r(s(21203)),
        n = s(48256);
      class o {
        constructor(e, { headers: t = {}, schema: s, fetch: r } = {}) {
          (this.url = e),
            (this.headers = Object.assign(
              Object.assign({}, n.DEFAULT_HEADERS),
              t,
            )),
            (this.schemaName = s),
            (this.fetch = r);
        }
        from(e) {
          let t = new URL(`${this.url}/${e}`);
          return new i.default(t, {
            headers: Object.assign({}, this.headers),
            schema: this.schemaName,
            fetch: this.fetch,
          });
        }
        schema(e) {
          return new o(this.url, {
            headers: this.headers,
            schema: e,
            fetch: this.fetch,
          });
        }
        rpc(e, t = {}, { head: s = !1, get: r = !1, count: i } = {}) {
          let n,
            o,
            l = new URL(`${this.url}/rpc/${e}`);
          s || r
            ? ((n = s ? "HEAD" : "GET"),
              Object.entries(t)
                .filter(([e, t]) => void 0 !== t)
                .map(([e, t]) => [
                  e,
                  Array.isArray(t) ? `{${t.join(",")}}` : `${t}`,
                ])
                .forEach(([e, t]) => {
                  l.searchParams.append(e, t);
                }))
            : ((n = "POST"), (o = t));
          let u = Object.assign({}, this.headers);
          return (
            i && (u.Prefer = `count=${i}`),
            new a.default({
              method: n,
              url: l,
              headers: u,
              schema: this.schemaName,
              body: o,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
      }
      t.default = o;
    },
    65809: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.version = void 0),
        (t.version = "0.0.0-automated");
    },
    72519: function (e, t, s) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = r(s(21203));
      class a {
        constructor(e, { headers: t = {}, schema: s, fetch: r }) {
          (this.url = e),
            (this.headers = t),
            (this.schema = s),
            (this.fetch = r);
        }
        select(e, { head: t = !1, count: s } = {}) {
          let r = !1,
            a = (null != e ? e : "*")
              .split("")
              .map((e) =>
                /\s/.test(e) && !r ? "" : ('"' === e && (r = !r), e),
              )
              .join("");
          return (
            this.url.searchParams.set("select", a),
            s && (this.headers.Prefer = `count=${s}`),
            new i.default({
              method: t ? "HEAD" : "GET",
              url: this.url,
              headers: this.headers,
              schema: this.schema,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
        insert(e, { count: t, defaultToNull: s = !0 } = {}) {
          let r = [];
          if (
            (this.headers.Prefer && r.push(this.headers.Prefer),
            t && r.push(`count=${t}`),
            s || r.push("missing=default"),
            (this.headers.Prefer = r.join(",")),
            Array.isArray(e))
          ) {
            let t = e.reduce((e, t) => e.concat(Object.keys(t)), []);
            if (t.length > 0) {
              let e = [...new Set(t)].map((e) => `"${e}"`);
              this.url.searchParams.set("columns", e.join(","));
            }
          }
          return new i.default({
            method: "POST",
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: e,
            fetch: this.fetch,
            allowEmpty: !1,
          });
        }
        upsert(
          e,
          {
            onConflict: t,
            ignoreDuplicates: s = !1,
            count: r,
            defaultToNull: a = !0,
          } = {},
        ) {
          let n = [`resolution=${s ? "ignore" : "merge"}-duplicates`];
          if (
            (void 0 !== t && this.url.searchParams.set("on_conflict", t),
            this.headers.Prefer && n.push(this.headers.Prefer),
            r && n.push(`count=${r}`),
            a || n.push("missing=default"),
            (this.headers.Prefer = n.join(",")),
            Array.isArray(e))
          ) {
            let t = e.reduce((e, t) => e.concat(Object.keys(t)), []);
            if (t.length > 0) {
              let e = [...new Set(t)].map((e) => `"${e}"`);
              this.url.searchParams.set("columns", e.join(","));
            }
          }
          return new i.default({
            method: "POST",
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: e,
            fetch: this.fetch,
            allowEmpty: !1,
          });
        }
        update(e, { count: t } = {}) {
          let s = [];
          return (
            this.headers.Prefer && s.push(this.headers.Prefer),
            t && s.push(`count=${t}`),
            (this.headers.Prefer = s.join(",")),
            new i.default({
              method: "PATCH",
              url: this.url,
              headers: this.headers,
              schema: this.schema,
              body: e,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
        delete({ count: e } = {}) {
          let t = [];
          return (
            e && t.push(`count=${e}`),
            this.headers.Prefer && t.unshift(this.headers.Prefer),
            (this.headers.Prefer = t.join(",")),
            new i.default({
              method: "DELETE",
              url: this.url,
              headers: this.headers,
              schema: this.schema,
              fetch: this.fetch,
              allowEmpty: !1,
            })
          );
        }
      }
      t.default = a;
    },
    80701: function (e, t, s) {
      var r =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 });
      let i = r(s(15138)),
        a = r(s(25528));
      class n {
        constructor(e) {
          (this.shouldThrowOnError = !1),
            (this.method = e.method),
            (this.url = e.url),
            (this.headers = e.headers),
            (this.schema = e.schema),
            (this.body = e.body),
            (this.shouldThrowOnError = e.shouldThrowOnError),
            (this.signal = e.signal),
            (this.isMaybeSingle = e.isMaybeSingle),
            e.fetch
              ? (this.fetch = e.fetch)
              : "undefined" == typeof fetch
                ? (this.fetch = i.default)
                : (this.fetch = fetch);
        }
        throwOnError() {
          return (this.shouldThrowOnError = !0), this;
        }
        setHeader(e, t) {
          return (
            (this.headers = Object.assign({}, this.headers)),
            (this.headers[e] = t),
            this
          );
        }
        then(e, t) {
          void 0 === this.schema ||
            (["GET", "HEAD"].includes(this.method)
              ? (this.headers["Accept-Profile"] = this.schema)
              : (this.headers["Content-Profile"] = this.schema)),
            "GET" !== this.method &&
              "HEAD" !== this.method &&
              (this.headers["Content-Type"] = "application/json");
          let s = (0, this.fetch)(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal,
          }).then(async (e) => {
            var t, s, r;
            let i = null,
              n = null,
              o = null,
              l = e.status,
              u = e.statusText;
            if (e.ok) {
              if ("HEAD" !== this.method) {
                let t = await e.text();
                "" === t ||
                  (n =
                    "text/csv" === this.headers.Accept ||
                    (this.headers.Accept &&
                      this.headers.Accept.includes(
                        "application/vnd.pgrst.plan+text",
                      ))
                      ? t
                      : JSON.parse(t));
              }
              let r =
                  null == (t = this.headers.Prefer)
                    ? void 0
                    : t.match(/count=(exact|planned|estimated)/),
                a =
                  null == (s = e.headers.get("content-range"))
                    ? void 0
                    : s.split("/");
              r && a && a.length > 1 && (o = parseInt(a[1])),
                this.isMaybeSingle &&
                  "GET" === this.method &&
                  Array.isArray(n) &&
                  (n.length > 1
                    ? ((i = {
                        code: "PGRST116",
                        details: `Results contain ${n.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                        hint: null,
                        message:
                          "JSON object requested, multiple (or no) rows returned",
                      }),
                      (n = null),
                      (o = null),
                      (l = 406),
                      (u = "Not Acceptable"))
                    : (n = 1 === n.length ? n[0] : null));
            } else {
              let t = await e.text();
              try {
                (i = JSON.parse(t)),
                  Array.isArray(i) &&
                    404 === e.status &&
                    ((n = []), (i = null), (l = 200), (u = "OK"));
              } catch (s) {
                404 === e.status && "" === t
                  ? ((l = 204), (u = "No Content"))
                  : (i = { message: t });
              }
              if (
                (i &&
                  this.isMaybeSingle &&
                  (null == (r = null == i ? void 0 : i.details)
                    ? void 0
                    : r.includes("0 rows")) &&
                  ((i = null), (l = 200), (u = "OK")),
                i && this.shouldThrowOnError)
              )
                throw new a.default(i);
            }
            return { error: i, data: n, count: o, status: l, statusText: u };
          });
          return (
            this.shouldThrowOnError ||
              (s = s.catch((e) => {
                var t, s, r;
                return {
                  error: {
                    message: `${null != (t = null == e ? void 0 : e.name) ? t : "FetchError"}: ${null == e ? void 0 : e.message}`,
                    details: `${null != (s = null == e ? void 0 : e.stack) ? s : ""}`,
                    hint: "",
                    code: `${null != (r = null == e ? void 0 : e.code) ? r : ""}`,
                  },
                  data: null,
                  count: null,
                  status: 0,
                  statusText: "",
                };
              })),
            s.then(e, t)
          );
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      }
      t.default = n;
    },
    85030: (e, t, s) => {
      let r;
      s.d(t, { UU: () => tR });
      let i = (e) => {
        let t;
        return (
          (t =
            e ||
            ("undefined" == typeof fetch
              ? (...e) =>
                  Promise.resolve()
                    .then(s.bind(s, 15138))
                    .then(({ default: t }) => t(...e))
              : fetch)),
          (...e) => t(...e)
        );
      };
      class a extends Error {
        constructor(e, t = "FunctionsError", s) {
          super(e), (this.name = t), (this.context = s);
        }
      }
      class n extends a {
        constructor(e) {
          super(
            "Failed to send a request to the Edge Function",
            "FunctionsFetchError",
            e,
          );
        }
      }
      class o extends a {
        constructor(e) {
          super(
            "Relay Error invoking the Edge Function",
            "FunctionsRelayError",
            e,
          );
        }
      }
      class l extends a {
        constructor(e) {
          super(
            "Edge Function returned a non-2xx status code",
            "FunctionsHttpError",
            e,
          );
        }
      }
      !(function (e) {
        (e.Any = "any"),
          (e.ApNortheast1 = "ap-northeast-1"),
          (e.ApNortheast2 = "ap-northeast-2"),
          (e.ApSouth1 = "ap-south-1"),
          (e.ApSoutheast1 = "ap-southeast-1"),
          (e.ApSoutheast2 = "ap-southeast-2"),
          (e.CaCentral1 = "ca-central-1"),
          (e.EuCentral1 = "eu-central-1"),
          (e.EuWest1 = "eu-west-1"),
          (e.EuWest2 = "eu-west-2"),
          (e.EuWest3 = "eu-west-3"),
          (e.SaEast1 = "sa-east-1"),
          (e.UsEast1 = "us-east-1"),
          (e.UsWest1 = "us-west-1"),
          (e.UsWest2 = "us-west-2");
      })(z || (z = {}));
      class u {
        constructor(
          e,
          { headers: t = {}, customFetch: s, region: r = z.Any } = {},
        ) {
          (this.url = e),
            (this.headers = t),
            (this.region = r),
            (this.fetch = i(s));
        }
        setAuth(e) {
          this.headers.Authorization = `Bearer ${e}`;
        }
        invoke(e, t = {}) {
          var s, r, i, a, u;
          return (
            (r = this),
            (i = void 0),
            (a = void 0),
            (u = function* () {
              try {
                let r,
                  i,
                  { headers: a, method: u, body: h } = t,
                  c = {},
                  { region: d } = t;
                d || (d = this.region),
                  d && "any" !== d && (c["x-region"] = d),
                  h &&
                    ((a &&
                      !Object.prototype.hasOwnProperty.call(
                        a,
                        "Content-Type",
                      )) ||
                      !a) &&
                    (("undefined" != typeof Blob && h instanceof Blob) ||
                    h instanceof ArrayBuffer
                      ? ((c["Content-Type"] = "application/octet-stream"),
                        (r = h))
                      : "string" == typeof h
                        ? ((c["Content-Type"] = "text/plain"), (r = h))
                        : "undefined" != typeof FormData &&
                            h instanceof FormData
                          ? (r = h)
                          : ((c["Content-Type"] = "application/json"),
                            (r = JSON.stringify(h))));
                let f = yield this.fetch(`${this.url}/${e}`, {
                    method: u || "POST",
                    headers: Object.assign(
                      Object.assign(Object.assign({}, c), this.headers),
                      a,
                    ),
                    body: r,
                  }).catch((e) => {
                    throw new n(e);
                  }),
                  p = f.headers.get("x-relay-error");
                if (p && "true" === p) throw new o(f);
                if (!f.ok) throw new l(f);
                let g = (
                  null != (s = f.headers.get("Content-Type")) ? s : "text/plain"
                )
                  .split(";")[0]
                  .trim();
                return {
                  data:
                    "application/json" === g
                      ? yield f.json()
                      : "application/octet-stream" === g
                        ? yield f.blob()
                        : "text/event-stream" === g
                          ? f
                          : "multipart/form-data" === g
                            ? yield f.formData()
                            : yield f.text(),
                  error: null,
                };
              } catch (e) {
                return { data: null, error: e };
              }
            }),
            new (a || (a = Promise))(function (e, t) {
              function s(e) {
                try {
                  o(u.next(e));
                } catch (e) {
                  t(e);
                }
              }
              function n(e) {
                try {
                  o(u.throw(e));
                } catch (e) {
                  t(e);
                }
              }
              function o(t) {
                var r;
                t.done
                  ? e(t.value)
                  : ((r = t.value) instanceof a
                      ? r
                      : new a(function (e) {
                          e(r);
                        })
                    ).then(s, n);
              }
              o((u = u.apply(r, i || [])).next());
            })
          );
        }
      }
      let {
          PostgrestClient: h,
          PostgrestQueryBuilder: c,
          PostgrestFilterBuilder: d,
          PostgrestTransformBuilder: f,
          PostgrestBuilder: p,
          PostgrestError: g,
        } = s(20913),
        m = "undefined" == typeof window ? s(16209) : window.WebSocket,
        y = { "X-Client-Info": "realtime-js/2.11.10" };
      !(function (e) {
        (e[(e.connecting = 0)] = "connecting"),
          (e[(e.open = 1)] = "open"),
          (e[(e.closing = 2)] = "closing"),
          (e[(e.closed = 3)] = "closed");
      })(K || (K = {})),
        (function (e) {
          (e.closed = "closed"),
            (e.errored = "errored"),
            (e.joined = "joined"),
            (e.joining = "joining"),
            (e.leaving = "leaving");
        })(W || (W = {})),
        (function (e) {
          (e.close = "phx_close"),
            (e.error = "phx_error"),
            (e.join = "phx_join"),
            (e.reply = "phx_reply"),
            (e.leave = "phx_leave"),
            (e.access_token = "access_token");
        })(V || (V = {})),
        ((J || (J = {})).websocket = "websocket"),
        (function (e) {
          (e.Connecting = "connecting"),
            (e.Open = "open"),
            (e.Closing = "closing"),
            (e.Closed = "closed");
        })(H || (H = {}));
      class _ {
        constructor() {
          this.HEADER_LENGTH = 1;
        }
        decode(e, t) {
          return e.constructor === ArrayBuffer
            ? t(this._binaryDecode(e))
            : "string" == typeof e
              ? t(JSON.parse(e))
              : t({});
        }
        _binaryDecode(e) {
          let t = new DataView(e),
            s = new TextDecoder();
          return this._decodeBroadcast(e, t, s);
        }
        _decodeBroadcast(e, t, s) {
          let r = t.getUint8(1),
            i = t.getUint8(2),
            a = this.HEADER_LENGTH + 2,
            n = s.decode(e.slice(a, a + r));
          a += r;
          let o = s.decode(e.slice(a, a + i));
          return (
            (a += i),
            {
              ref: null,
              topic: n,
              event: o,
              payload: JSON.parse(s.decode(e.slice(a, e.byteLength))),
            }
          );
        }
      }
      class v {
        constructor(e, t) {
          (this.callback = e),
            (this.timerCalc = t),
            (this.timer = void 0),
            (this.tries = 0),
            (this.callback = e),
            (this.timerCalc = t);
        }
        reset() {
          (this.tries = 0), clearTimeout(this.timer);
        }
        scheduleTimeout() {
          clearTimeout(this.timer),
            (this.timer = setTimeout(
              () => {
                (this.tries = this.tries + 1), this.callback();
              },
              this.timerCalc(this.tries + 1),
            ));
        }
      }
      !(function (e) {
        (e.abstime = "abstime"),
          (e.bool = "bool"),
          (e.date = "date"),
          (e.daterange = "daterange"),
          (e.float4 = "float4"),
          (e.float8 = "float8"),
          (e.int2 = "int2"),
          (e.int4 = "int4"),
          (e.int4range = "int4range"),
          (e.int8 = "int8"),
          (e.int8range = "int8range"),
          (e.json = "json"),
          (e.jsonb = "jsonb"),
          (e.money = "money"),
          (e.numeric = "numeric"),
          (e.oid = "oid"),
          (e.reltime = "reltime"),
          (e.text = "text"),
          (e.time = "time"),
          (e.timestamp = "timestamp"),
          (e.timestamptz = "timestamptz"),
          (e.timetz = "timetz"),
          (e.tsrange = "tsrange"),
          (e.tstzrange = "tstzrange");
      })(G || (G = {}));
      let w = (e, t, s = {}) => {
          var r;
          let i = null != (r = s.skipTypes) ? r : [];
          return Object.keys(t).reduce(
            (s, r) => ((s[r] = b(r, e, t, i)), s),
            {},
          );
        },
        b = (e, t, s, r) => {
          let i = t.find((t) => t.name === e),
            a = null == i ? void 0 : i.type,
            n = s[e];
          return a && !r.includes(a) ? k(a, n) : T(n);
        },
        k = (e, t) => {
          if ("_" === e.charAt(0)) return O(t, e.slice(1, e.length));
          switch (e) {
            case G.bool:
              return S(t);
            case G.float4:
            case G.float8:
            case G.int2:
            case G.int4:
            case G.int8:
            case G.numeric:
            case G.oid:
              return x(t);
            case G.json:
            case G.jsonb:
              return j(t);
            case G.timestamp:
              return E(t);
            case G.abstime:
            case G.date:
            case G.daterange:
            case G.int4range:
            case G.int8range:
            case G.money:
            case G.reltime:
            case G.text:
            case G.time:
            case G.timestamptz:
            case G.timetz:
            case G.tsrange:
            case G.tstzrange:
            default:
              return T(t);
          }
        },
        T = (e) => e,
        S = (e) => {
          switch (e) {
            case "t":
              return !0;
            case "f":
              return !1;
            default:
              return e;
          }
        },
        x = (e) => {
          if ("string" == typeof e) {
            let t = parseFloat(e);
            if (!Number.isNaN(t)) return t;
          }
          return e;
        },
        j = (e) => {
          if ("string" == typeof e)
            try {
              return JSON.parse(e);
            } catch (e) {
              console.log(`JSON parse error: ${e}`);
            }
          return e;
        },
        O = (e, t) => {
          if ("string" != typeof e) return e;
          let s = e.length - 1,
            r = e[s];
          if ("{" === e[0] && "}" === r) {
            let r,
              i = e.slice(1, s);
            try {
              r = JSON.parse("[" + i + "]");
            } catch (e) {
              r = i ? i.split(",") : [];
            }
            return r.map((e) => k(t, e));
          }
          return e;
        },
        E = (e) => ("string" == typeof e ? e.replace(" ", "T") : e),
        A = (e) => {
          let t = e;
          return (t = (t = t.replace(/^ws/i, "http")).replace(
            /(\/socket\/websocket|\/socket|\/websocket)\/?$/i,
            "",
          )).replace(/\/+$/, "");
        };
      class C {
        constructor(e, t, s = {}, r = 1e4) {
          (this.channel = e),
            (this.event = t),
            (this.payload = s),
            (this.timeout = r),
            (this.sent = !1),
            (this.timeoutTimer = void 0),
            (this.ref = ""),
            (this.receivedResp = null),
            (this.recHooks = []),
            (this.refEvent = null);
        }
        resend(e) {
          (this.timeout = e),
            this._cancelRefEvent(),
            (this.ref = ""),
            (this.refEvent = null),
            (this.receivedResp = null),
            (this.sent = !1),
            this.send();
        }
        send() {
          this._hasReceived("timeout") ||
            (this.startTimeout(),
            (this.sent = !0),
            this.channel.socket.push({
              topic: this.channel.topic,
              event: this.event,
              payload: this.payload,
              ref: this.ref,
              join_ref: this.channel._joinRef(),
            }));
        }
        updatePayload(e) {
          this.payload = Object.assign(Object.assign({}, this.payload), e);
        }
        receive(e, t) {
          var s;
          return (
            this._hasReceived(e) &&
              t(null == (s = this.receivedResp) ? void 0 : s.response),
            this.recHooks.push({ status: e, callback: t }),
            this
          );
        }
        startTimeout() {
          this.timeoutTimer ||
            ((this.ref = this.channel.socket._makeRef()),
            (this.refEvent = this.channel._replyEventName(this.ref)),
            this.channel._on(this.refEvent, {}, (e) => {
              this._cancelRefEvent(),
                this._cancelTimeout(),
                (this.receivedResp = e),
                this._matchReceive(e);
            }),
            (this.timeoutTimer = setTimeout(() => {
              this.trigger("timeout", {});
            }, this.timeout)));
        }
        trigger(e, t) {
          this.refEvent &&
            this.channel._trigger(this.refEvent, { status: e, response: t });
        }
        destroy() {
          this._cancelRefEvent(), this._cancelTimeout();
        }
        _cancelRefEvent() {
          this.refEvent && this.channel._off(this.refEvent, {});
        }
        _cancelTimeout() {
          clearTimeout(this.timeoutTimer), (this.timeoutTimer = void 0);
        }
        _matchReceive({ status: e, response: t }) {
          this.recHooks
            .filter((t) => t.status === e)
            .forEach((e) => e.callback(t));
        }
        _hasReceived(e) {
          return this.receivedResp && this.receivedResp.status === e;
        }
      }
      !(function (e) {
        (e.SYNC = "sync"), (e.JOIN = "join"), (e.LEAVE = "leave");
      })(Y || (Y = {}));
      class P {
        constructor(e, t) {
          (this.channel = e),
            (this.state = {}),
            (this.pendingDiffs = []),
            (this.joinRef = null),
            (this.caller = {
              onJoin: () => {},
              onLeave: () => {},
              onSync: () => {},
            });
          let s = (null == t ? void 0 : t.events) || {
            state: "presence_state",
            diff: "presence_diff",
          };
          this.channel._on(s.state, {}, (e) => {
            let { onJoin: t, onLeave: s, onSync: r } = this.caller;
            (this.joinRef = this.channel._joinRef()),
              (this.state = P.syncState(this.state, e, t, s)),
              this.pendingDiffs.forEach((e) => {
                this.state = P.syncDiff(this.state, e, t, s);
              }),
              (this.pendingDiffs = []),
              r();
          }),
            this.channel._on(s.diff, {}, (e) => {
              let { onJoin: t, onLeave: s, onSync: r } = this.caller;
              this.inPendingSyncState()
                ? this.pendingDiffs.push(e)
                : ((this.state = P.syncDiff(this.state, e, t, s)), r());
            }),
            this.onJoin((e, t, s) => {
              this.channel._trigger("presence", {
                event: "join",
                key: e,
                currentPresences: t,
                newPresences: s,
              });
            }),
            this.onLeave((e, t, s) => {
              this.channel._trigger("presence", {
                event: "leave",
                key: e,
                currentPresences: t,
                leftPresences: s,
              });
            }),
            this.onSync(() => {
              this.channel._trigger("presence", { event: "sync" });
            });
        }
        static syncState(e, t, s, r) {
          let i = this.cloneDeep(e),
            a = this.transformState(t),
            n = {},
            o = {};
          return (
            this.map(i, (e, t) => {
              a[e] || (o[e] = t);
            }),
            this.map(a, (e, t) => {
              let s = i[e];
              if (s) {
                let r = t.map((e) => e.presence_ref),
                  i = s.map((e) => e.presence_ref),
                  a = t.filter((e) => 0 > i.indexOf(e.presence_ref)),
                  l = s.filter((e) => 0 > r.indexOf(e.presence_ref));
                a.length > 0 && (n[e] = a), l.length > 0 && (o[e] = l);
              } else n[e] = t;
            }),
            this.syncDiff(i, { joins: n, leaves: o }, s, r)
          );
        }
        static syncDiff(e, t, s, r) {
          let { joins: i, leaves: a } = {
            joins: this.transformState(t.joins),
            leaves: this.transformState(t.leaves),
          };
          return (
            s || (s = () => {}),
            r || (r = () => {}),
            this.map(i, (t, r) => {
              var i;
              let a = null != (i = e[t]) ? i : [];
              if (((e[t] = this.cloneDeep(r)), a.length > 0)) {
                let s = e[t].map((e) => e.presence_ref),
                  r = a.filter((e) => 0 > s.indexOf(e.presence_ref));
                e[t].unshift(...r);
              }
              s(t, a, r);
            }),
            this.map(a, (t, s) => {
              let i = e[t];
              if (!i) return;
              let a = s.map((e) => e.presence_ref);
              (i = i.filter((e) => 0 > a.indexOf(e.presence_ref))),
                (e[t] = i),
                r(t, i, s),
                0 === i.length && delete e[t];
            }),
            e
          );
        }
        static map(e, t) {
          return Object.getOwnPropertyNames(e).map((s) => t(s, e[s]));
        }
        static transformState(e) {
          return Object.getOwnPropertyNames((e = this.cloneDeep(e))).reduce(
            (t, s) => {
              let r = e[s];
              return (
                "metas" in r
                  ? (t[s] = r.metas.map(
                      (e) => (
                        (e.presence_ref = e.phx_ref),
                        delete e.phx_ref,
                        delete e.phx_ref_prev,
                        e
                      ),
                    ))
                  : (t[s] = r),
                t
              );
            },
            {},
          );
        }
        static cloneDeep(e) {
          return JSON.parse(JSON.stringify(e));
        }
        onJoin(e) {
          this.caller.onJoin = e;
        }
        onLeave(e) {
          this.caller.onLeave = e;
        }
        onSync(e) {
          this.caller.onSync = e;
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel._joinRef();
        }
      }
      !(function (e) {
        (e.ALL = "*"),
          (e.INSERT = "INSERT"),
          (e.UPDATE = "UPDATE"),
          (e.DELETE = "DELETE");
      })(X || (X = {})),
        (function (e) {
          (e.BROADCAST = "broadcast"),
            (e.PRESENCE = "presence"),
            (e.POSTGRES_CHANGES = "postgres_changes"),
            (e.SYSTEM = "system");
        })(Q || (Q = {})),
        (function (e) {
          (e.SUBSCRIBED = "SUBSCRIBED"),
            (e.TIMED_OUT = "TIMED_OUT"),
            (e.CLOSED = "CLOSED"),
            (e.CHANNEL_ERROR = "CHANNEL_ERROR");
        })(ee || (ee = {}));
      class $ {
        constructor(e, t = { config: {} }, s) {
          (this.topic = e),
            (this.params = t),
            (this.socket = s),
            (this.bindings = {}),
            (this.state = W.closed),
            (this.joinedOnce = !1),
            (this.pushBuffer = []),
            (this.subTopic = e.replace(/^realtime:/i, "")),
            (this.params.config = Object.assign(
              {
                broadcast: { ack: !1, self: !1 },
                presence: { key: "" },
                private: !1,
              },
              t.config,
            )),
            (this.timeout = this.socket.timeout),
            (this.joinPush = new C(this, V.join, this.params, this.timeout)),
            (this.rejoinTimer = new v(
              () => this._rejoinUntilConnected(),
              this.socket.reconnectAfterMs,
            )),
            this.joinPush.receive("ok", () => {
              (this.state = W.joined),
                this.rejoinTimer.reset(),
                this.pushBuffer.forEach((e) => e.send()),
                (this.pushBuffer = []);
            }),
            this._onClose(() => {
              this.rejoinTimer.reset(),
                this.socket.log(
                  "channel",
                  `close ${this.topic} ${this._joinRef()}`,
                ),
                (this.state = W.closed),
                this.socket._remove(this);
            }),
            this._onError((e) => {
              this._isLeaving() ||
                this._isClosed() ||
                (this.socket.log("channel", `error ${this.topic}`, e),
                (this.state = W.errored),
                this.rejoinTimer.scheduleTimeout());
            }),
            this.joinPush.receive("timeout", () => {
              this._isJoining() &&
                (this.socket.log(
                  "channel",
                  `timeout ${this.topic}`,
                  this.joinPush.timeout,
                ),
                (this.state = W.errored),
                this.rejoinTimer.scheduleTimeout());
            }),
            this._on(V.reply, {}, (e, t) => {
              this._trigger(this._replyEventName(t), e);
            }),
            (this.presence = new P(this)),
            (this.broadcastEndpointURL =
              A(this.socket.endPoint) + "/api/broadcast"),
            (this.private = this.params.config.private || !1);
        }
        subscribe(e, t = this.timeout) {
          var s, r;
          if (
            (this.socket.isConnected() || this.socket.connect(),
            this.joinedOnce)
          )
            throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
          {
            let {
              config: { broadcast: i, presence: a, private: n },
            } = this.params;
            this._onError((t) => (null == e ? void 0 : e(ee.CHANNEL_ERROR, t))),
              this._onClose(() => (null == e ? void 0 : e(ee.CLOSED)));
            let o = {},
              l = {
                broadcast: i,
                presence: a,
                postgres_changes:
                  null !=
                  (r =
                    null == (s = this.bindings.postgres_changes)
                      ? void 0
                      : s.map((e) => e.filter))
                    ? r
                    : [],
                private: n,
              };
            this.socket.accessTokenValue &&
              (o.access_token = this.socket.accessTokenValue),
              this.updateJoinPayload(Object.assign({ config: l }, o)),
              (this.joinedOnce = !0),
              this._rejoin(t),
              this.joinPush
                .receive("ok", async ({ postgres_changes: t }) => {
                  var s;
                  if ((this.socket.setAuth(), void 0 === t)) {
                    null == e || e(ee.SUBSCRIBED);
                    return;
                  }
                  {
                    let r = this.bindings.postgres_changes,
                      i = null != (s = null == r ? void 0 : r.length) ? s : 0,
                      a = [];
                    for (let s = 0; s < i; s++) {
                      let i = r[s],
                        {
                          filter: { event: n, schema: o, table: l, filter: u },
                        } = i,
                        h = t && t[s];
                      if (
                        h &&
                        h.event === n &&
                        h.schema === o &&
                        h.table === l &&
                        h.filter === u
                      )
                        a.push(
                          Object.assign(Object.assign({}, i), { id: h.id }),
                        );
                      else {
                        this.unsubscribe(),
                          (this.state = W.errored),
                          null == e ||
                            e(
                              ee.CHANNEL_ERROR,
                              Error(
                                "mismatch between server and client bindings for postgres changes",
                              ),
                            );
                        return;
                      }
                    }
                    (this.bindings.postgres_changes = a), e && e(ee.SUBSCRIBED);
                    return;
                  }
                })
                .receive("error", (t) => {
                  (this.state = W.errored),
                    null == e ||
                      e(
                        ee.CHANNEL_ERROR,
                        Error(
                          JSON.stringify(
                            Object.values(t).join(", ") || "error",
                          ),
                        ),
                      );
                })
                .receive("timeout", () => {
                  null == e || e(ee.TIMED_OUT);
                });
          }
          return this;
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e, t = {}) {
          return await this.send(
            { type: "presence", event: "track", payload: e },
            t.timeout || this.timeout,
          );
        }
        async untrack(e = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e);
        }
        on(e, t, s) {
          return this._on(e, t, s);
        }
        async send(e, t = {}) {
          var s, r;
          if (this._canPush() || "broadcast" !== e.type)
            return new Promise((s) => {
              var r, i, a;
              let n = this._push(e.type, e, t.timeout || this.timeout);
              "broadcast" !== e.type ||
                (null ==
                (a =
                  null == (i = null == (r = this.params) ? void 0 : r.config)
                    ? void 0
                    : i.broadcast)
                  ? void 0
                  : a.ack) ||
                s("ok"),
                n.receive("ok", () => s("ok")),
                n.receive("error", () => s("error")),
                n.receive("timeout", () => s("timed out"));
            });
          {
            let { event: i, payload: a } = e,
              n = {
                method: "POST",
                headers: {
                  Authorization: this.socket.accessTokenValue
                    ? `Bearer ${this.socket.accessTokenValue}`
                    : "",
                  apikey: this.socket.apiKey ? this.socket.apiKey : "",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  messages: [
                    {
                      topic: this.subTopic,
                      event: i,
                      payload: a,
                      private: this.private,
                    },
                  ],
                }),
              };
            try {
              let e = await this._fetchWithTimeout(
                this.broadcastEndpointURL,
                n,
                null != (s = t.timeout) ? s : this.timeout,
              );
              return (
                await (null == (r = e.body) ? void 0 : r.cancel()),
                e.ok ? "ok" : "error"
              );
            } catch (e) {
              if ("AbortError" === e.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e) {
          this.joinPush.updatePayload(e);
        }
        unsubscribe(e = this.timeout) {
          this.state = W.leaving;
          let t = () => {
            this.socket.log("channel", `leave ${this.topic}`),
              this._trigger(V.close, "leave", this._joinRef());
          };
          return (
            this.joinPush.destroy(),
            new Promise((s) => {
              let r = new C(this, V.leave, {}, e);
              r
                .receive("ok", () => {
                  t(), s("ok");
                })
                .receive("timeout", () => {
                  t(), s("timed out");
                })
                .receive("error", () => {
                  s("error");
                }),
                r.send(),
                this._canPush() || r.trigger("ok", {});
            })
          );
        }
        teardown() {
          this.pushBuffer.forEach((e) => e.destroy()),
            this.rejoinTimer && clearTimeout(this.rejoinTimer.timer),
            this.joinPush.destroy();
        }
        async _fetchWithTimeout(e, t, s) {
          let r = new AbortController(),
            i = setTimeout(() => r.abort(), s),
            a = await this.socket.fetch(
              e,
              Object.assign(Object.assign({}, t), { signal: r.signal }),
            );
          return clearTimeout(i), a;
        }
        _push(e, t, s = this.timeout) {
          if (!this.joinedOnce)
            throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
          let r = new C(this, e, t, s);
          return (
            this._canPush()
              ? r.send()
              : (r.startTimeout(), this.pushBuffer.push(r)),
            r
          );
        }
        _onMessage(e, t, s) {
          return t;
        }
        _isMember(e) {
          return this.topic === e;
        }
        _joinRef() {
          return this.joinPush.ref;
        }
        _trigger(e, t, s) {
          var r, i;
          let a = e.toLocaleLowerCase(),
            { close: n, error: o, leave: l, join: u } = V;
          if (s && [n, o, l, u].indexOf(a) >= 0 && s !== this._joinRef())
            return;
          let h = this._onMessage(a, t, s);
          if (t && !h)
            throw "channel onMessage callbacks must return the payload, modified or unmodified";
          ["insert", "update", "delete"].includes(a)
            ? null == (r = this.bindings.postgres_changes) ||
              r
                .filter((e) => {
                  var t, s, r;
                  return (
                    (null == (t = e.filter) ? void 0 : t.event) === "*" ||
                    (null == (r = null == (s = e.filter) ? void 0 : s.event)
                      ? void 0
                      : r.toLocaleLowerCase()) === a
                  );
                })
                .map((e) => e.callback(h, s))
            : null == (i = this.bindings[a]) ||
              i
                .filter((e) => {
                  var s, r, i, n, o, l;
                  if (
                    !["broadcast", "presence", "postgres_changes"].includes(a)
                  )
                    return e.type.toLocaleLowerCase() === a;
                  if ("id" in e) {
                    let a = e.id,
                      n = null == (s = e.filter) ? void 0 : s.event;
                    return (
                      a &&
                      (null == (r = t.ids) ? void 0 : r.includes(a)) &&
                      ("*" === n ||
                        (null == n ? void 0 : n.toLocaleLowerCase()) ===
                          (null == (i = t.data)
                            ? void 0
                            : i.type.toLocaleLowerCase()))
                    );
                  }
                  {
                    let s =
                      null ==
                      (o =
                        null == (n = null == e ? void 0 : e.filter)
                          ? void 0
                          : n.event)
                        ? void 0
                        : o.toLocaleLowerCase();
                    return (
                      "*" === s ||
                      s ===
                        (null == (l = null == t ? void 0 : t.event)
                          ? void 0
                          : l.toLocaleLowerCase())
                    );
                  }
                })
                .map((e) => {
                  if ("object" == typeof h && "ids" in h) {
                    let e = h.data,
                      {
                        schema: t,
                        table: s,
                        commit_timestamp: r,
                        type: i,
                        errors: a,
                      } = e;
                    h = Object.assign(
                      Object.assign(
                        {},
                        {
                          schema: t,
                          table: s,
                          commit_timestamp: r,
                          eventType: i,
                          new: {},
                          old: {},
                          errors: a,
                        },
                      ),
                      this._getPayloadRecords(e),
                    );
                  }
                  e.callback(h, s);
                });
        }
        _isClosed() {
          return this.state === W.closed;
        }
        _isJoined() {
          return this.state === W.joined;
        }
        _isJoining() {
          return this.state === W.joining;
        }
        _isLeaving() {
          return this.state === W.leaving;
        }
        _replyEventName(e) {
          return `chan_reply_${e}`;
        }
        _on(e, t, s) {
          let r = e.toLocaleLowerCase(),
            i = { type: r, filter: t, callback: s };
          return (
            this.bindings[r]
              ? this.bindings[r].push(i)
              : (this.bindings[r] = [i]),
            this
          );
        }
        _off(e, t) {
          let s = e.toLocaleLowerCase();
          return (
            (this.bindings[s] = this.bindings[s].filter((e) => {
              var r;
              return !(
                (null == (r = e.type) ? void 0 : r.toLocaleLowerCase()) === s &&
                $.isEqual(e.filter, t)
              );
            })),
            this
          );
        }
        static isEqual(e, t) {
          if (Object.keys(e).length !== Object.keys(t).length) return !1;
          for (let s in e) if (e[s] !== t[s]) return !1;
          return !0;
        }
        _rejoinUntilConnected() {
          this.rejoinTimer.scheduleTimeout(),
            this.socket.isConnected() && this._rejoin();
        }
        _onClose(e) {
          this._on(V.close, {}, e);
        }
        _onError(e) {
          this._on(V.error, {}, (t) => e(t));
        }
        _canPush() {
          return this.socket.isConnected() && this._isJoined();
        }
        _rejoin(e = this.timeout) {
          this._isLeaving() ||
            (this.socket._leaveOpenTopic(this.topic),
            (this.state = W.joining),
            this.joinPush.resend(e));
        }
        _getPayloadRecords(e) {
          let t = { new: {}, old: {} };
          return (
            ("INSERT" === e.type || "UPDATE" === e.type) &&
              (t.new = w(e.columns, e.record)),
            ("UPDATE" === e.type || "DELETE" === e.type) &&
              (t.old = w(e.columns, e.old_record)),
            t
          );
        }
      }
      let I = () => {},
        R = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class N {
        constructor(e, t) {
          var r;
          (this.accessTokenValue = null),
            (this.apiKey = null),
            (this.channels = []),
            (this.endPoint = ""),
            (this.httpEndpoint = ""),
            (this.headers = y),
            (this.params = {}),
            (this.timeout = 1e4),
            (this.heartbeatIntervalMs = 25e3),
            (this.heartbeatTimer = void 0),
            (this.pendingHeartbeatRef = null),
            (this.heartbeatCallback = I),
            (this.ref = 0),
            (this.logger = I),
            (this.conn = null),
            (this.sendBuffer = []),
            (this.serializer = new _()),
            (this.stateChangeCallbacks = {
              open: [],
              close: [],
              error: [],
              message: [],
            }),
            (this.accessToken = null),
            (this._resolveFetch = (e) => {
              let t;
              return (
                (t =
                  e ||
                  ("undefined" == typeof fetch
                    ? (...e) =>
                        Promise.resolve()
                          .then(s.bind(s, 15138))
                          .then(({ default: t }) => t(...e))
                    : fetch)),
                (...e) => t(...e)
              );
            }),
            (this.endPoint = `${e}/${J.websocket}`),
            (this.httpEndpoint = A(e)),
            (null == t ? void 0 : t.transport)
              ? (this.transport = t.transport)
              : (this.transport = null),
            (null == t ? void 0 : t.params) && (this.params = t.params),
            (null == t ? void 0 : t.headers) &&
              (this.headers = Object.assign(
                Object.assign({}, this.headers),
                t.headers,
              )),
            (null == t ? void 0 : t.timeout) && (this.timeout = t.timeout),
            (null == t ? void 0 : t.logger) && (this.logger = t.logger),
            ((null == t ? void 0 : t.logLevel) ||
              (null == t ? void 0 : t.log_level)) &&
              ((this.logLevel = t.logLevel || t.log_level),
              (this.params = Object.assign(Object.assign({}, this.params), {
                log_level: this.logLevel,
              }))),
            (null == t ? void 0 : t.heartbeatIntervalMs) &&
              (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
          let i =
            null == (r = null == t ? void 0 : t.params) ? void 0 : r.apikey;
          if (
            (i && ((this.accessTokenValue = i), (this.apiKey = i)),
            (this.reconnectAfterMs = (null == t ? void 0 : t.reconnectAfterMs)
              ? t.reconnectAfterMs
              : (e) => [1e3, 2e3, 5e3, 1e4][e - 1] || 1e4),
            (this.encode = (null == t ? void 0 : t.encode)
              ? t.encode
              : (e, t) => t(JSON.stringify(e))),
            (this.decode = (null == t ? void 0 : t.decode)
              ? t.decode
              : this.serializer.decode.bind(this.serializer)),
            (this.reconnectTimer = new v(async () => {
              this.disconnect(), this.connect();
            }, this.reconnectAfterMs)),
            (this.fetch = this._resolveFetch(null == t ? void 0 : t.fetch)),
            null == t ? void 0 : t.worker)
          ) {
            if ("undefined" != typeof window && !window.Worker)
              throw Error("Web Worker is not supported");
            (this.worker = (null == t ? void 0 : t.worker) || !1),
              (this.workerUrl = null == t ? void 0 : t.workerUrl);
          }
          this.accessToken = (null == t ? void 0 : t.accessToken) || null;
        }
        connect() {
          if (!this.conn) {
            if ((this.transport || (this.transport = m), this.transport)) {
              "undefined" != typeof window &&
              this.transport === window.WebSocket
                ? (this.conn = new this.transport(this.endpointURL()))
                : (this.conn = new this.transport(this.endpointURL(), void 0, {
                    headers: this.headers,
                  })),
                this.setupConnection();
              return;
            }
            this.conn = new L(this.endpointURL(), void 0, {
              close: () => {
                this.conn = null;
              },
            });
          }
        }
        endpointURL() {
          return this._appendParams(
            this.endPoint,
            Object.assign({}, this.params, { vsn: "1.0.0" }),
          );
        }
        disconnect(e, t) {
          this.conn &&
            ((this.conn.onclose = function () {}),
            e ? this.conn.close(e, null != t ? t : "") : this.conn.close(),
            (this.conn = null),
            this.heartbeatTimer && clearInterval(this.heartbeatTimer),
            this.reconnectTimer.reset(),
            this.channels.forEach((e) => e.teardown()));
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e) {
          let t = await e.unsubscribe();
          return (
            (this.channels = this.channels.filter(
              (t) => t._joinRef !== e._joinRef,
            )),
            0 === this.channels.length && this.disconnect(),
            t
          );
        }
        async removeAllChannels() {
          let e = await Promise.all(this.channels.map((e) => e.unsubscribe()));
          return (this.channels = []), this.disconnect(), e;
        }
        log(e, t, s) {
          this.logger(e, t, s);
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case K.connecting:
              return H.Connecting;
            case K.open:
              return H.Open;
            case K.closing:
              return H.Closing;
            default:
              return H.Closed;
          }
        }
        isConnected() {
          return this.connectionState() === H.Open;
        }
        channel(e, t = { config: {} }) {
          let s = `realtime:${e}`,
            r = this.getChannels().find((e) => e.topic === s);
          if (r) return r;
          {
            let s = new $(`realtime:${e}`, t, this);
            return this.channels.push(s), s;
          }
        }
        push(e) {
          let { topic: t, event: s, payload: r, ref: i } = e,
            a = () => {
              this.encode(e, (e) => {
                var t;
                null == (t = this.conn) || t.send(e);
              });
            };
          this.log("push", `${t} ${s} (${i})`, r),
            this.isConnected() ? a() : this.sendBuffer.push(a);
        }
        async setAuth(e = null) {
          let t =
            e ||
            (this.accessToken && (await this.accessToken())) ||
            this.accessTokenValue;
          this.accessTokenValue != t &&
            ((this.accessTokenValue = t),
            this.channels.forEach((e) => {
              t &&
                e.updateJoinPayload({
                  access_token: t,
                  version: this.headers && this.headers["X-Client-Info"],
                }),
                e.joinedOnce &&
                  e._isJoined() &&
                  e._push(V.access_token, { access_token: t });
            }));
        }
        async sendHeartbeat() {
          var e;
          if (!this.isConnected())
            return void this.heartbeatCallback("disconnected");
          if (this.pendingHeartbeatRef) {
            (this.pendingHeartbeatRef = null),
              this.log(
                "transport",
                "heartbeat timeout. Attempting to re-establish connection",
              ),
              this.heartbeatCallback("timeout"),
              null == (e = this.conn) || e.close(1e3, "hearbeat timeout");
            return;
          }
          (this.pendingHeartbeatRef = this._makeRef()),
            this.push({
              topic: "phoenix",
              event: "heartbeat",
              payload: {},
              ref: this.pendingHeartbeatRef,
            }),
            this.heartbeatCallback("sent"),
            await this.setAuth();
        }
        onHeartbeat(e) {
          this.heartbeatCallback = e;
        }
        flushSendBuffer() {
          this.isConnected() &&
            this.sendBuffer.length > 0 &&
            (this.sendBuffer.forEach((e) => e()), (this.sendBuffer = []));
        }
        _makeRef() {
          let e = this.ref + 1;
          return (
            e === this.ref ? (this.ref = 0) : (this.ref = e),
            this.ref.toString()
          );
        }
        _leaveOpenTopic(e) {
          let t = this.channels.find(
            (t) => t.topic === e && (t._isJoined() || t._isJoining()),
          );
          t &&
            (this.log("transport", `leaving duplicate topic "${e}"`),
            t.unsubscribe());
        }
        _remove(e) {
          this.channels = this.channels.filter((t) => t.topic !== e.topic);
        }
        setupConnection() {
          this.conn &&
            ((this.conn.binaryType = "arraybuffer"),
            (this.conn.onopen = () => this._onConnOpen()),
            (this.conn.onerror = (e) => this._onConnError(e)),
            (this.conn.onmessage = (e) => this._onConnMessage(e)),
            (this.conn.onclose = (e) => this._onConnClose(e)));
        }
        _onConnMessage(e) {
          this.decode(e.data, (e) => {
            let { topic: t, event: s, payload: r, ref: i } = e;
            "phoenix" === t &&
              "phx_reply" === s &&
              this.heartbeatCallback("ok" == e.payload.status ? "ok" : "error"),
              i &&
                i === this.pendingHeartbeatRef &&
                (this.pendingHeartbeatRef = null),
              this.log(
                "receive",
                `${r.status || ""} ${t} ${s} ${(i && "(" + i + ")") || ""}`,
                r,
              ),
              Array.from(this.channels)
                .filter((e) => e._isMember(t))
                .forEach((e) => e._trigger(s, r, i)),
              this.stateChangeCallbacks.message.forEach((t) => t(e));
          });
        }
        _onConnOpen() {
          if (
            (this.log("transport", `connected to ${this.endpointURL()}`),
            this.flushSendBuffer(),
            this.reconnectTimer.reset(),
            this.worker)
          ) {
            this.workerUrl
              ? this.log("worker", `starting worker for from ${this.workerUrl}`)
              : this.log("worker", "starting default worker");
            let e = this._workerObjectUrl(this.workerUrl);
            (this.workerRef = new Worker(e)),
              (this.workerRef.onerror = (e) => {
                this.log("worker", "worker error", e.message),
                  this.workerRef.terminate();
              }),
              (this.workerRef.onmessage = (e) => {
                "keepAlive" === e.data.event && this.sendHeartbeat();
              }),
              this.workerRef.postMessage({
                event: "start",
                interval: this.heartbeatIntervalMs,
              });
          } else
            this.heartbeatTimer && clearInterval(this.heartbeatTimer),
              (this.heartbeatTimer = setInterval(
                () => this.sendHeartbeat(),
                this.heartbeatIntervalMs,
              ));
          this.stateChangeCallbacks.open.forEach((e) => e());
        }
        _onConnClose(e) {
          this.log("transport", "close", e),
            this._triggerChanError(),
            this.heartbeatTimer && clearInterval(this.heartbeatTimer),
            this.reconnectTimer.scheduleTimeout(),
            this.stateChangeCallbacks.close.forEach((t) => t(e));
        }
        _onConnError(e) {
          this.log("transport", e.message),
            this._triggerChanError(),
            this.stateChangeCallbacks.error.forEach((t) => t(e));
        }
        _triggerChanError() {
          this.channels.forEach((e) => e._trigger(V.error));
        }
        _appendParams(e, t) {
          if (0 === Object.keys(t).length) return e;
          let s = e.match(/\?/) ? "&" : "?",
            r = new URLSearchParams(t);
          return `${e}${s}${r}`;
        }
        _workerObjectUrl(e) {
          let t;
          if (e) t = e;
          else {
            let e = new Blob([R], { type: "application/javascript" });
            t = URL.createObjectURL(e);
          }
          return t;
        }
      }
      class L {
        constructor(e, t, s) {
          (this.binaryType = "arraybuffer"),
            (this.onclose = () => {}),
            (this.onerror = () => {}),
            (this.onmessage = () => {}),
            (this.onopen = () => {}),
            (this.readyState = K.connecting),
            (this.send = () => {}),
            (this.url = null),
            (this.url = e),
            (this.close = s.close);
        }
      }
      class U extends Error {
        constructor(e) {
          super(e), (this.__isStorageError = !0), (this.name = "StorageError");
        }
      }
      function D(e) {
        return "object" == typeof e && null !== e && "__isStorageError" in e;
      }
      class M extends U {
        constructor(e, t) {
          super(e), (this.name = "StorageApiError"), (this.status = t);
        }
        toJSON() {
          return {
            name: this.name,
            message: this.message,
            status: this.status,
          };
        }
      }
      class Z extends U {
        constructor(e, t) {
          super(e),
            (this.name = "StorageUnknownError"),
            (this.originalError = t);
        }
      }
      let F = (e) => {
          let t;
          return (
            (t =
              e ||
              ("undefined" == typeof fetch
                ? (...e) =>
                    Promise.resolve()
                      .then(s.bind(s, 15138))
                      .then(({ default: t }) => t(...e))
                : fetch)),
            (...e) => t(...e)
          );
        },
        q = () =>
          (function (e, t, s, r) {
            return new (s || (s = Promise))(function (i, a) {
              function n(e) {
                try {
                  l(r.next(e));
                } catch (e) {
                  a(e);
                }
              }
              function o(e) {
                try {
                  l(r.throw(e));
                } catch (e) {
                  a(e);
                }
              }
              function l(e) {
                var t;
                e.done
                  ? i(e.value)
                  : ((t = e.value) instanceof s
                      ? t
                      : new s(function (e) {
                          e(t);
                        })
                    ).then(n, o);
              }
              l((r = r.apply(e, t || [])).next());
            });
          })(void 0, void 0, void 0, function* () {
            return "undefined" == typeof Response
              ? (yield Promise.resolve().then(s.bind(s, 15138))).Response
              : Response;
          }),
        B = (e) => {
          if (Array.isArray(e)) return e.map((e) => B(e));
          if ("function" == typeof e || e !== Object(e)) return e;
          let t = {};
          return (
            Object.entries(e).forEach(([e, s]) => {
              t[
                e.replace(/([-_][a-z])/gi, (e) =>
                  e.toUpperCase().replace(/[-_]/g, ""),
                )
              ] = B(s);
            }),
            t
          );
        };
      var z,
        K,
        W,
        V,
        J,
        H,
        G,
        Y,
        X,
        Q,
        ee,
        et = function (e, t, s, r) {
          return new (s || (s = Promise))(function (i, a) {
            function n(e) {
              try {
                l(r.next(e));
              } catch (e) {
                a(e);
              }
            }
            function o(e) {
              try {
                l(r.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function l(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value) instanceof s
                    ? t
                    : new s(function (e) {
                        e(t);
                      })
                  ).then(n, o);
            }
            l((r = r.apply(e, t || [])).next());
          });
        };
      let es = (e) =>
          e.msg ||
          e.message ||
          e.error_description ||
          e.error ||
          JSON.stringify(e),
        er = (e, t, s) =>
          et(void 0, void 0, void 0, function* () {
            e instanceof (yield q()) && !(null == s ? void 0 : s.noResolveJson)
              ? e
                  .json()
                  .then((s) => {
                    t(new M(es(s), e.status || 500));
                  })
                  .catch((e) => {
                    t(new Z(es(e), e));
                  })
              : t(new Z(es(e), e));
          }),
        ei = (e, t, s, r) => {
          let i = {
            method: e,
            headers: (null == t ? void 0 : t.headers) || {},
          };
          return "GET" === e
            ? i
            : ((i.headers = Object.assign(
                { "Content-Type": "application/json" },
                null == t ? void 0 : t.headers,
              )),
              r && (i.body = JSON.stringify(r)),
              Object.assign(Object.assign({}, i), s));
        };
      function ea(e, t, s, r, i, a) {
        return et(this, void 0, void 0, function* () {
          return new Promise((n, o) => {
            e(s, ei(t, r, i, a))
              .then((e) => {
                if (!e.ok) throw e;
                return (null == r ? void 0 : r.noResolveJson) ? e : e.json();
              })
              .then((e) => n(e))
              .catch((e) => er(e, o, r));
          });
        });
      }
      function en(e, t, s, r) {
        return et(this, void 0, void 0, function* () {
          return ea(e, "GET", t, s, r);
        });
      }
      function eo(e, t, s, r, i) {
        return et(this, void 0, void 0, function* () {
          return ea(e, "POST", t, r, i, s);
        });
      }
      function el(e, t, s, r, i) {
        return et(this, void 0, void 0, function* () {
          return ea(e, "DELETE", t, r, i, s);
        });
      }
      var eu = s(25356).Buffer,
        eh = function (e, t, s, r) {
          return new (s || (s = Promise))(function (i, a) {
            function n(e) {
              try {
                l(r.next(e));
              } catch (e) {
                a(e);
              }
            }
            function o(e) {
              try {
                l(r.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function l(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value) instanceof s
                    ? t
                    : new s(function (e) {
                        e(t);
                      })
                  ).then(n, o);
            }
            l((r = r.apply(e, t || [])).next());
          });
        };
      let ec = {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        },
        ed = {
          cacheControl: "3600",
          contentType: "text/plain;charset=UTF-8",
          upsert: !1,
        };
      class ef {
        constructor(e, t = {}, s, r) {
          (this.url = e),
            (this.headers = t),
            (this.bucketId = s),
            (this.fetch = F(r));
        }
        uploadOrUpdate(e, t, s, r) {
          return eh(this, void 0, void 0, function* () {
            try {
              let i,
                a = Object.assign(Object.assign({}, ed), r),
                n = Object.assign(
                  Object.assign({}, this.headers),
                  "POST" === e && { "x-upsert": String(a.upsert) },
                ),
                o = a.metadata;
              "undefined" != typeof Blob && s instanceof Blob
                ? ((i = new FormData()).append("cacheControl", a.cacheControl),
                  o && i.append("metadata", this.encodeMetadata(o)),
                  i.append("", s))
                : "undefined" != typeof FormData && s instanceof FormData
                  ? ((i = s).append("cacheControl", a.cacheControl),
                    o && i.append("metadata", this.encodeMetadata(o)))
                  : ((i = s),
                    (n["cache-control"] = `max-age=${a.cacheControl}`),
                    (n["content-type"] = a.contentType),
                    o &&
                      (n["x-metadata"] = this.toBase64(
                        this.encodeMetadata(o),
                      ))),
                (null == r ? void 0 : r.headers) &&
                  (n = Object.assign(Object.assign({}, n), r.headers));
              let l = this._removeEmptyFolders(t),
                u = this._getFinalPath(l),
                h = yield this.fetch(
                  `${this.url}/object/${u}`,
                  Object.assign(
                    { method: e, body: i, headers: n },
                    (null == a ? void 0 : a.duplex) ? { duplex: a.duplex } : {},
                  ),
                ),
                c = yield h.json();
              if (h.ok)
                return {
                  data: { path: l, id: c.Id, fullPath: c.Key },
                  error: null,
                };
              return { data: null, error: c };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        upload(e, t, s) {
          return eh(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("POST", e, t, s);
          });
        }
        uploadToSignedUrl(e, t, s, r) {
          return eh(this, void 0, void 0, function* () {
            let i = this._removeEmptyFolders(e),
              a = this._getFinalPath(i),
              n = new URL(this.url + `/object/upload/sign/${a}`);
            n.searchParams.set("token", t);
            try {
              let e,
                t = Object.assign({ upsert: ed.upsert }, r),
                a = Object.assign(Object.assign({}, this.headers), {
                  "x-upsert": String(t.upsert),
                });
              "undefined" != typeof Blob && s instanceof Blob
                ? ((e = new FormData()).append("cacheControl", t.cacheControl),
                  e.append("", s))
                : "undefined" != typeof FormData && s instanceof FormData
                  ? (e = s).append("cacheControl", t.cacheControl)
                  : ((e = s),
                    (a["cache-control"] = `max-age=${t.cacheControl}`),
                    (a["content-type"] = t.contentType));
              let o = yield this.fetch(n.toString(), {
                  method: "PUT",
                  body: e,
                  headers: a,
                }),
                l = yield o.json();
              if (o.ok)
                return { data: { path: i, fullPath: l.Key }, error: null };
              return { data: null, error: l };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createSignedUploadUrl(e, t) {
          return eh(this, void 0, void 0, function* () {
            try {
              let s = this._getFinalPath(e),
                r = Object.assign({}, this.headers);
              (null == t ? void 0 : t.upsert) && (r["x-upsert"] = "true");
              let i = yield eo(
                  this.fetch,
                  `${this.url}/object/upload/sign/${s}`,
                  {},
                  { headers: r },
                ),
                a = new URL(this.url + i.url),
                n = a.searchParams.get("token");
              if (!n) throw new U("No token returned by API");
              return {
                data: { signedUrl: a.toString(), path: e, token: n },
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        update(e, t, s) {
          return eh(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("PUT", e, t, s);
          });
        }
        move(e, t, s) {
          return eh(this, void 0, void 0, function* () {
            try {
              return {
                data: yield eo(
                  this.fetch,
                  `${this.url}/object/move`,
                  {
                    bucketId: this.bucketId,
                    sourceKey: e,
                    destinationKey: t,
                    destinationBucket: null == s ? void 0 : s.destinationBucket,
                  },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        copy(e, t, s) {
          return eh(this, void 0, void 0, function* () {
            try {
              return {
                data: {
                  path: (yield eo(
                    this.fetch,
                    `${this.url}/object/copy`,
                    {
                      bucketId: this.bucketId,
                      sourceKey: e,
                      destinationKey: t,
                      destinationBucket:
                        null == s ? void 0 : s.destinationBucket,
                    },
                    { headers: this.headers },
                  )).Key,
                },
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createSignedUrl(e, t, s) {
          return eh(this, void 0, void 0, function* () {
            try {
              let r = this._getFinalPath(e),
                i = yield eo(
                  this.fetch,
                  `${this.url}/object/sign/${r}`,
                  Object.assign(
                    { expiresIn: t },
                    (null == s ? void 0 : s.transform)
                      ? { transform: s.transform }
                      : {},
                  ),
                  { headers: this.headers },
                ),
                a = (null == s ? void 0 : s.download)
                  ? `&download=${!0 === s.download ? "" : s.download}`
                  : "";
              return {
                data: (i = {
                  signedUrl: encodeURI(`${this.url}${i.signedURL}${a}`),
                }),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createSignedUrls(e, t, s) {
          return eh(this, void 0, void 0, function* () {
            try {
              let r = yield eo(
                  this.fetch,
                  `${this.url}/object/sign/${this.bucketId}`,
                  { expiresIn: t, paths: e },
                  { headers: this.headers },
                ),
                i = (null == s ? void 0 : s.download)
                  ? `&download=${!0 === s.download ? "" : s.download}`
                  : "";
              return {
                data: r.map((e) =>
                  Object.assign(Object.assign({}, e), {
                    signedUrl: e.signedURL
                      ? encodeURI(`${this.url}${e.signedURL}${i}`)
                      : null,
                  }),
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        download(e, t) {
          return eh(this, void 0, void 0, function* () {
            let s = void 0 !== (null == t ? void 0 : t.transform),
              r = this.transformOptsToQueryString(
                (null == t ? void 0 : t.transform) || {},
              ),
              i = r ? `?${r}` : "";
            try {
              let t = this._getFinalPath(e),
                r = yield en(
                  this.fetch,
                  `${this.url}/${s ? "render/image/authenticated" : "object"}/${t}${i}`,
                  { headers: this.headers, noResolveJson: !0 },
                );
              return { data: yield r.blob(), error: null };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        info(e) {
          return eh(this, void 0, void 0, function* () {
            let t = this._getFinalPath(e);
            try {
              let e = yield en(this.fetch, `${this.url}/object/info/${t}`, {
                headers: this.headers,
              });
              return { data: B(e), error: null };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        exists(e) {
          return eh(this, void 0, void 0, function* () {
            let t = this._getFinalPath(e);
            try {
              return (
                yield (function (e, t, s, r) {
                  return et(this, void 0, void 0, function* () {
                    return ea(
                      e,
                      "HEAD",
                      t,
                      Object.assign(Object.assign({}, s), {
                        noResolveJson: !0,
                      }),
                      void 0,
                    );
                  });
                })(this.fetch, `${this.url}/object/${t}`, {
                  headers: this.headers,
                }),
                { data: !0, error: null }
              );
            } catch (e) {
              if (D(e) && e instanceof Z) {
                let t = e.originalError;
                if ([400, 404].includes(null == t ? void 0 : t.status))
                  return { data: !1, error: e };
              }
              throw e;
            }
          });
        }
        getPublicUrl(e, t) {
          let s = this._getFinalPath(e),
            r = [],
            i = (null == t ? void 0 : t.download)
              ? `download=${!0 === t.download ? "" : t.download}`
              : "";
          "" !== i && r.push(i);
          let a = void 0 !== (null == t ? void 0 : t.transform),
            n = this.transformOptsToQueryString(
              (null == t ? void 0 : t.transform) || {},
            );
          "" !== n && r.push(n);
          let o = r.join("&");
          return (
            "" !== o && (o = `?${o}`),
            {
              data: {
                publicUrl: encodeURI(
                  `${this.url}/${a ? "render/image" : "object"}/public/${s}${o}`,
                ),
              },
            }
          );
        }
        remove(e) {
          return eh(this, void 0, void 0, function* () {
            try {
              return {
                data: yield el(
                  this.fetch,
                  `${this.url}/object/${this.bucketId}`,
                  { prefixes: e },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        list(e, t, s) {
          return eh(this, void 0, void 0, function* () {
            try {
              let r = Object.assign(Object.assign(Object.assign({}, ec), t), {
                prefix: e || "",
              });
              return {
                data: yield eo(
                  this.fetch,
                  `${this.url}/object/list/${this.bucketId}`,
                  r,
                  { headers: this.headers },
                  s,
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        encodeMetadata(e) {
          return JSON.stringify(e);
        }
        toBase64(e) {
          return void 0 !== eu ? eu.from(e).toString("base64") : btoa(e);
        }
        _getFinalPath(e) {
          return `${this.bucketId}/${e}`;
        }
        _removeEmptyFolders(e) {
          return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        transformOptsToQueryString(e) {
          let t = [];
          return (
            e.width && t.push(`width=${e.width}`),
            e.height && t.push(`height=${e.height}`),
            e.resize && t.push(`resize=${e.resize}`),
            e.format && t.push(`format=${e.format}`),
            e.quality && t.push(`quality=${e.quality}`),
            t.join("&")
          );
        }
      }
      let ep = { "X-Client-Info": "storage-js/2.7.1" };
      var eg = function (e, t, s, r) {
        return new (s || (s = Promise))(function (i, a) {
          function n(e) {
            try {
              l(r.next(e));
            } catch (e) {
              a(e);
            }
          }
          function o(e) {
            try {
              l(r.throw(e));
            } catch (e) {
              a(e);
            }
          }
          function l(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value) instanceof s
                  ? t
                  : new s(function (e) {
                      e(t);
                    })
                ).then(n, o);
          }
          l((r = r.apply(e, t || [])).next());
        });
      };
      class em {
        constructor(e, t = {}, s) {
          (this.url = e),
            (this.headers = Object.assign(Object.assign({}, ep), t)),
            (this.fetch = F(s));
        }
        listBuckets() {
          return eg(this, void 0, void 0, function* () {
            try {
              return {
                data: yield en(this.fetch, `${this.url}/bucket`, {
                  headers: this.headers,
                }),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        getBucket(e) {
          return eg(this, void 0, void 0, function* () {
            try {
              return {
                data: yield en(this.fetch, `${this.url}/bucket/${e}`, {
                  headers: this.headers,
                }),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        createBucket(e, t = { public: !1 }) {
          return eg(this, void 0, void 0, function* () {
            try {
              return {
                data: yield eo(
                  this.fetch,
                  `${this.url}/bucket`,
                  {
                    id: e,
                    name: e,
                    public: t.public,
                    file_size_limit: t.fileSizeLimit,
                    allowed_mime_types: t.allowedMimeTypes,
                  },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        updateBucket(e, t) {
          return eg(this, void 0, void 0, function* () {
            try {
              return {
                data: yield (function (e, t, s, r, i) {
                  return et(this, void 0, void 0, function* () {
                    return ea(e, "PUT", t, r, void 0, s);
                  });
                })(
                  this.fetch,
                  `${this.url}/bucket/${e}`,
                  {
                    id: e,
                    name: e,
                    public: t.public,
                    file_size_limit: t.fileSizeLimit,
                    allowed_mime_types: t.allowedMimeTypes,
                  },
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        emptyBucket(e) {
          return eg(this, void 0, void 0, function* () {
            try {
              return {
                data: yield eo(
                  this.fetch,
                  `${this.url}/bucket/${e}/empty`,
                  {},
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        deleteBucket(e) {
          return eg(this, void 0, void 0, function* () {
            try {
              return {
                data: yield el(
                  this.fetch,
                  `${this.url}/bucket/${e}`,
                  {},
                  { headers: this.headers },
                ),
                error: null,
              };
            } catch (e) {
              if (D(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
      }
      class ey extends em {
        constructor(e, t = {}, s) {
          super(e, t, s);
        }
        from(e) {
          return new ef(this.url, this.headers, e, this.fetch);
        }
      }
      let e_ = "";
      e_ =
        "undefined" != typeof Deno
          ? "deno"
          : "undefined" != typeof document
            ? "web"
            : "undefined" != typeof navigator &&
                "ReactNative" === navigator.product
              ? "react-native"
              : "node";
      let ev = { headers: { "X-Client-Info": `supabase-js-${e_}/2.50.0` } },
        ew = { schema: "public" },
        eb = {
          autoRefreshToken: !0,
          persistSession: !0,
          detectSessionInUrl: !0,
          flowType: "implicit",
        },
        ek = {};
      var eT = s(15138);
      let eS = (e) => {
          let t;
          return (
            (t = e || ("undefined" == typeof fetch ? eT.default : fetch)),
            (...e) => t(...e)
          );
        },
        ex = () => ("undefined" == typeof Headers ? eT.Headers : Headers),
        ej = (e, t, s) => {
          let r = eS(s),
            i = ex();
          return (s, a) =>
            (function (e, t, s, r) {
              return new (s || (s = Promise))(function (i, a) {
                function n(e) {
                  try {
                    l(r.next(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function o(e) {
                  try {
                    l(r.throw(e));
                  } catch (e) {
                    a(e);
                  }
                }
                function l(e) {
                  var t;
                  e.done
                    ? i(e.value)
                    : ((t = e.value) instanceof s
                        ? t
                        : new s(function (e) {
                            e(t);
                          })
                      ).then(n, o);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(void 0, void 0, void 0, function* () {
              var n;
              let o = null != (n = yield t()) ? n : e,
                l = new i(null == a ? void 0 : a.headers);
              return (
                l.has("apikey") || l.set("apikey", e),
                l.has("Authorization") || l.set("Authorization", `Bearer ${o}`),
                r(s, Object.assign(Object.assign({}, a), { headers: l }))
              );
            });
        },
        eO = "2.70.0",
        eE = { "X-Client-Info": `gotrue-js/${eO}` },
        eA = "X-Supabase-Api-Version",
        eC = {
          "2024-01-01": {
            timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
            name: "2024-01-01",
          },
        },
        eP = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
      class e$ extends Error {
        constructor(e, t, s) {
          super(e),
            (this.__isAuthError = !0),
            (this.name = "AuthError"),
            (this.status = t),
            (this.code = s);
        }
      }
      function eI(e) {
        return "object" == typeof e && null !== e && "__isAuthError" in e;
      }
      class eR extends e$ {
        constructor(e, t, s) {
          super(e, t, s),
            (this.name = "AuthApiError"),
            (this.status = t),
            (this.code = s);
        }
      }
      class eN extends e$ {
        constructor(e, t) {
          super(e), (this.name = "AuthUnknownError"), (this.originalError = t);
        }
      }
      class eL extends e$ {
        constructor(e, t, s, r) {
          super(e, s, r), (this.name = t), (this.status = s);
        }
      }
      class eU extends eL {
        constructor() {
          super(
            "Auth session missing!",
            "AuthSessionMissingError",
            400,
            void 0,
          );
        }
      }
      class eD extends eL {
        constructor() {
          super(
            "Auth session or user missing",
            "AuthInvalidTokenResponseError",
            500,
            void 0,
          );
        }
      }
      class eM extends eL {
        constructor(e) {
          super(e, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class eZ extends eL {
        constructor(e, t = null) {
          super(e, "AuthImplicitGrantRedirectError", 500, void 0),
            (this.details = null),
            (this.details = t);
        }
        toJSON() {
          return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
          };
        }
      }
      class eF extends eL {
        constructor(e, t = null) {
          super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0),
            (this.details = null),
            (this.details = t);
        }
        toJSON() {
          return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
          };
        }
      }
      class eq extends eL {
        constructor(e, t) {
          super(e, "AuthRetryableFetchError", t, void 0);
        }
      }
      function eB(e) {
        return eI(e) && "AuthRetryableFetchError" === e.name;
      }
      class ez extends eL {
        constructor(e, t, s) {
          super(e, "AuthWeakPasswordError", t, "weak_password"),
            (this.reasons = s);
        }
      }
      class eK extends eL {
        constructor(e) {
          super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      let eW =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
            "",
          ),
        eV = " 	\n\r=".split(""),
        eJ = (() => {
          let e = Array(128);
          for (let t = 0; t < e.length; t += 1) e[t] = -1;
          for (let t = 0; t < eV.length; t += 1) e[eV[t].charCodeAt(0)] = -2;
          for (let t = 0; t < eW.length; t += 1) e[eW[t].charCodeAt(0)] = t;
          return e;
        })();
      function eH(e, t, s) {
        if (null !== e)
          for (
            t.queue = (t.queue << 8) | e, t.queuedBits += 8;
            t.queuedBits >= 6;

          )
            s(eW[(t.queue >> (t.queuedBits - 6)) & 63]), (t.queuedBits -= 6);
        else if (t.queuedBits > 0)
          for (
            t.queue = t.queue << (6 - t.queuedBits), t.queuedBits = 6;
            t.queuedBits >= 6;

          )
            s(eW[(t.queue >> (t.queuedBits - 6)) & 63]), (t.queuedBits -= 6);
      }
      function eG(e, t, s) {
        let r = eJ[e];
        if (r > -1)
          for (
            t.queue = (t.queue << 6) | r, t.queuedBits += 6;
            t.queuedBits >= 8;

          )
            s((t.queue >> (t.queuedBits - 8)) & 255), (t.queuedBits -= 8);
        else if (-2 === r) return;
        else
          throw Error(
            `Invalid Base64-URL character "${String.fromCharCode(e)}"`,
          );
      }
      function eY(e) {
        let t = [],
          s = (e) => {
            t.push(String.fromCodePoint(e));
          },
          r = { utf8seq: 0, codepoint: 0 },
          i = { queue: 0, queuedBits: 0 },
          a = (e) => {
            !(function (e, t, s) {
              if (0 === t.utf8seq) {
                if (e <= 127) return s(e);
                for (let s = 1; s < 6; s += 1)
                  if (((e >> (7 - s)) & 1) == 0) {
                    t.utf8seq = s;
                    break;
                  }
                if (2 === t.utf8seq) t.codepoint = 31 & e;
                else if (3 === t.utf8seq) t.codepoint = 15 & e;
                else if (4 === t.utf8seq) t.codepoint = 7 & e;
                else throw Error("Invalid UTF-8 sequence");
                t.utf8seq -= 1;
              } else if (t.utf8seq > 0) {
                if (e <= 127) throw Error("Invalid UTF-8 sequence");
                (t.codepoint = (t.codepoint << 6) | (63 & e)),
                  (t.utf8seq -= 1),
                  0 === t.utf8seq && s(t.codepoint);
              }
            })(e, r, s);
          };
        for (let t = 0; t < e.length; t += 1) eG(e.charCodeAt(t), i, a);
        return t.join("");
      }
      let eX = () =>
          "undefined" != typeof window && "undefined" != typeof document,
        eQ = { tested: !1, writable: !1 },
        e0 = () => {
          if (!eX()) return !1;
          try {
            if ("object" != typeof globalThis.localStorage) return !1;
          } catch (e) {
            return !1;
          }
          if (eQ.tested) return eQ.writable;
          let e = `lswt-${Math.random()}${Math.random()}`;
          try {
            globalThis.localStorage.setItem(e, e),
              globalThis.localStorage.removeItem(e),
              (eQ.tested = !0),
              (eQ.writable = !0);
          } catch (e) {
            (eQ.tested = !0), (eQ.writable = !1);
          }
          return eQ.writable;
        },
        e1 = (e) => {
          let t;
          return (
            (t =
              e ||
              ("undefined" == typeof fetch
                ? (...e) =>
                    Promise.resolve()
                      .then(s.bind(s, 15138))
                      .then(({ default: t }) => t(...e))
                : fetch)),
            (...e) => t(...e)
          );
        },
        e2 = (e) =>
          "object" == typeof e &&
          null !== e &&
          "status" in e &&
          "ok" in e &&
          "json" in e &&
          "function" == typeof e.json,
        e9 = async (e, t, s) => {
          await e.setItem(t, JSON.stringify(s));
        },
        e4 = async (e, t) => {
          let s = await e.getItem(t);
          if (!s) return null;
          try {
            return JSON.parse(s);
          } catch (e) {
            return s;
          }
        },
        e5 = async (e, t) => {
          await e.removeItem(t);
        };
      class e3 {
        constructor() {
          this.promise = new e3.promiseConstructor((e, t) => {
            (this.resolve = e), (this.reject = t);
          });
        }
      }
      function e6(e) {
        let t = e.split(".");
        if (3 !== t.length) throw new eK("Invalid JWT structure");
        for (let e = 0; e < t.length; e++)
          if (!eP.test(t[e])) throw new eK("JWT not in base64url format");
        return {
          header: JSON.parse(eY(t[0])),
          payload: JSON.parse(eY(t[1])),
          signature: (function (e) {
            let t = [],
              s = { queue: 0, queuedBits: 0 },
              r = (e) => {
                t.push(e);
              };
            for (let t = 0; t < e.length; t += 1) eG(e.charCodeAt(t), s, r);
            return new Uint8Array(t);
          })(t[2]),
          raw: { header: t[0], payload: t[1] },
        };
      }
      async function e8(e) {
        return await new Promise((t) => {
          setTimeout(() => t(null), e);
        });
      }
      function e7(e) {
        return ("0" + e.toString(16)).substr(-2);
      }
      async function te(e) {
        let t = new TextEncoder().encode(e);
        return Array.from(
          new Uint8Array(await crypto.subtle.digest("SHA-256", t)),
        )
          .map((e) => String.fromCharCode(e))
          .join("");
      }
      async function tt(e) {
        return "undefined" == typeof crypto ||
          void 0 === crypto.subtle ||
          "undefined" == typeof TextEncoder
          ? (console.warn(
              "WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.",
            ),
            e)
          : btoa(await te(e))
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, "");
      }
      async function ts(e, t, s = !1) {
        let r = (function () {
            let e = new Uint32Array(56);
            if ("undefined" == typeof crypto) {
              let e =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
                t = e.length,
                s = "";
              for (let r = 0; r < 56; r++)
                s += e.charAt(Math.floor(Math.random() * t));
              return s;
            }
            return crypto.getRandomValues(e), Array.from(e, e7).join("");
          })(),
          i = r;
        s && (i += "/PASSWORD_RECOVERY"), await e9(e, `${t}-code-verifier`, i);
        let a = await tt(r),
          n = r === a ? "plain" : "s256";
        return [a, n];
      }
      e3.promiseConstructor = Promise;
      let tr = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i,
        ti = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      function ta(e) {
        if (!ti.test(e))
          throw Error(
            "@supabase/auth-js: Expected parameter to be UUID but is not",
          );
      }
      var tn = function (e, t) {
        var s = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            0 > t.indexOf(r) &&
            (s[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var i = 0, r = Object.getOwnPropertySymbols(e);
            i < r.length;
            i++
          )
            0 > t.indexOf(r[i]) &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (s[r[i]] = e[r[i]]);
        return s;
      };
      let to = (e) =>
          e.msg ||
          e.message ||
          e.error_description ||
          e.error ||
          JSON.stringify(e),
        tl = [502, 503, 504];
      async function tu(e) {
        var t;
        let s, r;
        if (!e2(e)) throw new eq(to(e), 0);
        if (tl.includes(e.status)) throw new eq(to(e), e.status);
        try {
          s = await e.json();
        } catch (e) {
          throw new eN(to(e), e);
        }
        let i = (function (e) {
          let t = e.headers.get(eA);
          if (!t || !t.match(tr)) return null;
          try {
            return new Date(`${t}T00:00:00.0Z`);
          } catch (e) {
            return null;
          }
        })(e);
        if (
          (i &&
          i.getTime() >= eC["2024-01-01"].timestamp &&
          "object" == typeof s &&
          s &&
          "string" == typeof s.code
            ? (r = s.code)
            : "object" == typeof s &&
              s &&
              "string" == typeof s.error_code &&
              (r = s.error_code),
          r)
        ) {
          if ("weak_password" === r)
            throw new ez(
              to(s),
              e.status,
              (null == (t = s.weak_password) ? void 0 : t.reasons) || [],
            );
          else if ("session_not_found" === r) throw new eU();
        } else if (
          "object" == typeof s &&
          s &&
          "object" == typeof s.weak_password &&
          s.weak_password &&
          Array.isArray(s.weak_password.reasons) &&
          s.weak_password.reasons.length &&
          s.weak_password.reasons.reduce(
            (e, t) => e && "string" == typeof t,
            !0,
          )
        )
          throw new ez(to(s), e.status, s.weak_password.reasons);
        throw new eR(to(s), e.status || 500, r);
      }
      let th = (e, t, s, r) => {
        let i = { method: e, headers: (null == t ? void 0 : t.headers) || {} };
        return "GET" === e
          ? i
          : ((i.headers = Object.assign(
              { "Content-Type": "application/json;charset=UTF-8" },
              null == t ? void 0 : t.headers,
            )),
            (i.body = JSON.stringify(r)),
            Object.assign(Object.assign({}, i), s));
      };
      async function tc(e, t, s, r) {
        var i;
        let a = Object.assign({}, null == r ? void 0 : r.headers);
        a[eA] || (a[eA] = eC["2024-01-01"].name),
          (null == r ? void 0 : r.jwt) && (a.Authorization = `Bearer ${r.jwt}`);
        let n = null != (i = null == r ? void 0 : r.query) ? i : {};
        (null == r ? void 0 : r.redirectTo) && (n.redirect_to = r.redirectTo);
        let o = Object.keys(n).length
            ? "?" + new URLSearchParams(n).toString()
            : "",
          l = await td(
            e,
            t,
            s + o,
            { headers: a, noResolveJson: null == r ? void 0 : r.noResolveJson },
            {},
            null == r ? void 0 : r.body,
          );
        return (null == r ? void 0 : r.xform)
          ? null == r
            ? void 0
            : r.xform(l)
          : { data: Object.assign({}, l), error: null };
      }
      async function td(e, t, s, r, i, a) {
        let n,
          o = th(t, r, i, a);
        try {
          n = await e(s, Object.assign({}, o));
        } catch (e) {
          throw (console.error(e), new eq(to(e), 0));
        }
        if ((n.ok || (await tu(n)), null == r ? void 0 : r.noResolveJson))
          return n;
        try {
          return await n.json();
        } catch (e) {
          await tu(e);
        }
      }
      function tf(e) {
        var t, s, r;
        let i = null;
        (r = e).access_token &&
          r.refresh_token &&
          r.expires_in &&
          ((i = Object.assign({}, e)),
          e.expires_at ||
            (i.expires_at =
              ((s = e.expires_in), Math.round(Date.now() / 1e3) + s)));
        return {
          data: { session: i, user: null != (t = e.user) ? t : e },
          error: null,
        };
      }
      function tp(e) {
        let t = tf(e);
        return (
          !t.error &&
            e.weak_password &&
            "object" == typeof e.weak_password &&
            Array.isArray(e.weak_password.reasons) &&
            e.weak_password.reasons.length &&
            e.weak_password.message &&
            "string" == typeof e.weak_password.message &&
            e.weak_password.reasons.reduce(
              (e, t) => e && "string" == typeof t,
              !0,
            ) &&
            (t.data.weak_password = e.weak_password),
          t
        );
      }
      function tg(e) {
        var t;
        return { data: { user: null != (t = e.user) ? t : e }, error: null };
      }
      function tm(e) {
        return { data: e, error: null };
      }
      function ty(e) {
        let {
          action_link: t,
          email_otp: s,
          hashed_token: r,
          redirect_to: i,
          verification_type: a,
        } = e;
        return {
          data: {
            properties: {
              action_link: t,
              email_otp: s,
              hashed_token: r,
              redirect_to: i,
              verification_type: a,
            },
            user: Object.assign(
              {},
              tn(e, [
                "action_link",
                "email_otp",
                "hashed_token",
                "redirect_to",
                "verification_type",
              ]),
            ),
          },
          error: null,
        };
      }
      function t_(e) {
        return e;
      }
      let tv = ["global", "local", "others"];
      var tw = function (e, t) {
        var s = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            0 > t.indexOf(r) &&
            (s[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var i = 0, r = Object.getOwnPropertySymbols(e);
            i < r.length;
            i++
          )
            0 > t.indexOf(r[i]) &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (s[r[i]] = e[r[i]]);
        return s;
      };
      class tb {
        constructor({ url: e = "", headers: t = {}, fetch: s }) {
          (this.url = e),
            (this.headers = t),
            (this.fetch = e1(s)),
            (this.mfa = {
              listFactors: this._listFactors.bind(this),
              deleteFactor: this._deleteFactor.bind(this),
            });
        }
        async signOut(e, t = tv[0]) {
          if (0 > tv.indexOf(t))
            throw Error(
              `@supabase/auth-js: Parameter scope must be one of ${tv.join(", ")}`,
            );
          try {
            return (
              await tc(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
                headers: this.headers,
                jwt: e,
                noResolveJson: !0,
              }),
              { data: null, error: null }
            );
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async inviteUserByEmail(e, t = {}) {
          try {
            return await tc(this.fetch, "POST", `${this.url}/invite`, {
              body: { email: e, data: t.data },
              headers: this.headers,
              redirectTo: t.redirectTo,
              xform: tg,
            });
          } catch (e) {
            if (eI(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async generateLink(e) {
          try {
            let { options: t } = e,
              s = tw(e, ["options"]),
              r = Object.assign(Object.assign({}, s), t);
            return (
              "newEmail" in s &&
                ((r.new_email = null == s ? void 0 : s.newEmail),
                delete r.newEmail),
              await tc(this.fetch, "POST", `${this.url}/admin/generate_link`, {
                body: r,
                headers: this.headers,
                xform: ty,
                redirectTo: null == t ? void 0 : t.redirectTo,
              })
            );
          } catch (e) {
            if (eI(e))
              return { data: { properties: null, user: null }, error: e };
            throw e;
          }
        }
        async createUser(e) {
          try {
            return await tc(this.fetch, "POST", `${this.url}/admin/users`, {
              body: e,
              headers: this.headers,
              xform: tg,
            });
          } catch (e) {
            if (eI(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async listUsers(e) {
          var t, s, r, i, a, n, o;
          try {
            let l = { nextPage: null, lastPage: 0, total: 0 },
              u = await tc(this.fetch, "GET", `${this.url}/admin/users`, {
                headers: this.headers,
                noResolveJson: !0,
                query: {
                  page:
                    null !=
                    (s =
                      null == (t = null == e ? void 0 : e.page)
                        ? void 0
                        : t.toString())
                      ? s
                      : "",
                  per_page:
                    null !=
                    (i =
                      null == (r = null == e ? void 0 : e.perPage)
                        ? void 0
                        : r.toString())
                      ? i
                      : "",
                },
                xform: t_,
              });
            if (u.error) throw u.error;
            let h = await u.json(),
              c = null != (a = u.headers.get("x-total-count")) ? a : 0,
              d =
                null !=
                (o =
                  null == (n = u.headers.get("link")) ? void 0 : n.split(","))
                  ? o
                  : [];
            return (
              d.length > 0 &&
                (d.forEach((e) => {
                  let t = parseInt(
                      e.split(";")[0].split("=")[1].substring(0, 1),
                    ),
                    s = JSON.parse(e.split(";")[1].split("=")[1]);
                  l[`${s}Page`] = t;
                }),
                (l.total = parseInt(c))),
              { data: Object.assign(Object.assign({}, h), l), error: null }
            );
          } catch (e) {
            if (eI(e)) return { data: { users: [] }, error: e };
            throw e;
          }
        }
        async getUserById(e) {
          ta(e);
          try {
            return await tc(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
              headers: this.headers,
              xform: tg,
            });
          } catch (e) {
            if (eI(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async updateUserById(e, t) {
          ta(e);
          try {
            return await tc(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
              body: t,
              headers: this.headers,
              xform: tg,
            });
          } catch (e) {
            if (eI(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async deleteUser(e, t = !1) {
          ta(e);
          try {
            return await tc(
              this.fetch,
              "DELETE",
              `${this.url}/admin/users/${e}`,
              {
                headers: this.headers,
                body: { should_soft_delete: t },
                xform: tg,
              },
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async _listFactors(e) {
          ta(e.userId);
          try {
            let { data: t, error: s } = await tc(
              this.fetch,
              "GET",
              `${this.url}/admin/users/${e.userId}/factors`,
              {
                headers: this.headers,
                xform: (e) => ({ data: { factors: e }, error: null }),
              },
            );
            return { data: t, error: s };
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _deleteFactor(e) {
          ta(e.userId), ta(e.id);
          try {
            return {
              data: await tc(
                this.fetch,
                "DELETE",
                `${this.url}/admin/users/${e.userId}/factors/${e.id}`,
                { headers: this.headers },
              ),
              error: null,
            };
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
      }
      let tk = {
        getItem: (e) => (e0() ? globalThis.localStorage.getItem(e) : null),
        setItem: (e, t) => {
          e0() && globalThis.localStorage.setItem(e, t);
        },
        removeItem: (e) => {
          e0() && globalThis.localStorage.removeItem(e);
        },
      };
      function tT(e = {}) {
        return {
          getItem: (t) => e[t] || null,
          setItem: (t, s) => {
            e[t] = s;
          },
          removeItem: (t) => {
            delete e[t];
          },
        };
      }
      let tS = {
        debug: !!(
          globalThis &&
          e0() &&
          globalThis.localStorage &&
          "true" ===
            globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")
        ),
      };
      class tx extends Error {
        constructor(e) {
          super(e), (this.isAcquireTimeout = !0);
        }
      }
      class tj extends tx {}
      async function tO(e, t, s) {
        tS.debug &&
          console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e, t);
        let r = new globalThis.AbortController();
        return (
          t > 0 &&
            setTimeout(() => {
              r.abort(),
                tS.debug &&
                  console.log(
                    "@supabase/gotrue-js: navigatorLock acquire timed out",
                    e,
                  );
            }, t),
          await Promise.resolve().then(() =>
            globalThis.navigator.locks.request(
              e,
              0 === t
                ? { mode: "exclusive", ifAvailable: !0 }
                : { mode: "exclusive", signal: r.signal },
              async (r) => {
                if (r) {
                  tS.debug &&
                    console.log(
                      "@supabase/gotrue-js: navigatorLock: acquired",
                      e,
                      r.name,
                    );
                  try {
                    return await s();
                  } finally {
                    tS.debug &&
                      console.log(
                        "@supabase/gotrue-js: navigatorLock: released",
                        e,
                        r.name,
                      );
                  }
                }
                if (0 === t)
                  throw (
                    (tS.debug &&
                      console.log(
                        "@supabase/gotrue-js: navigatorLock: not immediately available",
                        e,
                      ),
                    new tj(
                      `Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`,
                    ))
                  );
                if (tS.debug)
                  try {
                    let e = await globalThis.navigator.locks.query();
                    console.log(
                      "@supabase/gotrue-js: Navigator LockManager state",
                      JSON.stringify(e, null, "  "),
                    );
                  } catch (e) {
                    console.warn(
                      "@supabase/gotrue-js: Error when querying Navigator LockManager state",
                      e,
                    );
                  }
                return (
                  console.warn(
                    "@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request",
                  ),
                  await s()
                );
              },
            ),
          )
        );
      }
      if ("object" != typeof globalThis)
        try {
          Object.defineProperty(Object.prototype, "__magic__", {
            get: function () {
              return this;
            },
            configurable: !0,
          }),
            (__magic__.globalThis = __magic__),
            delete Object.prototype.__magic__;
        } catch (e) {
          "undefined" != typeof self && (self.globalThis = self);
        }
      let tE = {
        url: "http://localhost:9999",
        storageKey: "supabase.auth.token",
        autoRefreshToken: !0,
        persistSession: !0,
        detectSessionInUrl: !0,
        headers: eE,
        flowType: "implicit",
        debug: !1,
        hasCustomAuthorizationHeader: !1,
      };
      async function tA(e, t, s) {
        return await s();
      }
      class tC {
        constructor(e) {
          var t, s;
          (this.memoryStorage = null),
            (this.stateChangeEmitters = new Map()),
            (this.autoRefreshTicker = null),
            (this.visibilityChangedCallback = null),
            (this.refreshingDeferred = null),
            (this.initializePromise = null),
            (this.detectSessionInUrl = !0),
            (this.hasCustomAuthorizationHeader = !1),
            (this.suppressGetSessionWarning = !1),
            (this.lockAcquired = !1),
            (this.pendingInLock = []),
            (this.broadcastChannel = null),
            (this.logger = console.log),
            (this.instanceID = tC.nextInstanceID),
            (tC.nextInstanceID += 1),
            this.instanceID > 0 &&
              eX() &&
              console.warn(
                "Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.",
              );
          let r = Object.assign(Object.assign({}, tE), e);
          if (
            ((this.logDebugMessages = !!r.debug),
            "function" == typeof r.debug && (this.logger = r.debug),
            (this.persistSession = r.persistSession),
            (this.storageKey = r.storageKey),
            (this.autoRefreshToken = r.autoRefreshToken),
            (this.admin = new tb({
              url: r.url,
              headers: r.headers,
              fetch: r.fetch,
            })),
            (this.url = r.url),
            (this.headers = r.headers),
            (this.fetch = e1(r.fetch)),
            (this.lock = r.lock || tA),
            (this.detectSessionInUrl = r.detectSessionInUrl),
            (this.flowType = r.flowType),
            (this.hasCustomAuthorizationHeader =
              r.hasCustomAuthorizationHeader),
            r.lock
              ? (this.lock = r.lock)
              : eX() &&
                  (null ==
                  (t = null == globalThis ? void 0 : globalThis.navigator)
                    ? void 0
                    : t.locks)
                ? (this.lock = tO)
                : (this.lock = tA),
            (this.jwks = { keys: [] }),
            (this.jwks_cached_at = Number.MIN_SAFE_INTEGER),
            (this.mfa = {
              verify: this._verify.bind(this),
              enroll: this._enroll.bind(this),
              unenroll: this._unenroll.bind(this),
              challenge: this._challenge.bind(this),
              listFactors: this._listFactors.bind(this),
              challengeAndVerify: this._challengeAndVerify.bind(this),
              getAuthenticatorAssuranceLevel:
                this._getAuthenticatorAssuranceLevel.bind(this),
            }),
            this.persistSession
              ? r.storage
                ? (this.storage = r.storage)
                : e0()
                  ? (this.storage = tk)
                  : ((this.memoryStorage = {}),
                    (this.storage = tT(this.memoryStorage)))
              : ((this.memoryStorage = {}),
                (this.storage = tT(this.memoryStorage))),
            eX() &&
              globalThis.BroadcastChannel &&
              this.persistSession &&
              this.storageKey)
          ) {
            try {
              this.broadcastChannel = new globalThis.BroadcastChannel(
                this.storageKey,
              );
            } catch (e) {
              console.error(
                "Failed to create a new BroadcastChannel, multi-tab state changes will not be available",
                e,
              );
            }
            null == (s = this.broadcastChannel) ||
              s.addEventListener("message", async (e) => {
                this._debug(
                  "received broadcast notification from other tab or client",
                  e,
                ),
                  await this._notifyAllSubscribers(
                    e.data.event,
                    e.data.session,
                    !1,
                  );
              });
          }
          this.initialize();
        }
        _debug(...e) {
          return (
            this.logDebugMessages &&
              this.logger(
                `GoTrueClient@${this.instanceID} (${eO}) ${new Date().toISOString()}`,
                ...e,
              ),
            this
          );
        }
        async initialize() {
          return (
            this.initializePromise ||
              (this.initializePromise = (async () =>
                await this._acquireLock(
                  -1,
                  async () => await this._initialize(),
                ))()),
            await this.initializePromise
          );
        }
        async _initialize() {
          var e;
          try {
            let t = (function (e) {
                let t = {},
                  s = new URL(e);
                if (s.hash && "#" === s.hash[0])
                  try {
                    new URLSearchParams(s.hash.substring(1)).forEach((e, s) => {
                      t[s] = e;
                    });
                  } catch (e) {}
                return (
                  s.searchParams.forEach((e, s) => {
                    t[s] = e;
                  }),
                  t
                );
              })(window.location.href),
              s = "none";
            if (
              (this._isImplicitGrantCallback(t)
                ? (s = "implicit")
                : (await this._isPKCECallback(t)) && (s = "pkce"),
              eX() && this.detectSessionInUrl && "none" !== s)
            ) {
              let { data: r, error: i } = await this._getSessionFromURL(t, s);
              if (i) {
                if (
                  (this._debug(
                    "#_initialize()",
                    "error detecting session from URL",
                    i,
                  ),
                  eI(i) && "AuthImplicitGrantRedirectError" === i.name)
                ) {
                  let t = null == (e = i.details) ? void 0 : e.code;
                  if (
                    "identity_already_exists" === t ||
                    "identity_not_found" === t ||
                    "single_identity_not_deletable" === t
                  )
                    return { error: i };
                }
                return await this._removeSession(), { error: i };
              }
              let { session: a, redirectType: n } = r;
              return (
                this._debug(
                  "#_initialize()",
                  "detected session in URL",
                  a,
                  "redirect type",
                  n,
                ),
                await this._saveSession(a),
                setTimeout(async () => {
                  "recovery" === n
                    ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", a)
                    : await this._notifyAllSubscribers("SIGNED_IN", a);
                }, 0),
                { error: null }
              );
            }
            return await this._recoverAndRefresh(), { error: null };
          } catch (e) {
            if (eI(e)) return { error: e };
            return {
              error: new eN("Unexpected error during initialization", e),
            };
          } finally {
            await this._handleVisibilityChange(),
              this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e) {
          var t, s, r;
          try {
            let { data: i, error: a } = await tc(
              this.fetch,
              "POST",
              `${this.url}/signup`,
              {
                headers: this.headers,
                body: {
                  data:
                    null !=
                    (s =
                      null == (t = null == e ? void 0 : e.options)
                        ? void 0
                        : t.data)
                      ? s
                      : {},
                  gotrue_meta_security: {
                    captcha_token:
                      null == (r = null == e ? void 0 : e.options)
                        ? void 0
                        : r.captchaToken,
                  },
                },
                xform: tf,
              },
            );
            if (a || !i)
              return { data: { user: null, session: null }, error: a };
            let n = i.session,
              o = i.user;
            return (
              i.session &&
                (await this._saveSession(i.session),
                await this._notifyAllSubscribers("SIGNED_IN", n)),
              { data: { user: o, session: n }, error: null }
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signUp(e) {
          var t, s, r;
          try {
            let i;
            if ("email" in e) {
              let { email: s, password: r, options: a } = e,
                n = null,
                o = null;
              "pkce" === this.flowType &&
                ([n, o] = await ts(this.storage, this.storageKey)),
                (i = await tc(this.fetch, "POST", `${this.url}/signup`, {
                  headers: this.headers,
                  redirectTo: null == a ? void 0 : a.emailRedirectTo,
                  body: {
                    email: s,
                    password: r,
                    data: null != (t = null == a ? void 0 : a.data) ? t : {},
                    gotrue_meta_security: {
                      captcha_token: null == a ? void 0 : a.captchaToken,
                    },
                    code_challenge: n,
                    code_challenge_method: o,
                  },
                  xform: tf,
                }));
            } else if ("phone" in e) {
              let { phone: t, password: a, options: n } = e;
              i = await tc(this.fetch, "POST", `${this.url}/signup`, {
                headers: this.headers,
                body: {
                  phone: t,
                  password: a,
                  data: null != (s = null == n ? void 0 : n.data) ? s : {},
                  channel:
                    null != (r = null == n ? void 0 : n.channel) ? r : "sms",
                  gotrue_meta_security: {
                    captcha_token: null == n ? void 0 : n.captchaToken,
                  },
                },
                xform: tf,
              });
            } else
              throw new eM(
                "You must provide either an email or phone number and a password",
              );
            let { data: a, error: n } = i;
            if (n || !a)
              return { data: { user: null, session: null }, error: n };
            let o = a.session,
              l = a.user;
            return (
              a.session &&
                (await this._saveSession(a.session),
                await this._notifyAllSubscribers("SIGNED_IN", o)),
              { data: { user: l, session: o }, error: null }
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithPassword(e) {
          try {
            let t;
            if ("email" in e) {
              let { email: s, password: r, options: i } = e;
              t = await tc(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=password`,
                {
                  headers: this.headers,
                  body: {
                    email: s,
                    password: r,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                  xform: tp,
                },
              );
            } else if ("phone" in e) {
              let { phone: s, password: r, options: i } = e;
              t = await tc(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=password`,
                {
                  headers: this.headers,
                  body: {
                    phone: s,
                    password: r,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                  xform: tp,
                },
              );
            } else
              throw new eM(
                "You must provide either an email or phone number and a password",
              );
            let { data: s, error: r } = t;
            if (r) return { data: { user: null, session: null }, error: r };
            if (!s || !s.session || !s.user)
              return { data: { user: null, session: null }, error: new eD() };
            return (
              s.session &&
                (await this._saveSession(s.session),
                await this._notifyAllSubscribers("SIGNED_IN", s.session)),
              {
                data: Object.assign(
                  { user: s.user, session: s.session },
                  s.weak_password ? { weakPassword: s.weak_password } : null,
                ),
                error: r,
              }
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithOAuth(e) {
          var t, s, r, i;
          return await this._handleProviderSignIn(e.provider, {
            redirectTo: null == (t = e.options) ? void 0 : t.redirectTo,
            scopes: null == (s = e.options) ? void 0 : s.scopes,
            queryParams: null == (r = e.options) ? void 0 : r.queryParams,
            skipBrowserRedirect:
              null == (i = e.options) ? void 0 : i.skipBrowserRedirect,
          });
        }
        async exchangeCodeForSession(e) {
          return (
            await this.initializePromise,
            this._acquireLock(-1, async () => this._exchangeCodeForSession(e))
          );
        }
        async signInWithWeb3(e) {
          let { chain: t } = e;
          if ("solana" === t) return await this.signInWithSolana(e);
          throw Error(`@supabase/auth-js: Unsupported chain "${t}"`);
        }
        async signInWithSolana(e) {
          var t, s, r, i, a, n, o, l, u, h, c, d;
          let f, p;
          if ("message" in e) (f = e.message), (p = e.signature);
          else {
            let c,
              { chain: d, wallet: g, statement: m, options: y } = e;
            if (eX())
              if ("object" == typeof g) c = g;
              else {
                let e = window;
                if (
                  "solana" in e &&
                  "object" == typeof e.solana &&
                  (("signIn" in e.solana &&
                    "function" == typeof e.solana.signIn) ||
                    ("signMessage" in e.solana &&
                      "function" == typeof e.solana.signMessage))
                )
                  c = e.solana;
                else
                  throw Error(
                    "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
                  );
              }
            else {
              if ("object" != typeof g || !(null == y ? void 0 : y.url))
                throw Error(
                  "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
                );
              c = g;
            }
            let _ = new URL(
              null != (t = null == y ? void 0 : y.url)
                ? t
                : window.location.href,
            );
            if ("signIn" in c && c.signIn) {
              let e,
                t = await c.signIn(
                  Object.assign(
                    Object.assign(
                      Object.assign(
                        { issuedAt: new Date().toISOString() },
                        null == y ? void 0 : y.signInWithSolana,
                      ),
                      { version: "1", domain: _.host, uri: _.href },
                    ),
                    m ? { statement: m } : null,
                  ),
                );
              if (Array.isArray(t) && t[0] && "object" == typeof t[0]) e = t[0];
              else if (
                t &&
                "object" == typeof t &&
                "signedMessage" in t &&
                "signature" in t
              )
                e = t;
              else
                throw Error(
                  "@supabase/auth-js: Wallet method signIn() returned unrecognized value",
                );
              if (
                "signedMessage" in e &&
                "signature" in e &&
                ("string" == typeof e.signedMessage ||
                  e.signedMessage instanceof Uint8Array) &&
                e.signature instanceof Uint8Array
              )
                (f =
                  "string" == typeof e.signedMessage
                    ? e.signedMessage
                    : new TextDecoder().decode(e.signedMessage)),
                  (p = e.signature);
              else
                throw Error(
                  "@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields",
                );
            } else {
              if (
                !("signMessage" in c) ||
                "function" != typeof c.signMessage ||
                !("publicKey" in c) ||
                "object" != typeof c ||
                !c.publicKey ||
                !("toBase58" in c.publicKey) ||
                "function" != typeof c.publicKey.toBase58
              )
                throw Error(
                  "@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API",
                );
              f = [
                `${_.host} wants you to sign in with your Solana account:`,
                c.publicKey.toBase58(),
                ...(m ? ["", m, ""] : [""]),
                "Version: 1",
                `URI: ${_.href}`,
                `Issued At: ${null != (r = null == (s = null == y ? void 0 : y.signInWithSolana) ? void 0 : s.issuedAt) ? r : new Date().toISOString()}`,
                ...((
                  null == (i = null == y ? void 0 : y.signInWithSolana)
                    ? void 0
                    : i.notBefore
                )
                  ? [`Not Before: ${y.signInWithSolana.notBefore}`]
                  : []),
                ...((
                  null == (a = null == y ? void 0 : y.signInWithSolana)
                    ? void 0
                    : a.expirationTime
                )
                  ? [`Expiration Time: ${y.signInWithSolana.expirationTime}`]
                  : []),
                ...((
                  null == (n = null == y ? void 0 : y.signInWithSolana)
                    ? void 0
                    : n.chainId
                )
                  ? [`Chain ID: ${y.signInWithSolana.chainId}`]
                  : []),
                ...((
                  null == (o = null == y ? void 0 : y.signInWithSolana)
                    ? void 0
                    : o.nonce
                )
                  ? [`Nonce: ${y.signInWithSolana.nonce}`]
                  : []),
                ...((
                  null == (l = null == y ? void 0 : y.signInWithSolana)
                    ? void 0
                    : l.requestId
                )
                  ? [`Request ID: ${y.signInWithSolana.requestId}`]
                  : []),
                ...((
                  null ==
                  (h =
                    null == (u = null == y ? void 0 : y.signInWithSolana)
                      ? void 0
                      : u.resources)
                    ? void 0
                    : h.length
                )
                  ? [
                      "Resources",
                      ...y.signInWithSolana.resources.map((e) => `- ${e}`),
                    ]
                  : []),
              ].join("\n");
              let e = await c.signMessage(new TextEncoder().encode(f), "utf8");
              if (!e || !(e instanceof Uint8Array))
                throw Error(
                  "@supabase/auth-js: Wallet signMessage() API returned an recognized value",
                );
              p = e;
            }
          }
          try {
            let { data: t, error: s } = await tc(
              this.fetch,
              "POST",
              `${this.url}/token?grant_type=web3`,
              {
                headers: this.headers,
                body: Object.assign(
                  {
                    chain: "solana",
                    message: f,
                    signature: (function (e) {
                      let t = [],
                        s = { queue: 0, queuedBits: 0 },
                        r = (e) => {
                          t.push(e);
                        };
                      return (
                        e.forEach((e) => eH(e, s, r)),
                        eH(null, s, r),
                        t.join("")
                      );
                    })(p),
                  },
                  (null == (c = e.options) ? void 0 : c.captchaToken)
                    ? {
                        gotrue_meta_security: {
                          captcha_token:
                            null == (d = e.options) ? void 0 : d.captchaToken,
                        },
                      }
                    : null,
                ),
                xform: tf,
              },
            );
            if (s) throw s;
            if (!t || !t.session || !t.user)
              return { data: { user: null, session: null }, error: new eD() };
            return (
              t.session &&
                (await this._saveSession(t.session),
                await this._notifyAllSubscribers("SIGNED_IN", t.session)),
              { data: Object.assign({}, t), error: s }
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async _exchangeCodeForSession(e) {
          let t = await e4(this.storage, `${this.storageKey}-code-verifier`),
            [s, r] = (null != t ? t : "").split("/");
          try {
            let { data: t, error: i } = await tc(
              this.fetch,
              "POST",
              `${this.url}/token?grant_type=pkce`,
              {
                headers: this.headers,
                body: { auth_code: e, code_verifier: s },
                xform: tf,
              },
            );
            if ((await e5(this.storage, `${this.storageKey}-code-verifier`), i))
              throw i;
            if (!t || !t.session || !t.user)
              return {
                data: { user: null, session: null, redirectType: null },
                error: new eD(),
              };
            return (
              t.session &&
                (await this._saveSession(t.session),
                await this._notifyAllSubscribers("SIGNED_IN", t.session)),
              {
                data: Object.assign(Object.assign({}, t), {
                  redirectType: null != r ? r : null,
                }),
                error: i,
              }
            );
          } catch (e) {
            if (eI(e))
              return {
                data: { user: null, session: null, redirectType: null },
                error: e,
              };
            throw e;
          }
        }
        async signInWithIdToken(e) {
          try {
            let {
                options: t,
                provider: s,
                token: r,
                access_token: i,
                nonce: a,
              } = e,
              { data: n, error: o } = await tc(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=id_token`,
                {
                  headers: this.headers,
                  body: {
                    provider: s,
                    id_token: r,
                    access_token: i,
                    nonce: a,
                    gotrue_meta_security: {
                      captcha_token: null == t ? void 0 : t.captchaToken,
                    },
                  },
                  xform: tf,
                },
              );
            if (o) return { data: { user: null, session: null }, error: o };
            if (!n || !n.session || !n.user)
              return { data: { user: null, session: null }, error: new eD() };
            return (
              n.session &&
                (await this._saveSession(n.session),
                await this._notifyAllSubscribers("SIGNED_IN", n.session)),
              { data: n, error: o }
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithOtp(e) {
          var t, s, r, i, a;
          try {
            if ("email" in e) {
              let { email: r, options: i } = e,
                a = null,
                n = null;
              "pkce" === this.flowType &&
                ([a, n] = await ts(this.storage, this.storageKey));
              let { error: o } = await tc(
                this.fetch,
                "POST",
                `${this.url}/otp`,
                {
                  headers: this.headers,
                  body: {
                    email: r,
                    data: null != (t = null == i ? void 0 : i.data) ? t : {},
                    create_user:
                      null == (s = null == i ? void 0 : i.shouldCreateUser) ||
                      s,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                    code_challenge: a,
                    code_challenge_method: n,
                  },
                  redirectTo: null == i ? void 0 : i.emailRedirectTo,
                },
              );
              return { data: { user: null, session: null }, error: o };
            }
            if ("phone" in e) {
              let { phone: t, options: s } = e,
                { data: n, error: o } = await tc(
                  this.fetch,
                  "POST",
                  `${this.url}/otp`,
                  {
                    headers: this.headers,
                    body: {
                      phone: t,
                      data: null != (r = null == s ? void 0 : s.data) ? r : {},
                      create_user:
                        null == (i = null == s ? void 0 : s.shouldCreateUser) ||
                        i,
                      gotrue_meta_security: {
                        captcha_token: null == s ? void 0 : s.captchaToken,
                      },
                      channel:
                        null != (a = null == s ? void 0 : s.channel)
                          ? a
                          : "sms",
                    },
                  },
                );
              return {
                data: {
                  user: null,
                  session: null,
                  messageId: null == n ? void 0 : n.message_id,
                },
                error: o,
              };
            }
            throw new eM("You must provide either an email or phone number.");
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async verifyOtp(e) {
          var t, s;
          try {
            let r, i;
            "options" in e &&
              ((r = null == (t = e.options) ? void 0 : t.redirectTo),
              (i = null == (s = e.options) ? void 0 : s.captchaToken));
            let { data: a, error: n } = await tc(
              this.fetch,
              "POST",
              `${this.url}/verify`,
              {
                headers: this.headers,
                body: Object.assign(Object.assign({}, e), {
                  gotrue_meta_security: { captcha_token: i },
                }),
                redirectTo: r,
                xform: tf,
              },
            );
            if (n) throw n;
            if (!a) throw Error("An error occurred on token verification.");
            let o = a.session,
              l = a.user;
            return (
              (null == o ? void 0 : o.access_token) &&
                (await this._saveSession(o),
                await this._notifyAllSubscribers(
                  "recovery" == e.type ? "PASSWORD_RECOVERY" : "SIGNED_IN",
                  o,
                )),
              { data: { user: l, session: o }, error: null }
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async signInWithSSO(e) {
          var t, s, r;
          try {
            let i = null,
              a = null;
            return (
              "pkce" === this.flowType &&
                ([i, a] = await ts(this.storage, this.storageKey)),
              await tc(this.fetch, "POST", `${this.url}/sso`, {
                body: Object.assign(
                  Object.assign(
                    Object.assign(
                      Object.assign(
                        Object.assign(
                          {},
                          "providerId" in e
                            ? { provider_id: e.providerId }
                            : null,
                        ),
                        "domain" in e ? { domain: e.domain } : null,
                      ),
                      {
                        redirect_to:
                          null !=
                          (s = null == (t = e.options) ? void 0 : t.redirectTo)
                            ? s
                            : void 0,
                      },
                    ),
                    (
                      null == (r = null == e ? void 0 : e.options)
                        ? void 0
                        : r.captchaToken
                    )
                      ? {
                          gotrue_meta_security: {
                            captcha_token: e.options.captchaToken,
                          },
                        }
                      : null,
                  ),
                  {
                    skip_http_redirect: !0,
                    code_challenge: i,
                    code_challenge_method: a,
                  },
                ),
                headers: this.headers,
                xform: tm,
              })
            );
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async reauthenticate() {
          return (
            await this.initializePromise,
            await this._acquireLock(
              -1,
              async () => await this._reauthenticate(),
            )
          );
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e) => {
              let {
                data: { session: t },
                error: s,
              } = e;
              if (s) throw s;
              if (!t) throw new eU();
              let { error: r } = await tc(
                this.fetch,
                "GET",
                `${this.url}/reauthenticate`,
                { headers: this.headers, jwt: t.access_token },
              );
              return { data: { user: null, session: null }, error: r };
            });
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async resend(e) {
          try {
            let t = `${this.url}/resend`;
            if ("email" in e) {
              let { email: s, type: r, options: i } = e,
                { error: a } = await tc(this.fetch, "POST", t, {
                  headers: this.headers,
                  body: {
                    email: s,
                    type: r,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                  redirectTo: null == i ? void 0 : i.emailRedirectTo,
                });
              return { data: { user: null, session: null }, error: a };
            }
            if ("phone" in e) {
              let { phone: s, type: r, options: i } = e,
                { data: a, error: n } = await tc(this.fetch, "POST", t, {
                  headers: this.headers,
                  body: {
                    phone: s,
                    type: r,
                    gotrue_meta_security: {
                      captcha_token: null == i ? void 0 : i.captchaToken,
                    },
                  },
                });
              return {
                data: {
                  user: null,
                  session: null,
                  messageId: null == a ? void 0 : a.message_id,
                },
                error: n,
              };
            }
            throw new eM(
              "You must provide either an email or phone number and a type",
            );
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async getSession() {
          return (
            await this.initializePromise,
            await this._acquireLock(-1, async () =>
              this._useSession(async (e) => e),
            )
          );
        }
        async _acquireLock(e, t) {
          this._debug("#_acquireLock", "begin", e);
          try {
            if (this.lockAcquired) {
              let e = this.pendingInLock.length
                  ? this.pendingInLock[this.pendingInLock.length - 1]
                  : Promise.resolve(),
                s = (async () => (await e, await t()))();
              return (
                this.pendingInLock.push(
                  (async () => {
                    try {
                      await s;
                    } catch (e) {}
                  })(),
                ),
                s
              );
            }
            return await this.lock(`lock:${this.storageKey}`, e, async () => {
              this._debug(
                "#_acquireLock",
                "lock acquired for storage key",
                this.storageKey,
              );
              try {
                this.lockAcquired = !0;
                let e = t();
                for (
                  this.pendingInLock.push(
                    (async () => {
                      try {
                        await e;
                      } catch (e) {}
                    })(),
                  ),
                    await e;
                  this.pendingInLock.length;

                ) {
                  let e = [...this.pendingInLock];
                  await Promise.all(e), this.pendingInLock.splice(0, e.length);
                }
                return await e;
              } finally {
                this._debug(
                  "#_acquireLock",
                  "lock released for storage key",
                  this.storageKey,
                ),
                  (this.lockAcquired = !1);
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e) {
          this._debug("#_useSession", "begin");
          try {
            let t = await this.__loadSession();
            return await e(t);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"),
            this.lockAcquired ||
              this._debug(
                "#__loadSession()",
                "used outside of an acquired lock!",
                Error().stack,
              );
          try {
            let e = null,
              t = await e4(this.storage, this.storageKey);
            if (
              (this._debug("#getSession()", "session from storage", t),
              null !== t &&
                (this._isValidSession(t)
                  ? (e = t)
                  : (this._debug(
                      "#getSession()",
                      "session from storage is not valid",
                    ),
                    await this._removeSession())),
              !e)
            )
              return { data: { session: null }, error: null };
            let s = !!e.expires_at && 1e3 * e.expires_at - Date.now() < 9e4;
            if (
              (this._debug(
                "#__loadSession()",
                `session has${s ? "" : " not"} expired`,
                "expires_at",
                e.expires_at,
              ),
              !s)
            ) {
              if (this.storage.isServer) {
                let t = this.suppressGetSessionWarning;
                e = new Proxy(e, {
                  get: (e, s, r) => (
                    t ||
                      "user" !== s ||
                      (console.warn(
                        "Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.",
                      ),
                      (t = !0),
                      (this.suppressGetSessionWarning = !0)),
                    Reflect.get(e, s, r)
                  ),
                });
              }
              return { data: { session: e }, error: null };
            }
            let { session: r, error: i } = await this._callRefreshToken(
              e.refresh_token,
            );
            if (i) return { data: { session: null }, error: i };
            return { data: { session: r }, error: null };
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e) {
          return e
            ? await this._getUser(e)
            : (await this.initializePromise,
              await this._acquireLock(-1, async () => await this._getUser()));
        }
        async _getUser(e) {
          try {
            if (e)
              return await tc(this.fetch, "GET", `${this.url}/user`, {
                headers: this.headers,
                jwt: e,
                xform: tg,
              });
            return await this._useSession(async (e) => {
              var t, s, r;
              let { data: i, error: a } = e;
              if (a) throw a;
              return (null == (t = i.session) ? void 0 : t.access_token) ||
                this.hasCustomAuthorizationHeader
                ? await tc(this.fetch, "GET", `${this.url}/user`, {
                    headers: this.headers,
                    jwt:
                      null !=
                      (r = null == (s = i.session) ? void 0 : s.access_token)
                        ? r
                        : void 0,
                    xform: tg,
                  })
                : { data: { user: null }, error: new eU() };
            });
          } catch (e) {
            if (eI(e))
              return (
                eI(e) &&
                  "AuthSessionMissingError" === e.name &&
                  (await this._removeSession(),
                  await e5(this.storage, `${this.storageKey}-code-verifier`)),
                { data: { user: null }, error: e }
              );
            throw e;
          }
        }
        async updateUser(e, t = {}) {
          return (
            await this.initializePromise,
            await this._acquireLock(
              -1,
              async () => await this._updateUser(e, t),
            )
          );
        }
        async _updateUser(e, t = {}) {
          try {
            return await this._useSession(async (s) => {
              let { data: r, error: i } = s;
              if (i) throw i;
              if (!r.session) throw new eU();
              let a = r.session,
                n = null,
                o = null;
              "pkce" === this.flowType &&
                null != e.email &&
                ([n, o] = await ts(this.storage, this.storageKey));
              let { data: l, error: u } = await tc(
                this.fetch,
                "PUT",
                `${this.url}/user`,
                {
                  headers: this.headers,
                  redirectTo: null == t ? void 0 : t.emailRedirectTo,
                  body: Object.assign(Object.assign({}, e), {
                    code_challenge: n,
                    code_challenge_method: o,
                  }),
                  jwt: a.access_token,
                  xform: tg,
                },
              );
              if (u) throw u;
              return (
                (a.user = l.user),
                await this._saveSession(a),
                await this._notifyAllSubscribers("USER_UPDATED", a),
                { data: { user: a.user }, error: null }
              );
            });
          } catch (e) {
            if (eI(e)) return { data: { user: null }, error: e };
            throw e;
          }
        }
        async setSession(e) {
          return (
            await this.initializePromise,
            await this._acquireLock(-1, async () => await this._setSession(e))
          );
        }
        async _setSession(e) {
          try {
            if (!e.access_token || !e.refresh_token) throw new eU();
            let t = Date.now() / 1e3,
              s = t,
              r = !0,
              i = null,
              { payload: a } = e6(e.access_token);
            if ((a.exp && (r = (s = a.exp) <= t), r)) {
              let { session: t, error: s } = await this._callRefreshToken(
                e.refresh_token,
              );
              if (s) return { data: { user: null, session: null }, error: s };
              if (!t)
                return { data: { user: null, session: null }, error: null };
              i = t;
            } else {
              let { data: r, error: a } = await this._getUser(e.access_token);
              if (a) throw a;
              (i = {
                access_token: e.access_token,
                refresh_token: e.refresh_token,
                user: r.user,
                token_type: "bearer",
                expires_in: s - t,
                expires_at: s,
              }),
                await this._saveSession(i),
                await this._notifyAllSubscribers("SIGNED_IN", i);
            }
            return { data: { user: i.user, session: i }, error: null };
          } catch (e) {
            if (eI(e)) return { data: { session: null, user: null }, error: e };
            throw e;
          }
        }
        async refreshSession(e) {
          return (
            await this.initializePromise,
            await this._acquireLock(
              -1,
              async () => await this._refreshSession(e),
            )
          );
        }
        async _refreshSession(e) {
          try {
            return await this._useSession(async (t) => {
              var s;
              if (!e) {
                let { data: r, error: i } = t;
                if (i) throw i;
                e = null != (s = r.session) ? s : void 0;
              }
              if (!(null == e ? void 0 : e.refresh_token)) throw new eU();
              let { session: r, error: i } = await this._callRefreshToken(
                e.refresh_token,
              );
              return i
                ? { data: { user: null, session: null }, error: i }
                : r
                  ? { data: { user: r.user, session: r }, error: null }
                  : { data: { user: null, session: null }, error: null };
            });
          } catch (e) {
            if (eI(e)) return { data: { user: null, session: null }, error: e };
            throw e;
          }
        }
        async _getSessionFromURL(e, t) {
          try {
            if (!eX()) throw new eZ("No browser detected.");
            if (e.error || e.error_description || e.error_code)
              throw new eZ(
                e.error_description ||
                  "Error in URL with unspecified error_description",
                {
                  error: e.error || "unspecified_error",
                  code: e.error_code || "unspecified_code",
                },
              );
            switch (t) {
              case "implicit":
                if ("pkce" === this.flowType)
                  throw new eF("Not a valid PKCE flow url.");
                break;
              case "pkce":
                if ("implicit" === this.flowType)
                  throw new eZ("Not a valid implicit grant flow url.");
            }
            if ("pkce" === t) {
              if (
                (this._debug("#_initialize()", "begin", "is PKCE flow", !0),
                !e.code)
              )
                throw new eF("No code detected.");
              let { data: t, error: s } = await this._exchangeCodeForSession(
                e.code,
              );
              if (s) throw s;
              let r = new URL(window.location.href);
              return (
                r.searchParams.delete("code"),
                window.history.replaceState(
                  window.history.state,
                  "",
                  r.toString(),
                ),
                {
                  data: { session: t.session, redirectType: null },
                  error: null,
                }
              );
            }
            let {
              provider_token: s,
              provider_refresh_token: r,
              access_token: i,
              refresh_token: a,
              expires_in: n,
              expires_at: o,
              token_type: l,
            } = e;
            if (!i || !n || !a || !l) throw new eZ("No session defined in URL");
            let u = Math.round(Date.now() / 1e3),
              h = parseInt(n),
              c = u + h;
            o && (c = parseInt(o));
            let d = c - u;
            1e3 * d <= 3e4 &&
              console.warn(
                `@supabase/gotrue-js: Session as retrieved from URL expires in ${d}s, should have been closer to ${h}s`,
              );
            let f = c - h;
            u - f >= 120
              ? console.warn(
                  "@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",
                  f,
                  c,
                  u,
                )
              : u - f < 0 &&
                console.warn(
                  "@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",
                  f,
                  c,
                  u,
                );
            let { data: p, error: g } = await this._getUser(i);
            if (g) throw g;
            let m = {
              provider_token: s,
              provider_refresh_token: r,
              access_token: i,
              expires_in: h,
              expires_at: c,
              refresh_token: a,
              token_type: l,
              user: p.user,
            };
            return (
              (window.location.hash = ""),
              this._debug(
                "#_getSessionFromURL()",
                "clearing window.location.hash",
              ),
              { data: { session: m, redirectType: e.type }, error: null }
            );
          } catch (e) {
            if (eI(e))
              return { data: { session: null, redirectType: null }, error: e };
            throw e;
          }
        }
        _isImplicitGrantCallback(e) {
          return !!(e.access_token || e.error_description);
        }
        async _isPKCECallback(e) {
          let t = await e4(this.storage, `${this.storageKey}-code-verifier`);
          return !!(e.code && t);
        }
        async signOut(e = { scope: "global" }) {
          return (
            await this.initializePromise,
            await this._acquireLock(-1, async () => await this._signOut(e))
          );
        }
        async _signOut({ scope: e } = { scope: "global" }) {
          return await this._useSession(async (t) => {
            var s;
            let { data: r, error: i } = t;
            if (i) return { error: i };
            let a = null == (s = r.session) ? void 0 : s.access_token;
            if (a) {
              let { error: t } = await this.admin.signOut(a, e);
              if (
                t &&
                !(
                  eI(t) &&
                  "AuthApiError" === t.name &&
                  (404 === t.status || 401 === t.status || 403 === t.status)
                )
              )
                return { error: t };
            }
            return (
              "others" !== e &&
                (await this._removeSession(),
                await e5(this.storage, `${this.storageKey}-code-verifier`)),
              { error: null }
            );
          });
        }
        onAuthStateChange(e) {
          let t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (e) {
                let t = (16 * Math.random()) | 0;
                return ("x" == e ? t : (3 & t) | 8).toString(16);
              },
            ),
            s = {
              id: t,
              callback: e,
              unsubscribe: () => {
                this._debug(
                  "#unsubscribe()",
                  "state change callback with id removed",
                  t,
                ),
                  this.stateChangeEmitters.delete(t);
              },
            };
          return (
            this._debug(
              "#onAuthStateChange()",
              "registered callback with id",
              t,
            ),
            this.stateChangeEmitters.set(t, s),
            (async () => {
              await this.initializePromise,
                await this._acquireLock(-1, async () => {
                  this._emitInitialSession(t);
                });
            })(),
            { data: { subscription: s } }
          );
        }
        async _emitInitialSession(e) {
          return await this._useSession(async (t) => {
            var s, r;
            try {
              let {
                data: { session: r },
                error: i,
              } = t;
              if (i) throw i;
              await (null == (s = this.stateChangeEmitters.get(e))
                ? void 0
                : s.callback("INITIAL_SESSION", r)),
                this._debug("INITIAL_SESSION", "callback id", e, "session", r);
            } catch (t) {
              await (null == (r = this.stateChangeEmitters.get(e))
                ? void 0
                : r.callback("INITIAL_SESSION", null)),
                this._debug("INITIAL_SESSION", "callback id", e, "error", t),
                console.error(t);
            }
          });
        }
        async resetPasswordForEmail(e, t = {}) {
          let s = null,
            r = null;
          "pkce" === this.flowType &&
            ([s, r] = await ts(this.storage, this.storageKey, !0));
          try {
            return await tc(this.fetch, "POST", `${this.url}/recover`, {
              body: {
                email: e,
                code_challenge: s,
                code_challenge_method: r,
                gotrue_meta_security: { captcha_token: t.captchaToken },
              },
              headers: this.headers,
              redirectTo: t.redirectTo,
            });
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async getUserIdentities() {
          var e;
          try {
            let { data: t, error: s } = await this.getUser();
            if (s) throw s;
            return {
              data: { identities: null != (e = t.user.identities) ? e : [] },
              error: null,
            };
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async linkIdentity(e) {
          var t;
          try {
            let { data: s, error: r } = await this._useSession(async (t) => {
              var s, r, i, a, n;
              let { data: o, error: l } = t;
              if (l) throw l;
              let u = await this._getUrlForProvider(
                `${this.url}/user/identities/authorize`,
                e.provider,
                {
                  redirectTo: null == (s = e.options) ? void 0 : s.redirectTo,
                  scopes: null == (r = e.options) ? void 0 : r.scopes,
                  queryParams: null == (i = e.options) ? void 0 : i.queryParams,
                  skipBrowserRedirect: !0,
                },
              );
              return await tc(this.fetch, "GET", u, {
                headers: this.headers,
                jwt:
                  null !=
                  (n = null == (a = o.session) ? void 0 : a.access_token)
                    ? n
                    : void 0,
              });
            });
            if (r) throw r;
            return (
              !eX() ||
                (null == (t = e.options) ? void 0 : t.skipBrowserRedirect) ||
                window.location.assign(null == s ? void 0 : s.url),
              {
                data: { provider: e.provider, url: null == s ? void 0 : s.url },
                error: null,
              }
            );
          } catch (t) {
            if (eI(t))
              return { data: { provider: e.provider, url: null }, error: t };
            throw t;
          }
        }
        async unlinkIdentity(e) {
          try {
            return await this._useSession(async (t) => {
              var s, r;
              let { data: i, error: a } = t;
              if (a) throw a;
              return await tc(
                this.fetch,
                "DELETE",
                `${this.url}/user/identities/${e.identity_id}`,
                {
                  headers: this.headers,
                  jwt:
                    null !=
                    (r = null == (s = i.session) ? void 0 : s.access_token)
                      ? r
                      : void 0,
                },
              );
            });
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _refreshAccessToken(e) {
          let t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
          this._debug(t, "begin");
          try {
            var s, r;
            let i = Date.now();
            return await ((s = async (s) => (
              s > 0 && (await e8(200 * Math.pow(2, s - 1))),
              this._debug(t, "refreshing attempt", s),
              await tc(
                this.fetch,
                "POST",
                `${this.url}/token?grant_type=refresh_token`,
                {
                  body: { refresh_token: e },
                  headers: this.headers,
                  xform: tf,
                },
              )
            )),
            (r = (e, t) => {
              let s = 200 * Math.pow(2, e);
              return t && eB(t) && Date.now() + s - i < 3e4;
            }),
            new Promise((e, t) => {
              (async () => {
                for (let i = 0; i < 1 / 0; i++)
                  try {
                    let t = await s(i);
                    if (!r(i, null, t)) return void e(t);
                  } catch (e) {
                    if (!r(i, e)) return void t(e);
                  }
              })();
            }));
          } catch (e) {
            if ((this._debug(t, "error", e), eI(e)))
              return { data: { session: null, user: null }, error: e };
            throw e;
          } finally {
            this._debug(t, "end");
          }
        }
        _isValidSession(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            "access_token" in e &&
            "refresh_token" in e &&
            "expires_at" in e
          );
        }
        async _handleProviderSignIn(e, t) {
          let s = await this._getUrlForProvider(`${this.url}/authorize`, e, {
            redirectTo: t.redirectTo,
            scopes: t.scopes,
            queryParams: t.queryParams,
          });
          return (
            this._debug(
              "#_handleProviderSignIn()",
              "provider",
              e,
              "options",
              t,
              "url",
              s,
            ),
            eX() && !t.skipBrowserRedirect && window.location.assign(s),
            { data: { provider: e, url: s }, error: null }
          );
        }
        async _recoverAndRefresh() {
          var e;
          let t = "#_recoverAndRefresh()";
          this._debug(t, "begin");
          try {
            let s = await e4(this.storage, this.storageKey);
            if (
              (this._debug(t, "session from storage", s),
              !this._isValidSession(s))
            ) {
              this._debug(t, "session is not valid"),
                null !== s && (await this._removeSession());
              return;
            }
            let r =
              (null != (e = s.expires_at) ? e : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (
              (this._debug(
                t,
                `session has${r ? "" : " not"} expired with margin of 90000s`,
              ),
              r)
            ) {
              if (this.autoRefreshToken && s.refresh_token) {
                let { error: e } = await this._callRefreshToken(
                  s.refresh_token,
                );
                e &&
                  (console.error(e),
                  eB(e) ||
                    (this._debug(
                      t,
                      "refresh failed with a non-retryable error, removing the session",
                      e,
                    ),
                    await this._removeSession()));
              }
            } else await this._notifyAllSubscribers("SIGNED_IN", s);
          } catch (e) {
            this._debug(t, "error", e), console.error(e);
            return;
          } finally {
            this._debug(t, "end");
          }
        }
        async _callRefreshToken(e) {
          var t, s;
          if (!e) throw new eU();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          let r = `#_callRefreshToken(${e.substring(0, 5)}...)`;
          this._debug(r, "begin");
          try {
            this.refreshingDeferred = new e3();
            let { data: t, error: s } = await this._refreshAccessToken(e);
            if (s) throw s;
            if (!t.session) throw new eU();
            await this._saveSession(t.session),
              await this._notifyAllSubscribers("TOKEN_REFRESHED", t.session);
            let r = { session: t.session, error: null };
            return this.refreshingDeferred.resolve(r), r;
          } catch (e) {
            if ((this._debug(r, "error", e), eI(e))) {
              let s = { session: null, error: e };
              return (
                eB(e) || (await this._removeSession()),
                null == (t = this.refreshingDeferred) || t.resolve(s),
                s
              );
            }
            throw (null == (s = this.refreshingDeferred) || s.reject(e), e);
          } finally {
            (this.refreshingDeferred = null), this._debug(r, "end");
          }
        }
        async _notifyAllSubscribers(e, t, s = !0) {
          let r = `#_notifyAllSubscribers(${e})`;
          this._debug(r, "begin", t, `broadcast = ${s}`);
          try {
            this.broadcastChannel &&
              s &&
              this.broadcastChannel.postMessage({ event: e, session: t });
            let r = [],
              i = Array.from(this.stateChangeEmitters.values()).map(
                async (s) => {
                  try {
                    await s.callback(e, t);
                  } catch (e) {
                    r.push(e);
                  }
                },
              );
            if ((await Promise.all(i), r.length > 0)) {
              for (let e = 0; e < r.length; e += 1) console.error(r[e]);
              throw r[0];
            }
          } finally {
            this._debug(r, "end");
          }
        }
        async _saveSession(e) {
          this._debug("#_saveSession()", e),
            (this.suppressGetSessionWarning = !0),
            await e9(this.storage, this.storageKey, e);
        }
        async _removeSession() {
          this._debug("#_removeSession()"),
            await e5(this.storage, this.storageKey),
            await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()");
          let e = this.visibilityChangedCallback;
          this.visibilityChangedCallback = null;
          try {
            e &&
              eX() &&
              (null == window ? void 0 : window.removeEventListener) &&
              window.removeEventListener("visibilitychange", e);
          } catch (e) {
            console.error("removing visibilitychange callback failed", e);
          }
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          (this.autoRefreshTicker = e),
            e && "object" == typeof e && "function" == typeof e.unref
              ? e.unref()
              : "undefined" != typeof Deno &&
                "function" == typeof Deno.unrefTimer &&
                Deno.unrefTimer(e),
            setTimeout(async () => {
              await this.initializePromise, await this._autoRefreshTokenTick();
            }, 0);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e = this.autoRefreshTicker;
          (this.autoRefreshTicker = null), e && clearInterval(e);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(),
            await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(),
            await this._stopAutoRefresh();
        }
        async _autoRefreshTokenTick() {
          this._debug("#_autoRefreshTokenTick()", "begin");
          try {
            await this._acquireLock(0, async () => {
              try {
                let e = Date.now();
                try {
                  return await this._useSession(async (t) => {
                    let {
                      data: { session: s },
                    } = t;
                    if (!s || !s.refresh_token || !s.expires_at)
                      return void this._debug(
                        "#_autoRefreshTokenTick()",
                        "no session",
                      );
                    let r = Math.floor((1e3 * s.expires_at - e) / 3e4);
                    this._debug(
                      "#_autoRefreshTokenTick()",
                      `access token expires in ${r} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`,
                    ),
                      r <= 3 && (await this._callRefreshToken(s.refresh_token));
                  });
                } catch (e) {
                  console.error(
                    "Auto refresh tick failed with error. This is likely a transient error.",
                    e,
                  );
                }
              } finally {
                this._debug("#_autoRefreshTokenTick()", "end");
              }
            });
          } catch (e) {
            if (e.isAcquireTimeout || e instanceof tx)
              this._debug("auto refresh token tick lock not available");
            else throw e;
          }
        }
        async _handleVisibilityChange() {
          if (
            (this._debug("#_handleVisibilityChange()"),
            !eX() || !(null == window ? void 0 : window.addEventListener))
          )
            return this.autoRefreshToken && this.startAutoRefresh(), !1;
          try {
            (this.visibilityChangedCallback = async () =>
              await this._onVisibilityChanged(!1)),
              null == window ||
                window.addEventListener(
                  "visibilitychange",
                  this.visibilityChangedCallback,
                ),
              await this._onVisibilityChanged(!0);
          } catch (e) {
            console.error("_handleVisibilityChange", e);
          }
        }
        async _onVisibilityChanged(e) {
          let t = `#_onVisibilityChanged(${e})`;
          this._debug(t, "visibilityState", document.visibilityState),
            "visible" === document.visibilityState
              ? (this.autoRefreshToken && this._startAutoRefresh(),
                e ||
                  (await this.initializePromise,
                  await this._acquireLock(-1, async () => {
                    if ("visible" !== document.visibilityState)
                      return void this._debug(
                        t,
                        "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
                      );
                    await this._recoverAndRefresh();
                  })))
              : "hidden" === document.visibilityState &&
                this.autoRefreshToken &&
                this._stopAutoRefresh();
        }
        async _getUrlForProvider(e, t, s) {
          let r = [`provider=${encodeURIComponent(t)}`];
          if (
            ((null == s ? void 0 : s.redirectTo) &&
              r.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),
            (null == s ? void 0 : s.scopes) &&
              r.push(`scopes=${encodeURIComponent(s.scopes)}`),
            "pkce" === this.flowType)
          ) {
            let [e, t] = await ts(this.storage, this.storageKey),
              s = new URLSearchParams({
                code_challenge: `${encodeURIComponent(e)}`,
                code_challenge_method: `${encodeURIComponent(t)}`,
              });
            r.push(s.toString());
          }
          if (null == s ? void 0 : s.queryParams) {
            let e = new URLSearchParams(s.queryParams);
            r.push(e.toString());
          }
          return (
            (null == s ? void 0 : s.skipBrowserRedirect) &&
              r.push(`skip_http_redirect=${s.skipBrowserRedirect}`),
            `${e}?${r.join("&")}`
          );
        }
        async _unenroll(e) {
          try {
            return await this._useSession(async (t) => {
              var s;
              let { data: r, error: i } = t;
              return i
                ? { data: null, error: i }
                : await tc(
                    this.fetch,
                    "DELETE",
                    `${this.url}/factors/${e.factorId}`,
                    {
                      headers: this.headers,
                      jwt:
                        null == (s = null == r ? void 0 : r.session)
                          ? void 0
                          : s.access_token,
                    },
                  );
            });
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _enroll(e) {
          try {
            return await this._useSession(async (t) => {
              var s, r;
              let { data: i, error: a } = t;
              if (a) return { data: null, error: a };
              let n = Object.assign(
                  { friendly_name: e.friendlyName, factor_type: e.factorType },
                  "phone" === e.factorType
                    ? { phone: e.phone }
                    : { issuer: e.issuer },
                ),
                { data: o, error: l } = await tc(
                  this.fetch,
                  "POST",
                  `${this.url}/factors`,
                  {
                    body: n,
                    headers: this.headers,
                    jwt:
                      null == (s = null == i ? void 0 : i.session)
                        ? void 0
                        : s.access_token,
                  },
                );
              return l
                ? { data: null, error: l }
                : ("totp" === e.factorType &&
                    (null == (r = null == o ? void 0 : o.totp)
                      ? void 0
                      : r.qr_code) &&
                    (o.totp.qr_code = `data:image/svg+xml;utf-8,${o.totp.qr_code}`),
                  { data: o, error: null });
            });
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
        async _verify(e) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t) => {
                var s;
                let { data: r, error: i } = t;
                if (i) return { data: null, error: i };
                let { data: a, error: n } = await tc(
                  this.fetch,
                  "POST",
                  `${this.url}/factors/${e.factorId}/verify`,
                  {
                    body: { code: e.code, challenge_id: e.challengeId },
                    headers: this.headers,
                    jwt:
                      null == (s = null == r ? void 0 : r.session)
                        ? void 0
                        : s.access_token,
                  },
                );
                return n
                  ? { data: null, error: n }
                  : (await this._saveSession(
                      Object.assign(
                        {
                          expires_at:
                            Math.round(Date.now() / 1e3) + a.expires_in,
                        },
                        a,
                      ),
                    ),
                    await this._notifyAllSubscribers(
                      "MFA_CHALLENGE_VERIFIED",
                      a,
                    ),
                    { data: a, error: n });
              });
            } catch (e) {
              if (eI(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        async _challenge(e) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t) => {
                var s;
                let { data: r, error: i } = t;
                return i
                  ? { data: null, error: i }
                  : await tc(
                      this.fetch,
                      "POST",
                      `${this.url}/factors/${e.factorId}/challenge`,
                      {
                        body: { channel: e.channel },
                        headers: this.headers,
                        jwt:
                          null == (s = null == r ? void 0 : r.session)
                            ? void 0
                            : s.access_token,
                      },
                    );
              });
            } catch (e) {
              if (eI(e)) return { data: null, error: e };
              throw e;
            }
          });
        }
        async _challengeAndVerify(e) {
          let { data: t, error: s } = await this._challenge({
            factorId: e.factorId,
          });
          return s
            ? { data: null, error: s }
            : await this._verify({
                factorId: e.factorId,
                challengeId: t.id,
                code: e.code,
              });
        }
        async _listFactors() {
          let {
            data: { user: e },
            error: t,
          } = await this.getUser();
          if (t) return { data: null, error: t };
          let s = (null == e ? void 0 : e.factors) || [],
            r = s.filter(
              (e) => "totp" === e.factor_type && "verified" === e.status,
            ),
            i = s.filter(
              (e) => "phone" === e.factor_type && "verified" === e.status,
            );
          return { data: { all: s, totp: r, phone: i }, error: null };
        }
        async _getAuthenticatorAssuranceLevel() {
          return this._acquireLock(
            -1,
            async () =>
              await this._useSession(async (e) => {
                var t, s;
                let {
                  data: { session: r },
                  error: i,
                } = e;
                if (i) return { data: null, error: i };
                if (!r)
                  return {
                    data: {
                      currentLevel: null,
                      nextLevel: null,
                      currentAuthenticationMethods: [],
                    },
                    error: null,
                  };
                let { payload: a } = e6(r.access_token),
                  n = null;
                a.aal && (n = a.aal);
                let o = n;
                return (
                  (null !=
                  (s =
                    null == (t = r.user.factors)
                      ? void 0
                      : t.filter((e) => "verified" === e.status))
                    ? s
                    : []
                  ).length > 0 && (o = "aal2"),
                  {
                    data: {
                      currentLevel: n,
                      nextLevel: o,
                      currentAuthenticationMethods: a.amr || [],
                    },
                    error: null,
                  }
                );
              }),
          );
        }
        async fetchJwk(e, t = { keys: [] }) {
          let s = t.keys.find((t) => t.kid === e);
          if (
            s ||
            ((s = this.jwks.keys.find((t) => t.kid === e)) &&
              this.jwks_cached_at + 6e5 > Date.now())
          )
            return s;
          let { data: r, error: i } = await tc(
            this.fetch,
            "GET",
            `${this.url}/.well-known/jwks.json`,
            { headers: this.headers },
          );
          if (i) throw i;
          if (!r.keys || 0 === r.keys.length) throw new eK("JWKS is empty");
          if (
            ((this.jwks = r),
            (this.jwks_cached_at = Date.now()),
            !(s = r.keys.find((t) => t.kid === e)))
          )
            throw new eK("No matching signing key found in JWKS");
          return s;
        }
        async getClaims(e, t = { keys: [] }) {
          try {
            let r = e;
            if (!r) {
              let { data: e, error: t } = await this.getSession();
              if (t || !e.session) return { data: null, error: t };
              r = e.session.access_token;
            }
            let {
              header: i,
              payload: a,
              signature: n,
              raw: { header: o, payload: l },
            } = e6(r);
            var s = a.exp;
            if (!s) throw Error("Missing exp claim");
            if (s <= Math.floor(Date.now() / 1e3))
              throw Error("JWT has expired");
            if (
              !i.kid ||
              "HS256" === i.alg ||
              !("crypto" in globalThis && "subtle" in globalThis.crypto)
            ) {
              let { error: e } = await this.getUser(r);
              if (e) throw e;
              return {
                data: { claims: a, header: i, signature: n },
                error: null,
              };
            }
            let u = (function (e) {
                switch (e) {
                  case "RS256":
                    return {
                      name: "RSASSA-PKCS1-v1_5",
                      hash: { name: "SHA-256" },
                    };
                  case "ES256":
                    return {
                      name: "ECDSA",
                      namedCurve: "P-256",
                      hash: { name: "SHA-256" },
                    };
                  default:
                    throw Error("Invalid alg claim");
                }
              })(i.alg),
              h = await this.fetchJwk(i.kid, t),
              c = await crypto.subtle.importKey("jwk", h, u, !0, ["verify"]);
            if (
              !(await crypto.subtle.verify(
                u,
                c,
                n,
                (function (e) {
                  let t = [];
                  return (
                    (function (e, t) {
                      for (let s = 0; s < e.length; s += 1) {
                        let r = e.charCodeAt(s);
                        if (r > 55295 && r <= 56319) {
                          let t = ((r - 55296) * 1024) & 65535;
                          (r =
                            (((e.charCodeAt(s + 1) - 56320) & 65535) | t) +
                            65536),
                            (s += 1);
                        }
                        !(function (e, t) {
                          if (e <= 127) return t(e);
                          if (e <= 2047) {
                            t(192 | (e >> 6)), t(128 | (63 & e));
                            return;
                          }
                          if (e <= 65535) {
                            t(224 | (e >> 12)),
                              t(128 | ((e >> 6) & 63)),
                              t(128 | (63 & e));
                            return;
                          }
                          if (e <= 1114111) {
                            t(240 | (e >> 18)),
                              t(128 | ((e >> 12) & 63)),
                              t(128 | ((e >> 6) & 63)),
                              t(128 | (63 & e));
                            return;
                          }
                          throw Error(
                            `Unrecognized Unicode codepoint: ${e.toString(16)}`,
                          );
                        })(r, t);
                      }
                    })(e, (e) => t.push(e)),
                    new Uint8Array(t)
                  );
                })(`${o}.${l}`),
              ))
            )
              throw new eK("Invalid JWT signature");
            return {
              data: { claims: a, header: i, signature: n },
              error: null,
            };
          } catch (e) {
            if (eI(e)) return { data: null, error: e };
            throw e;
          }
        }
      }
      tC.nextInstanceID = 0;
      let tP = tC;
      class t$ extends tP {
        constructor(e) {
          super(e);
        }
      }
      class tI {
        constructor(e, t, s) {
          var r, i, a;
          if (((this.supabaseUrl = e), (this.supabaseKey = t), !e))
            throw Error("supabaseUrl is required.");
          if (!t) throw Error("supabaseKey is required.");
          let n = new URL(
            (function (e) {
              return e.endsWith("/") ? e : e + "/";
            })(e),
          );
          (this.realtimeUrl = new URL("realtime/v1", n)),
            (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace(
              "http",
              "ws",
            )),
            (this.authUrl = new URL("auth/v1", n)),
            (this.storageUrl = new URL("storage/v1", n)),
            (this.functionsUrl = new URL("functions/v1", n));
          let o = `sb-${n.hostname.split(".")[0]}-auth-token`,
            l = (function (e, t) {
              var s, r;
              let { db: i, auth: a, realtime: n, global: o } = e,
                { db: l, auth: u, realtime: h, global: c } = t,
                d = {
                  db: Object.assign(Object.assign({}, l), i),
                  auth: Object.assign(Object.assign({}, u), a),
                  realtime: Object.assign(Object.assign({}, h), n),
                  global: Object.assign(
                    Object.assign(Object.assign({}, c), o),
                    {
                      headers: Object.assign(
                        Object.assign(
                          {},
                          null != (s = null == c ? void 0 : c.headers) ? s : {},
                        ),
                        null != (r = null == o ? void 0 : o.headers) ? r : {},
                      ),
                    },
                  ),
                  accessToken: () => {
                    var e, t, s, r;
                    return (
                      (e = this),
                      (t = void 0),
                      (r = function* () {
                        return "";
                      }),
                      new ((s = void 0), (s = Promise))(function (i, a) {
                        function n(e) {
                          try {
                            l(r.next(e));
                          } catch (e) {
                            a(e);
                          }
                        }
                        function o(e) {
                          try {
                            l(r.throw(e));
                          } catch (e) {
                            a(e);
                          }
                        }
                        function l(e) {
                          var t;
                          e.done
                            ? i(e.value)
                            : ((t = e.value) instanceof s
                                ? t
                                : new s(function (e) {
                                    e(t);
                                  })
                              ).then(n, o);
                        }
                        l((r = r.apply(e, t || [])).next());
                      })
                    );
                  },
                };
              return (
                e.accessToken
                  ? (d.accessToken = e.accessToken)
                  : delete d.accessToken,
                d
              );
            })(null != s ? s : {}, {
              db: ew,
              realtime: ek,
              auth: Object.assign(Object.assign({}, eb), { storageKey: o }),
              global: ev,
            });
          (this.storageKey = null != (r = l.auth.storageKey) ? r : ""),
            (this.headers = null != (i = l.global.headers) ? i : {}),
            l.accessToken
              ? ((this.accessToken = l.accessToken),
                (this.auth = new Proxy(
                  {},
                  {
                    get: (e, t) => {
                      throw Error(
                        `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`,
                      );
                    },
                  },
                )))
              : (this.auth = this._initSupabaseAuthClient(
                  null != (a = l.auth) ? a : {},
                  this.headers,
                  l.global.fetch,
                )),
            (this.fetch = ej(
              t,
              this._getAccessToken.bind(this),
              l.global.fetch,
            )),
            (this.realtime = this._initRealtimeClient(
              Object.assign(
                {
                  headers: this.headers,
                  accessToken: this._getAccessToken.bind(this),
                },
                l.realtime,
              ),
            )),
            (this.rest = new h(new URL("rest/v1", n).href, {
              headers: this.headers,
              schema: l.db.schema,
              fetch: this.fetch,
            })),
            l.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new u(this.functionsUrl.href, {
            headers: this.headers,
            customFetch: this.fetch,
          });
        }
        get storage() {
          return new ey(this.storageUrl.href, this.headers, this.fetch);
        }
        from(e) {
          return this.rest.from(e);
        }
        schema(e) {
          return this.rest.schema(e);
        }
        rpc(e, t = {}, s = {}) {
          return this.rest.rpc(e, t, s);
        }
        channel(e, t = { config: {} }) {
          return this.realtime.channel(e, t);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e) {
          return this.realtime.removeChannel(e);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        _getAccessToken() {
          var e, t, s, r, i, a;
          return (
            (s = this),
            (r = void 0),
            (i = void 0),
            (a = function* () {
              if (this.accessToken) return yield this.accessToken();
              let { data: s } = yield this.auth.getSession();
              return null !=
                (t = null == (e = s.session) ? void 0 : e.access_token)
                ? t
                : null;
            }),
            new (i || (i = Promise))(function (e, t) {
              function n(e) {
                try {
                  l(a.next(e));
                } catch (e) {
                  t(e);
                }
              }
              function o(e) {
                try {
                  l(a.throw(e));
                } catch (e) {
                  t(e);
                }
              }
              function l(t) {
                var s;
                t.done
                  ? e(t.value)
                  : ((s = t.value) instanceof i
                      ? s
                      : new i(function (e) {
                          e(s);
                        })
                    ).then(n, o);
              }
              l((a = a.apply(s, r || [])).next());
            })
          );
        }
        _initSupabaseAuthClient(
          {
            autoRefreshToken: e,
            persistSession: t,
            detectSessionInUrl: s,
            storage: r,
            storageKey: i,
            flowType: a,
            lock: n,
            debug: o,
          },
          l,
          u,
        ) {
          let h = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`,
          };
          return new t$({
            url: this.authUrl.href,
            headers: Object.assign(Object.assign({}, h), l),
            storageKey: i,
            autoRefreshToken: e,
            persistSession: t,
            detectSessionInUrl: s,
            storage: r,
            flowType: a,
            lock: n,
            debug: o,
            fetch: u,
            hasCustomAuthorizationHeader: "Authorization" in this.headers,
          });
        }
        _initRealtimeClient(e) {
          return new N(
            this.realtimeUrl.href,
            Object.assign(Object.assign({}, e), {
              params: Object.assign(
                { apikey: this.supabaseKey },
                null == e ? void 0 : e.params,
              ),
            }),
          );
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e, t) => {
            this._handleTokenChanged(
              e,
              "CLIENT",
              null == t ? void 0 : t.access_token,
            );
          });
        }
        _handleTokenChanged(e, t, s) {
          ("TOKEN_REFRESHED" === e || "SIGNED_IN" === e) &&
          this.changedAccessToken !== s
            ? (this.changedAccessToken = s)
            : "SIGNED_OUT" === e &&
              (this.realtime.setAuth(),
              "STORAGE" == t && this.auth.signOut(),
              (this.changedAccessToken = void 0));
        }
      }
      let tR = (e, t, s) => new tI(e, t, s);
    },
  },
]);
//# sourceMappingURL=121.js.map
