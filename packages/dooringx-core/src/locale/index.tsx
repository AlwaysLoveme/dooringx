import React from 'react';
import { FormattedMessage } from 'react-intl';

import { en } from './en';
import { zhCN } from './zh-CN';

import type { UserConfig } from '..';

export const localeMap = {
	'zh-CN': zhCN,
	en,
};
export type localeKey = keyof typeof localeMap;

export { en } from './en';
export { zhCN } from './zh-CN';

export const replaceLocale = (
	id: string,
	msg: string,
	config: UserConfig,
	param?: any,
	paramString?: string
) => {
	if (config.i18n) {
		if (paramString) {
			return (
				<FormattedMessage id={id} defaultMessage={paramString} values={param}></FormattedMessage>
			);
		}
		return <FormattedMessage id={id} defaultMessage={msg}></FormattedMessage>;
	}
	return msg;
};
