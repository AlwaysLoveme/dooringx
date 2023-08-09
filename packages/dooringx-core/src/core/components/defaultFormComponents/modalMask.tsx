import React from 'react';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { ComponentItemFactory } from '../abstract';

const ModalMask = new ComponentItemFactory(
	'modalMask',
	'模态框遮罩',
	{},
	{
		props: {},
		position: 'fixed',
		top: 0,
		left: 0,
		zIndex: 999,
		width: '100%',
		height: '100%',
		canDrag: false,
	},
	(_, context, store, config) => {
		const container = store.getData().container;
		return (
			<div
				style={{
					width: context === 'preview' ? '100%' : container.width,
					height: context === 'preview' ? '100%' : container.height,
					backgroundColor: '#716f6f9e',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{context === 'edit' && (
					<Button
						type="primary"
						shape="circle"
						title="save"
						style={{ position: 'absolute', right: '10px', top: '10px' }}
						icon={<SaveOutlined></SaveOutlined>}
						onClick={() => {
							config.getStore().closeModal();
						}}
					></Button>
				)}
			</div>
		);
	},
	true,
	false
);

export default ModalMask;
