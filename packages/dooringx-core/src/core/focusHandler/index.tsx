/*
 * @Author: yehuozhili
 * @Date: 2021-03-14 04:29:09
 * @LastEditors: yehuozhili
 * @LastEditTime: 2021-10-07 12:40:32
 * @FilePath: \dooringx\packages\dooringx-core\src\core\focusHandler\index.tsx
 */
import { deepCopy } from '../utils';
import { IBlockType } from '../store/storetype';
import { unmountContextMenu } from '../contextMenu';
import { innerDragState } from '../innerDrag/state';
import { selectRangeMouseDown } from '../selectRange';

import type UserConfig from '@/config';

function resolveRemove(config: UserConfig) {
	const store = config.getStore();
	const focusState = config.getFocusState();
	const cloneData = deepCopy(store.getData());
	const newBlock = cloneData.block.map((v: IBlockType) => {
		v.focus = false;
		return v;
	});
	focusState.blocks = [];
	store.setData({ ...cloneData, block: newBlock });
	unmountContextMenu();
}

export function innerRemoveFocus(config: UserConfig) {
	resolveRemove(config);
}

export function containerFocusRemove(config: UserConfig) {
	const onMouseDown = (e: React.MouseEvent) => {
		resolveRemove(config);
		if (!innerDragState.item) {
			selectRangeMouseDown(e, config);
		}
	};
	return {
		onMouseDown,
	};
}

export function blockFocus(e: React.MouseEvent, item: IBlockType, config: UserConfig) {
	const store = config.getStore();
	const cloneData = deepCopy(store.getData());
	const focusState = config.getFocusState();
	if (e.shiftKey) {
		const newBlock = cloneData.block.map((v: IBlockType) => {
			if (v.id === item.id) {
				v.focus = true;
				focusState.blocks.push(item);
			}
			return v;
		});
		store.setData({ ...cloneData, block: newBlock });
	} else {
		let blocks: IBlockType[] = [];
		const newBlock = cloneData.block.map((v: IBlockType) => {
			if (v.id === item.id) {
				blocks.push(item);
				v.focus = true;
			} else {
				v.focus = false;
			}
			return v;
		});
		focusState.blocks = blocks;
		store.setData({ ...cloneData, block: newBlock });
	}
}
