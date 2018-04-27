require('dotenv').config();
var _ = require("lodash");
var schemas = require("./schemas");


var channel = function (data) {
    this.data = this.sanitize(data);
};

channel.prototype.data = {};

//Sets the ID property

channel.prototype.getID = function () {
    return this.data.ID;
};

channel.prototype.setID = function (value) {
    this.data.ID = value;
};

//Sets the name property

channel.prototype.getName = function () {
    return this.data.name;
};

channel.prototype.setName = function (value) {
    this.data.name = value;
};

//Sets the type
channel.prototype.getType = function () {
    return this.data.type;
};

channel.prototype.setType = function (value) {
    this.data.type = value;
};

channel.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.player;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = new channel;