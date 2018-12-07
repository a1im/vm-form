<template lang="pug">
    .vm-field-wrapper.vm-field(:class="fieldClass")
        VMLabel(v-if="text.label") {{ text.label }}
        slot
        .vm-field-message(v-if="cMessage") {{ cMessage }}
</template>

<script>
import Entity from './Entity';
import VMLabel from './VMLabel.vue';


export default Entity.extend({
    name: 'vm_field_wrapper',

    components: {
        VMLabel,
    },
});
</script>

<style lang="stylus"></style>
