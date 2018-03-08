
var Player = function (data) {
    this.data = this.sanitize(data);
};

Player.prototype.data = {};

//Sets the CharName property
Player.prototype.changeCharName = function (name) {
    this.data.Charname = name;
};

Player.prototype.getCharName = function (name) {
    return this.data[name];
};

Player.prototype.setCharName = function (name, value) {
    this.data[name] = value;
};

//Sets the fameName
Player.prototype.changeFamName = function (name) {
    this.data.Famname = name;
};

Player.prototype.getFamName = function (name) {
    return this.data[name];
};

Player.prototype.setFamName = function (name, value) {
    this.data[name] = value;
};

//Sets The SingupDay
Player.prototype.changeSingup = function (date) {
    this.data.Singup = date;
};

Player.prototype.getSignup = function (date) {
    return this.data[date];
};

Player.prototype.setSingup = function (date, value) {
    this.data[date] = value;
};

module.exports = new Player;
