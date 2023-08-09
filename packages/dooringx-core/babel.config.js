module.exports = {
	presets: [
		// [
		// 	'@babel/env',
		// 	{
		// 		modules: false,
		// 	},
		// ],
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
		'@babel/preset-react',
	],
};
