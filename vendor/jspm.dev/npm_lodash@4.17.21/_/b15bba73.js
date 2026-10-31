var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;
var exports$1 = {};
/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof _global == "object" && _global && _global.Object === Object && _global;
exports$1 = freeGlobal$1;
var _freeGlobal = exports$1;

var exports = {};
var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == "object" && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function("return this")();
exports = root;
var _root = exports;

export { _root as _, _freeGlobal as a };

//# sourceMappingURL=b15bba73.js.map