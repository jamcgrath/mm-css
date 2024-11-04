// style-dictionary.config.js

import StyleDictionary from "style-dictionary";

// Register a parser for W3C Design Tokens format
StyleDictionary.registerParser({
  name: "jsonParser",
  pattern: /\.json$/,
  parser: ({ contents }) => JSON.parse(contents),
});

// Register a custom name transform to convert token names to Tailwind-friendly format
StyleDictionary.registerTransform({
  name: "name/tailwind",
  type: "name",
  transform: (token) => token.path.join("-"),
});

// Register a custom format to output tokens as a JavaScript module
StyleDictionary.registerFormat({
  name: "javascript/tailwind",
  format: function ({ dictionary }) {
    const buildNestedObject = (tokens) => {
      const result = {};

      tokens.forEach((token) => {
        const { path, $value } = token;
        let current = result;

        path.forEach((part, index) => {
          if (index === path.length - 1) {
            current[part] = $value;
          } else {
            current[part] = current[part] || {};
            current = current[part];
          }
        });
      });

      return result;
    };

    const tokens = buildNestedObject(dictionary.allTokens);

    return `export default ${JSON.stringify(tokens, null, 2)};`;
  },
});

export default {
  source: ["./src/tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css", // For CSS variables
      buildPath: "./dist/css/",
      prefix: "mm", // This will prefix variables with 'mm'
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    tailwind: {
      transforms: [
        "attribute/cti",
        "shadow/css/shorthand",
        "name/kebab",
        "name/tailwind",
      ],
      buildPath: "./dist/tokens/", // Build path as per your requirement
      files: [
        {
          destination: "mmTokens.js",
          format: "javascript/tailwind",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
