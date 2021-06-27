exports.run = async(client, message, args) => {
      message.channel.send(+ client.ws.ping + `ms `)
};

module.exports.help = {
    name: 'ping'
};