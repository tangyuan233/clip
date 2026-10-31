import { _ as _baseGetTag } from './_/052e9e66.js';
import _isObjectLike from './isObjectLike!cjs';
import './_/e65ed236.js';
import './_/b15bba73.js';

var exports = {};
var baseGetTag = _baseGetTag,
  isObjectLike = _isObjectLike;

/** `Object#toString` result references. */
var symbolTag = "[object Symbol]";

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
exports = isSymbol;
var _isSymbol = exports;

export { _isSymbol as default };

//# sourceMappingURL=isSymbol!cjs.map