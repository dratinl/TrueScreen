import Vue from 'vue'
import App from './App.vue'

import router from './router'
import firebase from 'firebase'


Vue.config.productionTip = false

let app = '';

var config = {
        apiKey: "AIzaSyCrFcd07p__XHITl41s3GMLOOTwHa3WZ2M",
        authDomain: "rafu-25049.firebaseapp.com",
        databaseURL: "https://rafu-25049.firebaseio.com",
        projectId: "rafu-25049",
    };
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
		  router,
		  render: h => h(App)
		}).$mount('#app')
	}
});
