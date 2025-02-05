const resultEl = document.querySelector('.result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('number');
const symbolsEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatePassword = "";

    // Corrigido: soma dos tipos selecionados
    const typeCount = Number(lower) + Number(upper) + Number(number) + Number(symbol);

    // Verifica se pelo menos um tipo foi selecionado
    if (typeCount === 0) {
        return "";
    }

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );

    // Gera a senha
    for (let i = 0; i < length; i++) {
        const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
        const keyFromRandomFunc = Object.keys(randomType)[0];
        generatePassword += randomFunc[keyFromRandomFunc]();
    }

    return generatePassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";

    return symbols[Math.floor(Math.random() * symbols.length)];
}