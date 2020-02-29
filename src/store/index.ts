import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from '@/axios'

Vue.use(Vuex)

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
    }

    // [AUTH_REQUEST]: (state) => {
    //   state.status = 'loading'
    // },
    // [AUTH_SUCCESS]: (state, token) => {
    //   state.status = 'success'
    //   state.token = token
    // },
    // [AUTH_ERROR]: (state) => {
    //   state.status = 'error'
    // },
  },
  actions: {
    //equal *methods di vue (make api call here)
    //contoh : fetchProduct()

    //digunakan ketika can be async ataupyn sync
    increment: (state: any, payload) => {
      state.dispatch('increment', payload)
    }


    // [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    //   return new Promise((resolve, reject) => { // The Promise used for router redirect in login
    //     commit(AUTH_REQUEST)
    //     axios({ url: 'auth', data: user, method: 'POST' })
    //       .then(resp => {
    //         const token = resp.data.token
    //         localStorage.setItem('user-token', token) // store the token in localstorage
    //         commit(AUTH_SUCCESS, token)
    //         // you have your token, now log in your user :)
    //         dispatch(USER_REQUEST)
    //         resolve(resp)
    //       })
    //       .catch(err => {
    //         commit(AUTH_ERROR, err)
    //         localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
    //         reject(err)
    //       })
    //   })
    // }
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
    //Bagian Movie
    getMovies: (state: any) => {
      return state.movies
    }


    //Region Auth 
    // isAuthenticated: state => !!state.token,
    // authStatus: state => status.status
    //End Region Auth 

  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
