"use strict";


const words = require('./words.js');
const lexicon = words.getLexicon();
const dictionary = words.getDictionary();


/**
 * @param {object} dict
 * @returns {number}
 */
function countDictionaryWords(dict) {
    let totalFreqs = 0;
    for (let word in dictionary) {
        totalFreqs += dictionary[word];
    }
    return totalFreqs;
}
const dictionarySize = countDictionaryWords(dictionary);

/**
 * @param {string} word
 * @returns {number}
 */
function dictionaryProbability(word) {
    let freq = dictionary[word];
    if (!freq) {
        freq = 1;
    }
    return Math.log(freq/dictionarySize);
}




/**
 * @param {string} word
 * @returns {boolean}
 */
function inDictionary(word) {
    const lookup = dictionary[word];
    if (!lookup) {
        return false;
    }
    if (lookup < 400000) {
        return false;
    }
    return true;
}

function Candidate(word) {
    this.word = word;
    this.languageModelProbability = dictionaryProbability(word);
}



function compare(a, b) {
    return  a.languageModelProbability < b.languageModelProbability;
}

/**
 * @param {string} word
 * @returns {string}
 */
function correct(word) {
    const candidatesArray = candidates(word).sort(compare);
    if (!candidatesArray) {
        console.log(word + ": no candidates");
        return word;
    }
    if (candidatesArray.length === 0) {
        console.log(word  + ": empty candidate list");
    }
    return candidatesArray[0].word;

}


function spelltest(tests) {
    const verbose = true;
    var n = 0;
    var bad = 0;
    var unknown = 0;

    for (let right of Object.keys(tests)) {
        let wrongs = tests[right];
        for (let wrong of wrongs.split(' ') ) {
            n += 1;            
            let w = correct(wrong);
            if (!w) {
                console.log("no result for: " + wrong)
            }
            if (w !== right) {
                bad += 1;
                if (!inDictionary(right)) {
                    console.log("unknown: " + right);
                    unknown += 1;
                }
            }
            if (w !== right) {
                console.log('correct(' + wrong +') => ' + w +
                     ' ('+ dictionary[w] + '), expected: ' + right +
                     ' (' + dictionary[right] +')'  );
            }
        }
    }
    
    console.log("bad = " + bad);
    console.log("unknown = " + unknown);
    var percentCorrect = 100 - 100*bad/n;
    console.log(percentCorrect + "% Correct");             
    return;
}
                


const testData = require("./testData.js");


console.time('spelltest');
spelltest(testData.tests1);
console.timeEnd('spelltest');
