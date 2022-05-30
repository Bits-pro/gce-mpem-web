<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('dashboard')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xl="6" lg="12">
        <icon-cards-carousel></icon-cards-carousel>
        <b-row>
          <b-colxx md="12" class="mb-4">
            <calendar></calendar>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx lg="12" xl="6" class="mb-4">
        <recent-orders></recent-orders>
      </b-colxx>
    </b-row>
    
    <b-row>
      <!-- <b-colxx sm="12" lg="4" class="mb-4">
        <profile-statuses></profile-statuses>
      </b-colxx> -->
      <!-- <b-colxx md="6" lg="4" class="mb-4">
        <gradient-card>
          <b-badge pill variant="theme-3" class="align-self-start mb-3">LEADER TECH</b-badge>
          <p class="lead text-white">{{ $t('dashboards.magic-is-in-the-details') }}</p>
          <p class="text-white">{{ $t('dashboards.yes-it-is-indeed') }}</p>
        </gradient-card>
      </b-colxx> -->
    </b-row>
    <b-row>
    </b-row>
  </div>
</template>

<script>
import GradientCard from "../../../components/Cards/GradientCard";
import Calendar from "../../../containers/dashboards/Calendar";
import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import ProfileStatuses from "../../../containers/dashboards/ProfileStatuses";
import RecentOrders from "../../../containers/dashboards/RecentOrders";

export default {
  components: {
    calendar: Calendar,
    "icon-cards-carousel": IconCardsCarousel,
    "profile-statuses": ProfileStatuses,
    "recent-orders": RecentOrders,
    "gradient-card": GradientCard
  }
};
</script>
