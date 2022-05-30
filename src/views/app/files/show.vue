<template>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-form  @submit.prevent="update">
          <b-row>
            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.num_enrg')">
                <b-form-input v-model="courrierDoc.reference" :disabled="disbleValue"/>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.num_enrgistrement')">
                <b-form-input v-model="courrierDoc.num_enregistrement" :disabled="disbleValue"/>
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.nature')">
                <b-form-select 
                  :disabled="disbleValue"
                  v-model="courrierDoc.nature"
                  :options="natureOptions" plain />
              </b-form-group>
            </b-colxx>
            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.category')">
                <b-form-select 
                  :disabled="disbleValue"
                  v-model="courrierDoc.categorie" 
                  value-field="id"
                  text-field="name" 
                  :options="listCategories" plain />
              </b-form-group>
            </b-colxx>
            
            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.objet')">
                <b-form-input v-model="courrierDoc.object" :disabled="disbleValue"/>
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.prio')">
                <b-form-select 
                  :disabled="disbleValue"
                  v-model="courrierDoc.priorite"
                  :options="prioOptions" plain />
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.confidentiality')">
                <b-form-radio-group
                  :disabled="disbleValue"
                  id="radio-group-1"
                  v-model="courrierDoc.confidentialite"
                  :options="optionsConf"
                  name="radio-options"
                ></b-form-radio-group>
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.date_courrier')">
                <datepicker
                  :disabled="disbleValue"
                  :bootstrap-styling="true"
                  format="yyyy-MM-dd"
                  :placeholder="$t('form-components.date')"
                  v-model="courrierDoc.date_courrier"
                ></datepicker>
                <!-- <b-form-datepicker id="date-courrier-datepicker" :bootstrap-styling="true" v-model="courrierDoc.date_courrier" class="mb-2" locale="en-US"></b-form-datepicker> -->
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.date_limite')">
                <datepicker
                  :disabled="disbleValue"
                  :bootstrap-styling="true"
                  format="yyyy-MM-dd"
                  :placeholder="$t('form-components.date')"
                  v-model="courrierDoc.date_limite"
                ></datepicker>
                <!-- <b-form-datepicker id="date-limit-datepicker" v-model="courrierDoc.date_limite" :date-format-options="{ year: 'numeric', month: 'numeric', day: '2-digit'}" class="mb-2"></b-form-datepicker> -->
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.mots_cle')">
                <b-form-input v-model="courrierDoc.mots_cles" :disabled="disbleValue"/>
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12">
              <b-form-group :label="$t('files.ampiliations')">
                <b-form-input v-model="courrierDoc.ampiliations" :disabled="disbleValue"/>
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12" v-if="courrierDoc.destinataire">
              <b-form-group :label="$t('files.destinateur')">
                <b-form-select 
                  v-model="courrierDoc.destinataire.id" 
                  :disabled="disbleValue"
                  value-field="id"
                  text-field="username" 
                  :options="usersList" plain />
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12" md="12" v-if="courrierDoc.expeditaire != null">
              <b-form-group :label="$t('files.expediteur')">
                <b-form-input v-model="courrierDoc.expeditaire.username" :disabled="disbleValue"/>
              </b-form-group>
            </b-colxx>

            <b-colxx sm="12">
              <b-form-group :label="$t('files.note')">
                <b-form-textarea
                  id="textarea"
                  v-model="courrierDoc.note"
                  :disabled="disbleValue"
                  placeholder="Enter note..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-colxx>
          </b-row>
          <annotation-form-modal ref="annotation-form-modal"></annotation-form-modal>
          <b-button type="submit" class="mt-4">{{ $t('files.traiter') }}</b-button>
          <b-button @click="annoterCourrier" variant="primary" class="mt-4" v-if="courrierDoc.nature != 'depart'">{{ $t('files.annoter') }}</b-button>
          <b-button @click="incompletCourrier" variant="primary" class="mt-4" v-if="courrierDoc.nature != 'depart'">Dossier incompler</b-button>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import Datepicker from "vuejs-datepicker";
import AnnotationFormModal from './partials/AnnotationFormModal'

export default {
    components: {
        "datepicker": Datepicker,
        "annotation-form-modal": AnnotationFormModal
    },
    data() {
      return {
        natureOptions: ['arrive', 'depart', 'interne'],
        prioOptions: ['elevee', 'moyenne', 'basse'],
        optionsConf: [
          { text: 'Oui', value: true },
          { text: 'No', value: false }
        ],
        disbleValue: true
      };
    },
    computed: {
      ...mapGetters(['listEntities', 'listCategories', "courrierDoc", 'usersList']),
      isAdmin() {
        return window.localStorage.getItem('gce_is_admin') === 'true';
      }
    },
    methods: {
      ...mapActions(["fetchEntities", "fetchCategories", "createDocument", "updateDocument", "fetchUsers"]),
      update() {
        let payload = {
          id: this.courrierDoc.id,
          statut: 'traitee',
        }
        this.updateDocument(payload).then(r => {
          this.$bvToast.toast('Le courrier est archiver avec succès', {
            title: `Succès`,
            variant: 'success',
            solid: true
          })
        }) 
      },
      annoterCourrier() {
        this.$refs['annotation-form-modal'].showModal(this.courrierDoc.id)
      },
      incompletCourrier() {
        let payload = {
          id: this.courrierDoc.id,
          statut: 'incomplet',
        }
        this.updateDocument(payload).then(r => {
          this.$bvToast.toast('Le courrier est fermer avec succès', {
            title: `Succès`,
            variant: 'success',
            solid: true
          })
        }) 
      }
    },
    mounted () {
      this.fetchEntities()
      this.fetchCategories()
      this.fetchUsers()
    }
};
</script>
