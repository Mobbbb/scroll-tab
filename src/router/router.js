import Main from '../view/main.vue';
import Detail from '../view/pages/reports-detail/reports-detail.vue';

export default [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {
            title: 'Scroll-Tab',
        },
    },
    {
        path: '/detail',
        name: 'detail',
        component: Detail,
        meta: {
            title: 'Detail',
        },
    },
]
