import {modelOptions, prop} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";


@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class UserModel {
    @ApiProperty({
        description: '用户名'
    })
    @prop()
    username: string | number

    @ApiProperty({
        description: '密码'
    })
    @prop()
    password: string

    @prop()
    limit: string

}
