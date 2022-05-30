import axios from 'axios'

export default {
  state: {
    listCategories: []
  },
  getters: {
    listCategories: state => state.listCategories,
  },
  mutations: {
    setCategories (state, items) {
      state.listCategories = items
    },
  },
  actions: {
    createCategory({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/categories/", payload, {
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
    fetchCategories({ commit }) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/categories/", {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setCategories', res.data)
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    }
  }
}
