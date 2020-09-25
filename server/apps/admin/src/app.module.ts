import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import {CommonModule} from "@libs/common";
import {UploadModule} from "./upload/upload.module";

@Module({
  imports: [CommonModule, UsersModule, CoursesModule, EpisodesModule, UploadModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
