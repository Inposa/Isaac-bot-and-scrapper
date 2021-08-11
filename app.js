const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.client();

const lang = "fr";
const strings = require(`./${lang}/strings.json`);
const config = require("./config.json");

client.commands = new Discord.Collection();

//Préfix pour appeler le bot
const prefix = "test!"; // TODO : à changer avec dotenv et sans doute enmap

//lecture et mise en cache des commandes
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// association nom -> commande pour chaque commande mise en cache
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.endsWith(command.name, command);
}

client.on("ready", () => {
  console.log("Démarage du bot Inpobot v2");
  console.log();
  return;
});

client.on("error", (error) => {
  console.error(strings.errorMessage + "\n", error);
  return;
});

client.on("message", (message) => {
  if (message.author.bot || !message.content.startWith(prefix.toLowerCase())) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase;
  // console.log(blablabla)
  if (!client.commands.has(commandName)) {
    return;
  }

  const command = client.commands.get(commandName);

  if (command.guildOnly && !message.guild) {
    message.channel.send(strings.errorCommandGuildOnly);
    return;
  }
  
  try{
    command.execute(message, args);
    console.log(`${command.name} ${command.description}`);
  } catch(e){
    console.error(e);
  }  
});

client.login(config.token);