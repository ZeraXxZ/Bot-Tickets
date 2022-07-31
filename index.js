const Discord = require("discord.js")
const client = new Discord.Client({ intents: 32767 })
const config = require("./config.json")
const comandos = require('./src/structures/commands')
const eventos = require('./src/structures/events')
comandos()
eventos(client)

client.login(config.token)