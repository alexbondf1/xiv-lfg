<template>
  <div class="login-container d-flex flex-column justify-space-around align-center">
    <v-dialog
      v-model="showPasswordReset"
      persistent
      max-width="600"
      class="reset-password-dialog"
    >
      <v-card>
        <v-card-title class="headline">
          Reset your password
        </v-card-title>
        <v-card-text>Enter your password below and we will send you an email with instructions.</v-card-text>
        <v-card-text>
          <span v-if="error && showPasswordReset === true" class="reset-password-error-message error--text">
            {{error}}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-text-field
            v-model="resetPasswordEmail"
            label="Email"
            outlined
            clearable
            hide-details
          ></v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="resetPassword()"
          >
            Reset Password
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="togglePasswordReset()"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="login-info">
      <h1>XIV-LFG</h1>
      <p>XIV-LFG is a recruitment tool for Final Fantasy XIV, allowing raid groups and individual players to find their perfect match based on role, experience, time availability and skill.</p>
    </div>
    <div class="login-form">
      <form v-if="showLoginForm" @submit.prevent>
        <h2>Sign In</h2>
        <p v-if="error && showPasswordReset === false" class="error-message error--text">
          {{error}}
        </p>
        <div class="login-form-group">
          <v-text-field
            v-model="loginForm.email"
            label="Email"
            outlined
            clearable
          ></v-text-field>
        </div>
        <div class="login-form-group">
          <v-text-field
            v-model="loginForm.password"
            label="Password"
            outlined
            clearable
            type="password"
          ></v-text-field>
        </div>
        <v-btn @click="login()" color="primary">Login</v-btn>
        <div class="login-form-extras">
          <a @click="togglePasswordReset()">Forgot Password?</a><br/>
          <a @click="toggleForm()">New to XIV-LFG? Create an account!</a>
        </div>
      </form>
      <form v-else @submit.prevent>
        <h1>Sign Up</h1>
        <p v-if="error && showPasswordReset === false" class="error-message error--text">
          {{error}} 
        </p>
        <div class="login-form-group">
          <v-text-field
            v-model="signupForm.email"
            label="Email"
            outlined
            clearable
          ></v-text-field>
        </div>
        <div class="login-form-group">
          <v-text-field
            v-model="signupForm.password"
            label="Password"
            outlined
            clearable
            type="password"
          ></v-text-field>
        </div>
        <v-btn @click="signup()" color="primary">Create Account</v-btn>
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
      resetPasswordEmail: '',
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.$store.commit('resetError')
      this.showPasswordReset = !this.showPasswordReset
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
    },
    resetPassword() {
      this.$store.dispatch('resetPassword', this.resetPasswordEmail)
      .then(() => {
        if (this.error === "") {
          this.showPasswordReset = false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {

  .login-info, .login-form {
    width: 50%;
    margin: 30px 0;
  }

  .login-form {
    h2 {
      margin-bottom: 15px;
    }
    .login-form-extras {
      margin: 15px 0;
    }
  }
}
</style>