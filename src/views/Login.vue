<template>
  <div class="login">
    <div class="login-bootstrap">
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
    </div>
    <h1>Login Page</h1>
    <section class="login-block">
      <div class="container">
        <div class="row">
          <div class="col-md-8 banner-sec">
            <CarouselLogin />
          </div>
          <div class="col-md-4 login-sec">
            <h2 class="text-center">Login Now</h2>
            <form class="login-form">
              <div class="form-group">
                <label for="exampleInputEmail1" class="text-uppercase">Username</label>
                <input type="text" class="form-control" placeholder />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                <input type="password" class="form-control" placeholder />
              </div>

              <div class="form-check">
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" />
                  <small>Remember Me</small>
                </label>
                <button type="submit" class="btn btn-login float-right">Submit</button>
              </div>
            </form>
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

<script lang="ts">
import CarouselLogin from "@/components/Login/CarouselLogin.vue";

export default {
  name: "home",
  components: {
    CarouselLogin
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/assets/css/login_style.css">
</style>
  