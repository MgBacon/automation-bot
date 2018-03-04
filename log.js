var fs = require('fs');
require('dotenv').config();
var channels;
var players;

class logJSON {

    constructor() {

        //Checks if channel Json
        if (fs.existsSync(process.env.PATH_JSON_CHANNELS)) {
            fs.readFile(process.env.PATH_JSON_CHANNELS, 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    channels = JSON.parse(data); //now it an object
                }});
        }
        else{
            fs.writeFile(process.env.PATH_JSON_CHANNELS, json, 'utf8', callback);
        }
        //Checks if player Json exists
        if (fs.existsSync(process.env.PATH_JSON_PLAYERS)) {
            fs.readFile(process.env.PATH_JSON_PLAYERS, 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    players = JSON.parse(data); //now it an object
                }});
        }
        else{
            fs.writeFile(process.env.PATH_JSON_CHANNELS, json, 'utf8', callback);
        }
    }
    
}