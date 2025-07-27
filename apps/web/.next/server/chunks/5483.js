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
    (e._sentryDebugIds[t] = "72799f20-012f-45c5-b826-1a35a0eaa0c1"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-72799f20-012f-45c5-b826-1a35a0eaa0c1"));
} catch (e) {}
("use strict");
(exports.id = 5483),
  (exports.ids = [5483]),
  (exports.modules = {
    649: (e, t, i) => {
      i.d(t, {
        AU: () => d,
        B3: () => q,
        KJ: () => $,
        KL: () => b,
        Pe: () => S,
        RK: () => x,
        RO: () => g,
        RV: () => y,
        Tq: () => T,
        Uo: () => c,
        eq: () => o,
        gt: () => f,
        kZ: () => w,
        lt: () => p,
        mj: () => P,
        ne: () => u,
        o8: () => N,
        or: () => h,
        q1: () => Q,
        t2: () => v,
        wJ: () => m,
      });
      var s = i(91148),
        r = i(35925),
        n = i(42076),
        l = i(1991);
      function a(e, t) {
        return !(0, l.eG)(t) ||
          (0, l.qt)(e) ||
          (0, r.is)(e, l.Iw) ||
          (0, r.is)(e, l.Or) ||
          (0, r.is)(e, s.V) ||
          (0, r.is)(e, n.XI) ||
          (0, r.is)(e, l.Ss)
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
        g = (e, t) => (0, l.ll)`${e} >= ${a(t, e)}`,
        p = (e, t) => (0, l.ll)`${e} < ${a(t, e)}`,
        m = (e, t) => (0, l.ll)`${e} <= ${a(t, e)}`;
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
      function T(e, t, i) {
        return (0, l.ll)`${e} between ${a(t, e)} and ${a(i, e)}`;
      }
      function N(e, t, i) {
        return (0, l.ll)`${e} not between ${a(t, e)} and ${a(i, e)}`;
      }
      function P(e, t) {
        return (0, l.ll)`${e} like ${t}`;
      }
      function x(e, t) {
        return (0, l.ll)`${e} not like ${t}`;
      }
      function q(e, t) {
        return (0, l.ll)`${e} ilike ${t}`;
      }
      function Q(e, t) {
        return (0, l.ll)`${e} not ilike ${t}`;
      }
    },
    1991: (e, t, i) => {
      i.d(t, {
        Ct: () => v,
        DJ: () => d,
        Iw: () => b,
        Or: () => S,
        Ss: () => T,
        Xs: () => f,
        eG: () => p,
        ll: () => w,
        qt: () => h,
      });
      var s = i(35925),
        r = i(16659),
        n = i(84136),
        l = i(25503),
        a = i(95633),
        o = i(91148),
        u = i(42076);
      class c {
        static [s.i] = null;
      }
      function h(e) {
        return null != e && "function" == typeof e.getSQL;
      }
      class d {
        static [s.i] = "StringChunk";
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
        static [s.i] = "SQL";
        decoder = m;
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
              escapeParam: p,
              prepareTyping: m,
              inlineParams: y,
              paramStartIndex: w,
            } = i;
          var v = e.map((e) => {
            if ((0, s.is)(e, d)) return { sql: e.value.join(""), params: [] };
            if ((0, s.is)(e, g)) return { sql: c(e.value), params: [] };
            if (void 0 === e) return { sql: "", params: [] };
            if (Array.isArray(e)) {
              let t = [new d("(")];
              for (let [i, s] of e.entries())
                t.push(s), i < e.length - 1 && t.push(new d(", "));
              return t.push(new d(")")), this.buildQueryFromSourceParams(t, i);
            }
            if ((0, s.is)(e, f))
              return this.buildQueryFromSourceParams(e.queryChunks, {
                ...i,
                inlineParams: y || e.shouldInlineParams,
              });
            if ((0, s.is)(e, u.XI)) {
              let t = e[u.XI.Symbol.Schema],
                i = e[u.XI.Symbol.Name];
              return {
                sql: void 0 === t || e[u.HE] ? c(i) : c(t) + "." + c(i),
                params: [],
              };
            }
            if ((0, s.is)(e, o.V)) {
              let i = l.getColumnCasing(e);
              if ("indexes" === t.invokeSource)
                return { sql: c(i), params: [] };
              let s = e.table[u.XI.Symbol.Schema];
              return {
                sql:
                  e.table[u.HE] || void 0 === s
                    ? c(e.table[u.XI.Symbol.Name]) + "." + c(i)
                    : c(s) + "." + c(e.table[u.XI.Symbol.Name]) + "." + c(i),
                params: [],
              };
            }
            if ((0, s.is)(e, T)) {
              let t = e[a.n].schema,
                i = e[a.n].name;
              return {
                sql: void 0 === t || e[a.n].isAlias ? c(i) : c(t) + "." + c(i),
                params: [],
              };
            }
            if ((0, s.is)(e, b)) {
              if ((0, s.is)(e.value, S))
                return { sql: p(w.value++, e), params: [e], typings: ["none"] };
              let t =
                null === e.value ? null : e.encoder.mapToDriverValue(e.value);
              if ((0, s.is)(t, f))
                return this.buildQueryFromSourceParams([t], i);
              if (y) return { sql: this.mapInlineParam(t, i), params: [] };
              let r = ["none"];
              return (
                m && (r = [m(e.encoder)]),
                { sql: p(w.value++, t), params: [t], typings: r }
              );
            }
            return (0, s.is)(e, S)
              ? { sql: p(w.value++, e), params: [e], typings: ["none"] }
              : (0, s.is)(e, f.Aliased) && void 0 !== e.fieldAlias
                ? { sql: c(e.fieldAlias), params: [] }
                : (0, s.is)(e, n.n)
                  ? e._.isWith
                    ? { sql: c(e._.alias), params: [] }
                    : this.buildQueryFromSourceParams(
                        [new d("("), e._.sql, new d(") "), new g(e._.alias)],
                        i,
                      )
                  : (0, r.BU)(e)
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
                            sql: p(w.value++, e),
                            params: [e],
                            typings: ["none"],
                          };
          });
          let $ = { sql: "", params: [] };
          for (let e of v)
            ($.sql += e.sql),
              $.params.push(...e.params),
              e.typings?.length &&
                ($.typings || ($.typings = []), $.typings.push(...e.typings));
          return $;
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
      class g {
        constructor(e) {
          this.value = e;
        }
        static [s.i] = "Name";
        brand;
        getSQL() {
          return new f([this]);
        }
      }
      function p(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          "mapToDriverValue" in e &&
          "function" == typeof e.mapToDriverValue
        );
      }
      let m = { mapFromDriverValue: (e) => e },
        y = { mapToDriverValue: (e) => e };
      ({ ...m, ...y });
      class b {
        constructor(e, t = y) {
          (this.value = e), (this.encoder = t);
        }
        static [s.i] = "Param";
        brand;
        getSQL() {
          return new f([this]);
        }
      }
      function w(e, ...t) {
        let i = [];
        for (let [s, r] of ((t.length > 0 || (e.length > 0 && "" !== e[0])) &&
          i.push(new d(e[0])),
        t.entries()))
          i.push(r, new d(e[s + 1]));
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
            for (let [s, r] of e.entries())
              s > 0 && void 0 !== t && i.push(t), i.push(r);
            return new f(i);
          }),
          (e.identifier = function (e) {
            return new g(e);
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
            static [s.i] = "SQL.Aliased";
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
        static [s.i] = "Placeholder";
        getSQL() {
          return new f([this]);
        }
      }
      function v(e, t) {
        return e.map((e) => {
          if ((0, s.is)(e, S)) {
            if (!(e.name in t))
              throw Error(`No value for placeholder "${e.name}" was provided`);
            return t[e.name];
          }
          if ((0, s.is)(e, b) && (0, s.is)(e.value, S)) {
            if (!(e.value.name in t))
              throw Error(
                `No value for placeholder "${e.value.name}" was provided`,
              );
            return e.encoder.mapToDriverValue(t[e.value.name]);
          }
          return e;
        });
      }
      let $ = Symbol.for("drizzle:IsDrizzleView");
      class T {
        static [s.i] = "View";
        [a.n];
        [$] = !0;
        constructor({ name: e, schema: t, selectedFields: i, query: s }) {
          this[a.n] = {
            name: e,
            originalName: e,
            schema: t,
            selectedFields: i,
            query: s,
            isExisting: !s,
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
        (n.n.prototype.getSQL = function () {
          return new f([this]);
        });
    },
    16659: (e, t, i) => {
      i.d(t, { BU: () => o, rL: () => h });
      var s = i(35925),
        r = i(18980);
      class n extends r.pe {
        static [s.i] = "PgEnumObjectColumnBuilder";
        constructor(e, t) {
          super(e, "string", "PgEnumObjectColumn"), (this.config.enum = t);
        }
        build(e) {
          return new l(e, this.config);
        }
      }
      class l extends r.Kl {
        static [s.i] = "PgEnumObjectColumn";
        enum;
        enumValues = this.config.enum.enumValues;
        constructor(e, t) {
          super(e, t), (this.enum = t.enum);
        }
        getSQLType() {
          return this.enum.enumName;
        }
      }
      let a = Symbol.for("drizzle:isPgEnum");
      function o(e) {
        return !!e && "function" == typeof e && a in e && !0 === e[a];
      }
      class u extends r.pe {
        static [s.i] = "PgEnumColumnBuilder";
        constructor(e, t) {
          super(e, "string", "PgEnumColumn"), (this.config.enum = t);
        }
        build(e) {
          return new c(e, this.config);
        }
      }
      class c extends r.Kl {
        static [s.i] = "PgEnumColumn";
        enum = this.config.enum;
        enumValues = this.config.enum.enumValues;
        constructor(e, t) {
          super(e, t), (this.enum = t.enum);
        }
        getSQLType() {
          return this.enum.enumName;
        }
      }
      function h(e, t) {
        return Array.isArray(t)
          ? (function (e, t, i) {
              let s = Object.assign((e) => new u(e ?? "", s), {
                enumName: e,
                enumValues: t,
                schema: i,
                [a]: !0,
              });
              return s;
            })(e, [...t], void 0)
          : (function (e, t, i) {
              let s = Object.assign((e) => new n(e ?? "", s), {
                enumName: e,
                enumValues: Object.values(t),
                schema: i,
                [a]: !0,
              });
              return s;
            })(e, t, void 0);
      }
    },
    16807: (e, t, i) => {
      i.d(t, { u: () => l });
      var s = i(35925),
        r = i(1991),
        n = i(18980);
      class l extends n.pe {
        static [s.i] = "PgDateColumnBaseBuilder";
        defaultNow() {
          return this.default((0, r.ll)`now()`);
        }
      }
    },
    18279: (e, t, i) => {
      i(77598);
      let s = Array.from({ length: 64 }, (e, t) => t),
        r = (e) => Array(e).fill(-1);
      [
        ...r(46),
        ...s.slice(54, 64),
        ...r(7),
        ...s.slice(2, 28),
        ...r(6),
        ...s.slice(28, 54),
        ...r(5),
      ],
        "function" == typeof setImmediate ||
          ("object" == typeof process &&
            "function" == typeof process.nextTick &&
            process.nextTick);
    },
    18980: (e, t, i) => {
      i.d(t, { Kl: () => m, pe: () => p });
      var s = i(35925);
      class r {
        static [s.i] = "ColumnBuilder";
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
      var n = i(91148),
        l = i(46647);
      class a {
        static [s.i] = "PgForeignKeyBuilder";
        reference;
        _onUpdate = "no action";
        _onDelete = "no action";
        constructor(e, t) {
          (this.reference = () => {
            let { name: t, columns: i, foreignColumns: s } = e();
            return {
              name: t,
              columns: i,
              foreignTable: s[0].table,
              foreignColumns: s,
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
        static [s.i] = "PgForeignKey";
        reference;
        onUpdate;
        onDelete;
        getName() {
          let { name: e, columns: t, foreignColumns: i } = this.reference(),
            s = t.map((e) => e.name),
            r = i.map((e) => e.name),
            n = [this.table[l.E], ...s, i[0].table[l.E], ...r];
          return e ?? `${n.join("_")}_fk`;
        }
      }
      var u = i(69358);
      function c(e, t) {
        return `${e[l.E]}_${t.join("_")}_unique`;
      }
      class h {
        constructor(e, t) {
          (this.name = t), (this.columns = e);
        }
        static [s.i] = null;
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
        constructor(e, t, i, s) {
          (this.table = e),
            (this.columns = t),
            (this.name =
              s ??
              c(
                this.table,
                this.columns.map((e) => e.name),
              )),
            (this.nullsNotDistinct = i);
        }
        static [s.i] = null;
        columns;
        name;
        nullsNotDistinct = !1;
        getName() {
          return this.name;
        }
      }
      function g(e, t, i) {
        for (let s = t; s < e.length; s++) {
          let r = e[s];
          if ("\\" === r) {
            s++;
            continue;
          }
          if ('"' === r) return [e.slice(t, s).replace(/\\/g, ""), s + 1];
          if (!i && ("," === r || "}" === r))
            return [e.slice(t, s).replace(/\\/g, ""), s];
        }
        return [e.slice(t).replace(/\\/g, ""), e.length];
      }
      class p extends r {
        foreignKeyConfigs = [];
        static [s.i] = "PgColumnBuilder";
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
          return this.foreignKeyConfigs.map(({ ref: i, actions: s }) =>
            (0, u.i)(
              (i, s) => {
                let r = new a(() => ({ columns: [e], foreignColumns: [i()] }));
                return (
                  s.onUpdate && r.onUpdate(s.onUpdate),
                  s.onDelete && r.onDelete(s.onDelete),
                  r.build(t)
                );
              },
              i,
              s,
            ),
          );
        }
        buildExtraConfigColumn(e) {
          return new y(e, this.config);
        }
      }
      class m extends n.V {
        constructor(e, t) {
          t.uniqueName || (t.uniqueName = c(e, [t.name])),
            super(e, t),
            (this.table = e);
        }
        static [s.i] = "PgColumn";
      }
      class y extends m {
        static [s.i] = "ExtraConfigColumn";
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
        static [s.i] = null;
        constructor(e, t, i, s) {
          (this.name = e),
            (this.keyAsName = t),
            (this.type = i),
            (this.indexConfig = s);
        }
        name;
        keyAsName;
        type;
        indexConfig;
      }
      class w extends p {
        static [s.i] = "PgArrayBuilder";
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
      class S extends m {
        constructor(e, t, i, s) {
          super(e, t),
            (this.baseColumn = i),
            (this.range = s),
            (this.size = t.size);
        }
        size;
        static [s.i] = "PgArray";
        getSQLType() {
          return `${this.baseColumn.getSQLType()}[${"number" == typeof this.size ? this.size : ""}]`;
        }
        mapFromDriverValue(e) {
          return (
            "string" == typeof e &&
              (e = (function (e) {
                let [t] = (function e(t, i = 0) {
                  let s = [],
                    r = i,
                    n = !1;
                  for (; r < t.length; ) {
                    let l = t[r];
                    if ("," === l) {
                      (n || r === i) && s.push(""), (n = !0), r++;
                      continue;
                    }
                    if (((n = !1), "\\" === l)) {
                      r += 2;
                      continue;
                    }
                    if ('"' === l) {
                      let [e, i] = g(t, r + 1, !0);
                      s.push(e), (r = i);
                      continue;
                    }
                    if ("}" === l) return [s, r + 1];
                    if ("{" === l) {
                      let [i, n] = e(t, r + 1);
                      s.push(i), (r = n);
                      continue;
                    }
                    let [a, o] = g(t, r, !1);
                    s.push(a), (r = o);
                  }
                  return [s, r];
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
              : (0, s.is)(this.baseColumn, S)
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
    25503: (e, t, i) => {
      let s, r;
      i.d(t, { k: () => l });
      var n = i(69358);
      let l = {
        startActiveSpan: (e, t) =>
          s
            ? (r || (r = s.trace.getTracer("drizzle-orm", "0.43.1")),
              (0, n.i)(
                (i, s) =>
                  s.startActiveSpan(e, (e) => {
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
                s,
                r,
              ))
            : t(),
      };
    },
    27203: (e, t, i) => {
      i.d(t, { Z5: () => a, sH: () => d });
      var s = i(35925),
        r = i(50521),
        n = i(18980);
      class l extends n.pe {
        static [s.i] = "PgNumericBuilder";
        constructor(e, t, i) {
          super(e, "string", "PgNumeric"),
            (this.config.precision = t),
            (this.config.scale = i);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends n.Kl {
        static [s.i] = "PgNumeric";
        precision;
        scale;
        constructor(e, t) {
          super(e, t), (this.precision = t.precision), (this.scale = t.scale);
        }
        mapFromDriverValue(e) {
          return "string" == typeof e ? e : String(e);
        }
        getSQLType() {
          return void 0 !== this.precision && void 0 !== this.scale
            ? `numeric(${this.precision}, ${this.scale})`
            : void 0 === this.precision
              ? "numeric"
              : `numeric(${this.precision})`;
        }
      }
      class o extends n.pe {
        static [s.i] = "PgNumericNumberBuilder";
        constructor(e, t, i) {
          super(e, "number", "PgNumericNumber"),
            (this.config.precision = t),
            (this.config.scale = i);
        }
        build(e) {
          return new u(e, this.config);
        }
      }
      class u extends n.Kl {
        static [s.i] = "PgNumericNumber";
        precision;
        scale;
        constructor(e, t) {
          super(e, t), (this.precision = t.precision), (this.scale = t.scale);
        }
        mapFromDriverValue(e) {
          return "number" == typeof e ? e : Number(e);
        }
        mapToDriverValue = String;
        getSQLType() {
          return void 0 !== this.precision && void 0 !== this.scale
            ? `numeric(${this.precision}, ${this.scale})`
            : void 0 === this.precision
              ? "numeric"
              : `numeric(${this.precision})`;
        }
      }
      class c extends n.pe {
        static [s.i] = "PgNumericBigIntBuilder";
        constructor(e, t, i) {
          super(e, "bigint", "PgNumericBigInt"),
            (this.config.precision = t),
            (this.config.scale = i);
        }
        build(e) {
          return new h(e, this.config);
        }
      }
      class h extends n.Kl {
        static [s.i] = "PgNumericBigInt";
        precision;
        scale;
        constructor(e, t) {
          super(e, t), (this.precision = t.precision), (this.scale = t.scale);
        }
        mapFromDriverValue = BigInt;
        mapToDriverValue = String;
        getSQLType() {
          return void 0 !== this.precision && void 0 !== this.scale
            ? `numeric(${this.precision}, ${this.scale})`
            : void 0 === this.precision
              ? "numeric"
              : `numeric(${this.precision})`;
        }
      }
      function d(e, t) {
        let { name: i, config: s } = (0, r.Ll)(e, t),
          n = s?.mode;
        return "number" === n
          ? new o(i, s?.precision, s?.scale)
          : "bigint" === n
            ? new c(i, s?.precision, s?.scale)
            : new l(i, s?.precision, s?.scale);
      }
    },
    28598: (e, t, i) => {
      i.d(t, { p: () => n });
      var s = i(35925),
        r = i(18980);
      class n extends r.pe {
        static [s.i] = "PgIntColumnBaseBuilder";
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
    30487: (e, t, i) => {
      i.d(t, { mu: () => eK, cJ: () => eE });
      var s = i(35925),
        r = i(42076),
        n = i(50521),
        l = i(18980),
        a = i(28598);
      class o extends a.p {
        static [s.i] = "PgBigInt53Builder";
        constructor(e) {
          super(e, "number", "PgBigInt53");
        }
        build(e) {
          return new u(e, this.config);
        }
      }
      class u extends l.Kl {
        static [s.i] = "PgBigInt53";
        getSQLType() {
          return "bigint";
        }
        mapFromDriverValue(e) {
          return "number" == typeof e ? e : Number(e);
        }
      }
      class c extends a.p {
        static [s.i] = "PgBigInt64Builder";
        constructor(e) {
          super(e, "bigint", "PgBigInt64");
        }
        build(e) {
          return new h(e, this.config);
        }
      }
      class h extends l.Kl {
        static [s.i] = "PgBigInt64";
        getSQLType() {
          return "bigint";
        }
        mapFromDriverValue(e) {
          return BigInt(e);
        }
      }
      function d(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return "number" === s.mode ? new o(i) : new c(i);
      }
      class f extends l.pe {
        static [s.i] = "PgBigSerial53Builder";
        constructor(e) {
          super(e, "number", "PgBigSerial53"),
            (this.config.hasDefault = !0),
            (this.config.notNull = !0);
        }
        build(e) {
          return new g(e, this.config);
        }
      }
      class g extends l.Kl {
        static [s.i] = "PgBigSerial53";
        getSQLType() {
          return "bigserial";
        }
        mapFromDriverValue(e) {
          return "number" == typeof e ? e : Number(e);
        }
      }
      class p extends l.pe {
        static [s.i] = "PgBigSerial64Builder";
        constructor(e) {
          super(e, "bigint", "PgBigSerial64"), (this.config.hasDefault = !0);
        }
        build(e) {
          return new m(e, this.config);
        }
      }
      class m extends l.Kl {
        static [s.i] = "PgBigSerial64";
        getSQLType() {
          return "bigserial";
        }
        mapFromDriverValue(e) {
          return BigInt(e);
        }
      }
      function y(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return "number" === s.mode ? new f(i) : new p(i);
      }
      var b = i(90500);
      class w extends l.pe {
        static [s.i] = "PgCharBuilder";
        constructor(e, t) {
          super(e, "string", "PgChar"),
            (this.config.length = t.length),
            (this.config.enumValues = t.enum);
        }
        build(e) {
          return new S(e, this.config);
        }
      }
      class S extends l.Kl {
        static [s.i] = "PgChar";
        length = this.config.length;
        enumValues = this.config.enumValues;
        getSQLType() {
          return void 0 === this.length ? "char" : `char(${this.length})`;
        }
      }
      function v(e, t = {}) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return new w(i, s);
      }
      class $ extends l.pe {
        static [s.i] = "PgCidrBuilder";
        constructor(e) {
          super(e, "string", "PgCidr");
        }
        build(e) {
          return new T(e, this.config);
        }
      }
      class T extends l.Kl {
        static [s.i] = "PgCidr";
        getSQLType() {
          return "cidr";
        }
      }
      function N(e) {
        return new $(e ?? "");
      }
      class P extends l.pe {
        static [s.i] = "PgCustomColumnBuilder";
        constructor(e, t, i) {
          super(e, "custom", "PgCustomColumn"),
            (this.config.fieldConfig = t),
            (this.config.customTypeParams = i);
        }
        build(e) {
          return new x(e, this.config);
        }
      }
      class x extends l.Kl {
        static [s.i] = "PgCustomColumn";
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
      function q(e) {
        return (t, i) => {
          let { name: s, config: r } = (0, n.Ll)(t, i);
          return new P(s, r, e);
        };
      }
      var Q = i(59246);
      class C extends l.pe {
        static [s.i] = "PgDoublePrecisionBuilder";
        constructor(e) {
          super(e, "number", "PgDoublePrecision");
        }
        build(e) {
          return new L(e, this.config);
        }
      }
      class L extends l.Kl {
        static [s.i] = "PgDoublePrecision";
        getSQLType() {
          return "double precision";
        }
        mapFromDriverValue(e) {
          return "string" == typeof e ? Number.parseFloat(e) : e;
        }
      }
      function j(e) {
        return new C(e ?? "");
      }
      class z extends l.pe {
        static [s.i] = "PgInetBuilder";
        constructor(e) {
          super(e, "string", "PgInet");
        }
        build(e) {
          return new D(e, this.config);
        }
      }
      class D extends l.Kl {
        static [s.i] = "PgInet";
        getSQLType() {
          return "inet";
        }
      }
      function I(e) {
        return new z(e ?? "");
      }
      var B = i(91522);
      class A extends l.pe {
        static [s.i] = "PgIntervalBuilder";
        constructor(e, t) {
          super(e, "string", "PgInterval"), (this.config.intervalConfig = t);
        }
        build(e) {
          return new O(e, this.config);
        }
      }
      class O extends l.Kl {
        static [s.i] = "PgInterval";
        fields = this.config.intervalConfig.fields;
        precision = this.config.intervalConfig.precision;
        getSQLType() {
          let e = this.fields ? ` ${this.fields}` : "",
            t = this.precision ? `(${this.precision})` : "";
          return `interval${e}${t}`;
        }
      }
      function k(e, t = {}) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return new A(i, s);
      }
      var F = i(98424),
        V = i(90832);
      class X extends l.pe {
        static [s.i] = "PgLineBuilder";
        constructor(e) {
          super(e, "array", "PgLine");
        }
        build(e) {
          return new K(e, this.config);
        }
      }
      class K extends l.Kl {
        static [s.i] = "PgLine";
        getSQLType() {
          return "line";
        }
        mapFromDriverValue(e) {
          let [t, i, s] = e.slice(1, -1).split(",");
          return [
            Number.parseFloat(t),
            Number.parseFloat(i),
            Number.parseFloat(s),
          ];
        }
        mapToDriverValue(e) {
          return `{${e[0]},${e[1]},${e[2]}}`;
        }
      }
      class E extends l.pe {
        static [s.i] = "PgLineABCBuilder";
        constructor(e) {
          super(e, "json", "PgLineABC");
        }
        build(e) {
          return new _(e, this.config);
        }
      }
      class _ extends l.Kl {
        static [s.i] = "PgLineABC";
        getSQLType() {
          return "line";
        }
        mapFromDriverValue(e) {
          let [t, i, s] = e.slice(1, -1).split(",");
          return {
            a: Number.parseFloat(t),
            b: Number.parseFloat(i),
            c: Number.parseFloat(s),
          };
        }
        mapToDriverValue(e) {
          return `{${e.a},${e.b},${e.c}}`;
        }
      }
      function J(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return s?.mode && "tuple" !== s.mode ? new E(i) : new X(i);
      }
      class M extends l.pe {
        static [s.i] = "PgMacaddrBuilder";
        constructor(e) {
          super(e, "string", "PgMacaddr");
        }
        build(e) {
          return new U(e, this.config);
        }
      }
      class U extends l.Kl {
        static [s.i] = "PgMacaddr";
        getSQLType() {
          return "macaddr";
        }
      }
      function R(e) {
        return new M(e ?? "");
      }
      class W extends l.pe {
        static [s.i] = "PgMacaddr8Builder";
        constructor(e) {
          super(e, "string", "PgMacaddr8");
        }
        build(e) {
          return new H(e, this.config);
        }
      }
      class H extends l.Kl {
        static [s.i] = "PgMacaddr8";
        getSQLType() {
          return "macaddr8";
        }
      }
      function Y(e) {
        return new W(e ?? "");
      }
      var G = i(27203);
      class Z extends l.pe {
        static [s.i] = "PgPointTupleBuilder";
        constructor(e) {
          super(e, "array", "PgPointTuple");
        }
        build(e) {
          return new ee(e, this.config);
        }
      }
      class ee extends l.Kl {
        static [s.i] = "PgPointTuple";
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
      class et extends l.pe {
        static [s.i] = "PgPointObjectBuilder";
        constructor(e) {
          super(e, "json", "PgPointObject");
        }
        build(e) {
          return new ei(e, this.config);
        }
      }
      class ei extends l.Kl {
        static [s.i] = "PgPointObject";
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
      function es(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return s?.mode && "tuple" !== s.mode ? new et(i) : new Z(i);
      }
      function er(e, t) {
        let i = new DataView(new ArrayBuffer(8));
        for (let s = 0; s < 8; s++) i.setUint8(s, e[t + s]);
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
          s = t[0];
        i += 1;
        let r = new DataView(t.buffer),
          n = r.getUint32(i, 1 === s);
        if (
          ((i += 4),
          0x20000000 & n && (r.getUint32(i, 1 === s), (i += 4)),
          (65535 & n) == 1)
        ) {
          let e = er(t, i),
            s = er(t, (i += 8));
          return (i += 8), [e, s];
        }
        throw Error("Unsupported geometry type");
      }
      class el extends l.pe {
        static [s.i] = "PgGeometryBuilder";
        constructor(e) {
          super(e, "array", "PgGeometry");
        }
        build(e) {
          return new ea(e, this.config);
        }
      }
      class ea extends l.Kl {
        static [s.i] = "PgGeometry";
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
      class eo extends l.pe {
        static [s.i] = "PgGeometryObjectBuilder";
        constructor(e) {
          super(e, "json", "PgGeometryObject");
        }
        build(e) {
          return new eu(e, this.config);
        }
      }
      class eu extends l.Kl {
        static [s.i] = "PgGeometryObject";
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
      function ec(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return s?.mode && "tuple" !== s.mode ? new eo(i) : new el(i);
      }
      class eh extends l.pe {
        static [s.i] = "PgRealBuilder";
        constructor(e, t) {
          super(e, "number", "PgReal"), (this.config.length = t);
        }
        build(e) {
          return new ed(e, this.config);
        }
      }
      class ed extends l.Kl {
        static [s.i] = "PgReal";
        constructor(e, t) {
          super(e, t);
        }
        getSQLType() {
          return "real";
        }
        mapFromDriverValue = (e) =>
          "string" == typeof e ? Number.parseFloat(e) : e;
      }
      function ef(e) {
        return new eh(e ?? "");
      }
      class eg extends l.pe {
        static [s.i] = "PgSerialBuilder";
        constructor(e) {
          super(e, "number", "PgSerial"),
            (this.config.hasDefault = !0),
            (this.config.notNull = !0);
        }
        build(e) {
          return new ep(e, this.config);
        }
      }
      class ep extends l.Kl {
        static [s.i] = "PgSerial";
        getSQLType() {
          return "serial";
        }
      }
      function em(e) {
        return new eg(e ?? "");
      }
      class ey extends a.p {
        static [s.i] = "PgSmallIntBuilder";
        constructor(e) {
          super(e, "number", "PgSmallInt");
        }
        build(e) {
          return new eb(e, this.config);
        }
      }
      class eb extends l.Kl {
        static [s.i] = "PgSmallInt";
        getSQLType() {
          return "smallint";
        }
        mapFromDriverValue = (e) => ("string" == typeof e ? Number(e) : e);
      }
      function ew(e) {
        return new ey(e ?? "");
      }
      class eS extends l.pe {
        static [s.i] = "PgSmallSerialBuilder";
        constructor(e) {
          super(e, "number", "PgSmallSerial"),
            (this.config.hasDefault = !0),
            (this.config.notNull = !0);
        }
        build(e) {
          return new ev(e, this.config);
        }
      }
      class ev extends l.Kl {
        static [s.i] = "PgSmallSerial";
        getSQLType() {
          return "smallserial";
        }
      }
      function e$(e) {
        return new eS(e ?? "");
      }
      var eT = i(55753),
        eN = i(86399),
        eP = i(32856),
        ex = i(46445),
        eq = i(62085);
      class eQ extends l.pe {
        static [s.i] = "PgBinaryVectorBuilder";
        constructor(e, t) {
          super(e, "string", "PgBinaryVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new eC(e, this.config);
        }
      }
      class eC extends l.Kl {
        static [s.i] = "PgBinaryVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `bit(${this.dimensions})`;
        }
      }
      function eL(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return new eQ(i, s);
      }
      class ej extends l.pe {
        static [s.i] = "PgHalfVectorBuilder";
        constructor(e, t) {
          super(e, "array", "PgHalfVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new ez(e, this.config);
        }
      }
      class ez extends l.Kl {
        static [s.i] = "PgHalfVector";
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
      function eD(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return new ej(i, s);
      }
      class eI extends l.pe {
        static [s.i] = "PgSparseVectorBuilder";
        constructor(e, t) {
          super(e, "string", "PgSparseVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new eB(e, this.config);
        }
      }
      class eB extends l.Kl {
        static [s.i] = "PgSparseVector";
        dimensions = this.config.dimensions;
        getSQLType() {
          return `sparsevec(${this.dimensions})`;
        }
      }
      function eA(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return new eI(i, s);
      }
      class eO extends l.pe {
        static [s.i] = "PgVectorBuilder";
        constructor(e, t) {
          super(e, "array", "PgVector"),
            (this.config.dimensions = t.dimensions);
        }
        build(e) {
          return new ek(e, this.config);
        }
      }
      class ek extends l.Kl {
        static [s.i] = "PgVector";
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
      function eF(e, t) {
        let { name: i, config: s } = (0, n.Ll)(e, t);
        return new eO(i, s);
      }
      let eV = Symbol.for("drizzle:PgInlineForeignKeys"),
        eX = Symbol.for("drizzle:EnableRLS");
      class eK extends r.XI {
        static [s.i] = "PgTable";
        static Symbol = Object.assign({}, r.XI.Symbol, {
          InlineForeignKeys: eV,
          EnableRLS: eX,
        });
        [eV] = [];
        [eX] = !1;
        [r.XI.Symbol.ExtraConfigBuilder] = void 0;
        [r.XI.Symbol.ExtraConfigColumns] = {};
      }
      let eE = (e, t, i) =>
        (function (e, t, i, s, n = e) {
          let l = new eK(e, s, n),
            a =
              "function" == typeof t
                ? t({
                    bigint: d,
                    bigserial: y,
                    boolean: b.zM,
                    char: v,
                    cidr: N,
                    customType: q,
                    date: Q.p6,
                    doublePrecision: j,
                    inet: I,
                    integer: B.nd,
                    interval: k,
                    json: F.Pq,
                    jsonb: V.Fx,
                    line: J,
                    macaddr: R,
                    macaddr8: Y,
                    numeric: G.sH,
                    point: es,
                    geometry: ec,
                    real: ef,
                    serial: em,
                    smallint: ew,
                    smallserial: e$,
                    text: eT.Qq,
                    time: eN.kB,
                    timestamp: eP.vE,
                    uuid: ex.uR,
                    varchar: eq.yf,
                    bit: eL,
                    halfvec: eD,
                    sparsevec: eA,
                    vector: eF,
                  })
                : t,
            o = Object.fromEntries(
              Object.entries(a).map(([e, t]) => {
                t.setName(e);
                let i = t.build(l);
                return l[eV].push(...t.buildForeignKeys(i, l)), [e, i];
              }),
            ),
            u = Object.fromEntries(
              Object.entries(a).map(
                ([e, t]) => (t.setName(e), [e, t.buildExtraConfigColumn(l)]),
              ),
            ),
            c = Object.assign(l, o);
          return (
            (c[r.XI.Symbol.Columns] = o),
            (c[r.XI.Symbol.ExtraConfigColumns] = u),
            i && (c[eK.Symbol.ExtraConfigBuilder] = i),
            Object.assign(c, {
              enableRLS: () => ((c[eK.Symbol.EnableRLS] = !0), c),
            })
          );
        })(e, t, i, void 0);
    },
    32856: (e, t, i) => {
      i.d(t, { KM: () => o, vE: () => h, xQ: () => c });
      var s = i(35925),
        r = i(50521),
        n = i(18980),
        l = i(16807);
      class a extends l.u {
        static [s.i] = "PgTimestampBuilder";
        constructor(e, t, i) {
          super(e, "date", "PgTimestamp"),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        build(e) {
          return new o(e, this.config);
        }
      }
      class o extends n.Kl {
        static [s.i] = "PgTimestamp";
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
        static [s.i] = "PgTimestampStringBuilder";
        constructor(e, t, i) {
          super(e, "string", "PgTimestampString"),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        build(e) {
          return new c(e, this.config);
        }
      }
      class c extends n.Kl {
        static [s.i] = "PgTimestampString";
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
        let { name: i, config: s } = (0, r.Ll)(e, t);
        return s?.mode === "string"
          ? new u(i, s.withTimezone ?? !1, s.precision)
          : new a(i, s?.withTimezone ?? !1, s?.precision);
      }
    },
    35925: (e, t, i) => {
      i.d(t, { i: () => s, is: () => r });
      let s = Symbol.for("drizzle:entityKind");
      function r(e, t) {
        if (!e || "object" != typeof e) return !1;
        if (e instanceof t) return !0;
        if (!Object.prototype.hasOwnProperty.call(t, s))
          throw Error(
            `Class "${t.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`,
          );
        let i = Object.getPrototypeOf(e).constructor;
        if (i)
          for (; i; ) {
            if (s in i && i[s] === t[s]) return !0;
            i = Object.getPrototypeOf(i);
          }
        return !1;
      }
      Symbol.for("drizzle:hasOwnEntityKind");
    },
    42076: (e, t, i) => {
      i.d(t, {
        HE: () => c,
        Io: () => g,
        Lf: () => p,
        XI: () => f,
        e: () => l,
      });
      var s = i(35925),
        r = i(46647);
      let n = Symbol.for("drizzle:Schema"),
        l = Symbol.for("drizzle:Columns"),
        a = Symbol.for("drizzle:ExtraConfigColumns"),
        o = Symbol.for("drizzle:OriginalName"),
        u = Symbol.for("drizzle:BaseName"),
        c = Symbol.for("drizzle:IsAlias"),
        h = Symbol.for("drizzle:ExtraConfigBuilder"),
        d = Symbol.for("drizzle:IsDrizzleTable");
      class f {
        static [s.i] = "Table";
        static Symbol = {
          Name: r.E,
          Schema: n,
          OriginalName: o,
          Columns: l,
          ExtraConfigColumns: a,
          BaseName: u,
          IsAlias: c,
          ExtraConfigBuilder: h,
        };
        [r.E];
        [o];
        [n];
        [l];
        [a];
        [u];
        [c] = !1;
        [d] = !0;
        [h] = void 0;
        constructor(e, t, i) {
          (this[r.E] = this[o] = e), (this[n] = t), (this[u] = i);
        }
      }
      function g(e) {
        return e[r.E];
      }
      function p(e) {
        return `${e[n] ?? "public"}.${e[r.E]}`;
      }
    },
    42351: (e, t, i) => {
      i.d(t, { Y: () => r, i: () => n });
      var s = i(1991);
      function r(e) {
        return (0, s.ll)`${e} asc`;
      }
      function n(e) {
        return (0, s.ll)`${e} desc`;
      }
    },
    42727: (e, t, i) => {
      i.d(t, { hv: () => l, ie: () => n });
      var s = i(35925),
        r = i(30487);
      function n(...e) {
        return e[0].columns ? new l(e[0].columns, e[0].name) : new l(e);
      }
      class l {
        static [s.i] = "PgPrimaryKeyBuilder";
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
        static [s.i] = "PgPrimaryKey";
        columns;
        name;
        getName() {
          return (
            this.name ??
            `${this.table[r.mu.Symbol.Name]}_${this.columns.map((e) => e.name).join("_")}_pk`
          );
        }
      }
    },
    46445: (e, t, i) => {
      i.d(t, { dL: () => a, uR: () => o });
      var s = i(35925),
        r = i(1991),
        n = i(18980);
      class l extends n.pe {
        static [s.i] = "PgUUIDBuilder";
        constructor(e) {
          super(e, "string", "PgUUID");
        }
        defaultRandom() {
          return this.default((0, r.ll)`gen_random_uuid()`);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends n.Kl {
        static [s.i] = "PgUUID";
        getSQLType() {
          return "uuid";
        }
      }
      function o(e) {
        return new l(e ?? "");
      }
    },
    46647: (e, t, i) => {
      i.d(t, { E: () => s });
      let s = Symbol.for("drizzle:Name");
    },
    50521: (e, t, i) => {
      i.d(t, {
        DV: () => c,
        He: () =>
          function e(t, i) {
            return Object.entries(t).reduce((t, [l, o]) => {
              if ("string" != typeof l) return t;
              let u = i ? [...i, l] : [l];
              return (
                (0, r.is)(o, s.V) ||
                (0, r.is)(o, n.Xs) ||
                (0, r.is)(o, n.Xs.Aliased)
                  ? t.push({ path: u, field: o })
                  : (0, r.is)(o, a.XI)
                    ? t.push(...e(o[a.XI.Symbol.Columns], u))
                    : t.push(...e(o, u)),
                t
              );
            }, []);
          },
        Ll: () => p,
        Lq: () => m,
        XJ: () => d,
        YD: () => f,
        a6: () => u,
        q: () => h,
        zN: () => g,
      });
      var s = i(91148),
        r = i(35925),
        n = i(1991),
        l = i(84136),
        a = i(42076),
        o = i(95633);
      function u(e, t, i) {
        let l = {},
          o = e.reduce((e, { path: o, field: u }, c) => {
            let h;
            h = (0, r.is)(u, s.V)
              ? u
              : (0, r.is)(u, n.Xs)
                ? u.decoder
                : u.sql.decoder;
            let d = e;
            for (let [e, n] of o.entries())
              if (e < o.length - 1) n in d || (d[n] = {}), (d = d[n]);
              else {
                let e = t[c],
                  f = (d[n] = null === e ? null : h.mapFromDriverValue(e));
                if (i && (0, r.is)(u, s.V) && 2 === o.length) {
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
          s = Object.keys(t);
        if (i.length !== s.length) return !1;
        for (let [e, t] of i.entries()) if (t !== s[e]) return !1;
        return !0;
      }
      function h(e, t) {
        let i = Object.entries(t)
          .filter(([, e]) => void 0 !== e)
          .map(([t, i]) =>
            (0, r.is)(i, n.Xs) || (0, r.is)(i, s.V)
              ? [t, i]
              : [t, new n.Iw(i, e[a.XI.Symbol.Columns][t])],
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
      function g(e) {
        return (0, r.is)(e, l.n)
          ? e._.alias
          : (0, r.is)(e, n.Ss)
            ? e[o.n].name
            : (0, r.is)(e, n.Xs)
              ? void 0
              : e[a.XI.Symbol.IsAlias]
                ? e[a.XI.Symbol.Name]
                : e[a.XI.Symbol.BaseName];
      }
      function p(e, t) {
        return {
          name: "string" == typeof e && e.length > 0 ? e : "",
          config: "object" == typeof e ? e : t,
        };
      }
      function m(e) {
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
          let t = typeof e.schema;
          return "object" === t || "undefined" === t;
        }
        if ("casing" in e) {
          let t = typeof e.casing;
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
    52549: (e, t, i) => {
      i.d(t, { f: () => eq });
      var s = i(78814),
        r = i(35925);
      class n {
        static [r.i] = "ConsoleLogWriter";
        write(e) {
          console.log(e);
        }
      }
      class l {
        static [r.i] = "DefaultLogger";
        writer;
        constructor(e) {
          this.writer = e?.writer ?? new n();
        }
        logQuery(e, t) {
          let i = t.map((e) => {
              try {
                return JSON.stringify(e);
              } catch {
                return String(e);
              }
            }),
            s = i.length ? ` -- params: [${i.join(", ")}]` : "";
          this.writer.write(`Query: ${e}${s}`);
        }
      }
      class a {
        static [r.i] = "NoopLogger";
        logQuery() {}
      }
      var o = i(91148),
        u = i(1991),
        c = i(42076),
        h = i(95633);
      class d {
        constructor(e) {
          this.table = e;
        }
        static [r.i] = "ColumnAliasProxyHandler";
        get(e, t) {
          return "table" === t ? this.table : e[t];
        }
      }
      class f {
        constructor(e, t) {
          (this.alias = e), (this.replaceOriginalName = t);
        }
        static [r.i] = "TableAliasProxyHandler";
        get(e, t) {
          if (t === c.XI.Symbol.IsAlias) return !0;
          if (
            t === c.XI.Symbol.Name ||
            (this.replaceOriginalName && t === c.XI.Symbol.OriginalName)
          )
            return this.alias;
          if (t === h.n) return { ...e[h.n], name: this.alias, isAlias: !0 };
          if (t === c.XI.Symbol.Columns) {
            let t = e[c.XI.Symbol.Columns];
            if (!t) return t;
            let i = {};
            return (
              Object.keys(t).map((s) => {
                i[s] = new Proxy(t[s], new d(new Proxy(e, this)));
              }),
              i
            );
          }
          let i = e[t];
          return (0, r.is)(i, o.V)
            ? new Proxy(i, new d(new Proxy(e, this)))
            : i;
        }
      }
      class g {
        constructor(e) {
          this.alias = e;
        }
        static [r.i] = null;
        get(e, t) {
          return "sourceTable" === t ? p(e.sourceTable, this.alias) : e[t];
        }
      }
      function p(e, t) {
        return new Proxy(e, new f(t, !1));
      }
      function m(e, t) {
        return new Proxy(e, new d(new Proxy(e.table, new f(t, !1))));
      }
      function y(e, t) {
        return new u.Xs.Aliased(b(e.sql, t), e.fieldAlias);
      }
      function b(e, t) {
        return u.ll.join(
          e.queryChunks.map((e) =>
            (0, r.is)(e, o.V)
              ? m(e, t)
              : (0, r.is)(e, u.Xs)
                ? b(e, t)
                : (0, r.is)(e, u.Xs.Aliased)
                  ? y(e, t)
                  : e,
          ),
        );
      }
      function w(e) {
        return (
          e
            .replace(/['\u2019]/g, "")
            .match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []
        )
          .map((e) => e.toLowerCase())
          .join("_");
      }
      function S(e) {
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
      function v(e) {
        return e;
      }
      class $ {
        static [r.i] = "CasingCache";
        cache = {};
        cachedTables = {};
        convert;
        constructor(e) {
          this.convert = "snake_case" === e ? w : "camelCase" === e ? S : v;
        }
        getColumnCasing(e) {
          if (!e.keyAsName) return e.name;
          let t = e.table[c.XI.Symbol.Schema] ?? "public",
            i = e.table[c.XI.Symbol.OriginalName],
            s = `${t}.${i}.${e.name}`;
          return this.cache[s] || this.cacheTable(e.table), this.cache[s];
        }
        cacheTable(e) {
          let t = e[c.XI.Symbol.Schema] ?? "public",
            i = e[c.XI.Symbol.OriginalName],
            s = `${t}.${i}`;
          if (!this.cachedTables[s]) {
            for (let t of Object.values(e[c.XI.Symbol.Columns])) {
              let e = `${s}.${t.name}`;
              this.cache[e] = this.convert(t.name);
            }
            this.cachedTables[s] = !0;
          }
        }
        clearCache() {
          (this.cache = {}), (this.cachedTables = {});
        }
      }
      class T extends Error {
        static [r.i] = "DrizzleError";
        constructor({ message: e, cause: t }) {
          super(e), (this.name = "DrizzleError"), (this.cause = t);
        }
      }
      class N extends T {
        static [r.i] = "TransactionRollbackError";
        constructor() {
          super({ message: "Rollback" });
        }
      }
      var P = i(18980),
        x = i(90832),
        q = i(98424),
        Q = i(27203),
        C = i(86399),
        L = i(32856),
        j = i(59246),
        z = i(46445),
        D = i(30487),
        I = i(42727),
        B = i(649),
        A = i(42351);
      class O {
        constructor(e, t, i) {
          (this.sourceTable = e),
            (this.referencedTable = t),
            (this.relationName = i),
            (this.referencedTableName = t[c.XI.Symbol.Name]);
        }
        static [r.i] = "Relation";
        referencedTableName;
        fieldName;
      }
      class k {
        constructor(e, t) {
          (this.table = e), (this.config = t);
        }
        static [r.i] = "Relations";
      }
      class F extends O {
        constructor(e, t, i, s) {
          super(e, t, i?.relationName),
            (this.config = i),
            (this.isNullable = s);
        }
        static [r.i] = "One";
        withFieldName(e) {
          let t = new F(
            this.sourceTable,
            this.referencedTable,
            this.config,
            this.isNullable,
          );
          return (t.fieldName = e), t;
        }
      }
      class V extends O {
        constructor(e, t, i) {
          super(e, t, i?.relationName), (this.config = i);
        }
        static [r.i] = "Many";
        withFieldName(e) {
          let t = new V(this.sourceTable, this.referencedTable, this.config);
          return (t.fieldName = e), t;
        }
      }
      function X(e) {
        return {
          one: function (t, i) {
            return new F(
              e,
              t,
              i,
              i?.fields.reduce((e, t) => e && t.notNull, !0) ?? !1,
            );
          },
          many: function (t, i) {
            return new V(e, t, i);
          },
        };
      }
      var K = i(84136),
        E = i(50521);
      class _ extends u.Ss {
        static [r.i] = "PgViewBase";
      }
      class J {
        static [r.i] = "PgDialect";
        casing;
        constructor(e) {
          this.casing = new $(e?.casing);
        }
        async migrate(e, t, i) {
          let s =
              "string" == typeof i
                ? "__drizzle_migrations"
                : (i.migrationsTable ?? "__drizzle_migrations"),
            r =
              "string" == typeof i
                ? "drizzle"
                : (i.migrationsSchema ?? "drizzle"),
            n = (0, u.ll)`
			CREATE TABLE IF NOT EXISTS ${u.ll.identifier(r)}.${u.ll.identifier(s)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
          await t.execute(
            (0, u.ll)`CREATE SCHEMA IF NOT EXISTS ${u.ll.identifier(r)}`,
          ),
            await t.execute(n);
          let l = (
            await t.all(
              (0,
              u.ll)`select id, hash, created_at from ${u.ll.identifier(r)}.${u.ll.identifier(s)} order by created_at desc limit 1`,
            )
          )[0];
          await t.transaction(async (t) => {
            for await (let i of e)
              if (!l || Number(l.created_at) < i.folderMillis) {
                for (let e of i.sql) await t.execute(u.ll.raw(e));
                await t.execute(
                  (0,
                  u.ll)`insert into ${u.ll.identifier(r)}.${u.ll.identifier(s)} ("hash", "created_at") values(${i.hash}, ${i.folderMillis})`,
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
          let t = [(0, u.ll)`with `];
          for (let [i, s] of e.entries())
            t.push((0, u.ll)`${u.ll.identifier(s._.alias)} as (${s._.sql})`),
              i < e.length - 1 && t.push((0, u.ll)`, `);
          return t.push((0, u.ll)` `), u.ll.join(t);
        }
        buildDeleteQuery({ table: e, where: t, returning: i, withList: s }) {
          let r = this.buildWithCTE(s),
            n = i
              ? (0,
                u.ll)` returning ${this.buildSelection(i, { isSingleTable: !0 })}`
              : void 0,
            l = t ? (0, u.ll)` where ${t}` : void 0;
          return (0, u.ll)`${r}delete from ${e}${l}${n}`;
        }
        buildUpdateSet(e, t) {
          let i = e[c.XI.Symbol.Columns],
            s = Object.keys(i).filter(
              (e) => void 0 !== t[e] || i[e]?.onUpdateFn !== void 0,
            ),
            r = s.length;
          return u.ll.join(
            s.flatMap((e, s) => {
              let n = i[e],
                l = t[e] ?? u.ll.param(n.onUpdateFn(), n),
                a = (0,
                u.ll)`${u.ll.identifier(this.casing.getColumnCasing(n))} = ${l}`;
              return s < r - 1 ? [a, u.ll.raw(", ")] : [a];
            }),
          );
        }
        buildUpdateQuery({
          table: e,
          set: t,
          where: i,
          returning: s,
          withList: r,
          from: n,
          joins: l,
        }) {
          let a = this.buildWithCTE(r),
            o = e[D.mu.Symbol.Name],
            c = e[D.mu.Symbol.Schema],
            h = e[D.mu.Symbol.OriginalName],
            d = o === h ? void 0 : o,
            f = (0,
            u.ll)`${c ? (0, u.ll)`${u.ll.identifier(c)}.` : void 0}${u.ll.identifier(h)}${d && (0, u.ll)` ${u.ll.identifier(d)}`}`,
            g = this.buildUpdateSet(e, t),
            p = n && u.ll.join([u.ll.raw(" from "), this.buildFromTable(n)]),
            m = this.buildJoins(l),
            y = s
              ? (0,
                u.ll)` returning ${this.buildSelection(s, { isSingleTable: !n })}`
              : void 0,
            b = i ? (0, u.ll)` where ${i}` : void 0;
          return (0, u.ll)`${a}update ${f} set ${g}${p}${m}${b}${y}`;
        }
        buildSelection(e, { isSingleTable: t = !1 } = {}) {
          let i = e.length,
            s = e.flatMap(({ field: e }, s) => {
              let n = [];
              if ((0, r.is)(e, u.Xs.Aliased) && e.isSelectionField)
                n.push(u.ll.identifier(e.fieldAlias));
              else if ((0, r.is)(e, u.Xs.Aliased) || (0, r.is)(e, u.Xs)) {
                let i = (0, r.is)(e, u.Xs.Aliased) ? e.sql : e;
                t
                  ? n.push(
                      new u.Xs(
                        i.queryChunks.map((e) =>
                          (0, r.is)(e, P.Kl)
                            ? u.ll.identifier(this.casing.getColumnCasing(e))
                            : e,
                        ),
                      ),
                    )
                  : n.push(i),
                  (0, r.is)(e, u.Xs.Aliased) &&
                    n.push((0, u.ll)` as ${u.ll.identifier(e.fieldAlias)}`);
              } else
                (0, r.is)(e, o.V) &&
                  (t
                    ? n.push(u.ll.identifier(this.casing.getColumnCasing(e)))
                    : n.push(e));
              return s < i - 1 && n.push((0, u.ll)`, `), n;
            });
          return u.ll.join(s);
        }
        buildJoins(e) {
          if (!e || 0 === e.length) return;
          let t = [];
          for (let [i, s] of e.entries()) {
            0 === i && t.push((0, u.ll)` `);
            let n = s.table,
              l = s.lateral ? (0, u.ll)` lateral` : void 0,
              a = s.on ? (0, u.ll)` on ${s.on}` : void 0;
            if ((0, r.is)(n, D.mu)) {
              let e = n[D.mu.Symbol.Name],
                i = n[D.mu.Symbol.Schema],
                r = n[D.mu.Symbol.OriginalName],
                o = e === r ? void 0 : s.alias;
              t.push(
                (0,
                u.ll)`${u.ll.raw(s.joinType)} join${l} ${i ? (0, u.ll)`${u.ll.identifier(i)}.` : void 0}${u.ll.identifier(r)}${o && (0, u.ll)` ${u.ll.identifier(o)}`}${a}`,
              );
            } else if ((0, r.is)(n, u.Ss)) {
              let e = n[h.n].name,
                i = n[h.n].schema,
                r = n[h.n].originalName,
                o = e === r ? void 0 : s.alias;
              t.push(
                (0,
                u.ll)`${u.ll.raw(s.joinType)} join${l} ${i ? (0, u.ll)`${u.ll.identifier(i)}.` : void 0}${u.ll.identifier(r)}${o && (0, u.ll)` ${u.ll.identifier(o)}`}${a}`,
              );
            } else t.push((0, u.ll)`${u.ll.raw(s.joinType)} join${l} ${n}${a}`);
            i < e.length - 1 && t.push((0, u.ll)` `);
          }
          return u.ll.join(t);
        }
        buildFromTable(e) {
          if ((0, r.is)(e, c.XI) && e[c.XI.Symbol.IsAlias]) {
            let t = (0, u.ll)`${u.ll.identifier(e[c.XI.Symbol.OriginalName])}`;
            return (
              e[c.XI.Symbol.Schema] &&
                (t = (0, u.ll)`${u.ll.identifier(e[c.XI.Symbol.Schema])}.${t}`),
              (0, u.ll)`${t} ${u.ll.identifier(e[c.XI.Symbol.Name])}`
            );
          }
          return e;
        }
        buildSelectQuery({
          withList: e,
          fields: t,
          fieldsFlat: i,
          where: s,
          having: n,
          table: l,
          joins: a,
          orderBy: d,
          groupBy: f,
          limit: g,
          offset: p,
          lockingClause: m,
          distinct: y,
          setOperators: b,
        }) {
          let w,
            S,
            v,
            $ = i ?? (0, E.He)(t);
          for (let e of $) {
            let t;
            if (
              (0, r.is)(e.field, o.V) &&
              (0, c.Io)(e.field.table) !==
                ((0, r.is)(l, K.n)
                  ? l._.alias
                  : (0, r.is)(l, _)
                    ? l[h.n].name
                    : (0, r.is)(l, u.Xs)
                      ? void 0
                      : (0, c.Io)(l)) &&
              ((t = e.field.table),
              !a?.some(
                ({ alias: e }) =>
                  e ===
                  (t[c.XI.Symbol.IsAlias]
                    ? (0, c.Io)(t)
                    : t[c.XI.Symbol.BaseName]),
              ))
            ) {
              let t = (0, c.Io)(e.field.table);
              throw Error(
                `Your "${e.path.join("->")}" field references a column "${t}"."${e.field.name}", but the table "${t}" is not part of the query! Did you forget to join it?`,
              );
            }
          }
          let T = !a || 0 === a.length,
            N = this.buildWithCTE(e);
          y &&
            (w =
              !0 === y
                ? (0, u.ll)` distinct`
                : (0, u.ll)` distinct on (${u.ll.join(y.on, (0, u.ll)`, `)})`);
          let P = this.buildSelection($, { isSingleTable: T }),
            x = this.buildFromTable(l),
            q = this.buildJoins(a),
            Q = s ? (0, u.ll)` where ${s}` : void 0,
            C = n ? (0, u.ll)` having ${n}` : void 0;
          d &&
            d.length > 0 &&
            (S = (0, u.ll)` order by ${u.ll.join(d, (0, u.ll)`, `)}`),
            f &&
              f.length > 0 &&
              (v = (0, u.ll)` group by ${u.ll.join(f, (0, u.ll)`, `)}`);
          let L =
              "object" == typeof g || ("number" == typeof g && g >= 0)
                ? (0, u.ll)` limit ${g}`
                : void 0,
            j = p ? (0, u.ll)` offset ${p}` : void 0,
            z = u.ll.empty();
          if (m) {
            let e = (0, u.ll)` for ${u.ll.raw(m.strength)}`;
            m.config.of &&
              e.append(
                (0,
                u.ll)` of ${u.ll.join(Array.isArray(m.config.of) ? m.config.of : [m.config.of], (0, u.ll)`, `)}`,
              ),
              m.config.noWait
                ? e.append((0, u.ll)` nowait`)
                : m.config.skipLocked && e.append((0, u.ll)` skip locked`),
              z.append(e);
          }
          let D = (0,
          u.ll)`${N}select${w} ${P} from ${x}${q}${Q}${v}${C}${S}${L}${j}${z}`;
          return b.length > 0 ? this.buildSetOperations(D, b) : D;
        }
        buildSetOperations(e, t) {
          let [i, ...s] = t;
          if (!i)
            throw Error("Cannot pass undefined values to any set operator");
          return 0 === s.length
            ? this.buildSetOperationQuery({ leftSelect: e, setOperator: i })
            : this.buildSetOperations(
                this.buildSetOperationQuery({ leftSelect: e, setOperator: i }),
                s,
              );
        }
        buildSetOperationQuery({
          leftSelect: e,
          setOperator: {
            type: t,
            isAll: i,
            rightSelect: s,
            limit: n,
            orderBy: l,
            offset: a,
          },
        }) {
          let o,
            c = (0, u.ll)`(${e.getSQL()}) `,
            h = (0, u.ll)`(${s.getSQL()})`;
          if (l && l.length > 0) {
            let e = [];
            for (let t of l)
              if ((0, r.is)(t, P.Kl)) e.push(u.ll.identifier(t.name));
              else if ((0, r.is)(t, u.Xs)) {
                for (let e = 0; e < t.queryChunks.length; e++) {
                  let i = t.queryChunks[e];
                  (0, r.is)(i, P.Kl) &&
                    (t.queryChunks[e] = u.ll.identifier(i.name));
                }
                e.push((0, u.ll)`${t}`);
              } else e.push((0, u.ll)`${t}`);
            o = (0, u.ll)` order by ${u.ll.join(e, (0, u.ll)`, `)} `;
          }
          let d =
              "object" == typeof n || ("number" == typeof n && n >= 0)
                ? (0, u.ll)` limit ${n}`
                : void 0,
            f = u.ll.raw(`${t} ${i ? "all " : ""}`),
            g = a ? (0, u.ll)` offset ${a}` : void 0;
          return (0, u.ll)`${c}${f}${h}${o}${d}${g}`;
        }
        buildInsertQuery({
          table: e,
          values: t,
          onConflict: i,
          returning: s,
          withList: n,
          select: l,
          overridingSystemValue_: a,
        }) {
          let o = [],
            h = Object.entries(e[c.XI.Symbol.Columns]).filter(
              ([e, t]) => !t.shouldDisableInsert(),
            ),
            d = h.map(([, e]) =>
              u.ll.identifier(this.casing.getColumnCasing(e)),
            );
          if (l) (0, r.is)(t, u.Xs) ? o.push(t) : o.push(t.getSQL());
          else
            for (let [e, i] of (o.push(u.ll.raw("values ")), t.entries())) {
              let s = [];
              for (let [e, t] of h) {
                let n = i[e];
                if (void 0 === n || ((0, r.is)(n, u.Iw) && void 0 === n.value))
                  if (void 0 !== t.defaultFn) {
                    let e = t.defaultFn(),
                      i = (0, r.is)(e, u.Xs) ? e : u.ll.param(e, t);
                    s.push(i);
                  } else if (t.default || void 0 === t.onUpdateFn)
                    s.push((0, u.ll)`default`);
                  else {
                    let e = t.onUpdateFn(),
                      i = (0, r.is)(e, u.Xs) ? e : u.ll.param(e, t);
                    s.push(i);
                  }
                else s.push(n);
              }
              o.push(s), e < t.length - 1 && o.push((0, u.ll)`, `);
            }
          let f = this.buildWithCTE(n),
            g = u.ll.join(o),
            p = s
              ? (0,
                u.ll)` returning ${this.buildSelection(s, { isSingleTable: !0 })}`
              : void 0,
            m = i ? (0, u.ll)` on conflict ${i}` : void 0,
            y = !0 === a ? (0, u.ll)`overriding system value ` : void 0;
          return (0, u.ll)`${f}insert into ${e} ${d} ${y}${g}${m}${p}`;
        }
        buildRefreshMaterializedViewQuery({
          view: e,
          concurrently: t,
          withNoData: i,
        }) {
          let s = t ? (0, u.ll)` concurrently` : void 0,
            r = i ? (0, u.ll)` with no data` : void 0;
          return (0, u.ll)`refresh materialized view${s} ${e}${r}`;
        }
        prepareTyping(e) {
          if ((0, r.is)(e, x.kn) || (0, r.is)(e, q.iX)) return "json";
          if ((0, r.is)(e, Q.Z5)) return "decimal";
          if ((0, r.is)(e, C.Xd)) return "time";
          if ((0, r.is)(e, L.KM) || (0, r.is)(e, L.xQ)) return "timestamp";
          if ((0, r.is)(e, j.qw) || (0, r.is)(e, j.dw)) return "date";
          else if ((0, r.is)(e, z.dL)) return "uuid";
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
          table: s,
          tableConfig: n,
          queryConfig: l,
          tableAlias: a,
          nestedQueryRelation: h,
          joinOn: d,
        }) {
          let f,
            g = [],
            w,
            S,
            v = [],
            $,
            N = [];
          if (!0 === l)
            g = Object.entries(n.columns).map(([e, t]) => ({
              dbKey: t.name,
              tsKey: e,
              field: m(t, a),
              relationTableTsKey: void 0,
              isJson: !1,
              selection: [],
            }));
          else {
            let s = Object.fromEntries(
              Object.entries(n.columns).map(([e, t]) => [e, m(t, a)]),
            );
            if (l.where) {
              let e =
                "function" == typeof l.where
                  ? l.where(s, {
                      and: B.Uo,
                      between: B.Tq,
                      eq: B.eq,
                      exists: B.t2,
                      gt: B.gt,
                      gte: B.RO,
                      ilike: B.B3,
                      inArray: B.RV,
                      isNull: B.kZ,
                      isNotNull: B.Pe,
                      like: B.mj,
                      lt: B.lt,
                      lte: B.wJ,
                      ne: B.ne,
                      not: B.AU,
                      notBetween: B.o8,
                      notExists: B.KJ,
                      notLike: B.RK,
                      notIlike: B.q1,
                      notInArray: B.KL,
                      or: B.or,
                      sql: u.ll,
                    })
                  : l.where;
              $ = e && b(e, a);
            }
            let h = [],
              d = [];
            if (l.columns) {
              let e = !1;
              for (let [t, i] of Object.entries(l.columns))
                void 0 !== i &&
                  t in n.columns &&
                  (e || !0 !== i || (e = !0), d.push(t));
              d.length > 0 &&
                (d = e
                  ? d.filter((e) => l.columns?.[e] === !0)
                  : Object.keys(n.columns).filter((e) => !d.includes(e)));
            } else d = Object.keys(n.columns);
            for (let e of d) {
              let t = n.columns[e];
              h.push({ tsKey: e, value: t });
            }
            let f = [];
            if (
              (l.with &&
                (f = Object.entries(l.with)
                  .filter((e) => !!e[1])
                  .map(([e, t]) => ({
                    tsKey: e,
                    queryConfig: t,
                    relation: n.relations[e],
                  }))),
              l.extras)
            )
              for (let [e, t] of Object.entries(
                "function" == typeof l.extras
                  ? l.extras(s, { sql: u.ll })
                  : l.extras,
              ))
                h.push({ tsKey: e, value: y(t, a) });
            for (let { tsKey: e, value: t } of h)
              g.push({
                dbKey: (0, r.is)(t, u.Xs.Aliased)
                  ? t.fieldAlias
                  : n.columns[e].name,
                tsKey: e,
                field: (0, r.is)(t, o.V) ? m(t, a) : t,
                relationTableTsKey: void 0,
                isJson: !1,
                selection: [],
              });
            let p =
              "function" == typeof l.orderBy
                ? l.orderBy(s, { sql: u.ll, asc: A.Y, desc: A.i })
                : (l.orderBy ?? []);
            for (let {
              tsKey: s,
              queryConfig: n,
              relation: h,
            } of (Array.isArray(p) || (p = [p]),
            (v = p.map((e) => ((0, r.is)(e, o.V) ? m(e, a) : b(e, a)))),
            (w = l.limit),
            (S = l.offset),
            f)) {
              let l = (function (e, t, i) {
                  if ((0, r.is)(i, F) && i.config)
                    return {
                      fields: i.config.fields,
                      references: i.config.references,
                    };
                  let s = t[(0, c.Lf)(i.referencedTable)];
                  if (!s)
                    throw Error(
                      `Table "${i.referencedTable[c.XI.Symbol.Name]}" not found in schema`,
                    );
                  let n = e[s];
                  if (!n) throw Error(`Table "${s}" not found in schema`);
                  let l = i.sourceTable,
                    a = t[(0, c.Lf)(l)];
                  if (!a)
                    throw Error(
                      `Table "${l[c.XI.Symbol.Name]}" not found in schema`,
                    );
                  let o = [];
                  for (let e of Object.values(n.relations))
                    ((i.relationName &&
                      i !== e &&
                      e.relationName === i.relationName) ||
                      (!i.relationName &&
                        e.referencedTable === i.sourceTable)) &&
                      o.push(e);
                  if (o.length > 1)
                    throw i.relationName
                      ? Error(
                          `There are multiple relations with name "${i.relationName}" in table "${s}"`,
                        )
                      : Error(
                          `There are multiple relations between "${s}" and "${i.sourceTable[c.XI.Symbol.Name]}". Please specify relation name`,
                        );
                  if (o[0] && (0, r.is)(o[0], F) && o[0].config)
                    return {
                      fields: o[0].config.references,
                      references: o[0].config.fields,
                    };
                  throw Error(
                    `There is not enough information to infer relation "${a}.${i.fieldName}"`,
                  );
                })(t, i, h),
                o = i[(0, c.Lf)(h.referencedTable)],
                d = `${a}_${s}`,
                f = (0, B.Uo)(
                  ...l.fields.map((e, t) =>
                    (0, B.eq)(m(l.references[t], d), m(e, a)),
                  ),
                ),
                p = this.buildRelationalQueryWithoutPK({
                  fullSchema: e,
                  schema: t,
                  tableNamesMap: i,
                  table: e[o],
                  tableConfig: t[o],
                  queryConfig: (0, r.is)(h, F)
                    ? !0 === n
                      ? { limit: 1 }
                      : { ...n, limit: 1 }
                    : n,
                  tableAlias: d,
                  joinOn: f,
                  nestedQueryRelation: h,
                }),
                y = (0,
                u.ll)`${u.ll.identifier(d)}.${u.ll.identifier("data")}`.as(s);
              N.push({
                on: (0, u.ll)`true`,
                table: new K.n(p.sql, {}, d),
                alias: d,
                joinType: "left",
                lateral: !0,
              }),
                g.push({
                  dbKey: s,
                  tsKey: s,
                  field: y,
                  relationTableTsKey: o,
                  isJson: !0,
                  selection: p.selection,
                });
            }
          }
          if (0 === g.length)
            throw new T({
              message: `No fields selected for table "${n.tsName}" ("${a}")`,
            });
          if ((($ = (0, B.Uo)(d, $)), h)) {
            let e = (0, u.ll)`json_build_array(${u.ll.join(
              g.map(({ field: e, tsKey: t, isJson: i }) =>
                i
                  ? (0,
                    u.ll)`${u.ll.identifier(`${a}_${t}`)}.${u.ll.identifier("data")}`
                  : (0, r.is)(e, u.Xs.Aliased)
                    ? e.sql
                    : e,
              ),
              (0, u.ll)`, `,
            )})`;
            (0, r.is)(h, V) &&
              (e = (0,
              u.ll)`coalesce(json_agg(${e}${v.length > 0 ? (0, u.ll)` order by ${u.ll.join(v, (0, u.ll)`, `)}` : void 0}), '[]'::json)`);
            let t = [
              {
                dbKey: "data",
                tsKey: "data",
                field: e.as("data"),
                isJson: !0,
                relationTableTsKey: n.tsName,
                selection: g,
              },
            ];
            void 0 !== w || void 0 !== S || v.length > 0
              ? ((f = this.buildSelectQuery({
                  table: p(s, a),
                  fields: {},
                  fieldsFlat: [{ path: [], field: u.ll.raw("*") }],
                  where: $,
                  limit: w,
                  offset: S,
                  orderBy: v,
                  setOperators: [],
                })),
                ($ = void 0),
                (w = void 0),
                (S = void 0),
                (v = []))
              : (f = p(s, a)),
              (f = this.buildSelectQuery({
                table: (0, r.is)(f, D.mu) ? f : new K.n(f, {}, a),
                fields: {},
                fieldsFlat: t.map(({ field: e }) => ({
                  path: [],
                  field: (0, r.is)(e, o.V) ? m(e, a) : e,
                })),
                joins: N,
                where: $,
                limit: w,
                offset: S,
                orderBy: v,
                setOperators: [],
              }));
          } else
            f = this.buildSelectQuery({
              table: p(s, a),
              fields: {},
              fieldsFlat: g.map(({ field: e }) => ({
                path: [],
                field: (0, r.is)(e, o.V) ? m(e, a) : e,
              })),
              joins: N,
              where: $,
              limit: w,
              offset: S,
              orderBy: v,
              setOperators: [],
            });
          return { tableTsKey: n.tsName, sql: f, selection: g };
        }
      }
      class M {
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
          if (t === h.n)
            return {
              ...e[h.n],
              selectedFields: new Proxy(e[h.n].selectedFields, this),
            };
          if ("symbol" == typeof t) return e[t];
          let i = (
            (0, r.is)(e, K.n)
              ? e._.selectedFields
              : (0, r.is)(e, u.Ss)
                ? e[h.n].selectedFields
                : e
          )[t];
          if ((0, r.is)(i, u.Xs.Aliased)) {
            if ("sql" === this.config.sqlAliasedBehavior && !i.isSelectionField)
              return i.sql;
            let e = i.clone();
            return (e.isSelectionField = !0), e;
          }
          if ((0, r.is)(i, u.Xs)) {
            if ("sql" === this.config.sqlBehavior) return i;
            throw Error(
              `You tried to reference "${t}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`,
            );
          }
          return (0, r.is)(i, o.V)
            ? this.config.alias
              ? new Proxy(
                  i,
                  new d(
                    new Proxy(
                      i.table,
                      new f(
                        this.config.alias,
                        this.config.replaceOriginalName ?? !1,
                      ),
                    ),
                  ),
                )
              : i
            : "object" != typeof i || null === i
              ? i
              : new Proxy(i, new M(this.config));
        }
      }
      class U {
        static [r.i] = "TypedQueryBuilder";
        getSelectedFields() {
          return this._.selectedFields;
        }
      }
      class R {
        static [r.i] = "QueryPromise";
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
      var W = i(25503);
      class H {
        static [r.i] = "PgSelectBuilder";
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
              : (0, r.is)(e, K.n)
                ? Object.fromEntries(
                    Object.keys(e._.selectedFields).map((t) => [t, e[t]]),
                  )
                : (0, r.is)(e, _)
                  ? e[h.n].selectedFields
                  : (0, r.is)(e, u.Xs)
                    ? {}
                    : (0, E.YD)(e)),
            new G({
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
      class Y extends U {
        static [r.i] = "PgSelectQueryBuilder";
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
          session: s,
          dialect: r,
          withList: n,
          distinct: l,
        }) {
          super(),
            (this.config = {
              withList: n,
              table: e,
              fields: { ...t },
              distinct: l,
              setOperators: [],
            }),
            (this.isPartialSelect = i),
            (this.session = s),
            (this.dialect = r),
            (this._ = { selectedFields: t }),
            (this.tableName = (0, E.zN)(e)),
            (this.joinsNotNullableMap =
              "string" == typeof this.tableName
                ? { [this.tableName]: !0 }
                : {});
        }
        createJoin(e, t) {
          return (i, s) => {
            let n = this.tableName,
              l = (0, E.zN)(i);
            if (
              "string" == typeof l &&
              this.config.joins?.some((e) => e.alias === l)
            )
              throw Error(`Alias "${l}" is already used in this query`);
            if (
              !this.isPartialSelect &&
              (1 === Object.keys(this.joinsNotNullableMap).length &&
                "string" == typeof n &&
                (this.config.fields = { [n]: this.config.fields }),
              "string" == typeof l && !(0, r.is)(i, u.Xs))
            ) {
              let e = (0, r.is)(i, K.n)
                ? i._.selectedFields
                : (0, r.is)(i, u.Ss)
                  ? i[h.n].selectedFields
                  : i[c.XI.Symbol.Columns];
              this.config.fields[l] = e;
            }
            if (
              ("function" == typeof s &&
                (s = s(
                  new Proxy(
                    this.config.fields,
                    new M({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                  ),
                )),
              this.config.joins || (this.config.joins = []),
              this.config.joins.push({
                on: s,
                table: i,
                joinType: e,
                alias: l,
                lateral: t,
              }),
              "string" == typeof l)
            )
              switch (e) {
                case "left":
                  this.joinsNotNullableMap[l] = !1;
                  break;
                case "right":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[l] = !0);
                  break;
                case "cross":
                case "inner":
                  this.joinsNotNullableMap[l] = !0;
                  break;
                case "full":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[l] = !1);
              }
            return this;
          };
        }
        leftJoin = this.createJoin("left", !1);
        leftJoinLateral = this.createJoin("left", !0);
        rightJoin = this.createJoin("right", !1);
        innerJoin = this.createJoin("inner", !1);
        innerJoinLateral = this.createJoin("inner", !0);
        fullJoin = this.createJoin("full", !1);
        crossJoin = this.createJoin("cross", !1);
        crossJoinLateral = this.createJoin("cross", !0);
        createSetOperator(e, t) {
          return (i) => {
            let s = "function" == typeof i ? i(ee()) : i;
            if (!(0, E.DV)(this.getSelectedFields(), s.getSelectedFields()))
              throw Error(
                "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
              );
            return (
              this.config.setOperators.push({
                type: e,
                isAll: t,
                rightSelect: s,
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
                  new M({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
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
                  new M({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
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
                new M({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
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
                  new M({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
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
            new K.n(this.getSQL(), this.config.fields, e),
            new M({
              alias: e,
              sqlAliasedBehavior: "alias",
              sqlBehavior: "error",
            }),
          );
        }
        getSelectedFields() {
          return new Proxy(
            this.config.fields,
            new M({
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
      class G extends Y {
        static [r.i] = "PgSelect";
        _prepare(e) {
          let {
            session: t,
            config: i,
            dialect: s,
            joinsNotNullableMap: r,
            authToken: n,
          } = this;
          if (!t)
            throw Error(
              "Cannot execute a query on a query builder. Please use a database instance instead.",
            );
          return W.k.startActiveSpan("drizzle.prepareQuery", () => {
            let l = (0, E.He)(i.fields),
              a = t.prepareQuery(s.sqlToQuery(this.getSQL()), l, e, !0);
            return (a.joinsNotNullableMap = r), a.setToken(n);
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
          W.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
      }
      function Z(e, t) {
        return (i, s, ...r) => {
          let n = [s, ...r].map((i) => ({ type: e, isAll: t, rightSelect: i }));
          for (let e of n)
            if (
              !(0, E.DV)(
                i.getSelectedFields(),
                e.rightSelect.getSelectedFields(),
              )
            )
              throw Error(
                "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
              );
          return i.addSetOperators(n);
        };
      }
      (0, E.XJ)(G, [R]);
      let ee = () => ({
          union: et,
          unionAll: ei,
          intersect: es,
          intersectAll: er,
          except: en,
          exceptAll: el,
        }),
        et = Z("union", !1),
        ei = Z("union", !0),
        es = Z("intersect", !1),
        er = Z("intersect", !0),
        en = Z("except", !1),
        el = Z("except", !0);
      class ea {
        static [r.i] = "PgQueryBuilder";
        dialect;
        dialectConfig;
        constructor(e) {
          (this.dialect = (0, r.is)(e, J) ? e : void 0),
            (this.dialectConfig = (0, r.is)(e, J) ? void 0 : e);
        }
        $with = (e, t) => {
          let i = this;
          return {
            as: (s) => (
              "function" == typeof s && (s = s(i)),
              new Proxy(
                new K.J(
                  s.getSQL(),
                  t ??
                    ("getSelectedFields" in s
                      ? (s.getSelectedFields() ?? {})
                      : {}),
                  e,
                  !0,
                ),
                new M({
                  alias: e,
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            ),
          };
        };
        with(...e) {
          let t = this;
          return {
            select: function (i) {
              return new H({
                fields: i ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                withList: e,
              });
            },
            selectDistinct: function (e) {
              return new H({
                fields: e ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                distinct: !0,
              });
            },
            selectDistinctOn: function (e, i) {
              return new H({
                fields: i ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                distinct: { on: e },
              });
            },
          };
        }
        select(e) {
          return new H({
            fields: e ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
          });
        }
        selectDistinct(e) {
          return new H({
            fields: e ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: !0,
          });
        }
        selectDistinctOn(e, t) {
          return new H({
            fields: t ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: { on: e },
          });
        }
        getDialect() {
          return (
            this.dialect || (this.dialect = new J(this.dialectConfig)),
            this.dialect
          );
        }
      }
      class eo {
        constructor(e, t, i, s) {
          (this.table = e),
            (this.session = t),
            (this.dialect = i),
            (this.withList = s);
        }
        static [r.i] = "PgUpdateBuilder";
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        set(e) {
          return new eu(
            this.table,
            (0, E.q)(this.table, e),
            this.session,
            this.dialect,
            this.withList,
          ).setToken(this.authToken);
        }
      }
      class eu extends R {
        constructor(e, t, i, s, r) {
          super(),
            (this.session = i),
            (this.dialect = s),
            (this.config = { set: t, table: e, withList: r, joins: [] }),
            (this.tableName = (0, E.zN)(e)),
            (this.joinsNotNullableMap =
              "string" == typeof this.tableName
                ? { [this.tableName]: !0 }
                : {});
        }
        static [r.i] = "PgUpdate";
        config;
        tableName;
        joinsNotNullableMap;
        from(e) {
          let t = (0, E.zN)(e);
          return (
            "string" == typeof t && (this.joinsNotNullableMap[t] = !0),
            (this.config.from = e),
            this
          );
        }
        getTableLikeFields(e) {
          return (0, r.is)(e, D.mu)
            ? e[c.XI.Symbol.Columns]
            : (0, r.is)(e, K.n)
              ? e._.selectedFields
              : e[h.n].selectedFields;
        }
        createJoin(e) {
          return (t, i) => {
            let s = (0, E.zN)(t);
            if (
              "string" == typeof s &&
              this.config.joins.some((e) => e.alias === s)
            )
              throw Error(`Alias "${s}" is already used in this query`);
            if ("function" == typeof i) {
              let e =
                this.config.from && !(0, r.is)(this.config.from, u.Xs)
                  ? this.getTableLikeFields(this.config.from)
                  : void 0;
              i = i(
                new Proxy(
                  this.config.table[c.XI.Symbol.Columns],
                  new M({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                ),
                e &&
                  new Proxy(
                    e,
                    new M({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                  ),
              );
            }
            if (
              (this.config.joins.push({
                on: i,
                table: t,
                joinType: e,
                alias: s,
              }),
              "string" == typeof s)
            )
              switch (e) {
                case "left":
                  this.joinsNotNullableMap[s] = !1;
                  break;
                case "right":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[s] = !0);
                  break;
                case "inner":
                  this.joinsNotNullableMap[s] = !0;
                  break;
                case "full":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[s] = !1);
              }
            return this;
          };
        }
        leftJoin = this.createJoin("left");
        rightJoin = this.createJoin("right");
        innerJoin = this.createJoin("inner");
        fullJoin = this.createJoin("full");
        where(e) {
          return (this.config.where = e), this;
        }
        returning(e) {
          if (
            !e &&
            ((e = Object.assign({}, this.config.table[c.XI.Symbol.Columns])),
            this.config.from)
          ) {
            let t = (0, E.zN)(this.config.from);
            if (
              "string" == typeof t &&
              this.config.from &&
              !(0, r.is)(this.config.from, u.Xs)
            ) {
              let i = this.getTableLikeFields(this.config.from);
              e[t] = i;
            }
            for (let t of this.config.joins) {
              let i = (0, E.zN)(t.table);
              if ("string" == typeof i && !(0, r.is)(t.table, u.Xs)) {
                let s = this.getTableLikeFields(t.table);
                e[i] = s;
              }
            }
          }
          return (
            (this.config.returningFields = e),
            (this.config.returning = (0, E.He)(e)),
            this
          );
        }
        getSQL() {
          return this.dialect.buildUpdateQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        _prepare(e) {
          let t = this.session.prepareQuery(
            this.dialect.sqlToQuery(this.getSQL()),
            this.config.returning,
            e,
            !0,
          );
          return (t.joinsNotNullableMap = this.joinsNotNullableMap), t;
        }
        prepare(e) {
          return this._prepare(e);
        }
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        execute = (e) => this._prepare().execute(e, this.authToken);
        getSelectedFields() {
          return this.config.returningFields
            ? new Proxy(
                this.config.returningFields,
                new M({
                  alias: (0, c.Io)(this.config.table),
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            : void 0;
        }
        $dynamic() {
          return this;
        }
      }
      class ec {
        constructor(e, t, i, s, r) {
          (this.table = e),
            (this.session = t),
            (this.dialect = i),
            (this.withList = s),
            (this.overridingSystemValue_ = r);
        }
        static [r.i] = "PgInsertBuilder";
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        overridingSystemValue() {
          return (this.overridingSystemValue_ = !0), this;
        }
        values(e) {
          if (0 === (e = Array.isArray(e) ? e : [e]).length)
            throw Error("values() must be called with at least one value");
          let t = e.map((e) => {
            let t = {},
              i = this.table[c.XI.Symbol.Columns];
            for (let s of Object.keys(e)) {
              let n = e[s];
              t[s] = (0, r.is)(n, u.Xs) ? n : new u.Iw(n, i[s]);
            }
            return t;
          });
          return new eh(
            this.table,
            t,
            this.session,
            this.dialect,
            this.withList,
            !1,
            this.overridingSystemValue_,
          ).setToken(this.authToken);
        }
        select(e) {
          let t = "function" == typeof e ? e(new ea()) : e;
          if (
            !(0, r.is)(t, u.Xs) &&
            !(0, E.DV)(this.table[c.e], t._.selectedFields)
          )
            throw Error(
              "Insert select error: selected fields are not the same or are in a different order compared to the table definition",
            );
          return new eh(
            this.table,
            t,
            this.session,
            this.dialect,
            this.withList,
            !0,
          );
        }
      }
      class eh extends R {
        constructor(e, t, i, s, r, n, l) {
          super(),
            (this.session = i),
            (this.dialect = s),
            (this.config = {
              table: e,
              values: t,
              withList: r,
              select: n,
              overridingSystemValue_: l,
            });
        }
        static [r.i] = "PgInsert";
        config;
        returning(e = this.config.table[c.XI.Symbol.Columns]) {
          return (
            (this.config.returningFields = e),
            (this.config.returning = (0, E.He)(e)),
            this
          );
        }
        onConflictDoNothing(e = {}) {
          if (void 0 === e.target)
            this.config.onConflict = (0, u.ll)`do nothing`;
          else {
            let t = "";
            t = Array.isArray(e.target)
              ? e.target
                  .map((e) =>
                    this.dialect.escapeName(
                      this.dialect.casing.getColumnCasing(e),
                    ),
                  )
                  .join(",")
              : this.dialect.escapeName(
                  this.dialect.casing.getColumnCasing(e.target),
                );
            let i = e.where ? (0, u.ll)` where ${e.where}` : void 0;
            this.config.onConflict = (0, u.ll)`(${u.ll.raw(t)})${i} do nothing`;
          }
          return this;
        }
        onConflictDoUpdate(e) {
          if (e.where && (e.targetWhere || e.setWhere))
            throw Error(
              'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.',
            );
          let t = e.where ? (0, u.ll)` where ${e.where}` : void 0,
            i = e.targetWhere ? (0, u.ll)` where ${e.targetWhere}` : void 0,
            s = e.setWhere ? (0, u.ll)` where ${e.setWhere}` : void 0,
            r = this.dialect.buildUpdateSet(
              this.config.table,
              (0, E.q)(this.config.table, e.set),
            ),
            n = "";
          return (
            (n = Array.isArray(e.target)
              ? e.target
                  .map((e) =>
                    this.dialect.escapeName(
                      this.dialect.casing.getColumnCasing(e),
                    ),
                  )
                  .join(",")
              : this.dialect.escapeName(
                  this.dialect.casing.getColumnCasing(e.target),
                )),
            (this.config.onConflict = (0,
            u.ll)`(${u.ll.raw(n)})${i} do update set ${r}${t}${s}`),
            this
          );
        }
        getSQL() {
          return this.dialect.buildInsertQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        _prepare(e) {
          return W.k.startActiveSpan("drizzle.prepareQuery", () =>
            this.session.prepareQuery(
              this.dialect.sqlToQuery(this.getSQL()),
              this.config.returning,
              e,
              !0,
            ),
          );
        }
        prepare(e) {
          return this._prepare(e);
        }
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        execute = (e) =>
          W.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
        getSelectedFields() {
          return this.config.returningFields
            ? new Proxy(
                this.config.returningFields,
                new M({
                  alias: (0, c.Io)(this.config.table),
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            : void 0;
        }
        $dynamic() {
          return this;
        }
      }
      class ed extends R {
        constructor(e, t, i, s) {
          super(),
            (this.session = t),
            (this.dialect = i),
            (this.config = { table: e, withList: s });
        }
        static [r.i] = "PgDelete";
        config;
        where(e) {
          return (this.config.where = e), this;
        }
        returning(e = this.config.table[c.XI.Symbol.Columns]) {
          return (
            (this.config.returningFields = e),
            (this.config.returning = (0, E.He)(e)),
            this
          );
        }
        getSQL() {
          return this.dialect.buildDeleteQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        _prepare(e) {
          return W.k.startActiveSpan("drizzle.prepareQuery", () =>
            this.session.prepareQuery(
              this.dialect.sqlToQuery(this.getSQL()),
              this.config.returning,
              e,
              !0,
            ),
          );
        }
        prepare(e) {
          return this._prepare(e);
        }
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        execute = (e) =>
          W.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
        getSelectedFields() {
          return this.config.returningFields
            ? new Proxy(
                this.config.returningFields,
                new M({
                  alias: (0, c.Io)(this.config.table),
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            : void 0;
        }
        $dynamic() {
          return this;
        }
      }
      class ef extends u.Xs {
        constructor(e) {
          super(ef.buildEmbeddedCount(e.source, e.filters).queryChunks),
            (this.params = e),
            this.mapWith(Number),
            (this.session = e.session),
            (this.sql = ef.buildCount(e.source, e.filters));
        }
        sql;
        token;
        static [r.i] = "PgCountBuilder";
        [Symbol.toStringTag] = "PgCountBuilder";
        session;
        static buildEmbeddedCount(e, t) {
          return (0,
          u.ll)`(select count(*) from ${e}${u.ll.raw(" where ").if(t)}${t})`;
        }
        static buildCount(e, t) {
          return (0,
          u.ll)`select count(*) as count from ${e}${u.ll.raw(" where ").if(t)}${t};`;
        }
        setToken(e) {
          return (this.token = e), this;
        }
        then(e, t) {
          return Promise.resolve(this.session.count(this.sql, this.token)).then(
            e,
            t,
          );
        }
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
      }
      class eg {
        constructor(e, t, i, s, r, n, l) {
          (this.fullSchema = e),
            (this.schema = t),
            (this.tableNamesMap = i),
            (this.table = s),
            (this.tableConfig = r),
            (this.dialect = n),
            (this.session = l);
        }
        static [r.i] = "PgRelationalQueryBuilder";
        findMany(e) {
          return new ep(
            this.fullSchema,
            this.schema,
            this.tableNamesMap,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e || {},
            "many",
          );
        }
        findFirst(e) {
          return new ep(
            this.fullSchema,
            this.schema,
            this.tableNamesMap,
            this.table,
            this.tableConfig,
            this.dialect,
            this.session,
            e ? { ...e, limit: 1 } : { limit: 1 },
            "first",
          );
        }
      }
      class ep extends R {
        constructor(e, t, i, s, r, n, l, a, o) {
          super(),
            (this.fullSchema = e),
            (this.schema = t),
            (this.tableNamesMap = i),
            (this.table = s),
            (this.tableConfig = r),
            (this.dialect = n),
            (this.session = l),
            (this.config = a),
            (this.mode = o);
        }
        static [r.i] = "PgRelationalQuery";
        _prepare(e) {
          return W.k.startActiveSpan("drizzle.prepareQuery", () => {
            let { query: t, builtQuery: i } = this._toSQL();
            return this.session.prepareQuery(i, void 0, e, !0, (e, i) => {
              let s = e.map((e) =>
                (function e(t, i, s, n, l = (e) => e) {
                  let a = {};
                  for (let [c, h] of n.entries())
                    if (h.isJson) {
                      let n = i.relations[h.tsKey],
                        o = s[c],
                        u = "string" == typeof o ? JSON.parse(o) : o;
                      a[h.tsKey] = (0, r.is)(n, F)
                        ? u && e(t, t[h.relationTableTsKey], u, h.selection, l)
                        : u.map((i) =>
                            e(t, t[h.relationTableTsKey], i, h.selection, l),
                          );
                    } else {
                      let e,
                        t = l(s[c]),
                        i = h.field;
                      (e = (0, r.is)(i, o.V)
                        ? i
                        : (0, r.is)(i, u.Xs)
                          ? i.decoder
                          : i.sql.decoder),
                        (a[h.tsKey] =
                          null === t ? null : e.mapFromDriverValue(t));
                    }
                  return a;
                })(this.schema, this.tableConfig, e, t.selection, i),
              );
              return "first" === this.mode ? s[0] : s;
            });
          });
        }
        prepare(e) {
          return this._prepare(e);
        }
        _getQuery() {
          return this.dialect.buildRelationalQueryWithoutPK({
            fullSchema: this.fullSchema,
            schema: this.schema,
            tableNamesMap: this.tableNamesMap,
            table: this.table,
            tableConfig: this.tableConfig,
            queryConfig: this.config,
            tableAlias: this.tableConfig.tsName,
          });
        }
        getSQL() {
          return this._getQuery().sql;
        }
        _toSQL() {
          let e = this._getQuery(),
            t = this.dialect.sqlToQuery(e.sql);
          return { query: e, builtQuery: t };
        }
        toSQL() {
          return this._toSQL().builtQuery;
        }
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        execute() {
          return W.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(void 0, this.authToken),
          );
        }
      }
      class em extends R {
        constructor(e, t, i, s) {
          super(),
            (this.execute = e),
            (this.sql = t),
            (this.query = i),
            (this.mapBatchResult = s);
        }
        static [r.i] = "PgRaw";
        getSQL() {
          return this.sql;
        }
        getQuery() {
          return this.query;
        }
        mapResult(e, t) {
          return t ? this.mapBatchResult(e) : e;
        }
        _prepare() {
          return this;
        }
        isResponseInArrayMode() {
          return !1;
        }
      }
      class ey extends R {
        constructor(e, t, i) {
          super(),
            (this.session = t),
            (this.dialect = i),
            (this.config = { view: e });
        }
        static [r.i] = "PgRefreshMaterializedView";
        config;
        concurrently() {
          if (void 0 !== this.config.withNoData)
            throw Error("Cannot use concurrently and withNoData together");
          return (this.config.concurrently = !0), this;
        }
        withNoData() {
          if (void 0 !== this.config.concurrently)
            throw Error("Cannot use concurrently and withNoData together");
          return (this.config.withNoData = !0), this;
        }
        getSQL() {
          return this.dialect.buildRefreshMaterializedViewQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        _prepare(e) {
          return W.k.startActiveSpan("drizzle.prepareQuery", () =>
            this.session.prepareQuery(
              this.dialect.sqlToQuery(this.getSQL()),
              void 0,
              e,
              !0,
            ),
          );
        }
        prepare(e) {
          return this._prepare(e);
        }
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        execute = (e) =>
          W.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
      }
      class eb {
        constructor(e, t, i) {
          if (
            ((this.dialect = e),
            (this.session = t),
            (this._ = i
              ? {
                  schema: i.schema,
                  fullSchema: i.fullSchema,
                  tableNamesMap: i.tableNamesMap,
                  session: t,
                }
              : {
                  schema: void 0,
                  fullSchema: {},
                  tableNamesMap: {},
                  session: t,
                }),
            (this.query = {}),
            this._.schema)
          )
            for (let [s, r] of Object.entries(this._.schema))
              this.query[s] = new eg(
                i.fullSchema,
                this._.schema,
                this._.tableNamesMap,
                i.fullSchema[s],
                r,
                e,
                t,
              );
        }
        static [r.i] = "PgDatabase";
        query;
        $with = (e, t) => {
          let i = this;
          return {
            as: (s) => (
              "function" == typeof s && (s = s(new ea(i.dialect))),
              new Proxy(
                new K.J(
                  s.getSQL(),
                  t ??
                    ("getSelectedFields" in s
                      ? (s.getSelectedFields() ?? {})
                      : {}),
                  e,
                  !0,
                ),
                new M({
                  alias: e,
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            ),
          };
        };
        $count(e, t) {
          return new ef({ source: e, filters: t, session: this.session });
        }
        with(...e) {
          let t = this;
          return {
            select: function (i) {
              return new H({
                fields: i ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
              });
            },
            selectDistinct: function (i) {
              return new H({
                fields: i ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
                distinct: !0,
              });
            },
            selectDistinctOn: function (i, s) {
              return new H({
                fields: s ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
                distinct: { on: i },
              });
            },
            update: function (i) {
              return new eo(i, t.session, t.dialect, e);
            },
            insert: function (i) {
              return new ec(i, t.session, t.dialect, e);
            },
            delete: function (i) {
              return new ed(i, t.session, t.dialect, e);
            },
          };
        }
        select(e) {
          return new H({
            fields: e ?? void 0,
            session: this.session,
            dialect: this.dialect,
          });
        }
        selectDistinct(e) {
          return new H({
            fields: e ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: !0,
          });
        }
        selectDistinctOn(e, t) {
          return new H({
            fields: t ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: { on: e },
          });
        }
        update(e) {
          return new eo(e, this.session, this.dialect);
        }
        insert(e) {
          return new ec(e, this.session, this.dialect);
        }
        delete(e) {
          return new ed(e, this.session, this.dialect);
        }
        refreshMaterializedView(e) {
          return new ey(e, this.session, this.dialect);
        }
        authToken;
        execute(e) {
          let t = "string" == typeof e ? u.ll.raw(e) : e.getSQL(),
            i = this.dialect.sqlToQuery(t),
            s = this.session.prepareQuery(i, void 0, void 0, !1);
          return new em(
            () => s.execute(void 0, this.authToken),
            t,
            i,
            (e) => s.mapResult(e, !0),
          );
        }
        transaction(e, t) {
          return this.session.transaction(e, t);
        }
      }
      class ew {
        constructor(e) {
          this.query = e;
        }
        authToken;
        getQuery() {
          return this.query;
        }
        mapResult(e, t) {
          return e;
        }
        setToken(e) {
          return (this.authToken = e), this;
        }
        static [r.i] = "PgPreparedQuery";
        joinsNotNullableMap;
      }
      class eS {
        constructor(e) {
          this.dialect = e;
        }
        static [r.i] = "PgSession";
        execute(e, t) {
          return W.k.startActiveSpan("drizzle.operation", () =>
            W.k
              .startActiveSpan("drizzle.prepareQuery", () =>
                this.prepareQuery(
                  this.dialect.sqlToQuery(e),
                  void 0,
                  void 0,
                  !1,
                ),
              )
              .setToken(t)
              .execute(void 0, t),
          );
        }
        all(e) {
          return this.prepareQuery(
            this.dialect.sqlToQuery(e),
            void 0,
            void 0,
            !1,
          ).all();
        }
        async count(e, t) {
          return Number((await this.execute(e, t))[0].count);
        }
      }
      class ev extends eb {
        constructor(e, t, i, s = 0) {
          super(e, t, i), (this.schema = i), (this.nestedIndex = s);
        }
        static [r.i] = "PgTransaction";
        rollback() {
          throw new N();
        }
        getTransactionConfigSQL(e) {
          let t = [];
          return (
            e.isolationLevel && t.push(`isolation level ${e.isolationLevel}`),
            e.accessMode && t.push(e.accessMode),
            "boolean" == typeof e.deferrable &&
              t.push(e.deferrable ? "deferrable" : "not deferrable"),
            u.ll.raw(t.join(" "))
          );
        }
        setTransaction(e) {
          return this.session.execute(
            (0, u.ll)`set transaction ${this.getTransactionConfigSQL(e)}`,
          );
        }
      }
      class e$ extends ew {
        constructor(e, t, i, s, r, n, l) {
          super({ sql: t, params: i }),
            (this.client = e),
            (this.queryString = t),
            (this.params = i),
            (this.logger = s),
            (this.fields = r),
            (this._isResponseInArrayMode = n),
            (this.customResultMapper = l);
        }
        static [r.i] = "PostgresJsPreparedQuery";
        async execute(e = {}) {
          return W.k.startActiveSpan("drizzle.execute", async (t) => {
            let i = (0, u.Ct)(this.params, e);
            t?.setAttributes({
              "drizzle.query.text": this.queryString,
              "drizzle.query.params": JSON.stringify(i),
            }),
              this.logger.logQuery(this.queryString, i);
            let {
              fields: s,
              queryString: r,
              client: n,
              joinsNotNullableMap: l,
              customResultMapper: a,
            } = this;
            if (!s && !a)
              return W.k.startActiveSpan("drizzle.driver.execute", () =>
                n.unsafe(r, i),
              );
            let o = await W.k.startActiveSpan(
              "drizzle.driver.execute",
              () => (
                t?.setAttributes({
                  "drizzle.query.text": r,
                  "drizzle.query.params": JSON.stringify(i),
                }),
                n.unsafe(r, i).values()
              ),
            );
            return W.k.startActiveSpan("drizzle.mapResponse", () =>
              a ? a(o) : o.map((e) => (0, E.a6)(s, e, l)),
            );
          });
        }
        all(e = {}) {
          return W.k.startActiveSpan("drizzle.execute", async (t) => {
            let i = (0, u.Ct)(this.params, e);
            return (
              t?.setAttributes({
                "drizzle.query.text": this.queryString,
                "drizzle.query.params": JSON.stringify(i),
              }),
              this.logger.logQuery(this.queryString, i),
              W.k.startActiveSpan(
                "drizzle.driver.execute",
                () => (
                  t?.setAttributes({
                    "drizzle.query.text": this.queryString,
                    "drizzle.query.params": JSON.stringify(i),
                  }),
                  this.client.unsafe(this.queryString, i)
                ),
              )
            );
          });
        }
        isResponseInArrayMode() {
          return this._isResponseInArrayMode;
        }
      }
      class eT extends eS {
        constructor(e, t, i, s = {}) {
          super(t),
            (this.client = e),
            (this.schema = i),
            (this.options = s),
            (this.logger = s.logger ?? new a());
        }
        static [r.i] = "PostgresJsSession";
        logger;
        prepareQuery(e, t, i, s, r) {
          return new e$(this.client, e.sql, e.params, this.logger, t, s, r);
        }
        query(e, t) {
          return this.logger.logQuery(e, t), this.client.unsafe(e, t).values();
        }
        queryObjects(e, t) {
          return this.client.unsafe(e, t);
        }
        transaction(e, t) {
          return this.client.begin(async (i) => {
            let s = new eT(i, this.dialect, this.schema, this.options),
              r = new eN(this.dialect, s, this.schema);
            return t && (await r.setTransaction(t)), e(r);
          });
        }
      }
      class eN extends ev {
        constructor(e, t, i, s = 0) {
          super(e, t, i, s), (this.session = t);
        }
        static [r.i] = "PostgresJsTransaction";
        transaction(e) {
          return this.session.client.savepoint((t) => {
            let i = new eT(t, this.dialect, this.schema, this.session.options);
            return e(new eN(this.dialect, i, this.schema));
          });
        }
      }
      class eP extends eb {
        static [r.i] = "PostgresJsDatabase";
      }
      function ex(e, t = {}) {
        let i,
          s,
          n = (e) => e;
        for (let t of [
          "1184",
          "1082",
          "1083",
          "1114",
          "1182",
          "1185",
          "1115",
          "1231",
        ])
          (e.options.parsers[t] = n), (e.options.serializers[t] = n);
        (e.options.serializers["114"] = n), (e.options.serializers["3802"] = n);
        let a = new J({ casing: t.casing });
        if (
          (!0 === t.logger ? (i = new l()) : !1 !== t.logger && (i = t.logger),
          t.schema)
        ) {
          let e = (function (e, t) {
            1 === Object.keys(e).length &&
              "default" in e &&
              !(0, r.is)(e.default, c.XI) &&
              (e = e.default);
            let i = {},
              s = {},
              n = {};
            for (let [l, a] of Object.entries(e))
              if ((0, r.is)(a, c.XI)) {
                let e = (0, c.Lf)(a),
                  t = s[e];
                for (let s of ((i[e] = l),
                (n[l] = {
                  tsName: l,
                  dbName: a[c.XI.Symbol.Name],
                  schema: a[c.XI.Symbol.Schema],
                  columns: a[c.XI.Symbol.Columns],
                  relations: t?.relations ?? {},
                  primaryKey: t?.primaryKey ?? [],
                }),
                Object.values(a[c.XI.Symbol.Columns])))
                  s.primary && n[l].primaryKey.push(s);
                let o = a[c.XI.Symbol.ExtraConfigBuilder]?.(
                  a[c.XI.Symbol.ExtraConfigColumns],
                );
                if (o)
                  for (let e of Object.values(o))
                    (0, r.is)(e, I.hv) && n[l].primaryKey.push(...e.columns);
              } else if ((0, r.is)(a, k)) {
                let e,
                  r = (0, c.Lf)(a.table),
                  l = i[r];
                for (let [i, o] of Object.entries(a.config(t(a.table))))
                  if (l) {
                    let t = n[l];
                    (t.relations[i] = o), e && t.primaryKey.push(...e);
                  } else
                    r in s || (s[r] = { relations: {}, primaryKey: e }),
                      (s[r].relations[i] = o);
              }
            return { tables: n, tableNamesMap: i };
          })(t.schema, X);
          s = {
            fullSchema: t.schema,
            schema: e.tables,
            tableNamesMap: e.tableNamesMap,
          };
        }
        let o = new eT(e, a, s, { logger: i }),
          u = new eP(a, o, s);
        return (u.$client = e), u;
      }
      function eq(...e) {
        if ("string" == typeof e[0]) return ex((0, s.A)(e[0]), e[1]);
        if ((0, E.Lq)(e[0])) {
          let { connection: t, client: i, ...r } = e[0];
          if (i) return ex(i, r);
          if ("object" == typeof t && void 0 !== t.url) {
            let { url: e, ...i } = t;
            return ex((0, s.A)(e, i), r);
          }
          return ex((0, s.A)(t), r);
        }
        return ex(e[0], e[1]);
      }
      (eq || (eq = {})).mock = function (e) {
        return ex({ options: { parsers: {}, serializers: {} } }, e);
      };
    },
    55753: (e, t, i) => {
      i.d(t, { Qq: () => o });
      var s = i(35925),
        r = i(50521),
        n = i(18980);
      class l extends n.pe {
        static [s.i] = "PgTextBuilder";
        constructor(e, t) {
          super(e, "string", "PgText"), (this.config.enumValues = t.enum);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends n.Kl {
        static [s.i] = "PgText";
        enumValues = this.config.enumValues;
        getSQLType() {
          return "text";
        }
      }
      function o(e, t = {}) {
        let { name: i, config: s } = (0, r.Ll)(e, t);
        return new l(i, s);
      }
    },
    59246: (e, t, i) => {
      i.d(t, { dw: () => c, p6: () => h, qw: () => o });
      var s = i(35925),
        r = i(50521),
        n = i(18980),
        l = i(16807);
      class a extends l.u {
        static [s.i] = "PgDateBuilder";
        constructor(e) {
          super(e, "date", "PgDate");
        }
        build(e) {
          return new o(e, this.config);
        }
      }
      class o extends n.Kl {
        static [s.i] = "PgDate";
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
        static [s.i] = "PgDateStringBuilder";
        constructor(e) {
          super(e, "string", "PgDateString");
        }
        build(e) {
          return new c(e, this.config);
        }
      }
      class c extends n.Kl {
        static [s.i] = "PgDateString";
        getSQLType() {
          return "date";
        }
      }
      function h(e, t) {
        let { name: i, config: s } = (0, r.Ll)(e, t);
        return s?.mode === "date" ? new a(i) : new u(i);
      }
    },
    62085: (e, t, i) => {
      i.d(t, { yf: () => o });
      var s = i(35925),
        r = i(50521),
        n = i(18980);
      class l extends n.pe {
        static [s.i] = "PgVarcharBuilder";
        constructor(e, t) {
          super(e, "string", "PgVarchar"),
            (this.config.length = t.length),
            (this.config.enumValues = t.enum);
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends n.Kl {
        static [s.i] = "PgVarchar";
        length = this.config.length;
        enumValues = this.config.enumValues;
        getSQLType() {
          return void 0 === this.length ? "varchar" : `varchar(${this.length})`;
        }
      }
      function o(e, t = {}) {
        let { name: i, config: s } = (0, r.Ll)(e, t);
        return new l(i, s);
      }
    },
    69358: (e, t, i) => {
      i.d(t, { i: () => s });
      function s(e, ...t) {
        return e(...t);
      }
    },
    84136: (e, t, i) => {
      i.d(t, { J: () => n, n: () => r });
      var s = i(35925);
      class r {
        static [s.i] = "Subquery";
        constructor(e, t, i, s = !1) {
          this._ = {
            brand: "Subquery",
            sql: e,
            selectedFields: t,
            alias: i,
            isWith: s,
          };
        }
      }
      class n extends r {
        static [s.i] = "WithSubquery";
      }
    },
    86399: (e, t, i) => {
      i.d(t, { Xd: () => o, kB: () => u });
      var s = i(35925),
        r = i(50521),
        n = i(18980),
        l = i(16807);
      class a extends l.u {
        constructor(e, t, i) {
          super(e, "string", "PgTime"),
            (this.withTimezone = t),
            (this.precision = i),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        static [s.i] = "PgTimeBuilder";
        build(e) {
          return new o(e, this.config);
        }
      }
      class o extends n.Kl {
        static [s.i] = "PgTime";
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
        let { name: i, config: s } = (0, r.Ll)(e, t);
        return new a(i, s.withTimezone ?? !1, s.precision);
      }
    },
    90500: (e, t, i) => {
      i.d(t, { zM: () => a });
      var s = i(35925),
        r = i(18980);
      class n extends r.pe {
        static [s.i] = "PgBooleanBuilder";
        constructor(e) {
          super(e, "boolean", "PgBoolean");
        }
        build(e) {
          return new l(e, this.config);
        }
      }
      class l extends r.Kl {
        static [s.i] = "PgBoolean";
        getSQLType() {
          return "boolean";
        }
      }
      function a(e) {
        return new n(e ?? "");
      }
    },
    90832: (e, t, i) => {
      i.d(t, { Fx: () => a, kn: () => l });
      var s = i(35925),
        r = i(18980);
      class n extends r.pe {
        static [s.i] = "PgJsonbBuilder";
        constructor(e) {
          super(e, "json", "PgJsonb");
        }
        build(e) {
          return new l(e, this.config);
        }
      }
      class l extends r.Kl {
        static [s.i] = "PgJsonb";
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
        return new n(e ?? "");
      }
    },
    91148: (e, t, i) => {
      i.d(t, { V: () => r });
      var s = i(35925);
      class r {
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
        static [s.i] = "Column";
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
    91522: (e, t, i) => {
      i.d(t, { nd: () => o });
      var s = i(35925),
        r = i(18980),
        n = i(28598);
      class l extends n.p {
        static [s.i] = "PgIntegerBuilder";
        constructor(e) {
          super(e, "number", "PgInteger");
        }
        build(e) {
          return new a(e, this.config);
        }
      }
      class a extends r.Kl {
        static [s.i] = "PgInteger";
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
    95633: (e, t, i) => {
      i.d(t, { n: () => s });
      let s = Symbol.for("drizzle:ViewBaseConfig");
    },
    98424: (e, t, i) => {
      i.d(t, { Pq: () => a, iX: () => l });
      var s = i(35925),
        r = i(18980);
      class n extends r.pe {
        static [s.i] = "PgJsonBuilder";
        constructor(e) {
          super(e, "json", "PgJson");
        }
        build(e) {
          return new l(e, this.config);
        }
      }
      class l extends r.Kl {
        static [s.i] = "PgJson";
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
        return new n(e ?? "");
      }
    },
  });
//# sourceMappingURL=5483.js.map
