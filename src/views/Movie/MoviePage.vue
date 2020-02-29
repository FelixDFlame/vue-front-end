<template>
  <div>
    <h1>Movies List</h1>
    <MoviePageCard
      v-for="vid in this.videos"
      :key="vid.id"
      :videoId="vid.id"
      @click="openVideoPlayer"
    />
  </div>
</template>
<script>
import store from "@/store";
import MoviePageCard from "@/components/Movie/MoviePageCard.vue";

export default {
  computed: {
    videos: () => {
      return store.getters.getMovies;
    }
  },
  components: {
    MoviePageCard
  },
  methods: {
    openVideoPlayer:()=>{
      // go to route /video/id
    }
  }
};
</script>
<style scoped>
</style>