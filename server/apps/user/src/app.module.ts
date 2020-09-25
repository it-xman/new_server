import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { CommonModule } from '@libs/common';

@Module({
  imports: [CommonModule, CoursesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
