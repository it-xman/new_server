import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";
import {CourseModel} from "@libs/db/models/course.model";

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
    name: string

    @ApiProperty({
        description: '上传文件'
    })
    @prop()
    file: string

    @prop({ref: 'CourseModel'})
    course: Ref<CourseModel>

}
