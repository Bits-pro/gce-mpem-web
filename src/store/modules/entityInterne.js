import axios from 'axios'

export default {
  state: {
    listEntities: []
  },
  getters: {
    listEntities: state => state.listEntities,
  },
  mutations: {
    setEntities (state, items) {
      state.listEntities = items
    },
  },
  actions: {
    createEntity({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/entite-internes/", payload, {
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
    fetchEntities({ commit }) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/entite-internes/", {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setEntities', res.data)
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    }
  }
}
