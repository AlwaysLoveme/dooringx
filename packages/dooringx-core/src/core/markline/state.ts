export interface RealStyleType {
	[x: string]: number;
	left: number;
	width: number;
	height: number;
	right: number;
	top: number;
	bottom: number;
}

interface MarklineStateType {
	cache: null | Record<string, RealStyleType>;
	sortLeft: null | Array<RealStyleType>;
	sortTop: null | Array<RealStyleType>;
	sortRight: null | Array<RealStyleType>;
	sortBottom: null | Array<RealStyleType>;
}
export const marklineState: MarklineStateType = {
	cache: null,
	sortLeft: null,
	sortTop: null,
	sortRight: null,
	sortBottom: null,
};
