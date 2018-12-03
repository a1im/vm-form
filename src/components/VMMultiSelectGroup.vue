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
                    ul.vm-select-options.level1
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
                        )
                            span.vm-select-option-text {{ option.label }}
                            ul.vm-select-options.multiple
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

<style lang="stylus" scoped>
    .vm-field
        .vm-select-container
            width 100%
            position relative

            &.active
                .vm-select-input
                .vm-select-input-block
                    border-bottom-left-radius 0
                    border-bottom-right-radius 0

                .vm-select-trigger
                .vm-select-icon
                    z-index 5

                .vm-select-input
                    position relative
                    z-index 5
                    transition border-radius .1s

                .vm-select-input-overlay
                    z-index 5

        .vm-select-input
            padding-right $xxl
            text-overflow ellipsis
            transition border-radius .1s .2s
            z-index 1

        .vm-select-input-block
            border-radius var(--border-radius)
            color currentColor
            display flex
            position relative

        .vm-select-input-overlay
            bottom 0
            cursor pointer
            height 100%
            left 0
            position absolute
            right 0
            top 0
            width 100%
            z-index 2

        .vm-select-trigger
        .vm-select-icon
            cursor pointer
            padding 0 $md
            position absolute
            right 0
            top 50%
            transform translateY(-50%)
            width 2.5em
            z-index 3

        .vm-select-trigger
            padding 0 $lg 0 $sm
            align-items center
            display flex
            height 2.5em
            justify-content center
            position absolute

        .vm-select-icon
            height $lg

        .vm-select-options
            overflow-x hidden
            overflow-y auto

            &.level1
                max-height 194px

            &.multiple
                overflow: unset
                width 100%

                > .vm-select-option
                    flex-direction: row
                    align-items: center
                    padding 0

                    &::after
                        background-color $success
                        border-radius $radius-ellipse
                        content ''
                        display none
                        height 1em
                        margin-right .55rem
                        width 1em
                        transition all .2s

                    @media $tablet
                        &:hover
                            background-color var(--bg-option-hover)
                            color var(--option-hover)

                    &.selected
                        // &:hover::after
                        //     background-color white

                        &::after
                            background-color $success
                            display inline-block

        .vm-select-options-container
            background-color var(--bg-select-container)
            border-bottom-left-radius var(--border-radius)
            border-bottom-right-radius var(--border-radius)
            border-top 2px solid var(--options-border-top)
            font-size 1em
            left 0
            overflow hidden
            padding $xs 0
            position absolute
            right 0
            z-index 4

        .vm-select-option
            border 2px solid transparent
            border-bottom-width 0
            border-top-width 0
            color currentColor
            cursor pointer
            display: flex
            flex-direction: column
            align-items: flex-start
            justify-content space-between

        .vm-select-option-text
            display block
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            line-height 2.5em
            padding 0 var(--padding)

        .level1 > .vm-select-option > .vm-select-option-text
            text-transform: uppercase
            // opacity .5
            font-weight 600
            font-size: 13px
            line-height 2
            color $primary-dark

</style>
