<template lang="pug">
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
        :autocomplete="field.autocomplete"
        v-mask="config"
        v-on="listeners"
        @inputMasked="onInput($event.target.value)"
        @invalid="() => field.onInvalid()"
    )
</template>

<script>
import { mask } from '../utils/masked';
import Field from './Field';

export default Field.extend({
    name: 'base_input',

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

        listeners() {
            return {
                ...this.$listeners,
                ...this.field.listeners,
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
            this.field.checkValidation();
        },
    },

    mounted() {
        this.inputInit();
    },
});
</script>

<style lang="stylus" scoped>

</style>
