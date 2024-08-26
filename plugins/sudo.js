const { rmComma, bot, jidToNum, getVars, setVar } = require('../lib')

bot(
  {
    pattern: 'setsudo ?(.*)',
    fromMe: true,
    desc: 'add replied or mentioned or given num to sudo',
    type: 'vars',
  },
  async (message, match) => {
    try {
      const vars = await getVars()
      const SUDO = rmComma(
        (vars.SUDO || '') +
          (!vars.SUDO ? '' : ',') +
          jidToNum(message.reply_message.jid || message.mention[0] || match)
      )
      await setVar({ SUDO })
      return await message.send('```' + `New SUDO Numbers are : ${SUDO}` + '```')
    } catch (error) {
      return await message.send(error.message, { quoted: message.data })
    }
  }
)

bot(
  {
    pattern: 'delsudo ?(.*)',
    fromMe: true,
    desc: 'remove replied or mentioned or given num to sudo',
    type: 'vars',
  },
  async (message, match) => {
    try {
      const vars = await getVars()
      const sudo = jidToNum(message.reply_message.jid || message.mention[0] || match)
      const SUDO = rmComma(vars.SUDO.replace(sudo, ''))
      await setVar({ SUDO })
      await message.send('```' + `New SUDO Numbers are : ${SUDO}` + '```')
    } catch (error) {
      return await message.send(error.message, { quoted: message.data })
    }
  }
)

bot(
  {
    pattern: 'getsudo ?(.*)',
    fromMe: true,
    desc: 'show sudos',
    type: 'vars',
  },
  async (message, match) => {
    try {
      const vars = await getVars()
      await message.send('```' + `SUDO Numbers are : ${vars.SUDO}` + '```')
    } catch (error) {
      return await message.send(error.message, { quoted: message.data })
    }
  }
)
