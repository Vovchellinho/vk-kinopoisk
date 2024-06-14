const path = require('path');
	module.exports = {
		webpack: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@UI': path.resolve(__dirname, 'src/UI'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@API': path.resolve(__dirname, 'src/API'),
		},
	},
};