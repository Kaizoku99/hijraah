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
    (e._sentryDebugIds[t] = "82b33ef0-c407-415e-94b6-f0808631482d"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-82b33ef0-c407-415e-94b6-f0808631482d"));
} catch (e) {}
("use strict");
(exports.id = 1371),
  (exports.ids = [1371]),
  (exports.modules = {
    61371: (e, t, s) => {
      s.d(t, { f: () => O });
      var i = s(78814),
        r = s(22321);
      class n {
        static [r.i] = "ConsoleLogWriter";
        write(e) {
          console.log(e);
        }
      }
      class a {
        static [r.i] = "DefaultLogger";
        writer;
        constructor(e) {
          this.writer = e?.writer ?? new n();
        }
        logQuery(e, t) {
          let s = t.map((e) => {
              try {
                return JSON.stringify(e);
              } catch {
                return String(e);
              }
            }),
            i = s.length ? ` -- params: [${s.join(", ")}]` : "";
          this.writer.write(`Query: ${e}${i}`);
        }
      }
      class o {
        static [r.i] = "NoopLogger";
        logQuery() {}
      }
      var l = s(97236),
        h = s(36700),
        u = s(40128),
        c = s(35780),
        d = s(65807),
        g = s(4595),
        p = s(16988),
        f = s(74696),
        y = s(73653),
        m = s(10765);
      class b {
        constructor(e, t, s, i) {
          (this.table = e),
            (this.session = t),
            (this.dialect = s),
            (this.withList = i);
        }
        static [r.i] = "PgUpdateBuilder";
        authToken;
        setToken(e) {
          return (this.authToken = e), this;
        }
        set(e) {
          return void 0 === this.authToken
            ? new w(
                this.table,
                (0, y.q)(this.table, e),
                this.session,
                this.dialect,
                this.withList,
              )
            : new w(
                this.table,
                (0, y.q)(this.table, e),
                this.session,
                this.dialect,
                this.withList,
              ).setToken(this.authToken);
        }
      }
      class w extends c.k {
        constructor(e, t, s, i, r) {
          super(),
            (this.session = s),
            (this.dialect = i),
            (this.config = { set: t, table: e, withList: r, joins: [] }),
            (this.tableName = (0, y.zN)(e)),
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
          let t = (0, y.zN)(e);
          return (
            "string" == typeof t && (this.joinsNotNullableMap[t] = !0),
            (this.config.from = e),
            this
          );
        }
        getTableLikeFields(e) {
          return (0, r.is)(e, u.mu)
            ? e[f.XI.Symbol.Columns]
            : (0, r.is)(e, p.n)
              ? e._.selectedFields
              : e[m.n].selectedFields;
        }
        createJoin(e) {
          return (t, s) => {
            let i = (0, y.zN)(t);
            if (
              "string" == typeof i &&
              this.config.joins.some((e) => e.alias === i)
            )
              throw Error(`Alias "${i}" is already used in this query`);
            if ("function" == typeof s) {
              let e =
                this.config.from && !(0, r.is)(this.config.from, g.Xs)
                  ? this.getTableLikeFields(this.config.from)
                  : void 0;
              s = s(
                new Proxy(
                  this.config.table[f.XI.Symbol.Columns],
                  new d.b({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                ),
                e &&
                  new Proxy(
                    e,
                    new d.b({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" }),
                  ),
              );
            }
            if (
              (this.config.joins.push({
                on: s,
                table: t,
                joinType: e,
                alias: i,
              }),
              "string" == typeof i)
            )
              switch (e) {
                case "left":
                  this.joinsNotNullableMap[i] = !1;
                  break;
                case "right":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[i] = !0);
                  break;
                case "inner":
                  this.joinsNotNullableMap[i] = !0;
                  break;
                case "full":
                  (this.joinsNotNullableMap = Object.fromEntries(
                    Object.entries(this.joinsNotNullableMap).map(([e]) => [
                      e,
                      !1,
                    ]),
                  )),
                    (this.joinsNotNullableMap[i] = !1);
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
            ((e = Object.assign({}, this.config.table[f.XI.Symbol.Columns])),
            this.config.from)
          ) {
            let t = (0, y.zN)(this.config.from);
            if (
              "string" == typeof t &&
              this.config.from &&
              !(0, r.is)(this.config.from, g.Xs)
            ) {
              let s = this.getTableLikeFields(this.config.from);
              e[t] = s;
            }
            for (let t of this.config.joins) {
              let s = (0, y.zN)(t.table);
              if ("string" == typeof s && !(0, r.is)(t.table, g.Xs)) {
                let i = this.getTableLikeFields(t.table);
                e[s] = i;
              }
            }
          }
          return (this.config.returning = (0, y.He)(e)), this;
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
        $dynamic() {
          return this;
        }
      }
      var S = s(21651);
      class k {
        constructor(e, t, s, i, r) {
          (this.table = e),
            (this.session = t),
            (this.dialect = s),
            (this.withList = i),
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
              s = this.table[f.XI.Symbol.Columns];
            for (let i of Object.keys(e)) {
              let n = e[i];
              t[i] = (0, r.is)(n, g.Xs) ? n : new g.Iw(n, s[i]);
            }
            return t;
          });
          return void 0 === this.authToken
            ? new v(
                this.table,
                t,
                this.session,
                this.dialect,
                this.withList,
                !1,
                this.overridingSystemValue_,
              )
            : new v(
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
          let t = "function" == typeof e ? e(new l.o()) : e;
          if (
            !(0, r.is)(t, g.Xs) &&
            !(0, y.DV)(this.table[f.e], t._.selectedFields)
          )
            throw Error(
              "Insert select error: selected fields are not the same or are in a different order compared to the table definition",
            );
          return new v(
            this.table,
            t,
            this.session,
            this.dialect,
            this.withList,
            !0,
          );
        }
      }
      class v extends c.k {
        constructor(e, t, s, i, r, n, a) {
          super(),
            (this.session = s),
            (this.dialect = i),
            (this.config = {
              table: e,
              values: t,
              withList: r,
              select: n,
              overridingSystemValue_: a,
            });
        }
        static [r.i] = "PgInsert";
        config;
        returning(e = this.config.table[f.XI.Symbol.Columns]) {
          return (this.config.returning = (0, y.He)(e)), this;
        }
        onConflictDoNothing(e = {}) {
          if (void 0 === e.target)
            this.config.onConflict = (0, g.ll)`do nothing`;
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
            let s = e.where ? (0, g.ll)` where ${e.where}` : void 0;
            this.config.onConflict = (0, g.ll)`(${g.ll.raw(t)})${s} do nothing`;
          }
          return this;
        }
        onConflictDoUpdate(e) {
          if (e.where && (e.targetWhere || e.setWhere))
            throw Error(
              'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.',
            );
          let t = e.where ? (0, g.ll)` where ${e.where}` : void 0,
            s = e.targetWhere ? (0, g.ll)` where ${e.targetWhere}` : void 0,
            i = e.setWhere ? (0, g.ll)` where ${e.setWhere}` : void 0,
            r = this.dialect.buildUpdateSet(
              this.config.table,
              (0, y.q)(this.config.table, e.set),
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
            g.ll)`(${g.ll.raw(n)})${s} do update set ${r}${t}${i}`),
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
          return S.k.startActiveSpan("drizzle.prepareQuery", () =>
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
          S.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
        $dynamic() {
          return this;
        }
      }
      class Q extends c.k {
        constructor(e, t, s, i) {
          super(),
            (this.session = t),
            (this.dialect = s),
            (this.config = { table: e, withList: i });
        }
        static [r.i] = "PgDelete";
        config;
        where(e) {
          return (this.config.where = e), this;
        }
        returning(e = this.config.table[f.XI.Symbol.Columns]) {
          return (this.config.returning = (0, y.He)(e)), this;
        }
        getSQL() {
          return this.dialect.buildDeleteQuery(this.config);
        }
        toSQL() {
          let { typings: e, ...t } = this.dialect.sqlToQuery(this.getSQL());
          return t;
        }
        _prepare(e) {
          return S.k.startActiveSpan("drizzle.prepareQuery", () =>
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
          S.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
        $dynamic() {
          return this;
        }
      }
      class N extends g.Xs {
        constructor(e) {
          super(N.buildEmbeddedCount(e.source, e.filters).queryChunks),
            (this.params = e),
            this.mapWith(Number),
            (this.session = e.session),
            (this.sql = N.buildCount(e.source, e.filters));
        }
        sql;
        token;
        static [r.i] = "PgCountBuilder";
        [Symbol.toStringTag] = "PgCountBuilder";
        session;
        static buildEmbeddedCount(e, t) {
          return (0,
          g.ll)`(select count(*) from ${e}${g.ll.raw(" where ").if(t)}${t})`;
        }
        static buildCount(e, t) {
          return (0,
          g.ll)`select count(*) as count from ${e}${g.ll.raw(" where ").if(t)}${t};`;
        }
        setToken(e) {
          this.token = e;
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
      var T = s(19313);
      class q {
        constructor(e, t, s, i, r, n, a) {
          (this.fullSchema = e),
            (this.schema = t),
            (this.tableNamesMap = s),
            (this.table = i),
            (this.tableConfig = r),
            (this.dialect = n),
            (this.session = a);
        }
        static [r.i] = "PgRelationalQueryBuilder";
        findMany(e) {
          return new z(
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
          return new z(
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
      class z extends c.k {
        constructor(e, t, s, i, r, n, a, o, l) {
          super(),
            (this.fullSchema = e),
            (this.schema = t),
            (this.tableNamesMap = s),
            (this.table = i),
            (this.tableConfig = r),
            (this.dialect = n),
            (this.session = a),
            (this.config = o),
            (this.mode = l);
        }
        static [r.i] = "PgRelationalQuery";
        _prepare(e) {
          return S.k.startActiveSpan("drizzle.prepareQuery", () => {
            let { query: t, builtQuery: s } = this._toSQL();
            return this.session.prepareQuery(s, void 0, e, !0, (e, s) => {
              let i = e.map((e) =>
                (0, T.I$)(this.schema, this.tableConfig, e, t.selection, s),
              );
              return "first" === this.mode ? i[0] : i;
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
          return S.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(void 0, this.authToken),
          );
        }
      }
      class x extends c.k {
        constructor(e, t, s, i) {
          super(),
            (this.execute = e),
            (this.sql = t),
            (this.query = s),
            (this.mapBatchResult = i);
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
      class L extends c.k {
        constructor(e, t, s) {
          super(),
            (this.session = t),
            (this.dialect = s),
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
          return S.k.startActiveSpan("drizzle.prepareQuery", () =>
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
          S.k.startActiveSpan("drizzle.operation", () =>
            this._prepare().execute(e, this.authToken),
          );
      }
      class C {
        constructor(e, t, s) {
          if (
            ((this.dialect = e),
            (this.session = t),
            (this._ = s
              ? {
                  schema: s.schema,
                  fullSchema: s.fullSchema,
                  tableNamesMap: s.tableNamesMap,
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
            for (let [i, r] of Object.entries(this._.schema))
              this.query[i] = new q(
                s.fullSchema,
                this._.schema,
                this._.tableNamesMap,
                s.fullSchema[i],
                r,
                e,
                t,
              );
        }
        static [r.i] = "PgDatabase";
        query;
        $with(e) {
          let t = this;
          return {
            as: (s) => (
              "function" == typeof s && (s = s(new l.o(t.dialect))),
              new Proxy(
                new p.J(s.getSQL(), s.getSelectedFields(), e, !0),
                new d.b({
                  alias: e,
                  sqlAliasedBehavior: "alias",
                  sqlBehavior: "error",
                }),
              )
            ),
          };
        }
        $count(e, t) {
          return new N({ source: e, filters: t, session: this.session });
        }
        with(...e) {
          let t = this;
          return {
            select: function (s) {
              return new h.PI({
                fields: s ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
              });
            },
            selectDistinct: function (s) {
              return new h.PI({
                fields: s ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
                distinct: !0,
              });
            },
            selectDistinctOn: function (s, i) {
              return new h.PI({
                fields: i ?? void 0,
                session: t.session,
                dialect: t.dialect,
                withList: e,
                distinct: { on: s },
              });
            },
            update: function (s) {
              return new b(s, t.session, t.dialect, e);
            },
            insert: function (s) {
              return new k(s, t.session, t.dialect, e);
            },
            delete: function (s) {
              return new Q(s, t.session, t.dialect, e);
            },
          };
        }
        select(e) {
          return new h.PI({
            fields: e ?? void 0,
            session: this.session,
            dialect: this.dialect,
          });
        }
        selectDistinct(e) {
          return new h.PI({
            fields: e ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: !0,
          });
        }
        selectDistinctOn(e, t) {
          return new h.PI({
            fields: t ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: { on: e },
          });
        }
        update(e) {
          return new b(e, this.session, this.dialect);
        }
        insert(e) {
          return new k(e, this.session, this.dialect);
        }
        delete(e) {
          return new Q(e, this.session, this.dialect);
        }
        refreshMaterializedView(e) {
          return new L(e, this.session, this.dialect);
        }
        authToken;
        execute(e) {
          let t = "string" == typeof e ? g.ll.raw(e) : e.getSQL(),
            s = this.dialect.sqlToQuery(t),
            i = this.session.prepareQuery(s, void 0, void 0, !1);
          return new x(
            () => i.execute(void 0, this.authToken),
            t,
            s,
            (e) => i.mapResult(e, !0),
          );
        }
        transaction(e, t) {
          return this.session.transaction(e, t);
        }
      }
      var _ = s(85532),
        A = s(90077);
      class M {
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
      class j {
        constructor(e) {
          this.dialect = e;
        }
        static [r.i] = "PgSession";
        execute(e, t) {
          return S.k.startActiveSpan("drizzle.operation", () =>
            S.k
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
      class P extends C {
        constructor(e, t, s, i = 0) {
          super(e, t, s), (this.schema = s), (this.nestedIndex = i);
        }
        static [r.i] = "PgTransaction";
        rollback() {
          throw new A.j();
        }
        getTransactionConfigSQL(e) {
          let t = [];
          return (
            e.isolationLevel && t.push(`isolation level ${e.isolationLevel}`),
            e.accessMode && t.push(e.accessMode),
            "boolean" == typeof e.deferrable &&
              t.push(e.deferrable ? "deferrable" : "not deferrable"),
            g.ll.raw(t.join(" "))
          );
        }
        setTransaction(e) {
          return this.session.execute(
            (0, g.ll)`set transaction ${this.getTransactionConfigSQL(e)}`,
          );
        }
      }
      class $ extends M {
        constructor(e, t, s, i, r, n, a) {
          super({ sql: t, params: s }),
            (this.client = e),
            (this.queryString = t),
            (this.params = s),
            (this.logger = i),
            (this.fields = r),
            (this._isResponseInArrayMode = n),
            (this.customResultMapper = a);
        }
        static [r.i] = "PostgresJsPreparedQuery";
        async execute(e = {}) {
          return S.k.startActiveSpan("drizzle.execute", async (t) => {
            let s = (0, g.Ct)(this.params, e);
            t?.setAttributes({
              "drizzle.query.text": this.queryString,
              "drizzle.query.params": JSON.stringify(s),
            }),
              this.logger.logQuery(this.queryString, s);
            let {
              fields: i,
              queryString: r,
              client: n,
              joinsNotNullableMap: a,
              customResultMapper: o,
            } = this;
            if (!i && !o)
              return S.k.startActiveSpan("drizzle.driver.execute", () =>
                n.unsafe(r, s),
              );
            let l = await S.k.startActiveSpan(
              "drizzle.driver.execute",
              () => (
                t?.setAttributes({
                  "drizzle.query.text": r,
                  "drizzle.query.params": JSON.stringify(s),
                }),
                n.unsafe(r, s).values()
              ),
            );
            return S.k.startActiveSpan("drizzle.mapResponse", () =>
              o ? o(l) : l.map((e) => (0, y.a6)(i, e, a)),
            );
          });
        }
        all(e = {}) {
          return S.k.startActiveSpan("drizzle.execute", async (t) => {
            let s = (0, g.Ct)(this.params, e);
            return (
              t?.setAttributes({
                "drizzle.query.text": this.queryString,
                "drizzle.query.params": JSON.stringify(s),
              }),
              this.logger.logQuery(this.queryString, s),
              S.k.startActiveSpan(
                "drizzle.driver.execute",
                () => (
                  t?.setAttributes({
                    "drizzle.query.text": this.queryString,
                    "drizzle.query.params": JSON.stringify(s),
                  }),
                  this.client.unsafe(this.queryString, s)
                ),
              )
            );
          });
        }
        isResponseInArrayMode() {
          return this._isResponseInArrayMode;
        }
      }
      class I extends j {
        constructor(e, t, s, i = {}) {
          super(t),
            (this.client = e),
            (this.schema = s),
            (this.options = i),
            (this.logger = i.logger ?? new o());
        }
        static [r.i] = "PostgresJsSession";
        logger;
        prepareQuery(e, t, s, i, r) {
          return new $(this.client, e.sql, e.params, this.logger, t, i, r);
        }
        query(e, t) {
          return this.logger.logQuery(e, t), this.client.unsafe(e, t).values();
        }
        queryObjects(e, t) {
          return this.client.unsafe(e, t);
        }
        transaction(e, t) {
          return this.client.begin(async (s) => {
            let i = new I(s, this.dialect, this.schema, this.options),
              r = new D(this.dialect, i, this.schema);
            return t && (await r.setTransaction(t)), e(r);
          });
        }
      }
      class D extends P {
        constructor(e, t, s, i = 0) {
          super(e, t, s, i), (this.session = t);
        }
        static [r.i] = "PostgresJsTransaction";
        transaction(e) {
          return this.session.client.savepoint((t) => {
            let s = new I(t, this.dialect, this.schema, this.session.options);
            return e(new D(this.dialect, s, this.schema));
          });
        }
      }
      class J extends C {
        static [r.i] = "PostgresJsDatabase";
      }
      function R(e, t = {}) {
        let s,
          i,
          r = (e) => e;
        for (let t of ["1184", "1082", "1083", "1114"])
          (e.options.parsers[t] = r), (e.options.serializers[t] = r);
        (e.options.serializers["114"] = r), (e.options.serializers["3802"] = r);
        let n = new _.s({ casing: t.casing });
        if (
          (!0 === t.logger ? (s = new a()) : !1 !== t.logger && (s = t.logger),
          t.schema)
        ) {
          let e = (0, T._k)(t.schema, T.DZ);
          i = {
            fullSchema: t.schema,
            schema: e.tables,
            tableNamesMap: e.tableNamesMap,
          };
        }
        let o = new I(e, n, i, { logger: s }),
          l = new J(n, o, i);
        return (l.$client = e), l;
      }
      function O(...e) {
        if ("string" == typeof e[0]) return R((0, i.A)(e[0]), e[1]);
        if ((0, y.Lq)(e[0])) {
          let { connection: t, client: s, ...r } = e[0];
          if (s) return R(s, r);
          if ("object" == typeof t && void 0 !== t.url) {
            let { url: e, ...s } = t;
            return R((0, i.A)(e, s), r);
          }
          return R((0, i.A)(t), r);
        }
        return R(e[0], e[1]);
      }
      (O || (O = {})).mock = function (e) {
        return R({}, e);
      };
    },
  });
//# sourceMappingURL=1371.js.map
