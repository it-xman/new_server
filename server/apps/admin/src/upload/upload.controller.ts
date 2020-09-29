import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

const Minio = require('minio');

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  db = null;

  DB() {
    if (this.db === null) {
      this.db = new Minio.Client({
        endPoint: process.env.ENDPOINT,
        port: parseInt(process.env.PORT),
        useSSL: true,
        accessKey: process.env.ACCESS_KeEY,
        secretKey: process.env.SECRET_KEY,
      });
    }
    return this.db;
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Param('id') id: string, @UploadedFile('file') file) {
    if (file === undefined) {
      return {
        file: '文件没有上传',
      };
    }
    let hasBucket = await this.DB().bucketExists(id);

    if (!hasBucket) {
      await this.DB().makeBucket(id, 'cn-north-1');
    }
    let metaData = {
      'Content-Type': `${file.mimetype}`,
      'X-Amz-Meta-Testing': 1234,
      'example': 5678,
    };

    let res = await this.DB().putObject(id, file.originalname, file.buffer, metaData);
    if (res) {
      return {
        url: `https://${process.env.ENDPOINT}:${process.env.PORT}/${id}/${file.originalname}`
      };
    }
    return {
      code: 404,
      message: '服务没找到',
    };
  }

  // @Delete(':id')
  // del(@Param('id') id: string) {
  //     this.DB().removeObject('userimage', id, (err) => {
  //         if (err) {
  //             return console.log(err)
  //         }
  //         console.log(`删除${id}成功`)
  //     })
  // }
}
