import Root from './index';
import {
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
    VMTimePicker,
} from './components';

if (typeof window !== 'undefined' && window.Vue) {
    Root.install(window.Vue, {
        components: {
            VMInput,
            VMSelect,
            VMMultiSelectGroup,
            VMCheckbox,
            VMTextarea,
            VMTimePicker,
        },
        form: {
            buttonClass: 'button',
        },
    });
}

// export {
//     VMInput,
//     VMSelect,
//     VMMultiSelectGroup,
//     VMCheckbox,
//     VMTextarea,
//     VMTimePicker,
// } from './components';
// export default Root;

module.exports = {
    install: Root.install,
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
    VMTimePicker,
};
