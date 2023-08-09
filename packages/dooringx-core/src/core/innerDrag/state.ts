import { RefObject } from 'react';

import { IBlockType } from '../store/storetype';

export interface innerDragStateType {
	startX: number;
	startY: number;
	item: null | IBlockType;
	isDrag: boolean;
	ref: RefObject<HTMLDivElement> | null;
	current: number;
	lastClick: null | IBlockType;
	itemX: number;
	itemY: number;
}

export const innerDragState: innerDragStateType = {
	startX: 0,
	startY: 0,
	item: null,
	isDrag: false,
	ref: null,
	current: 0,
	lastClick: null,
	itemX: 0,
	itemY: 0,
};
