/* eslint-disable no-undef */
import Field from './field';

const MAX_TIME = 24 * 60;

export default class TimePicker extends Field {
    static gAddZeroFirst(value) {
        return (+value < 10 ? '0' : '') + value.toString();
    }

    constructor({
        autocomplete = true,
        startTime = 0,
        offset = MAX_TIME,
        interval = 5,
        isRange = false,
        isRangeUpdated = true,

        component = 'VMTimePicker',
        value = [0, 0],
        ...defaultProps
    }) {
        super({
            ...defaultProps,
            component,
        });

        this.autocomplete = autocomplete;
        this.startTime = startTime;
        this.endTime = startTime + offset;
        this.offset = offset;
        this.interval = interval;
        this.isRange = isRange;
        this.isRangeUpdated = isRangeUpdated;

        this.setValue(value);
    }

    checkValue(value) {
        value = !Array.isArray(value) ? [value, 0] : value;

        if (value.length !== 2) {
            const val1 = +(value[0] || this.startTime);
            const val2 = +(value[1] || this.startTime);

            value = [val1, val2];
        }

        if (value[0] < this.startTime) {
            value[0] = this.startTime;
        }

        if (value[0] > this.endTime) {
            value[0] = this.endTime;
        }

        if (value[1] < this.startTime) {
            value[1] = this.startTime;
        }

        if (value[1] > this.endTime) {
            value[1] = this.endTime;
        }

        return value;
    }

    timeAll() {
        const arr = [];

        for (let i = this.startTime; i <= this.endTime; i += this.interval) {
            const hour = ~~((i / 60) % 24);
            const minute = i % 60;

            arr.push({
                value: i, // hour * 60 + minute
                label: `${TimePicker.gAddZeroFirst(hour)}:${TimePicker.gAddZeroFirst(minute)}`,
            });
        }

        return arr;
    }

    timeFrom() {
        const options = this.timeAll();

        if (this.isRange) {
            options.pop();
        }

        return options;
    }

    timeTo() {
        if (!this.isRangeUpdated) return this.timeFrom();

        const currentStart = this.value[this.prop][0] + this.interval;
        const options = this.timeAll();

        return options.filter(el => el.value >= currentStart);
    }
}
