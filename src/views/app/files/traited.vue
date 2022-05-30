<template>
    <b-card class="mb-4" :title="$t('menu.file_traited_title')">
      <b-table hover :items="listDoc" :fields="fields">
        <template #cell(show_details)="row">
          <router-link :to="`/app/files/show/${row.item.id}`" class="icon-menu-item">
            <b-button size="sm" class="mr-2">
              {{ $t('files.visualiser') }}
            </b-button>
          </router-link>
          <template v-if="isAdmin && row.item.statut === 'traite'">
            <b-button size="sm" class="mr-2" variant="success" @click="updateCourrier(row.item.id)">
              {{ $t('files.archiver') }}
            </b-button>
          </template>
        </template>
      </b-table>
    </b-card>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import Vuetable from 'vuetable-2/src/components/Vuetable'
import moment from 'moment'

export default {
  components: {
    'vuetable' : Vuetable
  },
  data () {
    return {
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
    }
  },
  computed: {
    ...mapGetters(['listDoc']),
    isAdmin() {
      return window.localStorage.getItem('gce_is_admin');
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
        { key: 'show_details', label: this.$t('files.show_details'), sortable: false }
      ]
    }
  },
  methods: {
    ...mapActions(["fetchDocuments", "updateDocument"]),
    fetchList() {
      this.fetchDocuments("traitee")
    },
    updateCourrier(id) {
      let payload = {
        id: id,
        statut: 'archivee'
      }
      this.updateDocument(payload)
    }
  },
  mounted() {
    this.fetchList();
  }
}
</script>