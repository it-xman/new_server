import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty({
    description: '课程名称',
    example: '英语一小时'
  })
  readonly name: string | number;

  @ApiProperty({
    description: '封面图',
    example: 'url'
  })
  readonly cover: string;
}
