// 设定函数配置项格式，
export type FunctionDataType = keyof FunctionDataMap;
export type FunctionNameType = string;
export type FunctionOptionConfigType = {
	receive: string;
	multi: boolean;
};
export interface FunctionDataMap {
	dataSource: FunctionOptionConfigType;
	modal: FunctionOptionConfigType;
	input: FunctionOptionConfigType;
	ctx: FunctionOptionConfigType;
}
// data 如果是''则在datasource,input,ctx选择  有可能是空
export type FunctionConfigType = {
	name: FunctionNameType; // 会放到左侧展示 唯一！
	data: FunctionDataType[]; //可能空
	options: FunctionOptionConfigType;
}[];
