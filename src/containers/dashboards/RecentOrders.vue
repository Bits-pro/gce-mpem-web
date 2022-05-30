<template>
  <b-card :title="$t('dashboards.recent-orders')">
    <b-refresh-button @click="refreshButtonClick" />
    <vue-perfect-scrollbar
      class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <recent-order-item
        v-for="(order,index) in recents"
        :order="order"
        :detail-path="`/app/files/show/${order.id}`"
        :key="index"
      />
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import RecentOrderItem from "../../components/Listing/RecentOrderItem";
import products from "../../data/products";
import {
  mapGetters,
  mapActions
} from "vuex";

export default {
  components: {
    "recent-order-item": RecentOrderItem
  },
  computed: {
    ...mapGetters(["recents"])
  },
  data() {
    return {
      products
    };
  },
  methods: {
    ...mapActions(["fetchRecentCourrier"]),
    refreshButtonClick() {
      console.log("refreshButtonClick");
    }
  },
  created() {
    this.fetchRecentCourrier()
  }
};
</script>
