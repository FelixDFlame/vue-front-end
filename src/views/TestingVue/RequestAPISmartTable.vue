<template>
  <div class="container">
    <h1>Request API Datatable</h1>
    <button @click="doRequestAllUser">Press</button>
    <base-smart-table :dataTable="tableData" />
  </div>
</template>
<script>
import BaseSmartTable from "@/components/BaseSmartTable.vue";
import axios from "@/axios";
export default {
  data() {
    return {
      tableData: null
    };
  },
  components: {
    BaseSmartTable
  },
  methods: {
    doRequestAllUser: function() {
      axios
        .get("/users?page=2")
        .then(response => {
          console.log("response = "+(response.data.data||'-'));
          this.tableData = response.data.data;
        })
        .catch(error => {
          alert("Error boi");
        });
    }
  }
};
</script>
<style scoped>
</style>