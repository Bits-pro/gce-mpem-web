import axios from 'axios'

export default {
    state: {
        allCounts: 0,
        fileRecieved: 0,
        fileSent: 0,
        fileDone: 0,
        fileTraited: 0,
        fileInterne: 0,
    },
    getters: {
        allCounts: state => state.allCounts,
        fileRecieved: state => state.fileRecieved,
        fileInterne: state => state.fileInterne,
        fileSent: state => state.fileSent,
        fileTraited: state => state.fileTraited,
        fileDone: state => state.fileDone
    },
    mutations: {
        setCountAll (state, items) {
            state.allCounts = items
        },
        setFileRecieved (state, items) {
            state.fileRecieved = items
        },
        setFilesInterne (state, items) {
            state.fileInterne = items
        },
        setFileSent (state, items) {
            state.fileSent = items
        },
        setProgress (state, items) {
            state.fileTraited = items
        },
        setDone (state, items) {
            state.fileDone = items
        },
    },
    actions: {
        countAll({ commit }) {
            commit('setProcessing', true)
            return new Promise(function(resolve, reject) {
                axios.get(api_url + "/courrier-count/", {
                    headers: {
                        Authorization: 'Token ' + window.localStorage.getItem('admin_token')
                    }
                })
                .then(res => {
                    commit('setCountAll', res.data)
                    resolve(res.data);
                }).catch( res => {
                    resolve(res);
                })
            });
        },
        countRecieved({ commit }) {
            commit('setProcessing', true)
            return new Promise(function(resolve, reject) {
                axios.get(api_url + "/courrier-count/?nature=arrive", {
                    headers: {
                        Authorization: 'Token ' + window.localStorage.getItem('admin_token')
                    }
                })
                .then(res => {
                    commit('setFileRecieved', res.data)
                    resolve(res.data);
                }).catch( res => {
                    resolve(res);
                })
            });
        },
        countSents({ commit }) {
            commit('setProcessing', true)
            return new Promise(function(resolve, reject) {
                axios.get(api_url + "/courrier-count/?nature=depart", {
                    headers: {
                        Authorization: 'Token ' + window.localStorage.getItem('admin_token')
                    }
                })
                .then(res => {
                    commit('setFileSent', res.data)
                    resolve(res.data);
                }).catch( res => {
                    resolve(res);
                })
            });
        },
        countInterne({ commit }) {
            commit('setProcessing', true)
            return new Promise(function(resolve, reject) {
                axios.get(api_url + "/courrier-count/?nature=interne", {
                    headers: {
                        Authorization: 'Token ' + window.localStorage.getItem('admin_token')
                    }
                })
                .then(res => {
                    commit('setFilesInterne', res.data)
                    resolve(res.data);
                }).catch( res => {
                    resolve(res);
                })
            });
        },
        countProgress({ commit }) {
            commit('setProcessing', true)
            return new Promise(function(resolve, reject) {
                axios.get(api_url + "/courrier-count/?statut=numerise", {
                    headers: {
                        Authorization: 'Token ' + window.localStorage.getItem('admin_token')
                    }
                })
                .then(res => {
                    commit('setProgress', res.data)
                    resolve(res.data);
                }).catch( res => {
                    resolve(res);
                })
            });
        },
        countDone({ commit }) {
            commit('setProcessing', true)
            return new Promise(function(resolve, reject) {
                axios.get(api_url + "/courrier-count/?statut=traite", {
                    headers: {
                        Authorization: 'Token ' + window.localStorage.getItem('admin_token')
                    }
                })
                .then(res => {
                    commit('setDone', res.data)
                    resolve(res.data);
                }).catch( res => {
                    resolve(res);
                })
            });
        },
    }
}
