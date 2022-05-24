<template>
    <h1></h1>
</template>

<script>
export default {
    created() {
		this.userService = this.servicesFactory.getUsersService();
	},
}
</script>