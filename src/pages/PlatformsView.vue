<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Games</h5>
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :lazy="true" @page="onPage($event)" :totalRecords="platformscount" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-5 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
							<div class="col-6 text-right">
								<span class="p-input-icon-left">
								<i class="pi pi-search" />
								<InputText type="text" v-model="textSearch" placeholder="Search" @change="search"/>
								</span>
							</div>
							<div class="col-1 text-right">
								<span class="p-input-icon-left">
								<Button class="p-button-sm" @click="addplatforms"><i class="pi pi-plus" /></Button>
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
							<div class="card m-3 border-1 surface-border" @click="gotodetail(slotProps.data.id)">
								<div class="flex align-items-center justify-content-between">
									<div class="flex align-items-center" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
										<p class="font-semibold">{{slotProps.data.name}}</p>
									</div>
								</div>
								<div class="text-center">
									<img :src="slotProps.data.image" :alt="slotProps.data.title" width="150"/>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				dataviewValue: null,
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				textSearch: null,
				rating: null,
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
			gotodetail(id) {
				console.log(id);
				//this.$router.push(`/gamedetail/${id}`);
			},
			search() {
				if(this.textSearch){
					this.platformsService?.searchPlatforms(this.textSearch).then(data => this.dataviewValue = data);
				}
				else{
					this.platformsService.getPlatforms(9, 0).then(data => this.dataviewValue = data);
				}
			},
			addplatform() {
				//this.$router.push('/gamenew/');
			},
			onPage(event){
				this.platformsService.getPlatforms(event.rows, event.first).then(data => this.dataviewValue = data);
			}
		}
	}
</script>