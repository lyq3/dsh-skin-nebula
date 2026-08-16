# Changelog

## 0.6.0 — 2026-08-16

- Retire the Nebula skin; add **Bamboo** (emerald), **Ronin** (amber), and **Ryujin** (indigo) — five skins total.
- Artwork preview galleries in both READMEs.
- English main README + `README.zh.md`, following the dsh docs convention.

## 0.5.0 — 2026-08-16

- Adjustable transparency slider (0–100%) in the switcher menu; overlays keep a readability floor. Persists in `localStorage`.

## 0.4.0 — 2026-08-16

- Switcher moved to a top-right shirt-icon dropdown in the `shell.overlay` slot, with zh/en dictionaries through the optional `locale` service.
- MIT license and repository metadata.

## 0.3.0 — 2026-08-16

- Multi-skin support with a skin registry and a sidebar switcher; skin choice persists in `localStorage`.

## 0.2.0 — 2026-08-16

- Cover the `--dsw-static-neutral-bluish-*` surface scale in addition to the alias tokens, so the sidebar, cards, and third-party panels follow the skin.
- More transparent surfaces and richer artwork.

## 0.1.x — 2026-08-16

- Initial release: translucent token layer over AI-generated backdrops, served by a host-side `/skin-nebula` asset route.
