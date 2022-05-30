<template>
  <b-card class="mb-4 dashboard-quick-post" :title="$t('templates.first')">
    <b-refresh-button @click="refreshButtonClick" />
    <b-form @submit.prevent="quickPostSubmit">
      <b-form-group horizontal label-cols="3" breakpoint="sm" :label="$t('templates.title')">
        <b-form-input v-model="form.title" :placeholder="$t('templates.title')"></b-form-input>
      </b-form-group>
      <b-form-group horizontal label-cols="3" breakpoint="sm" :label="$t('templates.content')">
        <b-textarea v-model="form.content" :rows="10" :max-rows="15" :placeholder="$t('templates.content')"></b-textarea>
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
        title: "",
        content: "",
      }
    };
  },
  methods: {
    ...mapActions(["createTemplates"]),
    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    quickPostSubmit() {
      this.createTemplates(this.form).then(() => {
        this.$router.push("/app/templates/list");
      })
    }
  }
};
</script>
