# 水妞妞的工作台：安卓 App 打包说明

这个项目已经加入 Capacitor 配置，可以打包成真正的安卓 App（APK），安装到华为手机后会像独立应用一样运行，而不是浏览器网页快捷方式。

## 需要准备

1. 一台电脑
2. 安装 Node.js
3. 安装 Android Studio
4. 安装 JDK（Android Studio 通常会一起配置）

## 打包步骤

在项目文件夹 `reading-writing-workbench` 中执行：

```bash
npm install
npm run cap:add:android
npm run cap:sync
npm run cap:open
```

执行 `npm run cap:open` 后会打开 Android Studio。

## 在 Android Studio 中生成 APK

1. 等待 Android Studio 自动同步完成
2. 点击顶部菜单 `Build`
3. 选择 `Build Bundle(s) / APK(s)`
4. 选择 `Build APK(s)`
5. 构建完成后，点击右下角提示中的 `locate`
6. 找到生成的 `.apk` 文件

## 安装到华为手机

1. 将 `.apk` 文件发送到华为手机
2. 在手机上打开 APK
3. 如果提示风险或未知来源，进入系统设置允许本次安装
4. 安装完成后，桌面会出现「水妞妞的工作台」

## 更新 App 内容

如果以后修改了页面内容：

```bash
npm run cap:sync
```

然后重新在 Android Studio 中生成 APK 即可。

