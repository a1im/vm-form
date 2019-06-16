<template lang="pug">
    PropsSplit(:props="$props" component="VMFieldWrapper")
        .vm-select-container(:class="classObject")
            .vm-select-input-block
                VMField.vm-select-input(
                    :field="SearchField"
                    ref="input"
                    @focus.stop="onSearchFocus"
                    @dblclick.stop="selectAll"
                )
                .vm-select-input-overlay(v-if="!isAutocomplete" @click="toggle")
                .vm-select-trigger(@click="toggle")
                    VMIcon(:icon="currentIcon")

            transition(name="vm-show-select")
                VMSelectOptions(
                    v-if="isActive"
                    :items="searchedOptions"
                    :classes="{ multiple: isMultiple }"
                    key-field="value"
                    v-slot="{ item }"
                )
                    .vm-select-option.level-1(
                        :key="item.value"
                        :title="item.label"
                        :class="[{ selected: optionSelected(item) }]"
                        @click="!item.disabled && selectOption(item)"
                    )
                        span.vm-select-option-text {{ item.label }}
</template>

<script>
import Select from './Select';
import VMSelectOptions from './VMSelectOptions.vue';


export default Select.extend({
    name: 'vm_select',

    components: {
        VMSelectOptions,
    },
});
</script>
