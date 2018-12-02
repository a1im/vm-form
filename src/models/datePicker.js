/* eslint-disable no-undef */
import Field from './field';

export default class DatePicker extends Field {
    constructor({
        value = [],
        component = 'VMDatePicker',
        ...defaultProps
    }) {
        if (!value || value.length < 2) {
            const startDate = new Date();
            const endDate = new Date();

            startDate.setDate(endDate.getDate() - 7);
            value = [
                startDate,
                endDate,
            ];
        }
        super({
            ...defaultProps,
            component,
            value,
        });
    }
}
