import { ComponentItem } from './componentItem';
import { ComponentItemFactory } from './abstract';

/**
 *
 * 注册组件需要异步的，由注册时效果决定。
 * 主要是存放所有已注册组件。可以在其render时提供对应context
 * @class ComponentRegister
 */
export default class ComponentRegister {
	constructor(
		public componentMap: Record<string, ComponentItem> = {},
		public componentList: ComponentItem[] = [],
		public listener: Function[] = [],
		public eventMap: Record<string, Function[]> = {}
	) {}
	getMap() {
		return this.componentMap;
	}
	getList() {
		return this.componentList;
	}
	getComp(name: string) {
		return this.componentMap[name];
	}

	subscribe(fn: Function) {
		this.listener.push(fn);
		return () => this.listener.filter((v) => v !== fn);
	}

	emit() {
		this.listener.forEach((v) => v());
	}

	on(event: string, fn: Function) {
		if (!this.eventMap[event]) {
			this.eventMap[event] = [];
		}
		this.eventMap[event].push(fn);
		return () => this.eventMap[event].filter((v) => v !== fn);
	}
	emitEvent(event: string) {
		if (!this.eventMap[event]) {
			return;
		}
		this.eventMap[event].forEach((v) => v());
	}

	register(item: ComponentItem) {
		if (this.componentMap[item.name]) {
			// console.error(`${item.name} component has registed`);
			return;
		}
		if (!(item instanceof ComponentItemFactory)) {
			console.error(item, 'may be a problem in register');
		}

		this.componentMap[item.name] = item;
		this.componentList.push(item);
		this.emit();
		item.init();
	}

	unRegister(name: string) {
		if (!this.componentMap[name]) {
			console.error(`${name} component not found`);
			return;
		}
		const item = this.componentMap[name];
		item.destroy();
		this.emit();
		this.componentList = this.componentList.filter((v) => v !== item);
		delete this.componentMap[item.name];
	}
}