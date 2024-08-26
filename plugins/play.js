const { y2mate, bot, yts, getBuffer, song } = require('../lib/')

bot(
	{
		pattern: 'play ?(.*)',
		fromMe: true,
		desc: 'Download youtube audio',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match) return await message.send('_Example : play ghost_')
		const result = await yts(match, 0, 1)
		const { title } = result[0]
		await message.send(`_Downloading ${title}_`)
		//const { buffer } = await getBuffer(await y2mate.dl(result[0].id, 'audio'))
		const buffer = await song(result[0].id)
                await message.send(buffer, { mimetype: 'audio/mpeg' }, 'audio')
	}
)
