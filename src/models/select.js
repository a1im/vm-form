/* eslint-disable no-undef */
import Field from './field';

export default class Select extends Field {
    constructor({
        multiple = false,
        autocomplete = false,
        options = [],

        component = 'VMSelect',
        ...defaultProps
    }) {
        super({
            ...defaultProps,
            component,
        });

        this.options = options;
        this.multiple = multiple;
        this.autocomplete = autocomplete;
    }

    setValue(value) {
        if (this.multiple) {
            if (!Array.isArray(this.value[this.prop])) {
                this.value[this.prop] = [];
            }

            const index = this.value[this.prop].indexOf(value);

            if (index === -1) {
                this.value[this.prop].push(value);
            } else {
                this.value[this.prop].splice(index, 1);
            }
        } else {
            this.value[this.prop] = value;
        }
    }

    firstOption() {
        return this.options[0] || {};
    }
}
