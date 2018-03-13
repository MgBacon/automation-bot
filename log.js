var fs = require('fs');
require('dotenv').config();
const player = require('./Player');
var channels;
var players;

class logJSON {

    constructor() {
        //Checks if channel Json
        if (fs.existsSync(process.env.PATH_JSON_CHANNELS)) this.readJSON(process.env.PATH_JSON_CHANNELS);
        else this.createJSON(process.env.PATH_JSON_CHANNELS);

        //Checks if player Json exists
        if (fs.existsSync(process.env.PATH_JSON_PLAYERS)) this.readJSON(process.env.PATH_JSON_PLAYERS);
        else this.createJSON(process.env.PATH_JSON_PLAYERS);
    }

    readJSON(file) {
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                if (file.toLowerCase().indexOf('channel') > -1) channels = JSON.parse(data); //now it an object
                else players = playerBuilder(JSON.parse(data)); //now it an object
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
            else readJSON(file);
        });
    }

    //Builds the player object and adds it to the players array
    playerBuilder(arr) {
        var player;
        for (var i = 0, len = arr.length; i < len; i++) {
            player = new Player;
            player.setCharName(arr[i].Charname);
            player.setFamName(arr[i].fam);
            arr[i].forEach(function (dates) {
                player.setSingup(dates.date, date.value);
            });
            players[arr.keys()[i]] = player;
        }
    }
}

module.exports = new logJSON();

