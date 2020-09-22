import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CourseModel } from '@libs/db/models/course.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: CourseModel,
})
@ApiTags('课程')
@Controller('courses')
export class CoursesController {
  constructor(@InjectModel(CourseModel) private readonly model: ReturnModelType<typeof CourseModel>) {
  }
  @Get('test')
  async get() {
    return await this.model.find().exec()
  }

}
