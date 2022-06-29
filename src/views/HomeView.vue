<template>
  <div class="home">
    <div class="linkbox-container">
		<div class="linkbox" v-for="link in links" :key="link.link_id">
			<button @click.prevent='deleteLink(link.link_id)'>Delete</button>
			<div class="link" @click="goToLink(link.link_url)">
				<h1>{{link.link_name}}</h1>
				<p>Link Description</p>
			</div>
		</div>
		
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'HomeView',
  computed: {
	links() {
		return this.$store.getters.links;
	}
  },
  methods: {
	deleteLink(link_id){
		console.log('deleting link: '+link_id);
		var v = this;
		var fd = new FormData();
		fd.append('user_id', this.$store.state.userid);
		fd.append('token', this.$store.state.token);
		fd.append('link_id', link_id);

		axios.post('api.php?action=deletelink', fd).then(res => {
			console.log(res.data)
			v.$store.dispatch('getLinks');
		}).catch((error)=>{
			console.log(error.response.data)
		})
	},
	goToLink(link_url){
		console.log(link_url);
	}
  }
}
</script>

<style scoped>
.linkbox {
	width: 25vw;
	margin-left: auto;
	margin-right:auto;
	border: 1px solid black;
	margin-bottom: 1rem;
	position: relative;
	padding: 0;
	cursor: pointer;
}
.link {
	width:100%;
	height:100%;
}
.linkbox button {
	position: absolute;
	top: 0;
	right:0;
	margin:0;
	padding: 0;
}
</style>