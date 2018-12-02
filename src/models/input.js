/* eslint-disable no-undef */
import Field from './field';

export default class Input extends Field {
    constructor({
        minlength = null,
        maxlength = null,
        readonly = false,
        type = 'text',

        component = 'VMInput',
        ...defaultProps
    }) {
        super({
            ...defaultProps,
            component,
        });

        this.type = type;
        this.minlength = minlength;
        this.maxlength = maxlength;
        this.readonly = readonly;
    }
}
