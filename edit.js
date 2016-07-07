"use strict";

const fun = require("./functional.js")

/**
 * @param {string} word
 * @returns {Set<string>}
 */
function edits1(word) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    function makeOneResult(maybeWord, preEdit, postEdit) {
        return {"string": maybeWord, "editSequence": preEdit + "|" + postEdit };
    }

    /**
     * @param {Array<string>} pair

     * 
     * Example: splits=[ ["", "for"], ["f", "or"], ["fo", "r"], ["for", ""] ]
     * Returns: Set(["or", "fr", "fo"])
     * 
     * Example: splits= [ ["", "foo"], ["f", "oo"], ["fo", "o"], ["foo", ""] ]
     * Returns: ["oo", "fo", "fo"]) = {"oo, "fo"}
     */    

    function del(pair) {
        var front = pair[0],
            back = pair[1],
            back0 = back.charAt(0),
            previous = front.length > 0 ? front.slice(-1) : '<'; 
        return makeOneResult( front + back.substring(1), previous  + back0 , previous);      
    }


    /**
     * @param {Array<string>} pair
     * @returns {Array}
     * 
     * Example: splits=[ ["", "for"], ["f", "or"], ["fo", "r"], ["for", ""] ]
     * Returns: Set(["ofr", "fro"])
     * 
     * Example: splits= [ ["", "foo"], ["f", "oo"], ["fo", "o"], ["foo", ""] ]
     * Returns: Set(["ofo", "foo"])
     * 
     * Programming assignment: prevent this function from including the word
     * that generated the splits by adding and if statement to the inner for loop
     * to prevent transposing two characters if they are the same
     */ 

    function transpose(pair) {
        var back = pair[1],
            ch0 = back.charAt(0),
            ch1 = back.charAt(1);
        return makeOneResult( pair[0] + ch1 + ch0 + back.substring(2), 
                         ch0 + ch1 , ch1 + ch0);
    }


    /**
     * @param {Array<string>} pair
     * @returns {Array}
     * 

     * 
     * Programming assignment: prevent this function from including the word
     * that generated the splits by adding and if statement to the inner for loop
     * to prevent re-inserting the deleted character (may require calling filter on result)
     */ 

    function replace(pair) {
        var front = pair[0],
            back = pair[1],
            ch = back.charAt(0);
        return alphabet.map(
            alpha => makeOneResult(front + alpha + back.substring(1), ch , alpha)
         );
      }    


    /**
     * @param {Array<string>>} pair
     * @returns {Array} 
     */ 

    function insert(pair) {
        var front = pair[0],
            back = pair[1],
            previous = front.length>0 ? front.slice(-1) : '<';
        return alphabet.map(alpha => makeOneResult(front + alpha + back,
                 previous , previous + alpha));
    }


    var s = fun.intRangeMap (0, word.length+1,
        (i) => [word.substring(0, i), word.substring(i)]);
    var u = [].concat(
                    s.slice(0, -1).map(del),
                    s.slice(0, -2).map(transpose),
                    fun.flatten1( s.slice(0, -1).map(replace) ),
                    fun.flatten1( s.slice(0, s.length).map(insert) )
               );
    return u;
}

module.exports = {
    "edits1": edits1
};


// correct result of invoking edit1("a")
/*
const aTest = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ba',
        'ca', 'da', 'ea', 'fa', 'ga', 'ha', 'ia', 'ja', 'ka', 'la', 'ma', 'na', 'oa',
        'pa', 'qa', 'ra', 'sa', 'ta', 'ua', 'va', 'wa', 'xa', 'ya', 'za', 'aa', 'ab',
        'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao',
        'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az'];
*/        
        
// correct result of invoking edit1("law")
/*
 const lawTest = ['aw', 'lw', 'la', 'alw', 'lwa', 'aaw', 'baw', 'caw', 'daw',
        'eaw', 'faw', 'gaw', 'haw', 'iaw', 'jaw', 'kaw', 'law', 'maw', 'naw', 'oaw',
        'paw', 'qaw', 'raw', 'saw', 'taw', 'uaw', 'vaw', 'waw', 'xaw', 'yaw', 'zaw',
        'law', 'lbw', 'lcw', 'ldw', 'lew', 'lfw', 'lgw', 'lhw', 'liw', 'ljw', 'lkw',
        'llw', 'lmw', 'lnw', 'low', 'lpw', 'lqw', 'lrw', 'lsw', 'ltw', 'luw', 'lvw',
        'lww', 'lxw', 'lyw', 'lzw', 'laa', 'lab', 'lac', 'lad', 'lae', 'laf', 'lag',
        'lah', 'lai', 'laj', 'lak', 'lal', 'lam', 'lan', 'lao', 'lap', 'laq', 'lar',
        'las', 'lat', 'lau', 'lav', 'law', 'lax', 'lay', 'laz', 'alaw', 'blaw', 'claw',
        'dlaw', 'elaw', 'flaw', 'glaw', 'hlaw', 'ilaw', 'jlaw', 'klaw', 'llaw', 'mlaw',
        'nlaw', 'olaw', 'plaw', 'qlaw', 'rlaw', 'slaw', 'tlaw', 'ulaw', 'vlaw', 'wlaw',
        'xlaw', 'ylaw', 'zlaw', 'laaw', 'lbaw', 'lcaw', 'ldaw', 'leaw', 'lfaw', 'lgaw',
        'lhaw', 'liaw', 'ljaw', 'lkaw', 'llaw', 'lmaw', 'lnaw', 'loaw', 'lpaw', 'lqaw',
        'lraw', 'lsaw', 'ltaw', 'luaw', 'lvaw', 'lwaw', 'lxaw', 'lyaw', 'lzaw', 'laaw',
        'labw', 'lacw', 'ladw', 'laew', 'lafw', 'lagw', 'lahw', 'laiw', 'lajw', 'lakw',
        'lalw', 'lamw', 'lanw', 'laow', 'lapw', 'laqw', 'larw', 'lasw', 'latw', 'lauw',
        'lavw', 'laww', 'laxw', 'layw', 'lazw', 'lawa', 'lawb', 'lawc', 'lawd', 'lawe',
        'lawf', 'lawg', 'lawh', 'lawi', 'lawj', 'lawk', 'lawl', 'lawm', 'lawn', 'lawo',
        'lawp', 'lawq', 'lawr', 'laws', 'lawt', 'lawu', 'lawv', 'laww', 'lawx', 'lawy',
        'lawz']
*/