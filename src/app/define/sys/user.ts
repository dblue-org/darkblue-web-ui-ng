import { SimpleRole } from './role';
import { MenusWithPermission } from '@site/app/define/sys/menu';

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

export interface UserAddDto {
  name: string
  username: string
  phoneNumber: string
  password: string
  deptId: string
  positionId?: string
  sex?: number
  identityNo?: string
  roles: string[]
}

export interface UserUpdateDto {
  userId: string
  name: string
  username: string
  phoneNumber?: string
  deptId: string
  positionId?: string
  sex?: number
  identityNo?: string
  roles: string[]
}

export interface UserPageListVo {
  userId: string;
  name: string;
  username: string,
  phoneNumber?: string,
  deptId: string;
  deptName: string;
  positionId?: string
  positionName?: string
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

export interface UserDetailsVo extends SimpleUser {
  deptId: string
  deptName: string
  positionId: string
  positionName: string
  identityNo: string
  isEnable: boolean
  createTime: string
  lastLoginTime: string
  passwordUpdateTime: string
  isAdmin: boolean
  roleNameList: string[],
  userMenuVoList: MenusWithPermission[]
}

export interface RefUserVo {
  userId: string
  name: string
  username: string
  phoneNumber?: string
  deptId: string
  deptName: string
  positionId: string
  positionName: string
  identityNo: string
  isEnable: boolean
  createTime: string
}


