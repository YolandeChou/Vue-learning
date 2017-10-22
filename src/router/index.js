import Vue from 'Vue';
import Router from 'vue-router';

import ArticleCom from '@/components/ArticleCom';
import MainSec from '@/components/MainSec';
import SlideSec from '@/components/SlideSec';
import UserCom from '@/components/Usercom';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'RootPath',
        components: {
            main: MainSec,
        },
    }, {
        path: '/topic/:id',
        name: 'ArticleRoute',
        components: {
            main: ArticleCom,
            side: SlideSec,
        },
    }, {
        path: '/user/:name',
        name: 'UserRoute',
        components: {
            main: UserCom,
        },
    }, {
        path: '/user/:name',
        redirect: '/user:name',
    }],
});