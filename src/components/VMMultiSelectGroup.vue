<template lang="pug">
    VMFieldWrapper(v-bind="$props")
        .vm-select-container(:class="classObject")
            .vm-select-input-block
                BaseInput.vm-select-input(
                    :field="SearchField"
                    @focus.stop="onSearchFocus"
                    @dblclick.stop="selectAll"
                )
                .vm-select-input-overlay(v-if="!isAutocomplete" @click="toggle")
                .vm-select-trigger(@click="toggle")
                    VMIcon(:icon="currentIcon")

            transition(name="vm-show-select")
                VMSelectOptions(
                    v-if="isActive"
                    :items="multiOptions"
                    :classes="{ multiple: isMultiple }"
                    v-slot="{ item }"
                )
                    .vm-select-option(
                        :key="item.id"
                        :title="item.label"
                        :class="[item.class, { selected: item.parent && checkSelected({ group: item.parent.value, value: item.value }) }]"
                        @click="!item.disabled && selectOption(item)"
                    )
                        span.vm-select-option-text {{ item.label }}
</template>

<script>
import VMSelect from './VMSelect.vue';
import VMSelectOptions from './VMSelectOptions.vue';
import { toOption } from '../utils';

export default VMSelect.extend({
    name: 'vm_select_group',

    components: {
        VMSelectOptions,
    },

    data: () => ({
        multiOptions: [],
    }),

    watch: {
        isActive(val) {
            if (val) {
                this.updateOptionItems();
            }
        },
    },

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

        selectOption({ parent, value: newValue }) {
            if (!parent) {
                return;
            }
            const value = this.field.getValue() || [];

            newValue = { group: parent.value, value: newValue.toString() };
            const isValue = this.checkSelected(newValue);

            if (isValue) {
                const index = value.findIndex(el => el === isValue);

                value.splice(index, 1);
            } else {
                if (!this.isMultiple) {
                    const groupIsSelected = this.checkSelectedGroup({ group: parent.value });

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

        updateOptionItems() {
            const getOptions = (options, level = 0, key = '', parent = null) => options.reduce((accum, el) => {
                el = toOption(el);
                // eslint-disable-next-line no-shadow
                const { options = [], value } = el;
                const newKey = `${key}_lvl${level}_${value}`;
                const newEl = {
                    ...el,
                    options: [],
                    level,
                    id: newKey,
                    class: [
                        `level-${level}`,
                    ],
                    parent,
                };

                accum.push(newEl);
                getOptions(options, level + 1, newKey, newEl).forEach(it => accum.push(it));

                return accum;
            }, []);

            this.multiOptions = getOptions(this.searchedOptions);
        },
    },
});
</script>
