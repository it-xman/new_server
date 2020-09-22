import { Body, Controller, Get, Post } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '@libs/db/models/user.model';
import { UserDto } from '../user-dto';

// const jwt = require('jsonwebtoken');

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

  // const auth = async (author, id, next) => {
  //   console.log(author);
  //   console.log(id);
  //   console.log(next);
  // }
  async userLimit(id) {
    let limit =  await this.model.findById(id)
    return limit.limit;
  }


  @Post('')
  async getAll() {
    return {
      status: 404,
      message: '啥都没有，不给你看',
    };
  }

  @Post('register')
  async post(@Body() userDto: UserDto) {
    let user = await this.model.findOne({
      username: userDto.username,
    });
    if (user) {
      return {
        status: 422,
        message: `用户名已存在， 请重新输入`,
      };
    }
    await this.model(userDto).save();
    return {
      status: 200,
      message: '注册成功',
    };
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    let userName = await this.model.findOne({
      username: userDto.username,
    });
    if (!userName) {
      return {
        status: 422,
        message: '用户名不存在',
      };
    }
    let passWd = await this.model.findOne({
      password: userDto.password,
    });

    if (!passWd) {
      return {
        status: 422,
        message: '密码错误',
      };
    }

    // 生产token
    // const token = jwt.sign({ id: passWd._id }, process.env.SECRET);
    return {
      status: 200,
      // token: token,
      id: passWd._id,
      limit: await this.userLimit(userName._id)
    };
  }
}
