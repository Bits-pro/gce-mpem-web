<template>
  <application-menu>
    <vue-perfect-scrollbar :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <div class="p-4">
        <p class="text-muted text-small mb-3">{{$t('todo.status')}}</p>
        <ul class="list-unstyled mb-4">
          <li class="nav-item">
            <a href="#">
              <i class="simple-icon-reload" />
              <span class="d-inline-block">{{$t('todo.all-tasks')}}</span>
              <span class="float-right">{{items.length}}</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <i class="simple-icon-refresh" />
              <span class="d-inline-block">{{$t('todo.pending-tasks')}}</span>
              <span class="float-right">{{items.filter(x => x.statut === "in_progress").length}}</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <i class="simple-icon-check" />
              <span class="d-inline-block">{{$t('todo.completed-tasks')}}</span>
              <span class="float-right">{{items.filter(x => x.statut === "done").length}}</span>
            </a>
          </li>
        </ul>
        <!-- <p class="text-muted text-small mb-1">{{$t('todo.categories')}}</p>
        <ul class="list-unstyled mb-4">
          <b-form-radio-group
            stacked
            class="pt-2"
            :options="categories.map((c)=> {return {text:c.label,value:c.value}})"
          />
        </ul> -->
        <p class="text-muted text-small mb-3">{{$t('todo.labels')}}</p>
        <div>
          <p class="d-sm-inline-block mb-1" v-for="(l,index) in labels" :key="index">
            <a href="#">
              <b-badge pill :variant="`outline-primary`" class="mb-1 mr-1">{{l.title}}</b-badge>
            </a>
          </p>
          <div>
            <b-button @click="showModal">{{ $t("todo.create_label") }}</b-button>
          </div>
        </div>
      </div>
    </vue-perfect-scrollbar>
    <add-label-modal ref="label-modal"></add-label-modal>
  </application-menu>
</template>
<script>
import ApplicationMenu from "../../components/Common/ApplicationMenu";
import AddLabelModal from "../../components/TodoApp/AddLabelModal";

const TodoApplicationMenu = {
  props: ["labels", "items"],
  components: {
    "application-menu": ApplicationMenu,
    "add-label-modal": AddLabelModal
  },
  methods: {
    showModal() {
      this.$refs['label-modal'].showModal()
    }
  },
  mounted() {
    document.body.classList.add("right-menu");
  },
  beforeDestroy() {
    document.body.classList.remove("right-menu");
  }
};
export default TodoApplicationMenu;
</script>
