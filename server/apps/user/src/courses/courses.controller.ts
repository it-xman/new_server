import { Controller, Get, Param } from '@nestjs/common';
import { CourseModel } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { EpisodeModel } from '@libs/db/models/episode.model';


@Controller('courses')
export class CoursesController {
  constructor(
    @InjectModel(CourseModel) private readonly courseModel,
    @InjectModel(EpisodeModel) private readonly episodeModel
  ) {
  }

  @ApiTags('课程')
  @Get()
  async getCourse() {
    return (await this.courseModel.find().exec()).map((v) => {
        return {
          name: v.name,
          cover: v.cover,
        };
      },
    );
  }

  @ApiTags('课时')
  @Get(':coursename')
  async show(@Param('coursename') coursename: string) {
    return (await this.episodeModel.find({ course: coursename }).exec()).map((v) => {
      return {
        name: v.name,
        file: v.file,
      };
    });
  }

}
