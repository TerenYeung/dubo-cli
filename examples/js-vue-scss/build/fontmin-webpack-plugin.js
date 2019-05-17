const
  Fontmin = require('fontmin'),
  PLUGIN_NAME = 'FontminPLugin';

/**
 * @param {option} {src, dist, text}
 * @class FontminPlugin
 */
class FontminPlugin {
  constructor(option) {
    this.option = option
  }

  apply(compiler) {
    const {
      src,
      dist,
      text
    } = this.option;
    compiler.hooks.beforeRun.tap(PLUGIN_NAME, () => {
      this.initialize();
      this.run()
    })
  }

  initialize() {
    const {
      src,
      dist,
      text
    } = this.option;

    this.fontmin = new Fontmin()
      .src(src)
      .use(Fontmin.glyph({text}))
      .use(Fontmin.ttf2eot()) // eot for
      .use(Fontmin.ttf2woff()) // woff for
      .use(Fontmin.ttf2svg()) // svg for
      .use(Fontmin.css())
      .dest(dist)
  }

  run() {
    this.fontmin.run((err, files, stream) => {
      if (err) {
        console.error(`Fontmin process has failed for: err`)
      }
      console.log('Fontmin done!');
    })
  }
}

module.exports = FontminPlugin;