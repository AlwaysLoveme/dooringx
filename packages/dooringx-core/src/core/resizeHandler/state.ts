import { RefObject } from 'react';

import type { IBlockType } from '../store/storetype';

export interface Point {
	x: number;
	y: number;
}

interface resizeStateType {
	startX: number;
	startY: number;
	item: null | IBlockType;
	isResize: boolean;
	direction: DirectionType;
	ref: RefObject<HTMLDivElement> | null;
	current: number;
	currentTarget: HTMLDivElement | null;
	symmetricPoint: Point;
	curPosition: Point;
}
export type DirectionType = 'lt' | 't' | 'rt' | 'r' | 'rb' | 'b' | 'lb' | 'l';
export const directionArr: DirectionType[] = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'];

export const resizeState: resizeStateType = {
	startX: 0,
	startY: 0,
	item: null,
	isResize: false,
	direction: 'b',
	ref: null,
	current: 0,
	currentTarget: null,
	symmetricPoint: {
		x: 0,
		y: 0,
	},
	curPosition: {
		x: 0,
		y: 0,
	},
};
