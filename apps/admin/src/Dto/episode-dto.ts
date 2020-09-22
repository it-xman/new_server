import { ApiProperty } from '@nestjs/swagger';

export class EpisodeDto {
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
}
