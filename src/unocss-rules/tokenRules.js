// file referenced in unocss.config.js & uses /dist/tokens/mm-tokens.json
// Helper functions
const generateRules = (prefix, property, themeKey) => [
  [
    new RegExp(`^${prefix}-(.*)$`),
    ([, value], { theme }) => {
      if (theme[themeKey][value]) return { [property]: theme[themeKey][value] };
    },
  ],
];

const generateTypographyRules = (prefix, themeKey, pattern = null) => [
  [
    pattern || new RegExp(`^${prefix}-(.*)$`),
    ([, variant], { theme }) => {
      // Add error checking
      if (!theme[themeKey] || !theme[themeKey][variant]) {
        console.warn(`Theme key ${themeKey}.${variant} not found`);
        return {};
      }

      const style = theme[themeKey][variant];
      const styles = {
        "font-family": style.fontFamily,
        "font-size": style.fontSize,
        "line-height": style.lineHeight,
      };

      if (style.letterSpacing) {
        styles["letter-spacing"] = style.letterSpacing;
      }

      return styles;
    },
  ],
];

// Color rules
export const colorRules = [
  generateRules("text", "color", "colors"),
  generateRules("bg", "background-color", "colors"),
  generateRules("border", "border-color", "colors"),
  generateRules("accent", "accent-color", "colors"),
].flat();

// Layout rules
export const borderRadiusRules = generateRules(
  "rounded",
  "border-radius",
  "borderRadius"
);
export const boxShadowRules = generateRules(
  "shadow",
  "box-shadow",
  "boxShadow"
);
export const blurRules = [
  [
    /^blur-(.*)$/, // Changed from string to RegExp
    ([, v], { theme }) => ({ filter: `blur(${theme.blur[v]})` }),
  ],
];

// Typography rules
export const fontFamilyRules = generateRules(
  "font",
  "font-family",
  "fontFamily"
);
export const fontWeightRules = [
  [
    /^(regular|medium|semibold|bold)$/,
    ([, v], { theme }) => ({ "font-weight": theme.fontWeight[v] }),
  ],
];
export const letterSpacingRules = generateRules(
  "tracking",
  "letter-spacing",
  "letterSpacing"
);
export const lineHeightRules = generateRules(
  "leading",
  "line-height",
  "lineHeight"
);
export const titleSizeRules = generateRules(
  "title-size",
  "font-size",
  "titleSize"
); // Changed from 'title' to 'title-size'
export const textSizeRules = generateRules(
  "text-size",
  "font-size",
  "textSize"
); // Changed from 'text' to 'text-size'
export const titleRules = generateTypographyRules("title", "title");
export const textRules = generateTypographyRules(
  "text",
  "text",
  /^(lead|body|label|caption|overline-lg|small|overline-sm)$/
);

// Spacing rules
const spacingProperties = {
  p: "padding",
  py: ["padding-top", "padding-bottom"],
  px: ["padding-left", "padding-right"],
  pt: "padding-top",
  pb: "padding-bottom",
  pr: "padding-right",
  pl: "padding-left",
  m: "margin",
  my: ["margin-top", "margin-bottom"],
  mx: ["margin-left", "margin-right"],
  mt: "margin-top",
  mb: "margin-bottom",
  mr: "margin-right",
  ml: "margin-left",
  gap: "gap",
  "gap-x": "column-gap",
  "gap-y": "row-gap",
  w: "width",
  h: "height",
  "min-w": "min-width",
  "min-h": "min-height",
  "max-w": "max-width",
  "max-h": "max-height",
};

const scrollProperties = {
  // Padding
  p: "padding",
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  ps: "padding-inline-start",
  pe: "padding-inline-end",
  pt: "padding-top",
  pb: "padding-bottom",
  pr: "padding-right",
  pl: "padding-left",
  // Margin
  m: "margin",
  mx: ["margin-left", "margin-right"],
  my: ["margin-top", "margin-bottom"],
  ms: "margin-inline-start",
  me: "margin-inline-end",
  mt: "margin-top",
  mb: "margin-bottom",
  mr: "margin-right",
  ml: "margin-left",
};

export const scrollRules = Object.entries(scrollProperties).map(
  ([prefix, prop]) => {
    if (Array.isArray(prop)) {
      return [
        new RegExp(`^scroll-${prefix}-(.*)$`),
        ([, value], { theme }) => {
          const styles = {};
          prop.forEach((p) => {
            styles[`scroll-${p}`] = theme.spacing[value];
          });
          return styles;
        },
      ];
    }
    return [
      new RegExp(`^scroll-${prefix}-(.*)$`),
      ([, value], { theme }) => {
        return { [`scroll-${prop}`]: theme.spacing[value] };
      },
    ];
  }
);

export const spacingRules = Object.entries(spacingProperties)
  .map(([prefix, prop]) => {
    if (Array.isArray(prop)) {
      return [
        [
          new RegExp(`^${prefix}-(.*)$`),
          ([, value], { theme }) => {
            const styles = {};
            prop.forEach((p) => {
              styles[p] = theme.spacing[value];
            });
            return styles;
          },
        ],
      ];
    }
    return [
      [
        new RegExp(`^${prefix}-(.*)$`),
        ([, value], { theme }) => {
          if (theme.spacing[value]) return { [prop]: theme.spacing[value] };
        },
      ],
    ];
  })
  .flat();
