<template>
  <nav>
    <template v-for="(name, index) in value">
      <button :key="index" :class="isActive(index)" @click="select(index)">
        {{ name }}
      </button>
    </template>
  </nav>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    current: {
      type: Number,
      default: 0
    }
  },
  watch: {
    current () {
      if (this.value.length <= this.current) {
        this.$emit('changeDate', 0)
      }
    }
  },
  methods: {
    select (index) {
      this.$emit('changeDate', index)
    },
    isActive (index) {
      return index === this.current ? 'is-active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
}

button {
  border: 0 none;
  background: #eee;
  padding: 10px 20px;
  font-size: 12px;
  line-height: (20 / 12);
  cursor: pointer;

  &.is-active {
    background: #2177f8;
    color: #fff;
  }

  &:first-child {
    border-radius: 5px 0 0 5px;
  }

  &:last-child {
    border-radius: 0 5px 5px 0;
  }
}
</style>
