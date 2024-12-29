/* eslint-disable prettier/prettier */

// Import necessary modules and dependencies for NestJS application
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './database/schemas/profile';
import { Content, ContentSchema } from './database/schemas/content';
@Module({
  imports: [
    // Load environment variables from .env file for configuration
    ConfigModule.forRoot(),

    // Configure Mongoose to connect to MongoDB using URL from environment variables
    MongooseModule.forRoot(process.env.MONGO_URL),

    // Define Mongoose schemas for Profile and Content models
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema }, // Profile schema registration
      { name: Content.name, schema: ContentSchema }, // Content schema registration
    ]),
  ],

  // Define controllers used in this module
  controllers: [AppController],

  // Define service and worker providers used in this module
  providers: [AppService],
})
export class AppModule {}
