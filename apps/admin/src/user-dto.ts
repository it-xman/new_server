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

  @ApiProperty({
    description: '注册时用昵称',
    example: 'nickname'
  })
  readonly nickname: string | number;

  @ApiProperty({
    description: '权限',
    example: 'limit'
  })
  readonly limit: string | number;
}
