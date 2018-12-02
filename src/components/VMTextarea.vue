<template lang="pug">
    PropsSplit(:props="$props" component="VMFieldWrapper")
        .vm-input-block
            textarea.vm-input.vm-textarea(
            ref="textarea"
            :class="inputClass"
            :minlength="field.minlength"
            :maxlength="field.maxlength"
            :placeholder="text.placeholder"
            :readonly="field.readonly"
            :required="required"
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
    name: 'vm_textarea',

    mixins: [MixinField],

    mounted() {
        this.field.$el = this.$refs.textarea;
    },
};
</script>

<style lang="stylus" scoped>

</style>
