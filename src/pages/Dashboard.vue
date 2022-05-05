<template>
	<div class="grid">
		<div>
		</div>
		<div>
			<DataView :value="dataviewValue" :layout="layout" :paginator="false">
					<template #grid="slotProps">
						<div class="col-12 md:col-3">
							<div class="card m-3 border-1 surface-border" @click="gotodetail(slotProps.data.id)">
								<div class="flex align-items-center justify-content-between">
									<div class="flex align-items-center" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
										<p class="font-semibold">{{slotProps.data.title}}</p>
									</div>
								</div>
								<div class="text-center">
									<img :src="slotProps.data.image" :alt="slotProps.data.title" width="150"/>
								</div>
								<div class="flex align-items-center justify-content-between">
									<span>{{slotProps.data.publisher}}</span>
								</div>
								<div class="flex align-items-center justify-content-between">
									{{genres(slotProps.data)}}
								</div>
							</div>
						</div>
					</template>
				</DataView>
		</div>
	</div>
</template>

<script>
import EventBus from '@/AppEventBus';
import VideoGameService from "../service/VideoGameService";

export default {
	data() {
			return {
				dataviewValue: null,
				layout: 'grid'
			}
	},
	themeChangeListener: null,
	videoGameService: null,
	created() {
			this.videoGameService = new VideoGameService();
	},
	mounted() {
		this.videoGameService.getLastGamesRelease().then(data => this.dataviewValue = data);
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
		gotodetail(id) {
			this.$router.push(`/gamedetail/${id}`);
		},
		genres(game) {
			return game.genres.join(', ');
		}
	}
}
</script>