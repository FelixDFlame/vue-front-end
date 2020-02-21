<template>
  <div class="login">
    <h1>Login Page</h1>
    <section class="login-block">
      <div class="container">
        <div class="row">
          <div class="col-md-8 banner-sec">
            <CarouselLogin />
          </div>
          <div class="col-md-4 login-sec">
            <!-- <base-notification-message-component
              :type="messageBox.type"
              :header="messageBox.header"
              :boolHide="!messageBox.boolHide"
            >
              <p style="font-size:12px;" v-html="messageBox.detail"></p>
            </base-notification-message-component>-->

            <h2 class="text-center">Login Now</h2>
            <form class="login-form">
              <div class="form-group">
                <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  v-model="user.username"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="user.password"
                />
              </div>

              <div class="remember-me">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" />
                  <small>Remember Me</small>
                </label>
              </div>
              <button type="submit" class="btn btn-login" @click="loginAction">Submit</button>
            </form>
            <button class="btn btn-login" @click="loginAction">Submit</button>
            <button type="submit" class="btn btn-login" @click="showToken">Token</button>
            <button type="submit" class="btn btn-login" @click="requestMe">Request Me</button>
            <button
              type="button"
              class="btn btn-login"
              @click="makeToast('danger', 'HOLA', 'OLAAA')"
            >MakeToast</button>

            <div class="copy-text">
              Created with
              <i class="fa fa-heart"></i> by Grafreez
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CarouselLogin from "@/components/Login/CarouselLogin.vue";
import BaseNotificationMessageComponent from "@/components/BaseNotificationMessageComponent.vue";
import { BToast,BToaster } from 'bootstrap-vue'
import axios from '@/axios'

export default {
  name: "home",
  components: {
    CarouselLogin,
    BaseNotificationMessageComponent,
    BToast,
    BToaster
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      messageBox: {
        type: "",
        header: "",
        detail: "",
        boolHide: true
      }
    };
  },
  methods: {
    loginAction: function() {
      axios
        .post("login", {
          username: this.user.username,
          password: this.user.password
        })
        .then(response => {
          console.log(response.data);
          if (response.status) {
            alert("Login Completed " + response.data.token);
          }

          //update token User
          localStorage.setItem("token", response.data.token);
          // this.$store.state.token = response.data.token;

          //get Data User
          // this.$store.state.curentUser.name = "";
          // this.$store.state.curentUser.idIndividu = "";

          //go to login page
          this.$router.push("/home");
        })
        .catch(error => {
          //fill MessageBox
          if ((error.status = 401)) {
            //wrong user pass
            this.messageBox.detail =
              "Invalid <b>Username</b> or <b>Password</b>";
          } else if ((error.status = 422)) {
            //no username or password
            this.messageBox.detail =
              "<b>Username</b> or <b>Password</b> cannot be Nothing";
          } else {
            this.messageBox.detail = "<b>Error " + error.status + "</b> ";
          }
          this.messageBox.type =
            "alert alert-danger alert-dismissible fade show";
          this.messageBox.header = "Login Failed";

          this.makeToast(
            "danger",
            this.messageBox.header,
            this.messageBox.detail
          );
          alert("Login Failed");
          this.messageBox.boolHide = false;

          console.log(error.response);
        });
    },
    showToken: function() {
      alert(localStorage.getItem("token"));
      // alert(this.$store.state.token);
    },
    requestMe: function() {
      axios
        .get("me", {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    makeToast(variant = null, header = null, detail = null) {
      this.$bvToast.toast(detail, {
        title: header,
        toaster: 'b-toaster-top-right',
        variant: variant,
        solid: true,
        noAutoHide: true
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/login_style.css">
</style>