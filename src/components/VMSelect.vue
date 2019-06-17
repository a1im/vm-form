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
import BaseInput from './BaseInput.vue';


export default Select.extend({
    name: 'vm_select',

    components: {
        VMSelectOptions,
        BaseInput,
    },
});
</script>
