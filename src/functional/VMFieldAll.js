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
    },

    render: (ce, ctx) => {
        const {
            props,
            data,
        } = ctx || {};
        const { staticClass, class: className } = data || {};
        const { fields, langNameText, ...propsOld } = props || {};

        return fields.map(field => ce('VMField', {
            props: {
                field,
                langNameText,
                key: field.name,
                ...propsOld,
            },
            class: [
                { [staticClass]: staticClass },
                (className || []),
            ],
        }));
    },
};
