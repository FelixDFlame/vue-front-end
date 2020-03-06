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
    <div ref="content" id="MyContent">
      <div class="api-requested">{{ info }}</div>
      <div class="tesVuetify">
        <h3>Testing Generate PDF</h3>
        <div>
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
          <button @click="generatePDF">Generate PDF</button>
          <button @click="generatePDF2">Generate PDF 2</button>
        </div>
      </div>
    </div>
    <div class="tesToast">
      <b-button @click="makeToast()" class="mb-2">Default</b-button>
      <b-button variant="primary" @click="makeToast('primary')" class="mb-2">Primary</b-button>
      <b-button variant="secondary" @click="makeToast('secondary')" class="mb-2">Secondary</b-button>
      <b-button variant="danger" @click="makeToast('danger')" class="mb-2">Danger</b-button>
      <b-button variant="warning" @click="makeToast('warning')" class="mb-2">Warning</b-button>
      <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button>
      <b-button variant="info" @click="makeToast('info')" class="mb-2">Info</b-button>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { ToastPlugin } from "bootstrap-vue";
import { BToast } from "bootstrap-vue";

import axios from "@/axios";

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
  components: {
    BToast
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
    },
    generatePDF: function() {
      // const doc = new jspdf();
      // const html = this.$refs.content.innerHTML;

      // doc.fromHTML(html, 15, 15);
      // doc.save("output.pdf");

      var pdf = new jsPDF();
      var element = document.getElementById("MyContent");
      var wid = element.style.width;
      var hei = element.style.height;
      const options = { background: "white", height: hei, width: wid };
      domtoimage.toPng(element, options).then(dataUrl => {
        //Initialize JSPDF
        const doc = new jsPDF();
        //Add image Url to PDF
        doc.addImage(dataUrl, "PNG", 0, 0, 210, 340);
        doc.save("pdfDocument.pdf");
      });
    },
    generatePDF2: function() {
      // var wkhtmltopdf = require("wkhtmltopdf");
      // const html = this.$refs.content.innerHTML;
      // wkhtmltopdf("http://google.com/", { output: 'out.pdf' });
    },
    makeToast(variant = null, append = false) {
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: "BootstrapVue Toast",
        autoHideDelay: 5000,
        appendToast: append
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