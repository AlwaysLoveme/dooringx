import { matchRoutes, defineApp, history } from 'umi';
import { ConfigProvider } from 'antd';
import theme from '@/styles/var.module.less';

/**
 * 设置全局初始状态，包含用户信息及获取用户信息接口
 * @returns
 */
export function getInitialState() {
	return {};
}

export default defineApp({
	onRouteChange: ({ clientRoutes, location }) => {
		const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
		if (route) {
			document.title = (route as { title: string }).title || 'DooringX-UI';
		} else {
			history.replace('/');
		}
	},
	rootContainer: (container: JSX.Element) => {
		return (
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: theme.colorPrimary,
					},
				}}
			>
				{container}
			</ConfigProvider>
		);
	},
});
