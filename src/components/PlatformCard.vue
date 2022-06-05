<template>
    <div class="card m-3 border-1 surface-border" @click="gotodetail(platform.data.id)">
        <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                <p class="font-semibold">{{platform.data.name}}</p>
            </div>
        </div>
        <div class="text-center">
            <img :src="getImage(platform.data?.image)" :alt="platform.data.title" width="200" height="140" style="object-fit: scale-down;"/>
        </div>
    </div>
</template>
<script>
import imageGetter from '../config/imageGetter.js';

export default {
    props: ['platform'],
    mixins: [imageGetter],
    data() {
        return {
            
        }
    },
    methods: {
        gotodetail(id) {
            this.$router.push(`/platformdetail/${id}`);
        },
    }
}
</script>