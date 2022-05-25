const defaultImage = 'images/unknown.jfif';

export default {
    methods: {
      getImage: function (image) {
        return image?image:defaultImage;
      }
    }
  }