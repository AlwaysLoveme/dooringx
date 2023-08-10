import { createUid } from '../utils';

import type { IStoreData } from './storetype';

export function createDefaultModalBlock(): IStoreData['block'] {
	return [
		{
			id: createUid('modal-mask'),
			name: 'modalMask',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: 0,
			props: {},
			resize: true,
			focus: false,
			canSee: true,
			position: 'absolute',
			display: 'block',
			syncList: [],
			canDrag: false,
			eventMap: {},
			functionList: [],
			animate: [],
			fixed: true,
			rotate: {
				value: 0,
				canRotate: false,
			},
		},
	];
}
