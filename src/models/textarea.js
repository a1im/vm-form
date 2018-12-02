/* eslint-disable no-undef */
import Field from './field';

export default class Textarea extends Field {
    constructor({
        row = null,
        coll = null,
        readonly = false,
        minlength = null,
        maxlength = null,

        component = 'VMTextarea',
        ...defaultProps
    }) {
        super({
            ...defaultProps,
            component,
        });

        this.row = row;
        this.coll = coll;
        this.minlength = minlength;
        this.maxlength = maxlength;
        this.readonly = readonly;
    }
}
