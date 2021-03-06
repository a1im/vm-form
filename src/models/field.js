export default class Field {
    constructor({
        name,
        component,
        prop = 'name',
        label = '',
        value = '',
        disabled = false,
        required = false,
        hideValidator = false,
        inputClass = '',
        fieldClass = '',
        tabindex = 1,
        autofocus = false,
        langPath = null,
        onChange = () => ({}),
        pattern = '',
        validation = () => {},
        validationStart = false,
        text = null,
    }) {
        this.name = name;
        this.prop = prop;
        this.label = label;
        this.value = typeof value !== 'object' || Array.isArray(value)
            ? { [this.prop]: value }
            : value;
        this.disabled = disabled;
        this.required = required;
        this.component = component;
        this.inputClass = inputClass;
        this.fieldClass = fieldClass;
        this.tabindex = tabindex;
        this.autofocus = autofocus;
        this.langPath = langPath;
        this.onChange = onChange;
        this.pattern = pattern;
        this.validation = validation;
        this.hideValidator = hideValidator;
        this.text = text;
        this.$el = null;
        this.langText = {};
        this.validationStart = validationStart;

        // validation variable
        this._isInvalid = null;
        this._isEdit = false;
    }

    getValue() {
        return this.value[this.prop];
    }

    setValue(value) {
        this.value[this.prop] = value;
    }

    setText(value) {
        this.langText = value || {};
    }

    checkValue(value) {
        return this.pattern ? value.replace(this.pattern, '') : value;
    }

    checkValidation() {
        if (this.$el && this.validation) {
            const text = this.validation(this.getValue(), this.langText, this);

            this.$el.setCustomValidity(text || '');

            // console.log('setCustomValidity', Object.getPrototypeOf(this.$el));
            return Boolean(text || !this.$el.validity.valid);
        }

        return this._isInvalid;
    }

    updateValidation() {
        this._isEdit = true;
        this._isInvalid = this.checkValidation();
    }

    clearValidation() {
        if (this.$el) {
            this.$el.setCustomValidity('');
            this._isInvalid = null;
            this._isEdit = false;
        }
    }

    onInvalid() {
        this._isInvalid = true;
        this._isEdit = false;
    }

    onValidator(event) {
        this.updateValidation();
        if (this.$el) {
            this.$el.focus();
            this.$el.reportValidity();
            event && event.preventDefault();
        }
    }

    validationSuccess() {
        if (this.$el) {
            this.$el.setCustomValidity('');
            this._isInvalid = false;
            this._isEdit = false;
        }
    }
}
