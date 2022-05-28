<template>
    <h1>Hello {{user?.identifiant}}</h1>
</template>

<script>

export default {
    data() {
        return {
            user: null,
        }
    },
    created() {
        
	},
    mounted() {
		this.user = JSON.parse(sessionStorage.getItem('user'));
    },
}
</script>