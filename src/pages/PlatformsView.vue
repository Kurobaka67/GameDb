<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Games</h5>
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :lazy="true" @page="onPage($event)" :totalRecords="platformscount" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-6 text-center">
								<DataViewLayoutOptions v-model="layout" />
							</div>
							<div class="col-5 text-right">
								<span class="p-input-icon-left">
								<i class="pi pi-search" />
								<InputText type="text" v-model="textSearch" placeholder="Search"/>
								</span>
							</div>
							<div class="col-1 text-right">
								<span class="p-input-icon-left">
								<Button class="p-button-sm" @click="addplatform" v-if="(getCurrentUser() != 'Guest' && getCurrentUser()) && (getType() == 'local')"><i class="pi pi-plus" /></Button>
								</span>
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full" @click="gotodetail(slotProps.data.id)">
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.name}}</div>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<PlatformCard :platform="slotProps" />
						</div>
					</template>
				</DataView>
			</div>
		</div>
	</div>
</template>

<script>
import PlatformCard from '../components/PlatformCard.vue'

	export default {
		components: {
			PlatformCard
		},
		data() {
			return {
				dataviewValue: null,
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				textSearch: null,
				platformscount: 0,
			}
		},
		platformsService: null,
		created() {
			this.platformsService = this.servicesFactory.getPlatformsService();
		},
		mounted() {
			this.platformsService.getPlatformsCount().then(data => this.platformscount = data);
			this.platformsService.getPlatforms(9, 0).then(data => this.dataviewValue = data);
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
				if(this.textSearch){
					this.platformsService?.searchPlatforms(9, 0, this.textSearch).then(data => this.dataviewValue = data);
				}
				else{
					this.platformsService.getPlatforms(9, 0).then(data => this.dataviewValue = data);
				}
			},
			addplatform() {
				this.$router.push('/platformnew/');
			},
			onPage(event){
				this.platformsService.getPlatforms(event.rows, event.first).then(data => this.dataviewValue = data);
			},
			getType() {
				return sessionStorage.getItem('type');
			},
			getCurrentUser() {
				return sessionStorage.getItem('role');
			}
		}
	}
</script>