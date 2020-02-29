<template>
  <router-link :to="{
    name: 'video',
    params: { videoId: this.video.id }
  }">
    <div class="mt-4">
      <h5>{{ this.video.name }}</h5>
      <b-card :img-src="this.video.thumbnail" img-alt="Card image" img-left class="mb-3">
        <b-card-text v-html="this.video.description"></b-card-text>
      </b-card>
    </div>
  </router-link>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {};
  },
  props: {
    videoId: {
      type: Number,
      required: true
    }
  },
  computed: {
    video: function() {
      return store.getters.getMovies.find(vid => {
        return vid.id == this.videoId;
      });
    }
  }
};
</script>
<style scoped>
.mt-4 {
  margin: 30px;
}
.card-img-left {
  width: 400px;
  height: 200px;
}
</style>