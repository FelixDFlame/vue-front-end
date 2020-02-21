<template>
  <div :class="type" v-show="boolHide">
    <h6 class="alert-heading">{{ header }}</h6>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <hr />
    <!-- slot element to put {{  }} but with html tag-->
    <slot class="message"></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "alert alert-info alert-dismissible fade show"
    },
    header: {
      type: String,
      default: "Information"
    },
    boolHide: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    hideMessage: function() {
      this.boolHide = !this.boolHide;
    }
  }
};
</script>
<style scoped>
</style>