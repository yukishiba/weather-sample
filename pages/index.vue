<template>
  <div class="container">
    <Select :regions="regions" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      regions: 'weather/regions'
    })
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions({
      getList: 'weather/getList'
    })
  }
}
</script>
