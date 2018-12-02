<template lang="pug">
    #app
        VMForm(:form="form" :langNameText="text")
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
                options: [1, 2, 3],
            },
            {
                name: 'comment',
                fieldType: 'textarea',
            },
            {
                name: 'is-form',
                component: 'VMCheckbox',
            },
        ]);
    },
};
</script>
<style lang="stylus">
    #app
        font-size: 16px
</style>
