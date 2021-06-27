module.exports = {
    message: (client, settings,) => {
        client.on('message', async message => {
            const prefix = settings.prefix;
            if (message.author.bot) return;
            if (message.channel.type === "dm") return;
            if (!message.content.startsWith(prefix)) return;
            let args = message.content.slice(prefix.length).trim().split(' ');
            let cmd = args.shift().toLowerCase();
            let command;
            if (client.commands.has(cmd)) {
                command = client.commands.get(cmd);
            }
            try {
                command.run(client, message, args);
            } catch (err) {
                if (err) return undefined;
            }
        });
    }
}