<template>
  <b-row>
    <!-- <div class="text-center" v-if="!isAdmin"> {{ $t('files.no_admin_access') }}. </div>
    <div v-else> -->
    <b-overlay :show="isLoading" rounded="sm">
      <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-form @submit.prevent="submitForm">
            <b-row>
              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.num_enrg')">
                  <b-form-input v-model="form.reference" aria-describedby="input-1-live-num" disabled/>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.num_enrgistrement')">
                  <b-form-input v-model="form.num_enregistrement" aria-describedby="input-1-live-num"/>
                </b-form-group>
              </b-colxx>
            
              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.nature')">
                  <b-form-select 
                    id="example-input-1"
                    name="example-input-1"
                    v-model="form.nature"
                    :options="natureOptions" 
                    plain 
                    v-validate="{ required: true,}"
                    :state="validateState('example-input-1')"
                    aria-describedby="input-1-live-feedback"/>
                  <b-form-invalid-feedback id="input-1-live-feedback">{{ veeErrors.first('example-input-1') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.category')">
                  <b-form-select 
                    v-model="form.categorie" 
                    value-field="id"
                    text-field="name" 
                    :options="listCategories" plain />
                </b-form-group>
              </b-colxx>
              
              <b-colxx sm="12" md="12">
                <b-form-group :label="$t('files.objet')" id="example-input-group-2" label-for="example-input-2">
                  <b-form-textarea
                    v-model="form.object"
                    :placeholder="$t('files.enter_object')"
                    rows="1"
                    max-rows="3"
                    v-validate="{ required: true,}"
                    aria-describedby="input-2-live-feedback"
                    :data-vv-as="$t('files.objet')"
                  ></b-form-textarea>
                  <b-form-invalid-feedback id="input-2-live-feedback">Object is required</b-form-invalid-feedback>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.prio')">
                  <b-form-select 
                    v-model="form.priorite"
                    :options="prioOptions" plain />
                </b-form-group>
              </b-colxx>

              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.confidentiality')">
                  <b-form-radio-group
                    id="radio-group-1"
                    v-model="form.confidentialite"
                    :options="optionsConf"
                    name="radio-options"
                  ></b-form-radio-group>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.date_courrier')">
                  <datepicker
                    :bootstrap-styling="true"
                    :format="customFormatter"
                    :placeholder="$t('form-components.date')"
                    v-model="date_courrier"
                  ></datepicker>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="4" md="4">
                <b-form-group :label="$t('files.date_limite')">
                  <datepicker
                    :bootstrap-styling="true"
                    :format="customFormatter2"
                    :placeholder="$t('form-components.date')"
                    v-model="date_limite"
                  ></datepicker>
                </b-form-group>
              </b-colxx>
              <!-- Entity interne-->
              <template v-if="form.nature === 'arrive'">
                <b-colxx sm="4" md="4">
                  <b-form-group :label="$t('files.entity_interne_destinateur')">
                    <b-form-select 
                      v-model="destinataire_interne_entity" 
                      value-field="name"
                      text-field="name" 
                      @change="filterUserByEntity"
                      :options="listEntities" plain />
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="4" md="4">
                  <b-form-group :label="$t('files.destinateur')">
                    <b-form-select 
                      v-model="form.destinataire" 
                      value-field="id"
                      text-field="username" 
                      :options="usersList" plain />
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="4" md="4">
                  <b-form-group label="Expéditeur">
                    <b-form-input 
                      v-model="form.expeditaire_externe" />
                  </b-form-group>
                </b-colxx>
              </template>
              <!-- Entity interne-->
              <template v-else-if="form.nature === 'depart'">
                <b-colxx sm="4" md="4">
                  <b-form-group label="Expéditeur">
                    <b-form-select 
                      v-model="form.expeditaire_interne" 
                      value-field="id"
                      text-field="name" 
                      :options="listEntities" plain />
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="4" md="4">
                  <b-form-group :label="$t('files.destinateur')">
                    <b-form-input 
                      v-model="form.destinatuer_externe" />
                  </b-form-group>
                </b-colxx>
              </template>
              <template v-else>
                <b-colxx sm="4" md="4">
                  <b-form-group :label="$t('files.entity_interne_destinateur')">
                    <b-form-select 
                      v-model="destinataire_interne_entity" 
                      value-field="name"
                      text-field="name" 
                      @change="filterUserByEntity"
                      :options="listEntities" plain />
                  </b-form-group>
                </b-colxx>
                <b-colxx sm="4" md="4">
                  <b-form-group :label="$t('files.entity_interne_destinateur')">
                    <b-form-select 
                      v-model="expediteur_interne_entity" 
                      value-field="name"
                      text-field="name" 
                      @change="filterUserByEntity"
                      :options="listEntities" plain />
                  </b-form-group>
                </b-colxx>
              </template>
              <b-colxx sm="12">
                <b-form-group :label="$t('files.note')">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.note"
                    :placeholder="$t('files.enter_note')"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="12" md="12">
                <b-form-group :label="$t('files.ampiliations')">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.ampiliations"
                    :placeholder="$t('files.enter_ampiliation')"
                    rows="1"
                    max-rows="3"
                  ></b-form-textarea>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="12" md="12">
                <b-form-group :label="$t('files.mots_cle')">
                  <b-form-input v-model="form.mots_cles" />
                </b-form-group>
              </b-colxx>

              <b-colxx sm="12" md="12">
                <b-form-group :label="$t('files.file')">
                  <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    :browse-text="$t('browse')"
                    :placeholder="$t('files.choose')"
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                </b-form-group>
              </b-colxx>
              
              <hr class="my-4">

              <b-colxx sm="12" md="12">
                <b-form-group :label="$t('files.pieces')">
                  <b-form-file
                    v-model="pieces"
                    :state="Boolean(pieces)"
                    multiple
                    :browse-text="$t('browse')"
                    :placeholder="$t('files.choose')"
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                </b-form-group>
              </b-colxx>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-4">{{ $t('files.creer') }}</b-button>
          </b-form>
        </b-card>
      </b-colxx>
    <!-- </div> -->
    </b-overlay>
  </b-row>
</template>
<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import firebase from "firebase";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import {
    validationMixin
} from "vuelidate";
const {
    required
} = require("vuelidate/lib/validators");

export default {
  components: {
    "datepicker": Datepicker
  },
  data() {
    return {
      natureOptions: [
        { value: 'arrive', text: this.$t(`natures.arrive`)},
        { value: 'depart', text: this.$t(`natures.depart`)},
        { value: 'interne', text: this.$t(`natures.interne`)}
      ],
      prioOptions: [
        { value: 'elevee', text: this.$t(`prioOpts.elevee`)},
        { value: 'moyenne', text: this.$t(`prioOpts.moyenne`)}
      ],
      optionsConf: [
        { text: this.$t('oui'), value: true },
        { text: this.$t('no'), value: false }
      ],
      isLoading: false,
      file: null,
      date_courrier: null,
      date_limite: null,
      form: {
        /****** New ones */
        categorie: null,
        nature: 'arrive',
        reference: '',
        num_enregistrement: '',
        object: '',
        priorite: 'moyenne',
        confidentialite: false,
        date_courrier: null,
        date_limite: null,
        note: '',
        url: '',
        mots_cles: '',
        ampiliations: '',
        status: 'numeriser'
      },
      progressUpload: 0,
      destinataire_interne_entity: '',
      pieces: null,
      filesAccumulated: [],
    };
  },
  computed: {
    ...mapGetters(['listEntities', 'listCategories', 'usersList']),
    isAdmin() {
      return window.localStorage.getItem('gce_is_admin') === 'true';
    }
  },
  watch: {
    pieces(val) {
      this.filesAccumulated.push(val[0])
    }
  },
  mixins: [validationMixin],
  validations: {
    object: {
      required
    }
  },
  methods: {
    ...mapActions(["fetchEntities", "fetchCategories", "createDocument", "fetchUsers", "createPiece", "fetchRef"]),
    onformSubmit() {
      if(this.file !=null && this.file.name !=null){
        const storageRef=firebase.storage().ref(`courriers/${this.file.name}`).put(this.file);
        storageRef.on(`state_changed`,snapshot=>{this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;}, error=>{},()=>{
          this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.form.url = url;
            this.submitForm();
          });
        });
      }/* else {
        this.submitForm();
      } */
    },
    resetForm() {
      this.form = {
        /****** New ones */
        categorie: null,
        nature: 'arrive',
        reference: '',
        num_enregistrement: '',
        object: '',
        priorite: 'moyenne',
        confidentialite: false,
        date_courrier: null,
        date_limite: null,
        note: '',
        url: '',
        mots_cles: '',
        ampiliations: '',
        status: 'numeriser'
      }
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    submitForm() {
      this.isLoading = true
      let formData = new FormData();
      formData.append('url', this.file);
      formData.append('categorie', this.form.categorie);
      formData.append('nature', this.form.nature);
      formData.append('reference', this.form.reference);
      formData.append('num_enregistrement', this.form.num_enregistrement);
      formData.append('object', this.form.object);
      formData.append('confidentialite', this.form.confidentialite);
      formData.append('date_courrier', this.form.date_courrier);
      //this.form.date_limite ?? formData.append('date_limite', this.form.date_limite);
      formData.append('note', this.form.note);
      formData.append('url', this.form.url);
      formData.append('mots_cles', this.form.mots_cles);
      formData.append('ampiliations', this.form.ampiliations);
      formData.append('status', this.form.status);
      formData.append('destinataire', this.form.destinataire);

      this.createDocument(formData).then(r => {
        this.createPieces(r)
        this.$bvToast.toast('Courrier creé avec succès', {
          title: `Succès`,
          variant: 'success',
          solid: true
        })
        this.isLoading = false
      }).catch((err) => {
        this.$bvToast.toast('Vérifier les information saisie', {
          title: `Erreur`,
          variant: 'danger',
          solid: true
        })
        this.isLoading = false
      })
    },
    createPieces(courrier) {
      const _this = this
      if(this.filesAccumulated.length == 0) {
        this.resetForm()
        return;
      }
      this.filesAccumulated.forEach((value, index) => {
        if(value !=null && value.name !=null){
          let formData = new FormData();
          formData.append('courrier', courrier.id);
          formData.append('reference', courrier.object);
          formData.append('type', courrier.nature);
          formData.append('url', value);
          this.createPiece(formData);
            
          if(this.filesAccumulated.length - 1 == index) {
            this.isLoading = true
            this.resetForm()
            this.generateAccuess(courrier)
          }
        }
      });  
    },
    filterUserByEntity() {
      this.fetchUsers(this.destinataire_interne_entity)
    },
    customFormatter(date) {
      this.form.date_courrier = moment(date).format('YYYY-MM-DDThh:mm')
      this.date_courrier = moment(date).format('MM-DD-YYYY')
      return moment(date).format('MM-DD-YYYY');
    },
    customFormatter2(date) {
      this.form.date_limite = moment(date).format('YYYY-MM-DDThh:mm')
      this.date_limite = moment(date).format('MM-DD-YYYY')
      return moment(date).format('MM-DD-YYYY');
    }
  },
  mounted () {
    this.fetchEntities()
    this.fetchCategories()
    this.fetchRef().then(r => {
      this.form.reference = r;
    })
  }
};
</script>
