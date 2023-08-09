import { defineConfig } from 'rollup';

import path from 'path';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

const env = process.env.NODE_ENV;
const projectRootDir = path.resolve(__dirname);

const plugins = [
	alias({
		entries: [
			{
				find: '@',
				replacement: path.resolve(projectRootDir, 'src'),
			},
		],
		customResolver: nodeResolve({
			extensions: ['.mjs', '.js', '.ts', '.tsx', '.json', '.less', '.css']
		}),
	}),
	nodeResolve(),
	replace({
		preventAssignment: true,
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	}),
	commonjs({ extensions: ['.tsx', '.ts', '.js', '.jsx'] }),
	postcss({
		modules: true,
		inject: false,
		extract: true,
		minimize: true,
		extensions: ['.css', '.less'],
	}),
	babel({
		exclude: 'node_modules/**',
		babelHelpers: 'bundled',
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
	}),
	typescript(),
];
if (env === 'production') {
	plugins.push(terser());
}

export default defineConfig({
	/* 你的配置 */
	input: './src/index.ts',
	output: [
		{
			format: 'es',
			sourcemap: true,
			file: 'dist/index.js',
		},
		{
			format: 'cjs',
			sourcemap: true,
			file: 'dist/dooringx-core.cjs.js',
		},
		{
			format: 'esm',
			sourcemap: true,
			file: 'dist/dooringx-core.esm.js',
		},
	],
	plugins,
	external: ['react', 'react-dom', 'antd', 'react-intl', '@ant-design/icons'],
});
