import { ApiProperty } from '@nestjs/swagger';

export class EpisodeDto {
  @ApiProperty({
    description: '课程名称',
    example: '课程名称'
  })
  readonly course: string;

  @ApiProperty({
    description: '课时名称',
    example: '第一小讲'
  })
  readonly name: string | number;

  @ApiProperty({
    description: '课程文件',
    example: 'fileUrl'
  })
  readonly file: string;

  @ApiProperty({
    description: '课程文件类型',
    example: 'mp4/mp3'
  })
  readonly type: string;
}
