<template lang="pug">
    VMFieldWrapper(v-bind="$props")
        .vm-input-block
            textarea.vm-input.vm-textarea(
            ref="input"
            :class="inputClass"
            :minlength="field.minlength"
            :maxlength="field.maxlength"
            :placeholder="text.placeholder"
            :readonly="field.readonly"
            :disabled="field.disabled"
            :required="required"
            :value="value"
            :name="name"
            :tabindex="field.tabindex"
            @input="onInput($event.target.value)"
            @invalid="() => field.onInvalid()"
            )
            VMValidator(v-if="!hideValidator" v-bind="$props")
</template>

<script>
import VMInput from './VMInput.vue';


export default VMInput.extend({
    name: 'vm_textarea',
});
</script>

<style lang="stylus" scoped>

</style>
