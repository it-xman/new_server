import {Global, Module} from '@nestjs/common';
import {DbService} from './db.service';
import {TypegooseModule} from "nestjs-typegoose";
import {UserModel} from "@libs/db/models/user.model";
import {CourseModel} from "@libs/db/models/course.model";
import {EpisodeModel} from "@libs/db/models/episode.model";

// 统一引用数据模型，新建的模型都在这里引入一下
const models = TypegooseModule.forFeature([
    UserModel, CourseModel, EpisodeModel
])

@Global()
@Module({
    imports: [
        // 链接数据库 异步加载读取 process.env
        TypegooseModule.forRootAsync({
            useFactory() {
                return {
                    uri: process.env.DB,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                }
            }
        }),
        // 全局导入模型
        models
    ],
    providers: [DbService],
    exports: [DbService, models],
})
export class DbModule {
}
