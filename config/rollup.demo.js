const path = require('path');
// const rollupResolvePlugin = require('rollup-plugin-node-resolve');
// const rollupBuiltinsPlugin = require('rollup-plugin-node-builtins');
const rollupBabel = require('rollup-plugin-babel');
// const rollupCommonJsPlugin = require('rollup-plugin-commonjs');
// const rollupTypescriptPlugin = require('rollup-plugin-typescript2');
// const packageJson = require('../package.json');

function getPath(pathName) {
  return path.resolve(__dirname, pathName);
}

module.exports = {
  /**
   * 入口文件
   * @param input
   */
  input: getPath('../test/index.js'),

  /**
   * 输出文件
   * @param output
   */
  output: [
    {
      file: 'test/demo.js',
      format: 'umd',
      name: 'test',
    },
    // {
    //   file: 'build/bundle.cjs.js',
    //   format: 'cjs',
    // },
  ],

  /**
   * 插件列表
   * @param plugins
   */
  plugins: [
    rollupBabel({
      exclude: 'node_modules/**',
    }),
  ],
};
