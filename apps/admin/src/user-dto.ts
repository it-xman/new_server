import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: '用户名',
    example: 'user'
  })
  readonly username: string | number;
  @ApiProperty({
    description: '密码',
    example: 'pass'
  })
  readonly password: string;
}
