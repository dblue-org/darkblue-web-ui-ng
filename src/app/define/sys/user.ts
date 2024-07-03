import { SimpleRole } from './role';

export interface AccessToken {
  tokenValue: string;
  createTime: number;
  expireTime: number;
}

export interface LoginUser {
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

export interface DepartmentNode {
  deptId: string;
  deptName: string;
  parentId?: string;
  expanded?: boolean;
  children?: DepartmentNode[]
}

export interface Department {
  deptId: string;
  deptName: string;
  parentId?: string;
  masterUserId?: string;
}

export interface UserSearchForm {
  name?: string;
  username?: string,
  phoneNumber?: string,
  deptId?: string;
  page: number,
  pageSize: number
}

export interface User {
  userId: string;
  name: string;
  username: string,
  phoneNumber?: string,
  deptId: string;
  deptName: string;
  isEnable: boolean;
  lastLoginTime?: string;
  roles?: SimpleRole[]
}

export interface SimpleUser {
  userId: string;
  name: string;
  username: string,
  phoneNumber?: string,
}

export interface LoginLog {
  platform: string
  loginType: string
  loginTime: string
  loginIp: string
  userAgent: string
}
