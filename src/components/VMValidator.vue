<template lang="pug">
    .vm-validator(
    v-if="isActive"
    @mouseenter="field.onValidator($event)"
    @touchstart="field.onValidator($event)"
    )
        .vm-validator-circle(
            :class=`{
                error: isError,
                success: isSuccess,
                warn: isWarning,
            }`
        )
</template>

<script>
import Entity from './Entity';


export default Entity.extend({
    name: 'vm_validator',

    computed: {
        isActive() {
            return this.field.type !== 'hidden' && !this.field.disabled;
        },

        isError() {
            return !this.field._isEdit && this.field._isInvalid === true;
        },

        isSuccess() {
            return this.field._isInvalid === false;
        },

        isWarning() {
            return this.field._isEdit && this.field._isInvalid === true;
        },
    },
});
</script>

<style lang="stylus">
    .vm-validator
        position absolute
        top: 50%
        transform: translateY(-50%)
        right: calc(var(--right-icon-width) / 2 - 12px)
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
