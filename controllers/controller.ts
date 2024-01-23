let user: User;

let errors: number = 0;

// Regex validación formularios
const validateExpressions = {
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
  lastname: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
  country: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
  visit: /^[0-9]+$/,
};

// validación formularios
function validateInput(element: HTMLInputElement, expression: RegExp) {
  // Comprueba si el valor del campo está vacío o no cumple con la expresión regular
  if (element.value === '' || !expression.test(element.value)) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
    errors++;
  } else {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
  }
}

function submitUser() {
  errors = 0;
  let nameInput = <HTMLInputElement>document.getElementById('nameInput');
  let lastnameInput = <HTMLInputElement>document.getElementById('lastnameInput');

  validateInput(nameInput, validateExpressions.name);
  validateInput(lastnameInput, validateExpressions.lastname);

  if (errors === 0) {
    user = new User(nameInput.value, lastnameInput.value);
    showUser();
    showCountryForm();
  }
}

function showUser() {
  let userTitle = <HTMLInputElement>document.getElementById('userTitle');
  let nameOutput = <HTMLInputElement>document.getElementById('nameOutput');
  let lastnameOutput = <HTMLInputElement>document.getElementById('lastnameOutput');

  userTitle.innerText = 'User:';
  nameOutput.innerText = 'Name: ' + user.name;
  lastnameOutput.innerText = 'lastname: ' + user.lastname;
  console.log(user);
}

let currentCountryIndex = 1;

function submitCountryForm() {
  errors = 0;
  let countryInput = <HTMLInputElement>document.getElementById('countryInput' + currentCountryIndex);
  let visitInput = <HTMLInputElement>document.getElementById('visitInput' + currentCountryIndex);

  validateInput(countryInput, validateExpressions.country);
  validateInput(visitInput, validateExpressions.visit);

  if (errors === 0) {
    let country_generica = new Country(Number(visitInput.value), countryInput.value);
    user.addCountry(country_generica);
    showCountrys();

    currentCountryIndex++;
    if (currentCountryIndex <= 4) {
      showNextCountryForm(currentCountryIndex);
    } else {
      showResult();
    }
  }
}

function showNextCountryForm(index: number) {
  const formToDisplay = document.getElementById(`country-form-${index}`);
  if (formToDisplay) {
    formToDisplay.classList.remove('d-none');
  }
}
function showCountrys() {
  let countryTitle = <HTMLInputElement>document.getElementById('countryTitle');
  let countryOutput1 = <HTMLInputElement>document.getElementById('countryOutput1');
  let countryOutput2 = <HTMLInputElement>document.getElementById('countryOutput2');
  let countryOutput3 = <HTMLInputElement>document.getElementById('countryOutput3');
  let countryOutput4 = <HTMLInputElement>document.getElementById('countryOutput4');

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

  for (let i = 0; i < user.countrys.length; i++) {
    let visitsText = user.countrys[i].visit === 1 ? 'time' : 'times';
    let countryOutput = <HTMLInputElement>document.getElementById(`countryOutput${i + 1}`);
    countryOutput.innerHTML =
      `<b>Country ${i + 1}:</b><br>  ` +
      'Country: ' +
      user.countrys[i].country +
      '  <br>Visited Times: ' +
      user.countrys[i].visit +
      ` ${visitsText}`;
  }
}

function showCountryForm() {
  let userForm = <HTMLInputElement>document.getElementById('create-user-form');
  let userCountry = <HTMLInputElement>document.getElementById('create-country-form');
  userForm.style.display = 'none';
  userCountry.style.display = 'block';
}

function showTotalVisits() {
  return user.countrys[0].visit + user.countrys[1].visit + user.countrys[2].visit + user.countrys[3].visit;
}

function showResult() {
  let finalResult = <HTMLInputElement>document.getElementById('finalResult');
  let result = <HTMLInputElement>document.getElementById('result');

  let resultContent = `
  <div style="border-bottom:1px solid #ced4da">
    <h2>The user <b>${user.name} ${user.lastname}</b> has traveled to:</h2><br>  
  </div>
  <div style="padding: 1.5rem 0; border-bottom:1px solid #ced4da">`;

  for (let i = 0; i < user.countrys.length; i++) {
    let visitsText = user.countrys[i].visit === 1 ? 'time' : 'times';
    resultContent += `<b>${user.countrys[i].country}</b>: ${user.countrys[i].visit} ${visitsText}<br>`;
  }

  let totalVisits = showTotalVisits();
  let totalVisitsText = totalVisits === 1 ? 'trip' : 'trips';

  resultContent += `</div>
  <div style="padding-top:1.5rem;">
    In total he has made ${totalVisits} ${totalVisitsText}.
  </div>`;

  result.innerHTML = resultContent;
  finalResult.style.display = 'block';
}
