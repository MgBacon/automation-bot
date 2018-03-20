require('dotenv').config();
var _ = require("lodash");
var schemas = require("./schemas");


var Player = function (data) {
    this.data = this.sanitize(data);
};

Player.prototype.data = {};

//Sets the ID property

Player.prototype.getID = function () {
    return this.data.ID;
};

Player.prototype.setID = function (value) {
    this.data.ID = value;
};

//Sets the CharName property

Player.prototype.getCharName = function () {
    return this.data.Charname;
};

Player.prototype.setCharName = function (value) {
    this.data.Charname = value;
};

//Sets the fameName
Player.prototype.getFamName = function () {
    return this.data.Famname;
};

Player.prototype.setFamName = function (value) {
    this.data.Famname = value;
};

//Sets The SingupDay
Player.prototype.getSignup = function (date) {
    return this.data[date];
};

Player.prototype.setSingup = function (date, value) {
    this.data[date] = value;
};

Player.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.player;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = new Player;