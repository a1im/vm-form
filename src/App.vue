<template lang="pug">
    #app
        VMForm(:form="form" :langNameText="text" :excludes="['number', 'time', 'calendar']")
        VMField(:field="form.field('number')" icon="dots")
        VMField(:field="form.field('time')" icon="dots")
        VMField(:field="form.field('calendar')" icon="dots")
</template>

<script>
export default {
    name: 'app',

    data: () => ({
        form: null,
    }),

    computed: {
        text() {
            return {
                name: {
                    placeholder: 'Имя',
                },
                'is-form': {
                    placeholder: 'Подтвердите',
                },
                comment: {
                    placeholder: 'Комментарий',
                },
                multimulti: {
                    placeholder: 'Выбор',
                },
            };
        },
    },

    created() {
        this.form = this.$VMForm([
            {
                name: 'name',
            },
            {
                name: 'number',
                fieldType: 'select',
                options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            {
                name: 'multimulti',
                fieldType: 'select',
                component: 'VMMultiSelectGroup',
                options: [
                    { label: 'First', options: ['asf'] },
                    { label: 'Last1', options: ['1', '2'] },
                    { label: 'Last2', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
                    { label: 'Last3', options: ['1', '2'] },
                    { label: 'Last4', options: ['1', '2'] },
                    { label: 'Last5', options: ['1', '2'] },
                ],
            },
            {
                name: 'comment',
                fieldType: 'textarea',
            },
            {
                name: 'is-form',
                component: 'VMCheckbox',
            },
            {
                name: 'time',
                fieldType: 'timePicker',
                isRange: true,
                startTime: 1300,
                offset: 500,
                onChange: (value) => {
                    console.log('onChange', value);
                },
            },
            {
                name: 'calendar',
                fieldType: 'calendar',
                isRange: true,
                isDouble: true,
                onChange: (value) => {
                    console.log('calendar onChange', value);
                },
            },
        ]);
    },
};
</script>
<style lang="stylus">
    #app
        font-size: 16px
</style>
