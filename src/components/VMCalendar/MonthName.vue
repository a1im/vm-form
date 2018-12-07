<template lang="pug">
    span {{ name }}
</template>

<script>
import Entity from '../Entity';


export default Entity.extend({
    name: 'vm_mont_name',

    props: {
        monthNum: {
            type: Number,
            required: true,
        },
    },

    computed: {
        name() {
            return this.lang.months[this.monthNum];
        },
    },
});
</script>

<style lang="stylus"></style>
