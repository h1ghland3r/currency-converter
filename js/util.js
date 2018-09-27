// Validator

let input = document.getElementById('inputAmount');
let value = document.getElementById('inputAmount').value;
let submit = input.addEventListener('click', validateInput(value));

function validateInput(value) {
    if (input == null) {
        alert ('null');
        return false;
    }
}

let invalidClass = 'invalid'
let inputs = document.querySelectorAll('input, select');

inputs.forEach(function (input) {
  input.addEventListener('invalid', function () {
    input.classList.add(invalidClass)
  })

  input.addEventListener('input', function () {
    if (input.validity.valid) {
      input.classList.remove(invalidClass)
    }
  })
})