<template>
  <div id="shopping-list">
    <div class="header">
      <h1>{{ header }}</h1>
      <button v-if="state == 'default'" @click="state='edit'" class="btn btn-primary">Add Item</button>
      <button v-else class="btn btn-cancel" @click="state='default'">Cancel</button>
    </div>
    <div v-if="state == 'edit'" id="addListItem">
      <input v-model="newItem" type="text" placeholder="Add New Item" @keyup.enter="addItem" />
      <!-- v-on:keyup digunakan ketika onChange -->
      <!-- tapi untuk cek enter key kita pakai keyup.enter -->
      <p>{{ countCharacter }}/20 CHARACTER</p>
      <button @click="addItem">Add Item</button>
    </div>
    <div class="card">
      <div class="card-body">
        <ul>
          <li
            v-for="item in reverseItems"
            :key="item.id"
            :class="{'strikeout':item.purchased}"
            @click="item.purchased = !item.purchased"
          >
            {{ item.name }}
            <!-- remove item bermasalah dan ketika remove ke klik li juga ke klik -->
            <button v-if="state == 'edit'" @click="items.splice(index, 1)">Remove Item</button>
          </li>
        </ul>
        <h3 v-if="this.items.length == 0">No Item Listed in Shopping List</h3>
      </div>
    </div>
    <div class="register-form">
      <h1>Register Form</h1>
      <input v-model="user.name" placeholder="Name" />
      <br />
      <input v-model="user.username" placeholder="Username" />
      <br />
      <input v-model="user.password" type="password" placeholder="Password" />
      <br />
      <input
        v-model="user.password_confirmation"
        type="password"
        placeholder="Password Confirmation"
      />
      <br />
      <input type="submit" @click="kirim" />
    </div>
    <div class="api-requested">{{ info }}</div>
  </div>
</template>

<script>
export default {
  name: "shopping-list",
  data() {
    return {
      state: "default",
      header: "Shopping List",
      newItem: "",
      info: null,
      error: {},
      user: { username: "", name: "", password: "", password_confirmation: "" },
      items: []
    };
  },
  mounted() {
    //https://api.coindesk.com/v1/bpi/currentprice.json
    const param = { name: "Felix" };
    axios
      .get("http://localhost:8082/api/user/tes/", {
        param
      })
      .then(response => {
        // console.log(response.status);
        this.info = response;
      })
      .catch(error => {
        // console.log(error.status);
        // console.log(error);
      });
  },

  computed: {
    countCharacter() {
      return this.newItem.length;
    },
    reverseItems() {
      //usahakan semua hal yang ada di computed tidak memutasikan array
      //(tidak mengubah nilai asli dari array)
      return this.items.slice(0).reverse();
    }
  },

  methods: {
    addItem: function() {
      if (this.newItem == "") {
        // console.log("Hello");
        alert("Item tidak boleh Kosong!!");
      } else {
        this.items.push({ name: this.newItem.trim(), purchased: false });
        this.newItem = "";
      }
    },
    kirim: function() {
      axios
        .post("http://localhost:8082/api/register/", {
          name: this.user.name,
          username: this.user.username,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation
        })
        .then(response => {
          console.log(response.status);
          if (response.status) {
            alert("Register Completed");
          }
          this.info = response;
        })
        .catch(error => {
          console.log(this.user.name);
          console.log(this.user.username);
          alert("simisai");
          console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
ul {
  width: 300px;
  margin: 20px auto;
}
.header {
  margin: 20px 0px;
  display: inline-flex;
}
.header h1 {
  margin-right: 20px;
}

.strikeout {
  text-decoration: line-through;
}
</style>