"use strict";
const words = require("./words.js");
const lexicon = words.getLexicon();
const edit = require("./edit.js");
const edits1 = edit.edits1;

function makeCombinedResult(word, edit1, edit2) {
    return {"string": word, "editSequence":  [edit1, edit2] };     
}

/**
 * @param {string} s
 * @returns {boolean}
 * 
 * Uses global variable lexicon
 */
function known(s) {
    return lexicon[s];
}

function known_edits1(s) {
    return edits1(s).filter(x => known(x.string) );
}

function known_edits2(s) {
    var e, e1, e2;
    // e1Set is set of words at distance 1
    const e1Set = {};
    for (e1 of edits1(s)) {
        let maybeWord = e1.string;
        if (known(maybeWord)  && maybeWord !== s) {
            e1Set[maybeWord] = true;
        }
    }

    var result = [];
    for (e of edits1(s)) {
        for (e2 of edits1(e.string)) {
            let maybeWord = e2.string;
            if (known(maybeWord) && !e1Set[maybeWord] && maybeWord !== s) {
                 result.push(makeCombinedResult( maybeWord, e.editSequence, e2.editSequence));
            } 
        }
    }
    return result;
}

function candidates(s) {
    const result = {};
    var wordEdit, word;
    var isWord = known(s);

    if (isWord) {
        result[s] = []; // distance 0 edit!   
    }

    for (wordEdit of known_edits1(s)) {
        word = wordEdit.string;
        if (result[word] === undefined) {
            result[word] = [];
        }
        if (word !== s) {
            result[word].push(wordEdit.editSequence);
        }
    }

    if (isWord) { // if word is known, don't try for distance 2 edits
        return result;
    }
    // candidates for short words are all distance 0 or 1
    // unless no such candidates exist 
    if (s.length < 5) {
        for (let unused in result) {
            return result;
        }
    }
    
    for(wordEdit of known_edits2(s)) {
        word = wordEdit.string;
        if (result[word] === undefined) {
            result[word] = [];
        }
        result[word].push(wordEdit.editSequence);
    }
    return result;
}

module.exports = {
    "known": known,
    "known_edits1": known_edits1,
    "known_edits2": known_edits2,
    "candidates": candidates  
};