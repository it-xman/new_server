import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import {ConfigModule} from "@nestjs/config";
import {DbModule} from "@libs/db";

@Module({
  imports: [
    // 读取.env文件存储变量
      ConfigModule.forRoot({
        isGlobal:true
      }),
      DbModule
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
