<template>
  <div class="col-md-4 regis-sec">
    <h2 class="text-center">Register Now</h2>
    <form class="login-form">
      <div class="form-group">
        <label for="exampleInputEmail1" class="text-uppercase">Username</label>
        <input type="text" class="form-control" placeholder="Username" v-model="user.username" />
      </div>
      <div class="form-group">
        <label for="exampleInputName1" class="text-uppercase">Name</label>
        <input type="text" class="form-control" placeholder="Name" v-model="user.name" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="text-uppercase">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="user.password" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword2" class="text-uppercase">Password Confirmation</label>
        <input
          type="text"
          class="form-control"
          placeholder="Password Confirmation"
          v-model="user.password_confirmation"
        />
      </div>
      <b-button
        type="button"
        variant="success"
        class="btn-regis"
        @click="registrationAction"
      >Register</b-button>
    </form>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      user: { username: "", name: "", password: "", password_confirmation: "" },
      info: ""
    };
  },
  methods: {
    registrationAction: function() {
      axios
        .post("register", {
          name: this.user.name,
          username: this.user.username,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation
        })
        .then(response => {
          console.log(response.status);
          if (response.status) {
            alert("Register Completed");
            //redirect route to login page
            this.$router.replace('/login')
          }
          this.info = response;
        })
        .catch(error => {
          alert("Register Failed");
        });
    }
  }
};
</script>
<style scoped src="@/assets/css/login_style.css">
</style>