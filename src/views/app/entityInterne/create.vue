<template>
  <b-card class="mb-4 dashboard-quick-post" :title="$t('entity-interne.title')">
    <b-refresh-button @click="refreshButtonClick" />
    <b-form @submit.prevent="quickPostSubmit">
      <b-form-group horizontal label-cols="3" breakpoint="sm" :label="$t('entity-interne.name')">
        <b-form-input v-model="form.name" :placeholder="$t('entity-interne.name')"></b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="float-right"
      >{{ $t('entity-interne.save') }}</b-button>
    </b-form>
  </b-card>
</template>
<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
//import { getDirection } from "../../../utils";
export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      form: {
        name: ""
      }
    };
  },
  methods: {
    ...mapActions(["createEntity"]),
    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    quickPostSubmit() {
      console.log(this.form);
      this.createEntity(this.form).then(() => {
        this.$router.push("/app/entity-interne/list");
      })
    }
  }
};
</script>
