require('dotenv').config();

const DB = require("./Database");
//DB.get_character();

//basic bot
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    if(msg.content === '.role'){
        let role = msg.guild.roles.find("name", "Member");
        const ismember = msg.member.roles.has(role.id);
        msg.reply(ismember);
    }
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    if(msg.content === '.addme') {
        const messege = DB.add_user(msg);
    }
    if(msg.content.indexOf('addap') >-1){
        DB.addap(msg)
    }
    if(msg.content.indexOf('adddp') >-1){
        DB.adddp(msg)
    }
    if(msg.content.indexOf('addchar') >-1){
        DB.addchar(msg)
    }
});

client.login(process.env.DISCORD_TOKEN);

module.exports=client;