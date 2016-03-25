import Vue from 'vue'
import App from './components_balloon/App.vue'

Vue.config.debug = true;

new Vue({
	el: 'body',
	data(){
		return {
			msg : 'ssssss'
		}
	},
	components: {
		App
	}
})