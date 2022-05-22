<template>
	<div class="layout-topbar" :style="topbarStyle">
		<router-link to="/" class="layout-topbar-logo">
			<img src="images/avatar/KurobaCat.png" :style="imageStyle" alt="Kuro logo" />
			<span>{{name}}</span>
		</router-link>
		<ul class="layout-topbar-menu">
			<li>
				<button class="p-link layout-topbar-button" @click="gotoGame">
					<p>Games</p>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button" @click="gotoPlatforms">
					<p>Platforms</p>
				</button>
			</li>
		</ul>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<Menubar :model="allItems" style="background-color: var(--surface-ground); border: none"/>
			</li>
		</ul>
	</div>
</template>

<script>
import { reactive } from "vue";
export default {
	data() {
        return {
			items: [
				{
					icon:'pi-menubar pi pi-cog',
					items:[
						{
							label:'Local API',
							command: this.localapi,
						},
						{
							label:'IGDB API',
							command: this.igdbapi,
						},
						{
							label:'RAWG API',
							command: this.rawgapi,
						}
					]
				},
				{
					label: this.currentUser,
					icon:'pi-menubar pi pi-user',
					items:[
						{
							label:'Profile',
						},
						{
							label:'Login',
							command: this.gotologin,
						}
					]
				}
			]
		}
	},
	created() {
		if(sessionStorage.getItem('type')){
			this.servicesFactory.setType(sessionStorage.getItem('type'));
		}
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
		gotoGame() {
			this.$router.push('/games');
		},
		gotoPlatforms() {
			this.$router.push('/platforms');
		},
		gotologin() {
			this.$router.push('/login');
		},
		logout() {
			sessionStorage.removeItem('user');
			sessionStorage.removeItem('role');
			localStorage.removeItem('email');
			localStorage.removeItem('password');
			window.location.reload(false);
		},
		localapi() {
			sessionStorage.setItem('type', 'local');
			this.servicesFactory.setType(sessionStorage.getItem('type'));
			if(this.$router.currentRoute.value.fullPath == '/'){
				window.location.reload(false);
			}
			else{
				this.$router.push('/');
			}
		},
		igdbapi() {
			sessionStorage.setItem('type', 'igdb');
			this.servicesFactory.setType(sessionStorage.getItem('type'));
			if(this.$router.currentRoute.value.fullPath == '/'){
				window.location.reload(false);
			}
			else{
				this.$router.push('/');
			}
		},
		rawgapi(){
			sessionStorage.setItem('type', 'rawg');
			this.servicesFactory.setType(sessionStorage.getItem('type'));
			if(this.$router.currentRoute.value.fullPath == '/'){
				window.location.reload(false);
			}
			else{
				this.$router.push('/');
			}
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		},
		imageStyle() {
			if(this.darkTheme) {
				return null;
			} else {
				return {filter: 'invert(100%)'};
			}
		},
		topbarStyle() {
			if(this.darkTheme) {
				return null;
			} else {
				return {backgroundColor: 'var(--surface-ground)' };
			}
		},
		name() {
			if(this.darkTheme) {
				return "Kuro";
			} else {
				return "Shiro";
			}
		},
		currentUser() {
			return sessionStorage.getItem('user');
		},
		allItems() {
			if(sessionStorage.getItem('user')){
				return [
					{
						icon:'pi-menubar pi pi-cog',
						items:[
							{
								label:'Local API',
								command: this.localapi,
							},
							{
								label:'IGDB API',
								command: this.igdbapi,
							},
							{
								label:'RAWG API',
								command: this.rawgapi,
							}
						]
					},
					{
						label: this.currentUser,
						icon:'pi-menubar pi pi-user',
						items:[
							{
								label:'Profile',
							},
							{
								label:'Logout',
								command: this.logout,
							}
						]
					}
				].map((i) => reactive(i))
			}
			else {
				return [
					{
						icon:'pi-menubar pi pi-cog',
						items:[
							{
								label:'Local API',
								command: this.localapi,
							},
							{
								label:'IGDB API',
								command: this.igdbapi,
							},
							{
								label:'RAWG API',
								command: this.rawgapi,
							}
						]
					},
					{
						label: this.currentUser,
						icon:'pi-menubar pi pi-user',
						items:[
							{
								label:'Profile',
							},
							{
								label:'Login',
								command: this.gotologin,
							}
						]
					}
				].map((i) => reactive(i))
			}
		}
	}
}
</script>

<style>
.pi-menubar{
	font-size: 1.5em
}
</style>