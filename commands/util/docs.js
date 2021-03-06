/**
 * @param {import('../../structures/client.js')} Client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
*/
module.exports = async (Client, message, args) => {
  if (!Client.checkClientPerms(message.channel, 'EMBED_LINKS')) return Client.functions.get('noClientPerms')(message, ['Embed Links'], message.channel);
  if (!args[1]) return message.reply('You have to provide a query for me to search!');

  const branch = args[2] ? args.pop() : 'stable';
  if (!['stable', 'master'].includes(branch)) return message.reply('The branch has to be either `stable` or `master`!');

  const query = args.slice(1).join(' ').replace('#', '.');

  const body = await Client.fetch(`https://djsdocs.sorta.moe/main/${branch}/embed?q=${query}`).then(res => res.json());
  if (!body) return message.reply('I did not find any results from that query.');

  return message.channel.send({ embed: body });
};

module.exports.help = {
  name: 'docs',
  desc: 'A documentation command for Discord.js.',
  category: 'util',
  usage: '?docs <Query> [Branch]',
  aliases: ['doc']
};
