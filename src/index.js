const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
    '**********': ' ',
};

function decode(expr) {
    let exprArr = expr.toString().split('');
    let result = '';
    let morseCode = '';
    let encodedDotDas = '';
    let step = 1;
    let decimalCode = [];

    function convertDecimalCode(arr) {
        for (let i = 0; i < arr.length; i += step) {
            if (arr[i] === '1') {
                step = 2;
            }
            encodedDotDas = `${arr[i]}${arr[i + 1]}`
            if(encodedDotDas === '10') {
                morseCode += `.`;
            } else if (encodedDotDas === '11') {
                morseCode += `-`;
            }
        }
    }

    function getLetter() {
        for (let code in MORSE_TABLE) {
            if (code === morseCode) {
                result += `${MORSE_TABLE[code]}`
            }
        }
    }

    for (let i = 0; i < exprArr.length; i++) {
        decimalCode.push(exprArr[i]);

        if (decimalCode.length === 10) {
            step = 1;
            if (decimalCode.indexOf('*') !== -1) {
                result += ` `;
                decimalCode = [];
            } else {
                convertDecimalCode(decimalCode);
                getLetter();
                decimalCode = [];
                morseCode = '';
            }
        }
    }
    
    return result;
}

module.exports = {
    decode
}