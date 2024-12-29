/* eslint-disable prettier/prettier */

import { AppService } from './app.service';
import { Profile } from './database/schemas/profile';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentDto, ContentUpdateDto, ProfileDto } from './types';
import { Content } from './database/schemas/content';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/profiles/:address')
  getProfile(@Param('address') address: string): Promise<Profile | null> {
    return this.appService.getProfile(address);
  }

  @Post('/create-profile')
  createProfile(@Body() data: ProfileDto): Promise<Profile> {
    return this.appService.createProfile(
      data.username,
      data.address,
      data.description,
      data.image,
    );
  }

  @Post('/create-content')
  async createContent(@Body() data: ContentDto): Promise<Content> {
    return this.appService.createContent(
      data.tokenId,
      data.title,
      data.description,
      data.image,
      data.file,
      data.type,
      data.domains,
      data.creator,
    );
  }

  @Get('/contents')
  async getContents(@Param('domain') domain: string): Promise<Content[]> {
    return this.appService.getContents(domain);
  }

  @Get('/contents/:tokenId')
  async getContent(@Param('tokenId') tokenId: number): Promise<Content | null> {
    return this.appService.getContent(tokenId);
  }

  @Get('has-contents/:domain')
  async hasContents(@Param('domain') domain: string): Promise<boolean> {
    return this.appService.hasContents(domain);
  }

  @Post('update-views')
  async updateViews(@Body() data: ContentUpdateDto) {
    return this.appService.updateViews(data.tokenId, data.address);
  }

  @Post('update-likes')
  async updateLikes(@Body() data: ContentUpdateDto) {
    return this.appService.updateLikes(data.tokenId, data.address);
  }

  @Post('update-dislikes')
  async updateDislikes(@Body() data: ContentUpdateDto) {
    return this.appService.updateDislikes(data.tokenId, data.address);
  }
}
