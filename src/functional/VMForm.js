import { Form } from '../models';


export default options => ({
    functional: true,

    name: 'vm_form',

    props: {
        form: {
            type: Object,
            required: true,
            validator: value => value instanceof Form,
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

    methods: {
        async submit() {
            this.$emit('submit');
            await this.form.onSubmit();
        },
    },

    render: (ce, ctx) => {
        const {
            children,
            listeners,
            data,
            props,
        } = ctx || {};

        if (
            !props
            || !props.form
            || !(props.form instanceof Form)
        ) {
            console.error('required props form!!!', ctx);

            return;
        }

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

        return ce('form', {
            class: [
                { [staticClass]: staticClass },
                (className || []),
            ],
            on: {
                async submit(event) {
                    event.preventDefault();
                    await form.onSubmit();
                },
                ...listeners,
            },
        }, children || [
            ce('VMFieldAll', {
                props: {
                    fields: form.fields,
                    langNameText,
                    excludes,
                    includes,
                    class: fieldClass || [],
                },
            }),
            ce('button', {
                class: ['vm-button', buttonClass || []],
                attrs: {
                    type: 'submit',
                    disabled,
                },
            }, submitText),
        ]);
    },
});
