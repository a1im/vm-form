import Entity from './Entity';
import { PropsSplit } from '../functional';
import VMFieldWrapper from './VMFieldWrapper.vue';
import VMValidator from './VMValidator.vue';
import { getCaretPosition, setCursorPosition } from '../utils';
import { Field } from '../models';


export default Entity.extend({
    props: {
        field: {
            type: Object,
            validator: value => value instanceof Field,
            required: true,
        },
    },

    components: {
        VMFieldWrapper,
        VMValidator,
        PropsSplit,
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
            this.field.checkValidation();
            this.field.onChange(value, data);
            this.$emit('input', value, data);
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
});
