import {Controller, Delete, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiTags} from "@nestjs/swagger";

const Minio = require('minio')

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
    db = null;

    DB() {
        if (this.db === null) {
            this.db = new Minio.Client({
                endPoint: process.env.ENDPOINT,
                port: parseInt(process.env.PORT),
                useSSL: false,
                accessKey: process.env.ACCESS_KeEY,
                secretKey: process.env.SECRET_KEY
            })
        }
        return this.db
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile('file') file) {
        let hasBucket = await this.DB().bucketExists('userimage');

        if (!hasBucket) {
            await this.DB().makeBucket('userimage', 'cn-north-1')
        }
        let metaData = {
            'Content-Type': `${file.mimetype}`,
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }

        let res = await this.DB().putObject('userimage', file.originalname, file.buffer, metaData)
        if (res) {
            return {
                url: await this.DB().presignedUrl('GET', 'userimage', file.originalname)
            }
        }
        return {
            code: 404,
            message: '服务没找到'
        }
    }

    @Delete(':id')
    del(@Param('id') id: string) {
        this.DB().removeObject('userimage', id, (err) => {
            if (err) {
                return console.log(err)
            }
            console.log(`删除${id}成功`)
        })
    }
}
