require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();

var idAnouncment = '';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setGame("Life is a pain!");
});

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

module.exports=client;