var fs = require('fs');
require('dotenv').config();
PlayerClass = require('./Player/player');
var channels = {};
var players = {};

class logJSON {

    constructor() {
        channels = {};
        //Checks if channel Json
        if (fs.existsSync(process.env.PATH_JSON_CHANNELS)) this.readJSON(process.env.PATH_JSON_CHANNELS);
        else this.createJSON(process.env.PATH_JSON_CHANNELS);

        //Checks if player Json exists
        if (fs.existsSync(process.env.PATH_JSON_PLAYERS)) this.readJSON(process.env.PATH_JSON_PLAYERS);
        else this.createJSON(process.env.PATH_JSON_PLAYERS);
    }

    //Builds the player object and adds it to the players array
    playerBuilder(arr) {
        for (var i = 0, len = Object.values(arr).length; i < len; i++) {
            var data = Object.values(arr)[i].data;
            var player = new PlayerClass.constructor;

            player.setID(data.ID.trim());
            player.setCharName(data.Charname.trim());
            player.setFamName(data.Famname.trim());

            Array.prototype.forEach.call(data.date, date => {
                player.setSingup(date.date, date.value);
            });
            players[player.getID()] = player;
        }
    }

    readJSON(file) {
        fs.readFile(file, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                if (file.toLowerCase().indexOf('channel') > -1){
                    if(!data) channels = {};
                    else channels = JSON.parse(data);
                } //now it an object
                else {
                    if(!data) players = {};
                    else players = module.exports.playerBuilder(JSON.parse(data));
                } //now it an object
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
        if (data){
            module.exports.readJSON(file)
            console.log(data);
            var ID = data.getID();
            console.log(players);
            if (data.constructor.name === 'Player') {
                console.log(players);
                players[ID] = data;
                data = players;
                console.log(players);
                console.log('=====');
                console.log(data);
            }
            else{
                channels[ID] = data;
                data = channels;
            }
            fs.writeFile(file, JSON.stringify(data), 'utf8', function writeFileCallback(err) {
                if (err) console.log(err);
                else module.exports.readJSON(file);
            });
        }
        else {console.log('OEPS!')}
    }

    //Returns the wanted player object based on ID
    getPlayer(message) {
        module.exports.readJSON(process.env.PATH_JSON_CHANNELS);
        if (players) {
            if (message.nickname === null){
                var username = message.username;
                var names = username.split("|").trim();
            }
            else{
                var nickname = message.channel.guild.member(message.author.id).nickname;
                var names = nickname.split('|');
            }
            return new PlayerClass.constructor({ID : message.author.id, Charname : names[1], Famname: names[0]});
        }
        else {
            for (var player in players) {
                if (player.getDiscordID === discordID) return player1;
            }
        }
    }
}

module.exports = new logJSON();

