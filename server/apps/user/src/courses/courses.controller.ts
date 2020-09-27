import { Body, Controller, Get, Param } from '@nestjs/common';
import { CourseModel } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { EpisodeModel } from '@libs/db/models/episode.model';


@Controller('courses')
export class CoursesController {
  constructor(
    @InjectModel(CourseModel) private readonly courseModel,
    @InjectModel(EpisodeModel) private readonly episodeModel,
  ) {
  }

  @ApiTags('课程')
  @Get(':param')
  async getCourse(@Param('param') param) {
    let params = JSON.parse(param);
    let total = await this.courseModel.find().countDocuments();
    if (total === 0) {
      return {
        name: '',
        total: 0,
      };
    }
    let data = (await this.courseModel.find()
      .sort(params.sort)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)).map((v) => {
        return {
          name: v.name,
          cover: v.cover,
          createTime: v.createdAt,
          total: total,
        };
      },
    );

    return {
      data,
      total,
    };

  }

  @ApiTags('课时')
  @Get('episodes/:coursename')
  async show(@Param('coursename') coursename: string) {
    return (await this.episodeModel.find({ course: coursename }).sort({ createdAt: -1 }).exec()).map((v) => {
      return {
        name: v.name,
        file: v.file,
        type: v.type,
      };
    });
  }

}
