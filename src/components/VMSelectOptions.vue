<template lang="pug">
    .vm-select-options-container
        RecycleScroller(
            :items="options"
            :item-size="itemSize"
            :key-field="keyField"
            :class="['vm-select-options', classes]"
            v-slot="{ item }"
        )
            slot(:item="item")
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { RecycleScroller } from 'vue-virtual-scroller';


export default {
    name: 'vm_select_options',

    props: {
        items: {
            type: Array,
        },
        itemSize: {
            type: Number,
            default: 40,
        },
        keyField: {
            type: String,
            default: 'id',
        },
        classes: {
            type: [Array, Object, String],
        },
    },

    components: {
        RecycleScroller,
    },

    computed: {
        options() {
            return this.items && this.items.length
                ? this.items
                : [
                    {
                        value: 'not-found',
                        [this.keyField]: 'not-found',
                        label: 'Нет данных',
                        disabled: true,
                    },
                ];
        },
    },
};
</script>
