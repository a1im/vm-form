import Dropdown from './Dropdown';


export default Dropdown.extend({
    data: () => ({
        search: '',
        isFirstClick: true,
    }),

    computed: {
        options() {
            const options = this.field.options || [];

            return options.map(el => ({
                value: typeof el === 'object'
                    ? el.value === undefined ? el.label : el.value
                    : el,
                label: typeof el === 'object'
                    ? el.label === undefined ? el.value : el.label
                    : el,
                options: el && el.options || [],
            }));
        },

        classObject() {
            return {
                active: this.isActive,
            };
        },

        searchedOptions() {
            if (this.search && this.isFirstClick || !this.isAutocomplete) {
                this.isFirstClick = false;

                return this.options;
            }

            return this.options.filter(it => it.label
                .toString()
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) !== -1);
        },

        isMultiple() {
            return this.field.multiple;
        },

        isAutocomplete() {
            return this.field.autocomplete;
        },
    },

    watch: {
        options() {
            this.updateOptions();
        },
    },

    methods: {
        updateOptions() {
            if (this.isMultiple) {
                this.setSearch(Array.isArray(this.field.getValue())
                    ? this.options
                        .filter(el => this.field.getValue().includes(el.value.toString()))
                        .map(el => el.label)
                        .join(', ')
                    : '');
            } else {
                let option = this.getOptionByValue(this.field.getValue());

                if (!option && this.options.length) {
                    [option] = this.options;
                }

                option = option || { value: '', label: '' };

                this.setSearch(option.label);
                this.field.setValue(option.value);
            }
        },

        setSearch(value) {
            value = value || '';
            this.search = value.toString();
        },

        getOptionByValue(value) {
            return this.options.find(ot => ot.value.toString() === value.toString());
        },

        selectAll() {
            this.$refs.input.select();
        },

        onSearchFocus() {
            this.selectAll();
            this.isActive = true;
        },

        selectOption(option) {
            if (this.isMultiple) {
                const value = this.field.getValue();
                const newValue = option.value.toString();

                this.onInput(newValue, Array.isArray(value) ? value : [newValue]);
                this.updateOptions();
            } else {
                this.onInput(option.value.toString(), option);
                this.deactivated(option);
                this.setSearch(option.label);
            }
        },

        optionSelected({ value }) {
            if (this.isMultiple) {
                return this.field.getValue().includes(value.toString());
            }

            return this.field.getValue().toString() === value.toString();
        },

        deactivated(option = null) {
            if (this.isAutocomplete) {
                option = option || this.getOptionByValue(this.field.getValue()) || {};
                this.isFirstClick = true;
                this.setSearch(option.label);
                this.isActive = false;
            } else {
                this.isActive = false;
            }
        },

        toggle() {
            if (this.isActive) {
                this.deactivated();
            } else {
                this.isActive = !this.isActive;
            }
        },
    },

    created() {
        this.updateOptions();
    },
});