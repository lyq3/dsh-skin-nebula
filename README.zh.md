# dsh-skin-nebula

[English](README.md) | 中文

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 动漫皮肤包——半透明表面叠加 AI 生成的高清背景画，右上角"衣服"按钮弹出菜单换肤，内置五套主题，另带透明度滑杆。

## 内置皮肤

| 皮肤 | 主色 | 暗色背景 | 亮色背景 |
| --- | --- | --- | --- |
| 忍者 | 霓虹青 | 月下持刀忍者 + 赛博城市夜景 | 晴空跃身的白衣忍者 |
| 樱花 | 绯红 | 鸟居红刃女忍 + 血月灯笼村 | 樱花晴空女忍 |
| 竹林 | 翡翠绿 | 夜竹林翠刃剑客 + 萤火虫 | 晨雾竹海透阳光 |
| 落日 | 琥珀橙 | 山脊残阳前的斗笠浪人 | 金色时刻的田园 |
| 苍龙 | 靛蓝 | 风暴夜海上盘旋的东方巨龙 | 晴空云间白龙 |

菜单里还有透明度滑杆（0-100%，默认 50%）：越高背景越透出；菜单弹层保有可读性下限。皮肤选择与透明度都按浏览器存于 `localStorage`。每套皮肤覆盖明暗两种配色方案，背景跟随 `body[data-ds-dark-theme]` 自动切换。

## 安装

```sh
dsh plugin --profile web add file:/path/to/dsh-skin-nebula
```

安装后确认 `~/.dsh/profiles/web/package.json` 的 `dsh.profile.bundles` 数组包含 `dsh-skin-nebula`（`dsh plugin add` 会自动写入），重启 dsh 生效。

卸载：`dsh plugin --profile web remove dsh-skin-nebula`，并从 `bundles` 移除。

## 实现结构

- `index.mjs` — host 侧插件：在 dsh webserver 注册 `/skin-nebula` 前缀路由，伺服 `assets/` 里的背景画（prefix 路由注册时**不能带尾斜杠**）。
- `client/client.js` — 浏览器侧插件（`__ModuleLoader__` bundle，手写、无打包器）：
  - 每套皮肤一层 `ctx.theme.overrideTokens()`，同时覆盖 `--dsw-alias-*` 语义 token 与 `--dsw-static-neutral-bluish-*` 表面刻度（侧边栏及部分面板直读 static，绕过 alias 层）；所有值都是 `{ light, dark }` 成对，互不串色；同 source 重复调用即整层原子替换，换肤零残留；
  - body 级背景样式表（不碰产品 DOM 选择器）；
  - 切换器注册在 `shell.overlay` slot，文案经可选 `locale` 服务提供 zh/en 双语。
- `assets/` — 十张 1536×1024 背景画（每套皮肤明暗各一），由 gpt-image-2 生成。
- `cordis.patch.yml` — 把 host 插件插入 profile 的 bundle 层。

## 兼容性

基于 `@deepseek-ai/dsh` 0.1.0-rc.6（Developer Preview）开发。rc 版本可能变更 `dsh.client` 契约或 token 清单；升级 dsh 后若皮肤失效，先对照 `dsh-client-ui-theme` 的样式表核对 alias/static token 名。

## 许可

MIT
