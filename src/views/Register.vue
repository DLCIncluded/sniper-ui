<template>
	<div class="home">
		<form @submit.prevent="register">
			<div>
				<label for="username">Username:</label> <input type="text" name="username" id="username" v-model="username">
			</div>
			<div>
				<label for="email">Email:</label> <input type="email" name="email" id="email" v-model="email">
			</div>
			<div>
				<label for="password">Password:</label> <input type="password" name="password" id="password" v-model="password">
			</div>
			
			<div>
				<!-- <button @click="$store.dispatch('login')">login</button> -->
				<button type="submit">register</button>
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
			email: '',
			password: ''
		}
	},
	methods:{
		register(){
			if(!this.username || !this.email || !this.password){
				return alert('please enter all fields')
			}

			let payload = {
				username: this.username,
				email: this.email,
				password: this.password
			}
			console.log('register')
			this.$store.dispatch('register',payload)
		}
	}
}
</script>
