import { Field } from '../models';


export default components => ({
    functional: true,

    render: (ce, ctx) => {
        const {
            props,
            data,
            listeners,
        } = ctx || {};
        const { field = {} } = props;
        const { component = '' } = field;
        const componentField = components[component];

        if (!(field instanceof Field) || !component) {
            console.error('required prop field!!!', ctx);

            return;
        }

        if (!componentField) {
            console.error(`component "${component}" not found!!!`);

            return;
        }

        field.listeners = {
            ...field.listeners,
            ...listeners,
        };

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
