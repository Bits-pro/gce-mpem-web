<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="$t('files.liste_pieces')">
        <div class="d-block" v-for="v in listDocument" v-bind:key="v.id">
            <ul> 
                <li>
                    <a :href="v.url" target="_blank">{{ v.reference }}</a>
                </li> 
            </ul>
            <hr/>
        </div>
        <div v-if="listDocument.length == 0">
            {{ $t('annotation.nothing') }}.
        </div>
      <b-button class="mt-3" variant="outline-danger" @click="hideModal">{{ $t('annotation.close') }}</b-button>
    </b-modal>
  </div>
</template>

<script>
import {
    mapGetters
} from "vuex";
  export default {
    computed: {
        ...mapGetters(["listDocument"])
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      }
    }
  }
</script>
<style lang="scss" scoped>
a {
    color: blue;
}
</style>