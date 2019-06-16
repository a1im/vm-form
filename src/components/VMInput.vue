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
            :disabled="field.disabled"
            :type="field.type || 'text'"
            :value="value"
            :name="name"
            :tabindex="field.tabindex"
            v-mask="config"
            v-on="field.listeners"
            @inputMasked="onInput($event.target.value)"
            @invalid="() => field.onInvalid()"
            )
            PropsSplit(v-if="!hideValidator" :props="$props" component="VMValidator")
</template>

<script>
import { mask } from '../utils/masked';
import Field from './Field';

export default Field.extend({
    name: 'vm_input',

    directives: {
        mask,
    },

    computed: {
        isMask() {
            return Boolean(this.field.mask);
        },

        config() {
            return {
                mask: this.field.mask,
                tokens: this.field.maskTokens,
                masked: this.field.masked,
            };
        },
    },

    watch: {
        field() {
            this.inputInit();
        },
    },

    methods: {
        inputInit() {
            this.field.$el = this.$refs.input;
            if (this.field.validationStart) {
                this.field.checkValidation();
            }
        },
    },

    mounted() {
        this.inputInit();
    },
});
</script>

<style lang="stylus" scoped>

</style>
