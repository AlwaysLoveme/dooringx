import { deepCopy } from '../utils';
import { controlMouseMove } from '../../components/control/state';

import type UserConfig from '@/config';
import type { IStoreData } from '../store/storetype';

export const containerState = {
	isDrag: false,
	startY: 0,
	startIndex: 0,
	minHeight: 0,
};

export const containerResizer = {
	onMousedown: (e: React.MouseEvent, config: UserConfig) => {
		const store = config.getStore();
		containerState.isDrag = true;
		containerState.startY = e.clientY;
		containerState.startIndex = store.getIndex();
	},
	onMouseMove: (e: React.MouseEvent, config: UserConfig) => {
		if (containerState.isDrag) {
			const scaleState = config.getScaleState();
			const store = config.getStore();
			const scale = scaleState.value;
			const diff = ((e.clientY - containerState.startY) / scale) * 2; //可以直接使用movementy
			const clonedata: IStoreData = deepCopy(store.getData());
			const height = clonedata.container.height;
			let tmpHeight = Math.round(
				height + diff < containerState.minHeight ? containerState.minHeight : height + diff
			);
			clonedata.container.height = tmpHeight;
			store.setData(clonedata);
			containerState.startY = e.clientY;
		}
		controlMouseMove(e);
	},
	onMouseUp: (config: UserConfig) => {
		if (containerState.isDrag) {
			const store = config.getStore();
			containerState.isDrag = false;
			const endIndex = store.getIndex();
			store.getStoreList().splice(containerState.startIndex, endIndex - containerState.startIndex);
			store.setIndex(containerState.startIndex);
		}
	},
};
