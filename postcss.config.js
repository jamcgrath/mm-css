const breakpoints = [
	
	{ prefix: "lg-", mediaQuery: "(min-width: 1024px)" },
	
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
			},
		}),
	],
};
