/**
 * @export
 * @param {number} top
 * @param {number} left
 * @param {(string | number | undefined)} height
 * @param {(string | number | undefined)} width
 * @param {boolean} isFixed
 * @returns
 */
export function transfer(
	top: number,
	left: number,
	height: string | number | undefined,
	width: string | number | undefined,
	isFixed: boolean
) {
	if (isFixed) {
		// 由于是375x667基准，所以top大于667的，那么top为底部高度
		let newTop = 0;

		const newLeft = getRealWidth(left);
		let newHeight: string | number | undefined;
		let newWidth: string | number | undefined;
		if (typeof height === 'string' || typeof height === 'undefined') {
			newHeight = height;
		} else {
			newHeight = getRealHeight(height);
		}
		if (typeof width === 'string' || typeof width === 'undefined') {
			newWidth = width;
		} else {
			newWidth = getRealWidth(width);
		}

		if (top >= 667) {
			if (typeof newHeight === 'number') {
				newTop = getRealHeight() - newHeight;
			} else {
				// 如果没有高度或者高度是百分比，则定位会有问题
				newTop = getRealHeight();
			}
		} else {
			if (typeof height === 'number' && top >= 667 - height && typeof newHeight === 'number') {
				// 这种是距离底部比高多 按底部计算
				newTop = getRealHeight() - newHeight;
			} else {
				newTop = getRealHeight(top);
			}
		}
		return {
			top: newTop,
			left: newLeft,
			height: newHeight,
			width: newWidth,
		};
	} else {
		const newTop = getRealHeight(top);
		const newLeft = getRealWidth(left);
		let newHeight: string | number | undefined;
		let newWidth: string | number | undefined;
		if (typeof height === 'string' || typeof height === 'undefined') {
			newHeight = height;
		} else {
			newHeight = getRealHeight(height);
		}
		if (typeof width === 'string' || typeof width === 'undefined') {
			newWidth = width;
		} else {
			newWidth = getRealWidth(width);
		}

		return {
			top: newTop,
			left: newLeft,
			height: newHeight,
			width: newWidth,
		};
	}
}

export function getCurrentMobileInfo() {
	let userAgentMatched = window.navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	);
	const width = userAgentMatched
		? window.innerWidth
		: window.innerWidth < 500
		? window.innerWidth
		: 375;

	const height = userAgentMatched
		? window.screen.availHeight
		: window.screen.availHeight < 667
		? window.screen.availHeight
		: 667;
	return [width, height];
}

export function getRealWidth(w: number | string = 375) {
	const width = typeof w === 'string' ? parseFloat(w) : w;
	return (getCurrentMobileInfo()[0] / 375) * width;
}

export function getRealHeight(H: number | string = 667) {
	const height = typeof H === 'string' ? parseFloat(H) : H;
	return (getCurrentMobileInfo()[0] / 375) * height;
}
