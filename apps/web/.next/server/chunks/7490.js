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
    (e._sentryDebugIds[t] = "057a8bd9-494f-49be-b568-0f7bbf9af069"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-057a8bd9-494f-49be-b568-0f7bbf9af069"));
} catch (e) {}
("use strict");
(exports.id = 7490),
  (exports.ids = [7490]),
  (exports.modules = {
    252: (e, t) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ReflectAdapter", {
          enumerable: !0,
          get: function () {
            return i;
          },
        });
      class i {
        static get(e, t, i) {
          let s = Reflect.get(e, t, i);
          return "function" == typeof s ? s.bind(e) : s;
        }
        static set(e, t, i, s) {
          return Reflect.set(e, t, i, s);
        }
        static has(e, t) {
          return Reflect.has(e, t);
        }
        static deleteProperty(e, t) {
          return Reflect.deleteProperty(e, t);
        }
      }
    },
    11040: (e, t, i) => {
      i.d(t, { f: () => eM });
      var s = i(79396);
      class r {
        static [s.i] = "ConsoleLogWriter";
        write(e) {
          console.log(e);
        }
      }
      class n {
        static [s.i] = "DefaultLogger";
        writer;
        constructor(e) {
          this.writer = e?.writer ?? new r();
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
      class l {
        static [s.i] = "NoopLogger";
        logQuery() {}
      }
      var a = i(49361),
        o = i(65830),
        c = i(32283),
        u = i(86726);
      class h {
        constructor(e) {
          this.table = e;
        }
        static [s.i] = "ColumnAliasProxyHandler";
        get(e, t) {
          return "table" === t ? this.table : e[t];
        }
      }
      class d {
        constructor(e, t) {
          (this.alias = e), (this.replaceOriginalName = t);
        }
        static [s.i] = "TableAliasProxyHandler";
        get(e, t) {
          if (t === c.XI.Symbol.IsAlias) return !0;
          if (
            t === c.XI.Symbol.Name ||
            (this.replaceOriginalName && t === c.XI.Symbol.OriginalName)
          )
            return this.alias;
          if (t === u.n) return { ...e[u.n], name: this.alias, isAlias: !0 };
          if (t === c.XI.Symbol.Columns) {
            let t = e[c.XI.Symbol.Columns];
            if (!t) return t;
            let i = {};
            return (
              Object.keys(t).map((s) => {
                i[s] = new Proxy(t[s], new h(new Proxy(e, this)));
              }),
              i
            );
          }
          let i = e[t];
          return (0, s.is)(i, a.V)
            ? new Proxy(i, new h(new Proxy(e, this)))
            : i;
        }
      }
      class f {
        constructor(e) {
          this.alias = e;
        }
        static [s.i] = null;
        get(e, t) {
          return "sourceTable" === t ? p(e.sourceTable, this.alias) : e[t];
        }
      }
      function p(e, t) {
        return new Proxy(e, new d(t, !1));
      }
      function g(e, t) {
        return new Proxy(e, new h(new Proxy(e.table, new d(t, !1))));
      }
      function m(e, t) {
        return new o.Xs.Aliased(y(e.sql, t), e.fieldAlias);
      }
      function y(e, t) {
        return o.ll.join(
          e.queryChunks.map((e) =>
            (0, s.is)(e, a.V)
              ? g(e, t)
              : (0, s.is)(e, o.Xs)
                ? y(e, t)
                : (0, s.is)(e, o.Xs.Aliased)
                  ? m(e, t)
                  : e,
          ),
        );
      }
      function b(e) {
        return (
          e
            .replace(/['\u2019]/g, "")
            .match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []
        )
          .map((e) => e.toLowerCase())
          .join("_");
      }
      function w(e) {
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
      function S(e) {
        return e;
      }
      class $ {
        static [s.i] = "CasingCache";
        cache = {};
        cachedTables = {};
        convert;
        constructor(e) {
          this.convert = "snake_case" === e ? b : "camelCase" === e ? w : S;
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
      class v extends Error {
        static [s.i] = "DrizzleError";
        constructor({ message: e, cause: t }) {
          super(e), (this.name = "DrizzleError"), (this.cause = t);
        }
      }
      class T extends v {
        static [s.i] = "TransactionRollbackError";
        constructor() {
          super({ message: "Rollback" });
        }
      }
      var N = i(45887);
      class O extends N.pe {
        static [s.i] = "PgJsonbBuilder";
        constructor(e) {
          super(e, "json", "PgJsonb");
        }
        build(e) {
          return new P(e, this.config);
        }
      }
      class P extends N.Kl {
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
      class x extends N.pe {
        static [s.i] = "PgJsonBuilder";
        constructor(e) {
          super(e, "json", "PgJson");
        }
        build(e) {
          return new Q(e, this.config);
        }
      }
      class Q extends N.Kl {
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
      class j extends N.pe {
        static [s.i] = "PgNumericBuilder";
        constructor(e, t, i) {
          super(e, "string", "PgNumeric"),
            (this.config.precision = t),
            (this.config.scale = i);
        }
        build(e) {
          return new q(e, this.config);
        }
      }
      class q extends N.Kl {
        static [s.i] = "PgNumeric";
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
      class C extends N.pe {
        static [s.i] = "PgDateColumnBaseBuilder";
        defaultNow() {
          return this.default((0, o.ll)`now()`);
        }
      }
      class z extends C {
        constructor(e, t, i) {
          super(e, "string", "PgTime"),
            (this.withTimezone = t),
            (this.precision = i),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        static [s.i] = "PgTimeBuilder";
        build(e) {
          return new A(e, this.config);
        }
      }
      class A extends N.Kl {
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
      class _ extends C {
        static [s.i] = "PgTimestampBuilder";
        constructor(e, t, i) {
          super(e, "date", "PgTimestamp"),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        build(e) {
          return new I(e, this.config);
        }
      }
      class I extends N.Kl {
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
      class X extends C {
        static [s.i] = "PgTimestampStringBuilder";
        constructor(e, t, i) {
          super(e, "string", "PgTimestampString"),
            (this.config.withTimezone = t),
            (this.config.precision = i);
        }
        build(e) {
          return new L(e, this.config);
        }
      }
      class L extends N.Kl {
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
      class D extends C {
        static [s.i] = "PgDateBuilder";
        constructor(e) {
          super(e, "date", "PgDate");
        }
        build(e) {
          return new E(e, this.config);
        }
      }
      class E extends N.Kl {
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
      class B extends C {
        static [s.i] = "PgDateStringBuilder";
        constructor(e) {
          super(e, "string", "PgDateString");
        }
        build(e) {
          return new k(e, this.config);
        }
      }
      class k extends N.Kl {
        static [s.i] = "PgDateString";
        getSQLType() {
          return "date";
        }
      }
      class R extends N.pe {
        static [s.i] = "PgUUIDBuilder";
        constructor(e) {
          super(e, "string", "PgUUID");
        }
        defaultRandom() {
          return this.default((0, o.ll)`gen_random_uuid()`);
        }
        build(e) {
          return new M(e, this.config);
        }
      }
      class M extends N.Kl {
        static [s.i] = "PgUUID";
        getSQLType() {
          return "uuid";
        }
      }
      let K = Symbol.for("drizzle:PgInlineForeignKeys");
      class F extends c.XI {
        static [s.i] = "PgTable";
        static Symbol = Object.assign({}, c.XI.Symbol, {
          InlineForeignKeys: K,
        });
        [K] = [];
        [c.XI.Symbol.ExtraConfigBuilder] = void 0;
      }
      class J {
        static [s.i] = "PgPrimaryKeyBuilder";
        columns;
        name;
        constructor(e, t) {
          (this.columns = e), (this.name = t);
        }
        build(e) {
          return new V(e, this.columns, this.name);
        }
      }
      class V {
        constructor(e, t, i) {
          (this.table = e), (this.columns = t), (this.name = i);
        }
        static [s.i] = "PgPrimaryKey";
        columns;
        name;
        getName() {
          return (
            this.name ??
            `${this.table[F.Symbol.Name]}_${this.columns.map((e) => e.name).join("_")}_pk`
          );
        }
      }
      var W = i(42476);
      function U(e) {
        return (0, o.ll)`${e} asc`;
      }
      function Y(e) {
        return (0, o.ll)`${e} desc`;
      }
      class Z {
        constructor(e, t, i) {
          (this.sourceTable = e),
            (this.referencedTable = t),
            (this.relationName = i),
            (this.referencedTableName = t[c.XI.Symbol.Name]);
        }
        static [s.i] = "Relation";
        referencedTableName;
        fieldName;
      }
      class G {
        constructor(e, t) {
          (this.table = e), (this.config = t);
        }
        static [s.i] = "Relations";
      }
      class H extends Z {
        constructor(e, t, i, s) {
          super(e, t, i?.relationName),
            (this.config = i),
            (this.isNullable = s);
        }
        static [s.i] = "One";
        withFieldName(e) {
          let t = new H(
            this.sourceTable,
            this.referencedTable,
            this.config,
            this.isNullable,
          );
          return (t.fieldName = e), t;
        }
      }
      class ee extends Z {
        constructor(e, t, i) {
          super(e, t, i?.relationName), (this.config = i);
        }
        static [s.i] = "Many";
        withFieldName(e) {
          let t = new ee(this.sourceTable, this.referencedTable, this.config);
          return (t.fieldName = e), t;
        }
      }
      function et(e) {
        return {
          one: function (t, i) {
            return new H(
              e,
              t,
              i,
              i?.fields.reduce((e, t) => e && t.notNull, !0) ?? !1,
            );
          },
          many: function (t, i) {
            return new ee(e, t, i);
          },
        };
      }
      var ei = i(66501);
      function es(e, t) {
        return Object.entries(e).reduce((e, [i, r]) => {
          if ("string" != typeof i) return e;
          let n = t ? [...t, i] : [i];
          return (
            (0, s.is)(r, a.V) ||
            (0, s.is)(r, o.Xs) ||
            (0, s.is)(r, o.Xs.Aliased)
              ? e.push({ path: n, field: r })
              : (0, s.is)(r, c.XI)
                ? e.push(...es(r[c.XI.Symbol.Columns], n))
                : e.push(...es(r, n)),
            e
          );
        }, []);
      }
      function er(e, t) {
        let i = Object.keys(e),
          s = Object.keys(t);
        if (i.length !== s.length) return !1;
        for (let [e, t] of i.entries()) if (t !== s[e]) return !1;
        return !0;
      }
      function en(e, t) {
        let i = Object.entries(t)
          .filter(([, e]) => void 0 !== e)
          .map(([t, i]) =>
            (0, s.is)(i, o.Xs)
              ? [t, i]
              : [t, new o.Iw(i, e[c.XI.Symbol.Columns][t])],
          );
        if (0 === i.length) throw Error("No values to set");
        return Object.fromEntries(i);
      }
      function el(e) {
        return (0, s.is)(e, ei.n)
          ? e._.alias
          : (0, s.is)(e, o.Ss)
            ? e[u.n].name
            : (0, s.is)(e, o.Xs)
              ? void 0
              : e[c.XI.Symbol.IsAlias]
                ? e[c.XI.Symbol.Name]
                : e[c.XI.Symbol.BaseName];
      }
      class ea extends o.Ss {
        static [s.i] = "PgViewBase";
      }
      class eo {
        static [s.i] = "PgDialect";
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
            n = (0, o.ll)`
			CREATE TABLE IF NOT EXISTS ${o.ll.identifier(r)}.${o.ll.identifier(s)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
          await t.execute(
            (0, o.ll)`CREATE SCHEMA IF NOT EXISTS ${o.ll.identifier(r)}`,
          ),
            await t.execute(n);
          let l = (
            await t.all(
              (0,
              o.ll)`select id, hash, created_at from ${o.ll.identifier(r)}.${o.ll.identifier(s)} order by created_at desc limit 1`,
            )
          )[0];
          await t.transaction(async (t) => {
            for await (let i of e)
              if (!l || Number(l.created_at) < i.folderMillis) {
                for (let e of i.sql) await t.execute(o.ll.raw(e));
                await t.execute(
                  (0,
                  o.ll)`insert into ${o.ll.identifier(r)}.${o.ll.identifier(s)} ("hash", "created_at") values(${i.hash}, ${i.folderMillis})`,
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
          let t = [(0, o.ll)`with `];
          for (let [i, s] of e.entries())
            t.push((0, o.ll)`${o.ll.identifier(s._.alias)} as (${s._.sql})`),
              i < e.length - 1 && t.push((0, o.ll)`, `);
          return t.push((0, o.ll)` `), o.ll.join(t);
        }
        buildDeleteQuery({ table: e, where: t, returning: i, withList: s }) {
          let r = this.buildWithCTE(s),
            n = i
              ? (0,
                o.ll)` returning ${this.buildSelection(i, { isSingleTable: !0 })}`
              : void 0,
            l = t ? (0, o.ll)` where ${t}` : void 0;
          return (0, o.ll)`${r}delete from ${e}${l}${n}`;
        }
        buildUpdateSet(e, t) {
          let i = e[c.XI.Symbol.Columns],
            s = Object.keys(i).filter(
              (e) => void 0 !== t[e] || i[e]?.onUpdateFn !== void 0,
            ),
            r = s.length;
          return o.ll.join(
            s.flatMap((e, s) => {
              let n = i[e],
                l = t[e] ?? o.ll.param(n.onUpdateFn(), n),
                a = (0,
                o.ll)`${o.ll.identifier(this.casing.getColumnCasing(n))} = ${l}`;
              return s < r - 1 ? [a, o.ll.raw(", ")] : [a];
            }),
          );
        }
        buildUpdateQuery({
          table: e,
          set: t,
          where: i,
          returning: s,
          withList: r,
        }) {
          let n = this.buildWithCTE(r),
            l = this.buildUpdateSet(e, t),
            a = s
              ? (0,
                o.ll)` returning ${this.buildSelection(s, { isSingleTable: !0 })}`
              : void 0,
            c = i ? (0, o.ll)` where ${i}` : void 0;
          return (0, o.ll)`${n}update ${e} set ${l}${c}${a}`;
        }
        buildSelection(e, { isSingleTable: t = !1 } = {}) {
          let i = e.length,
            r = e.flatMap(({ field: e }, r) => {
              let n = [];
              if ((0, s.is)(e, o.Xs.Aliased) && e.isSelectionField)
                n.push(o.ll.identifier(e.fieldAlias));
              else if ((0, s.is)(e, o.Xs.Aliased) || (0, s.is)(e, o.Xs)) {
                let i = (0, s.is)(e, o.Xs.Aliased) ? e.sql : e;
                t
                  ? n.push(
                      new o.Xs(
                        i.queryChunks.map((e) =>
                          (0, s.is)(e, N.Kl)
                            ? o.ll.identifier(this.casing.getColumnCasing(e))
                            : e,
                        ),
                      ),
                    )
                  : n.push(i),
                  (0, s.is)(e, o.Xs.Aliased) &&
                    n.push((0, o.ll)` as ${o.ll.identifier(e.fieldAlias)}`);
              } else
                (0, s.is)(e, a.V) &&
                  (t
                    ? n.push(o.ll.identifier(this.casing.getColumnCasing(e)))
                    : n.push(e));
              return r < i - 1 && n.push((0, o.ll)`, `), n;
            });
          return o.ll.join(r);
        }
        buildSelectQuery({
          withList: e,
          fields: t,
          fieldsFlat: i,
          where: r,
          having: n,
          table: l,
          joins: h,
          orderBy: d,
          groupBy: f,
          limit: p,
          offset: g,
          lockingClause: m,
          distinct: y,
          setOperators: b,
        }) {
          let w,
            S,
            $,
            v = i ?? es(t);
          for (let e of v) {
            let t;
            if (
              (0, s.is)(e.field, a.V) &&
              (0, c.Io)(e.field.table) !==
                ((0, s.is)(l, ei.n)
                  ? l._.alias
                  : (0, s.is)(l, ea)
                    ? l[u.n].name
                    : (0, s.is)(l, o.Xs)
                      ? void 0
                      : (0, c.Io)(l)) &&
              ((t = e.field.table),
              !h?.some(
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
          let T = !h || 0 === h.length,
            N = this.buildWithCTE(e);
          y &&
            (w =
              !0 === y
                ? (0, o.ll)` distinct`
                : (0, o.ll)` distinct on (${o.ll.join(y.on, (0, o.ll)`, `)})`);
          let O = this.buildSelection(v, { isSingleTable: T }),
            P = (() => {
              if (
                (0, s.is)(l, c.XI) &&
                l[c.XI.Symbol.OriginalName] !== l[c.XI.Symbol.Name]
              ) {
                let e = (0,
                o.ll)`${o.ll.identifier(l[c.XI.Symbol.OriginalName])}`;
                return (
                  l[c.XI.Symbol.Schema] &&
                    (e = (0,
                    o.ll)`${o.ll.identifier(l[c.XI.Symbol.Schema])}.${e}`),
                  (0, o.ll)`${e} ${o.ll.identifier(l[c.XI.Symbol.Name])}`
                );
              }
              return l;
            })(),
            x = [];
          if (h)
            for (let [e, t] of h.entries()) {
              0 === e && x.push((0, o.ll)` `);
              let i = t.table,
                r = t.lateral ? (0, o.ll)` lateral` : void 0;
              if ((0, s.is)(i, F)) {
                let e = i[F.Symbol.Name],
                  s = i[F.Symbol.Schema],
                  n = i[F.Symbol.OriginalName],
                  l = e === n ? void 0 : t.alias;
                x.push(
                  (0,
                  o.ll)`${o.ll.raw(t.joinType)} join${r} ${s ? (0, o.ll)`${o.ll.identifier(s)}.` : void 0}${o.ll.identifier(n)}${l && (0, o.ll)` ${o.ll.identifier(l)}`} on ${t.on}`,
                );
              } else if ((0, s.is)(i, o.Ss)) {
                let e = i[u.n].name,
                  s = i[u.n].schema,
                  n = i[u.n].originalName,
                  l = e === n ? void 0 : t.alias;
                x.push(
                  (0,
                  o.ll)`${o.ll.raw(t.joinType)} join${r} ${s ? (0, o.ll)`${o.ll.identifier(s)}.` : void 0}${o.ll.identifier(n)}${l && (0, o.ll)` ${o.ll.identifier(l)}`} on ${t.on}`,
                );
              } else
                x.push(
                  (0, o.ll)`${o.ll.raw(t.joinType)} join${r} ${i} on ${t.on}`,
                );
              e < h.length - 1 && x.push((0, o.ll)` `);
            }
          let Q = o.ll.join(x),
            j = r ? (0, o.ll)` where ${r}` : void 0,
            q = n ? (0, o.ll)` having ${n}` : void 0;
          d &&
            d.length > 0 &&
            (S = (0, o.ll)` order by ${o.ll.join(d, (0, o.ll)`, `)}`),
            f &&
              f.length > 0 &&
              ($ = (0, o.ll)` group by ${o.ll.join(f, (0, o.ll)`, `)}`);
          let C =
              "object" == typeof p || ("number" == typeof p && p >= 0)
                ? (0, o.ll)` limit ${p}`
                : void 0,
            z = g ? (0, o.ll)` offset ${g}` : void 0,
            A = o.ll.empty();
          if (m) {
            let e = (0, o.ll)` for ${o.ll.raw(m.strength)}`;
            m.config.of &&
              e.append(
                (0,
                o.ll)` of ${o.ll.join(Array.isArray(m.config.of) ? m.config.of : [m.config.of], (0, o.ll)`, `)}`,
              ),
              m.config.noWait
                ? e.append((0, o.ll)` no wait`)
                : m.config.skipLocked && e.append((0, o.ll)` skip locked`),
              A.append(e);
          }
          let _ = (0,
          o.ll)`${N}select${w} ${O} from ${P}${Q}${j}${$}${q}${S}${C}${z}${A}`;
          return b.length > 0 ? this.buildSetOperations(_, b) : _;
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
            rightSelect: r,
            limit: n,
            orderBy: l,
            offset: a,
          },
        }) {
          let c,
            u = (0, o.ll)`(${e.getSQL()}) `,
            h = (0, o.ll)`(${r.getSQL()})`;
          if (l && l.length > 0) {
            let e = [];
            for (let t of l)
              if ((0, s.is)(t, N.Kl)) e.push(o.ll.identifier(t.name));
              else if ((0, s.is)(t, o.Xs)) {
                for (let e = 0; e < t.queryChunks.length; e++) {
                  let i = t.queryChunks[e];
                  (0, s.is)(i, N.Kl) &&
                    (t.queryChunks[e] = o.ll.identifier(i.name));
                }
                e.push((0, o.ll)`${t}`);
              } else e.push((0, o.ll)`${t}`);
            c = (0, o.ll)` order by ${o.ll.join(e, (0, o.ll)`, `)} `;
          }
          let d =
              "object" == typeof n || ("number" == typeof n && n >= 0)
                ? (0, o.ll)` limit ${n}`
                : void 0,
            f = o.ll.raw(`${t} ${i ? "all " : ""}`),
            p = a ? (0, o.ll)` offset ${a}` : void 0;
          return (0, o.ll)`${u}${f}${h}${c}${d}${p}`;
        }
        buildInsertQuery({
          table: e,
          values: t,
          onConflict: i,
          returning: r,
          withList: n,
        }) {
          let l = [],
            a = Object.entries(e[c.XI.Symbol.Columns]).filter(
              ([e, t]) => !t.shouldDisableInsert(),
            ),
            u = a.map(([, e]) =>
              o.ll.identifier(this.casing.getColumnCasing(e)),
            );
          for (let [e, i] of t.entries()) {
            let r = [];
            for (let [e, t] of a) {
              let n = i[e];
              if (void 0 === n || ((0, s.is)(n, o.Iw) && void 0 === n.value))
                if (void 0 !== t.defaultFn) {
                  let e = t.defaultFn(),
                    i = (0, s.is)(e, o.Xs) ? e : o.ll.param(e, t);
                  r.push(i);
                } else if (t.default || void 0 === t.onUpdateFn)
                  r.push((0, o.ll)`default`);
                else {
                  let e = t.onUpdateFn(),
                    i = (0, s.is)(e, o.Xs) ? e : o.ll.param(e, t);
                  r.push(i);
                }
              else r.push(n);
            }
            l.push(r), e < t.length - 1 && l.push((0, o.ll)`, `);
          }
          let h = this.buildWithCTE(n),
            d = o.ll.join(l),
            f = r
              ? (0,
                o.ll)` returning ${this.buildSelection(r, { isSingleTable: !0 })}`
              : void 0,
            p = i ? (0, o.ll)` on conflict ${i}` : void 0;
          return (0, o.ll)`${h}insert into ${e} ${u} values ${d}${p}${f}`;
        }
        buildRefreshMaterializedViewQuery({
          view: e,
          concurrently: t,
          withNoData: i,
        }) {
          let s = t ? (0, o.ll)` concurrently` : void 0,
            r = i ? (0, o.ll)` with no data` : void 0;
          return (0, o.ll)`refresh materialized view${s} ${e}${r}`;
        }
        prepareTyping(e) {
          if ((0, s.is)(e, P) || (0, s.is)(e, Q)) return "json";
          if ((0, s.is)(e, q)) return "decimal";
          if ((0, s.is)(e, A)) return "time";
          if ((0, s.is)(e, I) || (0, s.is)(e, L)) return "timestamp";
          if ((0, s.is)(e, E) || (0, s.is)(e, k)) return "date";
          else if ((0, s.is)(e, M)) return "uuid";
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
          table: r,
          tableConfig: n,
          queryConfig: l,
          tableAlias: u,
          nestedQueryRelation: h,
          joinOn: d,
        }) {
          let f,
            b = [],
            w,
            S,
            $ = [],
            T,
            N = [];
          if (!0 === l)
            b = Object.entries(n.columns).map(([e, t]) => ({
              dbKey: t.name,
              tsKey: e,
              field: g(t, u),
              relationTableTsKey: void 0,
              isJson: !1,
              selection: [],
            }));
          else {
            let r = Object.fromEntries(
              Object.entries(n.columns).map(([e, t]) => [e, g(t, u)]),
            );
            if (l.where) {
              let e =
                "function" == typeof l.where
                  ? l.where(r, {
                      and: W.Uo,
                      between: W.Tq,
                      eq: W.eq,
                      exists: W.t2,
                      gt: W.gt,
                      gte: W.RO,
                      ilike: W.B3,
                      inArray: W.RV,
                      isNull: W.kZ,
                      isNotNull: W.Pe,
                      like: W.mj,
                      lt: W.lt,
                      lte: W.wJ,
                      ne: W.ne,
                      not: W.AU,
                      notBetween: W.o8,
                      notExists: W.KJ,
                      notLike: W.RK,
                      notIlike: W.q1,
                      notInArray: W.KL,
                      or: W.or,
                      sql: o.ll,
                    })
                  : l.where;
              T = e && y(e, u);
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
                  ? l.extras(r, { sql: o.ll })
                  : l.extras,
              ))
                h.push({ tsKey: e, value: m(t, u) });
            for (let { tsKey: e, value: t } of h)
              b.push({
                dbKey: (0, s.is)(t, o.Xs.Aliased)
                  ? t.fieldAlias
                  : n.columns[e].name,
                tsKey: e,
                field: (0, s.is)(t, a.V) ? g(t, u) : t,
                relationTableTsKey: void 0,
                isJson: !1,
                selection: [],
              });
            let p =
              "function" == typeof l.orderBy
                ? l.orderBy(r, { sql: o.ll, asc: U, desc: Y })
                : (l.orderBy ?? []);
            for (let {
              tsKey: r,
              queryConfig: n,
              relation: h,
            } of (Array.isArray(p) || (p = [p]),
            ($ = p.map((e) => ((0, s.is)(e, a.V) ? g(e, u) : y(e, u)))),
            (w = l.limit),
            (S = l.offset),
            f)) {
              let l = (function (e, t, i) {
                  if ((0, s.is)(i, H) && i.config)
                    return {
                      fields: i.config.fields,
                      references: i.config.references,
                    };
                  let r = t[(0, c.Lf)(i.referencedTable)];
                  if (!r)
                    throw Error(
                      `Table "${i.referencedTable[c.XI.Symbol.Name]}" not found in schema`,
                    );
                  let n = e[r];
                  if (!n) throw Error(`Table "${r}" not found in schema`);
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
                          `There are multiple relations with name "${i.relationName}" in table "${r}"`,
                        )
                      : Error(
                          `There are multiple relations between "${r}" and "${i.sourceTable[c.XI.Symbol.Name]}". Please specify relation name`,
                        );
                  if (o[0] && (0, s.is)(o[0], H) && o[0].config)
                    return {
                      fields: o[0].config.references,
                      references: o[0].config.fields,
                    };
                  throw Error(
                    `There is not enough information to infer relation "${a}.${i.fieldName}"`,
                  );
                })(t, i, h),
                a = i[(0, c.Lf)(h.referencedTable)],
                d = `${u}_${r}`,
                f = (0, W.Uo)(
                  ...l.fields.map((e, t) =>
                    (0, W.eq)(g(l.references[t], d), g(e, u)),
                  ),
                ),
                p = this.buildRelationalQueryWithoutPK({
                  fullSchema: e,
                  schema: t,
                  tableNamesMap: i,
                  table: e[a],
                  tableConfig: t[a],
                  queryConfig: (0, s.is)(h, H)
                    ? !0 === n
                      ? { limit: 1 }
                      : { ...n, limit: 1 }
                    : n,
                  tableAlias: d,
                  joinOn: f,
                  nestedQueryRelation: h,
                }),
                m = (0,
                o.ll)`${o.ll.identifier(d)}.${o.ll.identifier("data")}`.as(r);
              N.push({
                on: (0, o.ll)`true`,
                table: new ei.n(p.sql, {}, d),
                alias: d,
                joinType: "left",
                lateral: !0,
              }),
                b.push({
                  dbKey: r,
                  tsKey: r,
                  field: m,
                  relationTableTsKey: a,
                  isJson: !0,
                  selection: p.selection,
                });
            }
          }
          if (0 === b.length)
            throw new v({
              message: `No fields selected for table "${n.tsName}" ("${u}")`,
            });
          if (((T = (0, W.Uo)(d, T)), h)) {
            let e = (0, o.ll)`json_build_array(${o.ll.join(
              b.map(({ field: e, tsKey: t, isJson: i }) =>
                i
                  ? (0,
                    o.ll)`${o.ll.identifier(`${u}_${t}`)}.${o.ll.identifier("data")}`
                  : (0, s.is)(e, o.Xs.Aliased)
                    ? e.sql
                    : e,
              ),
              (0, o.ll)`, `,
            )})`;
            (0, s.is)(h, ee) &&
              (e = (0,
              o.ll)`coalesce(json_agg(${e}${$.length > 0 ? (0, o.ll)` order by ${o.ll.join($, (0, o.ll)`, `)}` : void 0}), '[]'::json)`);
            let t = [
              {
                dbKey: "data",
                tsKey: "data",
                field: e.as("data"),
                isJson: !0,
                relationTableTsKey: n.tsName,
                selection: b,
              },
            ];
            void 0 !== w || void 0 !== S || $.length > 0
              ? ((f = this.buildSelectQuery({
                  table: p(r, u),
                  fields: {},
                  fieldsFlat: [{ path: [], field: o.ll.raw("*") }],
                  where: T,
                  limit: w,
                  offset: S,
                  orderBy: $,
                  setOperators: [],
                })),
                (T = void 0),
                (w = void 0),
                (S = void 0),
                ($ = []))
              : (f = p(r, u)),
              (f = this.buildSelectQuery({
                table: (0, s.is)(f, F) ? f : new ei.n(f, {}, u),
                fields: {},
                fieldsFlat: t.map(({ field: e }) => ({
                  path: [],
                  field: (0, s.is)(e, a.V) ? g(e, u) : e,
                })),
                joins: N,
                where: T,
                limit: w,
                offset: S,
                orderBy: $,
                setOperators: [],
              }));
          } else
            f = this.buildSelectQuery({
              table: p(r, u),
              fields: {},
              fieldsFlat: b.map(({ field: e }) => ({
                path: [],
                field: (0, s.is)(e, a.V) ? g(e, u) : e,
              })),
              joins: N,
              where: T,
              limit: w,
              offset: S,
              orderBy: $,
              setOperators: [],
            });
          return { tableTsKey: n.tsName, sql: f, selection: b };
        }
      }
      class ec {
        static [s.i] = "SelectionProxyHandler";
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
          if (t === u.n)
            return {
              ...e[u.n],
              selectedFields: new Proxy(e[u.n].selectedFields, this),
            };
          if ("symbol" == typeof t) return e[t];
          let i = (
            (0, s.is)(e, ei.n)
              ? e._.selectedFields
              : (0, s.is)(e, o.Ss)
                ? e[u.n].selectedFields
                : e
          )[t];
          if ((0, s.is)(i, o.Xs.Aliased)) {
            if ("sql" === this.config.sqlAliasedBehavior && !i.isSelectionField)
              return i.sql;
            let e = i.clone();
            return (e.isSelectionField = !0), e;
          }
          if ((0, s.is)(i, o.Xs)) {
            if ("sql" === this.config.sqlBehavior) return i;
            throw Error(
              `You tried to reference "${t}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`,
            );
          }
          return (0, s.is)(i, a.V)
            ? this.config.alias
              ? new Proxy(
                  i,
                  new h(
                    new Proxy(
                      i.table,
                      new d(
                        this.config.alias,
                        this.config.replaceOriginalName ?? !1,
                      ),
                    ),
                  ),
                )
              : i
            : "object" != typeof i || null === i
              ? i
              : new Proxy(i, new ec(this.config));
        }
      }
      class eu {
        static [s.i] = "TypedQueryBuilder";
        getSelectedFields() {
          return this._.selectedFields;
        }
      }
      class eh {
        static [s.i] = "QueryPromise";
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
      var ed = i(25486);
      class ef {
        static [s.i] = "PgSelectBuilder";
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
        from(e) {
          let t,
            i = !!this.fields;
          return (
            (t = this.fields
              ? this.fields
              : (0, s.is)(e, ei.n)
                ? Object.fromEntries(
                    Object.keys(e._.selectedFields).map((t) => [t, e[t]]),
                  )
                : (0, s.is)(e, ea)
                  ? e[u.n].selectedFields
                  : (0, s.is)(e, o.Xs)
                    ? {}
                    : e[c.XI.Symbol.Columns]),
            new eg({
              table: e,
              fields: t,
              isPartialSelect: i,
              session: this.session,
              dialect: this.dialect,
              withList: this.withList,
              distinct: this.distinct,
            })
          );
        }
      }
      class ep extends eu {
        static [s.i] = "PgSelectQueryBuilder";
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
            (this.tableName = el(e)),
            (this.joinsNotNullableMap =
              "string" == typeof this.tableName
                ? { [this.tableName]: !0 }
                : {});
        }
        createJoin(e) {
          return (t, i) => {
            let r = this.tableName,
              n = el(t);
            if (
              "string" == typeof n &&
              this.config.joins?.some((e) => e.alias === n)
            )
              throw Error(`Alias "${n}" is already used in this query`);
            if (
              !this.isPartialSelect &&
              (1 === Object.keys(this.joinsNotNullableMap).length &&
                "string" == typeof r &&
                (this.config.fields = { [r]: this.config.fields }),
              "string" == typeof n && !(0, s.is)(t, o.Xs))
            ) {
              let e = (0, s.is)(t, ei.n)
                ? t._.selectedFields
                : (0, s.is)(t, o.Ss)
                  ? t[u.n].selectedFields
                  : t[c.XI.Symbol.Columns];
              this.config.fields[n] = e;
            }
            if (
              ("function" == typeof i &&
                (i = i(
                  new Proxy(
                    this.config.fields,
                    new ec({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                  ),
                )),
              this.config.joins || (this.config.joins = []),
              this.config.joins.push({
                on: i,
                table: t,
                joinType: e,
                alias: n,
              }),
              "string" == typeof n)
            )
              switch (e) {
                case "left":
                  this.joinsNotNullableMap[n] = !1;
                  break;
                case "right":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[n] = !0);
                  break;
                case "inner":
                  this.joinsNotNullableMap[n] = !0;
                  break;
                case "full":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[n] = !1);
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
            let s = "function" == typeof i ? i(ey()) : i;
            if (!er(this.getSelectedFields(), s.getSelectedFields()))
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
                  new ec({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
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
                  new ec({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
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
                new ec({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
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
                  new ec({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" }),
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
            new ei.n(this.getSQL(), this.config.fields, e),
            new ec({
              alias: e,
              sqlAliasedBehavior: "alias",
              sqlBehavior: "error",
            }),
          );
        }
        getSelectedFields() {
          return new Proxy(
            this.config.fields,
            new ec({
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
      class eg extends ep {
        static [s.i] = "PgSelect";
        _prepare(e) {
          let {
            session: t,
            config: i,
            dialect: s,
            joinsNotNullableMap: r,
          } = this;
          if (!t)
            throw Error(
              "Cannot execute a query on a query builder. Please use a database instance instead.",
            );
          return ed.k.startActiveSpan("drizzle.prepareQuery", () => {
            let n = es(i.fields),
              l = t.prepareQuery(s.sqlToQuery(this.getSQL()), n, e, !0);
            return (l.joinsNotNullableMap = r), l;
          });
        }
        prepare(e) {
          return this._prepare(e);
        }
        execute = (e) =>
          ed.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e),
          );
      }
      for (let e of [eh])
        for (let t of Object.getOwnPropertyNames(e.prototype))
          "constructor" !== t &&
            Object.defineProperty(
              eg.prototype,
              t,
              Object.getOwnPropertyDescriptor(e.prototype, t) ||
                Object.create(null),
            );
      function em(e, t) {
        return (i, s, ...r) => {
          let n = [s, ...r].map((i) => ({ type: e, isAll: t, rightSelect: i }));
          for (let e of n)
            if (!er(i.getSelectedFields(), e.rightSelect.getSelectedFields()))
              throw Error(
                "Set operator error (union / intersect / except): selected fields are not the same or are in a different order",
              );
          return i.addSetOperators(n);
        };
      }
      let ey = () => ({
          union: eb,
          unionAll: ew,
          intersect: eS,
          intersectAll: e$,
          except: ev,
          exceptAll: eT,
        }),
        eb = em("union", !1),
        ew = em("union", !0),
        eS = em("intersect", !1),
        e$ = em("intersect", !0),
        ev = em("except", !1),
        eT = em("except", !0);
      class eN {
        static [s.i] = "PgQueryBuilder";
        dialect;
        dialectConfig;
        constructor(e) {
          (this.dialect = (0, s.is)(e, eo) ? e : void 0),
            (this.dialectConfig = (0, s.is)(e, eo) ? void 0 : e);
        }
        $with(e) {
          let t = this;
          return {
            as: (i) => (
              "function" == typeof i && (i = i(t)),
              new Proxy(
                new ei.J(i.getSQL(), i.getSelectedFields(), e, !0),
                new ec({
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
              return new ef({
                fields: i ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                withList: e,
              });
            },
            selectDistinct: function (e) {
              return new ef({
                fields: e ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                distinct: !0,
              });
            },
            selectDistinctOn: function (e, i) {
              return new ef({
                fields: i ?? void 0,
                session: void 0,
                dialect: t.getDialect(),
                distinct: { on: e },
              });
            },
          };
        }
        select(e) {
          return new ef({
            fields: e ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
          });
        }
        selectDistinct(e) {
          return new ef({
            fields: e ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: !0,
          });
        }
        selectDistinctOn(e, t) {
          return new ef({
            fields: t ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: { on: e },
          });
        }
        getDialect() {
          return (
            this.dialect || (this.dialect = new eo(this.dialectConfig)),
            this.dialect
          );
        }
      }
      class eO {
        constructor(e, t, i, s) {
          (this.table = e),
            (this.session = t),
            (this.dialect = i),
            (this.withList = s);
        }
        static [s.i] = "PgUpdateBuilder";
        set(e) {
          return new eP(
            this.table,
            en(this.table, e),
            this.session,
            this.dialect,
            this.withList,
          );
        }
      }
      class eP extends eh {
        constructor(e, t, i, s, r) {
          super(),
            (this.session = i),
            (this.dialect = s),
            (this.config = { set: t, table: e, withList: r });
        }
        static [s.i] = "PgUpdate";
        config;
        where(e) {
          return (this.config.where = e), this;
        }
        returning(e = this.config.table[c.XI.Symbol.Columns]) {
          return (this.config.returning = es(e)), this;
        }
        getSQL() {
          return this.dialect.buildUpdateQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        _prepare(e) {
          return this.session.prepareQuery(
            this.dialect.sqlToQuery(this.getSQL()),
            this.config.returning,
            e,
            !0,
          );
        }
        prepare(e) {
          return this._prepare(e);
        }
        execute = (e) => this._prepare().execute(e);
        $dynamic() {
          return this;
        }
      }
      class ex {
        constructor(e, t, i, s) {
          (this.table = e),
            (this.session = t),
            (this.dialect = i),
            (this.withList = s);
        }
        static [s.i] = "PgInsertBuilder";
        values(e) {
          if (0 === (e = Array.isArray(e) ? e : [e]).length)
            throw Error("values() must be called with at least one value");
          let t = e.map((e) => {
            let t = {},
              i = this.table[c.XI.Symbol.Columns];
            for (let r of Object.keys(e)) {
              let n = e[r];
              t[r] = (0, s.is)(n, o.Xs) ? n : new o.Iw(n, i[r]);
            }
            return t;
          });
          return new eQ(
            this.table,
            t,
            this.session,
            this.dialect,
            this.withList,
          );
        }
      }
      class eQ extends eh {
        constructor(e, t, i, s, r) {
          super(),
            (this.session = i),
            (this.dialect = s),
            (this.config = { table: e, values: t, withList: r });
        }
        static [s.i] = "PgInsert";
        config;
        returning(e = this.config.table[c.XI.Symbol.Columns]) {
          return (this.config.returning = es(e)), this;
        }
        onConflictDoNothing(e = {}) {
          if (void 0 === e.target)
            this.config.onConflict = (0, o.ll)`do nothing`;
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
            let i = e.where ? (0, o.ll)` where ${e.where}` : void 0;
            this.config.onConflict = (0, o.ll)`(${o.ll.raw(t)})${i} do nothing`;
          }
          return this;
        }
        onConflictDoUpdate(e) {
          if (e.where && (e.targetWhere || e.setWhere))
            throw Error(
              'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.',
            );
          let t = e.where ? (0, o.ll)` where ${e.where}` : void 0,
            i = e.targetWhere ? (0, o.ll)` where ${e.targetWhere}` : void 0,
            s = e.setWhere ? (0, o.ll)` where ${e.setWhere}` : void 0,
            r = this.dialect.buildUpdateSet(
              this.config.table,
              en(this.config.table, e.set),
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
            o.ll)`(${o.ll.raw(n)})${i} do update set ${r}${t}${s}`),
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
          return ed.k.startActiveSpan("drizzle.prepareQuery", () =>
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
        execute = (e) =>
          ed.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e),
          );
        $dynamic() {
          return this;
        }
      }
      class ej extends eh {
        constructor(e, t, i, s) {
          super(),
            (this.session = t),
            (this.dialect = i),
            (this.config = { table: e, withList: s });
        }
        static [s.i] = "PgDelete";
        config;
        where(e) {
          return (this.config.where = e), this;
        }
        returning(e = this.config.table[c.XI.Symbol.Columns]) {
          return (this.config.returning = es(e)), this;
        }
        getSQL() {
          return this.dialect.buildDeleteQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        _prepare(e) {
          return ed.k.startActiveSpan("drizzle.prepareQuery", () =>
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
        execute = (e) =>
          ed.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e),
          );
        $dynamic() {
          return this;
        }
      }
      class eq extends o.Xs {
        constructor(e) {
          super(eq.buildEmbeddedCount(e.source, e.filters).queryChunks),
            (this.params = e),
            this.mapWith(Number),
            (this.session = e.session),
            (this.sql = eq.buildCount(e.source, e.filters));
        }
        sql;
        static [s.i] = "PgCountBuilder";
        [Symbol.toStringTag] = "PgCountBuilder";
        session;
        static buildEmbeddedCount(e, t) {
          return (0,
          o.ll)`(select count(*) from ${e}${o.ll.raw(" where ").if(t)}${t})`;
        }
        static buildCount(e, t) {
          return (0,
          o.ll)`select count(*) as count from ${e}${o.ll.raw(" where ").if(t)}${t};`;
        }
        then(e, t) {
          return Promise.resolve(this.session.count(this.sql)).then(e, t);
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
      class eC {
        constructor(e, t, i, s, r, n, l) {
          (this.fullSchema = e),
            (this.schema = t),
            (this.tableNamesMap = i),
            (this.table = s),
            (this.tableConfig = r),
            (this.dialect = n),
            (this.session = l);
        }
        static [s.i] = "PgRelationalQueryBuilder";
        findMany(e) {
          return new ez(
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
          return new ez(
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
      class ez extends eh {
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
        static [s.i] = "PgRelationalQuery";
        _prepare(e) {
          return ed.k.startActiveSpan("drizzle.prepareQuery", () => {
            let { query: t, builtQuery: i } = this._toSQL();
            return this.session.prepareQuery(i, void 0, e, !0, (e, i) => {
              let r = e.map((e) =>
                (function e(t, i, r, n, l = (e) => e) {
                  let c = {};
                  for (let [u, h] of n.entries())
                    if (h.isJson) {
                      let n = i.relations[h.tsKey],
                        a = r[u],
                        o = "string" == typeof a ? JSON.parse(a) : a;
                      c[h.tsKey] = (0, s.is)(n, H)
                        ? o && e(t, t[h.relationTableTsKey], o, h.selection, l)
                        : o.map((i) =>
                            e(t, t[h.relationTableTsKey], i, h.selection, l),
                          );
                    } else {
                      let e,
                        t = l(r[u]),
                        i = h.field;
                      (e = (0, s.is)(i, a.V)
                        ? i
                        : (0, s.is)(i, o.Xs)
                          ? i.decoder
                          : i.sql.decoder),
                        (c[h.tsKey] =
                          null === t ? null : e.mapFromDriverValue(t));
                    }
                  return c;
                })(this.schema, this.tableConfig, e, t.selection, i),
              );
              return "first" === this.mode ? r[0] : r;
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
        execute() {
          return ed.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(),
          );
        }
      }
      class eA extends eh {
        constructor(e, t, i, s) {
          super(),
            (this.execute = e),
            (this.sql = t),
            (this.query = i),
            (this.mapBatchResult = s);
        }
        static [s.i] = "PgRaw";
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
      class e_ extends eh {
        constructor(e, t, i) {
          super(),
            (this.session = t),
            (this.dialect = i),
            (this.config = { view: e });
        }
        static [s.i] = "PgRefreshMaterializedView";
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
          return ed.k.startActiveSpan("drizzle.prepareQuery", () =>
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
        execute = (e) =>
          ed.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e),
          );
      }
      class eI {
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
              this.query[s] = new eC(
                i.fullSchema,
                this._.schema,
                this._.tableNamesMap,
                i.fullSchema[s],
                r,
                e,
                t,
              );
        }
        static [s.i] = "PgDatabase";
        query;
        $with(e) {
          let t = this;
          return {
            as: (i) => (
              "function" == typeof i && (i = i(new eN(t.dialect))),
              new Proxy(
                new ei.J(i.getSQL(), i.getSelectedFields(), e, !0),
                new ec({
                  alias: e,
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            ),
          };
        }
        $count(e, t) {
          return new eq({ source: e, filters: t, session: this.session });
        }
        with(...e) {
          let t = this;
          return {
            select: function (i) {
              return new ef({
                fields: i ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
              });
            },
            selectDistinct: function (i) {
              return new ef({
                fields: i ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
                distinct: !0,
              });
            },
            selectDistinctOn: function (i, s) {
              return new ef({
                fields: s ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
                distinct: { on: i },
              });
            },
            update: function (i) {
              return new eO(i, t.session, t.dialect, e);
            },
            insert: function (i) {
              return new ex(i, t.session, t.dialect, e);
            },
            delete: function (i) {
              return new ej(i, t.session, t.dialect, e);
            },
          };
        }
        select(e) {
          return new ef({
            fields: e ?? void 0,
            session: this.session,
            dialect: this.dialect,
          });
        }
        selectDistinct(e) {
          return new ef({
            fields: e ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: !0,
          });
        }
        selectDistinctOn(e, t) {
          return new ef({
            fields: t ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: { on: e },
          });
        }
        update(e) {
          return new eO(e, this.session, this.dialect);
        }
        insert(e) {
          return new ex(e, this.session, this.dialect);
        }
        delete(e) {
          return new ej(e, this.session, this.dialect);
        }
        refreshMaterializedView(e) {
          return new e_(e, this.session, this.dialect);
        }
        execute(e) {
          let t = "string" == typeof e ? o.ll.raw(e) : e.getSQL(),
            i = this.dialect.sqlToQuery(t),
            s = this.session.prepareQuery(i, void 0, void 0, !1);
          return new eA(
            () => s.execute(),
            t,
            i,
            (e) => s.mapResult(e, !0),
          );
        }
        transaction(e, t) {
          return this.session.transaction(e, t);
        }
      }
      class eX {
        constructor(e) {
          this.query = e;
        }
        getQuery() {
          return this.query;
        }
        mapResult(e, t) {
          return e;
        }
        static [s.i] = "PgPreparedQuery";
        joinsNotNullableMap;
      }
      class eL {
        constructor(e) {
          this.dialect = e;
        }
        static [s.i] = "PgSession";
        execute(e) {
          return ed.k.startActiveSpan("drizzle.operation", () =>
            ed.k
              .startActiveSpan("drizzle.prepareQuery", () =>
                this.prepareQuery(
                  this.dialect.sqlToQuery(e),
                  void 0,
                  void 0,
                  !1,
                ),
              )
              .execute(),
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
        async count(e) {
          return Number((await this.execute(e))[0].count);
        }
      }
      class eD extends eI {
        constructor(e, t, i, s = 0) {
          super(e, t, i), (this.schema = i), (this.nestedIndex = s);
        }
        static [s.i] = "PgTransaction";
        rollback() {
          throw new T();
        }
        getTransactionConfigSQL(e) {
          let t = [];
          return (
            e.isolationLevel && t.push(`isolation level ${e.isolationLevel}`),
            e.accessMode && t.push(e.accessMode),
            "boolean" == typeof e.deferrable &&
              t.push(e.deferrable ? "deferrable" : "not deferrable"),
            o.ll.raw(t.join(" "))
          );
        }
        setTransaction(e) {
          return this.session.execute(
            (0, o.ll)`set transaction ${this.getTransactionConfigSQL(e)}`,
          );
        }
      }
      class eE extends eX {
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
        static [s.i] = "PostgresJsPreparedQuery";
        async execute(e = {}) {
          return ed.k.startActiveSpan("drizzle.execute", async (t) => {
            let i = (0, o.Ct)(this.params, e);
            t?.setAttributes({
              "drizzle.query.text": this.queryString,
              "drizzle.query.params": JSON.stringify(i),
            }),
              this.logger.logQuery(this.queryString, i);
            let {
              fields: r,
              queryString: n,
              client: l,
              joinsNotNullableMap: u,
              customResultMapper: h,
            } = this;
            if (!r && !h)
              return ed.k.startActiveSpan("drizzle.driver.execute", () =>
                l.unsafe(n, i),
              );
            let d = await ed.k.startActiveSpan(
              "drizzle.driver.execute",
              () => (
                t?.setAttributes({
                  "drizzle.query.text": n,
                  "drizzle.query.params": JSON.stringify(i),
                }),
                l.unsafe(n, i).values()
              ),
            );
            return ed.k.startActiveSpan("drizzle.mapResponse", () =>
              h
                ? h(d)
                : d.map((e) =>
                    (function (e, t, i) {
                      let r = {},
                        n = e.reduce((e, { path: n, field: l }, u) => {
                          let h;
                          h = (0, s.is)(l, a.V)
                            ? l
                            : (0, s.is)(l, o.Xs)
                              ? l.decoder
                              : l.sql.decoder;
                          let d = e;
                          for (let [e, o] of n.entries())
                            if (e < n.length - 1)
                              o in d || (d[o] = {}), (d = d[o]);
                            else {
                              let e = t[u],
                                f = (d[o] =
                                  null === e ? null : h.mapFromDriverValue(e));
                              if (i && (0, s.is)(l, a.V) && 2 === n.length) {
                                let e = n[0];
                                e in r
                                  ? "string" == typeof r[e] &&
                                    r[e] !== (0, c.Io)(l.table) &&
                                    (r[e] = !1)
                                  : (r[e] = null === f && (0, c.Io)(l.table));
                              }
                            }
                          return e;
                        }, {});
                      if (i && Object.keys(r).length > 0)
                        for (let [e, t] of Object.entries(r))
                          "string" != typeof t || i[t] || (n[e] = null);
                      return n;
                    })(r, e, u),
                  ),
            );
          });
        }
        all(e = {}) {
          return ed.k.startActiveSpan("drizzle.execute", async (t) => {
            let i = (0, o.Ct)(this.params, e);
            return (
              t?.setAttributes({
                "drizzle.query.text": this.queryString,
                "drizzle.query.params": JSON.stringify(i),
              }),
              this.logger.logQuery(this.queryString, i),
              ed.k.startActiveSpan(
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
      class eB extends eL {
        constructor(e, t, i, s = {}) {
          super(t),
            (this.client = e),
            (this.schema = i),
            (this.options = s),
            (this.logger = s.logger ?? new l());
        }
        static [s.i] = "PostgresJsSession";
        logger;
        prepareQuery(e, t, i, s, r) {
          return new eE(this.client, e.sql, e.params, this.logger, t, s, r);
        }
        query(e, t) {
          return this.logger.logQuery(e, t), this.client.unsafe(e, t).values();
        }
        queryObjects(e, t) {
          return this.client.unsafe(e, t);
        }
        transaction(e, t) {
          return this.client.begin(async (i) => {
            let s = new eB(i, this.dialect, this.schema, this.options),
              r = new ek(this.dialect, s, this.schema);
            return t && (await r.setTransaction(t)), e(r);
          });
        }
      }
      class ek extends eD {
        constructor(e, t, i, s = 0) {
          super(e, t, i, s), (this.session = t);
        }
        static [s.i] = "PostgresJsTransaction";
        transaction(e) {
          return this.session.client.savepoint((t) => {
            let i = new eB(t, this.dialect, this.schema, this.session.options);
            return e(new ek(this.dialect, i, this.schema));
          });
        }
      }
      class eR extends eI {
        static [s.i] = "PostgresJsDatabase";
      }
      function eM(e, t = {}) {
        let i,
          r,
          l = (e) => e;
        for (let t of ["1184", "1082", "1083", "1114"])
          (e.options.parsers[t] = l), (e.options.serializers[t] = l);
        (e.options.serializers["114"] = l), (e.options.serializers["3802"] = l);
        let a = new eo({ casing: t.casing });
        if (
          (!0 === t.logger ? (i = new n()) : !1 !== t.logger && (i = t.logger),
          t.schema)
        ) {
          let e = (function (e, t) {
            1 === Object.keys(e).length &&
              "default" in e &&
              !(0, s.is)(e.default, c.XI) &&
              (e = e.default);
            let i = {},
              r = {},
              n = {};
            for (let [l, a] of Object.entries(e))
              if ((0, s.is)(a, c.XI)) {
                let e = (0, c.Lf)(a),
                  t = r[e];
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
                    (0, s.is)(e, J) && n[l].primaryKey.push(...e.columns);
              } else if ((0, s.is)(a, G)) {
                let e,
                  s = (0, c.Lf)(a.table),
                  l = i[s];
                for (let [i, o] of Object.entries(a.config(t(a.table))))
                  if (l) {
                    let t = n[l];
                    (t.relations[i] = o), e && t.primaryKey.push(...e);
                  } else
                    s in r || (r[s] = { relations: {}, primaryKey: e }),
                      (r[s].relations[i] = o);
              }
            return { tables: n, tableNamesMap: i };
          })(t.schema, et);
          r = {
            fullSchema: t.schema,
            schema: e.tables,
            tableNamesMap: e.tableNamesMap,
          };
        }
        let o = new eB(e, a, r, { logger: i }),
          u = new eR(a, o, r);
        return (u.$client = e), u;
      }
    },
    76387: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(
          t,
          "createDedupedByCallsiteServerErrorLoggerDev",
          {
            enumerable: !0,
            get: function () {
              return o;
            },
          },
        );
      let s = (function (e, t) {
        if (e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var i = r(t);
        if (i && i.has(e)) return i.get(e);
        var s = { __proto__: null },
          n = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var l in e)
          if ("default" !== l && Object.prototype.hasOwnProperty.call(e, l)) {
            var a = n ? Object.getOwnPropertyDescriptor(e, l) : null;
            a && (a.get || a.set)
              ? Object.defineProperty(s, l, a)
              : (s[l] = e[l]);
          }
        return (s.default = e), i && i.set(e, s), s;
      })(i(84147));
      function r(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          i = new WeakMap();
        return (r = function (e) {
          return e ? i : t;
        })(e);
      }
      let n = { current: null },
        l = "function" == typeof s.cache ? s.cache : (e) => e,
        a = console.warn;
      function o(e) {
        return function (...t) {
          a(e(...t));
        };
      }
      l((e) => {
        try {
          a(n.current);
        } finally {
          n.current = null;
        }
      });
    },
    90020: (e, t, i) => {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        !(function (e, t) {
          for (var i in t)
            Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
        })(t, {
          isRequestAPICallableInsideAfter: function () {
            return o;
          },
          throwForSearchParamsAccessInUseCache: function () {
            return a;
          },
          throwWithStaticGenerationBailoutError: function () {
            return n;
          },
          throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
            return l;
          },
        });
      let s = i(57154),
        r = i(3295);
      function n(e, t) {
        throw Object.defineProperty(
          new s.StaticGenBailoutError(
            `Route ${e} couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E576", enumerable: !1, configurable: !0 },
        );
      }
      function l(e, t) {
        throw Object.defineProperty(
          new s.StaticGenBailoutError(
            `Route ${e} with \`dynamic = "error"\` couldn't be rendered statically because it used ${t}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E543", enumerable: !1, configurable: !0 },
        );
      }
      function a(e) {
        throw Object.defineProperty(
          Error(
            `Route ${e} used "searchParams" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "searchParams" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E634", enumerable: !1, configurable: !0 },
        );
      }
      function o() {
        let e = r.afterTaskAsyncStorage.getStore();
        return (null == e ? void 0 : e.rootTaskSpawnPhase) === "action";
      }
    },
  });
//# sourceMappingURL=7490.js.map
