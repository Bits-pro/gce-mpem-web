<template>
  <div>
    
    <b-modal ref="my-modal" hide-footer :title="$t('annotation.list')">
      <div class="spinner-grow text-primary" role="status" v-if="loading">
        <span class="sr-only">Loading...</span>
      </div>
      <template v-else>
        <div v-if="listAnnotations.length == 0">
          {{ $t('annotation.none') }}.
        </div>
        <div class="d-block" v-else>
          <ul>
            <h4><strong>{{ courrierDoc.destination.username }}</strong></h4>
          </ul>
          <ul v-for="v in listAnnotations" v-bind:key="v.id">
            <div style="width:100%; text-align:center">
              <span class="iconsminds-arrow-down-2" style="font-size:26px"></span>
            </div>
            <li>
              <h4><strong>{{ v.destination.username}} </strong></h4>
              <p> {{ $t('annotation.objectif') }}: {{ v.objectif }}</p>
              <p> {{ $t('annotation.date_limite') }}: {{ v.date_limite }}</p>
              <p> {{ $t('annotation.note') }}: {{ v.note }}</p>
            </li>
          </ul>
        </div>
        <b-button class="mt-3" variant="outline-danger" @click="hideModal">{{ $t('annotation.close') }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import IconCard from "../../../../components/Cards/IconCard";
import {
    mapGetters
} from "vuex";
  export default {
    components: {
      "icon-card": IconCard
    },
    computed: {
      ...mapGetters(["listAnnotations", "courrierDoc", "usersList", "loading"])
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      userName(id) {
        const user = this.usersList.filter((user) => user.id == id);
        return user[0].username;
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    }
  }
</script>