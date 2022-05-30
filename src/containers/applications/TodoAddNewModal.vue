<template>
  <b-modal
    id="modalright"
    ref="modalright"
    :title="$t('todo.add-new-title')"
    modal-class="modal-right"
  >
    <b-form>
      <b-form-group :label="$t('todo.title')">
        <b-input v-model="newItem.title"/>
      </b-form-group>
      <b-form-group :label="$t('todo.content')">
        <b-textarea v-model="newItem.content" :rows="2" :max-rows="2" />
      </b-form-group>
      <b-form-group :label="$t('todo.label')">
        <v-select label="title" :reduce="(option) => option.id" :options="labels" v-model="newItem.todo_label" />
      </b-form-group>
      <b-form-group :label="$t('form-components.date')">
        <!-- <datepicker
          :bootstrap-styling="true"
          format="yyyy-MM-dd"
          :placeholder="$t('form-components.date')"
          v-model="newItem.date"
        ></datepicker> -->
        <b-form-datepicker id="example-datepicker" v-model="newItem.date" class="mb-2"></b-form-datepicker>
      </b-form-group>
      <b-form-group :label="$t('todo.status')">
        <b-form-radio-group stacked class="pt-2" :options="statuses" v-model="newItem.status" />
      </b-form-group>
    </b-form>
    <template slot="modal-footer">
      <b-button variant="outline-secondary" @click="hideModal('modalright')">{{ $t('todo.cancel') }}</b-button>
      <b-button variant="primary" @click="addItem()" class="mr-1">{{ $t('todo.submit') }}</b-button>
    </template>
  </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";

const TodoAddNewModal = {
  components: {
    "v-select": vSelect,
    "datepicker": Datepicker
  },
  props: ["labels", "statuses"],
  data() {
    return {
      newItem: { title: "", content: "", todo_label: "", status: "", date: "" }
    };
  },
  methods: {
    ...mapActions(["createTodo", "getTodoItems"]),
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    addItem() {
      this.createTodo({
        title: this.newItem.title,
        content: this.newItem.content,
        todo_label: this.newItem.todo_label,
        status: this.newItem.status,
        date: this.newItem.date,
      }).then((r) => {
        this.getTodoItems()
      });
      this.newItem = {
        title: "",
        content: "",
        todo_label: "",
        status: ""
      };
      this.hideModal("modalright");
    }
  }
};
export default TodoAddNewModal;
</script>
