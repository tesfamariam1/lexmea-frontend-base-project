import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import type { App } from 'vue';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // Customize as needed
            refetchOnWindowFocus: false, // Customize as needed
        },
    },
});

export default {
    install(app: App) {
        app.use(VueQueryPlugin, { queryClient });
    },
};
