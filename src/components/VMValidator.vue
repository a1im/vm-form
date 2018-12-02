<template lang="pug">
    .vm-validator(
    v-if="field.type !== 'hidden'"
    @mouseenter="field.onValidator($event)"
    @touchstart="field.onValidator($event)"
    )
        .vm-validator-circle(
        :class=`{
            error: !field._isEdit && field._isInvalid === true,
            success: field._isInvalid === false,
            warn: field._isEdit && field._isInvalid === true,
        }`
        )
</template>

<script>
import { MixinAll } from '../mixins/index';


export default {
    name: 'vm_validator',

    mixins: [MixinAll],
};
</script>

<style lang="stylus">
    .vm-validator
        position absolute
        top: 50%
        transform: translateY(-50%)
        right: 10px
        cursor pointer
        padding 6px
        z-index: 3

        .vm-validator-circle
            width 12px
            height 12px
            border-radius: 100px
            background-color var(--validation-default)

            &.success
                background-color var(--validation-success)

            &.error
                background-color var(--validation-error)

            &.warn
                background-color var(--validation-warn)
</style>
