require('dotenv').config();
let fs = require('fs');
let readline = require('readline');
let googleAuth = require('google-auth-library');
var google = require('googleapis');

let SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //you can add more scopes according to your permission need. But in case you chang the scope, make sure you deleted the ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json file
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'; //the directory where we're going to save the token
const TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json'; //the file which will contain the token

var sheeetId;
var autheenthication;

class Authentication {
  constructor() {
        this.sheetId=process.env.SHEET_ID;
        sheeetId = this.sheetId;
        this.authenthication;
        autheenthication = this.authenthication;
  }
  authenticate(){
    return new Promise((resolve, reject)=>{
      let credentials = this.getClientSecret();
      let authorizePromise = this.authorize(credentials);
      authorizePromise.then(resolve, reject);
    });
  }
  getClientSecret(){
    return require('./client_secret.json');
  }
  authorize(credentials) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    return new Promise((resolve, reject)=>{
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          this.getNewToken(oauth2Client).then((oauth2ClientNew)=>{
            resolve(oauth2ClientNew);
          }, (err)=>{
            reject(err);
          });
        } else {
          oauth2Client.credentials = JSON.parse(token);
          this.authenthication=oauth2Client;
          autheenthication=oauth2Client;
          resolve(oauth2Client);
        }
      });
    });
  }
  getNewToken(oauth2Client, callback) {
    return new Promise((resolve, reject)=>{
      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      console.log('Authorize this app by visiting this url: \n ', authUrl);
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('\n\nEnter the code from that page here: ', (code) => {
        rl.close();
        oauth2Client.getToken(code, (err, token) => {
          if (err) {
            console.log('Error while trying to retrieve access token', err);
            reject();
          }
          oauth2Client.credentials = token;
          this.storeToken(token);
          resolve(oauth2Client);
        });
      });
    });
  }
  storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  }
  /**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
  /**listMajors() {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: this.authenthication,
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var rows = response.values;
      if (rows.length == 0) {
        console.log('No data found.');
      } else {
        console.log('Name, Major:');
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          console.log('%s, %s', row[0], row[4]);
        }
      }
    });
  }*/

  async Signup(FamilyName,value){
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
          auth: autheenthication,
          spreadsheetId: sheeetId,
          range: 'Sheet1!A1:A100',
      }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var Matrix = response.values;
        if (Matrix.length === 0) {
            console.log('No data found.');
        }
        else{
            var NameExists = false
            var rownumber = 0;
            for (var i = 0; i < Matrix.length; i++) {
                var row = Matrix[i];
                if(row[0]===FamilyName){
                    NameExists = true;
                    rownumber = i+1;
                    break;
                }
                console.log('%s', row[0]);
            }
            if(NameExists){
                var sheets = google.sheets('v4');
                sheets.spreadsheets.values.update({
                        auth: autheenthication,
                        spreadsheetId: sheeetId,
                        range: 'Sheet1!B'+rownumber+':D'+rownumber,
                        valueInputOption: "USER_ENTERED",
                        resource: {
                            values: [ [value, value, value] ]
                        }
                    }, function(err, response){
                        if (err) {
                            console.log('The API returned an error: ' + err);
                            return;
                        } else {
                            console.log("Appended");
                        }}
                );
            }
        }
    });
  }

}

module.exports = new Authentication();
