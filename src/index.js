import './style/default.styl';
import {
    Input,
    Select,
    Textarea,
    DatePicker,
    Form,
    Field,
} from './models';
import { VMField, VMForm, VMFieldAll } from './functional';

const GlobalVue = (window || {}).Vue || (global || {}).Vue;
const Root = {
    installed: false,
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

            // find template
            const fieldData = {
                ...(templates().find(el => el.template === obj.template) || {}),
                required: defaultRequired,
                ...obj,
            };
            const fieldType = fieldData.fieldType || '';
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

if (GlobalVue) {
    GlobalVue.use(Root);
}

export {
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
} from './components';
export default Root;
