require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
let googleDoc=require('./gdocs.js');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});
client.login(process.env.DISCORD_TOKEN);

googleDoc.authenticate()
.then(text => {
    googleDoc.readSignups();
})


module.exports=client;