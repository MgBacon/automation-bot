require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const DB = require("./Database");
var idAnouncement = "365209686703603715" //testchannel;
const googleDoc=require('./gdocs')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setActivity("Life is a pain!");
});

client.on('message', msg => { reply(msg)});

client.on('message', msg => {

    if (msg.channel.id === idAnouncement) {

        if( msg.content.indexOf('NodewarSignup')>-1 ) { /**&& client.user.id !== msg.author.id*/

            msg.react('✅');
            /*msg.react('❓');*/
            msg.react('❎');

            console.log('a new notewar anouncement got detected, emojis added.');
        }
    }
    else {
        if (msg.content === '.setAnouncement') {
            msg.reply("This channel is now the anouncement channel!");
            idAnouncement = msg.channel.id;
        }
    }
});

client.on('messageReactionAdd',  (reaction, user) => {
    if(user.lastMessage=== null){return;}
    if(user.lastMessage.channel.id === idAnouncement && client.user.id !== user.id){

        reaction.message.channel.send(user.username+" just reacted: "+reaction.emoji.name);
        var member = user.lastMessage.guild.member(user);
        var nickname = member.nickname;
        var FamilyName = nickname.split('|')[0];
        console.log(FamilyName); // FamilyName with condition "Charname | Family name"
        if(reaction.emoji.name ==='✅'){
            console.log("Signup with yes to all");
            googleDoc.authenticate()
                .then(text => {
                    googleDoc.Signup(FamilyName);
                })
        }
        else if(reaction.emoji.name === '❎'){
            console.log("Signup with no to all");
        }
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