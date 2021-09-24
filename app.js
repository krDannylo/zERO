const { Client } = require('discord.js');
const { DiscordSR } = require('discord-speech-recognition');
const commands = require('./src/utils/commands');

const { 
  RenameSWordController, 
  FindCommandController,
} = require('./src/controllers');

const client = new Client();
const discordSR = new DiscordSR(client);
require('dotenv').config();

let toMsg = null;

client.on('ready', () => {
  console.log(`Iniciado!`);
  client.user.setActivity(`!zER0`, { type: 'LISTENING' });
});

client.on('message', msg => {
  if(msg.author.bot || !msg.guild || msg.content != '!zER0') return;
    msg.member.voice.channel.join()
      .then(connection => {
        toMsg = connection;
        console.log('Ready to Listen!');
      })
      .catch(console.error);
})

client.on('speech', speechData => {
  if(!speechData.content) return;
  let speech = speechData.content.toLowerCase();
  if(speech.includes('0')){
    console.log(`ST> speech: ${speech}`);
    let commandWord = FindCommandController.exec(speech);
    if(!commandWord) return;
      //console.log(`ST> commandWord: ${commandWord}`);
      speech = RenameSWordController.exec(speech, commandWord);
      console.log(`ST> Renamed: ${speech}`)
      commands[commandWord](toMsg, speech);
  }
})

client.login(process.env.TOKEN);