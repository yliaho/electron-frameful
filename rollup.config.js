import path from 'path'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import string from 'rollup-plugin-string'
import typescript from 'rollup-plugin-typescript2'
import sass from 'rollup-plugin-sass'
import async from 'rollup-plugin-async'
//@ts-ignore
import pkg from './package.json'

const now = new Date(new Date().getTime()).toUTCString()

const banner = `/*
	Frameless v${pkg.version}
	${now}

  Copyright (c) 2018-present, Joonas Anton Yliaho. 
  Released under the MIT License.
*/`

export default [
  {
    input: 'src/index.ts',
    plugins: [
      async(),
      typescript({
        typescript: require('typescript')
      }),
      string({
        include: '**/*.svg'
      }),
      sass(),
      resolve(),
      commonjs()
    ],
    output: [
      {
        file: 'dist/frameful.js',
        format: 'cjs',
        sourcemap: true,
        banner
      },
      {
        file: 'dist/frameful.es.js',
        format: 'es',
        sourcemap: true,
        banner
      }
    ]
  }
]
