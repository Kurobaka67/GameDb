<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="grid formgrid">
          <h5 class="col-11">{{ title }}</h5>
          <p class="col-1">{{ game?.status }}</p>
          <div class="col-4">
            <img :src="getImage(urlImage)" width="300"/>
          </div>
          <div class="col-7">
            <div class="field grid">
              <label for="title" class="col-fixed" style="width: 100px"
                >Title :
              </label>
              <InputText type="text" v-model="title" size="77"/>
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
              <label for="platforms" class="col-fixed" style="width: 100px"
                >Platforms :
              </label>
              <MultiSelect
                v-model="selectedPlatforms"
                :options="allplatforms"
                placeholder="Select platforms"
              />
            </div>
            <div class="field grid">
              <label for="genres" class="col-fixed" style="width: 100px"
                >Genres :
              </label>
              <MultiSelect
                v-model="selectedGenres"
                :options="allgenres"
                placeholder="Select genres"
              />
            </div>
            <div class="field grid">
              <label for="publisher" class="col-fixed" style="width: 100px"
                >Publisher :
              </label>
              <InputText type="text" v-model="publisher" size="45"/>
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
            <div class="field grid">
              <label for="rating" class="col-fixed" style="width: 100px"
                >Rating :
              </label>
              <InputNumber
                id="minmax-buttons"
                v-model="rating"
                mode="decimal"
                showButtons
                :min="0"
                :max="100"
              />
            </div>
            <div class="field grid">
              <label for="rating" class="col-fixed" style="width: 100px"
                >Status :
              </label>
              <SelectButton v-model="status" :options="options"/>
            </div>
          </div>
          <div class="col-1">
            <Knob v-model="rating" :valueColor="ratingColor" />
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
import imageGetter from '../config/imageGetter.js';

export default {
  mixins: [imageGetter],
  videoGameService: null,
  data() {
    return {
      game: {
        id: 0,
        rating: 0,
        publsher: null,
        urlImage: null,
        genres: [],
        platforms: [],
        description: null,
        title: null,
        status: "AVAILABLE",
        release: null
      },
      options: ['AVAILABLE', 'UNAVAILABLE'],
      selectedGenres: null,
      allgenres: [
        "Role Playing",
        "Racing",
        "Simulation",
        "Sports",
        "Strategy",
        "Adventure",
        "Casual",
        "Indie",
        "Puzzle",
        "Family",
        "Platformer",
      ],
      selectedPlatforms: null,
      allplatforms: [
        "PC",
        "Nintendo",
        "DS",
        "XBox",
        "Playstation 1",
        "Playstation 2",
        "Playstation 3",
        "Playstation 4",
        "Playstation 5",
        "Nintendo Switch",
        "Wii",
      ],
      rating: 0,
      publsher: null,
      urlImage: null,
      description: null,
      title: null,
      status: "AVAILABLE",
      release: null
    };
  },
  created() {
    this.videoGameService = this.servicesFactory.getGamesService();
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
            this.game.rating = this.rating;
            this.game.description = this.description;
            this.game.image = this.urlImage;
            this.game.genres = this.selectedGenres;
            this.game.platforms = this.selectedPlatforms;
            this.game.publisher = this.publisher;
            this.game.title = this.title;
            this.game.status = this.status;
            this.game.release = this.release;

			this.videoGameService.createGame(this.game);
            this.$router.push('/games');
		},
        cancel() {
        this.$router.push('/games');
        }
	}
};
</script>