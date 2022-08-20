const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});
// FOR DEV const config = require(`${process.cwd()}/config.json`);
const config = require(`${process.cwd()}/utils/credentials.js`);
const {searchPoke} = require(`${process.cwd()}/utils/pokeHandler.js`);

const {token, prefix} = config;

client.on('ready', ()=>{
    console.log(`Discord bot is ready as: ${client.user.tag}`);
});
client.on('messageCreate', async (message) => {
    if(message.author.bot || message.channel.type === 'dm') return;
    if(!message.content.startsWith(prefix)) return;

    let command;
    let arguments = [];
    message.content.slice(prefix.length).toLowerCase().split(' ')
    .map((element, index)=>{
        if(index === 0) command = element;
        else arguments.push(element);
    });
    //Creating message
    if(command === 'search'){
        const pokeInfo = await searchPoke(arguments[0]);
        console.log(pokeInfo, 'msg');
        const embed = new EmbedBuilder()

        .setTitle(stringUppercase(pokeInfo.name))

        .setDescription(`
📱 National Dex: ${pokeInfo.id}

📏 Height: ${(pokeInfo.height*0.1).toFixed(2)}mts
⚖️ Weight: ${(pokeInfo.weight*0.1).toFixed(2)}kg

Stats:

${pokeInfo.stats.map(stat=>{
        let statPrint;
        if(stat.stat.name === 'hp') statPrint = '❤️ HP';
        else if(stat.stat.name === 'attack') statPrint = '⚔️ Attack';
        else if(stat.stat.name === 'defense') statPrint = '🛡️ Defense';
        else if(stat.stat.name === 'special-attack') statPrint = '✨ Special Attack';
        else if(stat.stat.name === 'special-defense') statPrint = '🎈 Special Defense';
        else if(stat.stat.name === 'speed') statPrint = '⚡ Speed';
        return `${statPrint}: ${stat.base_stat}`
    }).join('\n')
}
        `)

        .setImage(pokeInfo.sprites.other['official-artwork'].front_default || pokeInfo.sprites.other.home.front_default)

        .setFooter({
            text:
            `Type:\n${pokeInfo.types.map(type=>{
                if(type.type.name === 'normal') return 'Normal ⚪';
                else if(type.type.name === 'fighting') return 'Fight 🤜🤛';
                else if(type.type.name === 'rock') return 'Rock 🗿';
                else if(type.type.name === 'steel') return 'Steel ⚙️';
                else if(type.type.name === 'ghost') return 'Ghost 👻';
                else if(type.type.name === 'psychic') return 'Psychic 🧠';
                else if(type.type.name === 'fairy') return 'Fairy ✨';
                else if(type.type.name === 'bug') return 'Bug 🐛';
                else if(type.type.name === 'dark') return 'Dark 🖤';
                else if(type.type.name === 'poison') return 'Poison 🧪';
                else if(type.type.name === 'dragon') return 'Dragon 🐉';
                else if(type.type.name === 'ground') return 'Ground ⛱️';
                else if(type.type.name === 'ice') return 'Ice 🧊';
                else if(type.type.name === 'fire') return 'Fire 🔥';
                else if(type.type.name === 'water') return 'Water 💦';
                else if(type.type.name === 'grass') return 'Grass 🌱';
                else if(type.type.name === 'electric') return 'Electric ⚡';
            }).join('\n')}`
        });

        message.channel.send({embeds: [embed]});
    }
    else{
        message.reply('Command not found!');
    }
    
});

function stringUppercase(str){
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
}
client.login(token);