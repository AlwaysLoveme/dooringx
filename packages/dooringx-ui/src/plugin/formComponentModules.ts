import type { ComponentClass, FunctionComponent } from 'react';

const modulesFiles = (require as any).context('./formComponents', true, /\.(js|tsx)$/);
export const FormModules: Record<
	string,
	FunctionComponent<any> | ComponentClass<any, any>
> = modulesFiles.keys().reduce((modules: any, modulePath: any) => {
	const tmp = modulePath.split('.');
	const name = tmp[tmp.length - 2].slice(1);
	const value = modulesFiles(modulePath);
	modules[name] = value.default;
	return modules;
}, {});
