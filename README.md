# dsh-skin-nebula

深空霓虹皮肤 for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI。

深色半透明表面 + 随皮肤变化的点缀色，内置三套 AI 生成的动漫风高清背景，侧边栏底部有调色盘按钮一键循环切换（选择存 localStorage）：

- **忍者**（霓虹青）：月下持刀忍者 + 赛博城市夜景 / 晴空白衣忍者
- **星云**（电紫）：深空星云 / 极光薄雾
- **樱花**（绯红）：鸟居红刃女忍 + 血月灯笼村 / 樱花晴空女忍

表面层半透明让背景透出来；弹层与菜单保持近不透明以保证可读性。

## 结构

- `index.mjs` — host 侧插件：在 dsh webserver 上注册 `/skin-nebula/` 前缀路由，伺服 `assets/` 里的高清背景图。
- `client/client.js` — 浏览器侧插件（`__ModuleLoader__` bundle）：
  - 通过 `ctx.theme.overrideTokens()` 叠加 `--dsw-alias-*` 语义层 + `--dsw-static-neutral-bluish-*` 表面刻度覆盖（全部 light/dark 双值；重复调用同 source 即整层替换，皮肤切换零残留）；
  - 注入 body 背景图样式表，跟随 `body[data-ds-dark-theme]` 自动切换明暗背景；
  - 在 `sidebar.footer.action` slot 注册调色盘切换按钮。
- `assets/` — codex（gpt-image-2）生成的 1536×1024 高清背景，每套皮肤 dark/light 各一张（ninja / nebula / sakura 共 6 张）。
- `cordis.patch.yml` — 把 host 插件插进 profile 的 bundle 层。

## 安装

```sh
dsh plugin --profile web add file:/path/to/dsh-skin-nebula
```

然后在 `~/.dsh/profiles/web/package.json` 的 `dsh.profile.bundles` 数组末尾加入 `"dsh-skin-nebula"`，重启 dsh 生效。

卸载：从 `bundles` 数组移除并 `dsh plugin --profile web remove dsh-skin-nebula`。

## 兼容性

针对 `@deepseek-ai/dsh` 0.1.0-rc.6（Developer Preview）开发；rc 版本存在 breaking change 风险，升级 dsh 后如皮肤失效，优先核对 `dsh.client` 声明与 `--dsw-alias-*` token 清单是否变化。
