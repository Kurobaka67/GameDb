<template>
	<div class="layout-topbar" :style="topbarStyle">
		<router-link to="/" class="layout-topbar-logo">
			<img src="/images/avatar/KurobaCat.png" :style="imageStyle" alt="Kuro logo" />
			<span>{{name}}</span>
		</router-link>
		<ul class="layout-topbar-menu">
			<li>
				<button class="p-link layout-topbar-button" @click="gotoGame">
					<p>Game</p>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button">
					<p>Console</p>
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
				<button class="p-link layout-topbar-button">
					<i class="pi pi-cog"></i>
					<span>Settings</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button" @click="gotologin">
					<i class="pi pi-user"></i>
					<span>Profile</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
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
		gotologin() {
			this.$router.push('/login');
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
		}
	}
}
</script>