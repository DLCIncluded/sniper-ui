<template>
	<div class="home">
		<h1>Create Link</h1>
		<form @submit.prevent="createLink">
			<div>
				<label for="linkName">link Name</label> <input type="text" name="linkName" id="linkName" v-model="linkName">
			</div>
			<div>
				<label for="linkDescription">link Description</label> <input type="text" name="linkDescription" id="linkDescription" v-model="linkDescription">
			</div>
			<div>
				<label for="linkURL">link URL</label> <input type="text" name="linkURL" id="linkURL" v-model="linkURL">
			</div>
			<div>
				<label for="linkIcon">link Icon</label> <input type="text" name="linkIcon" id="linkIcon" v-model="linkIcon">
			</div>
			<div>
				<label for="linkColor">link Color</label> <input type="text" name="linkColor" id="linkColor" v-model="linkColor">
			</div>
			<div>
				<label for="linkBorderColor">link Border Color</label> <input type="text" name="linkBorderColor" id="linkBorderColor" v-model="linkBorderColor">
			</div>
			<div>
				<button type="submit">Create</button>
			</div>
		</form>
	</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'CreateLink',
	data() {
		return {
			linkName: '',
			linkDescription: '',
			linkURL: '',
			linkIcon: '',
			linkColor: '',
			linkBorderColor: '',
		}
	},
	methods: {
		createLink(){
			var v = this;
			if(this.linkName == ''){
				console.log('add name')
				return;
			}
			var fd = new FormData();
			fd.append('user_id', this.$store.state.userid);
			fd.append('token', this.$store.state.token);
			fd.append('link_name', this.linkName);
			fd.append('link_description', this.linkDescription);
			fd.append('link_url', this.linkURL);
			fd.append('link_icon', this.linkIcon);
			fd.append('link_color', this.linkColor);
			fd.append('link_border_color', this.linkBorderColor);

			axios.post('api.php?action=newlink', fd).then(res => {
				console.log(res.data)
				v.$store.dispatch('getLinks');
				v.$router.push(`/`)
			}).catch((error)=>{
				console.log(error.response.data)
			})
		}
	}
}
</script>
