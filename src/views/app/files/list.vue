<template>
  <div>
    <b-card class="mb-4" :title="$t('filters')">
      <b-row>
        <b-colxx sm="12" md="12">
          <b-form-group>
            <b-form-input v-model="search" aria-describedby="input-1-live-num" @change="searchDocuments"/>
          </b-form-group>
        </b-colxx>
        <!-- <b-colxx sm="4" md="4">
          <b-form-group label="Nature">
            <b-form-select 
              @change="handleSelect"
              v-model="nature"
              :options="natureOptions" plain />
          </b-form-group>
        </b-colxx>

        <b-colxx sm="4" md="4">
          <b-form-group label="Statut">
            <b-form-select 
              @change="handleSelect"
              v-model="status" 
              :options="listStatus" plain />
          </b-form-group>
        </b-colxx> -->
      </b-row>
    </b-card>
    <b-card class="mb-4" :title="$t('menu.all_file_title')">
      <b-table hover :items="listDoc" :fields="fields">
        <template #cell(show_details)="row">
          <router-link :to="`/app/files/show/${row.item.id}`" class="icon-menu-item">
            <b-button size="sm" class="mr-2">
              {{ $t('files.visualiser') }}
            </b-button>
          </router-link>

          <template v-if="isAdmin">
            <b-button size="sm" class="mr-2" variant="outline-danger" @click="scanCourrier(row.item.id)" v-if="row.item.nature == 'depart'">
              {{ $t('files.accusception') }}
            </b-button>
            <b-button size="sm" class="mr-2" variant="outline-primary" @click="repondreCourrier(row.item.id)" v-if="row.item.nature == 'depart'">
              {{ $t('files.add_answer') }} ؟؟؟؟
            </b-button>
            <b-button v-if="row.item.statut === 'traite'" size="sm" class="mr-2" variant="success" @click="updateCourrier(row.item.id)">
              {{ $t('files.archiver') }}
            </b-button>
          </template>
        </template>
      </b-table>
      <scan-accusser-modal ref="scan-accusser-modal"></scan-accusser-modal>
      <answer-modal ref="answer-modal"></answer-modal>
    </b-card>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import Vuetable from 'vuetable-2/src/components/Vuetable'
import ScanAccusserModal from './partials/ScanAccusserModal' 
import AnswerModal from './partials/AnswerModal' 
import moment from 'moment'

export default {
  components: {
    'vuetable' : Vuetable,
    'scan-accusser-modal': ScanAccusserModal,
    'answer-modal': AnswerModal
  },
  data () {
    return {
      search: '',
      status: '',
      prio: '',
      nature: '',
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      natureOptions: ['arrive', 'depart', 'interne'],
      listStatus: ['numerise', 'envoyee', 'repondu', 'annoter', 'traitee', 'archivee'],
    }
  },
  computed: {
    ...mapGetters(['listDoc']),
    isAdmin() {
      return window.localStorage.getItem('gce_is_admin') === 'true';
    },
    fields () {
      return [
        { key: 'reference', label: this.$t('files.num_enrg'), sortable: false },
        { key: 'object', label: this.$t('files.objet'), sortable: false },
        { 
          key: 'nature',
          label: this.$t('files.nature'),
          sortable: false,
          formatter: value => {
            return this.$t(`natures.${value}`)
          }
        },
        { 
          key: 'date_courrier',
          label: this.$t('files.date_courrier'),
          sortable: false,
          formatter: value => {
            return moment(value).format('MM-DD-YYYY')
          }
        },
        { 
          key: 'statut',
          label: this.$t('files.statut'), 
          sortable: false,
          formatter: value => {
            return this.$t(`statuses.${value}`)
          }
        },
        { key: 'show_details', label: this.$t('files.show_details'), sortable: false },
      ]
    }
  },
  methods: {
    ...mapActions(["fetchDocuments", "updateDocument"]),
    fetchList() {
      this.fetchDocuments()
    },
    updateCourrier(id) {
      let payload = {
        id: id,
        statut: 'archivee'
      }
      this.updateDocument(payload)
    },
    scanCourrier(id) {
      this.$refs['scan-accusser-modal'].showModal(id)
    },
    repondreCourrier(id) {
      this.$refs['answer-modal'].showModal(id)
    },
    searchDocuments() {
      this.fetchDocuments(this.search)
    },
    handleSelect(v) {
      this.fetchDocuments(v)
    }
  },
  mounted() {
    this.fetchList();
  }
}
</script>