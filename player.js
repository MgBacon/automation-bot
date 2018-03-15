var _ = require("lodash");
var schemas = require("./Player/schemas.js");
var data = {};

class Player {

    constructor(data) {
        data = this.sanitize(data);
    }

//Sets DiscordID property
    getDiscordID() {
        return data.DiscordID;
    };

    setDiscordID(value) {
        this.DiscordID = value;
    };

//Sets the CharName property
    getCharName() {
        return data.Charname;
    };

    setCharName(value) {
        data.Charname = value;
    };

//Sets the fameName
    getFamName() {
        return data.Famname;
    };

    setFamName(value) {
        data.Famname = value;
    };

//Sets The SingupDay
    getSignup(date) {
        return data.date[date];
    };

    setSingup(date, value) {
        this.data.date[date] = value;
    };

    sanitize(data) {
        var schema = module.exports.schema;
        data = data || {};
        schema = schemas.player;
        return _.pick(_.defaults(data, schema), _.keys(schema));
    }
}
module.exports = new Player();
