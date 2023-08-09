interface MoveStateType {
	startX: number;
	startY: number;
	fn: Function;
	isMove: boolean;
}

export const moveState: MoveStateType = {
	startX: 0,
	startY: 0,
	fn: () => {},
	isMove: false,
};

export const mouseUp = () => {
	if (moveState.isMove) {
		moveState.isMove = false;
	}
};

export const controlMouseMove = (e: React.MouseEvent) => {
	if (moveState.isMove) {
		const diffX = e.clientX - moveState.startX;
		const diffY = e.clientY - moveState.startY;
		const setXy = moveState.fn;
		if (setXy) setXy((pre: { x: number; y: number }) => ({ x: pre.x + diffX, y: pre.y + diffY }));
		moveState.startX = e.clientX;
		moveState.startY = e.clientY;
	}
};
