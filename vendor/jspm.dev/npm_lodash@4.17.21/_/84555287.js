var exports = {};
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}
exports = basePropertyOf;
var _basePropertyOf = exports;

export { _basePropertyOf as _ };

//# sourceMappingURL=84555287.js.map