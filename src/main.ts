import Vue from 'vue';

import App from './App.vue';

import { connectVuetify } from './plugins/vuetify';
import { connectRouter } from './plugins/vue-router';
import { connecti18n } from './plugins/vue-i18n';

import store from './store/store';
import axios from 'axios';

const createApp = () => {
	Vue.config.productionTip = false;
	axios.interceptors.response.use(
		response => {
			return response;
		},
		err => {
			if (err.response.status === 403 || err.response.status === 401) {
				alert('Unauthorized error!');
			}
		}
	);
	return new Vue({
		el: '#app',
		//
		router: connectRouter(Vue),
		vuetify: connectVuetify(Vue),
		i18n: connecti18n(Vue),
		store,
		//
		render: h => h(App),
	});
};

createApp();
