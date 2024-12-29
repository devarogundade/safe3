/* eslint-disable prettier/prettier */

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './database/schemas/profile';
import { Content } from './database/schemas/content';
import { ContentType } from './types';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    @InjectModel(Content.name) private contentModel: Model<Content>,
  ) {}

  async getProfile(address: string): Promise<Profile | null> {
    return this.profileModel.findOne({ address });
  }

  async createProfile(
    username: `${string}.edu`,
    address: `0x${string}`,
    description: string,
    image: string | undefined,
  ): Promise<Profile> {
    // Check if the profile already exists in the database
    const profileExists = await this.profileModel
      .findOne({
        address,
      })
      .exec();

    // If profile exists, return it to avoid duplicate entries
    if (profileExists) return profileExists;

    // Save the aggregator to the database and return it
    return this.profileModel.create({
      username,
      address,
      description,
      image,
    });
  }

  async hasContents(domain: string): Promise<boolean> {
    const exists = await this.contentModel
      .exists({
        domains: { $in: [domain] },
      })
      .exec();

    return Boolean(exists);
  }

  async createContent(
    tokenId: number,
    title: string,
    description: string,
    image: string,
    file: string,
    type: ContentType,
    domains: string[],
    creator: `0x${string}`,
  ): Promise<Content> {
    return this.contentModel.create({
      tokenId,
      title,
      description,
      image,
      type,
      domains,
      file,
      dislikes: [],
      likes: [],
      views: [],
      creator,
    });
  }

  async getContents(domain: string): Promise<Content[]> {
    return this.contentModel
      .find({
        domains: { $in: [domain] },
      })
      .exec();
  }

  async getContent(tokenId: number): Promise<Content | null> {
    return this.contentModel.findOne({ tokenId }).exec();
  }

  async updateViews(tokenId: number, address: `0x${string}`) {
    return this.contentModel
      .updateOne({ tokenId }, { $push: { views: address } })
      .exec();
  }

  async updateLikes(tokenId: number, address: `0x${string}`) {
    return this.contentModel
      .updateOne(
        { tokenId },
        { $addToSet: { likes: address } },
        { $pull: { dislikes: address } },
      )
      .exec();
  }

  async updateDislikes(tokenId: number, address: `0x${string}`) {
    return this.contentModel
      .updateOne(
        { tokenId },
        { $addToSet: { dislikes: address } },
        { $pull: { likes: address } },
      )
      .exec();
  }
}
