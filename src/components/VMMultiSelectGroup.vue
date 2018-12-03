<template lang="pug">
    PropsSplit(:props="$props" component="VMFieldWrapper")
        .vm-select-container(:class="classObject")
            .vm-select-input-block
                input.vm-input.vm-select-input(
                v-model="search"
                ref="input"
                :placeholder="text.placeholder"
                @focus.stop="onSearchFocus"
                @dblclick.stop="selectAll"
                )
                .vm-select-input-overlay(v-if="!isAutocomplete" @click="toggle")
                .vm-select-trigger(@click="toggle")
                    VMIcon.vm-icon(:icon="currentIcon")

            transition(name="vm-show-select")
                .vm-select-options-container(v-if="isActive")
                    ul.vm-select-options
                        li.vm-select-option.vm-column(
                        v-if="!searchedOptions || !searchedOptions.length"
                        key="searchedOptionsNotResult"
                        title="Нет результата"
                        )
                            span.vm-select-option-text Нет результата
                        li.vm-select-option.vm-column(
                        v-for="option in searchedOptions"
                        :key="option.value"
                        :title="option.label"
                        )
                            span.vm-select-option-text {{ option.label }}
                            ul.vm-select-options-group(:class="{ multiple: isMultiple }")
                                li.vm-select-option(
                                v-for="val in option.options"
                                :key="val"
                                :title="val"
                                :class="{ selected: checkSelected({ group: option.value, value: val }) }"
                                @click="selectOption(option, val)"
                                )
                                    span.vm-select-option-text {{ val }}
</template>

<script>
import MixinField from '../mixins/field';
import MixinFieldSelect from '../mixins/fieldSelect';


export default {
    name: 'vm_select',

    mixins: [MixinField, MixinFieldSelect],

    methods: {
        checkSelected(newValue) {
            const value = this.field.getValue();

            return Array.isArray(value)
                ? value.find(el => (el.group === newValue.group && el.value === newValue.value))
                : null;
        },

        checkSelectedGroup(newValue) {
            const value = this.field.getValue();

            return Array.isArray(value)
                ? value.find(el => (el.group === newValue.group))
                : null;
        },

        selectOption(option, newValue) {
            const value = this.field.getValue() || [];

            newValue = { group: option.value, value: newValue.toString() };
            const isValue = this.checkSelected(newValue);

            if (isValue) {
                const index = value.findIndex(el => el === isValue);

                value.splice(index, 1);
            } else {
                if (!this.isMultiple) {
                    const groupIsSelected = this.checkSelectedGroup({ group: option.value });

                    if (groupIsSelected) {
                        const index = value.findIndex(el => el === groupIsSelected);

                        value.splice(index, 1);
                    }
                }

                value.push(newValue);
            }

            this.onInput(value, value);
            this.updateOptions();
        },

        updateOptions() {
            const value = this.field.getValue();

            this.setSearch(Array.isArray(value)
                ? value
                    .map(el => el.value)
                    .join(', ')
                : '');
        },
    },
};
</script>
