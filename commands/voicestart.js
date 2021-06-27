const discordTTS = require('discord-tts');

exports.run = async(client, message, args) => {
    if(isNaN(args[0])) return message.channel.send('Please enter a valid number!');

    const milliseconds = 60000 * parseInt(args[0]);
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return [message.channel.send(`${message.author}, you are not in voice channel. I will work in text only mode.`)];
    const broadcast = client.voice.createBroadcast();
    const channelId = message.member.voice.channel.id;
    const channel = client.channels.cache.get(channelId);
    await channel.join();
    let i = 1;
    var timespent = 0;
    let messagesent = message.channel.send(`time left: ${milliseconds/60000} minutes`)
    setInterval(() => {
        setInterval(() => {
            timespent++;
        }, 1000);
        i++;
        message.channel.send(`${i}. ${args[0]} minutes pomodoro started.`);
        broadcast.play(discordTTS.getVoiceStream(`${i}. ${args[0]} minutes pomodoro started.`));
        const dispatcher = connection.play(broadcast);
        setTimeout(async function(){
            message.channel.send(`The ${i}.Pomodoro ended. You have 5 minutes to have a rest.`)
            broadcast.play(discordTTS.getVoiceStream(`The ${i}. pomodoro ended. You have 5 minutes to have a rest.`));
            const dispatcher = connection.play(broadcast);
        }, milliseconds);
    }, milliseconds + 300000);
    setInterval(() => {
        let timeleft = milliseconds - 30000 - timespent;
        messagesent.edit(`time left: ${timeleft/60000} minutes`);
    }, 300000);
};

module.exports.help = {
    name: 'voicestart'
};