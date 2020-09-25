<template>
  <div class="container">
    <Select :areas="areas" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      areas: 'weather/areas'
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
