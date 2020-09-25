<template>
  <nav>
    <p class="title">
      地域を選択
    </p>
    <select name="area" size="12">
      <template v-for="area in areas">
        <option :key="area.id" :value="area.id" @click="selectArea(area.id)">
          {{ area.name }}
        </option>
      </template>
    </select>
  </nav>
</template>

<script>
export default {
  props: {
    areas: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    selectArea (id) {
      this.$router.push(id)
    }
  }
}
</script>
