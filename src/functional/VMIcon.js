// import iconsBundle from '../assets/icons_bundle.svg';

export default iconBundle => ({
    name: 'vm_icon',

    functional: true,

    props: {
        icon: [String, Array],
        src: String,
    },

    render: (c, ctx) => {
        const {
            props,
            data,
            listeners,
        } = ctx || {};
        const { staticClass, class: className } = data || {};
        const svgLink = `${iconBundle}#${props.icon}`;

        return c('svg', {
            props: {
                key: svgLink,
            },
            on: {
                ...listeners,
            },
            class: [
                'vm-icon',
                { [staticClass]: staticClass },
                (className || []),
            ],
        }, [c('use', {
            attrs: {
                'xlink:href': svgLink,
            },
        })]);
    },
});
