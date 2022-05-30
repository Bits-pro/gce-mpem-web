<template>
  <div>
    <b-modal ref="my-modal" hide-footer title="Accusé de réception">
        <div class="d-block">
            <b-form  @submit.prevent="update">
                <b-colxx sm="12" md="12">
                    <b-form-group label="File">
                        <b-form-file
                            v-model="file"
                            :state="Boolean(file)"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </b-form-group>
                </b-colxx>

            </b-form>
        </div>
        <b-button class="mt-3" variant="outline-danger" @click="hideModal">Annuler</b-button>
        <b-button class="mt-2" variant="primary" @click="submitModal">Sauvegarder</b-button>
    </b-modal>
  </div>
</template>

<script>
import firebase from "firebase";
import {
    mapActions
} from "vuex";

export default {
    data() {
        return {
            file: null,
            uploadValue: 0,
            gridForm: {
                id: ''
            }
        };
    },
    methods: {
        ...mapActions(["updateDocument"]),
        showModal(id) {
            this.gridForm.id = id
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        submitModal() {
            if(this.file !=null && this.file !=null){
                const storageRef=firebase.storage().ref(`courriers/${this.file.name}`).put(this.file);
                storageRef.on(`state_changed`,snapshot=>{this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;}, error=>{},()=>{
                    this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.updateDocument({url_accuse : url, id: this.gridForm.id}).then(r => {
                            this.hideModal()
                        })
                    });
                });
                }
            
        }
    }
  }
</script>