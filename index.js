// node . for å kjøre

const Discord = require("discord.js");

const client = new Discord.Client({ intents: 32767 });

const config = require("./Data/config.json"); // Importerer export fra config.json
const resources = config.resources;

const voiceDiscord = require("@discordjs/voice");
const interval = 1 * 1000 * 60 * 20; // 20 minutter

const testServer = "880738403040239676";
const leage = "699001511367278633";

const secretServer = "940550105260507156";
const password = "Cycling server";

client.on("ready", (message, mordi) => {
  // TODO NÅR HVER TIME FUNKSJONEN KJØRER, HUSK Å KJØ GETMEMBERSINCHANNELS FOR Å OPPDATERE
  // TODO HVOR MANGE MEMBERS DET ER I HVER CHANNEL - HVIS IKKE FUNKER DET IKEK :(
  console.log("Ready to serve master");
  client.channels.fetch(secretServer).then((channel) => {
    channel.send(password);
    channel.send("mordi");
  });
  //console.log("Current Mapping : ");
  //console.log("======================================");
  getMembersInChannels();
  // console.log("======================================");
});

/* client.on("channelCreate", (message) => {
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
}); */

client.on("messageCreate", async (message) => {
  console.log(message.guildId);
  console.log(`Message : ${message.content}`);

  let messageToLower = message.content.toLowerCase();
  if (messageToLower == "åge") {
    message.channel.send(
      `Hallo ${message.author.username}, gamer. Åge er på vei :face_exhaling: :soccer:`
    );
  }

  /* if (messageToLower.includes("åge")) {
    message.channel.send(`ok ${message.author.username}`);
    const channel = message.member.voice.channel;

    if (!channel) return;

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(resources[2]); 

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

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(resources[1]); 

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id, //TODO OOPS HARDCODA BYTT
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
    const resource = voiceDiscord.createAudioResource(resources[1]); 

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    connection.destroy();
  } else if (messageToLower.includes("array")) {
   
    getMembersInChannels();
  } */ if (messageToLower == password) {
    //

    //
    // message.channel.send("ready to go");

    const intervalFunction = () => {
      let filledArray = new Array(23).fill(0);
      //let randInt = Math.floor(Math.random() * 23);

      min = Math.ceil(8);
      max = Math.floor(23);

      let randInt = Math.floor(Math.random() * (max - min + 1)) + min;

      filledArray.splice(randInt, 0, 1);

      console.log(filledArray.length);

      const fn = setInterval(() => {
        filledArray.shift();
        console.log(filledArray);
        if (filledArray.includes(1)) console.log("has 1, continue");
        else {
          const channels = client.channels.cache;

          //console.log(channels);
          let channelArray = new Map();
          //channelArray.clear();

          channels.forEach((index) => {
            if (index.joinable) {
              /**
               * "Channel => ["channel id", "member count"]"
               */
              channelArray.set(index.name, [
                index.id,
                index.members.filter((member) => member.user).size,
              ]);

              //console.log(`${index.name} is joinable`);
            } else {
              //console.log(`${index.name} is not joinable`);
            }

            //console.log(`Index : ${index.name} ${index.joinable}`);
          });

          let max = 0;

          channelArray.forEach((channel) => {
            if (channel[1] > max) {
              max = channel[1];
            }
          });

          if (max == 0) {
            console.log("Oops alle servere tomme :(");
            clearInterval(fn);
            intervalFunction();
            return;
          }

          for (let [key, value] of channelArray.entries()) {
            if (value[1] === max) {
              console.log(`key : ${key} id : ${value[0]}`);

              //const channel = message.member.voice.channel;
              let random = Math.floor(Math.random() * 6); // 1/6 sjanse for å spille super rare Åge sang
              console.log("RNDOOOOOOOOM   :   " + random);
              const player = voiceDiscord.createAudioPlayer();

              const resource = voiceDiscord.createAudioResource(
                resources[random]
              );
              const connection = voiceDiscord.joinVoiceChannel({
                channelId: `${value[0]}`,
                guildId: leage, //TODO ===================================================
                adapterCreator: message.guild.voiceAdapterCreator,
              });

              player.play(resource);
              connection.subscribe(player);

              player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                connection.destroy();
              });
            } //TODO TO SERVERE KAN VÆRE MED LIKE MANGE fix later xD
          }

          console.log(channelArray);

          clearInterval(fn);
          intervalFunction();
        }
      }, interval);
    };

    intervalFunction();

    //
    //
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
//TODO
const getMembersInChannels = () => {
  const channels = client.channels.cache;

  //console.log(channels);
  let channelArray = new Map();
  //channelArray.clear();

  channels.forEach((index) => {
    if (index.joinable) {
      /**
       * "Channel => ["channel id", "member count"]"
       */
      channelArray.set(index.name, [
        index.id,
        index.members.filter((member) => member.user).size,
      ]);

      //console.log(`${index.name} is joinable`);
    } else {
      //console.log(`${index.name} is not joinable`);
    }

    //console.log(`Index : ${index.name} ${index.joinable}`);
  });

  let max = 0;

  channelArray.forEach((channel) => {
    if (channel[1] > max) {
      max = channel[1];
    }
  });

  for (let [key, value] of channelArray.entries()) {
    if (max == 0) {
      console.log("Oops alle servere tomme :(");
      return;
    } else if (value[1] === max) {
      console.log(`key : ${key} id : ${value[0]}`);
    }
  }

  console.log(channelArray);
  // TODO PROBLEMET MED KODEN NÅ ER AT HVIS BOTEN ER MED I FLERE SERVERE VIL CHANNELARRAY BLI FYLT OPP AV ALLE KANALENE DEN ER MED I
  // TODO LAG ET FILTER SOM FILTRER UT IFRA GUILDID
};
//TODO

client.on("error", (message, err) =>
  message.channel.send("An error encountered: " + err)
);

client.login(config.token);
