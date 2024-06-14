export interface AccessToken {
  tokenValue: string;
  createTime: number;
  expireTime: number;
}

export interface User {
  userId: string;
  username: string,
  phoneNumber?: string,
  name: string,
  accessToken: AccessToken;
  authorities?: string[]
}

export interface LoginForm {
  username: string;
  password: string;
  remember?: boolean
}
