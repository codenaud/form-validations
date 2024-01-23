"use strict";
var User = /** @class */ (function () {
    function User(name, lastname) {
        this.countrys = new Array();
        this.name = name;
        this.lastname = lastname;
    }
    User.prototype.addCountry = function (country) {
        this.countrys.push(country);
    };
    return User;
}());
