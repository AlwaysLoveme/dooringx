import { Outlet } from 'umi';
import { Button } from 'antd';
import { IntlProvider } from 'react-intl';
import { createContext, useState } from 'react';

import plugin from '../plugin';
import { locale, UserConfig } from 'dooringx-core';
import { localeKey } from 'dooringx-core/dist/locale';

import 'animate.css';
import '../global.less';
import 'dooringx-core/dist/dooringx-core.esm.css';

import type {FC} from "react"

export const config = new UserConfig(plugin);
export const configContext = createContext<UserConfig>(config);

//config.i18n = false;
// 自定义右键
const contextMenuState = config.getContextMenuState();
const unmountContextMenu = contextMenuState.unmountContextMenu;
const commander = config.getCommanderRegister();
const ContextMenu = () => {
	const handleClick = () => {
		unmountContextMenu();
	};
	const forceUpdate = useState(0)[1];
	contextMenuState.forceUpdate = () => {
		forceUpdate((pre) => pre + 1);
	};
	return (
		<div
			style={{
				left: contextMenuState.left,
				top: contextMenuState.top,
				position: 'fixed',
				background: 'rgb(24, 23, 23)',
			}}
		>
			<div
				style={{ width: '100%' }}
				onClick={() => {
					commander.exec('redo');
					handleClick();
				}}
			>
				<Button>自定义</Button>
			</div>
			<div
				style={{ width: '100%' }}
				onClick={() => {
					commander.exec('hide');
					handleClick();
				}}
			>
				<Button style={{ width: '100%' }}>隐藏</Button>
			</div>
			<div
				style={{ width: '100%' }}
				onClick={() => {
					commander.exec('lock');
					handleClick();
				}}
			>
				<Button style={{ width: '100%' }}>锁定</Button>
			</div>
			<div
				style={{ width: '100%' }}
				onClick={() => {
					commander.exec('unlock');
					handleClick();
				}}
			>
				<Button style={{ width: '100%' }}>解锁</Button>
			</div>
		</div>
	);
};
contextMenuState.contextMenu = <ContextMenu />;

interface LocaleContextType {
	change: Function;
	current: localeKey;
}
export const LocaleContext = createContext<LocaleContextType>({
	change: () => {},
	current: 'zh-CN',
});

const Layout: FC = () => {
	const [lang, setLang] = useState<localeKey>('zh-CN');
	
	return (
		<LocaleContext.Provider value={{ change: setLang, current: lang }}>
			<IntlProvider messages={locale.localeMap[lang]} locale={lang} defaultLocale={lang}>
				<configContext.Provider value={config}>
					<Outlet />
				</configContext.Provider>
			</IntlProvider>
		</LocaleContext.Provider>
	);
}

export default Layout;
