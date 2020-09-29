<template>
  <div class="container">
    <header class="header">
      <h1>{{ region.name || '' }}の天気</h1>
      <SelectDate :value="dates" :current="dateSelect" @changeDate="changeDate" />
      <SelectArea :regions="regions" />
    </header>
    <div class="areas">
      <template v-for="area in (region.areas || [])">
        <AreaDetail :key="area.area" :value="area" :date="dateSelect" />
      </template>
    </div>
    <footer>
      <span class="source">出典：<a href="https://www.jma.go.jp/jp/yoho/" target="_blank">気象庁ホームページ</a></span>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      regions: 'weather/regions',
      regionSelect: 'weather/region',
      dateSelect: 'weather/dateSelect'
    }),
    regionID () {
      return this.$route.params.id
    },
    region () {
      return this.regionSelect(this.regionID)
    },
    dates () {
      if (this.region && this.region.areas) {
        const dates = this.region.areas[0].forecast
        return dates.map(date => date.dateJa)
      }
      return []
    }
  },
  async mounted () {
    await this.getDetail(this.regionID)
  },
  methods: {
    ...mapMutations({
      setDate: 'weather/setDate'
    }),
    ...mapActions({
      getDetail: 'weather/getDetail'
    }),
    changeDate (date) {
      this.setDate(Number(date))
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 80px;

  /deep/ nav {
    display: flex;
    align-items: center;

    .region {
      margin-left: 10px;
    }
  }
}

.areas {
  display: flex;
  padding: 10px;
  width: 100%;

  > * {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
    border: 2px solid #eee;
    margin: 10px;
    height: auto;
  }
}

footer {
  margin: 10px 0;
  text-align: center;

  .source {
    font-size: 10px;
    line-height: 1;
  }
}
</style>
