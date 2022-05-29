<template>
	<div class="layout-topbar" :style="topbarStyle">
		<router-link to="/" class="layout-topbar-logo">
			<img src="images/avatar/KurobaCat.png" :style="imageStyle" alt="Kuro logo" />
			<span>{{name}}</span>
		</router-link>
		<ul class="layout-topbar-menu">
			<li>
				<Button label="Games" class="p-button-text" @click="gotoGame" />
			</li>
			<li>
				<Button label="Platforms" class="p-button-text" @click="gotoPlatforms" />
			</li>
		</ul>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex align-items-center">
			<li>
				<p style="padding-right: 5px;">Data Source : </p>
			</li>
			<li>
				<Dropdown v-model="selectedType" :options="type" @change="changeAPI"/>
			</li>
			<li v-if="getType() == 'local' || getType() == 'my api'">
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
			currentUser: null,
			selectedType: null,
			type: [
                'local',
                'igdb',
                'rawg',
				'my api'
            ]
		}
	},
	created() {
		if(sessionStorage.getItem('type')){
			this.servicesFactory.setType(sessionStorage.getItem('type'));
		}
		else{
			sessionStorage.setItem('type', 'local');
		}
	},
	mounted() {
		if(sessionStorage.getItem('type')){
			this.selectedType = sessionStorage.getItem('type');
		}
		else{
			this.selectedType = "local";
		}
		this.currentUser = JSON.parse(sessionStorage.getItem('user'))?.identifiant;
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
		gotoprofile() {
			this.$router.push('/profile');
		},
		logout() {
			sessionStorage.removeItem('user');
			localStorage.removeItem('email');
			localStorage.removeItem('password');
			this.currentUser = null;
			if(this.$router.currentRoute.value.fullPath == '/'){
				window.location.reload(false);
			}
			else{
				this.$router.push('/');
			}
		},
		changeAPI(){
			sessionStorage.setItem('type', this.selectedType);
			this.servicesFactory.setType(sessionStorage.getItem('type'));
			if(this.$router.currentRoute.value.fullPath == '/'){
				window.location.reload(false);
			}
			else{
				this.$router.push('/');
			}
		},
		getType(){
			return sessionStorage.getItem('type');
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
		allItems() {
			if(sessionStorage.getItem('user')){
				return [
					{
						label: this.currentUser,
						icon:'pi-menubar pi pi-user',
						items:[
							{
								label:'Profile',
								command: this.gotoprofile,
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
						icon:'pi-menubar pi pi-user',
						items:[
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

.p-button:focus{
	box-shadow: none;
}
</style>