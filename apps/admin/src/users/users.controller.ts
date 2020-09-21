import { Body, Controller, Post } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '@libs/db/models/user.model';
import { UserDto } from '../user-dto';

@Crud({
  model: UserModel,
})

@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    @InjectModel(UserModel) private readonly model,
  ) {
  }

  @Post('')
  async getAll() {
    return {
      code: 404,
      message: '啥都没有，不给你看'
    }
  }

  @Post('register')
  async post(@Body() userDto: UserDto) {
    const user = await this.model.findOne({
      username: userDto.username
    });
    if (user) {
      return {
        code: 422,
        message: `用户名已存在， 请重新输入`,
      };
    }
    return await this.model(userDto).save();
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const user = await this.model.findOne(userDto);
    console.log(user);
    // if (user) {
    //   return {
    //     code: 422,
    //     message: `用户名已存在， 请重新输入`
    //   };
    // }
    // return await this.model(userDto).save()
  }
}
