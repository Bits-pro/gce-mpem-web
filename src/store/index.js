import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import todo from './modules/todo'
import categories from './modules/categories'
import documents from './modules/documents'
import entityInterne from './modules/entityInterne'
import annotations from './modules/annotations'
import dashboard from './modules/dashboard'
import templates from './modules/templates'
import { setCurrentLanguage } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    changeLang (state, payload) {
      app.$i18n.locale = payload
      setCurrentLanguage(payload);
    }
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    user,
    todo,
    categories,
    documents,
    entityInterne,
    annotations,
    dashboard,
    templates,
  }
})