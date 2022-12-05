const breakpoints = [
	{ prefix: "sm-", mediaQuery: "(min-width: 480px)" },
	{ prefix: "md-", mediaQuery: "(min-width: 768px)" },
	{ prefix: "lg-", mediaQuery: "(min-width: 1024px)" },
	{ prefix: "xl-", mediaQuery: "(min-width: 1440px)" },
	{ prefix: "xxl-", mediaQuery: "(min-width: 1920px)" },
];

const responsifyOptions = {
	breakpoints,
};

module.exports = {
	plugins: [
		require("postcss-import"),
		require("./postcss/postcss-responsify/index.js")(responsifyOptions),
		require("postcss-preset-env")({
			stage: 2,
			autoprefixer: { flexbox: false },
			postcssCustomProperties: {
				preserve: true,
				importFrom: "./src/css/media-queries-props.css",
			},
		}),
	],
};
