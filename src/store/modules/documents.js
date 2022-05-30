import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
const doc = new jsPDF()

export default {
  state: {
    list: [],
    courrier: {},
    listDocument: [],
    recents: [],
    ref: '',
  },
  getters: {
    listDoc: state => state.list,
    courrierDoc: state => state.courrier,
    listDocument: state => state.listDocument,
    refId: state => state.ref,
    recents: state => state.recents,
  },
  mutations: {
    setData (state, items) {
      state.list = items
    },
    setCourrier (state, items) {
      state.courrier = items
    },
    setCourrierDocuments (state, items) {
      state.listDocument = items
    },
    setRef (state, items) {
      state.ref = items
    },
    setRecentCourrier (state, items) {
      state.recents = items
    },
    generateAccuess(state, payload) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      doc.text(`Accusé de réception`, 10, 10)
      doc.text(`COURRIER NUMERO ${ payload.id }`, 70, 20)
      doc.text(`Objet: ${ payload.object }`, 10, 30)
      doc.text(`Date: ${ dd }/${ mm }/${ yyyy }`, 10, 40)
      autoTable(doc, {
        margin: { top: 45 },
        head: [['N°', 'REFERENCE', 'N° Enregistrement', 'DECHARGE']],
        body: [
          [payload.id, payload.reference, payload.num_enregistrement, ''],
        ],
      })
      doc.save(`Accusé de réception-${payload.reference}.pdf`)
    }
  },
  actions: {
    createDocument({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/courriers/", payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          console.log('res')
          console.log(res)
          commit('generateAccuess', res.data)
          resolve(res.data);
        }).catch( err => {
          commit('setProcessing', false)
          reject(err);
        })
      });
    },
    fetchDocuments({ commit }, payload) {
      commit('setProcessing', true)
      var endpoint = payload != null ? "/courriers/?search=" + payload : "/courriers/";
      return new Promise(function(resolve, reject) {
        axios.get(api_url + endpoint, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setData', res.data)
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    fetchCourrier({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/courriers/" + payload.id, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setCourrier', res.data)
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    deleteCourrier({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.delete(api_url + "/courriers/" + payload, {
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
    updateDocument({ commit }, payload) {
      console.log(payload)
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.patch(api_url + "/courriers/" + payload.id + "/", payload, {
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
    createPiece({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/documents/", payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
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
    fetchCourrierDocuments({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/documents/?courrier=" + payload, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setCourrierDocuments', res.data)
          return resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    fetchRef({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/get-reference/", {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setRef', res.data)
          return resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    fetchRecentCourrier({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/courriers-recent/", {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setRecentCourrier', res.data)
          return resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    signFile({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/e-sign/", payload, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          return resolve(res);
        }).catch( res => {
          resolve(res);
        })
      });
    },
  }
}
