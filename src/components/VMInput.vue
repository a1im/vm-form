<template lang="pug">
    VMFieldWrapper(v-bind="$props")
        .vm-input-block
            BaseInput(v-bind="$props")
            VMValidator(v-if="!hideValidator" v-bind="$props")
</template>

<script>
import Field from './Field';
import BaseInput from './BaseInput.vue';

export default Field.extend({
    name: 'vm_input',

    components: {
        BaseInput,
    },
});
</script>

<style lang="stylus" scoped>

</style>
