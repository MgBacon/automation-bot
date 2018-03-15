var fs = require('fs');
require('dotenv').config();
Player = require('./Player/player');
var channels = {};
var players = {};

class logJSON {

    constructor() {
        //Checks if channel Json
        if (fs.existsSync(process.env.PATH_JSON_CHANNELS)) this.readJSON(process.env.PATH_JSON_CHANNELS);
        else this.createJSON(process.env.PATH_JSON_CHANNELS);

        //Checks if player Json exists
        if (fs.existsSync(process.env.PATH_JSON_PLAYERS)) this.readJSON(process.env.PATH_JSON_PLAYERS);
        else this.createJSON(process.env.PATH_JSON_PLAYERS);
    }

    //Builds the player object and adds it to the players array
    playerBuilder(arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var player = new player;
            player.setCharName(arr[i].Charname);
            player.setFamName(arr[i].fam);
            arr[i].forEach(function (dates) {
                player.setSingup(dates.date, date.value);
            });
            players[arr.keys()[i]] = player;
        }
    }

    readJSON(file) {
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                if (file.toLowerCase().indexOf('channel') > -1) channels = JSON.parse(data); //now it an object
                else players = module.exports.playerBuilder(JSON.parse(data)); //now it an object
            }
        });
    }

    //creates json file if not exists. returns a empty json object when finished
    createJSON(file) {
        fs.writeFile(file, JSON.stringify([]), 'utf8', function writeFileCallback(err) {
            if (err) {
                console.log(err);
            } else {
                if (file.toLowerCase().indexOf('channel') > -1) players = JSON.stringify([]); //Creates a empty JSON object
                else channels = JSON.stringify([]); //Creates a empty JSON object
            }
        });
    }

    //writes new json to the file, also reread the new json
    writeJSON(file, data) {
        fs.writeFile(file, JSON.stringify(data), 'utf8', function writeFileCallback(err) {
            if (err) console.log(err);
            else module.exports.readJSON(file);
        });
    }

    //Returns the wanted player object based on ID
    getPlayer(discordid) {
        module.exports.readJSON(process.env.PATH_JSON_CHANNELS);
        if (!players) {
            Player.setFamName('test');
            console.log(Player);
            return new Player();
        }
        else {
            for (var player1 in players) {
                if (player1.getDiscordID === discordID) return player1;
            }
        }
    }
}

module.exports = new logJSON();

