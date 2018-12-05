import Root from './index';
import {
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
    VMTimePicker,
    // VMCalendar,
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
            // VMCalendar,
        },
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
    // VMCalendar,
};
export default Root;

// module.exports = {
//     install: Root.install,
//     VMInput,
//     VMSelect,
//     VMMultiSelectGroup,
//     VMCheckbox,
//     VMTextarea,
//     VMTimePicker,
// };
