<template lang="pug">
    .vm-calendar-header(:class="{ opened }")
        .vm-calendar-header-body(v-on:click="$emit('click')")
            .vm-calendar-header-date-name
                span {{ dateFirst.toLocaleDateString() }}
                template(v-if="dateLast && dateFirst.getTime() !== dateLast.getTime()")
                    span.vm-calendar-header-separator -
                    span {{ dateLast.toLocaleDateString() }}
            VMIcon.vm-calendar-icon(icon="calendar")
</template>

<script>
export default {
    name: 'vm_calendar_header',

    props: {
        interval: {
            type: Array,
            required: true,
        },
        opened: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        dateFirst() {
            return this.interval.length >= 1 ? new Date(this.interval[0]) : false;
        },
        dateLast() {
            return this.interval.length >= 2 ? new Date(this.interval[1]) : false;
        },
    },
};
</script>

<style lang="stylus">
    .vm-calendar-header
        display: flex
        align-items: stretch
        cursor pointer
        width 100%
        border-radius var(--border-radius)
        transition border, border-radius .1s

        .vm-calendar-header-separator
            margin 0 5px

        .vm-calendar-header-body
            background-color var(--bg-color)
            position: relative
            display: flex
            align-items: center
            flex 1
            text-align center
            font-size 1em
            cursor pointer
            user-select none
            padding 0 .5em
            height var(--field-height)
            border var(--border-width) solid var(--border-color)
            border-radius var(--border-radius)
            transition border, border-radius .1s
            width 100%

        .vm-calendar-header-body-item
            display: flex

        &.opened
            .vm-calendar-header
            .vm-calendar-header-body
                border-bottom-left-radius 0
                border-bottom-right-radius 0

            .vm-calendar-header-body
                z-index 5
                // border-bottom none
                // padding-bottom: var(--border-width)

        .vm-calendar-header-date-name
            user-select none
            margin 0 auto
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap

        .vm-calendar-icon
            flex none

</style>
