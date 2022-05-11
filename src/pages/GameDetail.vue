<template>
	<div class="grid">
		<ConfirmPopup></ConfirmPopup>
		<Toast />
		<div class="col-12">
			<div class="card">
				<div class="grid">
					<h5 class="col-11">{{game?.title}}</h5>
					<p class="col-1">{{game?.status}}</p>
					<div class="col-4">
						<img :src="game?.image" width="300"/>
					</div>
					<div class="col-7">
						<p>Release : <span>{{release}}</span></p>
						<p>Platforms : <span>{{platforms}}</span></p>
						<p>Genres : <span>{{genres}}</span></p>
						<p>Publisher : {{game?.publisher}}</p>
						<p>Description : {{game?.description}}</p>
					</div>
					<div class="col-1">
						<Knob :modelValue="game?.rating" :valueColor="ratingColor"/>
					</div>
					<div class="col-10 text-right">
						<Button label="Edit" class="p-button-sm" @click="edit" />
					</div>
					<div class="col-1">
						<Button label="Delete" class="p-button-sm p-button-warning" @click="confirm($event)"></Button>
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

export default {
    props: ['id'],
	videoGameService: null,
	created() {
		this.videoGameService = this.servicesFactory.getGamesService();
	},
	data() {
		return {
			game: null,
		}
	},
    mounted() {
		this.videoGameService.getGameById(this.id).then(data => this.game = data);
    },
	computed : {
		ratingColor() {
			console.log(this.game?.release);
			return this.game?.rating>50?'green':'orange';
		},
		genres() {
			return this.game?.genres?.join(', ');
		},
		platforms() {
			return this.game?.platforms?.join(', ');
		},
		release() {
			const t = new Date(this.game?.release*1000);
			return dayjs(t).format('MMM DD, YYYY')
		}
	},
	methods: {
		edit() {
			this.$router.push(`/gameedit/${this.id}`);
		},
		close() {
			this.$router.push('/games');
		},
		confirm(event) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Do you want to delete this game ?',
                icon: 'pi pi-info-circle',
                accept: () => {
					this.videoGameService.deleteGame(this.game).then(() => {
						//this.$toast.add({severity:'info', summary:'Confirmed', detail:'Game deleted', life: 3000});
						this.$router.push('/games');
						this.eventBus.emit('delete-game', this.game);
					});
                },
                reject: () => {
                }
            });
        }
	}
}
</script>