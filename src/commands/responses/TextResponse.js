import R from 'ramda';
import { Response } from 'ghastly/command';
import { RichEmbed } from 'discord.js';

import { COLORS } from '../../util/constants';

export class TextResponse extends Response {
  constructor(title, content, { message }) {
    super(async () => {
      const embed = new RichEmbed();
      embed
        .setColor(COLORS.INFO)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(title)
        .setDescription(content);

      return message.channel.send({ embed });
    });
  }
}

export default R.construct(TextResponse);
