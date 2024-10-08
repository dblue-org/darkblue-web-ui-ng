# Darkblue Web UI

<p align="center">
    <img src="public/assets/images/logo-blue.svg" width="200">
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/4e2c0226-e704-47b6-a0ee-3d968057b1c4/deploy-status)](https://app.netlify.com/sites/darkblue-angular-demo/deploys)
[![License](https://img.shields.io/badge/License-Apache%202-blue)](https://www.apache.org/licenses/LICENSE-2.0)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](https://gitee.com/d-blue/darkblue-web-ui-ng/releases)

深蓝系统的前端项目，项目使用 Angular 18 + ng-zorro-antd 18。

- 文档地址：https://dblue.org/docs/angular/introduction
- 演示地址：https://angular.darkblue.dblue.org

## 快速开始

执行 `ng serve` 启动项目，浏览器中打开 `http://localhost:4200/` 即可访问项目。

使用 `ng build` 打包生产环境代码。

## 多环境配置

目前提供了3套环境，开发环境、测试环境、生产环境。环境配置在 `src/environments` 下。

- 开发环境
  - 配置文件：`src/environments/environment.development.ts`
  - 打包命令：`ng build:dev`
- 测试环境
  - 配置文件：`src/environments/environment.testing.ts`
  - 打包命令：`ng build:test`
- 生产环境
  - 配置文件：`src/environments/environment.ts`
  - 打包命令：`ng build`

**如何添加新的环境？**

如要添加一个 `stable` 环境。 

1. 首先在 `src/environments` 添加一个 `environment.stable.ts` 文件，注意命名。
2. 将 `environment.development.ts` 中的内容复制到 `environment.stable.ts` 文件内。
3. 修改 `angular.json` 的 `architect` -> `configurations` 下，增加下面的内容
  ```
  "stable": {
    "optimization": false,
    "extractLicenses": false,
    "sourceMap": true,
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.stable.ts"
      }
    ]
  },
  ```
4. 修改 `package.json`，在 `scripts` 中增加：`"build:stable": "ng build --configuration stable",`

完成上面的配置之后就可以使用 `npm run build:stable` 来打包 `stable` 的代码了。

## 开发进度

- 仪表盘
  - [x] 欢迎页面
  - [x] 自定义组件
- 系统管理
  - [x] 用户管理
  - [x] 用户组管理
  - [x] 职位管理
  - [x] 角色管理
  - [x] 菜单管理
  - [x] 权限管理
  - [x] 资源管理
  - 系统日志
    - [x] 登录日志
    - [x] 操作日志
  - 系统配置
    - [x] 配置参数管理
    - [x] 字典管理
- 消息管理
  - [ ] 消息模板管理
  - [ ] 待办消息管理
  - [ ] 通知消息管理
- 运维中心
  - [x] 缓存管理
