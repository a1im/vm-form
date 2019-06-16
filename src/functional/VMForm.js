import { Form } from '../models';


export default options => ({
    functional: true,

    name: 'vm_form',

    props: {
        form: {
            type: Form,
            required: true,
        },
        langNameText: {
            type: Object,
        },
        submitText: {
            type: String,
            default: options.submitText || 'Submit',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        fieldClass: {
            type: [Object, Array, String],
            default: () => (options.fieldClass || {}),
        },
        buttonClass: {
            type: [Object, Array, String],
            default: () => (options.buttonClass || {}),
        },
        excludes: {
            type: [Array],
        },
        includes: {
            type: [Array],
        },
    },

    render: (h, ctx) => {
        const {
            children,
            listeners,
            data,
            props,
        } = ctx || {};
        const { staticClass, class: className } = data || {};
        const {
            form,
            submitText,
            disabled,
            fieldClass,
            buttonClass,
            langNameText,
            excludes,
            includes,
        } = props || {};

        return h('form', {
            class: [
                { [staticClass]: staticClass },
                (className || []),
            ],
            on: {
                async submit(event) {
                    // console.log('', Array.from(event.srcElement));
                    form.fields.forEach(it => it.onValidator(event));
                    event.preventDefault();
                    await form.onSubmit();
                },
                ...listeners,
            },
        }, children || [
            h('VMFieldAll', {
                props: {
                    fields: form.fields,
                    langNameText,
                    excludes,
                    includes,
                    class: fieldClass || [],
                },
            }),
            h('button', {
                class: ['vm-button', buttonClass || []],
                attrs: {
                    type: 'submit',
                    disabled,
                },
            }, submitText),
        ]);
    },
});
