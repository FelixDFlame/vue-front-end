<template>
  <b-carousel
    id="carouselExampleIndicators"
    class="carousel slide"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="1024"
    img-height="480"
    style="text-shadow: 1px 1px 2px #333;"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <b-carousel-slide
      v-for="carouselData in carouselDatas"
      :class="{ active : carouselData.isActive }"
      :key="carouselData.id"
      :img-src="carouselData.image"
    >
      <h1>{{ carouselData.header }}</h1>
      <p>{{ carouselData.detail }}</p>
    </b-carousel-slide>
  </b-carousel>
</template>
<script>
export default {
  name: "carouselexampleindicators",
  data() {
    return {
      carouselDatas: [
        {
          header: "Hello World!!",
          detail:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
          image: "https://static.pexels.com/photos/33972/pexels-photo.jpg",
          isActive: false
        },
        {
          header: "Ohaiyo Sekai!!",
          detail:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
          image:
            "https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg",
          isActive: true
        },
        {
          header: "Selamat Pagi!!",
          detail:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
          image:
            "https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg",
          isActive: false
        }
      ],
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 1024px;
  max-height: 480px;
  min-width: 1024px;
  min-height: 480px;
}
</style>

