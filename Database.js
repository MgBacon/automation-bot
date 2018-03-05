var exports = module.exports = {};

const Discord = require("discord.js");
const client = new Discord.Client();

require('dotenv').config();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DB_URL
});

exports.get_character = async function() {
    try
    {
        const response = await pool.query("select * from memberlist");
        console.log(response.rows);
    }
    catch(e)
    {
        console.error("get_character() failed", e);
    }
}

exports.add_user = async function _add_user(msg){
    const text = 'INSERT INTO memberlist (user_id, class, is_member) VALUES($1, $2, $3) RETURNING *';
    let member = msg.guild.roles.find("name", "Member");
    const ismember = msg.member.roles.has(member.id);

    const membernames = ["Witch","Wizard","Sorceress","Dark Knight"];
    let memberids = new Array(membernames.length);
    for(i=0; i<membernames.length;i++){memberids[i] = msg.guild.roles.find("name", membernames[i]);}
    var classname = "NA";
    for(i=0;i<memberids.length;i++) {
        if(msg.member.roles.has(memberids[i].id)){classname = membernames[i]};
    }

    const values = [String(msg.author.id), classname, ismember];

    try {
        const res = await pool.query(text, values)
        return 'successfully added';
    } catch(err) {
        console.log(err.stack)
        if(err.code === '23505'){
            return 'you are already added :eyes:!';
        }
    }
    return ' ';
}

exports.addap = async function _add_ap(msg){
    var string = msg.content;
    var ap = (string.split(' '))[1];

    const text = 'UPDATE memberlist SET ap = $1 where user_id = $2';
    const values = [ap, String(msg.author.id)];

    try {
        const res = await pool.query(text, values)
        return 'successfully added';
    } catch(err) {
        console.log(err.stack);
        return 'you are already added :eyes:!';
    }
    return ' ';
}

exports.adddp = async function _add_dp(msg){
    try {
        var string = msg.content;
        var dp = (string.split(' '))[1];
        var dp_int = parseInt(dp);

        const response = await pool.query('UPDATE memberlist SET dp =' + dp_int + ' where user_id = ' + msg.author.id);
        return 'dp successfully added';
    }
    catch (e) {
        console.error("add_dp failed", e);
        return 'something went wrong :eyes:';
    }
}

exports.addchar = async function _add_char(msg){
    try {
        var string = msg.content;
        var char = (string.split(' '))[1];

        const response = await pool.query('UPDATE memberlist SET charactername = ' + char + ' where user_id = ' + msg.author.id);
        return 'character name successfully added';
    }
    catch (e) {
        console.error("add_char failed", e);
        return 'something went wrong :eyes:';
    }
}


