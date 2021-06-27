const discordTTS = require('discord-tts');

exports.run = async(client, message, args) => {
    if(isNaN(args[0])) return message.channel.send('Please enter a valid number!');
    const milliseconds = 60000 * parseInt(args[0]);
    let i = 1;
    var timespent = 0;
    let messagesent = message.channel.send(`time left: ${milliseconds/60000} minutes`)
    setInterval(() => {
        setInterval(() => {
            timespent++;
        }, 1000);
        i++;
        message.channel.send(`${i}. ${args[0]} minutes pomodoro started.`);
        setTimeout(async function(){
            message.channel.send(`The ${i}.Pomodoro ended. You have 5 minutes to have a rest.`)
        }, milliseconds);
    }, milliseconds + 300000);
    setInterval(() => {
        let timeleft = milliseconds - 30000 - timespent;
        messagesent.edit(`time left: ${timeleft/60000} minutes`);
    }, 300000);
};

module.exports.help = {
    name: 'start'
};