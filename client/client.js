window.__ModuleLoader__.load({ id: "dsh-skin-nebula", factory: (require) => {

	var module = { exports: {} };
	var exports = module.exports;
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

	const name = "dsh-skin-nebula";
	const inject = ["theme"];

	// Every override is a { light, dark } pair; where a token should keep the
	// product default in one scheme, that side restates the stock value so the
	// other scheme's skin never bleeds across.

	// ---- static scale --------------------------------------------------------
	// Sidebar, cards, and third-party panels read --dsw-static-neutral-bluish-*
	// directly, bypassing the alias layer, so the surface end of the scale is
	// retinted here. Dark-end statics keep their stock value in light mode and
	// vice versa; text/icon statics (200-700, 1000) are left untouched.
	const STATIC_TOKENS = {
		// dark-mode surfaces → translucent deep navy
		"--dsw-static-neutral-bluish-950": { light: "rgb(21, 21, 23)", dark: "rgba(7, 10, 22, 0.55)" },
		"--dsw-static-neutral-bluish-900": { light: "rgb(27, 27, 28)", dark: "rgba(9, 13, 28, 0.55)" },
		"--dsw-static-neutral-bluish-875": { light: "rgb(35, 35, 36)", dark: "rgba(12, 17, 34, 0.60)" },
		"--dsw-static-neutral-bluish-850": { light: "rgb(44, 44, 46)", dark: "rgba(16, 22, 42, 0.62)" },
		"--dsw-static-neutral-bluish-800": { light: "rgb(53, 54, 56)", dark: "rgba(21, 29, 54, 0.72)" },
		"--dsw-static-neutral-bluish-750": { light: "rgb(67, 69, 74)", dark: "rgba(28, 38, 68, 0.80)" },
		// light-mode surfaces → translucent cool white
		"--dsw-static-neutral-bluish-00": { light: "rgba(255, 255, 255, 0.62)", dark: "rgb(255, 255, 255)" },
		"--dsw-static-neutral-bluish-50": { light: "rgba(249, 251, 255, 0.66)", dark: "rgb(249, 250, 251)" },
		"--dsw-static-neutral-bluish-60": { light: "rgba(246, 249, 255, 0.70)", dark: "rgb(249, 250, 251)" },
		"--dsw-static-neutral-bluish-75": { light: "rgba(243, 247, 255, 0.72)", dark: "rgb(241, 243, 245)" },
		"--dsw-static-neutral-bluish-100": { light: "rgba(240, 246, 255, 0.75)", dark: "rgb(235, 238, 242)" },
		"--dsw-static-neutral-bluish-150": { light: "rgba(238, 244, 255, 0.90)", dark: "rgb(233, 236, 242)" },
	};

	// ---- alias layer ---------------------------------------------------------
	const ALIAS_TOKENS = {
		// surfaces: transparent enough that the artwork reads through
		"--dsw-alias-bg-base": { light: "rgba(247, 250, 255, 0.45)", dark: "rgba(6, 9, 20, 0.45)" },
		"--dsw-alias-bg-layer-1": { light: "rgba(255, 255, 255, 0.55)", dark: "rgba(11, 16, 32, 0.55)" },
		"--dsw-alias-bg-layer-2": { light: "rgba(255, 255, 255, 0.62)", dark: "rgba(15, 21, 40, 0.60)" },
		"--dsw-alias-bg-layer-3": { light: "rgba(255, 255, 255, 0.72)", dark: "rgba(20, 28, 52, 0.72)" },
		"--dsw-alias-bg-module-platform": { light: "rgba(255, 255, 255, 0.60)", dark: "rgba(18, 25, 47, 0.62)" },
		// overlays/menus stay near-opaque for readability, tinted navy
		"--dsw-alias-bg-overlay": { light: "rgba(252, 254, 255, 0.97)", dark: "rgba(20, 28, 52, 0.96)" },
		"--dsw-alias-toast-bg": { light: "rgba(252, 254, 255, 0.97)", dark: "rgba(16, 22, 42, 0.96)" },
		"--dsw-alias-tooltip-bg": { light: "rgba(30, 41, 59, 0.95)", dark: "rgba(16, 22, 42, 0.96)" },
		"--dsw-alias-bg-multi-select": { light: "rgba(8, 145, 178, 0.10)", dark: "rgba(34, 211, 238, 0.14)" },
		"--dsw-alias-bg-skeleton": { light: "rgba(8, 145, 178, 0.08)", dark: "rgba(34, 211, 238, 0.08)" },
		// borders: cyan-tinted
		"--dsw-alias-border-l1": { light: "rgba(8, 145, 178, 0.14)", dark: "rgba(34, 211, 238, 0.12)" },
		"--dsw-alias-border-l2": { light: "rgba(8, 145, 178, 0.24)", dark: "rgba(34, 211, 238, 0.22)" },
		"--dsw-alias-border-l2-darkmode-thin": { light: "rgba(8, 145, 178, 0.24)", dark: "rgba(34, 211, 238, 0.18)" },
		"--dsw-alias-border-l3": { light: "rgba(8, 145, 178, 0.32)", dark: "rgba(34, 211, 238, 0.30)" },
		"--dsw-alias-border-l4": { light: "rgba(8, 145, 178, 0.45)", dark: "rgba(34, 211, 238, 0.42)" },
		// brand + primary actions: neon cyan
		"--dsw-alias-brand-primary": { light: "rgb(8, 145, 178)", dark: "rgb(34, 211, 238)" },
		"--dsw-alias-brand-text": { light: "rgb(14, 116, 144)", dark: "rgb(103, 232, 249)" },
		"--dsw-alias-button-primary-hover": { light: "rgb(14, 116, 144)", dark: "rgb(103, 232, 249)" },
		"--dsw-alias-button-primary-dimmed": { light: "rgba(8, 145, 178, 0.45)", dark: "rgba(34, 211, 238, 0.45)" },
		// secondary buttons and hovers: navy/cyan family
		"--dsw-alias-button-elevated-fill": { light: "rgba(255, 255, 255, 0.70)", dark: "rgba(24, 33, 60, 0.75)" },
		"--dsw-alias-button-floating-fill": { light: "rgba(255, 255, 255, 0.80)", dark: "rgba(24, 33, 60, 0.85)" },
		"--dsw-alias-button-floating-hover": { light: "rgba(240, 248, 255, 0.90)", dark: "rgba(32, 44, 78, 0.90)" },
		"--dsw-alias-button-ghost-active-border": { light: "rgba(8, 145, 178, 0.50)", dark: "rgba(34, 211, 238, 0.50)" },
		"--dsw-alias-button-ghost-active-fill": { light: "rgba(8, 145, 178, 0.10)", dark: "rgba(34, 211, 238, 0.12)" },
		"--dsw-alias-button-ghost-active-hover": { light: "rgba(8, 145, 178, 0.16)", dark: "rgba(34, 211, 238, 0.18)" },
		"--dsw-alias-button-tool-bar-fill": { light: "rgba(255, 255, 255, 0.65)", dark: "rgba(21, 29, 54, 0.70)" },
		"--dsw-alias-button-tool-bar-hover": { light: "rgba(8, 145, 178, 0.12)", dark: "rgba(34, 211, 238, 0.14)" },
		"--dsw-alias-interactive-bg-hover": { light: "rgba(8, 145, 178, 0.10)", dark: "rgba(34, 211, 238, 0.10)" },
		"--dsw-alias-interactive-bg-active": { light: "rgba(8, 145, 178, 0.16)", dark: "rgba(34, 211, 238, 0.16)" },
		"--dsw-alias-interactive-bg-hover-accent": { light: "rgba(8, 145, 178, 0.14)", dark: "rgba(34, 211, 238, 0.14)" },
		"--dsw-alias-interactive-bg-hover-solid": { light: "rgba(228, 240, 250, 0.95)", dark: "rgba(28, 38, 68, 0.95)" },
		// text: subtle cyan cast on secondary roles only; primary stays stock
		"--dsw-alias-label-secondary": { light: "rgb(71, 96, 114)", dark: "rgb(158, 189, 212)" },
		"--dsw-alias-label-primary-bluish": { light: "rgb(14, 116, 144)", dark: "rgb(103, 232, 249)" },
		// markdown/code surfaces
		"--dsw-alias-markdown-code-block": { light: "rgba(240, 246, 254, 0.75)", dark: "rgba(9, 13, 27, 0.72)" },
		"--dsw-alias-markdown-code-block-banner": { light: "rgba(230, 240, 252, 0.85)", dark: "rgba(14, 19, 38, 0.85)" },
		"--dsw-alias-markdown-inline-code": { light: "rgba(8, 145, 178, 0.10)", dark: "rgba(34, 211, 238, 0.12)" },
		// scrollbars: cyan
		"--dsw-alias-scrollbar-bg-l1": { light: "rgba(8, 145, 178, 0.25)", dark: "rgba(34, 211, 238, 0.25)" },
		"--dsw-alias-scrollbar-hover-l1": { light: "rgba(8, 145, 178, 0.45)", dark: "rgba(34, 211, 238, 0.45)" },
		"--dsw-alias-scrollbar-bg-l2": { light: "rgba(8, 145, 178, 0.25)", dark: "rgba(34, 211, 238, 0.25)" },
		"--dsw-alias-scrollbar-hover-l2": { light: "rgba(8, 145, 178, 0.45)", dark: "rgba(34, 211, 238, 0.45)" },
	};

	const TOKENS = { ...STATIC_TOKENS, ...ALIAS_TOKENS };

	// The backdrop is body-level so it needs no product DOM selectors; the theme
	// presenter owns body[data-ds-dark-theme], which doubles as the scheme switch.
	const CSS = [
		"body {",
		"  background-image: linear-gradient(rgba(247, 250, 255, 0), rgba(247, 250, 255, 0.15)), url('/skin-nebula/ninja-light.png');",
		"  background-size: cover;",
		"  background-position: center;",
		"  background-attachment: fixed;",
		"}",
		"body[data-ds-dark-theme] {",
		"  background-image: linear-gradient(rgba(4, 6, 14, 0.02), rgba(4, 6, 14, 0.22)), url('/skin-nebula/ninja-dark.png');",
		"}",
	].join("\n");

	function apply(ctx) {
		ctx.effect(
			() => ctx.theme.overrideTokens("dsh-skin-nebula", TOKENS),
			"dsh-skin-nebula: token layer",
		);
		ctx.effect(() => {
			const tag = document.createElement("style");
			tag.id = "dsh-skin-nebula-css";
			tag.textContent = CSS;
			document.head.appendChild(tag);
			return () => tag.remove();
		}, "dsh-skin-nebula: backdrop stylesheet");
	}

	exports.name = name;
	exports.inject = inject;
	exports.apply = apply;
	return module.exports;
} });
