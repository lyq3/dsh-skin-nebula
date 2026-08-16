window.__ModuleLoader__.load({ id: "dsh-skin-nebula", factory: (require) => {

	var module = { exports: {} };
	var exports = module.exports;
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

	const name = "dsh-skin-nebula";
	const inject = ["theme"];

	// Alias-token override layer, composed on top of the active built-in theme.
	// Surfaces are semi-transparent so the fixed nebula backdrop shows through;
	// overlays stay near-opaque so menus and dialogs remain readable.
	const TOKENS = {
		"--dsw-alias-bg-base": { light: "rgba(247, 250, 255, 0.55)", dark: "rgba(6, 9, 20, 0.60)" },
		"--dsw-alias-bg-layer-1": { light: "rgba(255, 255, 255, 0.78)", dark: "rgba(11, 16, 32, 0.72)" },
		"--dsw-alias-bg-layer-2": { light: "rgba(255, 255, 255, 0.84)", dark: "rgba(15, 21, 40, 0.78)" },
		"--dsw-alias-bg-layer-3": { light: "rgba(255, 255, 255, 0.90)", dark: "rgba(20, 28, 52, 0.88)" },
		"--dsw-alias-bg-module-platform": { light: "rgba(255, 255, 255, 0.82)", dark: "rgba(18, 25, 47, 0.84)" },
		"--dsw-alias-bg-overlay": { light: "rgba(255, 255, 255, 0.97)", dark: "rgba(21, 29, 54, 0.97)" },
		"--dsw-alias-border-l1": { light: "rgba(8, 145, 178, 0.12)", dark: "rgba(34, 211, 238, 0.10)" },
		"--dsw-alias-border-l2": { light: "rgba(8, 145, 178, 0.22)", dark: "rgba(34, 211, 238, 0.20)" },
		"--dsw-alias-brand-primary": { light: "rgb(8, 145, 178)", dark: "rgb(34, 211, 238)" },
		"--dsw-alias-brand-text": { light: "rgb(14, 116, 144)", dark: "rgb(103, 232, 249)" },
		"--dsw-alias-button-primary-hover": { light: "rgb(14, 116, 144)", dark: "rgb(103, 232, 249)" },
		"--dsw-alias-interactive-bg-hover": { light: "rgba(8, 145, 178, 0.08)", dark: "rgba(34, 211, 238, 0.10)" },
		"--dsw-alias-interactive-bg-active": { light: "rgba(8, 145, 178, 0.14)", dark: "rgba(34, 211, 238, 0.16)" },
		"--dsw-alias-markdown-code-block": { light: "rgba(240, 246, 254, 0.9)", dark: "rgba(9, 13, 27, 0.85)" },
		"--dsw-alias-scrollbar-bg-l1": { light: "rgba(8, 145, 178, 0.25)", dark: "rgba(34, 211, 238, 0.25)" },
		"--dsw-alias-scrollbar-hover-l1": { light: "rgba(8, 145, 178, 0.45)", dark: "rgba(34, 211, 238, 0.45)" },
		"--dsw-alias-scrollbar-bg-l2": { light: "rgba(8, 145, 178, 0.25)", dark: "rgba(34, 211, 238, 0.25)" },
		"--dsw-alias-scrollbar-hover-l2": { light: "rgba(8, 145, 178, 0.45)", dark: "rgba(34, 211, 238, 0.45)" },
	};

	// The backdrop is body-level so it needs no product DOM selectors; the theme
	// presenter owns body[data-ds-dark-theme], which doubles as the scheme switch.
	const CSS = [
		"body {",
		"  background-image: linear-gradient(rgba(247, 250, 255, 0.10), rgba(247, 250, 255, 0.30)), url('/skin-nebula/nebula-light.png');",
		"  background-size: cover;",
		"  background-position: center;",
		"  background-attachment: fixed;",
		"}",
		"body[data-ds-dark-theme] {",
		"  background-image: linear-gradient(rgba(4, 6, 14, 0.10), rgba(4, 6, 14, 0.40)), url('/skin-nebula/nebula-dark.png');",
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
