<template lang="pug">
    PropsSplit(:props="$props" component="VMFieldWrapper")
        .vm-time-picker
            VMField.vm-time-picker__item(:field="selectTimeFrom")
            VMField.vm-time-picker__item(v-if="isRange" :field="selectTimeTo")
</template>

<script>
import Field from './Field';
import { Select } from '../models';


export default Field.extend({
    name: 'vm_time_picker',

    computed: {
        currentValue() {
            return this.value || [];
        },

        currentStart() {
            const [value] = this.currentValue;

            return value || null;
        },

        currentEnd() {
            const [, value] = this.currentValue;

            return value || null;
        },

        isAutocomplete() {
            return this.field.autocomplete;
        },

        isRange() {
            return this.field.isRange;
        },

        selectTimeFrom() {
            return new Select({
                name: 'VMTimePickerFrom',
                disabled: this.field.disabled,
                tabindex: this.field.tabindex,
                autofocus: this.field.autofocus,
                autocomplete: this.isAutocomplete,
                options: this.field.timeFrom(),
                value: this.currentStart === null ? '' : this.currentStart,
                onChange: value => this.updateTime([+value, this.currentEnd]),
                mask: '##:##',
            });
        },

        selectTimeTo() {
            return new Select({
                name: 'VMTimePickerTo',
                disabled: this.field.disabled,
                tabindex: this.field.tabindex,
                autofocus: this.field.autofocus,
                autocomplete: this.isAutocomplete,
                options: this.field.timeTo(),
                value: this.currentEnd === null ? '' : this.currentEnd,
                onChange: value => this.updateTime([this.currentStart, +value]),
                mask: '##:##',
            });
        },
    },

    methods: {
        updateTime(value) {
            this.onInput(value);
        },
    },
});
</script>

<style lang="stylus" scoped>
    .vm-time-picker
        width 100%
        display: flex

        &__item
            flex 1 0 1px

            &:not(:last-child)
                margin-right: 10px
                margin-bottom: 0
</style>
