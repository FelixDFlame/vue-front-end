import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from '@/axios'
import shop from '@/api'

Vue.use(Vuex)

//initState
const initState = {
  message: "",
  count: 0,
  products: [],
  cart: [],
  checkoutStatus: null
};


export default new Vuex.Store({
  state: {
    //equal *data di vue
    //contoh : products: []

    //Region Auth 
    token: localStorage.getItem('token') || '',
    status: '',
    //End Region Auth 

    currentUser: { name: '', idIndividu: '' },
    roles: [],

    //Bagian testing Vuex
    message: "Hello Felix",
    count: 0,
    products: [],
    cart: [],//{id,quantity}
    checkoutStatus: null,

    //Bagian Movie
    movies: [
      {
        id: 1,
        name: "ES2015 Arrow Functions",
        description: `<p>ES2015 (aka ES6) has some great ways to make your code easier to write and understand. In this episode, we cover two different ways that you can make your code clearer by removing the 'function' keyword.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Arrow+Function.png',
      },
      {
        id: 2,
        name: "ES2015 Template Strings",
        description: `<p>Template strings are an incredibly useful new feature in ES2015... and you can use them in your Ember apps today!</p>
                      <p>Here are 3 cool things that template strings enable.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Template+Strings.png',
      },
      {
        id: 3,
        name: "ES2015 Modules",
        description: `<p>Before modules, javascript code loading was a mess. Now it's pretty amazing.</p>
                      <p>Learn about ES2015 modules and how they work together with ember-cli.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+ES2015+Modules.png',
      },
      {
        id: 4,
        name: "Promise Basics",
        description: `<p>Promises are a tool for handling asynchronous communication, and they are commonly used in Ember applications. They’re even built in to Ember Data, route handling, and other parts of the Ember source.</p>
                      <p>This episode introduces the then, catch, and finally blocks, how to chain them together, and how to use them with either named or anonymous functions.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Promise+Basics.png',
      },
      {
        id: 5,
        name: "Creating New Promises",
        description: `<p>Sometimes you want to start a new promise chain or have greater control over the timing of events. By manually creating a promise, you can do that.</p>
                      <p>In this video we cover creating a new promise and resolving or rejecting the promise. We use two examples- a custom AJAX login and an Ember Data findAll request.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Creating+New+Promises.png',
      },
      {
        id: 6,
        name: "Multiple Concurrent Promises",
        description: `<p>Sometimes promises have to happen in an exact order, but often there will be several calls that can be made concurrently. RSVP’s Promise implementation allows that.</p>
                      <p>In this video we show how to use the hash method, one of several methods available to do concurrent promises.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Multiple+Concurrent+Promises.png',
      },
      {
        id: 7,
        name: "ES2015 Destructuring",
        description: `<p>Destructuring is really cool, can save you code, and you’re probably already using a small portion of its power.</p>
                      <p>Learn more about this cool new ES2015/ES6 feature, including how to destructure deeply nested objects, how to use it with Ember’s import statement, and how to use it with arrays.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Destructuring.png',
      },
      {
        id: 8,
        name: "ES2016 Decorators",
        description: `<p>Decorators let you easily and repeatedly add functionality to existing functions.</p>
                      <p>In this episode we go over how to use and create decorators, creating two useful decorators that demonstrate different parts of the API.</p>`,
        thumbnail: 'https://vue-screencasts.s3.us-east-2.amazonaws.com/images/video-thumbnails/Thumbnail+-+Decorators.png',
      }
    ],
  },
  mutations: {
    //new for setting and update the state
    //contoh : setProduct()

    //disini kita mutasi objeknya
    //cara akses store.mutations.sebuahMethod()
    //contoh : store.mutations.increment(payload)
    //hanya bisa digunakan ketika sync
    increment: (state: any, payload) => {
      state.count += payload
    },
    //bagian Learn Vuex
    setProducts(state: any, products) {
      state.products = products;
      console.log(state.products[0].inventory)
    },
    decrementProductInventory(state, product) {
      product.inventory--
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementCartQuantity(state, cartItem) {
      cartItem.quantity++
    },
    setCheckoutStatus(state, status) {
      (status == 'success') ?
        state.checkoutStatus = true
        : state.checkoutStatus = false
    },
    emptyCart(state) {
      state.cart = []
    },
    resetState(state) {
      Object.assign(state, initState)
    }
  },
  actions: {
    //equal *methods di vue (make api call here)
    //contoh : fetchProduct()

    //biasanya dalam bentuk promise utk fetch Data
    fetchProducts(context) {
      return new Promise((resolve, reject) => {
        // make the call
        // to run setProduct pada mutation
        //context adalah store object
        shop.getProducts((products: any) => {
          //commit utk call mutations
          context.commit('setProducts', products)
          resolve()
        })
      })
    },
    addProductToCart(context, product) {
      if (context.getters.productIsInStock(product)) {
        const cartItem = context.state.cart.find(
          (item: any) => item.id === product.id
        );
        if (cartItem) {
          //sudah ada dalam cart
          context.commit('incrementCartQuantity', cartItem)
        } else {
          //belum ada dalam cart
          context.commit('pushProductToCart', product.id)
        }
        //kurangin stock
        context.commit('decrementProductInventory', product)
      } else {
        //item kosong
        
        //do nothing
      }
    },
    //{state , commit} merupakan content property 
    //destructuring ES 6
    checkout({ state, commit }) {
      shop.buyProducts(state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        //call back failed
        () => {
          commit('setCheckoutStatus', 'failed')
        })
    },
    //digunakan ketika can be async ataupyn sync
    increment: (state: any, payload) => {
      state.commit('increment', payload)
    }

  },
  getters: {
    //equal *computed property di vue
    //contoh : productCount()

    //access state / datanya lewat sini tidak baik jika lgsg
    //cara akses store.getters.sebuahMethod()
    //contoh : store.getters.message()
    message: (state: any) => {
      return state.message.toUpperCase()
    },
    counter: (state: any) => {
      return state.count
    },
    availableProducts(state, getters) {
      return state.products.filter(
        (product: any) => { return product.inventory > 0 }
      )
    },
    cartProducts(state, getters) {
      let dataProducts = state.cart.map((cartItem: any) => {
        const product = state.products.find((product: any) => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
      return dataProducts
    },
    cartTotalPrice(state, getters) {
      let totalPrice = 0
      //getters ini mengambil data yang berada pada getters
      getters.cartProducts.forEach((product: any) => {
        totalPrice += product.price * product.quantity
      })
      return totalPrice

      //singkatnya
      // return getters.cartProducts.reduce(() => total + product.price*product.quantity,0)
    },
    productIsInStock() {
      //buat productIsInStock memiliki (perlu 1 parameter yaitu product)
      return (product: any) => {
        return product.inventory > 0
      }
    },

    //Bagian Movie
    getMovies: (state: any) => {
      return state.movies
    }

  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
