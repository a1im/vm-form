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
                    ul.vm-select-options(:class="{ multiple: isMultiple }")
                        li.vm-select-option(
                        v-if="!searchedOptions || !searchedOptions.length"
                        key="searchedOptionsNotResult"
                        title="Нет результата"
                        )
                            span.vm-select-option-text Нет результата
                        li.vm-select-option(
                        v-for="option in searchedOptions"
                        :key="option.value"
                        :title="option.label"
                        :class="{ selected: optionSelected(option) }"
                        @click="selectOption(option)"
                        )
                            span.vm-select-option-text {{ option.label }}
</template>

<script>
import MixinField from '../mixins/field';
import MixinDropdown from '../mixins/dropdown';
import MixinSelect from '../mixins/fieldSelect';


export default {
    name: 'vm_select',

    mixins: [MixinField, MixinDropdown, MixinSelect],
};
</script>
