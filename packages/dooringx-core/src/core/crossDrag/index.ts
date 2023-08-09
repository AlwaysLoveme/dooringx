import React, { DragEvent, ReactNode } from 'react';

import { deepCopy } from '../utils';
import { IBlockType } from '../store/storetype';
import { createBlock } from '../components/createBlock';

import type UserConfig from '@/config';

/**
 *
 * @export
 * @interface LeftRegisterComponentMapItem
 * @img 图片地址
 * @urlFn 组件异步加载函数
 */
export interface LeftRegisterComponentMapItem {
	type: string;
	component: string;
	img: string;
	imgCustom?: ReactNode;
	displayName: string;
	urlFn?: () => Promise<any>;
}

let currentDrag: LeftRegisterComponentMapItem | null = null;

function resolveDrop(
	config: UserConfig,
	item: LeftRegisterComponentMapItem,
	e: DragEvent<HTMLDivElement> | React.MouseEvent,
	x: number,
	y: number,
	dbClick: boolean = false
) {
	const componentRegister = config.getComponentRegister();
	const store = config.getStore();
	const origin = componentRegister.getComp(item.component);
	if (!origin) {
		console.log(item.component, 'wait the chunk pull completely and retry');
		return;
	}
	const target = e.target as HTMLElement;
	let newBlock: IBlockType;
	//如果有宽高，那么让其在中间
	let fixX = x;
	let fixY = y;
	if (origin.initData.width && typeof origin.initData.width === 'number') {
		fixX = x - origin.initData.width / 2;
	}
	if (origin.initData.height && typeof origin.initData.height === 'number') {
		fixY = y - origin.initData.height / 2;
	}

	if (!origin.needPosition) {
		newBlock = createBlock(
			origin.initData.top ?? fixY,
			origin.initData.left ?? fixX,
			origin,
			config
		);
	} else {
		if (dbClick) {
			newBlock = createBlock(fixY, fixX, origin, config);
		} else {
			if (target.id !== 'yh-container') {
				newBlock = createBlock(fixY + target.offsetTop, fixX + target.offsetLeft, origin, config);
			} else {
				newBlock = createBlock(fixY, fixX, origin, config);
			}
		}
	}
	const data = deepCopy(store.getData());
	data.block.push(newBlock);
	store.setData({ ...data });
}

export const dragEventResolve = function (item: LeftRegisterComponentMapItem, config: UserConfig) {
	return {
		draggable: true,
		onDragStart: () => {
			currentDrag = item;
		},
		onDragOver: (e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
		},
		onDrop: () => {},
		onDragEnd: () => {},
		onDoubleClick: (e: React.MouseEvent) => {
			const container = config.getStore().getData().container;
			const x = container.width / 2;
			const y = container.height / 2;
			resolveDrop(config, item, e, x, y, true);
		},
	};
};

export const containerDragResolve = (config: UserConfig) => {
	return {
		onDragStart: () => {},
		onDragOver: (e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
		},
		onDrop: (e: DragEvent<HTMLDivElement>) => {
			const offsetX = Math.round(e.nativeEvent.offsetX);
			const offestY = Math.round(e.nativeEvent.offsetY);
			//drop后修改store，
			if (currentDrag) {
				resolveDrop(config, currentDrag, e, offsetX, offestY);
			}
			currentDrag = null;
		},
		onDragEnd: () => {},
	};
};
