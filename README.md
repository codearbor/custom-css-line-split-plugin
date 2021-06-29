## About
Webpack 5 plugin to split css by max length

## Usage

```js
// Import the plugin
const CustomCssLineSplitPlugin = require('custom-css-line-split-plugin');

// Add to config
  optimization: {
    minimizer: [
      ...
      new CustomCssLineSplitPlugin({
        max_line_len: 500
      })
    ],
  }
```
