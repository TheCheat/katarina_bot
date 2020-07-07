import {
  Context as DiskatContext,
  CommandConfigurator as DiskatCommandConfigurator,
} from 'diskat';
import { Document, Model, Types } from 'mongoose';

import type { Client } from './services/client';

export type Plugin = (client: Client) => void;

export interface Context extends DiskatContext {
  client: Client
}

export type CommandConfigurator<T extends Context = Context, R = unknown> = DiskatCommandConfigurator<T, R, Client>;

export enum UserSettingName {
  DISPLAY_ROLL_PRICE = 'displayrollprice',
}

export enum UserSetting {
  OFF = 0,
  ON = 1,
}

export type UserSettings = Record<UserSettingName, UserSetting>;

export interface DocumentBase {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserBase extends DocumentBase {
  discordId: string;
  favorites: Types.ObjectId[] | Types.DocumentArray<CharacterDocument>;
  lastRolledAt?: Date;
  waifu?: Types.ObjectId;
  quote?: string;
  currency: number;
  correctQuizGuesses: number;
  rolls: number;
  settings: UserSettings;
  characters: Types.ObjectId[] | Types.DocumentArray<UserCharacterDocument>;
}

export interface UserDocument extends Document, UserBase {}

export type UserModel = Model<UserDocument>;

export interface UserCharacterBase extends DocumentBase {
  character: Types.ObjectId | CharacterDocument;
}

export interface UserCharacterDocument extends Document, UserCharacterBase {}

export type UserCharacterModel = Model<UserCharacterDocument>;

export interface CharacterBase extends DocumentBase {
  name: string;
  description?: string;
  popularity: number;
  slug: string;
  imageUrl: string;
  series: Types.ObjectId[];
}

export interface CharacterDocument extends Document, CharacterBase {}

export interface CharacterModel extends Model<CharacterDocument> {
  random(n: number, pipeline: Record<string, unknown>[]): Promise<CharacterDocument[]>;
}

export interface SeriesBase extends DocumentBase {
  title: string;
  slug: string;
}

export interface SeriesDocument extends Document, SeriesBase {}

export type SeriesModel = Model<SeriesDocument>;

export interface AchievementBase extends DocumentBase {
  user: Types.ObjectId | UserDocument;
  completedAt: Date;
  code: string;
  progress: number;
  meta: Record<string, unknown>;
}

export interface AchievementDocument extends Document, AchievementBase {}

export type AchievementModel = Model<AchievementDocument>;

export interface GuildBase extends DocumentBase {
  discordId: string;
}

export interface GuildDocument extends Document, GuildBase {}

export type GuildModel = Model<GuildDocument>;

export interface MissionBase extends DocumentBase {
  user: Types.ObjectId | UserDocument;
  completedAt: Date;
  resetsAt: Date;
  progress: number;
  code: string;
  meta: Record<string, unknown>;
}

export interface MissionDocument extends Document, MissionBase {}

export type MissionModel = Model<MissionDocument>;
