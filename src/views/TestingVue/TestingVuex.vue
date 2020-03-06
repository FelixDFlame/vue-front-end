<template>
  <div>
    <h1>Product List</h1>
    <div>
      <img v-show="loading" src="https://i.imgur.com/JfPpwOA.gif" />
      <ul v-show="!loading">
        <li v-for="item in products" :key="item.id">
          <b>Item :</b>
          {{ item.title }}
          <b>Price :</b>
          {{ item.price }}
          <b>Stock :</b>
          {{ item.inventory }}
          <b-button
            variant="success"
            @click="addProductToCart(item)"
            :disabled="!productIsInStock(item)"
          >Add To Cart</b-button>
        </li>
      </ul>
    </div>
    <hr />
    <TestingVuexShoppingCart />
    <p>{{ message }}</p>
    <p>{{ count }}</p>
    <button @click="tambah">Press Me</button>
  </div>
</template>
<script>
import store from "@/store";
// import shop from "@/api";// ketika udh pake action ini dibuang semua akses shop ada pada vuex
import TestingVuexShoppingCart from "@/components/TestingVuexShoppingCart";

// supaya nanti tidak perlu menggunakan store lagi
// gunakan Map Helper dari Vuex
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    TestingVuexShoppingCart
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    // message() {
    //   return store.getters.message;
    // },
    // count() {
    //   return store.getters.counter;
    // },
    // products() {
    //   //ketika get data usahakan gunakan getters
    //   return store.state.products;
    //   // return store.getters.availableProducts; //utk nampilkan product yang ada > 0
    // },
    // productIsInStock() {
    //   return store.getters.productIsInStock;
    // },

    // semua cara buat di atas sangat tidak rapi dan tidak terstruktur
    // solusi gunakan map Helper perlu import { mapState, mapGetter }
    ...mapState({
      //perlu function untuk resultnya
      products: state => state.products
    }),
    ...mapGetters({
      // butuh nama getter untuk dijalankan getternya
      message: "message",
      count: "counter",
      productIsInStock: "productIsInStock"
    }),

    //reset the state every refresh
    resetState() {
      return store.commit("resetState");
    }
  },
  methods: {
    // tambah: function() {
    //   //sbnrnya tidak boleh harusnya ubahnya dari action pada vuex
    //   //store.commit("increment", 10); //ini manggil mutation yang sync
    //   store.dispatch("increment", 20); //ini manggil action
    // },
    // addProductToCart(product) {
    //   this.$store.dispatch("addProductToCart", product);
    // },

    //gunakan mapHelper Vuex supaya lebih simple codenya
    ...mapActions({
      // isinya nama action yang ingin di dispatchkan
      fetchProducts: "fetchProducts",
      addProductToCart: "addProductToCart",
      tambah: "increment"
    })
  },
  created() {
    // shop.getProducts(products => {
    //   store.commit("setProducts", products);
    // });
    //utk tampilkan loading jika belum fetch data siap
    // this.loading = true;

    // store.dispatch("fetchProducts").then(() => {
    //   this.loading = false;
    // });

    //yang di atas dipakai jika belum ada mapAction fetchProduct
    //jika sudah ada pake yang dibawah sebab fetchProduct sudah bisa diakses melalui this.fetchProducts
    this.loading = true;
    this.fetchProducts().then(() => {
      this.loading = false;
    });
  }
};
</script>
<style scoped>
li {
  margin: 10px;
}
</style>