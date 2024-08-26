const { bot, jidToNum } = require('../lib/')

bot(
	{
		pattern: 'wa ?(.*)',
		fromMe: true,
		desc: 'wa.me',
		type: 'misc',
	},
	async (message, match) => {
		const u = message.mention[0] || message.reply_message.jid || match
     const v = jidToNum(u)
if(u && v.length > 7) await message.send(`https://wa.me/${v}`)
	}
)
