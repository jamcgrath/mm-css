const fs = require("fs");

const ruleList = [
  "alignContent",
  "alignItems",
  "alignSelf",
  "display",
  "flex",
  "flexDirection",
  "flexWrap",
  "float",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "height",
  "justifyContent",
  "lineHeight",
  "margin",
  "maxHeight",
  "minHeight",
  "objectFit",
  "opacity",
  "padding",
  "position",
  "textAlignment",
  "textDecoration",
  "textSize",
  "textTransform",
  "visibility",
  "zIndex",
];

const defaultRules = () => {
  let features = {};
  ruleList.forEach((feature) => {
    const featureKebab = feature
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();
    const path = `./features/${featureKebab}-rules`;
    const pathTest = fs.existsSync(
      `${__dirname}/features/${featureKebab}-rules.js`
    );
    if (pathTest) {
      features[feature] = require(path);
    }
  });
  return features;
};

module.exports = {
  ruleList,
  defaultRules,
};
