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
                    VMIcon.icon(:icon="isActive ? 'up' : 'down'")

            transition(name="vm-show-select")
                .vm-select-options-container(v-if="isActive")
                    ul.vm-select-options(:class="{ multiple: isMultiple }")
                        li.vm-select-option(
                        v-if="!searchedOptions || !searchedOptions.length"
                        key="searchedOptionsNotResult"
                        :title="lang.common.no_result"
                        )
                            span.vm-select-option-text {{ lang.common.no_result }}
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
import MixinFieldSelect from '../mixins/fieldSelect';


export default {
    name: 'vm_select',

    mixins: [MixinField, MixinFieldSelect],
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

                .vm-select-input-overlay
                    z-index 5

        .vm-select-input
            padding-right $xxl
            text-overflow ellipsis
            transition border-radius .2s
            z-index 2

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
            max-height 194px
            overflow-x hidden
            overflow-y auto

            // &.multiple
            .vm-select-option
                &::after
                    background-color $success
                    border-radius $radius-ellipse
                    content ''
                    display none
                    height 1em
                    margin-right .7rem
                    width 1em
                    transition all .2s

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
            align-items center
            border 2px solid transparent
            border-bottom-width 0
            border-top-width 0
            color currentColor
            cursor pointer
            display flex
            font-weight 600
            justify-content space-between
            // padding $xs var(--padding)

            @media $tablet
                &:hover
                    background-color var(--bg-option-hover)
                    color var(--option-hover)

        .vm-select-option-text
            display block
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            padding 0 var(--padding)
            line-height 2.5em

</style>
