<template>
  <div id="nav">
    <router-link to="/home">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link
      :to="{ name: 'dynamicTesting', 
      params:{ destinationName: 'Medan' }}"
    >Lokasi Medan</router-link>|
    <router-link
      :to="{ name: 'dynamicTesting', 
      params:{ destinationName: 'Jakarta' }}"
    >Lokasi Jakarta</router-link>
  </div>
</template>
<script lang="ts">
// import { Component, Prop, Vue } from "vue-property-decorator";

// @Component
// export default class HelloWorld extends Vue {
//   @Prop() private msg!: string;
// }
</script>
<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 10px;
}

#nav > a.router-link-exact-active {
  color: #ab26ab;
}
</style>