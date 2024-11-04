# mm-css

This repository contains the configuration and build scripts for managing CSS and design tokens using PostCSS and Style Dictionary.

## Build Scripts

### `postcss:build`

```sh
npm run postcss:build
```

This script processes the main CSS file (`src/css/styles.css`) and outputs the result to `dist/css/styles.css`.

### `postcss:build:single`

```sh
npm run postcss:build:single
```

This script processes all CSS files in the `src/css/_css/` directory and outputs the results to the `dist/` directory, preserving the directory structure.

### `build:tokens`

```sh
npm run build:tokens
```

This script uses Style Dictionary to build design tokens from the JSON files in the `src/tokens/` directory and outputs the results to the `dist/tokens/` directory.

### `cleanjson`

```sh
npm run cleanjson
```

This script removes all JSON files from the `dist/json/` directory.

### `csstojson`

```sh
npm run csstojson
```

This script runs the `cleanjson` script and then converts CSS files to JSON format using a custom script (`scripts/csstojson.js`).

### `build`

```sh
npm run build
```

This script runs the following scripts in sequence:

1. `postcss:build`
2. `postcss:build:single`
3. `csstojson`
4. `build:tokens`

## Configuration Files

### `style-dictionary.config.js`

This file contains the configuration for Style Dictionary, including custom parsers, transforms, and formats for handling design tokens.

### `postcss.config.js`

This file contains the configuration for PostCSS, including plugins for importing CSS, handling responsive design, and using modern CSS features.

### `package.json`

This file contains the project metadata, dependencies, and scripts for building and managing the CSS and design tokens.

## Dependencies

- `postcss`: A tool for transforming CSS with JavaScript.
- `postcss-cli`: A command-line interface for PostCSS.
- `postcss-import`: A PostCSS plugin to inline `@import` rules content.
- `postcss-preset-env`: A PostCSS plugin to convert modern CSS into something most browsers can understand.
- `style-dictionary`: A tool for managing design tokens.

## PostCSS Plugins

### [readme.md](file:///Users/jamesmcgrath/Sites/mm-css/readme.md)

Add a section explaining the `postcss-responsify` plugin in the `postcss-plugins` directory.

````markdown
# mm-css

This repository contains the configuration and build scripts for managing CSS and design tokens using PostCSS and Style Dictionary.

## Build Scripts

### `postcss:build`

```sh
npm run postcss:build
```
````

This script processes the main CSS file (`src/css/styles.css`) and outputs the result to `dist/css/styles.css`.

### `postcss:build:single`

```sh
npm run postcss:build:single
```

This script processes all CSS files in the `src/css/_css/` directory and outputs the results to the `dist/` directory, preserving the directory structure.

### `build:tokens`

```sh
npm run build:tokens
```

This script uses Style Dictionary to build design tokens from the JSON files in the `src/tokens/` directory and outputs the results to the `dist/tokens/` directory.

### `cleanjson`

```sh
npm run cleanjson
```

This script removes all JSON files from the `dist/json/` directory.

### `csstojson`

```sh
npm run csstojson
```

This script runs the `cleanjson` script and then converts CSS files to JSON format using a custom script (`scripts/csstojson.js`).

### `build`

```sh
npm run build
```

This script runs the following scripts in sequence:

1. `postcss:build`
2. `postcss:build:single`
3. `csstojson`
4. `build:tokens`

## Configuration Files

### `style-dictionary.config.js`

This file contains the configuration for Style Dictionary, including custom parsers, transforms, and formats for handling design tokens.

### `postcss.config.js`

This file contains the configuration for PostCSS, including plugins for importing CSS, handling responsive design, and using modern CSS features.

### `package.json`

This file contains the project metadata, dependencies, and scripts for building and managing the CSS and design tokens.

## Dependencies

- `postcss`: A tool for transforming CSS with JavaScript.
- `postcss-cli`: A command-line interface for PostCSS.
- `postcss-import`: A PostCSS plugin to inline `@import` rules content.
- `postcss-preset-env`: A PostCSS plugin to convert modern CSS into something most browsers can understand.
- `style-dictionary`: A tool for managing design tokens.

## PostCSS Plugins

### `postcss-import`

This plugin allows you to use `@import` statements in your CSS files to import other CSS files.

### `postcss-responsify`

This custom plugin allows you to create responsive CSS rules by defining breakpoints and applying prefixes to selectors. The breakpoints can be configured in the `postcss.config.js` file. The default breakpoints are:

- `xs-`: `(max-width: 640px)`
- `sm-`: `(min-width: 640px)`
- `md-`: `(min-width: 768px)`
- `lg-`: `(min-width: 1024px)`

### `postcss-preset-env`

This plugin allows you to use modern CSS features and automatically adds vendor prefixes to your CSS rules.
