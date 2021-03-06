import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('check/:name')
  async checkCourse(@Param('name') name: string) {
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
  async createCourse(@Body() courseDto: CourseDto) {
    await this.model(courseDto).save();
    return {
      create: 'ok',
    };
  }
}
