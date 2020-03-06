<template>
  <div class="container smartTable">
    <!-- Header Filter -->
    <b-row>
      <b-col lg="8" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-md="3"
          label-align-md="right"
          label-size="md"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="md">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInmodalput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Smart Table -->
    <b-row>
      <b-table
        show-empty
        small
        stacked="md"
        :items="dataTable"
        :fields="dataHeader?dataHeader:[{}]"
        :filter="filter"
        :striped="striped"
        :hover="hover"
        :bordered="bordered"
      >
        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >Info modal</b-button>
          <b-button
            size="sm"
            @click="row.toggleDetails"
          >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.fullname" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    dataTable: {
      required: true
    }
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      pageOptions: [5, 10, 15],
      striped: true,
      hover: true,
      bordered: true,
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        fullname: "",
        content: ""
      }
    };
  },
  computed: {
    dataHeader: function() {
      let allField = [];
      if (!this.dataTable) {
        return [{ key: "olaf", label: "nolaf" }];
      }

      const kunci = Object.keys(this.dataTable[0]);
      for (let i = 0; i < kunci.length; i++) {
        allField.push({
          key: kunci[i],
          label: kunci[i]
        });
      }

      let fd = { key: "actions", label: "Actions" };
      allField.push(fd);
      return allField;
    }
  },
  methods: {
    info: function(item, index, button) {
      console.log(item.first_name);
      this.infoModal.fullname =
        `${item.first_name}` + " " + `${item.last_name}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal: function() {
      this.infoModal.fullname = "";
      this.infoModal.content = "";
    }
  }
};
</script>
<style >
.smartTable .table thead th {
  border-bottom: 2px solid aquamarine;
  background-color: blueviolet;
  color: #fff;
}
</style>