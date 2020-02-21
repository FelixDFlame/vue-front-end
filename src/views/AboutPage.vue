<template>
  <div class="about">
    <TheNavigation />
    <h1>This is an about page</h1>
  </div>
</template>
<script>
// @ is an alias to /src
import TheNavigation from "@/components/TheNavigation.vue";

export default {
  name: "about",
  components: {
    TheNavigation
  }
};
</script>
