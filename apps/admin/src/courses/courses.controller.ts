import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CourseModel } from '@libs/db/models/course.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { CourseDto } from '../Dto/course-dto';

@Crud({
  model: CourseModel,
})
@ApiTags('课程')
@Controller('courses')
export class CoursesController {
  constructor(@InjectModel(CourseModel) private readonly model) {
  }
  @Post('create')
  async createCourse(@Body() courseDto: CourseDto) {
    let course = await this.model.findOne({
      name: courseDto.name,
    });
    if (course) {
      return {
        status: 422,
        message: `课程已存在， 请重新输入`,
      };
    }
    await this.model(courseDto).save();
    return {
      status: 200,
      message: '课程创建成功'
    };
  }
}
