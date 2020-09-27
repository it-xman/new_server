import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { EpisodeModel } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { CourseModel } from '@libs/db/models/course.model';
import { EpisodeDto } from '../Dto/episode-dto';

@Crud({
  model: EpisodeModel,
})

@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(EpisodeModel) private readonly model,
    @InjectModel(CourseModel) private readonly CourseModel,
  ) {
  }

  @Get('check/:name')
  async checkEpisodes(@Param('name') name: string) {
    let course = await this.model.findOne({
      name: name,
    });
    if (course) {
      return {
        // 不能创建 false
        create: false,
      };
    }
    return {
      create: true,
    };
  }

  @Post('create')
  async createEpisodes(@Body() episodeDto: EpisodeDto) {
    await this.model(episodeDto).save();
    return {
      create: 'ok',
    };
  }

  @Get('course')
  async get() {
    return (await this.CourseModel.find().sort({ updatedAt: -1 }).exec()).map((v) => {
      return {
        name: v.name,
        id: v._id,
      };
    });
  }

  @Get('showcourse/:coursename')
  async show(@Param('coursename') coursename: string) {
    return (await this.model.find({ course: coursename }).exec()).map((v) => {
      return {
        name: v.name,
        file: v.file,
        type: v.type,
      };
    });
  }

}
