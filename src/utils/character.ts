import { MessageEmbed, Constants } from 'discord.js';

import {
  CharacterStar,
  PopularityThreshold,
  AwakeningStage,
  Emoji,
} from './constants';
import { CharacterEmbedOptions } from '../types';
import { resolveEmbedDescription } from './discord-common';

const { Colors } = Constants;

export const getCharacterStarRating = (popularity: number): CharacterStar => {
  if (popularity <= PopularityThreshold.FIVE_STAR) return CharacterStar.FIVE_STAR;
  if (popularity <= PopularityThreshold.FOUR_STAR) return CharacterStar.FOUR_STAR;
  if (popularity <= PopularityThreshold.THREE_STAR) return CharacterStar.THREE_STAR;
  return CharacterStar.TWO_STAR;
};

export const getCharacterAdditionalStars = (copies: number): CharacterStar => {
  if (copies >= AwakeningStage.THIRD) return 3;

  if (copies >= AwakeningStage.SECOND) return 2;

  if (copies >= AwakeningStage.FIRST) return 1;

  return 0;
};

export const getColorByStars = (stars: CharacterStar): number => {
  switch (stars) {
    case CharacterStar.THREE_STAR:
      return Colors.GREEN;
    case CharacterStar.FOUR_STAR:
      return Colors.BLUE;
    case CharacterStar.FIVE_STAR:
      return Colors.GOLD;
    case CharacterStar.SIX_STAR:
      return Colors.PURPLE;
    case CharacterStar.TWO_STAR:
    default:
      return Colors.WHITE;
  }
};

export const renderCharacterStars = (stars: CharacterStar, additionalStars?: number): string => {
  if (additionalStars) {
    return `${Emoji.STAR_FULL.repeat(stars - additionalStars)}${Emoji.STAR_EMPTY.repeat(additionalStars)}`;
  }

  return Emoji.STAR_DEFAULT.repeat(stars);
};

export const createCharacterEmbed = (options: CharacterEmbedOptions): MessageEmbed => {
  const {
    name,
    description = '',
    imageUrl = '',
    series = [],
    stars = CharacterStar.TWO_STAR,
    additionalStars = 0,
    color = getColorByStars(stars),
  } = options;
  const embed = new MessageEmbed({
    title: name,
    color,
  });

  if (description) {
    embed.setDescription(resolveEmbedDescription(description));
  }

  if (imageUrl) {
    embed.setImage(imageUrl);
  }

  if (stars) {
    embed.addField(
      'Stars',
      renderCharacterStars(stars, additionalStars),
    );
  }

  if (series.length) {
    const appearsIn = series.map(({ title }) => title).join(', ');
    embed.addField('Appears in', appearsIn);
  }

  return embed;
};
