import Vue from 'vue';
import App from './App.vue';
import './style/default.styl';
import VMField, {
    VMInput,
    VMTextarea,
    VMCheckbox,
    VMMultiSelectGroup,
    VMSelect,
} from './index';

Vue.use(VMField, {
    components: {
        VMInput,
        VMTextarea,
        VMCheckbox,
        VMMultiSelectGroup,
        VMSelect,
    },
});

Vue.config.productionTip = process.NODE_ENV === 'production';

new Vue({
    render: h => h(App),
}).$mount('#app');
