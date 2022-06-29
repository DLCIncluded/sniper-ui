<template>
	<div class="home">
		<form @submit.prevent="login">
			<div>
				<label for="username">Username:</label> <input type="text" name="username" id="username" v-model="username">
			</div>
			<div>
				<label for="password">Password:</label> <input type="password" name="password" id="password" v-model="password">
			</div>
			
			<div>
				<!-- <button @click="$store.dispatch('login')">login</button> -->
				<button type="submit">login</button>
			</div>		
		</form>
	</div>

</template>

<script>

export default {
	name: 'LoginView',
	data(){
		return {
			username: '',
			password: ''
		}
	},
	methods:{
		login(){
			if(!this.username || !this.password){
				return alert('please enter all fields')
			}
			let payload = {
				username: this.username,
				password: this.password
			}
			console.log('login')
			this.$store.dispatch('login',payload)
		}
	}
}
</script>
