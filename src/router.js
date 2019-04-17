import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import LoginComponent from "@/views/login"
import HomeComponent from "@/views/home"
import SignupComponent from "@/views/signup"

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: {
                name: "login"
            }
        },
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/signup",
            name: "signup",
            component: SignupComponent
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/home",
            name: "home",
            component: HomeComponent,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});
export default router;