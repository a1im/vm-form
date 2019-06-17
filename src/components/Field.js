import Entity from './Entity';
import VMFieldWrapper from './VMFieldWrapper.vue';
import VMValidator from './VMValidator.vue';
import { getCaretPosition, setCursorPosition } from '../utils';
import { Field } from '../models';


export default Entity.extend({
    props: {
        field: {
            type: Field,
            required: true,
        },
    },

    components: {
        VMFieldWrapper,
        VMValidator,
    },

    methods: {
        beforeOnInput() {},

        onInput(value, data = {}) {
            this.field._isEdit = true;
            console.log(`${this.componentName}: `, `val: ${value}`, `res: ${this.field.checkValue(value)}`);
            value = this.field.checkValue(value);

            if (this.field.$el) {
                // реактивность не срабатывает если после checkValue значение не изменилось
                const elem = this.field.$el;
                const posCur = getCaretPosition(elem);

                elem.value = value;
                setCursorPosition(elem, posCur);
            }

            this.beforeOnInput(value);
            this.field.setValue(value);
            this.field.updateValidation();
            this.field.onChange(value, data);
            this.$emit('input', value, data);
        },

        autoFocus() {
            if (this.field.autofocus && this.$refs.input) {
                this.$refs.input.focus();
            }
        },
    },

    watch: {
        text() {
            this.field.setText(this.text);
        },
    },

    created() {
        this.field.setText(this.text);
    },

    mounted() {
        this.autoFocus();
    },
});
