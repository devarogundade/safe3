/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ContentDocument = HydratedDocument<Content>;

@Schema()
export class Content {
  @Prop({ required: true, unique: true })
  tokenId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, default: null })
  file: string | null;

  @Prop({ required: true, type: Types.Array })
  domains: string[];

  @Prop({ required: true, type: Types.Array })
  likes: `0x${string}`[];

  @Prop({ required: true, type: Types.Array })
  dislikes: `0x${string}`[];

  @Prop({ required: true, type: Types.Array })
  views: `0x${string}`[];

  @Prop({ required: true })
  creator: `0x${string}`;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
