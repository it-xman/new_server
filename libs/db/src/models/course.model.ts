import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";
import {EpisodeModel} from "@libs/db/models/episode.model";

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

    @prop({ref: 'EpisodeModel'})
    episodes: Ref<EpisodeModel>[]

}
