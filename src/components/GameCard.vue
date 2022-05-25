<template>
    <div class="card m-3 border-1 surface-border" @click="gotodetail(game.data.id)">
        <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                <p class="font-semibold">{{game.data.title}}</p>
            </div>
        </div>
        <div class="text-center">
            <img :src="getImage(game.data?.image)" :alt="game.data.title" width="200" height="140" style="object-fit: scale-down;"/>
        </div>
        <div class="flex align-items-center justify-content-between">
            <span>{{game.data.publisher}}</span>
        </div>
        <div class="flex align-items-center justify-content-between">
            <span>{{genres(game.data)}}</span>
            <span>{{game.data.rating?game.data.rating:"N/A"}}</span>
        </div>
    </div>
</template>
<script>
import imageGetter from '../config/imageGetter.js';

export default {
    props: ['game'],
    mixins: [imageGetter],
    data() {
        return {
            
        }
    },
    methods: {
        genres(game) {
            return game.genres?.join(', ');
        },
        gotodetail(id) {
            this.$router.push(`/gamedetail/${id}`);
        }
    }
}
</script>