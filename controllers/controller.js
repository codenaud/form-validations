"use strict";
var user;
var errors = 0;
// Regex validación formularios
var validateExpressions = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ\s'-]+$/,
    lastname: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ\s'-]+$/,
    country: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ\s'-]+$/,
    visit: /^[0-9]+$/,
};
// validación formularios
function validateInput(element, expression) {
    // Comprueba si el valor del campo está vacío o no cumple con la expresión regular
    if (element.value === '' || !expression.test(element.value)) {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        errors++;
    }
    else {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }
}
function submitUser() {
    errors = 0;
    var nameInput = document.getElementById('nameInput');
    var lastnameInput = document.getElementById('lastnameInput');
    validateInput(nameInput, validateExpressions.name);
    validateInput(lastnameInput, validateExpressions.lastname);
    if (errors === 0) {
        user = new User(nameInput.value, lastnameInput.value);
        showUser();
        showCountryForm();
    }
}
function showUser() {
    var userTitle = document.getElementById('userTitle');
    var nameOutput = document.getElementById('nameOutput');
    var lastnameOutput = document.getElementById('lastnameOutput');
    userTitle.innerText = 'User:';
    nameOutput.innerText = 'Name: ' + user.name;
    lastnameOutput.innerText = 'lastname: ' + user.lastname;
    console.log(user);
}
var currentCountryIndex = 1;
function submitCountryForm() {
    errors = 0;
    var countryInput = document.getElementById('countryInput' + currentCountryIndex);
    var visitInput = document.getElementById('visitInput' + currentCountryIndex);
    validateInput(countryInput, validateExpressions.country);
    validateInput(visitInput, validateExpressions.visit);
    if (errors === 0) {
        var country_generica = new Country(Number(visitInput.value), countryInput.value);
        user.addCountry(country_generica);
        showCountrys();
        currentCountryIndex++;
        if (currentCountryIndex <= 4) {
            showNextCountryForm(currentCountryIndex);
        }
        else {
            showResult();
        }
    }
}
function showNextCountryForm(index) {
    var formToDisplay = document.getElementById("country-form-".concat(index));
    if (formToDisplay) {
        formToDisplay.classList.remove('d-none');
    }
}
function showCountrys() {
    var countryTitle = document.getElementById('countryTitle');
    var countryOutput1 = document.getElementById('countryOutput1');
    var countryOutput2 = document.getElementById('countryOutput2');
    var countryOutput3 = document.getElementById('countryOutput3');
    var countryOutput4 = document.getElementById('countryOutput4');
    countryTitle.innerHTML = 'Country:';
    if (user.countrys.length > 0) {
        countryOutput1.innerHTML =
            '<b>Country 1:</b><br>  ' +
                'Country: ' +
                user.countrys[0].country +
                '  <br>Visited Times: ' +
                user.countrys[0].visit;
    }
    if (user.countrys.length > 1) {
        countryOutput2.innerHTML =
            '<b>Country 2:</b><br>  ' +
                'Country: ' +
                user.countrys[1].country +
                '  <br>Visited Times: ' +
                user.countrys[1].visit;
    }
    if (user.countrys.length > 2) {
        countryOutput3.innerHTML =
            '<b>Country 3:</b><br>  ' +
                'Country: ' +
                user.countrys[2].country +
                '  <br>Visited Times: ' +
                user.countrys[2].visit;
    }
    if (user.countrys.length > 3) {
        countryOutput4.innerHTML =
            '<b>Country 4:</b><br>  ' +
                'Country: ' +
                user.countrys[3].country +
                '  <br>Visited Times: ' +
                user.countrys[3].visit;
    }
    for (var i = 0; i < user.countrys.length; i++) {
        var visitsText = user.countrys[i].visit === 1 ? 'time' : 'times';
        var countryOutput = document.getElementById("countryOutput".concat(i + 1));
        countryOutput.innerHTML =
            "<b>Country ".concat(i + 1, ":</b><br>  ") +
                'Country: ' +
                user.countrys[i].country +
                '  <br>Visited Times: ' +
                user.countrys[i].visit +
                " ".concat(visitsText);
    }
}
function showCountryForm() {
    var userForm = document.getElementById('create-user-form');
    var userCountry = document.getElementById('create-country-form');
    userForm.style.display = 'none';
    userCountry.style.display = 'block';
}
function showTotalVisits() {
    return user.countrys[0].visit + user.countrys[1].visit + user.countrys[2].visit + user.countrys[3].visit;
}
function showResult() {
    var finalResult = document.getElementById('finalResult');
    var result = document.getElementById('result');
    var resultContent = "\n  <div style=\"border-bottom:1px solid #ced4da\">\n    <h2>The user <b>".concat(user.name, " ").concat(user.lastname, "</b> has traveled to:</h2><br>  \n  </div>\n  <div style=\"padding: 1.5rem 0; border-bottom:1px solid #ced4da\">");
    for (var i = 0; i < user.countrys.length; i++) {
        var visitsText = user.countrys[i].visit === 1 ? 'time' : 'times';
        resultContent += "<b>".concat(user.countrys[i].country, "</b>: ").concat(user.countrys[i].visit, " ").concat(visitsText, "<br>");
    }
    var totalVisits = showTotalVisits();
    var totalVisitsText = totalVisits === 1 ? 'trip' : 'trips';
    resultContent += "</div>\n  <div style=\"padding-top:1.5rem;\">\n    In total he has made ".concat(totalVisits, " ").concat(totalVisitsText, ".\n  </div>");
    result.innerHTML = resultContent;
    finalResult.style.display = 'block';
}
