const breakpoints = [
	{ prefix: "sm-", mediaQuery: "(--sm)" },
	{ prefix: "md-", mediaQuery: "(--md)" },
	{ prefix: "lg-", mediaQuery: "(--lg)" },
	{ prefix: "xl-", mediaQuery: "(--xl)" },
	{ prefix: "xxl-", mediaQuery: "(--xxl)" },
];
const responsifyOptions = {
	breakpoints,
};

module.exports = {
	plugins: [
		require("postcss-import"),
		require("postcss-preset-env")({ stage: 1 }),
		require("autoprefixer")({ flexbox: false }),
		require("./postcss/postcss-responsify/index.js")(responsifyOptions),
	],
};
