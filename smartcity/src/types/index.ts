// 公共类型 在这里定义
export interface regType {
    avatar?: string;
    userName: string;
    nickName?: string;
    password: string;
    phonenumber: string;
    sex: string;
    email?: string;
    idCard?: string;
}

export interface userInfoType {
    userId: number | string;
    userName: string;
    nickName: string;
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string;
    idCard: string;
    balance: number | string;
    score: number | string;
}




export type loginType = {
    username: string,
    password: string
}

export type bannersType = {
    pageSize?: string,
    pageNum?: string,
    type: string,
}