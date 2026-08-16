# dsh-skin-nebula

深空霓虹皮肤 for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI。

深海军蓝半透明表面 + 霓虹青/电紫点缀，配 AI 生成的动漫忍者高清背景：暗色主题是月下持霓虹刀的忍者+赛博城市夜景，亮色主题是晴空跃身的白衣忍者。表面层做了半透明处理，背景从内容后面透出来；弹层与菜单保持近不透明以保证可读性。

## 结构

- `index.mjs` — host 侧插件：在 dsh webserver 上注册 `/skin-nebula/` 前缀路由，伺服 `assets/` 里的高清背景图。
- `client/client.js` — 浏览器侧插件（`__ModuleLoader__` bundle）：
  - 通过 `ctx.theme.overrideTokens()` 叠加一层 `--dsw-alias-*` 语义 token 覆盖（light/dark 双值）；
  - 注入 body 背景图样式表，跟随 `body[data-ds-dark-theme]` 自动切换明暗背景。
- `assets/` — codex（gpt-image-2）生成的 1536×1024 高清背景：`ninja-dark.png` / `ninja-light.png`（动漫忍者风）。
- `cordis.patch.yml` — 把 host 插件插进 profile 的 bundle 层。

## 安装

```sh
dsh plugin --profile web add file:/path/to/dsh-skin-nebula
```

然后在 `~/.dsh/profiles/web/package.json` 的 `dsh.profile.bundles` 数组末尾加入 `"dsh-skin-nebula"`，重启 dsh 生效。

卸载：从 `bundles` 数组移除并 `dsh plugin --profile web remove dsh-skin-nebula`。

## 兼容性

针对 `@deepseek-ai/dsh` 0.1.0-rc.6（Developer Preview）开发；rc 版本存在 breaking change 风险，升级 dsh 后如皮肤失效，优先核对 `dsh.client` 声明与 `--dsw-alias-*` token 清单是否变化。
