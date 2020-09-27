<template>
  <nav>
    <p class="title">
      地域を選択
    </p>
    <select name="region" size="12">
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
  methods: {
    selectregion (id) {
      this.$router.push(id)
    }
  }
}
</script>
