<template>
  <nav>
    <p class="title">
      地域を選択
    </p>
    <select class="region" name="region">
      <template v-for="region in regions">
        <option :key="region.id" :value="region.id" @click="selectregion(region.id)">
          {{ region.name }}
        </option>
      </template>
    </select>
  </nav>
</template>

<script>
export default {
  props: {
    regions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    regionID () {
      return this.$route.params.id
    }
  },
  watch: {
    regions () {
      this.changeSelected()
    },
    regionID () {
      this.changeSelected()
    }
  },
  mounted () {
    this.changeSelected()
  },
  methods: {
    selectregion (id) {
      this.$router.push(id)
    },
    changeSelected () {
      if (this.regionID) {
        const select = this.$el.querySelector('select')
        select.value = this.regionID
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  line-height: 20px;
}

.region {
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
}
</style>
