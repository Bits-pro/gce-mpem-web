<template>
    <b-card class="mb-4" :title="$t('categories.list')">
      <div style="float:right">
        <router-link :to="`/app/categories/add`" class="icon-menu-item">
          <b-button
            type="submit"
            variant="primary"
            class="mt-4 btn-lg"
          >{{ $t('pages.add-new') }}</b-button>
        </router-link>
        <!-- <b-button
          type="submit"
          variant="primary"
          class="mt-4 btn-lg"
          @click="addNew"
        >{{ $t('pages.add-new') }}</b-button> -->
      </div>
      <b-table hover :items="listCategories" :fields="fields"/>
    </b-card>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import Vuetable from 'vuetable-2/src/components/Vuetable'

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
    ...mapGetters(['listCategories']),
    fields () {
      return [
        { key: 'name', label: this.$t('categories.name'), sortable: false },
      ]
    }
  },
  methods: {
    ...mapActions(["fetchCategories"]),
    fetchList() {
      this.fetchCategories()
    }
  },
  mounted() {
    this.fetchList();
  }
}
</script>