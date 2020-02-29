<template>
  <div class="home">
    <the-navigation />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import TheNavigation from "@/components/TheNavigation.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    TheNavigation
  }
};
</script>
