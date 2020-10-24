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
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      dispatch('fetchUserProfile', user)
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      router.push('/')
    }
  },
  modules: {
    
  }
})
