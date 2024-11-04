import postcssImport from "postcss-import";
import responsify from "./postcss-plugins/postcss-responsify/index.cjs";
import postcssPresetEnv from "postcss-preset-env";

const breakpoints = [{ prefix: "lg-", mediaQuery: "(min-width: 1024px)" }];

const responsifyOptions = {
  breakpoints,
};

export default {
  plugins: [
    postcssImport,
    responsify(responsifyOptions),
    postcssPresetEnv({
      stage: 2,
      autoprefixer: { flexbox: false },
      postcssCustomProperties: {
        preserve: true,
      },
    }),
  ],
};
