<template>
  <div>
    <h1>Product List</h1>
    <p>{{ message }}</p>
    <p>{{ count }}</p>
    <button @click="tambah">Press Me</button>
  </div>
</template>
<script>
import store from "@/store";
export default {
  computed: {
    message() {
      return store.getters.message;
    },
    count() {
      return store.getters.counter;
    }
  },
  methods: {
    tambah: function() {
      store.commit("increment", 10); //ini manggil mutation yang sync
      // store.dispatch("increment", 20); //ini manggil action
    }
  }
};
</script>
<style scoped>
</style>