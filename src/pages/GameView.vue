<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Games</h5>
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :lazy="true" @page="onPage($event)" :totalRecords="gamescount">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-6 text-center">
								<DataViewLayoutOptions v-model="layout" />
							</div>
							<div class="col-2 text-right" style="display: flex; flex-direction: row; align-items: center; margin: 0 auto;">
								<label for="rating" style="padding: 10px;">Rating : </label>
								<Slider v-model="rating" @change="search" class="p-slider" style="width: 30% ;"/>
								<p style="padding: 10px;">{{rating?rating:0}}</p>
							</div>
							<div class="col-3 text-right">
								<span class="p-input-icon-left">
								<i class="pi pi-search" />
								<InputText type="text" v-model="textSearch" placeholder="Search"/>
								</span>
							</div>
							<div class="col-1 text-right">
								<span class="p-input-icon-left">
								<Button class="p-button-sm" @click="addgame" v-if="getType() == 'local'"><i class="pi pi-plus" /></Button>
								</span>
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full" @click="gotodetail(slotProps.data.id)">
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.title}}</div>
									<div class="flex align-items-center">
										<span>{{slotProps.data.publisher}}</span>
									</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<ul>
										Genres:<li v-for="genre in slotProps.data.genres" :key="genre">{{genre}} </li>
									</ul>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<GameCard :game="slotProps" />
						</div>
					</template>
				</DataView>
			</div>
		</div>
	</div>
</template>

<script>
	import GameCard from '../components/GameCard.vue'

	export default {
		components: {
			GameCard
		},
		data() {
			return {
				dataviewValue: null,
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				textSearch: null,
				rating: null,
				gamescount: 0,
			}
		},
		videoGameService: null,
		created() {
			this.videoGameService = this.servicesFactory.getGamesService();
		},
		mounted() {
			this.videoGameService.getGamesCount().then(data => this.gamescount = data);
			this.videoGameService.getGames(9, 0).then(data => this.dataviewValue = data);
		},
		watch: {
			textSearch(val, oldVal) {
				if(val != oldVal){
					this.search();
				}
			}
		},
		methods: {
			onSortChange(event){
				const value = event.value.value;
				const sortValue = event.value;

				if (value.indexOf('!') === 0) {
					this.sortOrder = -1;
					this.sortField = value.substring(1, value.length);
					this.sortKey = sortValue;
				}
				else {
					this.sortOrder = 1;
					this.sortField = value;
					this.sortKey = sortValue;
				}
			},
			search() {
				if(this.textSearch || this.rating){
					this.videoGameService?.searchGames(9, 0, this.textSearch, this.rating).then(data => this.dataviewValue = data);
					this.videoGameService.getGamesCount(this.textSearch).then(data => this.gamescount = data);
				}
				else{
					this.videoGameService.getGames(9, 0).then(data => this.dataviewValue = data);
					this.videoGameService.getGamesCount().then(data => this.gamescount = data);
				}
				console.log(this.gamescount);
			},
			addgame() {
				this.$router.push('/gamenew/');
			},
			onPage(event){
				if(this.textSearch || this.rating){
					this.videoGameService?.searchGames(event.rows, event.first, this.textSearch, this.rating).then(data => this.dataviewValue = data);
				}
				else{
					this.videoGameService.getGames(event.rows, event.first).then(data => this.dataviewValue = data);
				}
			},
			numberPages() {
				console.log(this.gamescount);
				return this.gamescount;
			},
			getType() {
				return sessionStorage.getItem('type');
			}
		}
	}
</script>