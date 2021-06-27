const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const ready = require('./events/ready');
const message = require('./events/message');
const settings = require('./settings.json');

client.commands = new discord.Collection();

//Client on ready and message events (at ./events/*)
ready.ready(client, settings);
message.message(client, settings);

//Reading ./commands/ folder for js files (commands)
fs.readdir('./commands/', (err, files) =>{
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) return console.log("There are no commands to load.");
    console.log(`Loading ${jsfiles.length} commands.`);
    jsfiles.forEach((f,i)=>{
        let props = require(`./commands/${f}`);
        console.log(`${i+1}: ${f} loaded!`);
        client.commands.set(props.help.name, props);
    });
});

client.loadCommand = (commandName) => {
    try {
        let props = require(`../commands/${commandName}`);
        if (props.init) props.init(client);
        client.commands.set(commandName, props);
        return false;
    } catch (err) {
        return [console.error(err)];
    }
}

client.unloadCommand = async (commandName) => {
    try {
        if (!commandName) return `\`${commandName}\` I can't find this command!`;
        if (commandName.shutdown) await commandName.shutdown(client);
        delete require.cache[require.resolve(`../commands/${commandName}.js`)];
        return false;
    } catch (err) {
        return [console.error(err)];
    }
};