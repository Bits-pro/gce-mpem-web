<template>
  <b-card :title="$t('dashboards.calendar')">
    <calendar-view
      style="min-height:500px"
      :events="events"
      :locale="lang"
      :show-date="showDate"
      :time-format-options="{hour: 'numeric', minute:'2-digit'}"
      :enable-drag-drop="true"
      :show-event-times="true"
      display-period-uom="month"
      :starting-day-of-week="1"
      :current-period-label="$t('dashboards.today')"
      @drop-on-date="onDropDate"
      @click-date="onClickDay"
      @click-event="onClickEvent"
    >
      <calendar-view-header
        slot="header"
        slot-scope="t"
        :header-props="t.headerProps"
        @input="setShowDate"
      />
    </calendar-view>
  </b-card>
</template>
<script>
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMathMixin
} from "vue-simple-calendar";
import {
  mapGetters,
  mapActions
} from "vuex";
import moment from 'moment'

export default {
  components: {
    "calendar-view": CalendarView,
    "calendar-view-header": CalendarViewHeader
  },
  mixins: [CalendarMathMixin],
  data() {
    return {
      showDate: this.thisMonth(1),
      events: []
    };
  },
  computed: {
    ...mapGetters(["itemsToto"]),
    lang() {
      return localStorage.getItem('currentLanguage')
    }
  },
  methods: {
    ...mapActions(["getTodoItems"]),
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickDay(d) {
      console.log(`You clicked day: ${d.toLocaleDateString()}`);
    },
    onClickEvent(e) {
      console.log(`You clicked event: ${e.title}`);
    },
    setShowDate(d) {
      this.showDate = d;
    },
    onDropDate(event, date) {
      console.log(`You dropped ${event.id} on ${date.toLocaleDateString()}`);
      const eLength = this.dayDiff(event.startDate, date);
      event.originalEvent.startDate = this.addDays(event.startDate, eLength);
      event.originalEvent.endDate = this.addDays(event.endDate, eLength);
    },
    fetchData() {
      const _this = this
      this.getTodoItems().then((r) => {
        _this.itemsToto.map(function(value, key) {
          _this.events.push({
            id: "e" + value.id,
            startDate: moment(value.date).format('LLLL'),
            endDate: moment(value.date).format('LLLL'),
            title: value.title,
            classes: "secondary"
          })
        })
      })
    }
  },
  created() {
    this.fetchData()
  }
};
</script>
