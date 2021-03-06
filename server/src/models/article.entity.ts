import { User } from './user.entity';
import { Tag } from './tag.entity';
import { prop, Ref, arrayProp } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export enum ArticleStatus {
  Verifying = 1, // 审核中
  VerifySuccess = 2, // 审核通过
  VerifyFail = 3, // 审核未通过
}
export enum ArticleUpStatus {
  Default = 0, // 默认
  Up = 1, // 置顶
}

export class Article extends Base {

  @prop({ default: Date.now() })
  updatedAt: number;

  @prop({ default: Date.now() })
  createdAt: number;

  @prop({ default: null })
  deletedAt: number;

  @prop()
  title: string;

  @prop()
  summary: string;


  @prop()
  menus: any[];

  @prop()
  content: string;

  // html 对象
  @prop()
  htmlContent: string;

  @prop({ default: 0 })
  browseCount: number;

  @prop()
  coverURL: string;

  @prop()
  wordCount: number;

  commentCount: number;

  @prop({ enum: ArticleStatus })
  status: ArticleStatus;


  @arrayProp({ itemsRef: Tag })
  tags: Array<Ref<Tag>>

  @prop({ ref: User })
  user: Ref<User>;

  @arrayProp({ itemsRef: User })
  likes: Array<Ref<User>>

  @prop({ enum: ArticleUpStatus, default: ArticleUpStatus.Default })
  up?: ArticleUpStatus

}