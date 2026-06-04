//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
var e;
function t(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
var n = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(e = globalThis).__zod_globalConfig ?? (e.__zod_globalConfig = {});
var r = globalThis.__zod_globalConfig;
function i(e) {
	return e && Object.assign(r, e), r;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
function a(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function o(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function s(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function c(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
var l = /* @__PURE__ */ Symbol("evaluating");
function u(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== l) return r === void 0 && (r = l, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
var d = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function f(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var p = /* @__PURE__ */ new Set([
	"string",
	"number",
	"symbol"
]);
function ee(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function te(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function m(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function h(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
-Number.MAX_VALUE, Number.MAX_VALUE;
function g(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function ne(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function _(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function v(e) {
	return typeof e == "string" ? e : e?.message;
}
function y(e, t, n) {
	let r = e.message ? e.message : v(e.inst?._zod.def?.error?.(e)) ?? v(t?.error?.(e)) ?? v(n.customError?.(e)) ?? v(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
var b = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, o, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, x = t("$ZodError", b), S = t("$ZodError", b, { Parent: Error }), C = /* @__PURE__ */ ((e) => (t, r, a, o) => {
	let s = a ? {
		...a,
		async: !1
	} : { async: !1 }, c = t._zod.run({
		value: r,
		issues: []
	}, s);
	if (c instanceof Promise) throw new n();
	if (c.issues.length) {
		let t = new (o?.Err ?? e)(c.issues.map((e) => y(e, s, i())));
		throw d(t, o?.callee), t;
	}
	return c.value;
})(S), w = /* @__PURE__ */ ((e) => async (t, n, r, a) => {
	let o = r ? {
		...r,
		async: !0
	} : { async: !0 }, s = t._zod.run({
		value: n,
		issues: []
	}, o);
	if (s instanceof Promise && (s = await s), s.issues.length) {
		let t = new (a?.Err ?? e)(s.issues.map((e) => y(e, o, i())));
		throw d(t, a?.callee), t;
	}
	return s.value;
})(S), T = /* @__PURE__ */ ((e) => (t, r, a) => {
	let o = a ? {
		...a,
		async: !1
	} : { async: !1 }, s = t._zod.run({
		value: r,
		issues: []
	}, o);
	if (s instanceof Promise) throw new n();
	return s.issues.length ? {
		success: !1,
		error: new (e ?? x)(s.issues.map((e) => y(e, o, i())))
	} : {
		success: !0,
		data: s.value
	};
})(S), E = /* @__PURE__ */ ((e) => async (t, n, r) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	return o instanceof Promise && (o = await o), o.issues.length ? {
		success: !1,
		error: new e(o.issues.map((e) => y(e, a, i())))
	} : {
		success: !0,
		data: o.value
	};
})(S), re = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, D = /^https?$/, ie = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, ae = /^(?:true|false)$/i, oe = /* @__PURE__ */ t("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), se = /* @__PURE__ */ t("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	oe.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), ce = {
	major: 4,
	minor: 4,
	patch: 3
}, O = /* @__PURE__ */ t("$ZodType", (e, t) => {
	var r;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ce;
	let i = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && i.unshift(e);
	for (let t of i) for (let n of t._zod.onattach) n(e);
	if (i.length === 0) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, r) => {
			let i = g(e), a;
			for (let o of t) {
				if (o._zod.def.when) {
					if (ne(e) || !o._zod.def.when(e)) continue;
				} else if (i) continue;
				let t = e.issues.length, s = o._zod.check(e);
				if (s instanceof Promise && r?.async === !1) throw new n();
				if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
					await s, e.issues.length !== t && (i ||= g(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					i ||= g(e, t);
				}
			}
			return a ? a.then(() => e) : e;
		}, r = (r, a, o) => {
			if (g(r)) return r.aborted = !0, r;
			let s = t(a, i, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new n();
				return s.then((t) => e._zod.parse(t, o));
			}
			return e._zod.parse(s, o);
		};
		e._zod.run = (a, o) => {
			if (o.skipChecks) return e._zod.parse(a, o);
			if (o.direction === "backward") {
				let t = e._zod.parse({
					value: a.value,
					issues: []
				}, {
					...o,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => r(e, a, o)) : r(t, a, o);
			}
			let s = e._zod.parse(a, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new n();
				return s.then((e) => t(e, i, o));
			}
			return t(s, i, o);
		};
	}
	u(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = T(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return E(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), k = /* @__PURE__ */ t("$ZodString", (e, t) => {
	O.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? ie(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), A = /* @__PURE__ */ t("$ZodStringFormat", (e, t) => {
	se.init(e, t), k.init(e, t);
}), j = /* @__PURE__ */ t("$ZodURL", (e, t) => {
	A.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === D.source && !/^https?:\/\//i.test(r)) {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			let i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.normalize ? n.value = i.href : n.value = r;
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), M = /* @__PURE__ */ t("$ZodBoolean", (e, t) => {
	O.init(e, t), e._zod.pattern = ae, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), N = /* @__PURE__ */ t("$ZodNever", (e, t) => {
	O.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function P(e, t, n) {
	e.issues.length && t.issues.push(..._(n, e.issues)), t.value[n] = e.value;
}
var F = /* @__PURE__ */ t("$ZodArray", (e, t) => {
	O.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => P(t, n, e))) : P(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function I(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(..._(n, e.issues));
	}
	if (!o && !i) {
		e.issues.length || t.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [n]
		});
		return;
	}
	e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
}
function L(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = h(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function R(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin === "optional", d = c.optout === "optional";
	for (let i in t) {
		if (i === "__proto__" || s.has(i)) continue;
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => I(e, n, i, t, u, d))) : I(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var z = /* @__PURE__ */ t("$ZodObject", (e, t) => {
	if (O.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = s(() => L(t));
	u(e._zod, "propValues", () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = f, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optin === "optional", i = n._zod.optout === "optional", a = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			a instanceof Promise ? c.push(a.then((n) => I(n, t, e, s, r, i))) : I(a, t, e, s, r, i);
		}
		return i ? R(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), B = /* @__PURE__ */ t("$ZodEnum", (e, t) => {
	O.init(e, t);
	let n = a(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => p.has(typeof e)).map((e) => typeof e == "string" ? ee(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
});
function V(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var H = /* @__PURE__ */ t("$ZodOptional", (e, t) => {
	O.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", u(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0), u(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${c(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => V(e, r)) : V(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
});
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
/* @__NO_SIDE_EFFECTS__ */
function U(e, t) {
	return new e({
		type: "string",
		...m(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function W(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...m(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function G(e, t) {
	return new e({
		type: "boolean",
		...m(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function le(e, t) {
	return new e({
		type: "never",
		...m(t)
	});
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/mini/schemas.js
var K = /* @__PURE__ */ t("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	O.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n) => C(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => T(e, t, n), e.parseAsync = async (t, n) => w(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => E(e, t, n), e.check = (...n) => e.clone({
		...t,
		checks: [...t.checks ?? [], ...n.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)]
	}, { parent: !0 }), e.with = e.check, e.clone = (t, n) => te(e, t, n), e.brand = () => e, e.register = ((t, n) => (t.add(e, n), e)), e.apply = (t) => t(e);
}), q = /* @__PURE__ */ t("ZodMiniString", (e, t) => {
	k.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function J(e) {
	return /* @__PURE__ */ U(q, e);
}
var ue = /* @__PURE__ */ t("ZodMiniStringFormat", (e, t) => {
	A.init(e, t), q.init(e, t);
}), de = /* @__PURE__ */ t("ZodMiniURL", (e, t) => {
	j.init(e, t), ue.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function Y(e) {
	return /* @__PURE__ */ W(de, {
		protocol: D,
		hostname: re,
		...m(e)
	});
}
var fe = /* @__PURE__ */ t("ZodMiniBoolean", (e, t) => {
	M.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function pe(e) {
	return /* @__PURE__ */ G(fe, e);
}
var me = /* @__PURE__ */ t("ZodMiniNever", (e, t) => {
	N.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function he(e) {
	return /* @__PURE__ */ le(me, e);
}
var ge = /* @__PURE__ */ t("ZodMiniArray", (e, t) => {
	F.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function X(e, t) {
	return new ge({
		type: "array",
		element: e,
		...m(t)
	});
}
var Z = /* @__PURE__ */ t("ZodMiniObject", (e, t) => {
	z.init(e, t), K.init(e, t), u(e, "shape", () => t.shape);
});
/* @__NO_SIDE_EFFECTS__ */
function _e(e, t) {
	return new Z({
		type: "object",
		shape: e ?? {},
		...m(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Q(e, t) {
	return new Z({
		type: "object",
		shape: e,
		catchall: /* @__PURE__ */ he(),
		...m(t)
	});
}
var ve = /* @__PURE__ */ t("ZodMiniEnum", (e, t) => {
	B.init(e, t), K.init(e, t), e.options = Object.values(t.entries);
});
/* @__NO_SIDE_EFFECTS__ */
function ye(e, t) {
	return new ve({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...m(t)
	});
}
var be = /* @__PURE__ */ t("ZodMiniOptional", (e, t) => {
	H.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function $(e) {
	return new be({
		type: "optional",
		innerType: e
	});
}
//#endregion
//#region src/create-theme.ts
var xe = /* @__PURE__ */ Q({
	name: /* @__PURE__ */ J(),
	styleTitle: /* @__PURE__ */ J(),
	styleUrl: /* @__PURE__ */ $(/* @__PURE__ */ Y({ normalize: !0 })),
	pageUrl: /* @__PURE__ */ $(/* @__PURE__ */ X(/* @__PURE__ */ Y({ normalize: !0 }))),
	fonts: /* @__PURE__ */ X(/* @__PURE__ */ _e({
		fontFamily: /* @__PURE__ */ J(),
		fontWeight: /* @__PURE__ */ J(),
		fontUrl: /* @__PURE__ */ Y({ normalize: !0 }),
		fontStyle: /* @__PURE__ */ J(),
		fontDisplay: /* @__PURE__ */ $(/* @__PURE__ */ ye([
			"swap",
			"optional",
			"fallback",
			"block",
			"auto"
		])),
		load: /* @__PURE__ */ $(/* @__PURE__ */ pe())
	}))
});
function Se(e) {
	Array.isArray(e) || (e = [e]), Ce(e);
}
function Ce(e) {
	let t = e.map((e) => xe.parse(e)), n = !1;
	for (let e of t) e.name === "default" && (n = !0);
	if (!n) throw Error("Theme specification must have default theme");
	return t;
}
//#endregion
export { Se as createTheme };
