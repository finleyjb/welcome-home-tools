//#region ../../node_modules/.pnpm/nanostores@https+++codeload.github.com+nanostores+nanostores+tar.gz+d703421c90965909b19165d7c5bcdf62db0c5b48/node_modules/nanostores/clean-stores/index.js
var e = Symbol("clean"), t = [], n = 0, r = 4, i = globalThis.nanostoresGlobal ||= { epoch: 0 }, a = /* @__NO_SIDE_EFFECTS__ */ (a) => {
	let o = [], s = {
		get() {
			return s.lc || s.listen(() => {})(), s.value;
		},
		init: a,
		lc: 0,
		listen(e) {
			return s.lc = o.push(e), () => {
				for (let i = n + r; i < t.length;) t[i] === e ? t.splice(i, r) : i += r;
				let i = o.indexOf(e);
				~i && (o.splice(i, 1), --s.lc || s.off());
			};
		},
		notify(e, a) {
			i.epoch++;
			let c = !t.length;
			for (let n of o) t.push(n, s.value, e, a);
			if (c) {
				for (n = 0; n < t.length; n += r) t[n](t[n + 1], t[n + 2], t[n + 3]);
				t.length = 0;
			}
		},
		off() {},
		set(e) {
			let t = s.value;
			t !== e && (s.value = e, s.notify(t));
		},
		subscribe(e) {
			let t = s.listen(e);
			return e(s.value), t;
		},
		value: a
	};
	return process.env.NODE_ENV !== "production" && (s[e] = () => {
		o = [], s.lc = 0, s.off();
	}), s;
}, o = 5, s = 6, c = 10, l = (e, t, n, r) => (e.events = e.events || {}, e.events[n + c] || (e.events[n + c] = r((t) => {
	e.events[n].reduceRight((e, t) => (t(e), e), {
		shared: {},
		...t
	});
})), e.events[n] = e.events[n] || [], e.events[n].push(t), () => {
	let r = e.events[n], i = r.indexOf(t);
	r.splice(i, 1), r.length || (delete e.events[n], e.events[n + c](), delete e.events[n + c]);
}), u = 1e3, d = (t, n) => l(t, (e) => {
	let r = n(e);
	r && t.events[s].push(r);
}, o, (n) => {
	let r = t.listen;
	t.listen = (...e) => (!t.lc && !t.active && (t.active = !0, n()), r(...e));
	let i = t.off;
	if (t.events[s] = [], t.off = () => {
		i(), setTimeout(() => {
			if (t.active && !t.lc) {
				t.active = !1;
				for (let e of t.events[s]) e();
				t.events[s] = [];
			}
		}, u);
	}, process.env.NODE_ENV !== "production") {
		let n = t[e];
		t[e] = () => {
			for (let e of t.events[s]) e();
			t.events[s] = [], t.active = !1, n();
		};
	}
	return () => {
		t.listen = r, t.off = i;
	};
}), f = {};
function ee(e) {
	f[e] || (f[e] = !0, typeof console < "u" && console.warn && (console.groupCollapsed("Nano Stores: " + e), console.trace("Source of deprecated call"), console.groupEnd()));
}
//#endregion
//#region ../../node_modules/.pnpm/nanostores@https+++codeload.github.com+nanostores+nanostores+tar.gz+d703421c90965909b19165d7c5bcdf62db0c5b48/node_modules/nanostores/computed/index.js
var te = (e, t, n) => {
	Array.isArray(e) || (e = [e]);
	let r, o, s = () => {
		if (o === i.epoch) return;
		o = i.epoch;
		let n = e.map((e) => e.get());
		if (!r || n.some((e, t) => e !== r[t])) {
			r = n;
			let e = t(...n);
			e && e.then && e.t ? (process.env.NODE_ENV !== "production" && ee("Use @nanostores/async for async computed. We will remove Promise support in computed() in Nano Stores 2.0"), e.then((e) => {
				r === n && c.set(e);
			})) : (c.set(e), o = i.epoch);
		}
	}, c = /* @__PURE__ */ a(void 0), l = c.get;
	c.get = () => (s(), l());
	let u, f = n ? () => {
		clearTimeout(u), u = setTimeout(s);
	} : s;
	return d(c, () => {
		let t = e.map((e) => e.listen(f));
		return s(), () => {
			for (let e of t) e();
		};
	}), c;
}, ne = /* @__NO_SIDE_EFFECTS__ */ (e, t) => te(e, t, !0), p = /* @__PURE__ */ a([{
	name: "default",
	styleTitle: "default"
}]), m = /* @__PURE__ */ a("default"), h = /* @__PURE__ */ ne([p, m], (e, t) => {
	let n = e.find((e) => e.name === t) ?? e.find((e) => e.name === "default");
	return n || (n = {
		name: "default",
		styleTitle: "default"
	}, console.error(t === "default" ? "No theme found for name default" : `No theme found for name ${t} or default`)), n;
});
function re(e) {
	p.set(e);
}
function ie(e) {
	m.set(e);
}
function g() {
	let e, t = new Promise((t, n) => {
		e = t;
	}), n = !1;
	return setTimeout(() => {
		let t = h.subscribe((r) => {
			n || (e(r), n = !0, setTimeout(() => {
				t();
			}));
		});
	}), t;
}
function _(e) {
	return h.subscribe(e);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
var v;
function y(e, t, n) {
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
var b = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
};
(v = globalThis).__zod_globalConfig ?? (v.__zod_globalConfig = {});
var x = globalThis.__zod_globalConfig;
function S(e) {
	return e && Object.assign(x, e), x;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
function ae(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function oe(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function se(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function C(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
var w = /* @__PURE__ */ Symbol("evaluating");
function T(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== w) return r === void 0 && (r = w, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
var E = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function ce(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var le = /* @__PURE__ */ new Set([
	"string",
	"number",
	"symbol"
]);
function ue(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function de(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function D(e) {
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
function fe(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
-Number.MAX_VALUE, Number.MAX_VALUE;
function O(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function pe(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function k(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function A(e) {
	return typeof e == "string" ? e : e?.message;
}
function j(e, t, n) {
	let r = e.message ? e.message : A(e.inst?._zod.def?.error?.(e)) ?? A(t?.error?.(e)) ?? A(n.customError?.(e)) ?? A(n.localeError?.(e)) ?? "Invalid input", { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
var M = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, oe, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, me = y("$ZodError", M), N = y("$ZodError", M, { Parent: Error }), P = /* @__PURE__ */ ((e) => (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !1
	} : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new b();
	if (o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => j(e, a, S())));
		throw E(t, i?.callee), t;
	}
	return o.value;
})(N), F = /* @__PURE__ */ ((e) => async (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => j(e, a, S())));
		throw E(t, i?.callee), t;
	}
	return o.value;
})(N), I = /* @__PURE__ */ ((e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new b();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? me)(a.issues.map((e) => j(e, i, S())))
	} : {
		success: !0,
		data: a.value
	};
})(N), L = /* @__PURE__ */ ((e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => j(e, i, S())))
	} : {
		success: !0,
		data: a.value
	};
})(N), R = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, z = /^https?$/, he = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, ge = /^(?:true|false)$/i, _e = /* @__PURE__ */ y("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), ve = /* @__PURE__ */ y("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	_e.init(e, t), e._zod.onattach.push((e) => {
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
}), ye = {
	major: 4,
	minor: 4,
	patch: 3
}, B = /* @__PURE__ */ y("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ye;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = O(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (pe(e) || !a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new b();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= O(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= O(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (O(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new b();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (i, a) => {
			if (a.skipChecks) return e._zod.parse(i, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: i.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
			}
			let o = e._zod.parse(i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new b();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	T(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = I(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return L(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), V = /* @__PURE__ */ y("$ZodString", (e, t) => {
	B.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? he(e._zod.bag), e._zod.parse = (n, r) => {
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
}), H = /* @__PURE__ */ y("$ZodStringFormat", (e, t) => {
	ve.init(e, t), V.init(e, t);
}), be = /* @__PURE__ */ y("$ZodURL", (e, t) => {
	H.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === z.source && !/^https?:\/\//i.test(r)) {
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
}), xe = /* @__PURE__ */ y("$ZodBoolean", (e, t) => {
	B.init(e, t), e._zod.pattern = ge, e._zod.parse = (n, r) => {
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
}), Se = /* @__PURE__ */ y("$ZodNever", (e, t) => {
	B.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function U(e, t, n) {
	e.issues.length && t.issues.push(...k(n, e.issues)), t.value[n] = e.value;
}
var Ce = /* @__PURE__ */ y("$ZodArray", (e, t) => {
	B.init(e, t), e._zod.parse = (n, r) => {
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
			s instanceof Promise ? a.push(s.then((t) => U(t, n, e))) : U(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function W(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...k(n, e.issues));
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
function we(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = fe(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function Te(e, t, n, r, i, a) {
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
		a instanceof Promise ? e.push(a.then((e) => W(e, n, i, t, u, d))) : W(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Ee = /* @__PURE__ */ y("$ZodObject", (e, t) => {
	if (B.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = se(() => we(t));
	T(e._zod, "propValues", () => {
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
	let r = ce, i = t.catchall, a;
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
			a instanceof Promise ? c.push(a.then((n) => W(n, t, e, s, r, i))) : W(a, t, e, s, r, i);
		}
		return i ? Te(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), De = /* @__PURE__ */ y("$ZodEnum", (e, t) => {
	B.init(e, t);
	let n = ae(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => le.has(typeof e)).map((e) => typeof e == "string" ? ue(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
});
function G(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
var Oe = /* @__PURE__ */ y("$ZodOptional", (e, t) => {
	B.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", T(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0), T(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${C(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => G(e, r)) : G(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
});
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
/* @__NO_SIDE_EFFECTS__ */
function ke(e, t) {
	return new e({
		type: "string",
		...D(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ae(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...D(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function je(e, t) {
	return new e({
		type: "boolean",
		...D(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Me(e, t) {
	return new e({
		type: "never",
		...D(t)
	});
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/mini/schemas.js
var K = /* @__PURE__ */ y("ZodMiniType", (e, t) => {
	if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
	B.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n) => P(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => I(e, t, n), e.parseAsync = async (t, n) => F(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => L(e, t, n), e.check = (...n) => e.clone({
		...t,
		checks: [...t.checks ?? [], ...n.map((e) => typeof e == "function" ? { _zod: {
			check: e,
			def: { check: "custom" },
			onattach: []
		} } : e)]
	}, { parent: !0 }), e.with = e.check, e.clone = (t, n) => de(e, t, n), e.brand = () => e, e.register = ((t, n) => (t.add(e, n), e)), e.apply = (t) => t(e);
}), q = /* @__PURE__ */ y("ZodMiniString", (e, t) => {
	V.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function J(e) {
	return /* @__PURE__ */ ke(q, e);
}
var Ne = /* @__PURE__ */ y("ZodMiniStringFormat", (e, t) => {
	H.init(e, t), q.init(e, t);
}), Pe = /* @__PURE__ */ y("ZodMiniURL", (e, t) => {
	be.init(e, t), Ne.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function Y(e) {
	return /* @__PURE__ */ Ae(Pe, {
		protocol: z,
		hostname: R,
		...D(e)
	});
}
var Fe = /* @__PURE__ */ y("ZodMiniBoolean", (e, t) => {
	xe.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function Ie(e) {
	return /* @__PURE__ */ je(Fe, e);
}
var Le = /* @__PURE__ */ y("ZodMiniNever", (e, t) => {
	Se.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function Re(e) {
	return /* @__PURE__ */ Me(Le, e);
}
var ze = /* @__PURE__ */ y("ZodMiniArray", (e, t) => {
	Ce.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function Be(e, t) {
	return new ze({
		type: "array",
		element: e,
		...D(t)
	});
}
var X = /* @__PURE__ */ y("ZodMiniObject", (e, t) => {
	Ee.init(e, t), K.init(e, t), T(e, "shape", () => t.shape);
});
/* @__NO_SIDE_EFFECTS__ */
function Ve(e, t) {
	return new X({
		type: "object",
		shape: e ?? {},
		...D(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function He(e, t) {
	return new X({
		type: "object",
		shape: e,
		catchall: /* @__PURE__ */ Re(),
		...D(t)
	});
}
var Ue = /* @__PURE__ */ y("ZodMiniEnum", (e, t) => {
	De.init(e, t), K.init(e, t), e.options = Object.values(t.entries);
});
/* @__NO_SIDE_EFFECTS__ */
function We(e, t) {
	return new Ue({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...D(t)
	});
}
var Ge = /* @__PURE__ */ y("ZodMiniOptional", (e, t) => {
	Oe.init(e, t), K.init(e, t);
});
/* @__NO_SIDE_EFFECTS__ */
function Z(e) {
	return new Ge({
		type: "optional",
		innerType: e
	});
}
//#endregion
//#region src/types.ts
var Q = /* @__PURE__ */ He({
	name: /* @__PURE__ */ J(),
	styleTitle: /* @__PURE__ */ J(),
	styleUrl: /* @__PURE__ */ Z(/* @__PURE__ */ Y({ normalize: !0 })),
	pageUrl: /* @__PURE__ */ Z(/* @__PURE__ */ Be(/* @__PURE__ */ Y({ normalize: !0 })))
});
//#endregion
//#region src/create-theme.ts
function Ke(e) {
	Array.isArray(e) || (e = [e]), re(qe(e));
}
function qe(e) {
	let t = e.map((e) => Q.parse(e)), n = !1;
	for (let e of t) e.name === "default" && (n = !0);
	if (!n) throw Error("Theme specification must have default theme");
	return t;
}
//#endregion
//#region src/add-font.ts
function Je(e) {
	document.fonts.add(e);
}
//#endregion
//#region src/fonts.ts
var $ = /* @__PURE__ */ Ve({
	fontFamily: /* @__PURE__ */ J(),
	fontWeight: /* @__PURE__ */ J(),
	fontUrl: /* @__PURE__ */ Y({ normalize: !0 }),
	fontStyle: /* @__PURE__ */ J(),
	fontDisplay: /* @__PURE__ */ Z(/* @__PURE__ */ We([
		"swap",
		"optional",
		"fallback",
		"block",
		"auto"
	])),
	load: /* @__PURE__ */ Z(/* @__PURE__ */ Ie())
});
async function Ye(e) {
	Array.isArray(e) || (e = [e]), e = e.map((e) => $.parse(e));
	for (let t of e) {
		let e = new FontFace(t.fontFamily, `url('${t.fontUrl}`, {
			style: t.fontStyle,
			weight: t.fontWeight,
			display: t.fontDisplay ?? "swap"
		});
		Je(e), (t.load == null || t.load) && e.load();
	}
}
//#endregion
export { $ as FontSpecSchema, Ke as createTheme, g as getCurrentTheme, Ye as loadFonts, ie as setThemeName, _ as subscribeCurrentTheme };
