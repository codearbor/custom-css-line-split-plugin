class CustomCssLineSplitPlugin {
  constructor(options = {}) {
    this.options = {
      max_line_len: 500
    };

    Object.assign(this.options, options);
  }

  apply(compiler) {
    compiler.hooks.emit.tap('CustomCssLineSplitPlugin', (compilation) => {
      const cssFiles = Object.keys(compilation.assets)
        .filter(fileName => /\.css$/.test(fileName));

      cssFiles.forEach(fileName => {
        var str = compilation.assets[fileName]._value;
        var parts = str.match(/[^}]+}+/g);
        var lines = [];
        var line = '';
        var maxLen = this.options.max_line_len;
        parts.forEach(part => {
          if (line.length == 0 && part.length > maxLen) {
            lines.push(part);
          }
          else if (line.length + part.length > maxLen) {
            lines.push(line);
            line = part;
          } else {
            line += part;
          }
        });

        lines.push(line);

        compilation.assets[fileName]._value = lines.join('\n');
      })
    });
  }
}

module.exports = CustomCssLineSplitPlugin;
