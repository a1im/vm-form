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
                    VMIcon(:icon="currentIcon")

            transition(name="vm-show-select")
                .vm-select-options-container(v-if="isActive")
                    RecycleScroller(
                        :items="multiOptions"
                        :item-size="35"
                        class="vm-select-options"
                        v-slot="{ item }"
                    )
                        .vm-select-option(
                            :key="item.id"
                            :title="item.label"
                            :class="[item.class, { multiple: isMultiple }, { selected: item.parent && checkSelected({ group: item.parent.value, value: item.value }) }]"
                            @click="selectOption(item)"
                        )
                            span.vm-select-option-text {{ item.label }}
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { RecycleScroller } from 'vue-virtual-scroller';
import VMSelect from './VMSelect.vue';
import { toOption } from '../utils';

export default VMSelect.extend({
    name: 'vm_select_group',

    components: {
        RecycleScroller,
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

            this.multiOptions = this.searchedOptions && this.searchedOptions.length
                ? getOptions(this.searchedOptions)
                : { id: 'not-found', label: 'Нет результата' };
        },
    },
});
</script>
