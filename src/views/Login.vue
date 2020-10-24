<template>
  <div class="login-container">
    <div class="login-info">
      <h1>XIV-LFG</h1>
      <p>XIV-LFG is a recruitment tool for Final Fantasy XIV, allowing raid groups and individual players to find their perfect match based on role, experience, time availability and skill.</p>
    </div>
    <div class="login-form">
      <form v-if="showLoginForm" @submit.prevent>
        <h1>Sign In</h1>
        <span v-if="error" class="error-container">
          {{error}}
        </span>
        <div class="login-form-group">
          <label for="email1">Email</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="warrioroflight@gmail.com" id="email1"/>
        </div>
        <div class="login-form-group">
          <label for="password1">Password</label>
          <input v-model.trim="loginForm.password" type="password" placeholder="********" id="password1"/>
        </div>
        <button @click="login()" class="login-form-button">Log In</button>
        <div class="login-form-extras">
          <a @click="toggleForm()">New to XIV-LFG? Create an account!</a>
        </div>
      </form>
      <form v-else @submit.prevent>
        <h1>Sign Up</h1>
        <span v-if="error" class="error-container">
          {{error}}
        </span>
        <div class="login-form-group">
          <label for="email2">Email</label>
          <input v-model.trim="signupForm.email" type="text" placeholder="warrioroflight@gmail.com" id="email2"/>
        </div>
        <div class="login-form-group">
          <label for="password2">Password</label>
          <input v-model.trim="signupForm.password" type="password" placeholder="********" id="password2"/>
        </div>
        <button @click="signup()" class="login-form-button">Create Account</button>
        <div class="login-form-extras">
          <a @click="toggleForm()">New to XIV-LFG? Create an account!</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        email: '',
        password: ''
      },
      showLoginForm: true
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password
      })
    }
  }
}
</script>
<style lang="scss">

body {
  background-color: darkgray;
}

.error-container {
  color: red;
}

.login-container {
  display: flex;
  flex-direction: row;
  padding: 50px;
  background-color: whitesmoke;
  border-radius: 15px;

  .login-info {
    width: 50%;
    border-right: grey 1px solid;
    padding: 20px;
  }

  .login-form {
    padding: 20px;

    .login-form-group {
      margin: 20px 0;

      input {
        margin-left: 10px;
      }
    }
    .login-form-extras {
      margin: 20px 0;

      a {
        color: blue;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}

</style>