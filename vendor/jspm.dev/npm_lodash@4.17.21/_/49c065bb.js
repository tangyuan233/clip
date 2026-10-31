import { _ as _arrayReduce } from './ae5139c3.js';
import _deburr from '../deburr!cjs';
import _words from '../words!cjs';

var exports = {};
var arrayReduce = _arrayReduce,
  deburr = _deburr,
  words = _words;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, "g");

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
exports = createCompounder;
var _createCompounder = exports;

export { _createCompounder as _ };

//# sourceMappingURL=49c065bb.js.map