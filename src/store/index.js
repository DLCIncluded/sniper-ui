import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

export default createStore({
	state: {
		isLoggedIn: false,
		username: '',
		email: '',
		token: '',
		isadmin: false,
		links: {},
		show: false,
	},
	getters: {
		links(state){
			return state.links
		}
	},
	mutations: {
		initialiseStore(state){
			//check if we have a state stored
			if(localStorage.getItem('store')){
				//replace current state with the stored copy
				this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))))
			};
		},
		updateLinks(state, links){
			state.links = links
		},
		login(state, user){
			console.log(user)
			console.log(user.username)
			state.isLoggedIn = true
			state.username = user.username
			state.email = user.email
			state.token = user.token
			state.isadmin = user.isadmin
			state.userid = user.id
		},
		logout(state){
			state.isLoggedIn = false
			state.username = null
			state.userid = null
			state.email = null
			state.token = null
			state.isadmin = null
			state.show = false
		},
		show(state, show){
			state.show = show
		},
	},
	actions: {
		login({commit},payload){
			var fd = new FormData();
			fd.append('username', payload.username);
			fd.append('password', payload.password);
			axios.post('api.php?action=login', fd).then(res => {
				// console.log(res.data)
				router.replace('/');
				commit('login', res.data)
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		register({commit},payload){
			var fd = new FormData();
			fd.append('username', payload.username);
			fd.append('password', payload.password);
			fd.append('email', payload.email);
			axios.post('api.php?action=register', fd).then(res => {
				// console.log(res.data)
				router.replace('/');
				commit('login', res.data)
			}).catch((error)=>{
				console.log(error.response.data)
			})
		},
		checkAdmin({commit,state}){
			axios.get('/users/check', {headers: { 'Authorization': 'Bearer '+state.token}}).then(res => {
				console.log(res.data)
				commit('show', true)
			}).catch((error)=>{
				console.log(error.response.data)
				commit('show', false)
				commit('logout')
				router.replace('/');
			})
		},
		getLinks({commit,state}){
			axios.get('api.php?action=getlinks').then(res => {
				console.log(res.data)
				commit('updateLinks',res.data.links)
			}).catch((error)=>{
				
			})
		}
	},
	modules: {
	}
})
