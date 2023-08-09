import { defineConfig } from '@umijs/max';

export default defineConfig({
	npmClient: "pnpm",
	/**
	 * @name 开启 hash 模式
	 * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
	 * @doc https://umijs.org/docs/api/config#hash
	 */
	hash: true,

	/**
	 * @name moment 的国际化配置
	 * @description 如果对国际化没有要求，打开之后能减少js的包大小
	 * @doc https://umijs.org/docs/api/config#ignoremomentlocale
	 */
	ignoreMomentLocale: true,

	/**
	 * 快速热更新配置
	 * @description 一个不错的热更新组件，更新时可以保留 state
	 */
	fastRefresh: true,

	//============== 以下都是max的插件配置 ===============
	/**
	 * 数据流插件
	 * @@doc https://umijs.org/docs/max/data-flow
	 */
	model: {},
	/**
	 * 一个全局的初始数据流，可以用它在插件之间共享数据
	 * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
	 * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
	 */
	initialState: {},
	/**
	 * 权限插件
	 * @description 基于 initialState 的权限插件，必须先打开 initialState
	 * @doc https://umijs.org/docs/max/access
	 */
	access: {},
	//============== 插件配置结束 ===============

	/**
	 * @name moment2dayjs 插件
	 * @description 将项目中的 moment 替换为 dayjs
	 * @doc https://umijs.org/docs/max/moment2dayjs
	 */
	moment2dayjs: {
		preset: 'antd',
		plugins: ['duration'],
	},
	/**
	 * 国际化插件
	 * @doc https://umijs.org/docs/max/i18n
	 */
	locale: {
		// default zh-CN
		default: 'zh-CN',
		antd: true,
		// default true, when it is true, will use `navigator.language` overwrite default
		baseNavigator: false,
	},
	mfsu: {
		strategy: 'normal',
	},
	//使用分包策略
	codeSplitting: {
		jsStrategy: 'granularChunks',
	},

	routes: [
		{
			exact: false,
			path: '/',
			component: '@/layouts',
			routes: [
				{ path: '/', component: '@/pages/main' },
				{ path: '/iframeTest', component: '@/pages/iframeTest' },
				{ path: '/container', component: '@/pages/container' },
				{ path: '/preview', component: '@/pages/preview' },
				{ path: '/iframe', component: '@/pages/iframe' },
			],
		},
	],
	externals: {
		react: 'window.React',
		'react-dom': 'window.ReactDOM',
	},
	scripts: [
		'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
		'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
	],
});
