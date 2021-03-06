/**
 * @param {import('../../structures/client.js')} Client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
*/
module.exports = async (Client, message, args) => {
  if (!await Client.checkPerms('set', 'slowmode', message.member)) return Client.functions.get('noCustomPerm')(message, 'slowmode.set');

  if (!args[1]) return message.reply('You have to provide a slowmode amount for me to set!');
  const slowmode = args[1];
  if (isNaN(slowmode)) return message.reply('The slowmode amount you provided was not a number!');
  if (slowmode > 120) return message.reply('The slowmode value has to be less or equal to 120!');
  if (slowmode < 0) return message.reply('The slowmode value cannot be lower than 0!');
  if (slowmode.includes('.')) return message.reply('The slowmode value cannot be a decimal!');

  const channel = args[2] ? Client.getObj(args[2], { guild: message.guild, type: 'channel' }) : message.channel;
  if (!channel || channel.type !== 'text') return message.reply('I did not find a text channel from the channel you provided!');
  if (!Client.checkClientPerms(channel, 'MANAGE_CHANNELS')) return Client.functions.get('noClientPerms')(message, ['Manage Channels'], channel);

  channel.setRateLimitPerUser(slowmode);
  return message.channel.send(`Successfully set the slowmode to **${slowmode}** in ${channel}.`);
};

module.exports.help = {
  name: 'slowmode',
  desc: 'Sets a slowmode for a channel.',
  category: 'moderation',
  usage: '?slowmode <Slowmode in Seconds> [Channel]',
  aliases: ['setslowmode']
};
