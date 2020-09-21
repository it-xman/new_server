import {modelOptions, prop} from "@typegoose/typegoose";
import {ApiProperty} from "@nestjs/swagger";


@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class UserModel {
    @ApiProperty({
        description: '管理员用户名'
    })
    @prop()
    username: string

    @ApiProperty({
        description: '管理员密码'
    })
    @prop()
    password: string

    @prop()
    limit: string

}
