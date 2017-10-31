require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const DB = require("./Database");
var idAnouncment = '';
const googleDoc=require('./gdocs')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setGame("Life is a pain!");
});

client.on('message', msg => { reply(msg)});

client.on('message', msg => {

    if (msg.channel.id === idAnouncment) {

        if( msg.content.indexOf('Nodewar') && /((0[1-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1]))|((0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))((0[1/9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))/.test(msg.content) && msg.content.indexOf('Please sign up') && client.user.id !== msg.author.id) {

            msg.react('✅');
            msg.react('❓');
            msg.react('❎');

            console.log('a new notewar anouncement got detected, emojis added.');
        }
    }
    else {
        if (msg.content === '.setAnouncement') {
            msg.reply("This channel is now the anouncement channel!");
            idAnouncment = msg.channel.id;
        }
    }
});

client.on('messageReactionAdd',  (reaction, user) => {

    if(user.lastMessage.channel.id === idAnouncment && client.user.id !== user.id){

        reaction.message.channel.send(user.username+" just reacted: "+reaction.emoji.name);
}

});
client.login(process.env.DISCORD_TOKEN);

googleDoc.authenticate()
.then(text => {
    googleDoc.readSignups();
})

async function reply(msg){
    if(msg.content === '.role'){
        let role = msg.guild.roles.find("name", "Member");
        const ismember = msg.member.roles.has(role.id);
        msg.reply(ismember);
    }
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    if(msg.content === '.addme') {
        var reply = await DB.add_user(msg)
        msg.reply(reply);
    }
    if(msg.content.indexOf('addap') >-1){
        const reply = await DB.addap(msg);
        msg.reply(reply);
    }
    if(msg.content.indexOf('adddp') >-1){
        const reply = await DB.adddp(msg);
        msg.reply(reply);
    }
    if(msg.content.indexOf('addchar') >-1){
        const reply = await DB.addchar(msg);
        msg.reply(reply);
    }
}

module.exports=client;