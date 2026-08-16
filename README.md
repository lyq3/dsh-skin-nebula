# dsh-skin-nebula

Anime skin pack for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI — translucent surfaces over AI-generated HD artwork, with a shirt-icon switcher at the top right to cycle between three built-in skins.

DeepSeek Harness Web UI 动漫皮肤包——半透明表面 + AI 生成高清背景，右上角"衣服"按钮弹出菜单一键换肤。

## Skins · 内置皮肤

| Skin | Accent | Dark artwork | Light artwork |
| --- | --- | --- | --- |
| Ninja 忍者 | neon cyan 霓虹青 | moonlit ninja over a cyberpunk skyline | white-clad ninja in a bright sky |
| Nebula 星云 | electric violet 电紫 | deep-space nebula | aurora mist |
| Sakura 樱花 | rose 绯红 | kunoichi on a torii gate under a blood moon | sakura kunoichi in a pastel sky |

The choice persists in `localStorage` per browser. Both color schemes (light/dark) are covered by every skin; the backdrop follows `body[data-ds-dark-theme]` automatically.

## Install · 安装

```sh
dsh plugin --profile web add file:/path/to/dsh-skin-nebula
```

Ensure `dsh-skin-nebula` is listed in the profile's `dsh.profile.bundles` (the `dsh plugin add` command does this automatically), then restart dsh.

安装后确认 `~/.dsh/profiles/web/package.json` 的 `dsh.profile.bundles` 数组包含 `dsh-skin-nebula`（`dsh plugin add` 会自动写入），重启 dsh 生效。

Uninstall · 卸载：`dsh plugin --profile web remove dsh-skin-nebula`，并从 `bundles` 移除。

## How it works · 实现结构

- `index.mjs` — host plugin: registers the `/skin-nebula` prefix route on the dsh webserver to serve artwork from `assets/` (prefix routes must be registered **without** a trailing slash).
- `client/client.js` — browser plugin (`__ModuleLoader__` bundle, hand-written, no bundler):
  - one `ctx.theme.overrideTokens()` layer per active skin, covering the `--dsw-alias-*` semantic tokens **and** the `--dsw-static-neutral-bluish-*` surface scale (the sidebar and some panels read statics directly and would otherwise stay stock gray); every value is a `{ light, dark }` pair so neither scheme bleeds into the other, and re-calling with the same source swaps the whole layer atomically on skin switch;
  - a body-level backdrop stylesheet (no product DOM selectors);
  - the switcher registered in the `shell.overlay` slot, with zh/en dictionaries through the optional `locale` service.
- `assets/` — six 1536×1024 artworks (dark + light per skin) generated with gpt-image-2.
- `cordis.patch.yml` — inserts the host plugin into the profile's bundle layer.

## Compatibility · 兼容性

Built against `@deepseek-ai/dsh` 0.1.0-rc.6 (Developer Preview). rc releases may break the `dsh.client` contract or the token inventory; if the skin stops applying after a dsh upgrade, re-check the alias/static token names against `dsh-client-ui-theme`'s style sheets first.

## License

MIT
