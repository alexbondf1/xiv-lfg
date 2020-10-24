import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    error: ""
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setError(state, err) {
      state.error = err.message
    },
    resetError(state) {
      state.error = ""
    }
  },
  actions: {
    async login({ dispatch }, form) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        dispatch('fetchUserProfile', user)
      } catch (err) {
        this.commit('setError', err)
      }
    },

    async signup({ dispatch }, form) {
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
        dispatch('fetchUserProfile', user)
      } catch (err) {
        this.commit('setError', err)
      }
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      router.push('/')
    },

    async resetPassword({ commit }, email) {
      try {
        await fb.auth.sendPasswordResetEmail(email)
      } catch (err) {
        commit('setError', err)
      }
    }
  },
  modules: {
    
  }
})
