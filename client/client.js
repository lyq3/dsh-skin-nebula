window.__ModuleLoader__.load({ id: "dsh-skin-nebula", factory: (require) => {

	var module = { exports: {} };
	var exports = module.exports;
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

	const React = require("react");

	const name = "dsh-skin-nebula";
	const inject = ["theme", "slots"];

	const STORAGE_KEY = "dsh-skin-nebula:skin";

	// ---- skin registry -------------------------------------------------------
	// Accents are "r, g, b" fragments so alpha variants can be derived; each
	// skin ships a dark and a light artwork under /skin-nebula/.
	const SKINS = [
		{
			id: "ninja", label: "忍者",
			darkAccent: "34, 211, 238", darkAccentSoft: "103, 232, 249",
			lightAccent: "8, 145, 178", lightAccentDeep: "14, 116, 144",
			images: { dark: "ninja-dark.png", light: "ninja-light.png" },
		},
		{
			id: "nebula", label: "星云",
			darkAccent: "167, 139, 250", darkAccentSoft: "196, 181, 253",
			lightAccent: "124, 58, 237", lightAccentDeep: "109, 40, 217",
			images: { dark: "nebula-dark.png", light: "nebula-light.png" },
		},
		{
			id: "sakura", label: "樱花",
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
	const STATIC_TOKENS = {
		"--dsw-static-neutral-bluish-950": { light: "rgb(21, 21, 23)", dark: "rgba(7, 10, 22, 0.55)" },
		"--dsw-static-neutral-bluish-900": { light: "rgb(27, 27, 28)", dark: "rgba(9, 13, 28, 0.55)" },
		"--dsw-static-neutral-bluish-875": { light: "rgb(35, 35, 36)", dark: "rgba(12, 17, 34, 0.60)" },
		"--dsw-static-neutral-bluish-850": { light: "rgb(44, 44, 46)", dark: "rgba(16, 22, 42, 0.62)" },
		"--dsw-static-neutral-bluish-800": { light: "rgb(53, 54, 56)", dark: "rgba(21, 29, 54, 0.72)" },
		"--dsw-static-neutral-bluish-750": { light: "rgb(67, 69, 74)", dark: "rgba(28, 38, 68, 0.80)" },
		"--dsw-static-neutral-bluish-00": { light: "rgba(255, 255, 255, 0.62)", dark: "rgb(255, 255, 255)" },
		"--dsw-static-neutral-bluish-50": { light: "rgba(249, 251, 255, 0.66)", dark: "rgb(249, 250, 251)" },
		"--dsw-static-neutral-bluish-60": { light: "rgba(246, 249, 255, 0.70)", dark: "rgb(249, 250, 251)" },
		"--dsw-static-neutral-bluish-75": { light: "rgba(243, 247, 255, 0.72)", dark: "rgb(241, 243, 245)" },
		"--dsw-static-neutral-bluish-100": { light: "rgba(240, 246, 255, 0.75)", dark: "rgb(235, 238, 242)" },
		"--dsw-static-neutral-bluish-150": { light: "rgba(238, 244, 255, 0.90)", dark: "rgb(233, 236, 242)" },
	};

	// ---- alias layer ---------------------------------------------------------
	// Shared translucent surfaces plus the skin's accent family. Every value is
	// a { light, dark } pair so neither scheme bleeds into the other.
	function aliasTokens(skin) {
		const dk = (a) => `rgba(${skin.darkAccent}, ${a})`;
		const lt = (a) => `rgba(${skin.lightAccent}, ${a})`;
		return {
			// surfaces: transparent enough that the artwork reads through
			"--dsw-alias-bg-base": { light: "rgba(247, 250, 255, 0.45)", dark: "rgba(6, 9, 20, 0.45)" },
			"--dsw-alias-bg-layer-1": { light: "rgba(255, 255, 255, 0.55)", dark: "rgba(11, 16, 32, 0.55)" },
			"--dsw-alias-bg-layer-2": { light: "rgba(255, 255, 255, 0.62)", dark: "rgba(15, 21, 40, 0.60)" },
			"--dsw-alias-bg-layer-3": { light: "rgba(255, 255, 255, 0.72)", dark: "rgba(20, 28, 52, 0.72)" },
			"--dsw-alias-bg-module-platform": { light: "rgba(255, 255, 255, 0.60)", dark: "rgba(18, 25, 47, 0.62)" },
			// overlays/menus stay near-opaque for readability
			"--dsw-alias-bg-overlay": { light: "rgba(252, 254, 255, 0.97)", dark: "rgba(20, 28, 52, 0.96)" },
			"--dsw-alias-toast-bg": { light: "rgba(252, 254, 255, 0.97)", dark: "rgba(16, 22, 42, 0.96)" },
			"--dsw-alias-tooltip-bg": { light: "rgba(30, 41, 59, 0.95)", dark: "rgba(16, 22, 42, 0.96)" },
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
			"--dsw-alias-button-elevated-fill": { light: "rgba(255, 255, 255, 0.70)", dark: "rgba(24, 33, 60, 0.75)" },
			"--dsw-alias-button-floating-fill": { light: "rgba(255, 255, 255, 0.80)", dark: "rgba(24, 33, 60, 0.85)" },
			"--dsw-alias-button-floating-hover": { light: "rgba(240, 248, 255, 0.90)", dark: "rgba(32, 44, 78, 0.90)" },
			"--dsw-alias-button-ghost-active-border": { light: lt(0.50), dark: dk(0.50) },
			"--dsw-alias-button-ghost-active-fill": { light: lt(0.10), dark: dk(0.12) },
			"--dsw-alias-button-ghost-active-hover": { light: lt(0.16), dark: dk(0.18) },
			"--dsw-alias-button-tool-bar-fill": { light: "rgba(255, 255, 255, 0.65)", dark: "rgba(21, 29, 54, 0.70)" },
			"--dsw-alias-button-tool-bar-hover": { light: lt(0.12), dark: dk(0.14) },
			"--dsw-alias-interactive-bg-hover": { light: lt(0.10), dark: dk(0.10) },
			"--dsw-alias-interactive-bg-active": { light: lt(0.16), dark: dk(0.16) },
			"--dsw-alias-interactive-bg-hover-accent": { light: lt(0.14), dark: dk(0.14) },
			"--dsw-alias-interactive-bg-hover-solid": { light: "rgba(228, 240, 250, 0.95)", dark: "rgba(28, 38, 68, 0.95)" },
			// text: subtle cool cast on secondary roles only; primary stays stock
			"--dsw-alias-label-secondary": { light: "rgb(75, 94, 112)", dark: "rgb(163, 184, 205)" },
			"--dsw-alias-label-primary-bluish": { light: `rgb(${skin.lightAccentDeep})`, dark: `rgb(${skin.darkAccentSoft})` },
			// markdown/code surfaces
			"--dsw-alias-markdown-code-block": { light: "rgba(240, 246, 254, 0.75)", dark: "rgba(9, 13, 27, 0.72)" },
			"--dsw-alias-markdown-code-block-banner": { light: "rgba(230, 240, 252, 0.85)", dark: "rgba(14, 19, 38, 0.85)" },
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

	// Switcher button styling, static across skins (colors ride on theme vars).
	const BUTTON_CSS = [
		".dshSkinNebulaBtn {",
		"  display: flex; align-items: center; justify-content: center; gap: 6px;",
		"  height: 28px; min-width: 28px; padding: 0 6px;",
		"  border: none; border-radius: 8px; background: transparent;",
		"  color: var(--dsw-alias-label-secondary); cursor: pointer;",
		"  font: inherit; font-size: 12px; line-height: 28px; white-space: nowrap;",
		"}",
		".dshSkinNebulaBtn:hover {",
		"  background: var(--dsw-alias-interactive-bg-hover);",
		"  color: var(--dsw-alias-brand-text);",
		"}",
	].join("\n");

	function PaletteIcon() {
		return React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true },
			React.createElement("path", {
				d: "M8 1.5a6.5 6.5 0 1 0 0 13c.9 0 1.3-.6 1.3-1.2 0-.5-.2-.8-.5-1.1-.3-.3-.5-.6-.5-1 0-.7.6-1.2 1.4-1.2h1.5c1.8 0 3.3-1.3 3.3-3.1C14.5 4 11.6 1.5 8 1.5Z",
				stroke: "currentColor", "stroke-width": 1.3,
			}),
			React.createElement("circle", { cx: 5.2, cy: 6.2, r: 1, fill: "currentColor" }),
			React.createElement("circle", { cx: 8, cy: 4.6, r: 1, fill: "currentColor" }),
			React.createElement("circle", { cx: 10.8, cy: 6.2, r: 1, fill: "currentColor" }),
		);
	}

	function apply(ctx) {
		let current = SKINS.find((s) => s.id === localStorage.getItem(STORAGE_KEY)) ?? SKINS[0];
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
			disposeTokens = ctx.theme.overrideTokens("dsh-skin-nebula", {
				...STATIC_TOKENS,
				...aliasTokens(skin),
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

		function SkinButton(props) {
			const forceRender = React.useReducer((x) => x + 1, 0)[1];
			React.useEffect(() => {
				listeners.add(forceRender);
				return () => listeners.delete(forceRender);
			}, []);
			const next = SKINS[(SKINS.indexOf(current) + 1) % SKINS.length];
			return React.createElement("button", {
				className: "dshSkinNebulaBtn",
				title: `切换皮肤：${current.label} → ${next.label}`,
				onClick: () => {
					localStorage.setItem(STORAGE_KEY, next.id);
					applySkin(next);
				},
			},
				React.createElement(PaletteIcon),
				props.wide ? React.createElement("span", null, current.label) : null,
			);
		}

		ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register(
			{ name: "sidebar.footer.action", id: "skin-switcher" },
			(props) => React.createElement(SkinButton, { wide: props.wide }),
		));
	}

	exports.name = name;
	exports.inject = inject;
	exports.apply = apply;
	return module.exports;
} });
