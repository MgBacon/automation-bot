require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const DB = require("./Database");
var idAnouncement = "365209686703603715" //testchannel;
const googleDoc = require('./gdocs');
const log = require('./log');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    log.constructor;
    client.user.setActivity(process.env.ACTIVITY);
});

//client.on('message', msg => { reply(msg)});

client.on('message', msg => {

    if (msg.channel.id === idAnouncement) {

        if( (msg.content.indexOf('Nodewar')>-1 || msg.content.indexOf('Event')>-1) && client.user.id === msg.author.id || msg.content.toLowerCase().indexOf('nodewarsignup')>-1) {

            if(client.user.id === msg.author.id){
            msg.react('✅').then(text=>{msg.react('❎').then(text=>{msg.react('❓')})});

            }

            console.log('a new notewar anouncement got detected, emojis added.');
            if(client.user.id !== msg.author.id){
            msg.channel.send(" 1. Nodewar (Monday)");
            msg.channel.send(" 2. Nodewar (Wednesday)");
            msg.channel.send(" 3. Nodewar (Friday)" );
            msg.channel.send(" Event");}
        }
    }
    else {
        if (msg.content === '.setAnouncement') {
            msg.reply("This channel is now the anouncement channel!");
            idAnouncement = msg.channel.id;
        }
    }

    if(msg.content.indexOf('.comment')>-1){
        var member = msg.guild.member(msg.author);
        var nickname = member.nickname;
        if(nickname===null){
            msg.author.sendMessage("Please set a Nickname first!");
            //reaction.message.channel.send("Please set a Nickname first!");
            return;
        }
        if(nickname.split('|').length === 2){
            var FamilyName = nickname.split('|')[0].trim();
            var comment = msg.content.replace(".comment","").trim();
            googleDoc.authenticate().then(text =>{googleDoc.Signup(FamilyName,comment,comment)})
        }
    }

    if(msg.content.indexOf('.addChar')>-1) {
        console.log(log.getPlayer(msg.author.id));
    }
});

client.on('messageReactionAdd',  (reaction, user) => {
    if(reaction.message.channel.id === idAnouncement && client.user.id !== user.id && reaction.message.author.id === client.user.id){
        var msg = reaction.message;
        var member = reaction.message.guild.member(user);
        var nickname = member.nickname;
        if(nickname===null){
            user.sendMessage("Please set a Nickname first!");
            return;
        }
        if(nickname.split('|').length === 2){
            var FamilyName = nickname.split('|')[0].trim();
            console.log(FamilyName); // FamilyName with condition "Charname | Family name"
            if(reaction.emoji.name ==='✅'){
                console.log("Signup with yes");
                googleDoc.authenticate().then(text =>{googleDoc.Signup(FamilyName,"Yes",msg.content)})
            }
            else if(reaction.emoji.name === '❎'){
                console.log("Signup with no");
                googleDoc.authenticate().then(text =>{googleDoc.Signup(FamilyName,"No",msg.content)})
            }
            else if(reaction.emoji.name === '❓'){
                console.log("Signup with no");
                googleDoc.authenticate().then(text =>{googleDoc.Signup(FamilyName,"Maybe",msg.content)})
            }
            console.log(reaction.emoji.name.toString())
        }
        else{
            user.send("Nickname not in the right format!");
        }
}

});
client.login(process.env.DISCORD_TOKEN);

module.exports=client;
