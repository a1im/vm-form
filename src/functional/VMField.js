import { Field } from '../models';


export default components => ({
    functional: true,

    render: (ce, ctx) => {
        const {
            props,
            data,
        } = ctx || {};

        if (
            !props
            || !props.field
            || !(props.field instanceof Field)
            || !props.field.component
        ) {
            console.error('required prop field!!!', ctx);

            return;
        }

        if (!components[props.field.component]) {
            console.error(`component "${props.field.component}" not found!!!`);

            return;
        }

        const componentField = components[props.field.component];
        const { staticClass, class: className } = data || {};

        return ce(componentField, {
            props,
            class: [
                { [staticClass]: staticClass },
                (className || []),
            ],
        });
    },
});
