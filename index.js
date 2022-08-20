const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});
const config = require(`${process.cwd()}/config.json`);

const {token, prefix} = config;

client.on('ready', ()=>{
    console.log(`Discord bot is ready as: ${client.user.tag}`);
});
client.on('messageCreate', async (message) => {
    if(message.author.bot || message.channel.type === 'dm') return;
    if(!message.content.startsWith(prefix)) return;
    message.reply('Work!');
});
client.login(token);