<template>
  <b-card class="mb-4 dashboard-quick-post" :title="$t('categories.title')">
    <b-refresh-button @click="refreshButtonClick" />
    <b-form @submit.prevent="quickPostSubmit">
      <b-form-group horizontal label-cols="3" breakpoint="sm" :label="$t('categories.name')">
        <b-form-input v-model="form.name" :placeholder="$t('categories.name')"></b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="float-right"
      >{{ $t('dashboards.save-and-publish') }}</b-button>
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
    ...mapActions(["createCategory"]),
    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    quickPostSubmit() {
      console.log(this.form);
      this.createCategory(this.form).then(() => {
        this.$router.push("/app/categories/list");
      })
    }
  }
};
</script>
