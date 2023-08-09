import { InitConfig, LeftDataPannel } from 'dooringx-core';
import { LeftRegisterComponentMapItem } from 'dooringx-core/dist/core/crossDrag';
import { ContainerOutlined, PlayCircleOutlined, HighlightOutlined } from '@ant-design/icons';

import { functionMap } from './functionMap';
import commandModules from './commanderModules';
import { FormModules } from './formComponentModules';
import InputComponent from './registComponents/inputCo';

const LeftRegistMap: LeftRegisterComponentMapItem[] = [
	{
		type: 'basic',
		component: 'button',
		img: 'icon-anniu',
		imgCustom: <PlayCircleOutlined />,
		displayName: '按钮',
		urlFn: () => import('./registComponents/button'),
	},
	{
		type: 'basic',
		component: 'input',
		img: 'https://img.guguzhu.com/d/file/android/ico/2021/09/08/rytzi2w34tm.png',
		displayName: '输入框',
	},
	{
		type: 'basic',
		component: 'testco',
		img: 'icon-anniu',
		imgCustom: <PlayCircleOutlined />,
		displayName: '测试按钮',
		urlFn: () => import('./registComponents/testco'),
	},
];

export const defaultConfig: Partial<InitConfig> = {
	leftAllRegistMap: LeftRegistMap,
	leftRenderListCategory: [
		{
			type: 'basic',
			icon: <HighlightOutlined />,
			displayName: '基础',
		},
		{
			type: 'media',
			icon: <PlayCircleOutlined />,
			displayName: '媒体组件',
		},
		{
			type: 'datax',
			icon: <ContainerOutlined />,
			custom: true,
			displayName: '数据源',
			customRender: (config) => <LeftDataPannel config={config}></LeftDataPannel>,
		},
		{
			type: 'xxc',
			icon: <ContainerOutlined />,
			custom: true,
			displayName: '自定义',
			customRender: () => <div>我是自定义渲染</div>,
		},
	],
	initComponentCache: {
		input: { component: InputComponent },
	},
	rightRenderListCategory: [
		{
			type: 'style',
			icon: (
				<div className="right-tab-item" style={{ width: 50, textAlign: 'center' }}>
					外观
				</div>
			),
		},
		{
			type: 'animate',
			icon: (
				<div className="right-tab-item" style={{ width: 50, textAlign: 'center' }}>
					动画
				</div>
			),
		},
		{
			type: 'fn',
			icon: (
				<div className="right-tab-item" style={{ width: 50, textAlign: 'center' }}>
					函数
				</div>
			),
		},
		{
			type: 'actions',
			icon: (
				<div className="right-tab-item" style={{ width: 50, textAlign: 'center' }}>
					事件
				</div>
			),
		},
	],
	initFunctionMap: functionMap,
	initCommandModule: commandModules,
	initFormComponents: FormModules,
};

export default defaultConfig;
