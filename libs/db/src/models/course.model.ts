import {modelOptions, prop} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class CourseModel {
    @ApiProperty({
        description: '课程名称'
    })
    @prop()
    name: string | number

    @ApiProperty({
        description: '封面图'
    })
    @prop()
    cover: string
}
