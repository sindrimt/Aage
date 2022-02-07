// node . for å kjøre

const Discord = require("discord.js");

const client = new Discord.Client({ intents: 32767 });

const config = require("./Data/config.json"); // Importerer export fra config.json
const resources = config.resources;

const voiceDiscord = require("@discordjs/voice");

client.on("ready", (message, mordi) => {
  // TODO NÅR HVER TIME FUNKSJONEN KJØRER, HUSK Å KJØ GETMEMBERSINCHANNELS FOR Å OPPDATERE
  // TODO HVOR MANGE MEMBERS DET ER I HVER CHANNEL - HVIS IKKE FUNKER DET IKEK :(
  console.log("Ready to serve master");
  console.log("Current Mapping : ");
  console.log("======================================");
  getMembersInChannels();
  console.log("======================================");
});

client.on("channelCreate", (message) => {
  console.log("A channel was created");
  getMembersInChannels();
});

client.on("channelDelete", (message) => {
  console.log("A channel was deleted");
  getMembersInChannels();
});

client.on("channelUpdate", (message) => {
  console.log("A channel was updated");
  getMembersInChannels();
});

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
  } else if (
    messageToLower.includes("fart") ||
    messageToLower.includes("promp")
  ) {
    message.channel.send(`ok ${message.author.username} :flushed:`);
    const channel = message.member.voice.channel;

    console.log(`Channel ID : ${channel.id}`);
    //const channel = client.channels.resolveId("882902642165178398");

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(resources[1]); //resources[1];

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: "887821041810956288", //TODO OOPS HARDCODA BYTT
      guildId: guildId,
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
  } else if (messageToLower.includes("array")) {
    /***
     *
     */
    //console.log(message.guild.channels.cache.at(2));
    getMembersInChannels();
  } else {
    //console.log("Not right keyword");
    return;
  }
});

const getChannelsForClient = () => {
  const channels = client.channels.cache;
  //console.log(channels);
  let channelArray = new Map();

  channels.forEach((index) => {
    if (index.joinable) {
      channelArray.set(index.name, index.id);
      //console.log(`${index.name} is joinable`);
    } else {
      //console.log(`${index.name} is not joinable`);
    }

    //console.log(`Index : ${index.name} ${index.joinable}`);
  });
  console.log(channelArray);
};

const getMembersInChannels = () => {
  const channels = client.channels.cache;
  //console.log(channels);
  let channelArray = new Map();

  channels.forEach((index) => {
    // Sjekker om channelen er joinable => voiceChannel
    if (index.joinable) {
      // "Channel => ["channel id", "member count"]"

      channelArray.set(index.name, [
        index.id,
        index.members.filter((member) => member.user).size,
      ]);
    }
  });
  let max = 0;
  // Finner kanalen med flest medlemmer
  channelArray.forEach((channel) => {
    if (channel[1] > max) {
      max = channel[1];
    }
  });

  for (let [key, value] of channelArray.entries()) {
    if (value[1] === 1) {
      console.log(`key : ${key} id : ${value[0]}`);
    }
  }
};

client.on("error", (message, err) =>
  message.channel.send("An error encountered: " + err)
);

client.login(config.tokenTest);
