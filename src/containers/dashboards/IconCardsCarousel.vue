<template>
  <div class="icon-cards-row">
    <glide-component :settings="glideIconsOption">
      <router-link to="/app/files/list">
        <icon-card :title="$t('dashboards.all_files')" icon="iconsminds-data-center" :value="allCounts" />
      </router-link>
      <router-link to="/app/files/recieved">
        <icon-card
          :title="$t('dashboards.filed_recieved')"
          icon="iconsminds-basket-coins"
          :value="fileRecieved"
        />
      </router-link>
      <router-link to="/app/files/sent">
        <icon-card
          :title="$t('dashboards.file_sent')"
          icon="iconsminds-arrow-refresh"
          :value="fileSent"
        />
      </router-link>
    </glide-component>
    <b-row style="padding: 0 15px;">
      <b-colxx sm="6" md="4">
        <router-link to="/app/files/traited">
          <icon-card :title="$t('dashboards.file_interne')" icon="iconsminds-mail-read" :value="fileInterne" />
        </router-link>
      </b-colxx>
      <b-colxx sm="6" md="4">
        <router-link to="/app/files/traited">
          <icon-card :title="$t('dashboards.en_cours')" icon="iconsminds-mail-read" :value="fileTraited" />
        </router-link>
      </b-colxx>
      <b-colxx sm="6" md="4">
        <router-link to="/app/files/archived">
          <icon-card :title="$t('dashboards.traited')" icon="iconsminds-double-circle" :value="fileDone" />
        </router-link>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import GlideComponent from "../../components/Carousel/GlideComponent";
import IconCard from "../../components/Cards/IconCard";
import {
  mapGetters,
  mapActions
} from "vuex";

export default {
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard
  },
  computed: {
    ...mapGetters(["allCounts", "fileInterne", "fileRecieved", "fileSent", "fileTraited", "fileDone"])
  },
  data() {
    return {
      glideIconsOption2: {
        gap: 2,
        perView: 2,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1
          },
          576: {
            perView: 2
          },
          1600: {
            perView: 3
          },
          1800: {
            perView: 4
          }
        },
        hideNav: true
      },
      glideIconsOption: {
        gap: 5,
        perView: 4,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1
          },
          576: {
            perView: 2
          },
          1600: {
            perView: 3
          },
          1800: {
            perView: 4
          }
        },
        hideNav: true
      }
    };
  },
  methods: {
    ...mapActions(["countAll", "countRecieved", "countInterne", "countSents", "countProgress", "countDone"]),
  },
  created() {
    this.countAll();
    this.countRecieved();
    this.countSents();
    this.countProgress();
    this.countDone();
    this.countInterne();
  }
};
</script>
