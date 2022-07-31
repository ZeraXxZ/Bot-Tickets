const Discord = require('discord.js')
const config = require("../../config.json")

/**
 * @param {Discord.Client} client 
 * @param {Discord.Interaction} interaction 
 * @param {Discord.Message} message
 */


module.exports = async (client, interaction) => {

    if (interaction.isButton()) {

        if (interaction.customId == 'bt') {


            const user = interaction.client.users.cache.get(interaction.user.id)

            const block = new Discord.MessageEmbed()

                .setDescription(` ${user} Você ja possui um ticket em andamento.`)
                .setColor("#2f3136")


            const checagem = (await interaction.guild.channels.cache.find(c => c.topic === `<a:setab:992213867063164968> ID do usuario: ${interaction.user.id}`))

            if (checagem) return interaction.reply({ embeds: [block], ephemeral: true })


            interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                parent: config.categoria,
                topic: `ID do usuario: ${interaction.user.id}`,
                type: 'GUILD_TEXT',
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    {

                        id: config.permticket2,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: config.permticket1,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },

                ]
            }).then(async canal => {




                const embed = new Discord.MessageEmbed()

                    .setDescription(`${user} seu ticket foi criado no canal ${canal}`)
                    .setColor('2f3136')


                interaction.reply({ embeds: [embed], ephemeral: true })


                const msgembed = new Discord.MessageEmbed()

                    .setTitle(`${interaction.guild.name} | TICKET`)
                    .setDescription(`Seu **TICKET** está aqui\n***Espere alguns dos responsaveis por tickets responder.***\n\n**Seu ticket será fechado caso não responda mais.**`)
                    .setColor("2F3136")

                const button = new Discord.MessageButton()

                    .setLabel("Fechar Ticket")
                    .setStyle("DANGER")
                    .setCustomId("fechar")

                const row = new Discord.MessageActionRow().addComponents(button)

                canal.send({ embeds: [msgembed], components: [row] })



            })
        }

        if (interaction.customId == 'fechar') {

            await interaction.deferUpdate()

            const topico = await interaction.channel.topic.split(": ")[1]
            const user = client.users.cache.get(topico)

            try {
                interaction.channel.permissionOverwrites.edit(user, {
                    VIEW_CHANNEL: false
                })
            } catch (e) { }

            const embed = new Discord.MessageEmbed()

                .setDescription(`Ticket fechado por: ${interaction.user}`)
                .setColor("RED")

            const btn2 = new Discord.MessageButton()

                .setLabel("Finalizar ticket")
                .setStyle("DANGER")
                .setCustomId("fin")

            const row = new Discord.MessageActionRow().addComponents(btn2)

            interaction.channel.send({ embeds: [embed], components: [row] })

        }

        if (interaction.customId == 'fin') {

            await interaction.deferUpdate()

            const embed = new Discord.MessageEmbed()

                .setDescription(`fechando em 5.....`)
                .setColor("2f3136")

            const embed2 = new Discord.MessageEmbed()

                .setDescription(`fechando em 4....`)
                .setColor("2f3136")

            const embed3 = new Discord.MessageEmbed()

                .setDescription(`fechando em 3...`)
                .setColor("2f3136")

            const embed4 = new Discord.MessageEmbed()

                .setDescription(`fechando em 2..`)
                .setColor("2f3136")

            const embed5 = new Discord.MessageEmbed()

                .setDescription(`Ticket deletado!`)
                .setColor("RED")

            setTimeout(() => {
                interaction.channel.delete()
            }, 5000 )

            setTimeout(async (c) => {

                await interaction.message.edit({ embeds: [embed] })
            }, 1000)
            setTimeout(async (c) => {

                await interaction.message.edit({ embeds: [embed2] })
            }, 1000)
            setTimeout(async (c) => {

                await interaction.message.edit({ embeds: [embed3] })
            }, 1000)
            setTimeout(async (c) => {

                await interaction.message.edit({ embeds: [embed4] })
            }, 1000)
            setTimeout(async (c) => {

                await interaction.message.edit({ embeds: [embed5] })
            }, 1000)

            
            const topico = await interaction.channel.topic.split(": ")[1]
            const user = client.users.cache.get(topico)


            const embe43 = new Discord.MessageEmbed()

            .setDescription(`${user} seu ticket foi finalizado por: ${interaction.user}`)
            .setColor("2f3136")

            user.send({embeds: [embe43]})

            const embedlog = new Discord.MessageEmbed()

                .setTitle(`${interaction.guild.name} | Log tickets`)
                .setDescription(`***Quem abriu:***
                ${user}
                
                ***Quem fechou:***
                
                ${interaction.user}`)
                .setColor("AQUA")
            


            client.channels.cache.get(config.logticket).send({ embeds: [embedlog] })


        }

    }


}  
