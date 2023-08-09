import { useEffect } from 'react';

/**
 * @export 用于简化注册函数代码
 * @param {boolean} dep 配置的开关
 * @param {('preview' | 'edit')} context 传递的环境变量
 * @param {Function} registFn 注册的函数
 */
export function useRegistFunc(dep: boolean, context: 'preview' | 'edit', registerFn: Function) {
	useEffect(() => {
		let unRegister: Function = () => {};
		if (dep) {
			unRegister = registerFn;
		}
		return () => {
			if (context === 'preview') {
				unRegister(); // 必须在预览时注销，否则影响二次点击效果，不在预览注销影响编辑时跨弹窗
			}
		};
	}, [context, dep, registerFn]);
}
