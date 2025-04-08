import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import vuePlugin from 'rollup-plugin-vue'
import replace from '@rollup/plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve as resolvePath } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(
  readFileSync(resolvePath(__dirname, './package.json'), 'utf8')
)

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
