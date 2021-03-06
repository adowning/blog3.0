import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Exclude } from 'class-transformer';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Role } from './role.entity';

class UserScoreDef {
    readonly CreateArticle: number = 5;
}

export const UserScore = new UserScoreDef();

export enum UserStatus {
    InActive = 1, // 未激活
    Actived = 2, // 已激活
    Frozen = 3, // 已冻结
}

export enum UserSex {
    Male = 0, // 男
    Female = 1, // 女
    Unknown = 2, // 未知
}

export class User extends Base {

    @prop({ default: Date.now() })
    createdAt: number;

    @prop({ default: Date.now() })
    updatedAt: number;

    @prop({ default: null })
    deletedAt: number;

    @prop()
    activatedAt: number; // 账号激活时间

    @prop()
    username: string;

    @prop()
    email: string;

    @prop()
    phone: string;

    @Exclude()
    @prop()
    pass: string;

    @prop()
    value: number; // 值

    @prop()
    articleCount: number;

    @prop()
    articleViewCount: number; // 文章被阅读的次数

    @prop()
    commentCount: number;

    @prop({ ref: Role, default: null })
    role: Ref<Role>; // 角色

    @prop()
    isAdmin: boolean; // 是否管理员

    @prop()
    status: UserStatus; // 用户状态

    @prop()
    avatarURL: string; // 头像

    @prop()
    sex: UserSex;

    @prop()
    job: string;

    @prop()
    company: string;

    @prop()
    numberroduce: string; // 个人介绍

    @prop()
    personalHomePage: string; // 个人主页

    @prop()
    githubID: number;

    @prop()
    githubAvatarURL: string;

    @prop()
    githubLogin: string;

    @prop()
    githubName: string;

    @prop()
    weiboID: number;

    @prop()
    weiboScreenName: string;

    @prop()
    weiboName: string;

    @prop()
    weiboAvatarLarge: string;

    @prop()
    location: string;
}