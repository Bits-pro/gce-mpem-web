<template>
  <div>
    <b-modal ref="my-modal" hide-footer title="Accusé de réception">
        <div class="d-block">
            <b-form  @submit.prevent="update">
                <b-colxx sm="12" md="12">
                    <b-form-group label="Date limite">
                        <datepicker
                            :bootstrap-styling="true"
                            :format="customFormatter"
                            :placeholder="$t('form-components.date')"
                            v-model="temp"></datepicker>
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
import {
    mapActions
} from "vuex";
import Datepicker from "vuejs-datepicker";
import moment from 'moment'

export default {
    components: {
        "datepicker": Datepicker
    },
    data() {
        return {
            temp: '',
            gridForm: {
                id: '',
                date_reponse: '',
                statut: 'archivee'
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
            this.updateDocument(this.gridForm).then(r => {
                this.hideModal()
            })
        },
        customFormatter(date) {
            this.gridForm.date_reponse =  moment(date).format('yyyy-MM-DD')
            return moment(date).format('yyyy-MM-DD');
        }
    }
  }
</script>