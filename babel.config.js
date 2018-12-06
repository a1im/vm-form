const presets = [
    ['@vue/app', {
        polyfills: [
            'es6.array.iterator',
            'es6.promise',
            'es6.symbol',
        ],
    }],
];
const plugins = [];

module.exports = { presets, plugins };
