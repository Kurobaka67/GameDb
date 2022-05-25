<template>
	<div class="layout-footer">
		<span v-if="getTypeAPI == 'rawg'">Source: <a href="https://rawg.io/apidocs">RAWG Video Games Database API</a></span>
		<span v-if="getTypeAPI == 'igdb'"><a  href="https://cors-anywhere.herokuapp.com/corsdemo">Click here to make the api work</a> (Max 50 requests per 60 minute)</span>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			},
			getTypeAPI() {
				return sessionStorage.getItem('type');
			}
		}
	}
</script>