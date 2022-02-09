// Fyller opp en array med 0, og et 1-tall på et tilfeldig sted
// Når 1-tallet forsvinner (i intervaller) fra arrayen, utløser det en funksjon
// Deretter starter den på nytt med ny array og ny random 1-tall

const interval = 500;

const intervalFunction = () => {
  let filledArray = new Array(23).fill(0);
  let randInt = Math.floor(Math.random() * 23);

  filledArray.splice(randInt, 0, 1);

  console.log(filledArray.length);

  const fn = setInterval(() => {
    filledArray.shift();
    console.log(filledArray);
    if (filledArray.includes(1)) console.log("has 1, continue");
    else {
      console.log("Do Something");
      clearInterval(fn);
      intervalFunction();
    }
  }, interval);
};

intervalFunction();

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

      //const channel = message.member.voice.channel;

      const player = voiceDiscord.createAudioPlayer();
      const resource = voiceDiscord.createAudioResource(resources[1]); //resources[1];

      const connection = voiceDiscord.joinVoiceChannel({
        channelId: `${value[0]}`,
        guildId: "880738403040239676",
        adapterCreator: message.guild.voiceAdapterCreator, // how do this
      });

      player.play(resource);
      connection.subscribe(player);

      player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });
    } //TODO TO SERVERE KAN VÆRE MED LIKE MANGE
  }

  console.log(channelArray);
  // TODO PROBLEMET MED KODEN NÅ ER AT HVIS BOTEN ER MED I FLERE SERVERE VIL CHANNELARRAY BLI FYLT OPP AV ALLE KANALENE DEN ER MED I
  // TODO LAG ET FILTER SOM FILTRER UT IFRA GUILDID
};
