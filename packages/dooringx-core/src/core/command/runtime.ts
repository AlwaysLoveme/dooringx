import CommanderWrapper from '.';
import { CommanderItemFactory } from './abstract';

export const registCommandFn = (module: CommanderItemFactory[], commander: CommanderWrapper) => {
	module.forEach((v) => {
		commander.register(v);
	});
};
export const unRegistCommandFn = (module: CommanderItemFactory[], commander: CommanderWrapper) => {
	module.forEach((v) => {
		commander.unRegister(v.name);
	});
};
