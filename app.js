#!/usr/bin/env node
require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
var idAnouncement = process.env.ID_ANOUNCMENT; //testchannel;
const googleDoc = require('./gdocs');
const log = require('./log');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);;
    client.user.setActivity(process.env.ACTIVITY);
    client.channels.get(idAnouncement).fetchMessages({limit : process.env.LIMIT});
});

client.on('message', msg => {

    if (msg.channel.id === idAnouncement) {

        if( (msg.content.indexOf('Nodewar')>-1 || msg.content.indexOf('Event')>-1) && client.user.id === msg.author.id || msg.content.toLowerCase().indexOf('nodewarsignup')>-1) {

            if(client.user.id === msg.author.id)msg.react('✅').then(text=>{msg.react('❎').then(text=>{msg.react('❓')})});

            console.log('a new notewar anouncement got detected, emojis added.');
            if(client.user.id !== msg.author.id){
                var d = new Date();

                d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
                msg.channel.send(" 1. Nodewar ("+ d.toDateString()+")");

                d.setDate(d.getDate() + (3 + 7 - d.getDay()) % 7);
                msg.channel.send(" 2. Nodewar ("+ d.toDateString()+")");

                d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
                msg.channel.send(" 3. Nodewar ("+ d.toDateString()+")" );

                d.setDate(d.getDate() + (7 - d.getDay()) % 7);
                msg.channel.send(" Event ("+ d.toDateString()+")");
            }
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

    if(msg.content === ".payout") {
        googleDoc.authenticate().then(text => {googleDoc.tiers(msg.author, Discord, msg.guild.iconURL)});
    }

    if(msg.content.indexOf('.addChar')>-1) {
        console.log(log.getPlayer(msg));
        log.writeJSON(process.env.PATH_JSON_PLAYERS,log.getPlayer(msg))
    }

    if(msg.content.indexOf('.reload')>-1 && msg.message.guild.member(msg.author.id).permissions.FLAGS.ADMINISTRATOR){
        Dotenv.overload(".env")
    }
});

client.on('messageReactionAdd',  (reaction, user) => {
    if(reaction.message.channel.id === idAnouncement && client.user.id !== user.id && reaction.message.author.id === client.user.id)
{
    var player = log.getPlayer(reaction.message, user);

    if (player) {
        if (reaction.message.content === "Event") {
            date = 'event'
        }
        else {
            var date = reaction.message.content.split('(')[1].split(')')[0];
            date = date.split(')')[0];
        }
        var msg = reaction.message;
        console.log(player.getFamName()); // FamilyName with condition <Family name | Charname>
        if (reaction.emoji.name === '✅') {
            console.log("Signup with yes");
            player.setSingup(date, 'yes');
            googleDoc.authenticate().then(text => {googleDoc.Signup(player.getFamName(), "Yes", msg.content)
        });

        }
        else if (reaction.emoji.name === '❎') {
            console.log("Signup with no");
            player.setSingup(date, 'no');
            googleDoc.authenticate().then(text => {googleDoc.Signup(player.getFamName(), "No", msg.content)
        });

        }
        else if (reaction.emoji.name === '❓') {
            console.log("Signup with maybe");
            player.setSingup(date, 'maybe');
            googleDoc.authenticate().then(text => {googleDoc.Signup(player.getFamName(), "Maybe", msg.content)
        });
        }
        log.writeJSON(process.env.PATH_JSON_PLAYERS, player);

        console.log(reaction.emoji.name.toString());
    }
}
});
client.login(process.env.DISCORD_TOKEN);

module.exports=client;
