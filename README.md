# SpellCorrect-NodeJS
A Peter Norvig inspired spelling corrector in JavaScript

Inspired by Peter Norvig's [_How to Write a Spelling Corrector_](http://norvig.com/spell-correct.html) and
[his chapter in _Natural Lanauge Corpus Data: Beautiful Data_](http://norvig.com/ngrams/)

* `words.js` reads `words.txt` and `count_1w.txt` and requires the [`fs` module built into Node.js](https://nodejs.org/api/fs.html).
* `functional.js` contains the `flatten1()` function required by `edit.js`.
* `edit.js` contains the `edits1()` function.
* `candidates.js` requires `words.js` and `edit.js` and exports the functions `known()`, `known_edits1()`, `known_edits2()`, and `candidates()`
* `testdata.js` exports two maps used to evaluate how well correction has worked
* `spelling.js` requires `words.js` and `candidates.js`. It contains `correct()` which provides a word by word spelling corrector and `spelltest()` to evaluate it using data from `tsetdata.js`.

Sorting of candidates slow due to calling dictionaryProbability() twice for each comparison in sort() of array of candidates.

Inconsistent word list use. candidates.known() uses lexicon, but correct() uses dictionary.

Better results expected if we use the intersection of lexicon and dictionary.

Currently discarding edits that go with candidates. Waste of time!    Theoretically, could be used with an error model
to improve accuracy.

Maybe would improve results if more closely followed the original Python algorithm for cadidate selection: only use candidates
at shortest possible edit distance rather than including longer ones.
