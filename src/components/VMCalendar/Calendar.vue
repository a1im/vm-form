<template lang="pug">
    PropsSplit.vm-calendar(:props="$props" component="VMFieldWrapper" :class="{ opened: isActive }")
        CalendarHeader(
        :interval="resultClickDate"
        :opened="isActive"
        @click="toggleBody"
        )
        transition(name="vm-show-select" mode="out-in")
            .vm-calendar-content(v-if="isActive")
                .vm-calendar-content-header
                    .vm-calendar-content-arrow-block(@click.stop="")
                        .vm-calendar-content-arrow(@click="clickYearDown")
                            VMIcon(icon="arrow-left")
                        .vm-calendar-content-arrow(@click="clickMonthDown")
                            VMIcon(icon="arrow-left")
                    .vm-calendar-content-date-name
                        span {{ currentMonth.getFullYear() }}&nbsp;
                        span {{ getMonth(currentMonth) }}
                        template(v-if="isDouble")
                            span , {{ getMonth(currentMonth2) }}
                    .vm-calendar-content-arrow-block(@click.stop="")
                        .vm-calendar-content-arrow(@click="clickMonthUp")
                            VMIcon(icon="arrow-right")
                        .vm-calendar-content-arrow(@click="clickYearUp")
                            VMIcon(icon="arrow-right")
                .vm-calendar-content-wrapper
                    CalendarBody(
                    key="calendar1"
                    :currentMonth="currentMonth"
                    :interval="resultClickDate"
                    :hoverDate="hoverDate"
                    @click="clickDate"
                    @update="updateCurrentDate"
                    @hover-date="updateHoverDate"
                    )
                    template(v-if="isDouble")
                        .vm-calendar-content-separator
                        CalendarBody(
                        key="calendar2"
                        :currentMonth="currentMonth2"
                        :interval="resultClickDate"
                        :hoverDate="hoverDate"
                        @click="clickDate"
                        @update="updateCurrentDate"
                        @hover-date="updateHoverDate"
                        )
</template>

<script>
import Dropdown from '../Dropdown';
import CalendarHeader from './CalendarHeader.vue';
import CalendarBody from './CalendarBody.vue';


export default Dropdown.extend({
    name: 'vm_calendar',

    components: {
        CalendarHeader,
        CalendarBody,
    },

    data: () => ({
        currentMonth: null,
        currentMonth2: null,
        currentDate: null,
        hoverDate: null,
        resultClickDate: [],
    }),

    computed: {
        isRange() {
            return this.field.isRange;
        },

        isDouble() {
            return this.field.isDouble;
        },
    },

    watch: {
        value(val) {
            this.updateDate(val);
        },
    },

    methods: {
        toggleBody() {
            this.isActive = !this.isActive;

            if (!this.isActive) {
                this.closeBody();
            }
        },

        clickDate(value) {
            if (this.isRange) {
                if (this.resultClickDate.length >= 2) {
                    this.resultClickDate = [];
                }
                this.resultClickDate.push(value);
                this.sortResultDate();

                if (this.resultClickDate.length >= 2) {
                    this.onInput(this.resultClickDate);
                    this.toggleBody();
                }
            } else {
                this.resultClickDate = [value, value];
                this.onInput(value);
                this.toggleBody();
            }
        },

        deactivated() {
            this.closeBody();
        },

        closeBody() {
            this.isActive = false;
            this.updateDate(this.value);
        },

        updateDate(value) {
            this.updateCurrentDate(value);

            this.resultClickDate = Array.isArray(value) ? value.slice() : [value, value];
            this.sortResultDate();
        },

        sortResultDate() {
            this.resultClickDate = this.resultClickDate.sort((a, b) => a - b);
        },

        updateCurrentDate(value) {
            value = Array.isArray(value) ? value[0] : value;
            this.currentDate = new Date(value);

            this.currentMonth = new Date(this.currentDate);
            this.currentMonth.setDate(1);
            this.currentMonth2 = new Date(this.currentMonth);
            this.currentMonth2.setMonth(this.currentMonth2.getMonth() + 1);
        },

        updateHoverDate(timestamp) {
            this.hoverDate = timestamp;
        },

        clickMonthDown() {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.updateCurrentDate(this.currentDate.getTime());
        },

        clickMonthUp() {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.updateCurrentDate(this.currentDate.getTime());
        },

        clickYearDown() {
            this.currentDate.setYear(this.currentDate.getFullYear() - 1);
            this.updateCurrentDate(this.currentDate.getTime());
        },

        clickYearUp() {
            this.currentDate.setYear(this.currentDate.getFullYear() + 1);
            this.updateCurrentDate(this.currentDate.getTime());
        },

        getMonth(date) {
            const lang = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ];
            const month = date.getMonth();

            return lang[month];
        },
    },

    created() {
        this.updateDate(this.value);
    },
});
</script>

<style lang="stylus">
    .vm-calendar
        position relative
        display: flex
        flex-direction: column
        font-size: var(--base-size)
        width 100%
        color var(--text-color)

        .vm-calendar-content
            position absolute
            background-color var(--bg-color)
            padding .75em
            left 0
            top calc(100% - 1px)
            //width 100%
            z-index 4
            border var(--border-width) solid var(--border-color)
            // border-top none
            border-radius var(--border-radius)
            border-top-left-radius 0
            border-top-right-radius 0

        .vm-calendar-content-wrapper
            width 100%
            display: flex
            align-items stretch

            .vm-calendar-content-separator
                flex: none
                margin: 0 5px
                width 1px
                background-color var(--calendar-separator-color)

        .vm-calendar-content-header
            display: flex
            align-items: center
            justify-content: space-between
            margin-bottom: 10px

            .vm-calendar-content-name
                &:before
                    padding-bottom: 35px

                .vm-calendar-body-day-container
                    background-color transparent
                    border-bottom 1px solid gray

            .vm-calendar-content-arrow-block
                display: flex

            .vm-calendar-content-arrow
                flex none
                height 100%
                padding 2px
                border-radius 5px
                border 1px solid transparent
                transition border .2s
                display: flex
                align-items: center
                cursor pointer

                &:hover
                    border 1px solid var(--border-color)

                &:not(:last-child)
                    margin-right: .4em

            .vm-calendar-content-date-name
                user-select none
                margin 0 auto
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
</style>
