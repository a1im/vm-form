import './style/default.styl';
import './style/select.styl';
import {
    Input,
    Select,
    Textarea,
    Form,
    Field,
    TimePicker,
    Calendar,
} from './models';
import {
    VMField,
    VMForm,
    VMFieldAll,
    VMIcon,
} from './functional';
import langRu from './langs/ru';
import {
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
    VMTimePicker,
    VMCalendar,
} from './components';
import masker from './utils/masked/masker';

const defaultComponents = {
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
    VMTimePicker,
    VMCalendar,
};
const Root = {
    install(Vue, {
        components = {},
        form,
        templates = () => ([]),
        defaultRequired = true,
        icons = '/icons_bundle.svg',
        lang = {},
        currentLang = 'ru',
    }) {
        if (this.installed) return;

        Vue.component('VMField', VMField({
            ...defaultComponents,
            ...components,
        }));
        Vue.component('VMForm', VMForm(form || {}));
        Vue.component('VMFieldAll', VMFieldAll);
        Vue.component('VMIcon', VMIcon(icons));

        const $VMField = (name) => {
            if (name instanceof Field) return name;

            const obj = typeof name === 'string'
                ? { name }
                : typeof name === 'object' && !Array.isArray(name)
                    ? name
                    : {};

            if (!obj.name) {
                throw { error: 'Prop "name" is required' };
            }

            const template = templates().find(el => el.template === obj.template) || {};
            const fieldType = template.fieldType || obj.fieldType || 'input';
            const templateDefault = templates().find(el => el.template === fieldType) || {};
            // find template
            const fieldData = {
                required: defaultRequired,
                ...templateDefault,
                ...template,
                ...obj,
            };
            let field;

            switch (fieldType) {
            case 'input':
                field = new Input(fieldData);

                break;
            case 'textarea':
                field = new Textarea(fieldData);

                break;
            case 'select':
                field = new Select(fieldData);

                break;
            case 'timePicker':
                field = new TimePicker(fieldData);

                break;
            case 'calendar':
                field = new Calendar(fieldData);

                break;
            default:
                field = new Input(fieldData);
            }

            return Vue.observable ? Vue.observable(field) : field;
        };
        const $VMForm = (data, submit) => new Form(data.map(el => $VMField(el)), submit);
        const $VMMasker = (value, mask, masked = true, tokens) => masker(value, mask, masked, tokens);

        lang = {
            ru: langRu,
            ...lang,
        };
        $VMForm.config = {
            currentLang: '',
            lang,
        };
        $VMForm.setLang = (value) => {
            $VMForm.config.currentLang = String(value).toLowerCase();
        };
        $VMForm.setLang(currentLang);

        Vue.prototype.$VMField = $VMField;
        Vue.prototype.$VMForm = $VMForm;
        Vue.prototype.$VMMasker = $VMMasker;
    },
};

if (typeof window !== 'undefined' && window.Vue) {
    Root.install(window.Vue, {
        components: defaultComponents,
        form: {
            buttonClass: 'button',
        },
    });
}

export {
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
    VMTimePicker,
    VMCalendar,
};
export default Root;
