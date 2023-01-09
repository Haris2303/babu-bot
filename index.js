const { Client, GatewayIntentBits, Routes} = require('discord.js')
const { TOKEN, CLIENT_ID, GUILD_ID } = require('./config.json')
const { REST } = require('@discordjs/rest')
const fs = require('fs')
const command = require('./commands.js')
const date = new Date()
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ] 
})

// console.log(date.getFullYear());

const rest = new REST({ version: '10'}).setToken(TOKEN)

client.on('messageCreate', (message) => {
  if(message.content.toLowerCase() === 'halo') message.reply("Halo juga")
  if(message.content.toLowerCase() === 'bot apa tugasmu') message.reply("Saya disini bertugas untuk membantu Haris, karena saya diprogram olehnya:D")
})


// list pembayaran

// Administarsi keuangan
client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) {

    // cantumkan pembayaran
    if (interaction.commandName === 'bayar') {
      const name = interaction.options.get('nama').value
      const tanggal = interaction.options.get('tanggal').value
      const bulan = interaction.options.get('bulan').value
  
      // read file
      const paylist = { name, tanggal, bulan }
      const fileBuffer = fs.readFileSync('data/januari.json', 'utf-8')
      const data = JSON.parse(fileBuffer)
  
      // tambahkan data ke file
      data.push(paylist)
      fs.writeFileSync('data/januari.json', JSON.stringify(data))
  
      interaction.reply({ content: `Terima kasih sudah membayar ${name} :D`})

    } 
    
    // daftar anggota baru
    if (interaction.commandName === 'daftarnama') {
      const name = interaction.options.get('name').value
      const value = interaction.options.get('name').value
  
      // read file
      const namelist = { name, value }
      const fileBuffer = fs.readFileSync('data/daftarnama.json', 'utf-8')
      const data = JSON.parse(fileBuffer)

      const duplikat = data.find( d => d.name === name )

      if(duplikat) {
        console.log('nama duplikat');
        interaction.reply({ content: `Gagal ditambahkan, nama ${name} sudah terdaftar,`})
      } else {
        // tambahkan data ke file daftar nama
        data.push(namelist)
        fs.writeFileSync('data/daftarnama.json', JSON.stringify(data))
      
        interaction.reply({ content: `Data nama ${name} telah ditambahkan!`})
      }

    }
    
  }
})

// make slash commands
async function main() {

  const commands = command

  try {
    console.log('Started refreshing application (/) commands.')
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands
    })
    client.login(TOKEN)
    client.on('ready', () => console.log(`${client.user.tag} ready`))
  } catch (err) {
    console.log(err);
  }
}

main()