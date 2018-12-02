<template lang="pug">
    PropsSplit(:props="$props" component="VMFieldWrapper")
        .vm-input-block
            input.vm-input(
            ref="input"
            :class="inputClass"
            :minlength="field.minlength"
            :maxlength="field.maxlength"
            :placeholder="text.placeholder"
            :readonly="field.readonly"
            :required="required"
            :type="field.type || 'text'"
            :value="value"
            :name="name"
            @input="onInput($event.target.value)"
            @invalid="field.onInvalid()"
            )
            PropsSplit(v-if="!hideValidator" :props="$props" component="VMValidator")
</template>

<script>
import MixinField from '../mixins/field';


export default {
    name: 'vm_input',

    mixins: [MixinField],

    mounted() {
        this.field.$el = this.$refs.input;
    },
};
</script>

<style lang="stylus" scoped>

</style>
