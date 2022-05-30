import axios from 'axios'

export default {
  state: {
    templates: []
  },
  getters: {
    templates: state => state.templates,
  },
  mutations: {
    setTemplates (state, items) {
      state.templates = items
    },
  },
  actions: {
    createTemplates({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/templates/", payload, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    fetchTemplates({ commit }) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/templates/", {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setTemplates', res.data)
          return resolve(res.data);
        }).catch( res => {
          return resolve(res);
        })
      });
    }
  }
}
