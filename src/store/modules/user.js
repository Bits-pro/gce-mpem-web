import firebase from 'firebase/app'
import 'firebase/auth'
import { currentUser, isAuthGuardActive } from '../../constants/config'
import { setCurrentUser, getCurrentUser } from '../../utils'
import axios from 'axios'

export default {
  state: {
    currentUser: isAuthGuardActive ? getCurrentUser() : currentUser,
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null,
    users: []
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
    usersList: state => state.users,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess = true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess = true
    },
    clearError(state) {
      state.loginError = null
    },
    setUsers(state, payload) {
      state.users = payload
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/login/", payload)
        .then(res => {
          console.log(res.data.token)
          window.localStorage.setItem('admin_token', res.data.token);
          window.localStorage.setItem('user_name', payload.username);
          const item = { uid: 'ddjdjdjks' }
          setCurrentUser(item)
          commit('setUser', item)
          resolve(res.data);
          /* context.commit('completOrder', res.data)
          console.log(res.data)
          resolve(res.data); */
        }).catch( res => {
          console.log(res.message)
          commit('setError', res.message)
          setTimeout(() => {
            commit('clearError')
          }, 3000)
          resolve(res);
        })
      });
      /* firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const item = { uid: user.user.uid, ...currentUser }
            setCurrentUser(item)
            commit('setUser', item)
          },
          err => {
            setCurrentUser(null);
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        ) */
    },
    forgotPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode, payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },


    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setCurrentUser(null);
          commit('setLogout')
        }, _error => { })
    },
    fetchUsers({ commit }, payload) {
      commit('setProcessing', true)
      const endPoint = payload !=null ? "/users/?search=" + payload : "/users/";
      
      return new Promise(function(resolve, reject) {
        axios.get(api_url + endPoint, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setUsers', res.data)
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    checkAdmin({ commit }, payload) {
      commit('setProcessing', true)
      const endPoint = "/is-admin/";
      
      return new Promise(function(resolve, reject) {
        axios.get(api_url + endPoint, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          console.log(res.data)
          window.localStorage.setItem('gce_is_admin', res.data);
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    checkSG({ commit }, payload) {
      commit('setProcessing', true)
      const endPoint = "/is-sg/";
      
      return new Promise(function(resolve, reject) {
        axios.get(api_url + endPoint, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          window.localStorage.setItem('gce_is_sg', res.data);
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    getUsers({ commit }, payload) {
      commit('setProcessing', true)
      const endPoint = "/users/";
      
      return new Promise(function(resolve, reject) {
        axios.get(api_url + endPoint, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setUsers', res.data)
          return resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    createIterim({ commit }, payload) {
      commit('setProcessing', true)
      const endPoint = "/add-interim/";
      
      return new Promise(function(resolve, reject) {
        axios.post(api_url + endPoint, payload, {
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

    checkExpire({ commit }, payload) {
      commit('setProcessing', true)
      const endPoint = "/is-expired/";
      
      return new Promise(function(resolve, reject) {
        axios.get(api_url + endPoint, {
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

    getUserIterim({ commit }, payload) {
      commit('setProcessing', true)
      const endPoint = "/users-interim/";
      
      return new Promise(function(resolve, reject) {
        axios.get(api_url + endPoint, {
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
}
