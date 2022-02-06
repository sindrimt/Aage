// node . for å kjøre

const Discord = require("discord.js");

const client = new Discord.Client({ intents: 32767 });

const config = require("./Data/config.json"); // Importerer export fra config.json
const resources = config.resources;

const voiceDiscord = require("@discordjs/voice");

client.on("ready", (message) => console.log("Ready to serve master"));

client.on("messageCreate", async (message) => {
  console.log(`Message : ${message.content}`);

  let messageToLower = message.content.toLowerCase();

  if (messageToLower.includes("åge")) {
    message.channel.send(`ok ${message.author.username}`);
    const channel = message.member.voice.channel;

    if (!channel) return;

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(resources[2]); //resources[1];

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    player.play(resource);
    connection.subscribe(player);

    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  } else if (messageToLower.includes("fart" && "promp")) {
    message.channel.send(`ok ${message.author.username} :flushed:`);
    const channel = message.member.voice.channel;

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(resources[1]); //resources[1];

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    player.play(resource);
    connection.subscribe(player);

    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  } else if (messageToLower.includes("stikk av")) {
    const channel = message.member.voice.channel;

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(resources[1]); //resources[1];

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    connection.destroy();
  } else {
    console.log("Not right keyword");
    return;
  }
});

client.on("error", (message, err) =>
  message.channel.rep("An error encountered: " + err)
);

client.login(config.token);
