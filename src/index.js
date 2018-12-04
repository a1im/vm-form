import './style/default.styl';
import './style/select.styl';
import {
    Input,
    Select,
    Textarea,
    DatePicker,
    Form,
    Field,
    TimePicker,
} from './models';
import {
    VMField,
    VMForm,
    VMFieldAll,
} from './functional';

const Root = {
    install(Vue, {
        components,
        form,
        templates = () => ([]),
        defaultRequired = true,
    }) {
        if (this.installed) return;

        Vue.component('VMField', VMField(components || {}));
        Vue.component('VMForm', VMForm(form || {}));
        Vue.component('VMFieldAll', VMFieldAll);

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
            case 'datePicker':
                field = new DatePicker(fieldData);

                break;
            case 'timePicker':
                field = new TimePicker(fieldData);

                break;
            default:
                field = new Input(fieldData);
            }

            return field;
        };
        const $VMForm = (data, submit) => new Form(data.map(el => $VMField(el)), submit);

        Vue.prototype.$VMField = $VMField;
        Vue.prototype.$VMForm = $VMForm;
    },
};

export default Root;
