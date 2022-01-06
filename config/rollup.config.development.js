const path = require('path');
const rollupResolvePlugin = require('rollup-plugin-node-resolve');
const rollupBuiltinsPlugin = require('rollup-plugin-node-builtins');
const rollupBabel = require('rollup-plugin-babel');
const rollupCommonJsPlugin = require('rollup-plugin-commonjs');
const rollupTypescriptPlugin = require('rollup-plugin-typescript2');
const aliasPlugin = require('@rollup/plugin-alias');
const uglifyPlugin = require('rollup-plugin-uglify');

const customResolver = rollupResolvePlugin({
  extensions: ['.mjs', '.js', '.jsx', '.ts', '.d.ts', '.json', '.sass', '.scss'],
});

function getPath(pathName) {
  return path.resolve(__dirname, pathName);
}

module.exports = {
  /**
   * 入口文件
   * @param input
   */
  input: getPath('../src/index.ts'),

  /**
   * 输出文件
   * @param output
   */
  output: [
    {
      file: 'bundle/index.js',
      format: 'umd',
      name: 'jx3-dps-core',
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
    /**
     * rollup 解析代码中依赖的 node_modules
     * @param rollupResolvePlugin
     */
    rollupResolvePlugin({
      extensions: ['.js', '.ts'],
      // preferBuiltins: false,
      browser: true,
    }),

    rollupBuiltinsPlugin(),

    /**
     * rollup 解析 commonjs 语法的 import export
     * @param rollupCommonJsPlugin
     */
    rollupCommonJsPlugin({
      // extensions: ['.js', '.ts'],
      // preferBuiltins: false,
      // preferBuiltins: false,
    }),
    /**
     * rollup编译解析ts插件
     *
     * @param rollupTypescriptPlugin
     */
    rollupTypescriptPlugin({
      typescript: require('ttypescript'),
      tsconfig: getPath('../tsconfig.json'),
      extensions: ['.js', '.ts'],
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { transform: 'typescript-transform-paths' },
            { transform: 'typescript-transform-paths', afterDeclarations: true },
          ],
        },
      },
    }),

    rollupBabel({
      exclude: 'node_modules/**',
    }),

    aliasPlugin({
      entries: [
        { find: '@calculator', replacement: '../src/calculator' },
        { find: '@component', replacement: '../src/component' },
        { find: '@config', replacement: '../src/config' },
        { find: '@packages', replacement: '../src/packages' },
        { find: '@types', replacement: '../src/types.ts' },
      ],
      customResolver,
    }),
  ],
};
