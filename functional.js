"use strict";

/**
 * @param {number} intStart -- start of range (inclusive)
 * @param {number} intEnd - end of range (exclusive)
 * @param {function} fMap - function to apply to each integer in range
 * @returns {Array} of results of fMap
 */
function intRangeMap(intStart, intEnd, fMap) {
    if (intStart >= intEnd) {
        return undefined;
    }
    var index = intStart;
    var resultIndex = 0;
    var result = Array(intEnd - intStart);
    for (; index < intEnd; index += 1, resultIndex += 1) {
        result[resultIndex] = fMap(index);
    }
    return result;
}

/**
 * @param {Array<Array>} array
 * @returns {Array}
 */
function flatten1(array) {
    var outerIndex = 0,
        outerLength = array.length,
        result;

        
        
        result = [];
        for (outerIndex = 0; outerIndex < outerLength; outerIndex += 1) {
            result = result.concat(array[outerIndex])
        }
        return result;
}

module.exports = {
    "intRangeMap": intRangeMap,
    "flatten1": flatten1
};