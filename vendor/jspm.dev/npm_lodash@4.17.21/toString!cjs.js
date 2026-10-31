import { _ as _baseToString } from './_/9e71a819.js';
import './_/e65ed236.js';
import './_/b15bba73.js';
import './_arrayMap!cjs';
import './isArray!cjs';
import './isSymbol!cjs';
import './_/052e9e66.js';
import './isObjectLike!cjs';

var exports = {};
var baseToString = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? "" : baseToString(value);
}
exports = toString;
var _toString = exports;

export { _toString as default };

//# sourceMappingURL=toString!cjs.map