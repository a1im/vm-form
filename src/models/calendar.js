/* eslint-disable no-undef */
import Field from './field';

export default class Calendar extends Field {
    constructor({
        isRange = false,
        isDouble = false,

        value,
        component = 'VMCalendar',
        ...defaultProps
    }) {
        if (isRange) {
            if (!Array.isArray(value) || value.length !== 2) {
                value = [
                    new Date().getTime(),
                    new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
                ];
            }
        } else if (typeof value !== 'number') {
            value = new Date().getTime();
        }
        super({
            ...defaultProps,
            component,
            value,
        });

        this.isDouble = isDouble;
        this.isRange = isRange;
    }
}
