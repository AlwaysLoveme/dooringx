import { CommanderItemFactory, deepCopy } from 'dooringx-core';
import { IStoreData } from 'dooringx-core/dist/core/store/storetype';

const hide = new CommanderItemFactory(
	'hide',
	'',
	(store) => {
		const cloneData: IStoreData = deepCopy(store.getData());
		cloneData.block.forEach((v) => {
			if (v.focus) {
				v.canSee = false;
			}
		});
		store.setData(cloneData);
	},
	'隐藏'
);

export default hide;
