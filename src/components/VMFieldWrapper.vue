<template lang="pug">
    .vm-field-wrapper.vm-field(:class="fieldClass")
        VMLabel(v-if="text.label") {{ text.label }}
        slot
        .vm-field-message(v-if="cMessage") {{ cMessage }}
</template>

<script>
import { MixinAll } from '../mixins';
import VMLabel from './VMLabel.vue';


export default {
    name: 'vm_field_wrapper',

    mixins: [MixinAll],

    components: {
        VMLabel,
    },
};
</script>

<style lang="stylus"></style>
