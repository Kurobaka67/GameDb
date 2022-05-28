<template>
	<div class="grid">
		<div class="col-12">
			<h2>{{message}}</h2>
		</div>
		<div class="col-12">
			<DataView :value="gameviewValue" :layout="layout" :paginator="false">
					<template #header>
						<h3>Latest Games</h3>
					</template>
					<template #grid="slotProps">
						<div class="col-12 md:col-3">
							<GameCard :game="slotProps" />
						</div>
					</template>
				</DataView>
				<DataView :value="platformsviewValue" :layout="layout" :paginator="false">
					<template #header>
						<h3>Latest Platforms</h3>
					</template>
					<template #grid="slotProps">
						<div class="col-12 md:col-3">
							<PlatformCard :platform="slotProps" />
						</div>
					</template>
				</DataView>
		</div>
	</div>
</template>

<script>
import EventBus from '@/AppEventBus';
import GameCard from '../components/GameCard.vue'
import PlatformCard from '../components/PlatformCard.vue'

export default {
	components: {
		GameCard,
		PlatformCard
	},
	data() {
			return {
				gameviewValue: null,
				platformsviewValue: null,
				layout: 'grid'
			}
	},
	themeChangeListener: null,
	videoGameService: null,
	platformService: null,
	created() {
			this.videoGameService = this.servicesFactory.getGamesService();
			this.platformService = this.servicesFactory.getPlatformsService();
	},
	mounted() {
		this.videoGameService.getLastGamesRelease(4).then(data => this.gameviewValue = data);
		this.platformService.getLastPlatformsRelease(4).then(data => this.platformsviewValue = data);
		this.themeChangeListener = (event) => {
            if (event.dark)
                this.applyDarkTheme();
            else
                this.applyLightTheme();
        };
        EventBus.on('change-theme', this.themeChangeListener);

		if (this.isDarkTheme()) {
            this.applyDarkTheme();
        }
        else {
            this.applyLightTheme();
        }
	},
	beforeUnmount() {
        EventBus.off('change-theme', this.themeChangeListener );
    },
	methods: {
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		isDarkTheme() {
            return this.$appState.darkTheme === true;
        },
		applyLightTheme() {
			this.lineOptions = {
				plugins: {
					legend: {
						labels: {
							color: '#495057'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: '#495057'
						},
						grid: {
							color:  '#ebedef',
						}
					},
					y: {
						ticks: {
							color: '#495057'
						},
						grid: {
							color:  '#ebedef',
						}
					},
				}
			};
		},
		applyDarkTheme() {
			this.lineOptions = {
				plugins: {
					legend: {
						labels: {
							color: '#ebedef'
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: '#ebedef'
						},
						grid: {
							color:  'rgba(160, 167, 181, .3)',
						}
					},
					y: {
						ticks: {
							color: '#ebedef'
						},
						grid: {
							color:  'rgba(160, 167, 181, .3)',
						}
					},
				}
			};
		},
	},
	computed: {
        message() {
            if (sessionStorage.getItem('user')){
				return "Hi " + JSON.parse(sessionStorage.getItem('user'))?.identifiant;
			} 
			else {
				return "Welcome to the games database";
			}
            
        }
    },
}
</script>