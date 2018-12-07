import Vue from 'vue';
import { Field } from '../models';


export default Vue.extend({
    props: {
        langText: Object,
        langNameText: Object,
        langProp: String,
        label: String,
        placeholder: String,
        validationError: String,
        message: String,
        field: {
            type: Object,
            required: true,
            validator: value => value instanceof Field,
        },
    },

    computed: {
        name() {
            return this.field.name;
        },

        text() {
            return this.langText
                || (this.langNameText || {})[this.name]
                || Object.assign(
                    {},
                    (this.label ? { label: this.label } : {}),
                    (this.placeholder ? { placeholder: this.placeholder } : {}),
                    (this.validationError ? { validationError: this.validationError } : {}),
                );
        },

        hideValidator() {
            return this.field.hideValidator;
        },

        value() {
            return this.field.value[this.field.prop];
        },

        inputClass() {
            return [
                {
                    validator: !this.hideValidator,
                },
                (this.field.inputClass || []),
            ];
        },

        fieldClass() {
            return [
                {
                    [`vm-field-${this.field.name}`]: true,
                    required: this.field.required,
                },
                (this.field.fieldClass || []),
            ];
        },

        required() {
            return this.field.required || false;
        },

        cMessage() {
            return this.message;
        },

        componentName() {
            return this.$options.name;
        },
    },
});
