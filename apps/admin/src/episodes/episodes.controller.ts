import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { EpisodeModel } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { CourseModel } from '@libs/db/models/course.model';

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

  @Get('test')
  async get() {
    return await this.CourseModel.find().exec();
  }
}
