/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudioDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ required: true, unique: true })
  username: `${string}.edu`;

  @Prop({ required: true, unique: true })
  address: `0x${string}`;

  @Prop({ required: true, default: null })
  description: string | null;

  @Prop({ required: true, default: null })
  image: string | null;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
