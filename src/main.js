import Vue from 'vue';
import App from './App.vue';
import VMField, {
    VMInput,
    VMTextarea,
    VMCheckbox,
    VMMultiSelectGroup,
    VMSelect,
    VMTimePicker,
} from './index.build';

Vue.use(VMField, {
    components: {
        VMInput,
        VMTextarea,
        VMCheckbox,
        VMMultiSelectGroup,
        VMSelect,
        VMTimePicker,
    },
});

Vue.config.productionTip = process.NODE_ENV === 'production';

new Vue({
    render: h => h(App),
}).$mount('#app');
