# SpellCorrect-NodeJS
A Peter Norvig inspired spelling corrector in JavaScript

Inspired by Peter Norvig's [_How to Write a Spelling Corrector_](http://norvig.com/spell-correct.html) and
[his chapter in Natural Lanauge Corpus Data: Beautiful Data](http://norvig.com/ngrams/)

* `words.js` reads `words.txt` and `count_1w.txt` and requires the [`fs` module built into Node.js](https://nodejs.org/api/fs.html).
* `functional.js` contains the `flatten1()` function required by `edit.js`.
* `edit.js` contains the `edits1()` function.
* `testdata.js` exports two maps used to evaluate how well correction has worked
* `spelling.js` contains `correct()` which provides a word by word spelling corrector and `spelltest()` to evaluate it using data from `tsetdata.js`.
* `candidates.js` requires `words.js` and `edit.js` and exports the functions `known()`, `known_edits1()`, `known_edits2()`, and `candidates()`

