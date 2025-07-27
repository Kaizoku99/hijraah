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
    (e._sentryDebugIds[t] = "227bd319-8245-4e72-9d0f-a67308dbef92"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-227bd319-8245-4e72-9d0f-a67308dbef92"));
} catch (e) {}
("use strict");
(exports.id = 978),
  (exports.ids = [978]),
  (exports.modules = {
    666: (e, t, i) => {
      i.d(t, { i: () => n });
      function n(e, ...t) {
        return e(...t);
      }
    },
    4595: (e, t, i) => {
      i.d(t, {
        Ct: () => v,
        DJ: () => d,
        Iw: () => b,
        Or: () => S,
        Ss: () => $,
        Xs: () => f,
        eG: () => g,
        ll: () => w,
        qt: () => h,
      });
      var n = i(22321),
        s = i(37671),
        r = i(16988),
        l = i(21651),
        a = i(10765),
        o = i(58560),
        u = i(74696);
      class c {
        static [n.i] = null;
      }
      function h(e) {
        return null != e && "function" == typeof e.getSQL;
      }
      class d {
        static [n.i] = "StringChunk";
        value;
        constructor(e) {
          this.value = Array.isArray(e) ? e : [e];
        }
        getSQL() {
          return new f([this]);
        }
      }
      class f {
        constructor(e) {
          this.queryChunks = e;
        }
        static [n.i] = "SQL";
        decoder = p;
        shouldInlineParams = !1;
        append(e) {
          return this.queryChunks.push(...e.queryChunks), this;
        }
        toQuery(e) {
          return l.k.startActiveSpan("drizzle.buildSQL", (t) => {
            let i = this.buildQueryFromSourceParams(this.queryChunks, e);
            return (
              t?.setAttributes({
                "drizzle.query.text": i.sql,
                "drizzle.query.params": JSON.stringify(i.params),
              }),
              i
            );
          });
        }
        buildQueryFromSourceParams(e, t) {
          let i = Object.assign({}, t, {
              inlineParams: t.inlineParams || this.shouldInlineParams,
              paramStartIndex: t.paramStartIndex || { value: 0 },
            }),
            {
              casing: l,
              escapeName: c,
              escapeParam: g,
              prepareTyping: p,
              inlineParams: y,
              paramStartIndex: w,
            } = i;
          var v = e.map((e) => {
            if ((0, n.is)(e, d)) return { sql: e.value.join(""), params: [] };
            if ((0, n.is)(e, m)) return { sql: c(e.value), params: [] };
            if (void 0 === e) return { sql: "", params: [] };
            if (Array.isArray(e)) {
              let t = [new d("(")];
              for (let [i, n] of e.entries())
                t.push(n), i < e.length - 1 && t.push(new d(", "));
              return t.push(new d(")")), this.buildQueryFromSourceParams(t, i);
            }
            if ((0, n.is)(e, f))
              return this.buildQueryFromSourceParams(e.queryChunks, {
                ...i,
                inlineParams: y || e.shouldInlineParams,
              });
            if ((0, n.is)(e, u.XI)) {
              let t = e[u.XI.Symbol.Schema],
                i = e[u.XI.Symbol.Name];
              return {
                sql: void 0 === t ? c(i) : c(t) + "." + c(i),
                params: [],
              };
            }
            if ((0, n.is)(e, o.V)) {
              let i = l.getColumnCasing(e);
              if ("indexes" === t.invokeSource)
                return { sql: c(i), params: [] };
              let n = e.table[u.XI.Symbol.Schema];
              return {
                sql:
                  e.table[u.HE] || void 0 === n
                    ? c(e.table[u.XI.Symbol.Name]) + "." + c(i)
                    : c(n) + "." + c(e.table[u.XI.Symbol.Name]) + "." + c(i),
                params: [],
              };
            }
            if ((0, n.is)(e, $)) {
              let t = e[a.n].schema,
                i = e[a.n].name;
              return {
                sql: void 0 === t ? c(i) : c(t) + "." + c(i),
                params: [],
              };
            }
            if ((0, n.is)(e, b)) {
              if ((0, n.is)(e.value, S))
                return { sql: g(w.value++, e), params: [e], typings: ["none"] };
              let t =
                null === e.value ? null : e.encoder.mapToDriverValue(e.value);
              if ((0, n.is)(t, f))
                return this.buildQueryFromSourceParams([t], i);
              if (y) return { sql: this.mapInlineParam(t, i), params: [] };
              let s = ["none"];
              return (
                p && (s = [p(e.encoder)]),
                { sql: g(w.value++, t), params: [t], typings: s }
              );
            }
            return (0, n.is)(e, S)
              ? { sql: g(w.value++, e), params: [e], typings: ["none"] }
              : (0, n.is)(e, f.Aliased) && void 0 !== e.fieldAlias
                ? { sql: c(e.fieldAlias), params: [] }
                : (0, n.is)(e, r.n)
                  ? e._.isWith
                    ? { sql: c(e._.alias), params: [] }
                    : this.buildQueryFromSourceParams(
                        [new d("("), e._.sql, new d(") "), new m(e._.alias)],
                        i,
                      )
                  : (0, s.BU)(e)
                    ? e.schema
                      ? { sql: c(e.schema) + "." + c(e.enumName), params: [] }
                      : { sql: c(e.enumName), params: [] }
                    : h(e)
                      ? e.shouldOmitSQLParens?.()
                        ? this.buildQueryFromSourceParams([e.getSQL()], i)
                        : this.buildQueryFromSourceParams(
                            [new d("("), e.getSQL(), new d(")")],
                            i,
                          )
                      : y
                        ? { sql: this.mapInlineParam(e, i), params: [] }
                        : {
                            sql: g(w.value++, e),
                            params: [e],
                            typings: ["none"],
                          };
          });
          let P = { sql: "", params: [] };
          for (let e of v)
            (P.sql += e.sql),
              P.params.push(...e.params),
              e.typings?.length &&
                (P.typings || (P.typings = []), P.typings.push(...e.typings));
          return P;
        }
        mapInlineParam(e, { escapeString: t }) {
          if (null === e) return "null";
          if ("number" == typeof e || "boolean" == typeof e)
            return e.toString();
          if ("string" == typeof e) return t(e);
          if ("object" == typeof e) {
            let i = e.toString();
            return "[object Object]" === i ? t(JSON.stringify(e)) : t(i);
          }
          throw Error("Unexpected param value: " + e);
        }
        getSQL() {
          return this;
        }
        as(e) {
          return void 0 === e ? this : new f.Aliased(this, e);
        }
        mapWith(e) {
          return (
            (this.decoder =
              "function" == typeof e ? { mapFromDriverValue: e } : e),
            this
          );
        }
        inlineParams() {
          return (this.shouldInlineParams = !0), this;
        }
        if(e) {
          return e ? this : void 0;
        }
      }
      class m {
        constructor(e) {
          this.value = e;
        }
        static [n.i] = "Name";
        brand;
        getSQL() {
          return new f([this]);
        }
      }
      function g(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          "mapToDriverValue" in e &&
          "function" == typeof e.mapToDriverValue
        );
      }
      let p = { mapFromDriverValue: (e) => e },
        y = { mapToDriverValue: (e) => e };
      ({ ...p, ...y });
      class b {
        constructor(e, t = y) {
          (this.value = e), (this.encoder = t);
        }
        static [n.i] = "Param";
        brand;
        getSQL() {
          return new f([this]);
        }
      }
      function w(e, ...t) {
        let i = [];
        for (let [n, s] of ((t.length > 0 || (e.length > 0 && "" !== e[0])) &&
          i.push(new d(e[0])),
        t.entries()))
          i.push(s, new d(e[n + 1]));
        return new f(i);
      }
      ((e) => {
        (e.empty = function () {
          return new f([]);
        }),
          (e.fromList = function (e) {
            return new f(e);
          }),
          (e.raw = function (e) {
            return new f([new d(e)]);
          }),
          (e.join = function (e, t) {
            let i = [];
            for (let [n, s] of e.entries())
              n > 0 && void 0 !== t && i.push(t), i.push(s);
            return new f(i);
          }),
          (e.identifier = function (e) {
            return new m(e);
          }),
          (e.placeholder = function (e) {
            return new S(e);
          }),
          (e.param = function (e, t) {
            return new b(e, t);
          });
      })(w || (w = {})),
        ((e) => {
          class t {
            constructor(e, t) {
              (this.sql = e), (this.fieldAlias = t);
            }
            static [n.i] = "SQL.Aliased";
            isSelectionField = !1;
            getSQL() {
              return this.sql;
            }
            clone() {
              return new t(this.sql, this.fieldAlias);
            }
          }
          e.Aliased = t;
        })(f || (f = {}));
      class S {
        constructor(e) {
          this.name = e;
        }
        static [n.i] = "Placeholder";
        getSQL() {
          return new f([this]);
        }
      }
      function v(e, t) {
        return e.map((e) => {
          if ((0, n.is)(e, S)) {
            if (!(e.name in t))
              throw Error(`No value for placeholder "${e.name}" was provided`);
            return t[e.name];
          }
          if ((0, n.is)(e, b) && (0, n.is)(e.value, S)) {
            if (!(e.value.name in t))
              throw Error(
                `No value for placeholder "${e.value.name}" was provided`,
              );
            return e.encoder.mapToDriverValue(t[e.value.name]);
          }
          return e;
        });
      }
      class $ {
        static [n.i] = "View";
        [a.n];
        constructor({ name: e, schema: t, selectedFields: i, query: n }) {
          this[a.n] = {
            name: e,
            originalName: e,
            schema: t,
            selectedFields: i,
            query: n,
            isExisting: !n,
            isAlias: !1,
          };
        }
        getSQL() {
          return new f([this]);
        }
      }
      (o.V.prototype.getSQL = function () {
        return new f([this]);
      }),
        (u.XI.prototype.getSQL = function () {
          return new f([this]);
        }),
        (r.n.prototype.getSQL = function () {
          return new f([this]);
        });
    },
    5706: (e, t, i) => {
      i.d(t, { dw: () => c, p6: () => h, qw: () => o });
      var n = i(22321),
        s = i(73653),
        r = i(62508),
        l = i(70923);
      class a extends l.u {
        static [n.i] = "PgDateBuilder";
        constructor(e) {
          super(e, "date", "PgDate");
        }
        build(e) {
          return new o(e, this.config);
        }
      }
      class o extends r.Kl {
        static [n.i] = "PgDate";
        getSQLType() {
          return "date";
        }
        mapFromDriverValue(e) {
          return new Date(e);
        }
        mapToDriverValue(e) {
          return e.toISOString();
        }
      }
      class u extends l.u {
        static [n.i] = "PgDateStringBuilder";
        constructor(e) {
          super(e, "string", "PgDateString");
        }
        build(e) {
          return new c(e, this.config);
        }
      }
      class c extends r.Kl {
        static [n.i] = "PgDateString";
        getSQLType() {
          return "date";
        }
      }
      function h(e, t) {
        let { name: i, config: n } = (0, s.Ll)(e, t);
        return n?.mode === "date" ? new a(i) : new u(i);
      }
    },
    7061: (e, t, i) => {
      i.d(t, { w: () => r });
      var n = i(22321),
        s = i(4595);
      class r extends s.Ss {
        static [n.i] = "PgViewBase";
      }
    },
    8488: (e, t, i) => {
      i.d(t, { zM: () => a });
      var n = i(22321),
        s = i(62508);
      class r extends s.pe {
        static [n.i] = "PgBooleanBuilder";
        constructor(e) {
          super(e, "boolean", "PgBoolean");
        }
        build(e) {
          return new l(e, this.config);
        }
      }
      class l extends s.Kl {
        static [n.i] = "PgBoolean";
        getSQLType() {
          return "boolean";
        }
      }
      function a(e) {
        return new r(e ?? "");
      }
    },
    10765: (e, t, i) => {
      i.d(t, { n: () => n });
      let n = Symbol.for("drizzle:ViewBaseConfig");
    },
    16988: (e, t, i) => {
      i.d(t, { J: () => r, n: () => s });
      var n = i(22321);
      class s {
        static [n.i] = "Subquery";
        constructor(e, t, i, n = !1) {
          this._ = {
            brand: "Subquery",
            sql: e,
            selectedFields: t,
            alias: i,
            isWith: n,
          };
        }
      }
      class r extends s {
        static [n.i] = "WithSubquery";
      }
    },
    19313: (e, t, i) => {
      i.d(t, {
        iv: () => m,
        pD: () => f,
        DZ: () => S,
        _k: () => y,
        mm: () => g,
        rl: () => p,
        I$: () =>
          function e(t, i, n, l, a = (e) => e) {
            let u = {};
            for (let [c, h] of l.entries())
              if (h.isJson) {
                let s = i.relations[h.tsKey],
                  l = n[c],
                  o = "string" == typeof l ? JSON.parse(l) : l;
                u[h.tsKey] = (0, r.is)(s, f)
                  ? o && e(t, t[h.relationTableTsKey], o, h.selection, a)
                  : o.map((i) =>
                      e(t, t[h.relationTableTsKey], i, h.selection, a),
                    );
              } else {
                let e,
                  t = a(n[c]),
                  i = h.field;
                (e = (0, r.is)(i, s.V)
                  ? i
                  : (0, r.is)(i, o.Xs)
                    ? i.decoder
                    : i.sql.decoder),
                  (u[h.tsKey] = null === t ? null : e.mapFromDriverValue(t));
              }
            return u;
          },
        W0: () => w,
        K1: () => b,
      });
      var n = i(74696),
        s = i(58560),
        r = i(22321),
        l = i(64819),
        a = i(96189),
        o = i(4595);
      function u(e) {
        return (0, o.ll)`${e} asc`;
      }
      function c(e) {
        return (0, o.ll)`${e} desc`;
      }
      class h {
        constructor(e, t, i) {
          (this.sourceTable = e),
            (this.referencedTable = t),
            (this.relationName = i),
            (this.referencedTableName = t[n.XI.Symbol.Name]);
        }
        static [r.i] = "Relation";
        referencedTableName;
        fieldName;
      }
      class d {
        constructor(e, t) {
          (this.table = e), (this.config = t);
        }
        static [r.i] = "Relations";
      }
      class f extends h {
        constructor(e, t, i, n) {
          super(e, t, i?.relationName),
            (this.config = i),
            (this.isNullable = n);
        }
        static [r.i] = "One";
        withFieldName(e) {
          let t = new f(
            this.sourceTable,
            this.referencedTable,
            this.config,
            this.isNullable,
          );
          return (t.fieldName = e), t;
        }
      }
      class m extends h {
        constructor(e, t, i) {
          super(e, t, i?.relationName), (this.config = i);
        }
        static [r.i] = "Many";
        withFieldName(e) {
          let t = new m(this.sourceTable, this.referencedTable, this.config);
          return (t.fieldName = e), t;
        }
      }
      function g() {
        return {
          and: a.Uo,
          between: a.Tq,
          eq: a.eq,
          exists: a.t2,
          gt: a.gt,
          gte: a.RO,
          ilike: a.B3,
          inArray: a.RV,
          isNull: a.kZ,
          isNotNull: a.Pe,
          like: a.mj,
          lt: a.lt,
          lte: a.wJ,
          ne: a.ne,
          not: a.AU,
          notBetween: a.o8,
          notExists: a.KJ,
          notLike: a.RK,
          notIlike: a.q1,
          notInArray: a.KL,
          or: a.or,
          sql: o.ll,
        };
      }
      function p() {
        return { sql: o.ll, asc: u, desc: c };
      }
      function y(e, t) {
        1 === Object.keys(e).length &&
          "default" in e &&
          !(0, r.is)(e.default, n.XI) &&
          (e = e.default);
        let i = {},
          s = {},
          a = {};
        for (let [o, u] of Object.entries(e))
          if ((0, r.is)(u, n.XI)) {
            let e = (0, n.Lf)(u),
              t = s[e];
            for (let s of ((i[e] = o),
            (a[o] = {
              tsName: o,
              dbName: u[n.XI.Symbol.Name],
              schema: u[n.XI.Symbol.Schema],
              columns: u[n.XI.Symbol.Columns],
              relations: t?.relations ?? {},
              primaryKey: t?.primaryKey ?? [],
            }),
            Object.values(u[n.XI.Symbol.Columns])))
              s.primary && a[o].primaryKey.push(s);
            let c = u[n.XI.Symbol.ExtraConfigBuilder]?.(
              u[n.XI.Symbol.ExtraConfigColumns],
            );
            if (c)
              for (let e of Object.values(c))
                (0, r.is)(e, l.hv) && a[o].primaryKey.push(...e.columns);
          } else if ((0, r.is)(u, d)) {
            let e,
              r = (0, n.Lf)(u.table),
              l = i[r];
            for (let [i, n] of Object.entries(u.config(t(u.table))))
              if (l) {
                let t = a[l];
                (t.relations[i] = n), e && t.primaryKey.push(...e);
              } else
                r in s || (s[r] = { relations: {}, primaryKey: e }),
                  (s[r].relations[i] = n);
          }
        return { tables: a, tableNamesMap: i };
      }
      function b(e, t) {
        return new d(e, (e) =>
          Object.fromEntries(
            Object.entries(t(e)).map(([e, t]) => [e, t.withFieldName(e)]),
          ),
        );
      }
      function w(e, t, i) {
        if ((0, r.is)(i, f) && i.config)
          return { fields: i.config.fields, references: i.config.references };
        let s = t[(0, n.Lf)(i.referencedTable)];
        if (!s)
          throw Error(
            `Table "${i.referencedTable[n.XI.Symbol.Name]}" not found in schema`,
          );
        let l = e[s];
        if (!l) throw Error(`Table "${s}" not found in schema`);
        let a = i.sourceTable,
          o = t[(0, n.Lf)(a)];
        if (!o)
          throw Error(`Table "${a[n.XI.Symbol.Name]}" not found in schema`);
        let u = [];
        for (let e of Object.values(l.relations))
          ((i.relationName && i !== e && e.relationName === i.relationName) ||
            (!i.relationName && e.referencedTable === i.sourceTable)) &&
            u.push(e);
        if (u.length > 1)
          throw i.relationName
            ? Error(
                `There are multiple relations with name "${i.relationName}" in table "${s}"`,
              )
            : Error(
                `There are multiple relations between "${s}" and "${i.sourceTable[n.XI.Symbol.Name]}". Please specify relation name`,
              );
        if (u[0] && (0, r.is)(u[0], f) && u[0].config)
          return {
            fields: u[0].config.references,
            references: u[0].config.fields,
          };
        throw Error(
          `There is not enough information to infer relation "${o}.${i.fieldName}"`,
        );
      }
      function S(e) {
        return {
          one: function (t, i) {
            return new f(
              e,
              t,
              i,
              i?.fields.reduce((e, t) => e && t.notNull, !0) ?? !1,
            );
          },
          many: function (t, i) {
            return new m(e, t, i);
          },
        };
      }
    },
    20040: (e, t, i) => {
      i.d(t, { Pe: () => u });
      var n = i(4595),
        s = i(22321),
        r = i(62508);
      class l {
        constructor(e, t) {
          (this.unique = e), (this.name = t);
        }
        static [s.i] = "PgIndexBuilderOn";
        on(...e) {
          return new a(
            e.map((e) => {
              if ((0, s.is)(e, n.Xs)) return e;
              let t = new r.ae(
                e.name,
                !!e.keyAsName,
                e.columnType,
                e.indexConfig,
              );
              return (
                (e.indexConfig = JSON.parse(JSON.stringify(e.defaultConfig))), t
              );
            }),
            this.unique,
            !1,
            this.name,
          );
        }
        onOnly(...e) {
          return new a(
            e.map((e) => {
              if ((0, s.is)(e, n.Xs)) return e;
              let t = new r.ae(
                e.name,
                !!e.keyAsName,
                e.columnType,
                e.indexConfig,
              );
              return (e.indexConfig = e.defaultConfig), t;
            }),
            this.unique,
            !0,
            this.name,
          );
        }
        using(e, ...t) {
          return new a(
            t.map((e) => {
              if ((0, s.is)(e, n.Xs)) return e;
              let t = new r.ae(
                e.name,
                !!e.keyAsName,
                e.columnType,
                e.indexConfig,
              );
              return (
                (e.indexConfig = JSON.parse(JSON.stringify(e.defaultConfig))), t
              );
            }),
            this.unique,
            !0,
            this.name,
            e,
          );
        }
      }
      class a {
        static [s.i] = "PgIndexBuilder";
        config;
        constructor(e, t, i, n, s = "btree") {
          this.config = { name: n, columns: e, unique: t, only: i, method: s };
        }
        concurrently() {
          return (this.config.concurrently = !0), this;
        }
        with(e) {
          return (this.config.with = e), this;
        }
        where(e) {
          return (this.config.where = e), this;
        }
        build(e) {
          return new o(this.config, e);
        }
      }
      class o {
        static [s.i] = "PgIndex";
        config;
        constructor(e, t) {
          this.config = { ...e, table: t };
        }
      }
      function u(e) {
        return new l(!1, e);
      }
    },
    21651: (e, t, i) => {
      let n, s;
      i.d(t, { k: () => l });
      var r = i(666);
      let l = {
        startActiveSpan: (e, t) =>
          n
            ? (s || (s = n.trace.getTracer("drizzle-orm", "0.36.4")),
              (0, r.i)(
                (i, n) =>
                  n.startActiveSpan(e, (e) => {
                    try {
                      return t(e);
                    } catch (t) {
                      throw (
                        (e.setStatus({
                          code: i.SpanStatusCode.ERROR,
                          message:
                            t instanceof Error ? t.message : "Unknown error",
                        }),
                        t)
                      );
                    } finally {
                      e.end();
                    }
                  }),
                n,
                s,
              ))
            : t(),
      };
    },
    21886: (e, t, i) => {
      i.d(t, { Tp: () => o, gH: () => a });
      var n = i(22321),
        s = i(73653),
        r = i(62508);
      class l extends r.pe {
        static [n.i] = "PgCharBuilder";
        constructor(e, t) {
          super(e, "string", "PgChar"),
            (this.config.length = t.length),
            (this.config.enumValues = t.enum);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends r.Kl {
        static [n.i] = "PgChar";
        length = this.config.length;
        enumValues = this.config.enumValues;
        getSQLType() {
          return void 0 === this.length ? "char" : `char(${this.length})`;
        }
      }
      function o(e, t = {}) {
        let { name: i, config: n } = (0, s.Ll)(e, t);
        return new l(i, n);
      }
    },
    22321: (e, t, i) => {
      i.d(t, { i: () => n, is: () => s });
      let n = Symbol.for("drizzle:entityKind");
      function s(e, t) {
        if (!e || "object" != typeof e) return !1;
        if (e instanceof t) return !0;
        if (!Object.prototype.hasOwnProperty.call(t, n))
          throw Error(
            `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
          );
        let i = Object.getPrototypeOf(e).constructor;
        if (i)
          for (; i; ) {
            if (n in i && i[n] === t[n]) return !0;
            i = Object.getPrototypeOf(i);
          }
        return !1;
      }
      Symbol.for("drizzle:hasOwnEntityKind");
    },
    23769: (e, t, i) => {
      i.d(t, { tO: () => a, yf: () => o });
      var n = i(22321),
        s = i(73653),
        r = i(62508);
      class l extends r.pe {
        static [n.i] = "PgVarcharBuilder";
        constructor(e, t) {
          super(e, "string", "PgVarchar"),
            (this.config.length = t.length),
            (this.config.enumValues = t.enum);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends r.Kl {
        static [n.i] = "PgVarchar";
        length = this.config.length;
        enumValues = this.config.enumValues;
        getSQLType() {
          return void 0 === this.length ? "varchar" : `varchar(${this.length})`;
        }
      }
      function o(e, t = {}) {
        let { name: i, config: n } = (0, s.Ll)(e, t);
        return new l(i, n);
      }
    },
    25486: (e, t, i) => {
      let n, s;
      i.d(t, { k: () => l });
      var r = i(98389);
      let l = {
        startActiveSpan: (e, t) =>
          n
            ? (s || (s = n.trace.getTracer("drizzle-orm", "0.34.1")),
              (0, r.i)(
                (i, n) =>
                  n.startActiveSpan(e, (e) => {
                    try {
                      return t(e);
                    } catch (t) {
                      throw (
                        (e.setStatus({
                          code: i.SpanStatusCode.ERROR,
                          message:
                            t instanceof Error ? t.message : "Unknown error",
                        }),
                        t)
                      );
                    } finally {
                      e.end();
                    }
                  }),
                n,
                s,
              ))
            : t(),
      };
    },
    26634: (e, t, i) => {
      i.d(t, { r: () => k, aJ: () => _ });
      var n = i(73653),
        s = i(22321),
        r = i(77042),
        l = i(58560),
        a = i(96019);
      class o {
        static [s.i] = "MySqlForeignKeyBuilder";
        reference;
        _onUpdate;
        _onDelete;
        constructor(e, t) {
          (this.reference = () => {
            let { name: t, columns: i, foreignColumns: n } = e();
            return {
              name: t,
              columns: i,
              foreignTable: n[0].table,
              foreignColumns: n,
            };
          }),
            t && ((this._onUpdate = t.onUpdate), (this._onDelete = t.onDelete));
        }
        onUpdate(e) {
          return (this._onUpdate = e), this;
        }
        onDelete(e) {
          return (this._onDelete = e), this;
        }
        build(e) {
          return new u(e, this);
        }
      }
      class u {
        constructor(e, t) {
          (this.table = e),
            (this.reference = t.reference),
            (this.onUpdate = t._onUpdate),
            (this.onDelete = t._onDelete);
        }
        static [s.i] = "MySqlForeignKey";
        reference;
        onUpdate;
        onDelete;
        getName() {
          let { name: e, columns: t, foreignColumns: i } = this.reference(),
            n = t.map((e) => e.name),
            s = i.map((e) => e.name),
            r = [this.table[a.E], ...n, i[0].table[a.E], ...s];
          return e ?? `${r.join("_")}_fk`;
        }
      }
      function c(e, t) {
        return `${e[a.E]}_${t.join("_")}_unique`;
      }
      class h {
        constructor(e, t) {
          (this.name = t), (this.columns = e);
        }
        static [s.i] = null;
        columns;
        build(e) {
          return new f(e, this.columns, this.name);
        }
      }
      class d {
        static [s.i] = null;
        name;
        constructor(e) {
          this.name = e;
        }
        on(...e) {
          return new h(e, this.name);
        }
      }
      class f {
        constructor(e, t, i) {
          (this.table = e),
            (this.columns = t),
            (this.name =
              i ??
              c(
                this.table,
                this.columns.map((e) => e.name),
              ));
        }
        static [s.i] = null;
        columns;
        name;
        nullsNotDistinct = !1;
        getName() {
          return this.name;
        }
      }
      class m extends r.Q {
        static [s.i] = "MySqlColumnBuilder";
        foreignKeyConfigs = [];
        references(e, t = {}) {
          return this.foreignKeyConfigs.push({ ref: e, actions: t }), this;
        }
        unique(e) {
          return (
            (this.config.isUnique = !0), (this.config.uniqueName = e), this
          );
        }
        generatedAlwaysAs(e, t) {
          return (
            (this.config.generated = {
              as: e,
              type: "always",
              mode: t?.mode ?? "virtual",
            }),
            this
          );
        }
        buildForeignKeys(e, t) {
          return this.foreignKeyConfigs.map(({ ref: i, actions: n }) =>
            ((i, n) => {
              let s = new o(() => ({ columns: [e], foreignColumns: [i()] }));
              return (
                n.onUpdate && s.onUpdate(n.onUpdate),
                n.onDelete && s.onDelete(n.onDelete),
                s.build(t)
              );
            })(i, n),
          );
        }
      }
      class g extends l.V {
        constructor(e, t) {
          t.uniqueName || (t.uniqueName = c(e, [t.name])),
            super(e, t),
            (this.table = e);
        }
        static [s.i] = "MySqlColumn";
      }
      class p extends m {
        static [s.i] = "MySqlColumnBuilderWithAutoIncrement";
        constructor(e, t, i) {
          super(e, t, i), (this.config.autoIncrement = !1);
        }
        autoincrement() {
          return (
            (this.config.autoIncrement = !0),
            (this.config.hasDefault = !0),
            this
          );
        }
      }
      class y extends null {
        static [s.i] = null;
        autoIncrement = this.config.autoIncrement;
      }
      class b extends m {
        static [s.i] = "MySqlVarCharBuilder";
        constructor(e, t) {
          super(e, "string", "MySqlVarChar"),
            (this.config.length = t.length),
            (this.config.enum = t.enum);
        }
        build(e) {
          return new w(e, this.config);
        }
      }
      class w extends g {
        static [s.i] = "MySqlVarChar";
        length = this.config.length;
        enumValues = this.config.enum;
        getSQLType() {
          return void 0 === this.length ? "varchar" : `varchar(${this.length})`;
        }
      }
      class S extends m {
        static [s.i] = "MySqlVarBinaryBuilder";
        constructor(e, t) {
          super(e, "string", "MySqlVarBinary"),
            (this.config.length = t?.length);
        }
        build(e) {
          return new v(e, this.config);
        }
      }
      class v extends g {
        static [s.i] = "MySqlVarBinary";
        length = this.config.length;
        getSQLType() {
          return void 0 === this.length
            ? "varbinary"
            : `varbinary(${this.length})`;
        }
      }
      class $ extends m {
        static [s.i] = "MySqlCharBuilder";
        constructor(e, t) {
          super(e, "string", "MySqlChar"),
            (this.config.length = t.length),
            (this.config.enum = t.enum);
        }
        build(e) {
          return new P(e, this.config);
        }
      }
      class P extends g {
        static [s.i] = "MySqlChar";
        length = this.config.length;
        enumValues = this.config.enum;
        getSQLType() {
          return void 0 === this.length ? "char" : `char(${this.length})`;
        }
      }
      var N = i(38201),
        T = i(21886),
        x = i(23769);
      class q {
        static [s.i] = "SQLiteForeignKeyBuilder";
        reference;
        _onUpdate;
        _onDelete;
        constructor(e, t) {
          (this.reference = () => {
            let { name: t, columns: i, foreignColumns: n } = e();
            return {
              name: t,
              columns: i,
              foreignTable: n[0].table,
              foreignColumns: n,
            };
          }),
            t && ((this._onUpdate = t.onUpdate), (this._onDelete = t.onDelete));
        }
        onUpdate(e) {
          return (this._onUpdate = e), this;
        }
        onDelete(e) {
          return (this._onDelete = e), this;
        }
        build(e) {
          return new D(e, this);
        }
      }
      class D {
        constructor(e, t) {
          (this.table = e),
            (this.reference = t.reference),
            (this.onUpdate = t._onUpdate),
            (this.onDelete = t._onDelete);
        }
        static [s.i] = "SQLiteForeignKey";
        reference;
        onUpdate;
        onDelete;
        getName() {
          let { name: e, columns: t, foreignColumns: i } = this.reference(),
            n = t.map((e) => e.name),
            s = i.map((e) => e.name),
            r = [this.table[a.E], ...n, i[0].table[a.E], ...s];
          return e ?? `${r.join("_")}_fk`;
        }
      }
      function C(e, t) {
        return `${e[a.E]}_${t.join("_")}_unique`;
      }
      class I {
        constructor(e, t) {
          (this.name = t), (this.columns = e);
        }
        static [s.i] = null;
        columns;
        build(e) {
          return new L(e, this.columns, this.name);
        }
      }
      class O {
        static [s.i] = null;
        name;
        constructor(e) {
          this.name = e;
        }
        on(...e) {
          return new I(e, this.name);
        }
      }
      class L {
        constructor(e, t, i) {
          (this.table = e),
            (this.columns = t),
            (this.name =
              i ??
              C(
                this.table,
                this.columns.map((e) => e.name),
              ));
        }
        static [s.i] = null;
        columns;
        name;
        getName() {
          return this.name;
        }
      }
      class j extends r.Q {
        static [s.i] = "SQLiteColumnBuilder";
        foreignKeyConfigs = [];
        references(e, t = {}) {
          return this.foreignKeyConfigs.push({ ref: e, actions: t }), this;
        }
        unique(e) {
          return (
            (this.config.isUnique = !0), (this.config.uniqueName = e), this
          );
        }
        generatedAlwaysAs(e, t) {
          return (
            (this.config.generated = {
              as: e,
              type: "always",
              mode: t?.mode ?? "virtual",
            }),
            this
          );
        }
        buildForeignKeys(e, t) {
          return this.foreignKeyConfigs.map(({ ref: i, actions: n }) =>
            ((i, n) => {
              let s = new q(() => ({ columns: [e], foreignColumns: [i()] }));
              return (
                n.onUpdate && s.onUpdate(n.onUpdate),
                n.onDelete && s.onDelete(n.onDelete),
                s.build(t)
              );
            })(i, n),
          );
        }
      }
      class B extends l.V {
        constructor(e, t) {
          t.uniqueName || (t.uniqueName = C(e, [t.name])),
            super(e, t),
            (this.table = e);
        }
        static [s.i] = "SQLiteColumn";
      }
      class Q extends j {
        static [s.i] = "SQLiteTextBuilder";
        constructor(e, t) {
          super(e, "string", "SQLiteText"),
            (this.config.enumValues = t.enum),
            (this.config.length = t.length);
        }
        build(e) {
          return new V(e, this.config);
        }
      }
      class V extends B {
        static [s.i] = "SQLiteText";
        enumValues = this.config.enumValues;
        length = this.config.length;
        constructor(e, t) {
          super(e, t);
        }
        getSQLType() {
          return `text${this.config.length ? `(${this.config.length})` : ""}`;
        }
      }
      class z extends j {
        static [s.i] = "SQLiteTextJsonBuilder";
        constructor(e) {
          super(e, "json", "SQLiteTextJson");
        }
        build(e) {
          return new F(e, this.config);
        }
      }
      class F extends B {
        static [s.i] = "SQLiteTextJson";
        getSQLType() {
          return "text";
        }
        mapFromDriverValue(e) {
          return JSON.parse(e);
        }
        mapToDriverValue(e) {
          return JSON.stringify(e);
        }
      }
      var A = i(58342);
      let K = A.KC([A.Yj(), A.ai(), A.zM(), A.ch()]),
        E = A.RZ(() => A.KC([K, A.YO(E), A.g1(E)]));
      function k(e, t) {
        let i = Object.entries((0, n.YD)(e)),
          s = Object.fromEntries(i.map(([e, t]) => [e, U(t)]));
        for (let [e, n] of (t &&
          (s = Object.assign(
            s,
            Object.fromEntries(
              Object.entries(t).map(([e, t]) => [
                e,
                "function" == typeof t ? t(s) : t,
              ]),
            ),
          )),
        i))
          n.notNull
            ? n.hasDefault && (s[e] = s[e].optional())
            : (s[e] = s[e].nullable().optional());
        return A.Ik(s);
      }
      function _(e, t) {
        let i = Object.entries((0, n.YD)(e)),
          s = Object.fromEntries(i.map(([e, t]) => [e, U(t)]));
        for (let [e, n] of (t &&
          (s = Object.assign(
            s,
            Object.fromEntries(
              Object.entries(t).map(([e, t]) => [
                e,
                "function" == typeof t ? t(s) : t,
              ]),
            ),
          )),
        i))
          n.notNull || (s[e] = s[e].nullable());
        return A.Ik(s);
      }
      function U(e) {
        let t;
        if (
          ("enumValues" in e &&
            Array.isArray(e.enumValues) &&
            e.enumValues.length > 0 &&
            (t = e.enumValues.length ? A.k5(e.enumValues) : A.Yj()),
          !t)
        ) {
          if ((0, s.is)(e, N.dL)) t = A.Yj().uuid();
          else if ("custom" === e.dataType) t = A.bz();
          else if ("json" === e.dataType) t = E;
          else if ("array" === e.dataType) t = A.YO(U(e.baseColumn));
          else if ("number" === e.dataType) t = A.ai();
          else if ("bigint" === e.dataType) t = A.o();
          else if ("boolean" === e.dataType) t = A.zM();
          else if ("date" === e.dataType) t = A.p6();
          else if ("string" === e.dataType) {
            let i = A.Yj();
            ((0, s.is)(e, T.gH) ||
              (0, s.is)(e, x.tO) ||
              (0, s.is)(e, w) ||
              (0, s.is)(e, v) ||
              (0, s.is)(e, P) ||
              (0, s.is)(e, V)) &&
              "number" == typeof e.length &&
              (i = i.max(e.length)),
              (t = i);
          }
        }
        return t || (t = A.bz()), t;
      }
    },
    32283: (e, t, i) => {
      i.d(t, { Io: () => m, Lf: () => g, XI: () => f });
      var n = i(79396),
        s = i(67236);
      let r = Symbol.for("drizzle:Schema"),
        l = Symbol.for("drizzle:Columns"),
        a = Symbol.for("drizzle:ExtraConfigColumns"),
        o = Symbol.for("drizzle:OriginalName"),
        u = Symbol.for("drizzle:BaseName"),
        c = Symbol.for("drizzle:IsAlias"),
        h = Symbol.for("drizzle:ExtraConfigBuilder"),
        d = Symbol.for("drizzle:IsDrizzleTable");
      class f {
        static [n.i] = "Table";
        static Symbol = {
          Name: s.E,
          Schema: r,
          OriginalName: o,
          Columns: l,
          ExtraConfigColumns: a,
          BaseName: u,
          IsAlias: c,
          ExtraConfigBuilder: h,
        };
        [s.E];
        [o];
        [r];
        [l];
        [a];
        [u];
        [c] = !1;
        [d] = !0;
        [h] = void 0;
        constructor(e, t, i) {
          (this[s.E] = this[o] = e), (this[r] = t), (this[u] = i);
        }
      }
      function m(e) {
        return e[s.E];
      }
      function g(e) {
        return `${e[r] ?? "public"}.${e[s.E]}`;
      }
    },
    35780: (e, t, i) => {
      i.d(t, { k: () => s });
      var n = i(22321);
      class s {
        static [n.i] = "QueryPromise";
        [Symbol.toStringTag] = "QueryPromise";
        catch(e) {
          return this.then(void 0, e);
        }
        finally(e) {
          return this.then(
            (t) => (e?.(), t),
            (t) => {
              throw (e?.(), t);
            },
          );
        }
        then(e, t) {
          return this.execute().then(e, t);
        }
      }
    },
    36700: (e, t, i) => {
      i.d(t, { PI: () => m });
      var n = i(22321),
        s = i(7061);
      class r {
        static [n.i] = "TypedQueryBuilder";
        getSelectedFields() {
          return this._.selectedFields;
        }
      }
      var l = i(35780),
        a = i(65807),
        o = i(4595),
        u = i(16988),
        c = i(74696),
        h = i(21651),
        d = i(73653),
        f = i(10765);
      class m {
        static [n.i] = "PgSelectBuilder";
        fields;
        session;
        dialect;
        withList = [];
        distinct;
        constructor(e) {
          (this.fields = e.fields),
            (this.session = e.session),
            (this.dialect = e.dialect),
            e.withList && (this.withList = e.withList),
            (this.distinct = e.distinct);
        }
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        from(e) {
          let t,
            i = !!this.fields;
          return (
            (t = this.fields
              ? this.fields
              : (0, n.is)(e, u.n)
                ? Object.fromEntries(
                    Object.keys(e._.selectedFields).map((t) => [t, e[t]]),
                  )
                : (0, n.is)(e, s.w)
                  ? e[f.n].selectedFields
                  : (0, n.is)(e, o.Xs)
                    ? {}
                    : (0, d.YD)(e)),
            void 0 === this.authToken
              ? new p({
                  table: e,
                  fields: t,
                  isPartialSelect: i,
                  session: this.session,
                  dialect: this.dialect,
                  withList: this.withList,
                  distinct: this.distinct,
                })
              : new p({
                  table: e,
                  fields: t,
                  isPartialSelect: i,
                  session: this.session,
                  dialect: this.dialect,
                  withList: this.withList,
                  distinct: this.distinct,
                }).setToken(this.authToken)
          );
        }
      }
      class g extends r {
        static [n.i] = "PgSelectQueryBuilder";
        _;
        config;
        joinsNotNullableMap;
        tableName;
        isPartialSelect;
        session;
        dialect;
        constructor({
          table: e,
          fields: t,
          isPartialSelect: i,
          session: n,
          dialect: s,
          withList: r,
          distinct: l,
        }) {
          super(),
            (this.config = {
              withList: r,
              table: e,
              fields: { ...t },
              distinct: l,
              setOperators: [],
            }),
            (this.isPartialSelect = i),
            (this.session = n),
            (this.dialect = s),
            (this._ = { selectedFields: t }),
            (this.tableName = (0, d.zN)(e)),
            (this.joinsNotNullableMap =
              "string" == typeof this.tableName
                ? { [this.tableName]: !0 }
                : {});
        }
        createJoin(e) {
          return (t, i) => {
            let s = this.tableName,
              r = (0, d.zN)(t);
            if (
              "string" == typeof r &&
              this.config.joins?.some((e) => e.alias === r)
            )
              throw Error(`Alias "${r}" is already used in this query`);
            if (
              !this.isPartialSelect &&
              (1 === Object.keys(this.joinsNotNullableMap).length &&
                "string" == typeof s &&
                (this.config.fields = { [s]: this.config.fields }),
              "string" == typeof r && !(0, n.is)(t, o.Xs))
            ) {
              let e = (0, n.is)(t, u.n)
                ? t._.selectedFields
                : (0, n.is)(t, o.Ss)
                  ? t[f.n].selectedFields
                  : t[c.XI.Symbol.Columns];
              this.config.fields[r] = e;
            }
            if (
              ("function" == typeof i &&
                (i = i(
                  new Proxy(
                    this.config.fields,
                    new a.b({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                  ),
                )),
              this.config.joins || (this.config.joins = []),
              this.config.joins.push({
                on: i,
                table: t,
                joinType: e,
                alias: r,
              }),
              "string" == typeof r)
            )
              switch (e) {
                case "left":
                  this.joinsNotNullableMap[r] = !1;
                  break;
                case "right":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[r] = !0);
                  break;
                case "inner":
                  this.joinsNotNullableMap[r] = !0;
                  break;
                case "full":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[r] = !1);
              }
            return this;
          };
        }
        leftJoin = this.createJoin("left");
        rightJoin = this.createJoin("right");
        innerJoin = this.createJoin("inner");
        fullJoin = this.createJoin("full");
        createSetOperator(e, t) {
          return (i) => {
            let n = "function" == typeof i ? i(b()) : i;
            if (!(0, d.DV)(this.getSelectedFields(), n.getSelectedFields()))
              throw Error(
                "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
              );
            return (
              this.config.setOperators.push({
                type: e,
                isAll: t,
                rightSelect: n,
              }),
              this
            );
          };
        }
        union = this.createSetOperator("union", !1);
        unionAll = this.createSetOperator("union", !0);
        intersect = this.createSetOperator("intersect", !1);
        intersectAll = this.createSetOperator("intersect", !0);
        except = this.createSetOperator("except", !1);
        exceptAll = this.createSetOperator("except", !0);
        addSetOperators(e) {
          return this.config.setOperators.push(...e), this;
        }
        where(e) {
          return (
            "function" == typeof e &&
              (e = e(
                new Proxy(
                  this.config.fields,
                  new a.b({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                ),
              )),
            (this.config.where = e),
            this
          );
        }
        having(e) {
          return (
            "function" == typeof e &&
              (e = e(
                new Proxy(
                  this.config.fields,
                  new a.b({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                ),
              )),
            (this.config.having = e),
            this
          );
        }
        groupBy(...e) {
          if ("function" == typeof e[0]) {
            let t = e[0](
              new Proxy(
                this.config.fields,
                new a.b({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
              ),
            );
            this.config.groupBy = Array.isArray(t) ? t : [t];
          } else this.config.groupBy = e;
          return this;
        }
        orderBy(...e) {
          if ("function" == typeof e[0]) {
            let t = e[0](
                new Proxy(
                  this.config.fields,
                  new a.b({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
                ),
              ),
              i = Array.isArray(t) ? t : [t];
            this.config.setOperators.length > 0
              ? (this.config.setOperators.at(-1).orderBy = i)
              : (this.config.orderBy = i);
          } else
            this.config.setOperators.length > 0
              ? (this.config.setOperators.at(-1).orderBy = e)
              : (this.config.orderBy = e);
          return this;
        }
        limit(e) {
          return (
            this.config.setOperators.length > 0
              ? (this.config.setOperators.at(-1).limit = e)
              : (this.config.limit = e),
            this
          );
        }
        offset(e) {
          return (
            this.config.setOperators.length > 0
              ? (this.config.setOperators.at(-1).offset = e)
              : (this.config.offset = e),
            this
          );
        }
        for(e, t = {}) {
          return (this.config.lockingClause = { strength: e, config: t }), this;
        }
        getSQL() {
          return this.dialect.buildSelectQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        as(e) {
          return new Proxy(
            new u.n(this.getSQL(), this.config.fields, e),
            new a.b({
              alias: e,
              sqlAliasedBehavior: "alias",
              sqlBehavior: "error",
            }),
          );
        }
        getSelectedFields() {
          return new Proxy(
            this.config.fields,
            new a.b({
              alias: this.tableName,
              sqlAliasedBehavior: "alias",
              sqlBehavior: "error",
            }),
          );
        }
        $dynamic() {
          return this;
        }
      }
      class p extends g {
        static [n.i] = "PgSelect";
        _prepare(e) {
          let {
            session: t,
            config: i,
            dialect: n,
            joinsNotNullableMap: s,
            authToken: r,
          } = this;
          if (!t)
            throw Error(
              "Cannot execute a query on a query builder. Please use a database instance instead.",
            );
          return h.k.startActiveSpan("drizzle.prepareQuery", () => {
            let l = (0, d.He)(i.fields),
              a = t.prepareQuery(n.sqlToQuery(this.getSQL()), l, e, !0);
            return (
              (a.joinsNotNullableMap = s), void 0 === r ? a : a.setToken(r)
            );
          });
        }
        prepare(e) {
          return this._prepare(e);
        }
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        execute = (e) =>
          h.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
      }
      function y(e, t) {
        return (i, n, ...s) => {
          let r = [n, ...s].map((i) => ({ type: e, isAll: t, rightSelect: i }));
          for (let e of r)
            if (
              !(0, d.DV)(
                i.getSelectedFields(),
                e.rightSelect.getSelectedFields(),
              )
            )
              throw Error(
                "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
              );
          return i.addSetOperators(r);
        };
      }
      (0, d.XJ)(p, [l.k]);
      let b = () => ({
          union: w,
          unionAll: S,
          intersect: v,
          intersectAll: $,
          except: P,
          exceptAll: N,
        }),
        w = y("union", !1),
        S = y("union", !0),
        v = y("intersect", !1),
        $ = y("intersect", !0),
        P = y("except", !1),
        N = y("except", !0);
    },
    37671: (e, t, i) => {
      i.d(t, { BU: () => l, m7: () => c, rL: () => u });
      var n = i(22321),
        s = i(62508);
      let r = Symbol.for("drizzle:isPgEnum");
      function l(e) {
        return !!e && "function" == typeof e && r in e && !0 === e[r];
      }
      class a extends s.pe {
        static [n.i] = "PgEnumColumnBuilder";
        constructor(e, t) {
          super(e, "string", "PgEnumColumn"), (this.config.enum = t);
        }
        build(e) {
          return new o(e, this.config);
        }
      }
      class o extends s.Kl {
        static [n.i] = "PgEnumColumn";
        enum = this.config.enum;
        enumValues = this.config.enum.enumValues;
        constructor(e, t) {
          super(e, t), (this.enum = t.enum);
        }
        getSQLType() {
          return this.enum.enumName;
        }
      }
      function u(e, t) {
        return c(e, t, void 0);
      }
      function c(e, t, i) {
        let n = Object.assign((e) => new a(e ?? "", n), {
          enumName: e,
          enumValues: t,
          schema: i,
          [r]: !0,
        });
        return n;
      }
    },
    38201: (e, t, i) => {
      i.d(t, { dL: () => a, uR: () => o });
      var n = i(22321),
        s = i(4595),
        r = i(62508);
      class l extends r.pe {
        static [n.i] = "PgUUIDBuilder";
        constructor(e) {
          super(e, "string", "PgUUID");
        }
        defaultRandom() {
          return this.default((0, s.ll)`gen_random_uuid()`);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends r.Kl {
        static [n.i] = "PgUUID";
        getSQLType() {
          return "uuid";
        }
      }
      function o(e) {
        return new l(e ?? "");
      }
    },
    39258: (e, t, i) => {
      i.d(t, { p: () => r });
      var n = i(22321),
        s = i(62508);
      class r extends s.pe {
        static [n.i] = "PgIntColumnBaseBuilder";
        generatedAlwaysAsIdentity(e) {
          if (e) {
            let { name: t, ...i } = e;
            this.config.generatedIdentity = {
              type: "always",
              sequenceName: t,
              sequenceOptions: i,
            };
          } else this.config.generatedIdentity = { type: "always" };
          return (
            (this.config.hasDefault = !0), (this.config.notNull = !0), this
          );
        }
        generatedByDefaultAsIdentity(e) {
          if (e) {
            let { name: t, ...i } = e;
            this.config.generatedIdentity = {
              type: "byDefault",
              sequenceName: t,
              sequenceOptions: i,
            };
          } else this.config.generatedIdentity = { type: "byDefault" };
          return (
            (this.config.hasDefault = !0), (this.config.notNull = !0), this
          );
        }
      }
    },
    40128: (e, t, i) => {
      i.d(t, { mu: () => eK, cJ: () => ek, fm: () => eE });
      var n = i(22321),
        s = i(74696),
        r = i(73653),
        l = i(62508),
        a = i(39258);
      class o extends a.p {
        static [n.i] = "PgBigInt53Builder";
        constructor(e) {
          super(e, "number", "PgBigInt53");
        }
        build(e) {
          return new u(e, this.config);
        }
      }
      class u extends l.Kl {
        static [n.i] = "PgBigInt53";
        getSQLType() {
          return "bigint";
        }
        mapFromDriverValue(e) {
          return "number" == typeof e ? e : Number(e);
        }
      }
      class c extends a.p {
        static [n.i] = "PgBigInt64Builder";
        constructor(e) {
          super(e, "bigint", "PgBigInt64");
        }
        build(e) {
          return new h(e, this.config);
        }
      }
      class h extends l.Kl {
        static [n.i] = "PgBigInt64";
        getSQLType() {
          return "bigint";
        }
        mapFromDriverValue(e) {
          return BigInt(e);
        }
      }
      function d(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return "number" === n.mode ? new o(i) : new c(i);
      }
      class f extends l.pe {
        static [n.i] = "PgBigSerial53Builder";
        constructor(e) {
          super(e, "number", "PgBigSerial53"),
            (this.config.hasDefault = !0),
            (this.config.notNull = !0);
        }
        build(e) {
          return new m(e, this.config);
        }
      }
      class m extends l.Kl {
        static [n.i] = "PgBigSerial53";
        getSQLType() {
          return "bigserial";
        }
        mapFromDriverValue(e) {
          return "number" == typeof e ? e : Number(e);
        }
      }
      class g extends l.pe {
        static [n.i] = "PgBigSerial64Builder";
        constructor(e) {
          super(e, "bigint", "PgBigSerial64"), (this.config.hasDefault = !0);
        }
        build(e) {
          return new p(e, this.config);
        }
      }
      class p extends l.Kl {
        static [n.i] = "PgBigSerial64";
        getSQLType() {
          return "bigserial";
        }
        mapFromDriverValue(e) {
          return BigInt(e);
        }
      }
      function y(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return "number" === n.mode ? new f(i) : new g(i);
      }
      var b = i(8488),
        w = i(21886);
      class S extends l.pe {
        static [n.i] = "PgCidrBuilder";
        constructor(e) {
          super(e, "string", "PgCidr");
        }
        build(e) {
          return new v(e, this.config);
        }
      }
      class v extends l.Kl {
        static [n.i] = "PgCidr";
        getSQLType() {
          return "cidr";
        }
      }
      function $(e) {
        return new S(e ?? "");
      }
      class P extends l.pe {
        static [n.i] = "PgCustomColumnBuilder";
        constructor(e, t, i) {
          super(e, "custom", "PgCustomColumn"),
            (this.config.fieldConfig = t),
            (this.config.customTypeParams = i);
        }
        build(e) {
          return new N(e, this.config);
        }
      }
      class N extends l.Kl {
        static [n.i] = "PgCustomColumn";
        sqlName;
        mapTo;
        mapFrom;
        constructor(e, t) {
          super(e, t),
            (this.sqlName = t.customTypeParams.dataType(t.fieldConfig)),
            (this.mapTo = t.customTypeParams.toDriver),
            (this.mapFrom = t.customTypeParams.fromDriver);
        }
        getSQLType() {
          return this.sqlName;
        }
        mapFromDriverValue(e) {
          return "function" == typeof this.mapFrom ? this.mapFrom(e) : e;
        }
        mapToDriverValue(e) {
          return "function" == typeof this.mapTo ? this.mapTo(e) : e;
        }
      }
      function T(e) {
        return (t, i) => {
          let { name: n, config: s } = (0, r.Ll)(t, i);
          return new P(n, s, e);
        };
      }
      var x = i(5706);
      class q extends l.pe {
        static [n.i] = "PgDoublePrecisionBuilder";
        constructor(e) {
          super(e, "number", "PgDoublePrecision");
        }
        build(e) {
          return new D(e, this.config);
        }
      }
      class D extends l.Kl {
        static [n.i] = "PgDoublePrecision";
        getSQLType() {
          return "double precision";
        }
        mapFromDriverValue(e) {
          return "string" == typeof e ? Number.parseFloat(e) : e;
        }
      }
      function C(e) {
        return new q(e ?? "");
      }
      class I extends l.pe {
        static [n.i] = "PgInetBuilder";
        constructor(e) {
          super(e, "string", "PgInet");
        }
        build(e) {
          return new O(e, this.config);
        }
      }
      class O extends l.Kl {
        static [n.i] = "PgInet";
        getSQLType() {
          return "inet";
        }
      }
      function L(e) {
        return new I(e ?? "");
      }
      var j = i(55190);
      class B extends l.pe {
        static [n.i] = "PgIntervalBuilder";
        constructor(e, t) {
          super(e, "string", "PgInterval"), (this.config.intervalConfig = t);
        }
        build(e) {
          return new Q(e, this.config);
        }
      }
      class Q extends l.Kl {
        static [n.i] = "PgInterval";
        fields = this.config.intervalConfig.fields;
        precision = this.config.intervalConfig.precision;
        getSQLType() {
          let e = this.fields ? ` ${this.fields}` : "",
            t = this.precision ? `(${this.precision})` : "";
          return `interval${e}${t}`;
        }
      }
      function V(e, t = {}) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return new B(i, n);
      }
      var z = i(42700),
        F = i(44444);
      class A extends l.pe {
        static [n.i] = "PgLineBuilder";
        constructor(e) {
          super(e, "array", "PgLine");
        }
        build(e) {
          return new K(e, this.config);
        }
      }
      class K extends l.Kl {
        static [n.i] = "PgLine";
        getSQLType() {
          return "line";
        }
        mapFromDriverValue(e) {
          let [t, i, n] = e.slice(1, -1).split(",");
          return [
            Number.parseFloat(t),
            Number.parseFloat(i),
            Number.parseFloat(n),
          ];
        }
        mapToDriverValue(e) {
          return `{${e[0]},${e[1]},${e[2]}}`;
        }
      }
      class E extends l.pe {
        static [n.i] = "PgLineABCBuilder";
        constructor(e) {
          super(e, "json", "PgLineABC");
        }
        build(e) {
          return new k(e, this.config);
        }
      }
      class k extends l.Kl {
        static [n.i] = "PgLineABC";
        getSQLType() {
          return "line";
        }
        mapFromDriverValue(e) {
          let [t, i, n] = e.slice(1, -1).split(",");
          return {
            a: Number.parseFloat(t),
            b: Number.parseFloat(i),
            c: Number.parseFloat(n),
          };
        }
        mapToDriverValue(e) {
          return `{${e.a},${e.b},${e.c}}`;
        }
      }
      function _(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return n?.mode && "tuple" !== n.mode ? new E(i) : new A(i);
      }
      class U extends l.pe {
        static [n.i] = "PgMacaddrBuilder";
        constructor(e) {
          super(e, "string", "PgMacaddr");
        }
        build(e) {
          return new X(e, this.config);
        }
      }
      class X extends l.Kl {
        static [n.i] = "PgMacaddr";
        getSQLType() {
          return "macaddr";
        }
      }
      function J(e) {
        return new U(e ?? "");
      }
      class M extends l.pe {
        static [n.i] = "PgMacaddr8Builder";
        constructor(e) {
          super(e, "string", "PgMacaddr8");
        }
        build(e) {
          return new R(e, this.config);
        }
      }
      class R extends l.Kl {
        static [n.i] = "PgMacaddr8";
        getSQLType() {
          return "macaddr8";
        }
      }
      function H(e) {
        return new M(e ?? "");
      }
      var Y = i(41599);
      class W extends l.pe {
        static [n.i] = "PgPointTupleBuilder";
        constructor(e) {
          super(e, "array", "PgPointTuple");
        }
        build(e) {
          return new G(e, this.config);
        }
      }
      class G extends l.Kl {
        static [n.i] = "PgPointTuple";
        getSQLType() {
          return "point";
        }
        mapFromDriverValue(e) {
          if ("string" == typeof e) {
            let [t, i] = e.slice(1, -1).split(",");
            return [Number.parseFloat(t), Number.parseFloat(i)];
          }
          return [e.x, e.y];
        }
        mapToDriverValue(e) {
          return `(${e[0]},${e[1]})`;
        }
      }
      class Z extends l.pe {
        static [n.i] = "PgPointObjectBuilder";
        constructor(e) {
          super(e, "json", "PgPointObject");
        }
        build(e) {
          return new ee(e, this.config);
        }
      }
      class ee extends l.Kl {
        static [n.i] = "PgPointObject";
        getSQLType() {
          return "point";
        }
        mapFromDriverValue(e) {
          if ("string" == typeof e) {
            let [t, i] = e.slice(1, -1).split(",");
            return { x: Number.parseFloat(t), y: Number.parseFloat(i) };
          }
          return e;
        }
        mapToDriverValue(e) {
          return `(${e.x},${e.y})`;
        }
      }
      function et(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return n?.mode && "tuple" !== n.mode ? new Z(i) : new W(i);
      }
      function ei(e, t) {
        let i = new DataView(new ArrayBuffer(8));
        for (let n = 0; n < 8; n++) i.setUint8(n, e[t + n]);
        return i.getFloat64(0, !0);
      }
      function en(e) {
        let t = (function (e) {
            let t = [];
            for (let i = 0; i < e.length; i += 2)
              t.push(Number.parseInt(e.slice(i, i + 2), 16));
            return new Uint8Array(t);
          })(e),
          i = 0,
          n = t[0];
        i += 1;
        let s = new DataView(t.buffer),
          r = s.getUint32(i, 1 === n);
        if (
          ((i += 4),
          0x20000000 & r && (s.getUint32(i, 1 === n), (i += 4)),
          (65535 & r) == 1)
        ) {
          let e = ei(t, i),
            n = ei(t, (i += 8));
          return (i += 8), [e, n];
        }
        throw Error("Unsupported geometry type");
      }
      class es extends l.pe {
        static [n.i] = "PgGeometryBuilder";
        constructor(e) {
          super(e, "array", "PgGeometry");
        }
        build(e) {
          return new er(e, this.config);
        }
      }
      class er extends l.Kl {
        static [n.i] = "PgGeometry";
        getSQLType() {
          return "geometry(point)";
        }
        mapFromDriverValue(e) {
          return en(e);
        }
        mapToDriverValue(e) {
          return `point(${e[0]} ${e[1]})`;
        }
      }
      class el extends l.pe {
        static [n.i] = "PgGeometryObjectBuilder";
        constructor(e) {
          super(e, "json", "PgGeometryObject");
        }
        build(e) {
          return new ea(e, this.config);
        }
      }
      class ea extends l.Kl {
        static [n.i] = "PgGeometryObject";
        getSQLType() {
          return "geometry(point)";
        }
        mapFromDriverValue(e) {
          let t = en(e);
          return { x: t[0], y: t[1] };
        }
        mapToDriverValue(e) {
          return `point(${e.x} ${e.y})`;
        }
      }
      function eo(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return n?.mode && "tuple" !== n.mode ? new el(i) : new es(i);
      }
      class eu extends l.pe {
        static [n.i] = "PgRealBuilder";
        constructor(e, t) {
          super(e, "number", "PgReal"), (this.config.length = t);
        }
        build(e) {
          return new ec(e, this.config);
        }
      }
      class ec extends l.Kl {
        static [n.i] = "PgReal";
        constructor(e, t) {
          super(e, t);
        }
        getSQLType() {
          return "real";
        }
        mapFromDriverValue = (e) =>
          "string" == typeof e ? Number.parseFloat(e) : e;
      }
      function eh(e) {
        return new eu(e ?? "");
      }
      class ed extends l.pe {
        static [n.i] = "PgSerialBuilder";
        constructor(e) {
          super(e, "number", "PgSerial"),
            (this.config.hasDefault = !0),
            (this.config.notNull = !0);
        }
        build(e) {
          return new ef(e, this.config);
        }
      }
      class ef extends l.Kl {
        static [n.i] = "PgSerial";
        getSQLType() {
          return "serial";
        }
      }
      function em(e) {
        return new ed(e ?? "");
      }
      class eg extends a.p {
        static [n.i] = "PgSmallIntBuilder";
        constructor(e) {
          super(e, "number", "PgSmallInt");
        }
        build(e) {
          return new ep(e, this.config);
        }
      }
      class ep extends l.Kl {
        static [n.i] = "PgSmallInt";
        getSQLType() {
          return "smallint";
        }
        mapFromDriverValue = (e) => ("string" == typeof e ? Number(e) : e);
      }
      function ey(e) {
        return new eg(e ?? "");
      }
      class eb extends l.pe {
        static [n.i] = "PgSmallSerialBuilder";
        constructor(e) {
          super(e, "number", "PgSmallSerial"),
            (this.config.hasDefault = !0),
            (this.config.notNull = !0);
        }
        build(e) {
          return new ew(e, this.config);
        }
      }
      class ew extends l.Kl {
        static [n.i] = "PgSmallSerial";
        getSQLType() {
          return "smallserial";
        }
      }
      function eS(e) {
        return new eb(e ?? "");
      }
      var ev = i(48645),
        e$ = i(77963),
        eP = i(98636),
        eN = i(38201),
        eT = i(23769);
      class ex extends l.pe {
        static [n.i] = "PgBinaryVectorBuilder";
        constructor(e, t) {
          super(e, "string", "PgBinaryVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new eq(e, this.config);
        }
      }
      class eq extends l.Kl {
        static [n.i] = "PgBinaryVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `bit(${this.dimensions})`;
        }
      }
      function eD(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return new ex(i, n);
      }
      class eC extends l.pe {
        static [n.i] = "PgHalfVectorBuilder";
        constructor(e, t) {
          super(e, "array", "PgHalfVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new eI(e, this.config);
        }
      }
      class eI extends l.Kl {
        static [n.i] = "PgHalfVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `halfvec(${this.dimensions})`;
        }
        mapToDriverValue(e) {
          return JSON.stringify(e);
        }
        mapFromDriverValue(e) {
          return e
            .slice(1, -1)
            .split(",")
            .map((e) => Number.parseFloat(e));
        }
      }
      function eO(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return new eC(i, n);
      }
      class eL extends l.pe {
        static [n.i] = "PgSparseVectorBuilder";
        constructor(e, t) {
          super(e, "string", "PgSparseVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new ej(e, this.config);
        }
      }
      class ej extends l.Kl {
        static [n.i] = "PgSparseVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `sparsevec(${this.dimensions})`;
        }
      }
      function eB(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return new eL(i, n);
      }
      class eQ extends l.pe {
        static [n.i] = "PgVectorBuilder";
        constructor(e, t) {
          super(e, "array", "PgVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new eV(e, this.config);
        }
      }
      class eV extends l.Kl {
        static [n.i] = "PgVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `vector(${this.dimensions})`;
        }
        mapToDriverValue(e) {
          return JSON.stringify(e);
        }
        mapFromDriverValue(e) {
          return e
            .slice(1, -1)
            .split(",")
            .map((e) => Number.parseFloat(e));
        }
      }
      function ez(e, t) {
        let { name: i, config: n } = (0, r.Ll)(e, t);
        return new eQ(i, n);
      }
      let eF = Symbol.for("drizzle:PgInlineForeignKeys"),
        eA = Symbol.for("drizzle:EnableRLS");
      class eK extends s.XI {
        static [n.i] = "PgTable";
        static Symbol = Object.assign({}, s.XI.Symbol, {
          InlineForeignKeys: eF,
          EnableRLS: eA,
        });
        [eF] = [];
        [eA] = !1;
        [s.XI.Symbol.ExtraConfigBuilder] = void 0;
      }
      function eE(e, t, i, n, r = e) {
        let l = new eK(e, n, r),
          a =
            "function" == typeof t
              ? t({
                  bigint: d,
                  bigserial: y,
                  boolean: b.zM,
                  char: w.Tp,
                  cidr: $,
                  customType: T,
                  date: x.p6,
                  doublePrecision: C,
                  inet: L,
                  integer: j.nd,
                  interval: V,
                  json: z.Pq,
                  jsonb: F.Fx,
                  line: _,
                  macaddr: J,
                  macaddr8: H,
                  numeric: Y.sH,
                  point: et,
                  geometry: eo,
                  real: eh,
                  serial: em,
                  smallint: ey,
                  smallserial: eS,
                  text: ev.Qq,
                  time: e$.kB,
                  timestamp: eP.vE,
                  uuid: eN.uR,
                  varchar: eT.yf,
                  bit: eD,
                  halfvec: eO,
                  sparsevec: eB,
                  vector: ez,
                })
              : t,
          o = Object.fromEntries(
            Object.entries(a).map(([e, t]) => {
              t.setName(e);
              let i = t.build(l);
              return l[eF].push(...t.buildForeignKeys(i, l)), [e, i];
            }),
          ),
          u = Object.fromEntries(
            Object.entries(a).map(
              ([e, t]) => (t.setName(e), [e, t.buildExtraConfigColumn(l)]),
            ),
          ),
          c = Object.assign(l, o);
        return (
          (c[s.XI.Symbol.Columns] = o),
          (c[s.XI.Symbol.ExtraConfigColumns] = u),
          i && (c[eK.Symbol.ExtraConfigBuilder] = i),
          Object.assign(c, {
            enableRLS: () => ((c[eK.Symbol.EnableRLS] = !0), c),
          })
        );
      }
      let ek = (e, t, i) => eE(e, t, i, void 0);
    },
    41599: (e, t, i) => {
      i.d(t, { Z5: () => a, sH: () => o });
      var n = i(22321),
        s = i(73653),
        r = i(62508);
      class l extends r.pe {
        static [n.i] = "PgNumericBuilder";
        constructor(e, t, i) {
          super(e, "string", "PgNumeric"),
            (this.config.precision = t),
            (this.config.scale = i);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends r.Kl {
        static [n.i] = "PgNumeric";
        precision;
        scale;
        constructor(e, t) {
          super(e, t), (this.precision = t.precision), (this.scale = t.scale);
        }
        getSQLType() {
          return void 0 !== this.precision && void 0 !== this.scale
            ? `numeric(${this.precision}, ${this.scale})`
            : void 0 === this.precision
              ? "numeric"
              : `numeric(${this.precision})`;
        }
      }
      function o(e, t) {
        let { name: i, config: n } = (0, s.Ll)(e, t);
        return new l(i, n?.precision, n?.scale);
      }
    },
    42476: (e, t, i) => {
      i.d(t, {
        AU: () => d,
        B3: () => q,
        KJ: () => $,
        KL: () => b,
        Pe: () => S,
        RK: () => x,
        RO: () => m,
        RV: () => y,
        Tq: () => P,
        Uo: () => c,
        eq: () => o,
        gt: () => f,
        kZ: () => w,
        lt: () => g,
        mj: () => T,
        ne: () => u,
        o8: () => N,
        or: () => h,
        q1: () => D,
        t2: () => v,
        wJ: () => p,
      });
      var n = i(49361),
        s = i(79396),
        r = i(32283),
        l = i(65830);
      function a(e, t) {
        return !(0, l.eG)(t) ||
          (0, l.qt)(e) ||
          (0, s.is)(e, l.Iw) ||
          (0, s.is)(e, l.Or) ||
          (0, s.is)(e, n.V) ||
          (0, s.is)(e, r.XI) ||
          (0, s.is)(e, l.Ss)
          ? e
          : new l.Iw(e, t);
      }
      let o = (e, t) => (0, l.ll)`${e} = ${a(t, e)}`,
        u = (e, t) => (0, l.ll)`${e} <> ${a(t, e)}`;
      function c(...e) {
        let t = e.filter((e) => void 0 !== e);
        if (0 !== t.length)
          return new l.Xs(
            1 === t.length
              ? t
              : [new l.DJ("("), l.ll.join(t, new l.DJ(" and ")), new l.DJ(")")],
          );
      }
      function h(...e) {
        let t = e.filter((e) => void 0 !== e);
        if (0 !== t.length)
          return new l.Xs(
            1 === t.length
              ? t
              : [new l.DJ("("), l.ll.join(t, new l.DJ(" or ")), new l.DJ(")")],
          );
      }
      function d(e) {
        return (0, l.ll)`not ${e}`;
      }
      let f = (e, t) => (0, l.ll)`${e} > ${a(t, e)}`,
        m = (e, t) => (0, l.ll)`${e} >= ${a(t, e)}`,
        g = (e, t) => (0, l.ll)`${e} < ${a(t, e)}`,
        p = (e, t) => (0, l.ll)`${e} <= ${a(t, e)}`;
      function y(e, t) {
        return Array.isArray(t)
          ? 0 === t.length
            ? (0, l.ll)`false`
            : (0, l.ll)`${e} in ${t.map((t) => a(t, e))}`
          : (0, l.ll)`${e} in ${a(t, e)}`;
      }
      function b(e, t) {
        return Array.isArray(t)
          ? 0 === t.length
            ? (0, l.ll)`true`
            : (0, l.ll)`${e} not in ${t.map((t) => a(t, e))}`
          : (0, l.ll)`${e} not in ${a(t, e)}`;
      }
      function w(e) {
        return (0, l.ll)`${e} is null`;
      }
      function S(e) {
        return (0, l.ll)`${e} is not null`;
      }
      function v(e) {
        return (0, l.ll)`exists ${e}`;
      }
      function $(e) {
        return (0, l.ll)`not exists ${e}`;
      }
      function P(e, t, i) {
        return (0, l.ll)`${e} between ${a(t, e)} and ${a(i, e)}`;
      }
      function N(e, t, i) {
        return (0, l.ll)`${e} not between ${a(t, e)} and ${a(i, e)}`;
      }
      function T(e, t) {
        return (0, l.ll)`${e} like ${t}`;
      }
      function x(e, t) {
        return (0, l.ll)`${e} not like ${t}`;
      }
      function q(e, t) {
        return (0, l.ll)`${e} ilike ${t}`;
      }
      function D(e, t) {
        return (0, l.ll)`${e} not ilike ${t}`;
      }
    },
    42700: (e, t, i) => {
      i.d(t, { Pq: () => a, iX: () => l });
      var n = i(22321),
        s = i(62508);
      class r extends s.pe {
        static [n.i] = "PgJsonBuilder";
        constructor(e) {
          super(e, "json", "PgJson");
        }
        build(e) {
          return new l(e, this.config);
        }
      }
      class l extends s.Kl {
        static [n.i] = "PgJson";
        constructor(e, t) {
          super(e, t);
        }
        getSQLType() {
          return "json";
        }
        mapToDriverValue(e) {
          return JSON.stringify(e);
        }
        mapFromDriverValue(e) {
          if ("string" == typeof e)
            try {
              return JSON.parse(e);
            } catch {}
          return e;
        }
      }
      function a(e) {
        return new r(e ?? "");
      }
    },
    44444: (e, t, i) => {
      i.d(t, { Fx: () => a, kn: () => l });
      var n = i(22321),
        s = i(62508);
      class r extends s.pe {
        static [n.i] = "PgJsonbBuilder";
        constructor(e) {
          super(e, "json", "PgJsonb");
        }
        build(e) {
          return new l(e, this.config);
        }
      }
      class l extends s.Kl {
        static [n.i] = "PgJsonb";
        constructor(e, t) {
          super(e, t);
        }
        getSQLType() {
          return "jsonb";
        }
        mapToDriverValue(e) {
          return JSON.stringify(e);
        }
        mapFromDriverValue(e) {
          if ("string" == typeof e)
            try {
              return JSON.parse(e);
            } catch {}
          return e;
        }
      }
      function a(e) {
        return new r(e ?? "");
      }
    },
    45887: (e, t, i) => {
      i.d(t, { Kl: () => p, pe: () => g });
      var n = i(79396);
      class s {
        static [n.i] = "ColumnBuilder";
        config;
        constructor(e, t, i) {
          this.config = {
            name: e,
            keyAsName: "" === e,
            notNull: !1,
            default: void 0,
            hasDefault: !1,
            primaryKey: !1,
            isUnique: !1,
            uniqueName: void 0,
            uniqueType: void 0,
            dataType: t,
            columnType: i,
            generated: void 0,
          };
        }
        $type() {
          return this;
        }
        notNull() {
          return (this.config.notNull = !0), this;
        }
        default(e) {
          return (this.config.default = e), (this.config.hasDefault = !0), this;
        }
        $defaultFn(e) {
          return (
            (this.config.defaultFn = e), (this.config.hasDefault = !0), this
          );
        }
        $default = this.$defaultFn;
        $onUpdateFn(e) {
          return (
            (this.config.onUpdateFn = e), (this.config.hasDefault = !0), this
          );
        }
        $onUpdate = this.$onUpdateFn;
        primaryKey() {
          return (
            (this.config.primaryKey = !0), (this.config.notNull = !0), this
          );
        }
        setName(e) {
          "" === this.config.name && (this.config.name = e);
        }
      }
      var r = i(49361),
        l = i(67236);
      class a {
        static [n.i] = "PgForeignKeyBuilder";
        reference;
        _onUpdate = "no action";
        _onDelete = "no action";
        constructor(e, t) {
          (this.reference = () => {
            let { name: t, columns: i, foreignColumns: n } = e();
            return {
              name: t,
              columns: i,
              foreignTable: n[0].table,
              foreignColumns: n,
            };
          }),
            t && ((this._onUpdate = t.onUpdate), (this._onDelete = t.onDelete));
        }
        onUpdate(e) {
          return (this._onUpdate = void 0 === e ? "no action" : e), this;
        }
        onDelete(e) {
          return (this._onDelete = void 0 === e ? "no action" : e), this;
        }
        build(e) {
          return new o(e, this);
        }
      }
      class o {
        constructor(e, t) {
          (this.table = e),
            (this.reference = t.reference),
            (this.onUpdate = t._onUpdate),
            (this.onDelete = t._onDelete);
        }
        static [n.i] = "PgForeignKey";
        reference;
        onUpdate;
        onDelete;
        getName() {
          let { name: e, columns: t, foreignColumns: i } = this.reference(),
            n = t.map((e) => e.name),
            s = i.map((e) => e.name),
            r = [this.table[l.E], ...n, i[0].table[l.E], ...s];
          return e ?? `${r.join("_")}_fk`;
        }
      }
      var u = i(98389);
      function c(e, t) {
        return `${e[l.E]}_${t.join("_")}_unique`;
      }
      class h {
        constructor(e, t) {
          (this.name = t), (this.columns = e);
        }
        static [n.i] = null;
        columns;
        nullsNotDistinctConfig = !1;
        nullsNotDistinct() {
          return (this.nullsNotDistinctConfig = !0), this;
        }
        build(e) {
          return new f(e, this.columns, this.nullsNotDistinctConfig, this.name);
        }
      }
      class d {
        static [n.i] = null;
        name;
        constructor(e) {
          this.name = e;
        }
        on(...e) {
          return new h(e, this.name);
        }
      }
      class f {
        constructor(e, t, i, n) {
          (this.table = e),
            (this.columns = t),
            (this.name =
              n ??
              c(
                this.table,
                this.columns.map((e) => e.name),
              )),
            (this.nullsNotDistinct = i);
        }
        static [n.i] = null;
        columns;
        name;
        nullsNotDistinct = !1;
        getName() {
          return this.name;
        }
      }
      function m(e, t, i) {
        for (let n = t; n < e.length; n++) {
          let s = e[n];
          if ("\\" === s) {
            n++;
            continue;
          }
          if ('"' === s) return [e.slice(t, n).replace(/\\/g, ""), n + 1];
          if (!i && ("," === s || "}" === s))
            return [e.slice(t, n).replace(/\\/g, ""), n];
        }
        return [e.slice(t).replace(/\\/g, ""), e.length];
      }
      class g extends s {
        foreignKeyConfigs = [];
        static [n.i] = "PgColumnBuilder";
        array(e) {
          return new w(this.config.name, this, e);
        }
        references(e, t = {}) {
          return this.foreignKeyConfigs.push({ ref: e, actions: t }), this;
        }
        unique(e, t) {
          return (
            (this.config.isUnique = !0),
            (this.config.uniqueName = e),
            (this.config.uniqueType = t?.nulls),
            this
          );
        }
        generatedAlwaysAs(e) {
          return (
            (this.config.generated = { as: e, type: "always", mode: "stored" }),
            this
          );
        }
        buildForeignKeys(e, t) {
          return this.foreignKeyConfigs.map(({ ref: i, actions: n }) =>
            (0, u.i)(
              (i, n) => {
                let s = new a(() => ({ columns: [e], foreignColumns: [i()] }));
                return (
                  n.onUpdate && s.onUpdate(n.onUpdate),
                  n.onDelete && s.onDelete(n.onDelete),
                  s.build(t)
                );
              },
              i,
              n,
            ),
          );
        }
        buildExtraConfigColumn(e) {
          return new y(e, this.config);
        }
      }
      class p extends r.V {
        constructor(e, t) {
          t.uniqueName || (t.uniqueName = c(e, [t.name])),
            super(e, t),
            (this.table = e);
        }
        static [n.i] = "PgColumn";
      }
      class y extends p {
        static [n.i] = "ExtraConfigColumn";
        getSQLType() {
          return this.getSQLType();
        }
        indexConfig = {
          order: this.config.order ?? "asc",
          nulls: this.config.nulls ?? "last",
          opClass: this.config.opClass,
        };
        defaultConfig = { order: "asc", nulls: "last", opClass: void 0 };
        asc() {
          return (this.indexConfig.order = "asc"), this;
        }
        desc() {
          return (this.indexConfig.order = "desc"), this;
        }
        nullsFirst() {
          return (this.indexConfig.nulls = "first"), this;
        }
        nullsLast() {
          return (this.indexConfig.nulls = "last"), this;
        }
        op(e) {
          return (this.indexConfig.opClass = e), this;
        }
      }
      class b {
        static [n.i] = null;
        constructor(e, t, i, n) {
          (this.name = e),
            (this.keyAsName = t),
            (this.type = i),
            (this.indexConfig = n);
        }
        name;
        keyAsName;
        type;
        indexConfig;
      }
      class w extends g {
        static [n.i] = "PgArrayBuilder";
        constructor(e, t, i) {
          super(e, "array", "PgArray"),
            (this.config.baseBuilder = t),
            (this.config.size = i);
        }
        build(e) {
          let t = this.config.baseBuilder.build(e);
          return new S(e, this.config, t);
        }
      }
      class S extends p {
        constructor(e, t, i, n) {
          super(e, t),
            (this.baseColumn = i),
            (this.range = n),
            (this.size = t.size);
        }
        size;
        static [n.i] = "PgArray";
        getSQLType() {
          return `${this.baseColumn.getSQLType()}[${"number" == typeof this.size ? this.size : ""}]`;
        }
        mapFromDriverValue(e) {
          return (
            "string" == typeof e &&
              (e = (function (e) {
                let [t] = (function e(t, i = 0) {
                  let n = [],
                    s = i,
                    r = !1;
                  for (; s < t.length; ) {
                    let l = t[s];
                    if ("," === l) {
                      (r || s === i) && n.push(""), (r = !0), s++;
                      continue;
                    }
                    if (((r = !1), "\\" === l)) {
                      s += 2;
                      continue;
                    }
                    if ('"' === l) {
                      let [e, i] = m(t, s + 1, !0);
                      n.push(e), (s = i);
                      continue;
                    }
                    if ("}" === l) return [n, s + 1];
                    if ("{" === l) {
                      let [i, r] = e(t, s + 1);
                      n.push(i), (s = r);
                      continue;
                    }
                    let [a, o] = m(t, s, !1);
                    n.push(a), (s = o);
                  }
                  return [n, s];
                })(e, 1);
                return t;
              })(e)),
            e.map((e) => this.baseColumn.mapFromDriverValue(e))
          );
        }
        mapToDriverValue(e, t = !1) {
          let i = e.map((e) =>
            null === e
              ? null
              : (0, n.is)(this.baseColumn, S)
                ? this.baseColumn.mapToDriverValue(e, !0)
                : this.baseColumn.mapToDriverValue(e),
          );
          return t
            ? i
            : (function e(t) {
                return `{${t.map((t) => (Array.isArray(t) ? e(t) : "string" == typeof t ? `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${t}`)).join(",")}}`;
              })(i);
        }
      }
    },
    47161: (e, t, i) => {
      i.d(t, { Am: () => r, Wx: () => l });
      var n = i(22321),
        s = i(96019);
      function r(e) {
        return new o(e);
      }
      function l(e, t) {
        return `${e[s.E]}_${t.join("_")}_unique`;
      }
      class a {
        constructor(e, t) {
          (this.name = t), (this.columns = e);
        }
        static [n.i] = "PgUniqueConstraintBuilder";
        columns;
        nullsNotDistinctConfig = !1;
        nullsNotDistinct() {
          return (this.nullsNotDistinctConfig = !0), this;
        }
        build(e) {
          return new u(e, this.columns, this.nullsNotDistinctConfig, this.name);
        }
      }
      class o {
        static [n.i] = "PgUniqueOnConstraintBuilder";
        name;
        constructor(e) {
          this.name = e;
        }
        on(...e) {
          return new a(e, this.name);
        }
      }
      class u {
        constructor(e, t, i, n) {
          (this.table = e),
            (this.columns = t),
            (this.name =
              n ??
              l(
                this.table,
                this.columns.map((e) => e.name),
              )),
            (this.nullsNotDistinct = i);
        }
        static [n.i] = "PgUniqueConstraint";
        columns;
        name;
        nullsNotDistinct = !1;
        getName() {
          return this.name;
        }
      }
    },
    48645: (e, t, i) => {
      i.d(t, { Qq: () => o });
      var n = i(22321),
        s = i(73653),
        r = i(62508);
      class l extends r.pe {
        static [n.i] = "PgTextBuilder";
        constructor(e, t) {
          super(e, "string", "PgText"), (this.config.enumValues = t.enum);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends r.Kl {
        static [n.i] = "PgText";
        enumValues = this.config.enumValues;
        getSQLType() {
          return "text";
        }
      }
      function o(e, t = {}) {
        let { name: i, config: n } = (0, s.Ll)(e, t);
        return new l(i, n);
      }
    },
    49361: (e, t, i) => {
      i.d(t, { V: () => s });
      var n = i(79396);
      class s {
        constructor(e, t) {
          (this.table = e),
            (this.config = t),
            (this.name = t.name),
            (this.keyAsName = t.keyAsName),
            (this.notNull = t.notNull),
            (this.default = t.default),
            (this.defaultFn = t.defaultFn),
            (this.onUpdateFn = t.onUpdateFn),
            (this.hasDefault = t.hasDefault),
            (this.primary = t.primaryKey),
            (this.isUnique = t.isUnique),
            (this.uniqueName = t.uniqueName),
            (this.uniqueType = t.uniqueType),
            (this.dataType = t.dataType),
            (this.columnType = t.columnType),
            (this.generated = t.generated),
            (this.generatedIdentity = t.generatedIdentity);
        }
        static [n.i] = "Column";
        name;
        keyAsName;
        primary;
        notNull;
        default;
        defaultFn;
        onUpdateFn;
        hasDefault;
        isUnique;
        uniqueName;
        uniqueType;
        dataType;
        columnType;
        enumValues = void 0;
        generated = void 0;
        generatedIdentity = void 0;
        config;
        mapFromDriverValue(e) {
          return e;
        }
        mapToDriverValue(e) {
          return e;
        }
        shouldDisableInsert() {
          return (
            void 0 !== this.config.generated &&
            "byDefault" !== this.config.generated.type
          );
        }
      }
    },
    55190: (e, t, i) => {
      i.d(t, { nd: () => o });
      var n = i(22321),
        s = i(62508),
        r = i(39258);
      class l extends r.p {
        static [n.i] = "PgIntegerBuilder";
        constructor(e) {
          super(e, "number", "PgInteger");
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends s.Kl {
        static [n.i] = "PgInteger";
        getSQLType() {
          return "integer";
        }
        mapFromDriverValue(e) {
          return "string" == typeof e ? Number.parseInt(e) : e;
        }
      }
      function o(e) {
        return new l(e ?? "");
      }
    },
    58560: (e, t, i) => {
      i.d(t, { V: () => s });
      var n = i(22321);
      class s {
        constructor(e, t) {
          (this.table = e),
            (this.config = t),
            (this.name = t.name),
            (this.keyAsName = t.keyAsName),
            (this.notNull = t.notNull),
            (this.default = t.default),
            (this.defaultFn = t.defaultFn),
            (this.onUpdateFn = t.onUpdateFn),
            (this.hasDefault = t.hasDefault),
            (this.primary = t.primaryKey),
            (this.isUnique = t.isUnique),
            (this.uniqueName = t.uniqueName),
            (this.uniqueType = t.uniqueType),
            (this.dataType = t.dataType),
            (this.columnType = t.columnType),
            (this.generated = t.generated),
            (this.generatedIdentity = t.generatedIdentity);
        }
        static [n.i] = "Column";
        name;
        keyAsName;
        primary;
        notNull;
        default;
        defaultFn;
        onUpdateFn;
        hasDefault;
        isUnique;
        uniqueName;
        uniqueType;
        dataType;
        columnType;
        enumValues = void 0;
        generated = void 0;
        generatedIdentity = void 0;
        config;
        mapFromDriverValue(e) {
          return e;
        }
        mapToDriverValue(e) {
          return e;
        }
        shouldDisableInsert() {
          return (
            void 0 !== this.config.generated &&
            "byDefault" !== this.config.generated.type
          );
        }
      }
    },
    60529: (e, t, i) => {
      i.d(t, { BE: () => r, mt: () => a });
      var n = i(22321),
        s = i(96019);
      class r {
        static [n.i] = "PgForeignKeyBuilder";
        reference;
        _onUpdate = "no action";
        _onDelete = "no action";
        constructor(e, t) {
          (this.reference = () => {
            let { name: t, columns: i, foreignColumns: n } = e();
            return {
              name: t,
              columns: i,
              foreignTable: n[0].table,
              foreignColumns: n,
            };
          }),
            t && ((this._onUpdate = t.onUpdate), (this._onDelete = t.onDelete));
        }
        onUpdate(e) {
          return (this._onUpdate = void 0 === e ? "no action" : e), this;
        }
        onDelete(e) {
          return (this._onDelete = void 0 === e ? "no action" : e), this;
        }
        build(e) {
          return new l(e, this);
        }
      }
      class l {
        constructor(e, t) {
          (this.table = e),
            (this.reference = t.reference),
            (this.onUpdate = t._onUpdate),
            (this.onDelete = t._onDelete);
        }
        static [n.i] = "PgForeignKey";
        reference;
        onUpdate;
        onDelete;
        getName() {
          let { name: e, columns: t, foreignColumns: i } = this.reference(),
            n = t.map((e) => e.name),
            r = i.map((e) => e.name),
            l = [this.table[s.E], ...n, i[0].table[s.E], ...r];
          return e ?? `${l.join("_")}_fk`;
        }
      }
      function a(e) {
        return new r(function () {
          let { name: t, columns: i, foreignColumns: n } = e;
          return { name: t, columns: i, foreignColumns: n };
        });
      }
    },
    62508: (e, t, i) => {
      i.d(t, { ae: () => f, Kl: () => h, pe: () => c });
      var n = i(77042),
        s = i(58560),
        r = i(22321),
        l = i(60529),
        a = i(666),
        o = i(47161);
      function u(e, t, i) {
        for (let n = t; n < e.length; n++) {
          let s = e[n];
          if ("\\" === s) {
            n++;
            continue;
          }
          if ('"' === s) return [e.slice(t, n).replace(/\\/g, ""), n + 1];
          if (!i && ("," === s || "}" === s))
            return [e.slice(t, n).replace(/\\/g, ""), n];
        }
        return [e.slice(t).replace(/\\/g, ""), e.length];
      }
      class c extends n.Q {
        foreignKeyConfigs = [];
        static [r.i] = "PgColumnBuilder";
        array(e) {
          return new m(this.config.name, this, e);
        }
        references(e, t = {}) {
          return this.foreignKeyConfigs.push({ ref: e, actions: t }), this;
        }
        unique(e, t) {
          return (
            (this.config.isUnique = !0),
            (this.config.uniqueName = e),
            (this.config.uniqueType = t?.nulls),
            this
          );
        }
        generatedAlwaysAs(e) {
          return (
            (this.config.generated = { as: e, type: "always", mode: "stored" }),
            this
          );
        }
        buildForeignKeys(e, t) {
          return this.foreignKeyConfigs.map(({ ref: i, actions: n }) =>
            (0, a.i)(
              (i, n) => {
                let s = new l.BE(() => ({
                  columns: [e],
                  foreignColumns: [i()],
                }));
                return (
                  n.onUpdate && s.onUpdate(n.onUpdate),
                  n.onDelete && s.onDelete(n.onDelete),
                  s.build(t)
                );
              },
              i,
              n,
            ),
          );
        }
        buildExtraConfigColumn(e) {
          return new d(e, this.config);
        }
      }
      class h extends s.V {
        constructor(e, t) {
          t.uniqueName || (t.uniqueName = (0, o.Wx)(e, [t.name])),
            super(e, t),
            (this.table = e);
        }
        static [r.i] = "PgColumn";
      }
      class d extends h {
        static [r.i] = "ExtraConfigColumn";
        getSQLType() {
          return this.getSQLType();
        }
        indexConfig = {
          order: this.config.order ?? "asc",
          nulls: this.config.nulls ?? "last",
          opClass: this.config.opClass,
        };
        defaultConfig = { order: "asc", nulls: "last", opClass: void 0 };
        asc() {
          return (this.indexConfig.order = "asc"), this;
        }
        desc() {
          return (this.indexConfig.order = "desc"), this;
        }
        nullsFirst() {
          return (this.indexConfig.nulls = "first"), this;
        }
        nullsLast() {
          return (this.indexConfig.nulls = "last"), this;
        }
        op(e) {
          return (this.indexConfig.opClass = e), this;
        }
      }
      class f {
        static [r.i] = "IndexedColumn";
        constructor(e, t, i, n) {
          (this.name = e),
            (this.keyAsName = t),
            (this.type = i),
            (this.indexConfig = n);
        }
        name;
        keyAsName;
        type;
        indexConfig;
      }
      class m extends c {
        static [r.i] = "PgArrayBuilder";
        constructor(e, t, i) {
          super(e, "array", "PgArray"),
            (this.config.baseBuilder = t),
            (this.config.size = i);
        }
        build(e) {
          let t = this.config.baseBuilder.build(e);
          return new g(e, this.config, t);
        }
      }
      class g extends h {
        constructor(e, t, i, n) {
          super(e, t),
            (this.baseColumn = i),
            (this.range = n),
            (this.size = t.size);
        }
        size;
        static [r.i] = "PgArray";
        getSQLType() {
          return `${this.baseColumn.getSQLType()}[${"number" == typeof this.size ? this.size : ""}]`;
        }
        mapFromDriverValue(e) {
          return (
            "string" == typeof e &&
              (e = (function (e) {
                let [t] = (function e(t, i = 0) {
                  let n = [],
                    s = i,
                    r = !1;
                  for (; s < t.length; ) {
                    let l = t[s];
                    if ("," === l) {
                      (r || s === i) && n.push(""), (r = !0), s++;
                      continue;
                    }
                    if (((r = !1), "\\" === l)) {
                      s += 2;
                      continue;
                    }
                    if ('"' === l) {
                      let [e, i] = u(t, s + 1, !0);
                      n.push(e), (s = i);
                      continue;
                    }
                    if ("}" === l) return [n, s + 1];
                    if ("{" === l) {
                      let [i, r] = e(t, s + 1);
                      n.push(i), (s = r);
                      continue;
                    }
                    let [a, o] = u(t, s, !1);
                    n.push(a), (s = o);
                  }
                  return [n, s];
                })(e, 1);
                return t;
              })(e)),
            e.map((e) => this.baseColumn.mapFromDriverValue(e))
          );
        }
        mapToDriverValue(e, t = !1) {
          let i = e.map((e) =>
            null === e
              ? null
              : (0, r.is)(this.baseColumn, g)
                ? this.baseColumn.mapToDriverValue(e, !0)
                : this.baseColumn.mapToDriverValue(e),
          );
          return t
            ? i
            : (function e(t) {
                return `{${t.map((t) => (Array.isArray(t) ? e(t) : "string" == typeof t ? `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"` : `${t}`)).join(",")}}`;
              })(i);
        }
      }
    },
    63721: (e, t, i) => {
      i.d(t, { D6: () => P });
      var n = i(22321),
        s = i(4595),
        r = i(37671);
      class l {
        constructor(e, t, i) {
          (this.seqName = e), (this.seqOptions = t), (this.schema = i);
        }
        static [n.i] = "PgSequence";
      }
      var a = i(40128),
        o = i(65807),
        u = i(73653),
        c = i(97236),
        h = i(7061);
      let d = Symbol.for("drizzle:PgViewConfig");
      class f {
        constructor(e, t) {
          (this.name = e), (this.schema = t);
        }
        static [n.i] = "PgDefaultViewBuilderCore";
        config = {};
        with(e) {
          return (this.config.with = e), this;
        }
      }
      class m extends f {
        static [n.i] = "PgViewBuilder";
        as(e) {
          "function" == typeof e && (e = e(new c.o()));
          let t = new o.b({
              alias: this.name,
              sqlBehavior: "error",
              sqlAliasedBehavior: "alias",
              replaceOriginalName: !0,
            }),
            i = new Proxy(e.getSelectedFields(), t);
          return new Proxy(
            new w({
              pgConfig: this.config,
              config: {
                name: this.name,
                schema: this.schema,
                selectedFields: i,
                query: e.getSQL().inlineParams(),
              },
            }),
            t,
          );
        }
      }
      class g extends f {
        static [n.i] = "PgManualViewBuilder";
        columns;
        constructor(e, t, i) {
          super(e, i), (this.columns = (0, u.YD)((0, a.cJ)(e, t)));
        }
        existing() {
          return new Proxy(
            new w({
              pgConfig: void 0,
              config: {
                name: this.name,
                schema: this.schema,
                selectedFields: this.columns,
                query: void 0,
              },
            }),
            new o.b({
              alias: this.name,
              sqlBehavior: "error",
              sqlAliasedBehavior: "alias",
              replaceOriginalName: !0,
            }),
          );
        }
        as(e) {
          return new Proxy(
            new w({
              pgConfig: this.config,
              config: {
                name: this.name,
                schema: this.schema,
                selectedFields: this.columns,
                query: e.inlineParams(),
              },
            }),
            new o.b({
              alias: this.name,
              sqlBehavior: "error",
              sqlAliasedBehavior: "alias",
              replaceOriginalName: !0,
            }),
          );
        }
      }
      class p {
        constructor(e, t) {
          (this.name = e), (this.schema = t);
        }
        static [n.i] = "PgMaterializedViewBuilderCore";
        config = {};
        using(e) {
          return (this.config.using = e), this;
        }
        with(e) {
          return (this.config.with = e), this;
        }
        tablespace(e) {
          return (this.config.tablespace = e), this;
        }
        withNoData() {
          return (this.config.withNoData = !0), this;
        }
      }
      class y extends p {
        static [n.i] = "PgMaterializedViewBuilder";
        as(e) {
          "function" == typeof e && (e = e(new c.o()));
          let t = new o.b({
              alias: this.name,
              sqlBehavior: "error",
              sqlAliasedBehavior: "alias",
              replaceOriginalName: !0,
            }),
            i = new Proxy(e.getSelectedFields(), t);
          return new Proxy(
            new v({
              pgConfig: {
                with: this.config.with,
                using: this.config.using,
                tablespace: this.config.tablespace,
                withNoData: this.config.withNoData,
              },
              config: {
                name: this.name,
                schema: this.schema,
                selectedFields: i,
                query: e.getSQL().inlineParams(),
              },
            }),
            t,
          );
        }
      }
      class b extends p {
        static [n.i] = "PgManualMaterializedViewBuilder";
        columns;
        constructor(e, t, i) {
          super(e, i), (this.columns = (0, u.YD)((0, a.cJ)(e, t)));
        }
        existing() {
          return new Proxy(
            new v({
              pgConfig: {
                tablespace: this.config.tablespace,
                using: this.config.using,
                with: this.config.with,
                withNoData: this.config.withNoData,
              },
              config: {
                name: this.name,
                schema: this.schema,
                selectedFields: this.columns,
                query: void 0,
              },
            }),
            new o.b({
              alias: this.name,
              sqlBehavior: "error",
              sqlAliasedBehavior: "alias",
              replaceOriginalName: !0,
            }),
          );
        }
        as(e) {
          return new Proxy(
            new v({
              pgConfig: {
                tablespace: this.config.tablespace,
                using: this.config.using,
                with: this.config.with,
                withNoData: this.config.withNoData,
              },
              config: {
                name: this.name,
                schema: this.schema,
                selectedFields: this.columns,
                query: e.inlineParams(),
              },
            }),
            new o.b({
              alias: this.name,
              sqlBehavior: "error",
              sqlAliasedBehavior: "alias",
              replaceOriginalName: !0,
            }),
          );
        }
      }
      class w extends h.w {
        static [n.i] = "PgView";
        [d];
        constructor({ pgConfig: e, config: t }) {
          super(t), e && (this[d] = { with: e.with });
        }
      }
      let S = Symbol.for("drizzle:PgMaterializedViewConfig");
      class v extends h.w {
        static [n.i] = "PgMaterializedView";
        [S];
        constructor({ pgConfig: e, config: t }) {
          super(t),
            (this[S] = {
              with: e?.with,
              using: e?.using,
              tablespace: e?.tablespace,
              withNoData: e?.withNoData,
            });
        }
      }
      class $ {
        constructor(e) {
          this.schemaName = e;
        }
        static [n.i] = "PgSchema";
        table = (e, t, i) => (0, a.fm)(e, t, i, this.schemaName);
        view = (e, t) =>
          (function (e, t, i) {
            return t ? new g(e, t, i) : new m(e, i);
          })(e, t, this.schemaName);
        materializedView = (e, t) =>
          (function (e, t, i) {
            return t ? new b(e, t, i) : new y(e, i);
          })(e, t, this.schemaName);
        enum = (e, t) => (0, r.m7)(e, t, this.schemaName);
        sequence = (e, t) => new l(e, t, this.schemaName);
        getSQL() {
          return new s.Xs([s.ll.identifier(this.schemaName)]);
        }
        shouldOmitSQLParens() {
          return !0;
        }
      }
      function P(e) {
        if ("public" === e)
          throw Error(
            "You can't specify 'public' as schema name. Postgres is using public schema by default. If you want to use 'public' schema, just use pgTable() instead of creating a schema",
          );
        return new $(e);
      }
    },
    64819: (e, t, i) => {
      i.d(t, { hv: () => l, ie: () => r });
      var n = i(22321),
        s = i(40128);
      function r(...e) {
        return e[0].columns ? new l(e[0].columns, e[0].name) : new l(e);
      }
      class l {
        static [n.i] = "PgPrimaryKeyBuilder";
        columns;
        name;
        constructor(e, t) {
          (this.columns = e), (this.name = t);
        }
        build(e) {
          return new a(e, this.columns, this.name);
        }
      }
      class a {
        constructor(e, t, i) {
          (this.table = e), (this.columns = t), (this.name = i);
        }
        static [n.i] = "PgPrimaryKey";
        columns;
        name;
        getName() {
          return (
            this.name ??
            `${this.table[s.mu.Symbol.Name]}_${this.columns.map((e) => e.name).join("_")}_pk`
          );
        }
      }
    },
    65807: (e, t, i) => {
      i.d(t, { b: () => u });
      var n = i(95248),
        s = i(58560),
        r = i(22321),
        l = i(4595),
        a = i(16988),
        o = i(10765);
      class u {
        static [r.i] = "SelectionProxyHandler";
        config;
        constructor(e) {
          this.config = { ...e };
        }
        get(e, t) {
          if ("_" === t)
            return {
              ...e._,
              selectedFields: new Proxy(e._.selectedFields, this),
            };
          if (t === o.n)
            return {
              ...e[o.n],
              selectedFields: new Proxy(e[o.n].selectedFields, this),
            };
          if ("symbol" == typeof t) return e[t];
          let i = (
            (0, r.is)(e, a.n)
              ? e._.selectedFields
              : (0, r.is)(e, l.Ss)
                ? e[o.n].selectedFields
                : e
          )[t];
          if ((0, r.is)(i, l.Xs.Aliased)) {
            if ("sql" === this.config.sqlAliasedBehavior && !i.isSelectionField)
              return i.sql;
            let e = i.clone();
            return (e.isSelectionField = !0), e;
          }
          if ((0, r.is)(i, l.Xs)) {
            if ("sql" === this.config.sqlBehavior) return i;
            throw Error(
              `You tried to reference "${t}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`,
            );
          }
          return (0, r.is)(i, s.V)
            ? this.config.alias
              ? new Proxy(
                  i,
                  new n.Ht(
                    new Proxy(
                      i.table,
                      new n.h_(
                        this.config.alias,
                        this.config.replaceOriginalName ?? !1,
                      ),
                    ),
                  ),
                )
              : i
            : "object" != typeof i || null === i
              ? i
              : new Proxy(i, new u(this.config));
        }
      }
    },
    65830: (e, t, i) => {
      i.d(t, {
        Iw: () => v,
        Or: () => P,
        Xs: () => p,
        DJ: () => g,
        Ss: () => T,
        Ct: () => N,
        eG: () => b,
        qt: () => m,
        ll: () => $,
      });
      var n = i(79396),
        s = i(45887);
      let r = Symbol.for("drizzle:isPgEnum");
      class l extends s.pe {
        static [n.i] = "PgEnumColumnBuilder";
        constructor(e, t) {
          super(e, "string", "PgEnumColumn"), (this.config.enum = t);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends s.Kl {
        static [n.i] = "PgEnumColumn";
        enum = this.config.enum;
        enumValues = this.config.enum.enumValues;
        constructor(e, t) {
          super(e, t), (this.enum = t.enum);
        }
        getSQLType() {
          return this.enum.enumName;
        }
      }
      var o = i(66501),
        u = i(25486),
        c = i(86726),
        h = i(49361),
        d = i(32283);
      class f {
        static [n.i] = null;
      }
      function m(e) {
        return null != e && "function" == typeof e.getSQL;
      }
      class g {
        static [n.i] = "StringChunk";
        value;
        constructor(e) {
          this.value = Array.isArray(e) ? e : [e];
        }
        getSQL() {
          return new p([this]);
        }
      }
      class p {
        constructor(e) {
          this.queryChunks = e;
        }
        static [n.i] = "SQL";
        decoder = w;
        shouldInlineParams = !1;
        append(e) {
          return this.queryChunks.push(...e.queryChunks), this;
        }
        toQuery(e) {
          return u.k.startActiveSpan("drizzle.buildSQL", (t) => {
            let i = this.buildQueryFromSourceParams(this.queryChunks, e);
            return (
              t?.setAttributes({
                "drizzle.query.text": i.sql,
                "drizzle.query.params": JSON.stringify(i.params),
              }),
              i
            );
          });
        }
        buildQueryFromSourceParams(e, t) {
          let i = Object.assign({}, t, {
              inlineParams: t.inlineParams || this.shouldInlineParams,
              paramStartIndex: t.paramStartIndex || { value: 0 },
            }),
            {
              casing: s,
              escapeName: l,
              escapeParam: a,
              prepareTyping: u,
              inlineParams: f,
              paramStartIndex: b,
            } = i;
          var w = e.map((e) => {
            if ((0, n.is)(e, g)) return { sql: e.value.join(""), params: [] };
            if ((0, n.is)(e, y)) return { sql: l(e.value), params: [] };
            if (void 0 === e) return { sql: "", params: [] };
            if (Array.isArray(e)) {
              let t = [new g("(")];
              for (let [i, n] of e.entries())
                t.push(n), i < e.length - 1 && t.push(new g(", "));
              return t.push(new g(")")), this.buildQueryFromSourceParams(t, i);
            }
            if ((0, n.is)(e, p))
              return this.buildQueryFromSourceParams(e.queryChunks, {
                ...i,
                inlineParams: f || e.shouldInlineParams,
              });
            if ((0, n.is)(e, d.XI)) {
              let t = e[d.XI.Symbol.Schema],
                i = e[d.XI.Symbol.Name];
              return {
                sql: void 0 === t ? l(i) : l(t) + "." + l(i),
                params: [],
              };
            }
            if ((0, n.is)(e, h.V)) {
              let i = s.getColumnCasing(e);
              return "indexes" === t.invokeSource
                ? { sql: l(i), params: [] }
                : {
                    sql: l(e.table[d.XI.Symbol.Name]) + "." + l(i),
                    params: [],
                  };
            }
            if ((0, n.is)(e, T)) {
              let t = e[c.n].schema,
                i = e[c.n].name;
              return {
                sql: void 0 === t ? l(i) : l(t) + "." + l(i),
                params: [],
              };
            }
            if ((0, n.is)(e, v)) {
              if ((0, n.is)(e.value, P))
                return { sql: a(b.value++, e), params: [e], typings: ["none"] };
              let t =
                null === e.value ? null : e.encoder.mapToDriverValue(e.value);
              if ((0, n.is)(t, p))
                return this.buildQueryFromSourceParams([t], i);
              if (f) return { sql: this.mapInlineParam(t, i), params: [] };
              let s = ["none"];
              return (
                u && (s = [u(e.encoder)]),
                { sql: a(b.value++, t), params: [t], typings: s }
              );
            }
            return (0, n.is)(e, P)
              ? { sql: a(b.value++, e), params: [e], typings: ["none"] }
              : (0, n.is)(e, p.Aliased) && void 0 !== e.fieldAlias
                ? { sql: l(e.fieldAlias), params: [] }
                : (0, n.is)(e, o.n)
                  ? e._.isWith
                    ? { sql: l(e._.alias), params: [] }
                    : this.buildQueryFromSourceParams(
                        [new g("("), e._.sql, new g(") "), new y(e._.alias)],
                        i,
                      )
                  : e && "function" == typeof e && r in e && !0 === e[r]
                    ? e.schema
                      ? { sql: l(e.schema) + "." + l(e.enumName), params: [] }
                      : { sql: l(e.enumName), params: [] }
                    : m(e)
                      ? e.shouldOmitSQLParens?.()
                        ? this.buildQueryFromSourceParams([e.getSQL()], i)
                        : this.buildQueryFromSourceParams(
                            [new g("("), e.getSQL(), new g(")")],
                            i,
                          )
                      : f
                        ? { sql: this.mapInlineParam(e, i), params: [] }
                        : {
                            sql: a(b.value++, e),
                            params: [e],
                            typings: ["none"],
                          };
          });
          let S = { sql: "", params: [] };
          for (let e of w)
            (S.sql += e.sql),
              S.params.push(...e.params),
              e.typings?.length &&
                (S.typings || (S.typings = []), S.typings.push(...e.typings));
          return S;
        }
        mapInlineParam(e, { escapeString: t }) {
          if (null === e) return "null";
          if ("number" == typeof e || "boolean" == typeof e)
            return e.toString();
          if ("string" == typeof e) return t(e);
          if ("object" == typeof e) {
            let i = e.toString();
            return "[object Object]" === i ? t(JSON.stringify(e)) : t(i);
          }
          throw Error("Unexpected param value: " + e);
        }
        getSQL() {
          return this;
        }
        as(e) {
          return void 0 === e ? this : new p.Aliased(this, e);
        }
        mapWith(e) {
          return (
            (this.decoder =
              "function" == typeof e ? { mapFromDriverValue: e } : e),
            this
          );
        }
        inlineParams() {
          return (this.shouldInlineParams = !0), this;
        }
        if(e) {
          return e ? this : void 0;
        }
      }
      class y {
        constructor(e) {
          this.value = e;
        }
        static [n.i] = "Name";
        brand;
        getSQL() {
          return new p([this]);
        }
      }
      function b(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          "mapToDriverValue" in e &&
          "function" == typeof e.mapToDriverValue
        );
      }
      let w = { mapFromDriverValue: (e) => e },
        S = { mapToDriverValue: (e) => e };
      ({ ...w, ...S });
      class v {
        constructor(e, t = S) {
          (this.value = e), (this.encoder = t);
        }
        static [n.i] = "Param";
        brand;
        getSQL() {
          return new p([this]);
        }
      }
      function $(e, ...t) {
        let i = [];
        for (let [n, s] of ((t.length > 0 || (e.length > 0 && "" !== e[0])) &&
          i.push(new g(e[0])),
        t.entries()))
          i.push(s, new g(e[n + 1]));
        return new p(i);
      }
      ((e) => {
        (e.empty = function () {
          return new p([]);
        }),
          (e.fromList = function (e) {
            return new p(e);
          }),
          (e.raw = function (e) {
            return new p([new g(e)]);
          }),
          (e.join = function (e, t) {
            let i = [];
            for (let [n, s] of e.entries())
              n > 0 && void 0 !== t && i.push(t), i.push(s);
            return new p(i);
          }),
          (e.identifier = function (e) {
            return new y(e);
          }),
          (e.placeholder = function (e) {
            return new P(e);
          }),
          (e.param = function (e, t) {
            return new v(e, t);
          });
      })($ || ($ = {})),
        ((e) => {
          class t {
            constructor(e, t) {
              (this.sql = e), (this.fieldAlias = t);
            }
            static [n.i] = "SQL.Aliased";
            isSelectionField = !1;
            getSQL() {
              return this.sql;
            }
            clone() {
              return new t(this.sql, this.fieldAlias);
            }
          }
          e.Aliased = t;
        })(p || (p = {}));
      class P {
        constructor(e) {
          this.name = e;
        }
        static [n.i] = "Placeholder";
        getSQL() {
          return new p([this]);
        }
      }
      function N(e, t) {
        return e.map((e) => {
          if ((0, n.is)(e, P)) {
            if (!(e.name in t))
              throw Error(`No value for placeholder "${e.name}" was provided`);
            return t[e.name];
          }
          if ((0, n.is)(e, v) && (0, n.is)(e.value, P)) {
            if (!(e.value.name in t))
              throw Error(
                `No value for placeholder "${e.value.name}" was provided`,
              );
            return e.encoder.mapToDriverValue(t[e.value.name]);
          }
          return e;
        });
      }
      class T {
        static [n.i] = "View";
        [c.n];
        constructor({ name: e, schema: t, selectedFields: i, query: n }) {
          this[c.n] = {
            name: e,
            originalName: e,
            schema: t,
            selectedFields: i,
            query: n,
            isExisting: !n,
            isAlias: !1,
          };
        }
        getSQL() {
          return new p([this]);
        }
      }
      (h.V.prototype.getSQL = function () {
        return new p([this]);
      }),
        (d.XI.prototype.getSQL = function () {
          return new p([this]);
        }),
        (o.n.prototype.getSQL = function () {
          return new p([this]);
        });
    },
    66501: (e, t, i) => {
      i.d(t, { J: () => r, n: () => s });
      var n = i(79396);
      class s {
        static [n.i] = "Subquery";
        constructor(e, t, i, n = !1) {
          this._ = {
            brand: "Subquery",
            sql: e,
            selectedFields: t,
            alias: i,
            isWith: n,
          };
        }
      }
      class r extends s {
        static [n.i] = "WithSubquery";
      }
    },
    67236: (e, t, i) => {
      i.d(t, { E: () => n });
      let n = Symbol.for("drizzle:Name");
    },
    70923: (e, t, i) => {
      i.d(t, { u: () => l });
      var n = i(22321),
        s = i(4595),
        r = i(62508);
      class l extends r.pe {
        static [n.i] = "PgDateColumnBaseBuilder";
        defaultNow() {
          return this.default((0, s.ll)`now()`);
        }
      }
    },
    73653: (e, t, i) => {
      i.d(t, {
        DV: () => c,
        He: () =>
          function e(t, i) {
            return Object.entries(t).reduce((t, [l, o]) => {
              if ("string" != typeof l) return t;
              let u = i ? [...i, l] : [l];
              return (
                (0, s.is)(o, n.V) ||
                (0, s.is)(o, r.Xs) ||
                (0, s.is)(o, r.Xs.Aliased)
                  ? t.push({ path: u, field: o })
                  : (0, s.is)(o, a.XI)
                    ? t.push(...e(o[a.XI.Symbol.Columns], u))
                    : t.push(...e(o, u)),
                t
              );
            }, []);
          },
        Ll: () => g,
        Lq: () => p,
        XJ: () => d,
        YD: () => f,
        a6: () => u,
        q: () => h,
        zN: () => m,
      });
      var n = i(58560),
        s = i(22321),
        r = i(4595),
        l = i(16988),
        a = i(74696),
        o = i(10765);
      function u(e, t, i) {
        let l = {},
          o = e.reduce((e, { path: o, field: u }, c) => {
            let h;
            h = (0, s.is)(u, n.V)
              ? u
              : (0, s.is)(u, r.Xs)
                ? u.decoder
                : u.sql.decoder;
            let d = e;
            for (let [e, r] of o.entries())
              if (e < o.length - 1) r in d || (d[r] = {}), (d = d[r]);
              else {
                let e = t[c],
                  f = (d[r] = null === e ? null : h.mapFromDriverValue(e));
                if (i && (0, s.is)(u, n.V) && 2 === o.length) {
                  let e = o[0];
                  e in l
                    ? "string" == typeof l[e] &&
                      l[e] !== (0, a.Io)(u.table) &&
                      (l[e] = !1)
                    : (l[e] = null === f && (0, a.Io)(u.table));
                }
              }
            return e;
          }, {});
        if (i && Object.keys(l).length > 0)
          for (let [e, t] of Object.entries(l))
            "string" != typeof t || i[t] || (o[e] = null);
        return o;
      }
      function c(e, t) {
        let i = Object.keys(e),
          n = Object.keys(t);
        if (i.length !== n.length) return !1;
        for (let [e, t] of i.entries()) if (t !== n[e]) return !1;
        return !0;
      }
      function h(e, t) {
        let i = Object.entries(t)
          .filter(([, e]) => void 0 !== e)
          .map(([t, i]) =>
            (0, s.is)(i, r.Xs) || (0, s.is)(i, n.V)
              ? [t, i]
              : [t, new r.Iw(i, e[a.XI.Symbol.Columns][t])],
          );
        if (0 === i.length) throw Error("No values to set");
        return Object.fromEntries(i);
      }
      function d(e, t) {
        for (let i of t)
          for (let t of Object.getOwnPropertyNames(i.prototype))
            "constructor" !== t &&
              Object.defineProperty(
                e.prototype,
                t,
                Object.getOwnPropertyDescriptor(i.prototype, t) ||
                  Object.create(null),
              );
      }
      function f(e) {
        return e[a.XI.Symbol.Columns];
      }
      function m(e) {
        return (0, s.is)(e, l.n)
          ? e._.alias
          : (0, s.is)(e, r.Ss)
            ? e[o.n].name
            : (0, s.is)(e, r.Xs)
              ? void 0
              : e[a.XI.Symbol.IsAlias]
                ? e[a.XI.Symbol.Name]
                : e[a.XI.Symbol.BaseName];
      }
      function g(e, t) {
        return {
          name: "string" == typeof e && e.length > 0 ? e : "",
          config: "object" == typeof e ? e : t,
        };
      }
      function p(e) {
        if (
          "object" != typeof e ||
          null === e ||
          "Object" !== e.constructor.name
        )
          return !1;
        if ("logger" in e) {
          let t = typeof e.logger;
          return (
            "boolean" === t ||
            ("object" === t && "function" == typeof e.logger.logQuery) ||
            "undefined" === t
          );
        }
        if ("schema" in e) {
          let t = typeof e.logger;
          return "object" === t || "undefined" === t;
        }
        if ("casing" in e) {
          let t = typeof e.logger;
          return "string" === t || "undefined" === t;
        }
        if ("mode" in e)
          return (
            "default" === e.mode &&
            "planetscale" === e.mode &&
            void 0 === e.mode
          );
        if ("connection" in e) {
          let t = typeof e.connection;
          return "string" === t || "object" === t || "undefined" === t;
        }
        if ("client" in e) {
          let t = typeof e.client;
          return "object" === t || "function" === t || "undefined" === t;
        }
        return 0 === Object.keys(e).length;
      }
    },
    74696: (e, t, i) => {
      i.d(t, {
        HE: () => c,
        Io: () => m,
        Lf: () => g,
        XI: () => f,
        e: () => l,
      });
      var n = i(22321),
        s = i(96019);
      let r = Symbol.for("drizzle:Schema"),
        l = Symbol.for("drizzle:Columns"),
        a = Symbol.for("drizzle:ExtraConfigColumns"),
        o = Symbol.for("drizzle:OriginalName"),
        u = Symbol.for("drizzle:BaseName"),
        c = Symbol.for("drizzle:IsAlias"),
        h = Symbol.for("drizzle:ExtraConfigBuilder"),
        d = Symbol.for("drizzle:IsDrizzleTable");
      class f {
        static [n.i] = "Table";
        static Symbol = {
          Name: s.E,
          Schema: r,
          OriginalName: o,
          Columns: l,
          ExtraConfigColumns: a,
          BaseName: u,
          IsAlias: c,
          ExtraConfigBuilder: h,
        };
        [s.E];
        [o];
        [r];
        [l];
        [a];
        [u];
        [c] = !1;
        [d] = !0;
        [h] = void 0;
        constructor(e, t, i) {
          (this[s.E] = this[o] = e), (this[r] = t), (this[u] = i);
        }
      }
      function m(e) {
        return e[s.E];
      }
      function g(e) {
        return `${e[r] ?? "public"}.${e[s.E]}`;
      }
    },
    77042: (e, t, i) => {
      i.d(t, { Q: () => s });
      var n = i(22321);
      class s {
        static [n.i] = "ColumnBuilder";
        config;
        constructor(e, t, i) {
          this.config = {
            name: e,
            keyAsName: "" === e,
            notNull: !1,
            default: void 0,
            hasDefault: !1,
            primaryKey: !1,
            isUnique: !1,
            uniqueName: void 0,
            uniqueType: void 0,
            dataType: t,
            columnType: i,
            generated: void 0,
          };
        }
        $type() {
          return this;
        }
        notNull() {
          return (this.config.notNull = !0), this;
        }
        default(e) {
          return (this.config.default = e), (this.config.hasDefault = !0), this;
        }
        $defaultFn(e) {
          return (
            (this.config.defaultFn = e), (this.config.hasDefault = !0), this
          );
        }
        $default = this.$defaultFn;
        $onUpdateFn(e) {
          return (
            (this.config.onUpdateFn = e), (this.config.hasDefault = !0), this
          );
        }
        $onUpdate = this.$onUpdateFn;
        primaryKey() {
          return (
            (this.config.primaryKey = !0), (this.config.notNull = !0), this
          );
        }
        setName(e) {
          "" === this.config.name && (this.config.name = e);
        }
      }
    },
    77963: (e, t, i) => {
      i.d(t, { Xd: () => o, kB: () => u });
      var n = i(22321),
        s = i(73653),
        r = i(62508),
        l = i(70923);
      class a extends l.u {
        constructor(e, t, i) {
          super(e, "string", "PgTime"),
            (this.withTimezone = t),
            (this.precision = i),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        static [n.i] = "PgTimeBuilder";
        build(e) {
          return new o(e, this.config);
        }
      }
      class o extends r.Kl {
        static [n.i] = "PgTime";
        withTimezone;
        precision;
        constructor(e, t) {
          super(e, t),
            (this.withTimezone = t.withTimezone),
            (this.precision = t.precision);
        }
        getSQLType() {
          let e = void 0 === this.precision ? "" : `(${this.precision})`;
          return `time${e}${this.withTimezone ? " with time zone" : ""}`;
        }
      }
      function u(e, t = {}) {
        let { name: i, config: n } = (0, s.Ll)(e, t);
        return new a(i, n.withTimezone ?? !1, n.precision);
      }
    },
    79396: (e, t, i) => {
      i.d(t, { i: () => n, is: () => s });
      let n = Symbol.for("drizzle:entityKind");
      function s(e, t) {
        if (!e || "object" != typeof e) return !1;
        if (e instanceof t) return !0;
        if (!Object.prototype.hasOwnProperty.call(t, n))
          throw Error(
            `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
          );
        let i = e.constructor;
        if (i)
          for (; i; ) {
            if (n in i && i[n] === t[n]) return !0;
            i = Object.getPrototypeOf(i);
          }
        return !1;
      }
      Symbol.for("drizzle:hasOwnEntityKind");
    },
    85532: (e, t, i) => {
      i.d(t, { s: () => D });
      var n = i(95248),
        s = i(22321),
        r = i(74696);
      function l(e) {
        return (
          e
            .replace(/['\u2019]/g, "")
            .match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []
        )
          .map((e) => e.toLowerCase())
          .join("_");
      }
      function a(e) {
        return (
          e
            .replace(/['\u2019]/g, "")
            .match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []
        ).reduce(
          (e, t, i) =>
            e +
            (0 === i ? t.toLowerCase() : `${t[0].toUpperCase()}${t.slice(1)}`),
          "",
        );
      }
      function o(e) {
        return e;
      }
      class u {
        static [s.i] = "CasingCache";
        cache = {};
        cachedTables = {};
        convert;
        constructor(e) {
          this.convert = "snake_case" === e ? l : "camelCase" === e ? a : o;
        }
        getColumnCasing(e) {
          if (!e.keyAsName) return e.name;
          let t = e.table[r.XI.Symbol.Schema] ?? "public",
            i = e.table[r.XI.Symbol.OriginalName],
            n = `${t}.${i}.${e.name}`;
          return this.cache[n] || this.cacheTable(e.table), this.cache[n];
        }
        cacheTable(e) {
          let t = e[r.XI.Symbol.Schema] ?? "public",
            i = e[r.XI.Symbol.OriginalName],
            n = `${t}.${i}`;
          if (!this.cachedTables[n]) {
            for (let t of Object.values(e[r.XI.Symbol.Columns])) {
              let e = `${n}.${t.name}`;
              this.cache[e] = this.convert(t.name);
            }
            this.cachedTables[n] = !0;
          }
        }
        clearCache() {
          (this.cache = {}), (this.cachedTables = {});
        }
      }
      var c = i(58560),
        h = i(90077),
        d = i(62508),
        f = i(44444),
        m = i(42700),
        g = i(41599),
        p = i(77963),
        y = i(98636),
        b = i(5706),
        w = i(38201),
        S = i(40128),
        v = i(19313),
        $ = i(4595),
        P = i(96189),
        N = i(16988),
        T = i(73653),
        x = i(10765),
        q = i(7061);
      class D {
        static [s.i] = "PgDialect";
        casing;
        constructor(e) {
          this.casing = new u(e?.casing);
        }
        async migrate(e, t, i) {
          let n =
              "string" == typeof i
                ? "__drizzle_migrations"
                : (i.migrationsTable ?? "__drizzle_migrations"),
            s =
              "string" == typeof i
                ? "drizzle"
                : (i.migrationsSchema ?? "drizzle"),
            r = (0, $.ll)`
			CREATE TABLE IF NOT EXISTS ${$.ll.identifier(s)}.${$.ll.identifier(n)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
          await t.execute(
            (0, $.ll)`CREATE SCHEMA IF NOT EXISTS ${$.ll.identifier(s)}`,
          ),
            await t.execute(r);
          let l = (
            await t.all(
              (0,
              $.ll)`select id, hash, created_at from ${$.ll.identifier(s)}.${$.ll.identifier(n)} order by created_at desc limit 1`,
            )
          )[0];
          await t.transaction(async (t) => {
            for await (let i of e)
              if (!l || Number(l.created_at) < i.folderMillis) {
                for (let e of i.sql) await t.execute($.ll.raw(e));
                await t.execute(
                  (0,
                  $.ll)`insert into ${$.ll.identifier(s)}.${$.ll.identifier(n)} ("hash", "created_at") values(${i.hash}, ${i.folderMillis})`,
                );
              }
          });
        }
        escapeName(e) {
          return `"${e}"`;
        }
        escapeParam(e) {
          return `$${e + 1}`;
        }
        escapeString(e) {
          return `'${e.replace(/'/g, "''")}'`;
        }
        buildWithCTE(e) {
          if (!e?.length) return;
          let t = [(0, $.ll)`with `];
          for (let [i, n] of e.entries())
            t.push((0, $.ll)`${$.ll.identifier(n._.alias)} as (${n._.sql})`),
              i < e.length - 1 && t.push((0, $.ll)`, `);
          return t.push((0, $.ll)` `), $.ll.join(t);
        }
        buildDeleteQuery({ table: e, where: t, returning: i, withList: n }) {
          let s = this.buildWithCTE(n),
            r = i
              ? (0,
                $.ll)` returning ${this.buildSelection(i, { isSingleTable: !0 })}`
              : void 0,
            l = t ? (0, $.ll)` where ${t}` : void 0;
          return (0, $.ll)`${s}delete from ${e}${l}${r}`;
        }
        buildUpdateSet(e, t) {
          let i = e[r.XI.Symbol.Columns],
            n = Object.keys(i).filter(
              (e) => void 0 !== t[e] || i[e]?.onUpdateFn !== void 0,
            ),
            s = n.length;
          return $.ll.join(
            n.flatMap((e, n) => {
              let r = i[e],
                l = t[e] ?? $.ll.param(r.onUpdateFn(), r),
                a = (0,
                $.ll)`${$.ll.identifier(this.casing.getColumnCasing(r))} = ${l}`;
              return n < s - 1 ? [a, $.ll.raw(", ")] : [a];
            }),
          );
        }
        buildUpdateQuery({
          table: e,
          set: t,
          where: i,
          returning: n,
          withList: s,
          from: r,
          joins: l,
        }) {
          let a = this.buildWithCTE(s),
            o = e[S.mu.Symbol.Name],
            u = e[S.mu.Symbol.Schema],
            c = e[S.mu.Symbol.OriginalName],
            h = o === c ? void 0 : o,
            d = (0,
            $.ll)`${u ? (0, $.ll)`${$.ll.identifier(u)}.` : void 0}${$.ll.identifier(c)}${h && (0, $.ll)` ${$.ll.identifier(h)}`}`,
            f = this.buildUpdateSet(e, t),
            m = r && $.ll.join([$.ll.raw(" from "), this.buildFromTable(r)]),
            g = this.buildJoins(l),
            p = n
              ? (0,
                $.ll)` returning ${this.buildSelection(n, { isSingleTable: !r })}`
              : void 0,
            y = i ? (0, $.ll)` where ${i}` : void 0;
          return (0, $.ll)`${a}update ${d} set ${f}${m}${g}${y}${p}`;
        }
        buildSelection(e, { isSingleTable: t = !1 } = {}) {
          let i = e.length,
            n = e.flatMap(({ field: e }, n) => {
              let r = [];
              if ((0, s.is)(e, $.Xs.Aliased) && e.isSelectionField)
                r.push($.ll.identifier(e.fieldAlias));
              else if ((0, s.is)(e, $.Xs.Aliased) || (0, s.is)(e, $.Xs)) {
                let i = (0, s.is)(e, $.Xs.Aliased) ? e.sql : e;
                t
                  ? r.push(
                      new $.Xs(
                        i.queryChunks.map((e) =>
                          (0, s.is)(e, d.Kl)
                            ? $.ll.identifier(this.casing.getColumnCasing(e))
                            : e,
                        ),
                      ),
                    )
                  : r.push(i),
                  (0, s.is)(e, $.Xs.Aliased) &&
                    r.push((0, $.ll)` as ${$.ll.identifier(e.fieldAlias)}`);
              } else
                (0, s.is)(e, c.V) &&
                  (t
                    ? r.push($.ll.identifier(this.casing.getColumnCasing(e)))
                    : r.push(e));
              return n < i - 1 && r.push((0, $.ll)`, `), r;
            });
          return $.ll.join(n);
        }
        buildJoins(e) {
          if (!e || 0 === e.length) return;
          let t = [];
          for (let [i, n] of e.entries()) {
            0 === i && t.push((0, $.ll)` `);
            let r = n.table,
              l = n.lateral ? (0, $.ll)` lateral` : void 0;
            if ((0, s.is)(r, S.mu)) {
              let e = r[S.mu.Symbol.Name],
                i = r[S.mu.Symbol.Schema],
                s = r[S.mu.Symbol.OriginalName],
                a = e === s ? void 0 : n.alias;
              t.push(
                (0,
                $.ll)`${$.ll.raw(n.joinType)} join${l} ${i ? (0, $.ll)`${$.ll.identifier(i)}.` : void 0}${$.ll.identifier(s)}${a && (0, $.ll)` ${$.ll.identifier(a)}`} on ${n.on}`,
              );
            } else if ((0, s.is)(r, $.Ss)) {
              let e = r[x.n].name,
                i = r[x.n].schema,
                s = r[x.n].originalName,
                a = e === s ? void 0 : n.alias;
              t.push(
                (0,
                $.ll)`${$.ll.raw(n.joinType)} join${l} ${i ? (0, $.ll)`${$.ll.identifier(i)}.` : void 0}${$.ll.identifier(s)}${a && (0, $.ll)` ${$.ll.identifier(a)}`} on ${n.on}`,
              );
            } else
              t.push(
                (0, $.ll)`${$.ll.raw(n.joinType)} join${l} ${r} on ${n.on}`,
              );
            i < e.length - 1 && t.push((0, $.ll)` `);
          }
          return $.ll.join(t);
        }
        buildFromTable(e) {
          if (
            (0, s.is)(e, r.XI) &&
            e[r.XI.Symbol.OriginalName] !== e[r.XI.Symbol.Name]
          ) {
            let t = (0, $.ll)`${$.ll.identifier(e[r.XI.Symbol.OriginalName])}`;
            return (
              e[r.XI.Symbol.Schema] &&
                (t = (0, $.ll)`${$.ll.identifier(e[r.XI.Symbol.Schema])}.${t}`),
              (0, $.ll)`${t} ${$.ll.identifier(e[r.XI.Symbol.Name])}`
            );
          }
          return e;
        }
        buildSelectQuery({
          withList: e,
          fields: t,
          fieldsFlat: i,
          where: n,
          having: l,
          table: a,
          joins: o,
          orderBy: u,
          groupBy: h,
          limit: d,
          offset: f,
          lockingClause: m,
          distinct: g,
          setOperators: p,
        }) {
          let y,
            b,
            w,
            S = i ?? (0, T.He)(t);
          for (let e of S) {
            let t;
            if (
              (0, s.is)(e.field, c.V) &&
              (0, r.Io)(e.field.table) !==
                ((0, s.is)(a, N.n)
                  ? a._.alias
                  : (0, s.is)(a, q.w)
                    ? a[x.n].name
                    : (0, s.is)(a, $.Xs)
                      ? void 0
                      : (0, r.Io)(a)) &&
              ((t = e.field.table),
              !o?.some(
                ({ alias: e }) =>
                  e ===
                  (t[r.XI.Symbol.IsAlias]
                    ? (0, r.Io)(t)
                    : t[r.XI.Symbol.BaseName]),
              ))
            ) {
              let t = (0, r.Io)(e.field.table);
              throw Error(
                `Your "${e.path.join("->")}" field references a column "${t}"."${e.field.name}", but the table "${t}" is not part of the query! Did you forget to join it?`,
              );
            }
          }
          let v = !o || 0 === o.length,
            P = this.buildWithCTE(e);
          g &&
            (y =
              !0 === g
                ? (0, $.ll)` distinct`
                : (0, $.ll)` distinct on (${$.ll.join(g.on, (0, $.ll)`, `)})`);
          let D = this.buildSelection(S, { isSingleTable: v }),
            C = this.buildFromTable(a),
            I = this.buildJoins(o),
            O = n ? (0, $.ll)` where ${n}` : void 0,
            L = l ? (0, $.ll)` having ${l}` : void 0;
          u &&
            u.length > 0 &&
            (b = (0, $.ll)` order by ${$.ll.join(u, (0, $.ll)`, `)}`),
            h &&
              h.length > 0 &&
              (w = (0, $.ll)` group by ${$.ll.join(h, (0, $.ll)`, `)}`);
          let j =
              "object" == typeof d || ("number" == typeof d && d >= 0)
                ? (0, $.ll)` limit ${d}`
                : void 0,
            B = f ? (0, $.ll)` offset ${f}` : void 0,
            Q = $.ll.empty();
          if (m) {
            let e = (0, $.ll)` for ${$.ll.raw(m.strength)}`;
            m.config.of &&
              e.append(
                (0,
                $.ll)` of ${$.ll.join(Array.isArray(m.config.of) ? m.config.of : [m.config.of], (0, $.ll)`, `)}`,
              ),
              m.config.noWait
                ? e.append((0, $.ll)` no wait`)
                : m.config.skipLocked && e.append((0, $.ll)` skip locked`),
              Q.append(e);
          }
          let V = (0,
          $.ll)`${P}select${y} ${D} from ${C}${I}${O}${w}${L}${b}${j}${B}${Q}`;
          return p.length > 0 ? this.buildSetOperations(V, p) : V;
        }
        buildSetOperations(e, t) {
          let [i, ...n] = t;
          if (!i)
            throw Error("Cannot pass undefined values to any set operator");
          return 0 === n.length
            ? this.buildSetOperationQuery({ leftSelect: e, setOperator: i })
            : this.buildSetOperations(
                this.buildSetOperationQuery({ leftSelect: e, setOperator: i }),
                n,
              );
        }
        buildSetOperationQuery({
          leftSelect: e,
          setOperator: {
            type: t,
            isAll: i,
            rightSelect: n,
            limit: r,
            orderBy: l,
            offset: a,
          },
        }) {
          let o,
            u = (0, $.ll)`(${e.getSQL()}) `,
            c = (0, $.ll)`(${n.getSQL()})`;
          if (l && l.length > 0) {
            let e = [];
            for (let t of l)
              if ((0, s.is)(t, d.Kl)) e.push($.ll.identifier(t.name));
              else if ((0, s.is)(t, $.Xs)) {
                for (let e = 0; e < t.queryChunks.length; e++) {
                  let i = t.queryChunks[e];
                  (0, s.is)(i, d.Kl) &&
                    (t.queryChunks[e] = $.ll.identifier(i.name));
                }
                e.push((0, $.ll)`${t}`);
              } else e.push((0, $.ll)`${t}`);
            o = (0, $.ll)` order by ${$.ll.join(e, (0, $.ll)`, `)} `;
          }
          let h =
              "object" == typeof r || ("number" == typeof r && r >= 0)
                ? (0, $.ll)` limit ${r}`
                : void 0,
            f = $.ll.raw(`${t} ${i ? "all " : ""}`),
            m = a ? (0, $.ll)` offset ${a}` : void 0;
          return (0, $.ll)`${u}${f}${c}${o}${h}${m}`;
        }
        buildInsertQuery({
          table: e,
          values: t,
          onConflict: i,
          returning: n,
          withList: l,
          select: a,
          overridingSystemValue_: o,
        }) {
          let u = [],
            c = Object.entries(e[r.XI.Symbol.Columns]).filter(
              ([e, t]) => !t.shouldDisableInsert(),
            ),
            h = c.map(([, e]) =>
              $.ll.identifier(this.casing.getColumnCasing(e)),
            );
          if (a) (0, s.is)(t, $.Xs) ? u.push(t) : u.push(t.getSQL());
          else
            for (let [e, i] of (u.push($.ll.raw("values ")), t.entries())) {
              let n = [];
              for (let [e, t] of c) {
                let r = i[e];
                if (void 0 === r || ((0, s.is)(r, $.Iw) && void 0 === r.value))
                  if (void 0 !== t.defaultFn) {
                    let e = t.defaultFn(),
                      i = (0, s.is)(e, $.Xs) ? e : $.ll.param(e, t);
                    n.push(i);
                  } else if (t.default || void 0 === t.onUpdateFn)
                    n.push((0, $.ll)`default`);
                  else {
                    let e = t.onUpdateFn(),
                      i = (0, s.is)(e, $.Xs) ? e : $.ll.param(e, t);
                    n.push(i);
                  }
                else n.push(r);
              }
              u.push(n), e < t.length - 1 && u.push((0, $.ll)`, `);
            }
          let d = this.buildWithCTE(l),
            f = $.ll.join(u),
            m = n
              ? (0,
                $.ll)` returning ${this.buildSelection(n, { isSingleTable: !0 })}`
              : void 0,
            g = i ? (0, $.ll)` on conflict ${i}` : void 0,
            p = !0 === o ? (0, $.ll)`overriding system value ` : void 0;
          return (0, $.ll)`${d}insert into ${e} ${h} ${p}${f}${g}${m}`;
        }
        buildRefreshMaterializedViewQuery({
          view: e,
          concurrently: t,
          withNoData: i,
        }) {
          let n = t ? (0, $.ll)` concurrently` : void 0,
            s = i ? (0, $.ll)` with no data` : void 0;
          return (0, $.ll)`refresh materialized view${n} ${e}${s}`;
        }
        prepareTyping(e) {
          if ((0, s.is)(e, f.kn) || (0, s.is)(e, m.iX)) return "json";
          if ((0, s.is)(e, g.Z5)) return "decimal";
          if ((0, s.is)(e, p.Xd)) return "time";
          if ((0, s.is)(e, y.KM) || (0, s.is)(e, y.xQ)) return "timestamp";
          if ((0, s.is)(e, b.qw) || (0, s.is)(e, b.dw)) return "date";
          else if ((0, s.is)(e, w.dL)) return "uuid";
          else return "none";
        }
        sqlToQuery(e, t) {
          return e.toQuery({
            casing: this.casing,
            escapeName: this.escapeName,
            escapeParam: this.escapeParam,
            escapeString: this.escapeString,
            prepareTyping: this.prepareTyping,
            invokeSource: t,
          });
        }
        buildRelationalQueryWithoutPK({
          fullSchema: e,
          schema: t,
          tableNamesMap: i,
          table: l,
          tableConfig: a,
          queryConfig: o,
          tableAlias: u,
          nestedQueryRelation: d,
          joinOn: f,
        }) {
          let m,
            g = [],
            p,
            y,
            b = [],
            w,
            T = [];
          if (!0 === o)
            g = Object.entries(a.columns).map(([e, t]) => ({
              dbKey: t.name,
              tsKey: e,
              field: (0, n.ug)(t, u),
              relationTableTsKey: void 0,
              isJson: !1,
              selection: [],
            }));
          else {
            let l = Object.fromEntries(
              Object.entries(a.columns).map(([e, t]) => [e, (0, n.ug)(t, u)]),
            );
            if (o.where) {
              let e =
                "function" == typeof o.where
                  ? o.where(l, (0, v.mm)())
                  : o.where;
              w = e && (0, n.yY)(e, u);
            }
            let h = [],
              d = [];
            if (o.columns) {
              let e = !1;
              for (let [t, i] of Object.entries(o.columns))
                void 0 !== i &&
                  t in a.columns &&
                  (e || !0 !== i || (e = !0), d.push(t));
              d.length > 0 &&
                (d = e
                  ? d.filter((e) => o.columns?.[e] === !0)
                  : Object.keys(a.columns).filter((e) => !d.includes(e)));
            } else d = Object.keys(a.columns);
            for (let e of d) {
              let t = a.columns[e];
              h.push({ tsKey: e, value: t });
            }
            let f = [];
            if (
              (o.with &&
                (f = Object.entries(o.with)
                  .filter((e) => !!e[1])
                  .map(([e, t]) => ({
                    tsKey: e,
                    queryConfig: t,
                    relation: a.relations[e],
                  }))),
              o.extras)
            )
              for (let [e, t] of Object.entries(
                "function" == typeof o.extras
                  ? o.extras(l, { sql: $.ll })
                  : o.extras,
              ))
                h.push({ tsKey: e, value: (0, n.Hs)(t, u) });
            for (let { tsKey: e, value: t } of h)
              g.push({
                dbKey: (0, s.is)(t, $.Xs.Aliased)
                  ? t.fieldAlias
                  : a.columns[e].name,
                tsKey: e,
                field: (0, s.is)(t, c.V) ? (0, n.ug)(t, u) : t,
                relationTableTsKey: void 0,
                isJson: !1,
                selection: [],
              });
            let m =
              "function" == typeof o.orderBy
                ? o.orderBy(l, (0, v.rl)())
                : (o.orderBy ?? []);
            for (let {
              tsKey: l,
              queryConfig: a,
              relation: h,
            } of (Array.isArray(m) || (m = [m]),
            (b = m.map((e) =>
              (0, s.is)(e, c.V) ? (0, n.ug)(e, u) : (0, n.yY)(e, u),
            )),
            (p = o.limit),
            (y = o.offset),
            f)) {
              let o = (0, v.W0)(t, i, h),
                c = i[(0, r.Lf)(h.referencedTable)],
                d = `${u}_${l}`,
                f = (0, P.Uo)(
                  ...o.fields.map((e, t) =>
                    (0, P.eq)((0, n.ug)(o.references[t], d), (0, n.ug)(e, u)),
                  ),
                ),
                m = this.buildRelationalQueryWithoutPK({
                  fullSchema: e,
                  schema: t,
                  tableNamesMap: i,
                  table: e[c],
                  tableConfig: t[c],
                  queryConfig: (0, s.is)(h, v.pD)
                    ? !0 === a
                      ? { limit: 1 }
                      : { ...a, limit: 1 }
                    : a,
                  tableAlias: d,
                  joinOn: f,
                  nestedQueryRelation: h,
                }),
                p = (0,
                $.ll)`${$.ll.identifier(d)}.${$.ll.identifier("data")}`.as(l);
              T.push({
                on: (0, $.ll)`true`,
                table: new N.n(m.sql, {}, d),
                alias: d,
                joinType: "left",
                lateral: !0,
              }),
                g.push({
                  dbKey: l,
                  tsKey: l,
                  field: p,
                  relationTableTsKey: c,
                  isJson: !0,
                  selection: m.selection,
                });
            }
          }
          if (0 === g.length)
            throw new h.n({
              message: `No fields selected for table "${a.tsName}" ("${u}")`,
            });
          if (((w = (0, P.Uo)(f, w)), d)) {
            let e = (0, $.ll)`json_build_array(${$.ll.join(
              g.map(({ field: e, tsKey: t, isJson: i }) =>
                i
                  ? (0,
                    $.ll)`${$.ll.identifier(`${u}_${t}`)}.${$.ll.identifier("data")}`
                  : (0, s.is)(e, $.Xs.Aliased)
                    ? e.sql
                    : e,
              ),
              (0, $.ll)`, `,
            )})`;
            (0, s.is)(d, v.iv) &&
              (e = (0,
              $.ll)`coalesce(json_agg(${e}${b.length > 0 ? (0, $.ll)` order by ${$.ll.join(b, (0, $.ll)`, `)}` : void 0}), '[]'::json)`);
            let t = [
              {
                dbKey: "data",
                tsKey: "data",
                field: e.as("data"),
                isJson: !0,
                relationTableTsKey: a.tsName,
                selection: g,
              },
            ];
            void 0 !== p || void 0 !== y || b.length > 0
              ? ((m = this.buildSelectQuery({
                  table: (0, n.oG)(l, u),
                  fields: {},
                  fieldsFlat: [{ path: [], field: $.ll.raw("*") }],
                  where: w,
                  limit: p,
                  offset: y,
                  orderBy: b,
                  setOperators: [],
                })),
                (w = void 0),
                (p = void 0),
                (y = void 0),
                (b = []))
              : (m = (0, n.oG)(l, u)),
              (m = this.buildSelectQuery({
                table: (0, s.is)(m, S.mu) ? m : new N.n(m, {}, u),
                fields: {},
                fieldsFlat: t.map(({ field: e }) => ({
                  path: [],
                  field: (0, s.is)(e, c.V) ? (0, n.ug)(e, u) : e,
                })),
                joins: T,
                where: w,
                limit: p,
                offset: y,
                orderBy: b,
                setOperators: [],
              }));
          } else
            m = this.buildSelectQuery({
              table: (0, n.oG)(l, u),
              fields: {},
              fieldsFlat: g.map(({ field: e }) => ({
                path: [],
                field: (0, s.is)(e, c.V) ? (0, n.ug)(e, u) : e,
              })),
              joins: T,
              where: w,
              limit: p,
              offset: y,
              orderBy: b,
              setOperators: [],
            });
          return { tableTsKey: a.tsName, sql: m, selection: g };
        }
      }
    },
    86726: (e, t, i) => {
      i.d(t, { n: () => n });
      let n = Symbol.for("drizzle:ViewBaseConfig");
    },
    90077: (e, t, i) => {
      i.d(t, { j: () => r, n: () => s });
      var n = i(22321);
      class s extends Error {
        static [n.i] = "DrizzleError";
        constructor({ message: e, cause: t }) {
          super(e), (this.name = "DrizzleError"), (this.cause = t);
        }
      }
      class r extends s {
        static [n.i] = "TransactionRollbackError";
        constructor() {
          super({ message: "Rollback" });
        }
      }
    },
    95248: (e, t, i) => {
      i.d(t, {
        Hs: () => f,
        Ht: () => o,
        h_: () => u,
        oG: () => h,
        ug: () => d,
        yY: () => m,
      });
      var n = i(58560),
        s = i(22321),
        r = i(4595),
        l = i(74696),
        a = i(10765);
      class o {
        constructor(e) {
          this.table = e;
        }
        static [s.i] = "ColumnAliasProxyHandler";
        get(e, t) {
          return "table" === t ? this.table : e[t];
        }
      }
      class u {
        constructor(e, t) {
          (this.alias = e), (this.replaceOriginalName = t);
        }
        static [s.i] = "TableAliasProxyHandler";
        get(e, t) {
          if (t === l.XI.Symbol.IsAlias) return !0;
          if (
            t === l.XI.Symbol.Name ||
            (this.replaceOriginalName && t === l.XI.Symbol.OriginalName)
          )
            return this.alias;
          if (t === a.n) return { ...e[a.n], name: this.alias, isAlias: !0 };
          if (t === l.XI.Symbol.Columns) {
            let t = e[l.XI.Symbol.Columns];
            if (!t) return t;
            let i = {};
            return (
              Object.keys(t).map((n) => {
                i[n] = new Proxy(t[n], new o(new Proxy(e, this)));
              }),
              i
            );
          }
          let i = e[t];
          return (0, s.is)(i, n.V)
            ? new Proxy(i, new o(new Proxy(e, this)))
            : i;
        }
      }
      class c {
        constructor(e) {
          this.alias = e;
        }
        static [s.i] = null;
        get(e, t) {
          return "sourceTable" === t ? h(e.sourceTable, this.alias) : e[t];
        }
      }
      function h(e, t) {
        return new Proxy(e, new u(t, !1));
      }
      function d(e, t) {
        return new Proxy(e, new o(new Proxy(e.table, new u(t, !1))));
      }
      function f(e, t) {
        return new r.Xs.Aliased(m(e.sql, t), e.fieldAlias);
      }
      function m(e, t) {
        return r.ll.join(
          e.queryChunks.map((e) =>
            (0, s.is)(e, n.V)
              ? d(e, t)
              : (0, s.is)(e, r.Xs)
                ? m(e, t)
                : (0, s.is)(e, r.Xs.Aliased)
                  ? f(e, t)
                  : e,
          ),
        );
      }
    },
    96019: (e, t, i) => {
      i.d(t, { E: () => n });
      let n = Symbol.for("drizzle:Name");
    },
    96189: (e, t, i) => {
      i.d(t, {
        AU: () => d,
        B3: () => q,
        KJ: () => $,
        KL: () => b,
        Pe: () => S,
        RK: () => x,
        RO: () => m,
        RV: () => y,
        Tq: () => P,
        Uo: () => c,
        eq: () => o,
        gt: () => f,
        kZ: () => w,
        lt: () => g,
        mj: () => T,
        ne: () => u,
        o8: () => N,
        or: () => h,
        q1: () => D,
        t2: () => v,
        wJ: () => p,
      });
      var n = i(58560),
        s = i(22321),
        r = i(74696),
        l = i(4595);
      function a(e, t) {
        return !(0, l.eG)(t) ||
          (0, l.qt)(e) ||
          (0, s.is)(e, l.Iw) ||
          (0, s.is)(e, l.Or) ||
          (0, s.is)(e, n.V) ||
          (0, s.is)(e, r.XI) ||
          (0, s.is)(e, l.Ss)
          ? e
          : new l.Iw(e, t);
      }
      let o = (e, t) => (0, l.ll)`${e} = ${a(t, e)}`,
        u = (e, t) => (0, l.ll)`${e} <> ${a(t, e)}`;
      function c(...e) {
        let t = e.filter((e) => void 0 !== e);
        if (0 !== t.length)
          return new l.Xs(
            1 === t.length
              ? t
              : [new l.DJ("("), l.ll.join(t, new l.DJ(" and ")), new l.DJ(")")],
          );
      }
      function h(...e) {
        let t = e.filter((e) => void 0 !== e);
        if (0 !== t.length)
          return new l.Xs(
            1 === t.length
              ? t
              : [new l.DJ("("), l.ll.join(t, new l.DJ(" or ")), new l.DJ(")")],
          );
      }
      function d(e) {
        return (0, l.ll)`not ${e}`;
      }
      let f = (e, t) => (0, l.ll)`${e} > ${a(t, e)}`,
        m = (e, t) => (0, l.ll)`${e} >= ${a(t, e)}`,
        g = (e, t) => (0, l.ll)`${e} < ${a(t, e)}`,
        p = (e, t) => (0, l.ll)`${e} <= ${a(t, e)}`;
      function y(e, t) {
        return Array.isArray(t)
          ? 0 === t.length
            ? (0, l.ll)`false`
            : (0, l.ll)`${e} in ${t.map((t) => a(t, e))}`
          : (0, l.ll)`${e} in ${a(t, e)}`;
      }
      function b(e, t) {
        return Array.isArray(t)
          ? 0 === t.length
            ? (0, l.ll)`true`
            : (0, l.ll)`${e} not in ${t.map((t) => a(t, e))}`
          : (0, l.ll)`${e} not in ${a(t, e)}`;
      }
      function w(e) {
        return (0, l.ll)`${e} is null`;
      }
      function S(e) {
        return (0, l.ll)`${e} is not null`;
      }
      function v(e) {
        return (0, l.ll)`exists ${e}`;
      }
      function $(e) {
        return (0, l.ll)`not exists ${e}`;
      }
      function P(e, t, i) {
        return (0, l.ll)`${e} between ${a(t, e)} and ${a(i, e)}`;
      }
      function N(e, t, i) {
        return (0, l.ll)`${e} not between ${a(t, e)} and ${a(i, e)}`;
      }
      function T(e, t) {
        return (0, l.ll)`${e} like ${t}`;
      }
      function x(e, t) {
        return (0, l.ll)`${e} not like ${t}`;
      }
      function q(e, t) {
        return (0, l.ll)`${e} ilike ${t}`;
      }
      function D(e, t) {
        return (0, l.ll)`${e} not ilike ${t}`;
      }
    },
    97236: (e, t, i) => {
      i.d(t, { o: () => o });
      var n = i(22321),
        s = i(85532),
        r = i(65807),
        l = i(16988),
        a = i(36700);
      class o {
        static [n.i] = "PgQueryBuilder";
        dialect;
        dialectConfig;
        constructor(e) {
          (this.dialect = (0, n.is)(e, s.s) ? e : void 0),
            (this.dialectConfig = (0, n.is)(e, s.s) ? void 0 : e);
        }
        $with(e) {
          let t = this;
          return {
            as: (i) => (
              "function" == typeof i && (i = i(t)),
              new Proxy(
                new l.J(i.getSQL(), i.getSelectedFields(), e, !0),
                new r.b({
                  alias: e,
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            ),
          };
        }
        with(...e) {
          let t = this;
          return {
            select: function (i) {
              return new a.PI({
                fields: i ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                withList: e,
              });
            },
            selectDistinct: function (e) {
              return new a.PI({
                fields: e ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                distinct: !0,
              });
            },
            selectDistinctOn: function (e, i) {
              return new a.PI({
                fields: i ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                distinct: { on: e },
              });
            },
          };
        }
        select(e) {
          return new a.PI({
            fields: e ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
          });
        }
        selectDistinct(e) {
          return new a.PI({
            fields: e ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: !0,
          });
        }
        selectDistinctOn(e, t) {
          return new a.PI({
            fields: t ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: { on: e },
          });
        }
        getDialect() {
          return (
            this.dialect || (this.dialect = new s.s(this.dialectConfig)),
            this.dialect
          );
        }
      }
    },
    98389: (e, t, i) => {
      i.d(t, { i: () => n });
      function n(e, ...t) {
        return e(...t);
      }
    },
    98636: (e, t, i) => {
      i.d(t, { KM: () => o, vE: () => h, xQ: () => c });
      var n = i(22321),
        s = i(73653),
        r = i(62508),
        l = i(70923);
      class a extends l.u {
        static [n.i] = "PgTimestampBuilder";
        constructor(e, t, i) {
          super(e, "date", "PgTimestamp"),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        build(e) {
          return new o(e, this.config);
        }
      }
      class o extends r.Kl {
        static [n.i] = "PgTimestamp";
        withTimezone;
        precision;
        constructor(e, t) {
          super(e, t),
            (this.withTimezone = t.withTimezone),
            (this.precision = t.precision);
        }
        getSQLType() {
          let e = void 0 === this.precision ? "" : ` (${this.precision})`;
          return `timestamp${e}${this.withTimezone ? " with time zone" : ""}`;
        }
        mapFromDriverValue = (e) =>
          new Date(this.withTimezone ? e : e + "+0000");
        mapToDriverValue = (e) => e.toISOString();
      }
      class u extends l.u {
        static [n.i] = "PgTimestampStringBuilder";
        constructor(e, t, i) {
          super(e, "string", "PgTimestampString"),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        build(e) {
          return new c(e, this.config);
        }
      }
      class c extends r.Kl {
        static [n.i] = "PgTimestampString";
        withTimezone;
        precision;
        constructor(e, t) {
          super(e, t),
            (this.withTimezone = t.withTimezone),
            (this.precision = t.precision);
        }
        getSQLType() {
          let e = void 0 === this.precision ? "" : `(${this.precision})`;
          return `timestamp${e}${this.withTimezone ? " with time zone" : ""}`;
        }
      }
      function h(e, t = {}) {
        let { name: i, config: n } = (0, s.Ll)(e, t);
        return n?.mode === "string"
          ? new u(i, n.withTimezone ?? !1, n.precision)
          : new a(i, n?.withTimezone ?? !1, n?.precision);
      }
    },
  });
//# sourceMappingURL=978.js.map
