import {modelOptions, prop} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class EpisodeModel {
    @ApiProperty({
        description: '课时名称'
    })
    @prop()
    name: string | number

    @ApiProperty({
        description: '上传文件'
    })
    @prop()
    file: string

    @ApiProperty({
        description: '课程名称'
    })
    @prop()
    course: string | number

}
