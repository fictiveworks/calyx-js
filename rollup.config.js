import pkg from './package.json';

export default [
	{
		input: 'src/calyx.js',
		output: {
      name: 'calyx',
			file: pkg.browser,
			format: 'iife'
		}
	},
	{
		input: 'src/calyx.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
