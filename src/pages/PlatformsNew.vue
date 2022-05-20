<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="grid formgrid">
          <h5 class="col-11">{{ title }}</h5>
          <p class="col-1">{{ game?.status }}</p>
          <div class="col-4">
            <img :src="urlImage" width="300"/>
          </div>
          <div class="col-8">
            <div class="field grid">
              <label for="name" class="col-fixed" style="width: 100px"
                >Name :
              </label>
              <InputText type="text" v-model="name" size="77"/>
            </div>
            <div class="field grid">
              <label for="urlImage" class="col-fixed" style="width: 100px"
                >Url image :
              </label>
              <InputText type="text" v-model="urlImage" size="77"/>
            </div>
            <div class="field grid">
              <label for="release" class="col-fixed" style="width: 100px"
                >Release :
              </label>
              <Calendar v-model="release" dateFormat="yy-mm-dd" />
            </div>
            <div class="field grid">
              <label for="description" class="col-fixed" style="width: 100px"
                >Description :
              </label>
              <Textarea
                v-model="description"
                :autoResize="true"
                rows="10"
                cols="80"
              />
            </div>
          </div>
          <div class="col-1">
            <Button class="p-button-sm" @click="save">Save</Button>
          </div>
          <div class="col-11 text-right">
            <Button class="p-button-sm" @click="cancel">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  platformService: null,
  data() {
    return {
      platform: {
        id: 0,
        urlImage: null,
        description: null,
        name: null,
        release: null
      },
      urlImage: null,
      description: null,
      name: null,
      release: null
    };
  },
  created() {
    this.platformService = this.servicesFactory.getPlatformsService();
  },
  mounted() {
  },
  computed: {
    ratingColor() {
      return this.rating > 50 ? "green" : "orange";
    },
  },
  methods: {
		save() {
            this.platform.description = this.description;
            this.platform.image = this.urlImage;
            this.platform.name = this.name;
            this.platform.date = this.release;

			this.platformService.savePlatform(this.platform);
            this.$router.push('/platforms');
		},
        cancel() {
        this.$router.push('/platforms');
        }
	}
};
</script>