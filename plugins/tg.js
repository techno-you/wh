const { getJson, bot } = require('../lib')

const api_key = ''
bot(
	{
		pattern: 'tg ?(.*)',
		fromMe: true,
		desc: 'telegram sticker downloader',
		type: 'misc',
	},
	async (message, match) => {
		if(!api_key) return await message.send('*fork plugin*\nhttps://api.lolhuman.xyz create an account\n*set key in plugin*')
		if (!match) return await message.send('Example .tg telegram_sticker_pack_url')
    		const { result } = await getJson(`https://api.lolhuman.xyz/api/telestick?apikey=${api_key}&url=${match}`)
    		await message.sendFromUrl(result.sticker)
 	 }
)