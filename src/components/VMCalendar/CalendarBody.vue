<template lang="pug">
    .vm-calendar-body
        .vm-calendar-body-wrapper
            .vm-calendar-body-day.vm-calendar-body-name(
            v-for="(item) in namesWeekDays"
            v-bind:key="item"
            )
                .vm-calendar-body-day-container {{ item }}
            .vm-calendar-body-day(
            v-for="item in calendarBody"
            v-bind:key="item.key"
            @click="clickDate(item)"
            @mouseover="updateHoverDate(item)"
            )
                .vm-calendar-body-day-container(
                v-bind:class=`{
                    'vm-not-active': !item.isMonth,
                    'vm-current-month': item.isMonth,
                    'vm-selected': item.selected,
                    'vm-selected-first': item.selectedFirst,
                    'vm-selected-last': item.selectedLast,
                }`
                )
                    .vm-calendar-body-day-item {{ item.day }}
</template>

<script>
import VMIcon from '../../functional/VMIcon';


export default {
    name: 'vm_calendar_body',

    components: {
        VMIcon,
    },

    props: {
        currentMonth: {
            type: Date,
            required: true,
        },
        hoverDate: {
            type: Number,
        },
        interval: {
            type: Array,
            default: () => ([]),
        },
    },

    computed: {
        calendarBody() {
            // console.log('calendarBody', this.hoverDate);

            const [intervalFrom, intervalTo] = this.interval.length >= 2 ? this.interval : [this.interval[0], this.hoverDate].sort((a, b) => a - b);
            const dateFrom = new Date(intervalFrom);
            const dateTo = new Date(intervalTo);
            const body = [];
            const currentMonth = this.currentMonth.getMonth();
            const momentDate = new Date(this.currentMonth);

            momentDate.setDate(1);
            this.setTimeNull(momentDate);
            this.setTimeNull(dateFrom);
            this.setTimeNull(dateTo);
            const wDay = momentDate.getDay() === 0 ? 7 : momentDate.getDay();
            const countDays = 6 * 7;

            // сдвинем дату на начало недели!
            momentDate.setDate(momentDate.getDate() - (wDay - 1));

            // заполним body числами до конца месяца!
            for (let i = 0; i < countDays; i++) {
                body.push({
                    day: (momentDate.getDate()).toString().padStart(2),
                    isMonth: momentDate.getMonth() === currentMonth,
                    selected: momentDate.getTime() >= dateFrom.getTime() && momentDate.getTime() <= dateTo.getTime(),
                    selectedFirst: momentDate.getTime() === dateFrom.getTime(),
                    selectedLast: momentDate.getTime() === dateTo.getTime(),
                    timestamp: momentDate.getTime(),
                    momentDate: new Date(momentDate),
                });
                momentDate.setDate(momentDate.getDate() + 1);
            }

            return body;
        },

        namesWeekDays() {
            const wd2 = [
                'Вс',
                'Пн',
                'Вт',
                'Ср',
                'Чт',
                'Пт',
                'Сб',
            ];
            const arr = wd2.map(e => e);

            arr.push(arr.shift());

            return arr;
        },
    },

    methods: {
        clickDate({ timestamp }) {
            this.$emit('click', timestamp);
        },

        setTimeNull(date) {
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            date.setHours(0);
        },

        updateHoverDate({ timestamp }) {
            this.$emit('hover-date', timestamp);
        },
    },
};
</script>

<style lang="stylus">
    .vm-calendar-body
        width: calc(50vw - 20px)
        min-width 300px
        max-width 370px

        .vm-calendar-body-wrapper
            display: flex
            flex-wrap wrap
            width 100%

        .vm-calendar-body-day
            flex-shrink 0
            position relative
            display block
            width calc(100% / 7)
            user-select none

            &:before
                content: ''
                display block
                padding-bottom: 100%

        .vm-calendar-body-day-container
            position absolute
            width 100%
            height 100%
            top 0; left 0; right 0; bottom 0;
            display: flex
            align-items: center
            justify-content: center

            &.vm-not-active
                opacity .5

            &.vm-current-month
                cursor pointer

                &:hover
                    .vm-calendar-body-day-item
                        border-color var(--calendar-day-circle-selected-color)

            &.vm-selected
                .vm-calendar-body-day-item
                    border-color var(--calendar-day-circle-selected-color)

                &:hover
                    .vm-calendar-body-day-item
                        color white
                        background-color var(--calendar-day-circle-selected-color)

            .vm-calendar-body-day-item
                width 42px
                height 42px
                border-radius 50%
                border 1px solid transparent
                display: flex
                align-items: center
                justify-content: center
                transition border, background-color .2s
</style>
