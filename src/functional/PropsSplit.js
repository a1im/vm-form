export default {
    functional: true,

    render: (ce, ctx) => {
        const {
            props,
            data,
            children,
        } = ctx || {};

        if (
            !props
            || !props.props
            || !props.component
        ) {
            console.error('required attr props & component!!!', ctx);

            return;
        }

        const { props: proxyProps, component } = props;
        const { staticClass, class: className } = data || {};

        return ce(component, {
            props: proxyProps,
            class: [
                { [staticClass]: staticClass },
                (className || []),
            ],
        }, children || []);
    },
};
