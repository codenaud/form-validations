class User {
  name: string;
  lastname: string;
  countrys: Country[] = new Array();

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }

  addCountry(country: Country): void {
    this.countrys.push(country);
  }
}
