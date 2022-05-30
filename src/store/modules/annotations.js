import axios from 'axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const doc = new jsPDF()

export default {
  state: {
    list: [],
    loading: false
  },
  getters: {
    listAnnotations: state => state.list,
    loading: state => state.loading,
  },
  mutations: {
    setAnnotations (state, items) {
      state.list = items
    },
    setProcessing (state, item) {
      state.loading = item
    },
  },
  actions: {
    fetchAnnotations({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.get(api_url + "/annotations/?courrier=" + payload, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          commit('setAnnotations', res.data)
          commit('setProcessing', false)
          resolve(res.data);
        }).catch( res => {
          resolve(res);
        })
      });
    },
    annoterCourrier({ commit }, payload) {
      commit('setProcessing', true)
      return new Promise(function(resolve, reject) {
        axios.post(api_url + "/annotations/", payload, {
          headers: {
            Authorization: 'Token ' + window.localStorage.getItem('admin_token')
          }
        })
        .then(res => {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();
          commit('setProcessing', false)
          resolve(res.data);
          doc.text(`BORDERAU D'ENVOI`, 10, 10)
          doc.text(`${dd }/${mm}/${yyyy}`, 160, 10)
          doc.text(`BORDERAU NUMERO ${res.data.id}`, 70, 20)
          doc.text(`${res.data.destination.username}`, 10, 40)
          autoTable(doc, {
            margin: { top: 45 },
            head: [['N°', 'REFERENCE', 'OBJET', 'DECHARGE']],
            body: [
              [res.data.courrier.num_enregistrement, res.data.courrier.reference, res.data.objectif, ''],
              // ...
            ],
          })
          doc.save('borderau.pdf')
        }).catch( res => {
          resolve(res);
        })
      });
    },
  }
}
