<template>
<div class="d-flex flex-row mb-3">
    <router-link :to="detailPath" class="d-block position-relative">
        <img src="/assets/img/products/doc.png" :alt="order.title" class="list-thumbnail border-0" />
        <b-badge variant="primary" pill class="position-absolute badge-top-right">{{order.statut}}</b-badge>
    </router-link>
    <div class="pl-3 pt-2 pr-2 pb-2">
        <router-link :to="detailPath">
            <p class="list-item-heading">{{ order.object }}</p>
            <div class="text-primary text-small font-weight-medium d-none d-sm-block">{{ dateCourrier }}</div>
        </router-link>
    </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['order', 'detailPath'],
    computed: {
        dateCourrier() {
            return moment(this.order.date_courrier).format("YYYY-MM-DD");
        }
    }
}
</script>
