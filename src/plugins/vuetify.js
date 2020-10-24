import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#241F33',
        secondary: '#6744E8',
        accent: '#FEE1BF',
        error: '#BB4C4F'
      }
    }
  }
});
