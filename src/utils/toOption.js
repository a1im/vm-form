export default el => ({
    value: typeof el === 'object'
        ? el.value === undefined ? el.label : el.value
        : el,
    label: typeof el === 'object'
        ? el.label === undefined ? el.value : el.label
        : el,
    options: el && el.options || [],
});
