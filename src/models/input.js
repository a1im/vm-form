/* eslint-disable no-undef */
import Field from './field';
import masker from '../utils/masked/masker';

export default class Input extends Field {
    constructor({
        minlength = null,
        maxlength = null,
        readonly = false,
        type = 'text',
        autocomplete = 'on',
        mask,
        maskTokens,
        onChangeNotMasked = () => {},

        component = 'VMInput',
        ...defaultProps
    }) {
        super({
            ...defaultProps,
            component,
        });

        this.type = type;
        this.minlength = minlength;
        this.maxlength = maxlength;
        this.readonly = readonly;
        this.autocomplete = autocomplete;
        this.mask = mask;
        this.maskTokens = maskTokens;
        this.onChangeNotMasked = onChangeNotMasked;

        const saveOnChange = this.onChange;

        this.onChange = (...args) => {
            saveOnChange(...args);

            const [value] = args;

            this.onChangeNotMasked(masker(value, this.mask, false, this.maskTokens), ...args);
        };
    }
}
