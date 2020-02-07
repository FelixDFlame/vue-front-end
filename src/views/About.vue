<template>
  <div class="about">
    <Navigation />
    <h1>This is an about page</h1>
  </div>
</template>
<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";

export default {
  name: "about",
  components: {
    Navigation
  }
};
</script>
