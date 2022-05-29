<template>
    <div class="card">
        <div class="flex">
            <SelectImage v-model="user.icon" @update:modelValue="save"/>
            <Inplace :closable="true" style="font-size: 25pt; font-weight: bold">
                <template #display>
                    {{user?.identifiant}}
                    <i class="pi pi-pencil" />
                </template>
                <template #content>
                    <InputText v-model="user.identifiant" style="font-size: 15pt;" @change="save" autoFocus />
                </template>
            </Inplace>
        </div>
    </div>
</template>

<script>
import SelectImage from "../components/SelectImage.vue";

export default {
    userService: null,
    components: {
        SelectImage
    },
    data() {
        return {
            user: {},
        }
    },
    created() {
        this.userService = this.servicesFactory.getUsersService();
	},
    mounted() {
		const currentUser = JSON.parse(sessionStorage.getItem('user'));
        this.userService.getUser(currentUser._id).then(data => this.user = data);
    },
    methods: {
        save() {
            this.userService.saveUser(this.user).then(data => {
                sessionStorage.setItem('user', JSON.stringify(data));
            });
        }
    }
}
</script>