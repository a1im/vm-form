export default {
    name: 'vm_field_all',

    functional: true,

    props: {
        fields: {
            type: Array,
            required: true,
        },
        langNameText: {
            type: Object,
        },
        excludes: {
            type: [Array],
            default: () => ([]),
        },
        includes: {
            type: [Array],
            default: () => ([]),
        },
    },

    render: (ce, ctx) => {
        const {
            props,
            data,
        } = ctx || {};
        const { staticClass, class: className } = data || {};
        const {
            fields,
            langNameText,
            excludes,
            includes,
            // ...propsOld
        } = props || {};

        return fields
            .filter(field => field.type !== 'hidden'
                && !excludes.includes(field.name)
                && !(includes.length && !includes.includes(field.name)))
            .map(field => ce('VMField', {
                props: {
                    field,
                    langNameText,
                    key: field.name,
                    // ...propsOld,
                },
                class: [
                    { [staticClass]: staticClass },
                    (className || []),
                ],
            }));
    },
};
