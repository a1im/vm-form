import Vue from 'vue';
import App from './App.vue';
import VMField from './index';
import {
    VMInput,
    VMSelect,
    VMMultiSelectGroup,
    VMCheckbox,
    VMTextarea,
    VMTimePicker,
    VMCalendar,
} from './components';
import langEn from './langs/en';
// import VMInput from './components/VMInput.vue';
// import VMSelect from './components/VMSelect.vue';

Vue.use(VMField, {
    components: {
        VMInput,
        VMSelect,
        VMTextarea,
        VMCheckbox,
        VMMultiSelectGroup,
        VMTimePicker,
        VMCalendar,
    },
    lang: {
        en: langEn,
    },
    currentLang: 'en',
});

Vue.config.productionTip = process.NODE_ENV === 'production';

new Vue({
    render: h => h(App),
}).$mount('#app');
