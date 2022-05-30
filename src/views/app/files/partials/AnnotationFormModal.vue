<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="$t('annotation.annoter')" no-close-on-backdrop>
        <div class="d-block">
            <b-form  @submit.prevent="update">
                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('annotation.select_entity')">
                        <b-form-select 
                        v-model="destinataire_interne_entity"
                        :options="listEntities" 
                        value-field="name"
                        text-field="name" 
                        @change="filterUserByEntity"
                        plain />
                    </b-form-group>
                </b-colxx>

                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('annotation.select_employ')">
                        <b-form-select 
                        v-model="gridForm.destination"
                        :options="usersList" 
                        value-field="id"
                        text-field="username"
                        plain />
                    </b-form-group>
                </b-colxx>

                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('annotation.objectif')">
                        <b-form-textarea
                            id="textarea"
                            v-model="gridForm.objectif"
                            placeholder="Entrer l'objectif d'annotation..."
                            rows="1"
                            max-rows="3"></b-form-textarea>
                    </b-form-group>
                </b-colxx>

                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('annotation.imergency')">
                        <b-form-select 
                            v-model="gridForm.degre_urgence"
                            :options="prioOptions" plain />
                    </b-form-group>
                </b-colxx>

                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('annotation.date_limite')">
                        <datepicker
                            :bootstrap-styling="true"
                            :format="customFormatter"
                            :placeholder="$t('form-components.date')"
                            v-model="temp"></datepicker>
                    </b-form-group>
                </b-colxx>

                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('annotation.note')">
                        <b-form-textarea
                            id="textarea"
                            v-model="gridForm.note"
                            placeholder="Enter note..."
                            rows="3"
                            max-rows="6"
                            ></b-form-textarea>
                    </b-form-group>
                </b-colxx>
                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('files.pieces')">
                        <b-form-file
                            v-model="pieces"
                            :state="Boolean(pieces)"
                            :browse-text="$t('browse')"
                            :placeholder="$t('files.choose')"
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </b-form-group>
                </b-colxx>
            </b-form>
        </div>
        <b-button class="mt-2" variant="primary" block @click="submitModal">{{ $t('annotation.action') }}</b-button>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">{{ $t('annotation.close') }}</b-button>
    </b-modal>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import Datepicker from "vuejs-datepicker";
import moment from 'moment'

export default {
    components: {
        "datepicker": Datepicker
    },
    computed: {
        ...mapGetters(["usersList", "listEntities"])
    },
    data() {
        return {
            gridForm: {
                courrier: '', 
                entite_interne: '', 
                objectif: '', 
                degre_urgence: 'moyenne', 
                date_limite: '', 
                note: '',
                destination_id: ''
            },
            destinataire_interne_entity: '',
            temp: '',
            pieces: null,
            prioOptions: ['elevee', 'moyenne', 'basse'],
        };
    },
    methods: {
        ...mapActions(["annoterCourrier", "fetchUsers", "createPiece"]),
        showModal(id) {
            this.gridForm.courrier = id
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        submitModal() {
            this.annoterCourrier(this.gridForm).then(r => {
                this.hideModal()
                this.$bvToast.toast('Le destinateur est annoter avec succès', {
                    title: `Succès`,
                    variant: 'success',
                    solid: true
                })
            })

            if(this.pieces != null) {
                let formData = new FormData();
                formData.append('courrier', this.gridForm.courrier);
                formData.append('reference', 'reference');
                formData.append('type', 'nature');
                formData.append('url', this.pieces);
                this.createPiece(formData);
            }
        },
        customFormatter(date) {
            this.gridForm.date_limite =  moment(date).format('yyyy-MM-DD')
            return moment(date).format('yyyy-MM-DD');
        },
        filterUserByEntity() {
            this.fetchUsers(this.destinataire_interne_entity)
        }
    }
  }
</script>