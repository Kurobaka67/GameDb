import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./pages/Dashboard.vue')
            },
            {
                path: '/games',
                name: 'games',
                component: () => import('./pages/GameView.vue'),
            },
            {
                path: '/gamedetail/:id',
                name: 'gamedetail',
                component: () => import('./pages/GameDetail.vue'),
                props: true
            },
            {
                path: '/gameedit/:id',
                name: 'gameedit',
                component: () => import('./pages/GameEdit.vue'),
                props: true
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
