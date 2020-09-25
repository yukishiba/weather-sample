<template>
  <div class="container">
    <h1>{{ area ? area.name : '' }}</h1>
    <Select :areas="areas" />
    {{ area }}
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
      areas: 'weather/areas',
      areaGetter: 'weather/area'
    }),
    areaID () {
      return this.$route.params.id
    },
    area () {
      return this.areaGetter(this.areaID)
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
      await this.getDetail(this.areaID)
      this.details = this.areaGetter(this.areaID)
    }
  }
}
</script>
