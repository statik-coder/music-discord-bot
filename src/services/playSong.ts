import { QueueConstructs } from '../types/queueConstruct'
import { Message } from 'discord.js'
import { createAudioResource } from '@discordjs/voice'
import { createErrorEmbed } from '../embeds/error'
import ytdl from 'ytdl-core'

export const playSong = (queueConstruct: QueueConstructs, message: Message) => {
  if (queueConstruct.songs.length === 0) {
    message.channel.send({
      embeds: [createErrorEmbed('Nothing to play! :(')],
    })
  }

  queueConstruct.resource = null

  const stream = ytdl(queueConstruct.songs[0].url, {
    quality: 'highestaudio',
    filter: 'audioonly',
    highWaterMark: 1 << 25,
    liveBuffer: 40000,
  })

  if (!queueConstruct.resource) {
    queueConstruct.resource = createAudioResource(stream, {
      inlineVolume: true,
    })
  }

  queueConstruct.resource.volume.setVolume(100 / queueConstruct.volume / 25)

  queueConstruct.connection.subscribe(queueConstruct.player)
  queueConstruct.player.play(queueConstruct.resource)
}
