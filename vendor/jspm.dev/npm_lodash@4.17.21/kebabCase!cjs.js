import { _ as _createCompounder } from './_/49c065bb.js';
import './_/ae5139c3.js';
import './deburr!cjs';
import './_/84555287.js';
import './toString!cjs';
import './_/9e71a819.js';
import './_/e65ed236.js';
import './_/b15bba73.js';
import './_arrayMap!cjs';
import './isArray!cjs';
import './isSymbol!cjs';
import './_/052e9e66.js';
import './isObjectLike!cjs';
import './words!cjs';

var exports = {};
var createCompounder = _createCompounder;

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function (result, word, index) {
  return result + (index ? "-" : "") + word.toLowerCase();
});
exports = kebabCase;
var _kebabCase = exports;

export { _kebabCase as default };

//# sourceMappingURL=kebabCase!cjs.map