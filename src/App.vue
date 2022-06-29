<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> <span v-if="$store.state.isLoggedIn"> |
	<router-link to="/newlink">newlink</router-link> |
	<router-link to="/" @click="$store.commit('logout')">logout</router-link>
	</span>
	<span v-else>
		| <router-link to="/login">login</router-link>
	</span>

  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
	beforeCreate(){
		this.$store.commit('initialiseStore');
		this.$store.dispatch('getLinks');
	}
}
</script>
