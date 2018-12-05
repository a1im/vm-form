import VMIcon from '../functional/VMIcon';


export default {
    components: {
        VMIcon,
    },

    props: {
        icon: String,
    },

    data: () => ({
        isActive: false,
    }),

    computed: {
        currentIcon() {
            return this.icon
                ? this.icon
                : this.isActive ? 'up' : 'down';
        },
    },

    methods: {
        clickedOutside(event) {
            if (!this.isActive) return;

            const path = event.path || (event.composedPath && event.composedPath()) || [];
            const isOutside = path.every(el => this.$el !== el);

            if (!isOutside) return;
            this.deactivated();
        },

        deactivated() {},
    },

    created() {
        if (typeof window === 'undefined') return;
        document.addEventListener('mouseup', this.clickedOutside, true);
        document.addEventListener('touchend', this.clickedOutside, true);
    },

    beforeDestroy() {
        if (typeof window === 'undefined') return;
        document.removeEventListener('mouseup', this.clickedOutside, true);
        document.removeEventListener('touchend', this.clickedOutside, true);
    },
};
