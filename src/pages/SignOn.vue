<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img src="/images/avatar/KurobaCat.png" alt="Kuro logo" class="mb-5" style="width:81px; height:60px;">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="field">
                        <label for="name">Username : </label>
                        <p v-if="!username && pressed" style="color: red">Username is required</p>
                        <InputText type="text" v-model="username" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" required/>
                    </div>
                    <div class="field">
                        <label for="name">Email : </label>
                        <p v-if="!email && pressed" style="color: red">Email is required</p>
                        <InputText type="text" v-model="email" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" required/>
                    </div>
                    <div class="field">
                        <label for="name">Password : </label>
                        <p v-if="!password && pressed" style="color: red">Password is required</p>
                        <Password v-model="password" class="w-full" inputClass="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" required toggleMask></Password>
                    </div>
                    <div class="grid">
                        <div class="col-11">
                            <Button label="Sign on" type="submit" class="p-button-sm" @click="signon" />
                        </div>
                        <div class="col-1">
                            <Button label="back" class="p-button-sm" @click="back" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    userService: null,
    data() {
        return {
            username: null,
            email: null,
            password: null,
            user: {
                id: 0,
                identifiant: null,
                email: null,
                password: null,
                role: "Guest",
                icon: null
            },
            pressed: null
        }
        
    },
    created() {
        this.userService = this.servicesFactory.getUsersService();
	},
    computed: {
        
    },
    methods: {
        signon() {
            this.pressed = true;
            if(this.username && this.email && this.password){
                this.user.email = this.email;
                this.user.name = this.username;
                this.user.password = this.password;
                this.userService.signon(this.user);
                this.$router.push('/login');
            }
            
        },
        back() {
            this.$router.push('/login');
        }
    }
}
</script>