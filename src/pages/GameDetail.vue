<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<div class="grid">
					<h5 class="col-11">{{game?.title}}</h5>
					<p class="col-1">{{game?.status}}</p>
					<div class="col-4">
						<img :src="game?.image" />
					</div>
					<div class="col-7">
						<p>Platforms : <span>{{platforms}}</span></p>
						<p>Genres : <span>{{genres}}</span></p>
						<p>Publisher : {{game?.publisher}}</p>
						<p>Description : {{game?.description}}</p>
					</div>
					<div class="col-1">
						<Knob :modelValue="game?.rating" :valueColor="ratingColor"/>
					</div>
					<div class="col-1">
						<Button class="p-button-sm" @click="edit">Edit</Button>
					</div>
					<div class="col-11 text-right">
						<Button class="p-button-sm" @click="close">Close</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VideoGameService from "../service/VideoGameService";

export default {
    props: ['id'],
	videoGameService: null,
	created() {
		this.videoGameService = new VideoGameService();
	},
	data() {
		return {
			game: null,
		}
	},
    mounted() {
        console.log(this.id);
		this.videoGameService.getGameById(this.id).then(data => this.game = data);
    },
	computed : {
		ratingColor() {
			return this.game?.rating>50?'green':'orange';
		},
		genres() {
			return this.game?.genres.join(',');
		},
		platforms() {
			return this.game?.platforms.join(',');
		}
	},
	methods: {
		edit() {
			this.$router.push(`/gameedit/${this.id}`);
		},
		close() {
			this.$router.push('/games');
		}
	}
}
</script>