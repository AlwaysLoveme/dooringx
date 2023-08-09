/*
 * @Author: yehuozhili
 * @Date: 2021-07-27 16:19:58
 * @LastEditors: yehuozhili
 * @LastEditTime: 2021-07-27 16:19:59
 * @FilePath: \dooringx\packages\dooringx-example\src\plugin\commands\lock.ts
 */
import { CommanderItemFactory, deepCopy } from 'dooringx-core';
import { IStoreData } from 'dooringx-core/dist/core/store/storetype';

const lock = new CommanderItemFactory(
	'lock',
	'',
	(store) => {
		const clonedata: IStoreData = deepCopy(store.getData());
		clonedata.block.forEach((v) => {
			if (v.focus) {
				v.canDrag = false;
			}
		});
		store.setData(clonedata);
	},
	'锁定'
);

export default lock;
