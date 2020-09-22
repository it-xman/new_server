import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

export class UserModel {
  @prop()
  username: string | number;

  @prop()
  password: string;

  @prop()
  limit: string;

  @prop()
  nickname: string | number;

}
