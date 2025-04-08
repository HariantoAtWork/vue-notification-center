import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import vuePlugin from 'rollup-plugin-vue'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'

const pkg = require('./package.json')

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${pkg.author}
  * Released under the ${pkg.license} License
  */`

export default {
  input: 'src/index.js',
  external: ['vue'],
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'VueNotificationCenter',
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
      banner,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      banner,
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    vuePlugin({
      css: true,
      template: {
        isProduction: true,
      },
    }),
    postcss({
      extract: true,
      modules: false,
      use: ['sass'],
      minimize: true,
      sourceMap: true,
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.vue'],
    }),
    commonjs(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
}
