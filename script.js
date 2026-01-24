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

    const typeCount = Number(lower) + Number(upper) + Number(number) + Number(symbol);

    if (typeCount === 0) {
        return "";
    }

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );

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

i18next.init({
  lng: "pt",
  fallbackLng: "pt",
  resources: {
    pt: {
      translation: {
        title: "Gerador de Senhas",
        length: "Tamanho da senha",
        upper: "Incluir maiúsculas",
        lower: "Incluir minúsculas",
        number: "Incluir números",
        symbol: "Incluir símbolos",
        generate: "Gerar Senha",
        copied: "Senha copiada!"
      }
    },
    en: {
      translation: {
        title: "Password Generator",
        length: "Password Length",
        upper: "Include uppercase",
        lower: "Include lowercase",
        number: "Include numbers",
        symbol: "Include symbols",
        generate: "Generate Password",
        copied: "Password copied!"
      }
    }
  }
});


function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = i18next.t(key);
  });
}

updateContent();

document.getElementById("langPT").addEventListener("click", () => {
  i18next.changeLanguage("pt");
  updateContent();
});

document.getElementById("langEN").addEventListener("click", () => {
  i18next.changeLanguage("en");
  updateContent();
});