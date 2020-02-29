<template>
  <div>
    <h1>{{ video.name }}</h1>
    <video-player class="video-player-box" ref="videoPlayer" :options="playerOptions"></video-player>
    <div v-html="video.description"></div>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";

import store from "@/store";

import { videoPlayer } from "vue-video-player";

export default {
  components: {
    videoPlayer
  },
  computed: {
    video() {
      return store.getters.getMovies.find(
        vid => vid.id == this.$route.params.videoId
      );
    },
    check: function() {
      if (!this.video.id) {
        this.$router.replace({ name: "movie" });
      }
    },
    playerOptions() {
      return {
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [
          {
            type: "video/mp4",
            src:
              "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        poster: this.video.thumbnail
      };
    }
  }
};
</script>

<style>
.video-player-box .video-js {
  margin: auto;
}
</style>