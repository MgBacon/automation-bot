var fs = require('fs');
require('dotenv').config();
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
                else players = JSON.parse(data); //now it an object
            }
        });
    }

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
}

module.exports = new logJSON();

