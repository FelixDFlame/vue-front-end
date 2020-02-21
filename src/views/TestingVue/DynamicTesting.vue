<template>
  <div>
    <p>{{ userId }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: this.$route.params.idUser
    };
  }
};
</script>
<style scoped>
</style>