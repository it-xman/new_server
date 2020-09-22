import { Body, Controller, Get, Post } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { EpisodeModel } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { CourseModel } from '@libs/db/models/course.model';
import { EpisodeDto } from '../Dto/episode-dto';

@Crud({
  model: EpisodeModel
})

@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(EpisodeModel) private readonly model,
    @InjectModel(CourseModel) private readonly CourseModel
  ) {
  }

  @Post('create')
  async createCourse(@Body() episodeDto: EpisodeDto) {
    let course = await this.model.findOne({
      name: episodeDto.name,
    });
    if (course) {
      return {
        status: 422,
        message: `课时已存在， 请重新输入`,
      };
    }
    await this.model(episodeDto).save();
    return {
      status: 200,
      message: '课时创建成功'
    };
  }

  @Get('course')
  async get() {
    return (await this.CourseModel.find().exec()).map((v) => {
      return {
        name: v.name,
        id: v._id
      }
    })
  }
}
