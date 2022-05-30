<template>
  <div class="h-100">
    <router-view />
    <!-- <b-modal ref="my-modal" hide-header hide-footer title="Licence" no-close-on-backdrop no-close-on-esc centered>
      <div class="d-block text-center">
        <h3>Votre licence est expiré !</h3>
      </div>
    </b-modal> -->
    <!-- <color-switcher /> -->
  </div>
</template>

<script>
import ColorSwitcher from "./components/Common/ColorSwitcher";
import {
    mapActions
} from "vuex";
import { getDirection } from "./utils";

export default {
  components: {
    "color-switcher": ColorSwitcher
  },
  beforeMount() {
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.dir = "rtl";
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.dir = "ltr";
      document.body.classList.remove("rtl");
    }
  },
  methods: {
    ...mapActions(["checkExpire"]),
    checkInit() {
      this.checkExpire()
      .then(r => {
        if(r) {
          this.showModal()
        }
      })
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  },
  mounted() {
    //this.checkInit()
  }
};
</script>
