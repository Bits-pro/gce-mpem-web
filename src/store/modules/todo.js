import axios from 'axios'
import { apiUrl } from '../../constants/config'

const state = {
  isLoad: false,
  allItems: null,
  items: null,
  itemsToto: null,
  labels: null,
  todoError: ''
}

const getters = {
  isLoad: state => state.isLoad,
  allItems: state => state.allItems,
  todoError: state => state.todoError,
  items: state => state.items,
  itemsToto: state => state.itemsToto,
  labels: state => state.labels
}

const mutations = {
  getTodoItemsSuccess (state, items) {
    console.log('items')
    console.log(items)
    state.isLoad = true
    state.allItems = items
    state.itemsToto = items
  },
  setLabels (state, items) {
    state.labels = items
  },
}

const actions = {
  getTodoItems ({ commit }) {
    return new Promise(function(resolve, reject) {
      axios
        .get(api_url + "/todos/", {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          resolve()
          commit('getTodoItemsSuccess', res.data)
          return res.data;
        })
    });
  },
  createTodo({ commit }, payload) {
    commit('setProcessing', true)
    return new Promise(function(resolve, reject) {
      axios.post(api_url + "/todos/", payload, {
        headers: {
          Authorization: 'Token ' + window.localStorage.getItem('admin_token')
        }
      })
      .then(res => {
        return resolve(res.data);
      }).catch( res => {
        resolve(res);
      })
    });
  },
  getLabels ({ commit }) {
    axios
      .get(api_url + "/todo-labels/", {
        headers: {
          Authorization: 'Token ' + window.localStorage.getItem('admin_token')
        }
      })
      .then(res => {  
        console.log(res.data)
        commit('setLabels', res.data)
      })
  },
  createLabel({ commit }, payload) {
    commit('setProcessing', true)
    return new Promise(function(resolve, reject) {
      axios.post(api_url + "/todo-labels/", payload, {
        headers: {
          Authorization: 'Token ' + window.localStorage.getItem('admin_token')
        }
      })
      .then(res => {
        return resolve(res.data);
      }).catch( res => {
        resolve(res);
      })
    });
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
