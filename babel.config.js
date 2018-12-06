const presets = [
    ['@vue/app', {
        polyfills: [
            'es6.array.iterator',
            'es6.promise',
            'es6.symbol',
        ],
    }],
];
const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
];

module.exports = { presets, plugins };
