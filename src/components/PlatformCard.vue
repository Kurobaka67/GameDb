<template>
    <div class="card m-3 border-1 surface-border" @click="gotodetail(platform.data.id)">
        <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                <p class="font-semibold">{{platform.data.name}}</p>
            </div>
        </div>
        <div class="text-center">
            <img :src="platform.data.image" :alt="platform.data.title" width="150"/>
        </div>
    </div>
</template>
<script>
export default {
    props: ['platform'],
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