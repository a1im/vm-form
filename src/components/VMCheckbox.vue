<template lang="pug">
    PropsSplit(:props="$props" component="VMFieldWrapper")
        label.label(v-if="text.label") {{ text.label }}
        input.vm-input.vm-input-checkbox(
        :value="text.placeholder"
        )
        label
            .vm-field-overlay
            .vm-checkbox(:class="{ active: value }")
                input(
                ref="input"
                :class="inputClass"
                :disabled="field.disabled"
                :required="required"
                type="checkbox"
                :checked="value"
                :name="name"
                :tabindex="field.tabindex"
                :autofocus="field.autofocus"
                @change="onInput($event.target.checked)"
                )
                .vm-checkbox-circle
</template>

<script>
import Field from './Field';


export default Field.extend({
    name: 'vm_checkbox',
});
</script>

<style lang="stylus" scoped>
    .vm-field
        position relative

        &:hover .vm-input-checkbox
            background-color var(--select-option-bg-hover)
            color var(--select-option-color-hover)
            border-color transparent

        .vm-field-overlay
            bottom 0
            cursor pointer
            height 100%
            left 0
            position absolute
            right 0
            top 0
            width 100%
            z-index 3

            &:hover
                + .vm-checkbox .vm-checkbox-circle
                    background-color var(--checkbox-circle-bg-checked)

        .vm-checkbox
            input
                position absolute
                opacity 0
                pointer-events none

                &:checked + .vm-checkbox-circle
                    background-color var(--checkbox-circle-bg-checked)

            .vm-checkbox-circle
                background-color var(--checkbox-circle-bg)
                border-radius 50%
                height 1em
                width 1em
                position absolute
                top: 50%
                transform translateY(-50%)
                right: calc(var(--right-icon-width) / 2 - 8px)
                transition all .2s
                z-index 2
                cursor pointer

</style>
