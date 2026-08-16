window.__ModuleLoader__.load({ id: "dsh-skin-nebula", factory: (require) => {

	var module = { exports: {} };
	var exports = module.exports;
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

	const React = require("react");

	const name = "dsh-skin-nebula";
	const inject = ["theme", "slots"];

	const STORAGE_KEY = "dsh-skin-nebula:skin";
	const OPACITY_KEY = "dsh-skin-nebula:opacity";

	// Slider value 0-100 (default 50) → surface-alpha multiplier 1.4-0.6:
	// higher slider = more transparent = more artwork.
	const DEFAULT_OPACITY = 50;
	const opacityFactor = (v) => 1.4 - (v / 100) * 0.8;

	// ---- skin registry -------------------------------------------------------
	// Accents are "r, g, b" fragments so alpha variants can be derived; each
	// skin ships a dark and a light artwork under /skin-nebula/.
	const SKINS = [
		{
			id: "ninja",
			darkAccent: "34, 211, 238", darkAccentSoft: "103, 232, 249",
			lightAccent: "8, 145, 178", lightAccentDeep: "14, 116, 144",
			images: { dark: "ninja-dark.png", light: "ninja-light.png" },
		},
		{
			id: "nebula",
			darkAccent: "167, 139, 250", darkAccentSoft: "196, 181, 253",
			lightAccent: "124, 58, 237", lightAccentDeep: "109, 40, 217",
			images: { dark: "nebula-dark.png", light: "nebula-light.png" },
		},
		{
			id: "sakura",
			darkAccent: "251, 113, 133", darkAccentSoft: "253, 164, 175",
			lightAccent: "225, 29, 72", lightAccentDeep: "190, 18, 60",
			images: { dark: "sakura-dark.png", light: "sakura-light.png" },
		},
	];

	// ---- static scale (shared by every skin) ---------------------------------
	// Sidebar, cards, and third-party panels read --dsw-static-neutral-bluish-*
	// directly, bypassing the alias layer, so the surface end of the scale is
	// retinted here. Dark-end statics keep their stock value in light mode and
	// vice versa; text/icon statics (200-700, 1000) are left untouched.
	function staticTokens(k) {
		// s(): surface alpha scaled by the user's transparency factor, capped
		// just below opaque so the artwork always reads through a little.
		const s = (rgb, a) => `rgba(${rgb}, ${Math.min(0.98, a * k).toFixed(3)})`;
		return {
			"--dsw-static-neutral-bluish-950": { light: "rgb(21, 21, 23)", dark: s("7, 10, 22", 0.55) },
			"--dsw-static-neutral-bluish-900": { light: "rgb(27, 27, 28)", dark: s("9, 13, 28", 0.55) },
			"--dsw-static-neutral-bluish-875": { light: "rgb(35, 35, 36)", dark: s("12, 17, 34", 0.60) },
			"--dsw-static-neutral-bluish-850": { light: "rgb(44, 44, 46)", dark: s("16, 22, 42", 0.62) },
			"--dsw-static-neutral-bluish-800": { light: "rgb(53, 54, 56)", dark: s("21, 29, 54", 0.72) },
			"--dsw-static-neutral-bluish-750": { light: "rgb(67, 69, 74)", dark: s("28, 38, 68", 0.80) },
			"--dsw-static-neutral-bluish-00": { light: s("255, 255, 255", 0.62), dark: "rgb(255, 255, 255)" },
			"--dsw-static-neutral-bluish-50": { light: s("249, 251, 255", 0.66), dark: "rgb(249, 250, 251)" },
			"--dsw-static-neutral-bluish-60": { light: s("246, 249, 255", 0.70), dark: "rgb(249, 250, 251)" },
			"--dsw-static-neutral-bluish-75": { light: s("243, 247, 255", 0.72), dark: "rgb(241, 243, 245)" },
			"--dsw-static-neutral-bluish-100": { light: s("240, 246, 255", 0.75), dark: "rgb(235, 238, 242)" },
			"--dsw-static-neutral-bluish-150": { light: s("238, 244, 255", 0.90), dark: "rgb(233, 236, 242)" },
		};
	}

	// ---- alias layer ---------------------------------------------------------
	// Shared translucent surfaces plus the skin's accent family. Every value is
	// a { light, dark } pair so neither scheme bleeds into the other.
	function aliasTokens(skin, k) {
		const dk = (a) => `rgba(${skin.darkAccent}, ${a})`;
		const lt = (a) => `rgba(${skin.lightAccent}, ${a})`;
		// surface alphas follow the transparency factor; accent tints do not
		const s = (rgb, a) => `rgba(${rgb}, ${Math.min(0.98, a * k).toFixed(3)})`;
		// overlay surfaces scale too but keep a readability floor
		const so = (rgb, a) => `rgba(${rgb}, ${Math.min(0.98, Math.max(0.8, a * k)).toFixed(3)})`;
		return {
			// surfaces: transparent enough that the artwork reads through
			"--dsw-alias-bg-base": { light: s("247, 250, 255", 0.45), dark: s("6, 9, 20", 0.45) },
			"--dsw-alias-bg-layer-1": { light: s("255, 255, 255", 0.55), dark: s("11, 16, 32", 0.55) },
			"--dsw-alias-bg-layer-2": { light: s("255, 255, 255", 0.62), dark: s("15, 21, 40", 0.60) },
			"--dsw-alias-bg-layer-3": { light: s("255, 255, 255", 0.72), dark: s("20, 28, 52", 0.72) },
			"--dsw-alias-bg-module-platform": { light: s("255, 255, 255", 0.60), dark: s("18, 25, 47", 0.62) },
			// overlays/menus stay near-opaque for readability
			"--dsw-alias-bg-overlay": { light: so("252, 254, 255", 0.97), dark: so("20, 28, 52", 0.96) },
			"--dsw-alias-toast-bg": { light: so("252, 254, 255", 0.97), dark: so("16, 22, 42", 0.96) },
			"--dsw-alias-tooltip-bg": { light: so("30, 41, 59", 0.95), dark: so("16, 22, 42", 0.96) },
			"--dsw-alias-bg-multi-select": { light: lt(0.10), dark: dk(0.14) },
			"--dsw-alias-bg-skeleton": { light: lt(0.08), dark: dk(0.08) },
			// borders
			"--dsw-alias-border-l1": { light: lt(0.14), dark: dk(0.12) },
			"--dsw-alias-border-l2": { light: lt(0.24), dark: dk(0.22) },
			"--dsw-alias-border-l2-darkmode-thin": { light: lt(0.24), dark: dk(0.18) },
			"--dsw-alias-border-l3": { light: lt(0.32), dark: dk(0.30) },
			"--dsw-alias-border-l4": { light: lt(0.45), dark: dk(0.42) },
			// brand + primary actions
			"--dsw-alias-brand-primary": { light: `rgb(${skin.lightAccent})`, dark: `rgb(${skin.darkAccent})` },
			"--dsw-alias-brand-text": { light: `rgb(${skin.lightAccentDeep})`, dark: `rgb(${skin.darkAccentSoft})` },
			"--dsw-alias-button-primary-hover": { light: `rgb(${skin.lightAccentDeep})`, dark: `rgb(${skin.darkAccentSoft})` },
			"--dsw-alias-button-primary-dimmed": { light: lt(0.45), dark: dk(0.45) },
			// secondary buttons and hovers
			"--dsw-alias-button-elevated-fill": { light: s("255, 255, 255", 0.70), dark: s("24, 33, 60", 0.75) },
			"--dsw-alias-button-floating-fill": { light: s("255, 255, 255", 0.80), dark: s("24, 33, 60", 0.85) },
			"--dsw-alias-button-floating-hover": { light: s("240, 248, 255", 0.90), dark: s("32, 44, 78", 0.90) },
			"--dsw-alias-button-ghost-active-border": { light: lt(0.50), dark: dk(0.50) },
			"--dsw-alias-button-ghost-active-fill": { light: lt(0.10), dark: dk(0.12) },
			"--dsw-alias-button-ghost-active-hover": { light: lt(0.16), dark: dk(0.18) },
			"--dsw-alias-button-tool-bar-fill": { light: s("255, 255, 255", 0.65), dark: s("21, 29, 54", 0.70) },
			"--dsw-alias-button-tool-bar-hover": { light: lt(0.12), dark: dk(0.14) },
			"--dsw-alias-interactive-bg-hover": { light: lt(0.10), dark: dk(0.10) },
			"--dsw-alias-interactive-bg-active": { light: lt(0.16), dark: dk(0.16) },
			"--dsw-alias-interactive-bg-hover-accent": { light: lt(0.14), dark: dk(0.14) },
			"--dsw-alias-interactive-bg-hover-solid": { light: "rgba(228, 240, 250, 0.95)", dark: "rgba(28, 38, 68, 0.95)" },
			// text: subtle cool cast on secondary roles only; primary stays stock
			"--dsw-alias-label-secondary": { light: "rgb(75, 94, 112)", dark: "rgb(163, 184, 205)" },
			"--dsw-alias-label-primary-bluish": { light: `rgb(${skin.lightAccentDeep})`, dark: `rgb(${skin.darkAccentSoft})` },
			// markdown/code surfaces
			"--dsw-alias-markdown-code-block": { light: s("240, 246, 254", 0.75), dark: s("9, 13, 27", 0.72) },
			"--dsw-alias-markdown-code-block-banner": { light: s("230, 240, 252", 0.85), dark: s("14, 19, 38", 0.85) },
			"--dsw-alias-markdown-inline-code": { light: lt(0.10), dark: dk(0.12) },
			// scrollbars
			"--dsw-alias-scrollbar-bg-l1": { light: lt(0.25), dark: dk(0.25) },
			"--dsw-alias-scrollbar-hover-l1": { light: lt(0.45), dark: dk(0.45) },
			"--dsw-alias-scrollbar-bg-l2": { light: lt(0.25), dark: dk(0.25) },
			"--dsw-alias-scrollbar-hover-l2": { light: lt(0.45), dark: dk(0.45) },
		};
	}

	// The backdrop is body-level so it needs no product DOM selectors; the theme
	// presenter owns body[data-ds-dark-theme], which doubles as the scheme switch.
	function backdropCss(skin) {
		return [
			"body {",
			`  background-image: linear-gradient(rgba(247, 250, 255, 0), rgba(247, 250, 255, 0.15)), url('/skin-nebula/${skin.images.light}');`,
			"  background-size: cover;",
			"  background-position: center;",
			"  background-attachment: fixed;",
			"}",
			"body[data-ds-dark-theme] {",
			`  background-image: linear-gradient(rgba(4, 6, 14, 0.02), rgba(4, 6, 14, 0.22)), url('/skin-nebula/${skin.images.dark}');`,
			"}",
		].join("\n");
	}

	// Switcher UI styling, static across skins (colors ride on theme vars).
	const BUTTON_CSS = [
		".dshSkinSwitcher { position: absolute; top: 44px; right: 16px; display: flex; flex-direction: column; align-items: flex-end; }",
		".dshSkinSwitcherBtn {",
		"  display: flex; align-items: center; justify-content: center;",
		"  width: 32px; height: 32px; border-radius: 10px; cursor: pointer;",
		"  background: var(--dsw-alias-button-floating-fill);",
		"  border: 1px solid var(--dsw-alias-border-l2);",
		"  color: var(--dsw-alias-label-secondary);",
		"  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);",
		"}",
		".dshSkinSwitcherBtn:hover {",
		"  background: var(--dsw-alias-button-floating-hover);",
		"  color: var(--dsw-alias-brand-text);",
		"  border-color: var(--dsw-alias-border-l3);",
		"}",
		".dshSkinSwitcherMenu {",
		"  margin-top: 6px; min-width: 148px; padding: 4px;",
		"  background: var(--dsw-alias-bg-overlay);",
		"  border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;",
		"  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);",
		"}",
		".dshSkinSwitcherItem {",
		"  display: flex; align-items: center; gap: 8px; width: 100%;",
		"  padding: 6px 10px; border: none; border-radius: 7px; cursor: pointer;",
		"  background: transparent; color: var(--dsw-alias-label-primary);",
		"  font: inherit; font-size: 13px; text-align: left;",
		"}",
		".dshSkinSwitcherItem:hover { background: var(--dsw-alias-interactive-bg-hover); }",
		".dshSkinSwitcherItem[data-active] { color: var(--dsw-alias-brand-text); }",
		".dshSkinSwitcherDot { width: 8px; height: 8px; border-radius: 50%; flex: none; }",
		".dshSkinSwitcherCheck { margin-left: auto; }",
		".dshSkinSwitcherBackdrop { position: fixed; inset: 0; }",
		".dshSkinSwitcherOpacity {",
		"  margin-top: 4px; padding: 6px 10px 8px;",
		"  border-top: 1px solid var(--dsw-alias-border-l1);",
		"}",
		".dshSkinSwitcherOpacityLabel {",
		"  display: flex; justify-content: space-between; margin-bottom: 4px;",
		"  font-size: 12px; color: var(--dsw-alias-label-secondary);",
		"}",
		".dshSkinSwitcherOpacity input[type=range] {",
		"  width: 100%; margin: 0; accent-color: var(--dsw-alias-brand-primary);",
		"}",
	].join("\n");

	// Locale dictionaries; the locale service is optional so the plugin still
	// works in compositions without it (labels then fall back to English).
	const NS = "dsh-skin-nebula";
	const DICTS = {
		zh: { tooltip: "切换皮肤", opacity: "透明度", "skin.ninja": "忍者", "skin.nebula": "星云", "skin.sakura": "樱花" },
		en: { tooltip: "Switch skin", opacity: "Transparency", "skin.ninja": "Ninja", "skin.nebula": "Nebula", "skin.sakura": "Sakura" },
	};

// The de-facto "skin/outfit" glyph: a t-shirt outline.
	function ShirtIcon() {
		return React.createElement("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true },
			React.createElement("path", {
				d: "M16.2 4 20 6.5c.4.3.6.8.4 1.3l-1.2 3c-.2.5-.8.8-1.3.6l-1.4-.5v8.1c0 .6-.4 1-1 1H8.5c-.6 0-1-.4-1-1v-8.1l-1.4.5c-.5.2-1.1-.1-1.3-.6l-1.2-3c-.2-.5 0-1 .4-1.3L7.8 4h2.4c.1 1 .8 1.7 1.8 1.7S13.7 5 13.8 4h2.4Z",
				stroke: "currentColor", "stroke-width": 1.5, "stroke-linejoin": "round",
			}),
		);
	}

	function apply(ctx) {
		let current = SKINS.find((s) => s.id === localStorage.getItem(STORAGE_KEY)) ?? SKINS[0];
		const storedOpacity = Number(localStorage.getItem(OPACITY_KEY));
		let opacity = Number.isFinite(storedOpacity) && localStorage.getItem(OPACITY_KEY) !== null
			? Math.min(100, Math.max(0, storedOpacity))
			: DEFAULT_OPACITY;
		let disposeTokens;
		const listeners = new Set();

		const backdropTag = document.createElement("style");
		backdropTag.id = "dsh-skin-nebula-css";
		const buttonTag = document.createElement("style");
		buttonTag.id = "dsh-skin-nebula-button-css";
		buttonTag.textContent = BUTTON_CSS;

		// Re-calling overrideTokens with the same source replaces the whole
		// layer, so switching is one call; only the latest disposer matters.
		const applySkin = (skin) => {
			current = skin;
			const k = opacityFactor(opacity);
			disposeTokens = ctx.theme.overrideTokens("dsh-skin-nebula", {
				...staticTokens(k),
				...aliasTokens(skin, k),
			});
			backdropTag.textContent = backdropCss(skin);
			for (const notify of listeners) notify();
		};

		ctx.effect(() => {
			document.head.appendChild(buttonTag);
			document.head.appendChild(backdropTag);
			applySkin(current);
			return () => {
				disposeTokens();
				backdropTag.remove();
				buttonTag.remove();
			};
		}, "dsh-skin-nebula: skin layer");

		// Optional locale service: registered when present, English fallback when not.
		let t = (key) => DICTS.en[key] ?? key;
		const locale = ctx.get("locale");
		if (locale !== undefined) {
			ctx.effect(() => locale.register(NS, DICTS), "dsh-skin-nebula: dictionaries");
			t = locale.bind(NS);
		}

		function SkinSwitcher() {
			const forceRender = React.useReducer((x) => x + 1, 0)[1];
			const [open, setOpen] = React.useState(false);
			React.useEffect(() => {
				listeners.add(forceRender);
				return () => listeners.delete(forceRender);
			}, []);
			const items = SKINS.map((skin) => React.createElement("button", {
				key: skin.id,
				className: "dshSkinSwitcherItem",
				"data-active": skin === current ? "" : undefined,
				onClick: () => {
					localStorage.setItem(STORAGE_KEY, skin.id);
					applySkin(skin);
					setOpen(false);
				},
			},
				React.createElement("span", { className: "dshSkinSwitcherDot", style: { background: `rgb(${skin.darkAccent})` } }),
				t(`skin.${skin.id}`),
				skin === current ? React.createElement("span", { className: "dshSkinSwitcherCheck" }, "✓") : null,
			));
			const opacityRow = React.createElement("div", { className: "dshSkinSwitcherOpacity" },
				React.createElement("div", { className: "dshSkinSwitcherOpacityLabel" },
					React.createElement("span", null, t("opacity")),
					React.createElement("span", null, `${opacity}%`),
				),
				React.createElement("input", {
					type: "range", min: 0, max: 100, step: 5, value: opacity,
					onChange: (e) => {
						opacity = Math.min(100, Math.max(0, Number(e.target.value)));
						localStorage.setItem(OPACITY_KEY, String(opacity));
						applySkin(current);
					},
				}),
			);
			return React.createElement(React.Fragment, null,
				open ? React.createElement("div", { className: "dshSkinSwitcherBackdrop", onClick: () => setOpen(false) }) : null,
				React.createElement("div", { className: "dshSkinSwitcher" },
					React.createElement("button", {
						className: "dshSkinSwitcherBtn",
						title: t("tooltip"),
						"aria-label": t("tooltip"),
						onClick: () => setOpen((v) => !v),
					}, React.createElement(ShirtIcon)),
					open ? React.createElement("div", { className: "dshSkinSwitcherMenu" }, items, opacityRow) : null,
				),
			);
		}

		ctx.slots.inject("shell.overlay", () => ctx.slots.register(
			{ name: "shell.overlay", id: "dsh-skin-switcher", label: () => "dsh-skin-nebula" },
			SkinSwitcher,
		));
	}

	exports.name = name;
	exports.inject = inject;
	exports.apply = apply;
	return module.exports;
} });
