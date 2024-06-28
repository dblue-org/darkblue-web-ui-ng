# Darkblue Web UI

深蓝系统的前端项目，项目使用 Angular 18 + ng-zorro-antd 18。

文档地址：https://dblud.org/docs/dblue-ui-angular

> [!warning]
> 文档咱未开放，在项目基础功能完成后，会开放文档访问，并陆续补充文档内容。

## 开始


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

## 开发进度

- 仪表盘
  - [ ] 首页
- 系统管理
  - [x] 用户管理
  - [x] 用户组管理
  - [x] 角色管理
  - [x] 权限管理
  - [x] 菜单管理
  - [ ] 资源管理
  - [ ] 职位管理
- 系统日志
  - [ ] 登录日志
  - [ ] 操作日志
- 系统配置
  - [ ] 系统参数配置
  - [ ] 字典管理
- 运维中心
  - [ ] 缓存管理
  - [ ] 通知
  - [ ] 待办管理
