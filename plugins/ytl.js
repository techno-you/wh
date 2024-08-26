const {
	y2mate,
	bot,
	genListMessage,
	yts,
	genButtonMessage,
} = require('../lib/')

const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

bot(
	{
		pattern: 'ytl ?(.*)',
		fromMe: true,
		desc: 'Download youtube video',
		type: 'download',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match) return await message.send('_Example : ytl url or query_')
		if (match.startsWith('y2mate;')) {
			const [_, q, id] = match.split(';')
			const result = await y2mate.dl(id, 'video', q)
			return await message.sendFromUrl(result)
		}
		if (!ytIdRegex.test(match)) {
			const result = await yts(match)
			return await message.send(
				genListMessage(
					result.map(({ title, id, description }) => ({
						text: title,
						id: `ytl https://www.youtube.com/watch?v=${id}`,
						desc: description,
					})),
					'Choose Your Video',
					'DOWNLOAD'
				),
				{},
				'list'
			)
		}
		const vid = ytIdRegex.exec(match)
		const { title, video } = await y2mate.get(vid[1])
		const list = []
		for (const q in video)
			list.push({
				text: q,
				id: `ytl y2mate;${q};${vid[1]}`,
				desc: video[q].fileSizeH || video[q].size,
			})
		if (!list.length)
			return await message.send('*Not found*', {
				quoted: message.quoted,
			})
		return await message.send(
			genListMessage(list, title, 'Download'),
			{},
			'list'
		)
	}
)
