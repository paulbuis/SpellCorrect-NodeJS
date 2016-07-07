"use strict";
const fs = require("fs");
/**
 * @returns {object}
 */
function readLexicon() {
    const lines = fs.readFileSync("words.txt", "utf-8").split("\n");
    var line; 
    const lexicon = {};
    for (line of lines) {
        line = line.trim();
        if (line.length > 0) {
            lexicon[line] = true;
        } 
    }
    // freezing makes for a 5% speedup later ???
    return Object.freeze(lexicon);
}

/**
 * @returns {object}
 */
function readDictionary() {
    /**
     * @type {string[]}
     */
    const lines = fs.readFileSync("count_1w.txt", "utf-8").split("\n");
    var line;
    const dictionary = {};
    for (line of lines) {
        line = line.trim();
        let array = line.split('\t');
        if (array.length > 1) {
            let word = array[0];
            let count = array[1];
            if (lexicon[word]) {
                dictionary[word] = parseFloat(count);
            }
        }
    }  
    return Object.freeze(dictionary); 
}

var dictionary = null;
var lexicon = null;

function getLexicon() {
    if (lexicon === null) {
        lexicon = readLexicon();
    }
    return lexicon;
}

function getDictionary() {
    if (dictionary === null) {
        dictionary = readDictonary();
    }
    return dictionary;
}


module.exports = {
    "getLexicon": getLexicon,
    "getDictionary": getDictionary
}