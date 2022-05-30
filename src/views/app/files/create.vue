<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('files.new_file')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <layout-grid></layout-grid>
  </div>
</template>
<script>
import LayoutGrid from "../../../containers/forms/LayoutGrid";

export default {
  components: {
    "layout-grid": LayoutGrid,
  }
};
</script>
