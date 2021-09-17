import { Message, MessageEmbed } from 'discord.js'
import { Song } from '../../builders/song'

export const createPauseEmbed = (song: Song, message: Message) => {
  const embed = new MessageEmbed()
    .setColor('#FFE895')
    .setTitle(':pause_button: ' + song.title)
    .setURL(song.url)
    .setAuthor('Paused', message.author.avatarURL())
    .setThumbnail(song.thumbnail.url)
    .setTimestamp()
    .setFooter('Powered by DELAMAIN')

  return embed
}