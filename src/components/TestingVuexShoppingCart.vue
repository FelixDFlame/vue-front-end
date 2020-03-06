<template>
  <div>
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        <b>Item :</b>
        {{ item.title }}
        <b>Base Price :</b>
        {{ item.price }}
        <b>Quantity :</b>
        {{ item.quantity }}
      </li>
    </ul>
    <hr />
    <b>Total Price :</b>
    {{ cartTotalPrice }}
    <b-button variant="success" @click="buyProduct">Buy</b-button>
    <p>Status : {{ $store.state.checkoutStatus }}</p>
  </div>
</template>
<script>
import store from "@/store";

import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    // cart() {
    //   return store.getters.cartProducts;
    // },
    // cartTotalPrice() {
    //   return store.getters.cartTotalPrice;
    // },
    ...mapGetters({
      cart: "cartProducts",
      cartTotalPrice: "cartTotalPrice"
    }),

    resetState() {
      store.commit("resetState");
    }
  },
  methods: {
    // buyProduct() {
    //   store.dispatch("checkout");
    // },
    ...mapActions({
      buyProduct: "checkout"
    })
  }
};
</script>