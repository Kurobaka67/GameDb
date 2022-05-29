<template>
    <div class="flex flex-column">
        <img :src="modelValue?modelValue:'images/user_icon.jfif'" alt="icon profile" width="150" style="border-radius: 50%;">
        <FileUpload name="avatar" mode="basic" :auto="true" @upload="onUpload" :multiple="false" accept="image/*" :maxFileSize="1000000" @select="selectimg($event)">
        </FileUpload>
    </div>
</template>

<script>

export default {
    props: ['modelValue'],
    emits: ["update:modelValue"],
    methods: {
        onUpload() {
            this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
        },
        selectimg(event) {
            this.getBase64(event.files[0]);
        },
        getBase64(file) {
            var reader = new FileReader();
            reader.onload = () => {
                this.$emit("update:modelValue", reader.result);
            };
            reader.onerror = (error) => {
                console.log(error);
            };
            reader.readAsDataURL(file);
        }
    }
}
</script>

<style>
.p-fileupload{
    display: flex;
    justify-content: center;
}
</style>
