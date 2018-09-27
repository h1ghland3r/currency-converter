// Fixer.io settings
let endpoint = 'latest';
let baseCurrency = 'EUR';
let currencies = 'EUR,USD,JPY';
const key = ''; // Sign up free in Fixer.io and add you key for testing
const url = 'http://data.fixer.io/api/' + endpoint + '?access_key=' + key + '&base=' + baseCurrency + '&symbols=' + currencies;

//  Get Elements
let selectBaseElement = document.getElementById('selectBaseCurrency');
let selectTargetElement = document.getElementById('selectTargetCurrency');
let btnSubmit = document.getElementById('btnSubmit');

// Define booleans
let isBaseSelectedChanged = false;
let isTargetSelectedChanged = false;

// Define base and target currency
let selectedBase = selectBaseElement.options[selectBaseElement.selectedIndex ].value;
let selectedTarget = selectTargetElement.options[selectTargetElement.selectedIndex ].value;
let base = selectedBase;
let target = selectedTarget;

// Add event listeners
let btnSubmitOnClick = btnSubmit.addEventListener('click', convertCurrencyAmount);
let selectBaseCurrency = selectBaseElement.addEventListener('change', setBaseCurrencyOnChange);
let selectTargetCurrency = selectTargetElement.addEventListener('change', setTargetCurrencyOnChange);

// Handle currency updates on the select box
function getSelectedCurrencyValue() {
    return event.srcElement.value;
}

function setBaseCurrencyOnChange() {
    isBaseSelectedChanged = true;
    base = getSelectedCurrencyValue();
    return base;
}

function setTargetCurrencyOnChange() {
    isTargetSelectedChanged = true;
    target = getSelectedCurrencyValue();
    return target;
}

// Validation and currency converter
function convertCurrencyAmount(){
    let input = document.getElementById('inputAmount');
    let output = document.getElementById('outputConvertedResult');
    let error = document.getElementById('noOutput');
    let invalidClass = 'invalid';
    output.innerHTML = '';

    if (input.value == "") {
        error.style.display = 'block';
        input.classList.add(invalidClass);
    } else {
        error.style.display = 'none';
        input.classList.remove(invalidClass);
        axios.get(url)
        .then(function (response) {
            output.innerHTML = getCurrencyData(response);
        })
        .catch(function (error) {
            output.innerHTML = errorCurrencyData(error);
        });
    }

}

function getCurrencyData(response) {
    let rates = response.data.rates;
    let rateEUR = rates.EUR;
    let rateUSD = rates.USD;
    let rateJPY = rates.JPY;
    let amount = document.getElementById('inputAmount').value;
    let result = '';

    // EUR conversions
    if (base ==='EUR' && target === 'EUR') {
        result = parseFloat(amount);
    }

    if (base ==='EUR' && target === 'USD') {
        result = amount * rateUSD;
    }

    if (base ==='EUR' && target === 'JPY') {
        result = amount * rateJPY;
    }

    // USD conversions
    if (base ==='USD' && target === 'USD') {
        result = parseFloat(amount);
    }

    if (base ==='USD' && target === 'EUR') {
        result = amount * rateEUR/rateUSD;
    }

    if (base ==='USD' && target === 'JPY') {
        let eurToJpy = amount * rateJPY;
        let jpyToUsd = rateEUR/rateUSD;
        result = eurToJpy * jpyToUsd; 
    }

    // JPY conversions
    if (base ==='JPY' && target === 'JPY') {
        result = parseFloat(amount);
    }

    if (base ==='JPY' && target === 'EUR') {
        result = amount * rateEUR/rateJPY;
    }

    if (base ==='JPY' && target === 'USD') {
        let jpyToEur = amount * rateEUR/rateJPY;
        result = jpyToEur * rateUSD; 
    }

    return  '<div class="result--converted center">' + target + ' ' + result.toFixed(2) + '</div>';
}

function errorCurrencyData(error) {
    return  '<div class="result--converted center">' + error.response + '</div>';
}