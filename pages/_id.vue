<template>
  <div class="container">
    <h1>{{ region ? region.name : '' }}</h1>
    <Select :regions="regions" />
    {{ region }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      details: {}
    }
  },
  computed: {
    ...mapGetters({
      regions: 'weather/regions',
      regionGetter: 'weather/region'
    }),
    regionID () {
      return this.$route.params.id
    },
    region () {
      return this.regionGetter(this.regionID)
    }
  },
  mounted () {
    this.updateDetails()
  },
  methods: {
    ...mapActions({
      getDetail: 'weather/getDetail'
    }),
    async updateDetails () {
      await this.getDetail(this.regionID)
      this.details = this.regionGetter(this.regionID)
    }
  }
}
</script>
