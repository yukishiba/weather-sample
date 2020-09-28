<template>
  <div class="container index">
    <SelectArea :regions="regions" />
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

<style lang="scss" scoped>
.index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  /deep/ nav {
    .region {
      margin-top: 20px;
    }
  }
}
</style>
