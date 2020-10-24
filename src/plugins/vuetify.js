import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        primary: '#8969ff',
        secondary: '#bba8ff',
        accent: '#FEE1BF',
        success: '#66ff9e',
        info: '#66b8ff',
        error: "#ff4a68"
      }
    }
  }
});
