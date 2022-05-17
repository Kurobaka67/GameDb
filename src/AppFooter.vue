<template>
	<div class="layout-footer">
		<span v-if="getTypeAPI() == 'rawg'">Source: <a href="https://rawg.io/apidocs">RAWG Video Games Database API</a></span>
		<a v-if="getTypeAPI() == 'igdb'" href="https://cors-anywhere.herokuapp.com/corsdemo">Click here to make the api work</a>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
			},
			getTypeAPI() {
				return sessionStorage.getItem('type');
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>