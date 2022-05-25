<template>
	<div class="grid">
		<ConfirmPopup></ConfirmPopup>
		<Toast />
		<div class="col-12">
			<div class="card">
				<div class="grid">
					<h5 class="col-12">{{platform?.name}}</h5>
					<div class="col-4">
						<img :src="getImage(platform?.image)" width="300"/>
					</div>
					<div class="col-7">
						<p>Release : <span>{{release}}</span></p>
						<p>Description : {{platform?.description}}</p>
					</div>
					<div class="col-10 text-right">
						<Button label="Edit" class="p-button-sm" @click="edit" v-if="getCurrentUser() != 'Guest' && getCurrentUser()"/>
					</div>
					<div class="col-1">
						<Button label="Delete" class="p-button-sm p-button-warning" @click="confirm($event)" v-if="getCurrentUser() != 'Guest' && getCurrentUser()"></Button>
					</div>
					<div class="col-1">
						<Button label="Close" class="p-button-sm" @click="close" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import imageGetter from '../config/imageGetter.js';

export default {
    props: ['id'],
	mixins: [imageGetter],
	platformService: null,
	userService: null,
	created() {
		this.platformService = this.servicesFactory.getPlatformsService();
		this.userService = this.servicesFactory.getUsersService();
	},
	data() {
		return {
			platform: null,
		}
	},
    mounted() {
		this.platformService.getPlatformById(this.id).then(data => this.platform = data);
    },
	computed : {
		release() {
			if(this.platform?.date){
				return dayjs(this.platform?.date).format('MMM DD, YYYY');
			}
			else {
				return 'N/A'
			}
			
		}
	},
	methods: {
		edit() {
			this.$router.push(`/platformedit/${this.id}`);
		},
		close() {
			this.$router.push('/platforms');
		},
		confirm(event) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Do you want to delete this platform ?',
                icon: 'pi pi-info-circle',
                accept: () => {
					this.platformService.deletePlatform(this.platform).then(() => {
						//this.$toast.add({severity:'info', summary:'Confirmed', detail:'Game deleted', life: 3000});
						this.$router.push('/platforms');
						this.eventBus.emit('delete-platform', this.platform);
					});
                },
                reject: () => {
                }
            });
        },
		getCurrentUser() {
			return sessionStorage.getItem('role');
		}
	}
}
</script>