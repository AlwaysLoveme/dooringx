import React from 'react';
import { AllHTMLAttributes, CSSProperties, PropsWithChildren, useRef } from 'react';

import Ticker from './ticker';
import UserConfig from '@/config';
import { wrapperEvent } from './event';
import { onWheelEvent } from '@/core/scale';
import TimeLine from '../timeLine/timeline';

import styles from '@/index.less';

export interface ContainerWrapperProps extends AllHTMLAttributes<HTMLDivElement> {
	config: UserConfig;
	classNames?: string;
	style?: CSSProperties;
}

function ContainerWrapper(props: PropsWithChildren<ContainerWrapperProps>) {
	const { children, style, classNames, config, ...rest } = props;
	const ref = useRef<HTMLDivElement>(null);
	const ticker = props.config.ticker;
	return (
		<div
			className={`ant-menu ${classNames ? classNames : ''} ${styles.yh_container_wrapper}`}
			ref={ref}
			style={{
				backgroundColor: '#f0f0f0',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
				position: 'relative',
				overflow: 'hidden',
				userSelect: 'none',
				...style,
			}}
			{...wrapperEvent(ref, props.config)}
			{...onWheelEvent(props.config)}
			{...rest}
		>
			{config.timeline && <TimeLine config={config}></TimeLine>}
			{children}
			{ticker && <Ticker config={props.config}></Ticker>}
		</div>
	);
}
export default ContainerWrapper;
