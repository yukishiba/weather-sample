<template>
  <div class="area" :class="statusClass(forecast.weatherCode)">
    <h2 class="name">
      {{ name }}
    </h2>
    <h3 class="date">
      {{ forecast.dateJa }}
    </h3>
    <i :class="iconClass(forecast.weatherCode)" />
    <span class="weather">{{ forecast.weather }}</span>
    <div v-if="forecast.info.length" class="info">
      <template v-for="(info, i) in forecast.info">
        <p :key="i" v-text="info" />
      </template>
    </div>
    <div v-if="forecast.rain.length" class="rain">
      <h4 class="title">
        降水確率
      </h4>
      <div class="list">
        <div v-for="time in forecast.rain" :key="time.time">
          <span class="time">{{ time.timeZone }}<span class="unit">時</span></span>
          <span class="rainy">{{ supportEmpty(time.rainyPercent) }}<span class="unit">%</span></span>
        </div>
      </div>
    </div>
    <div v-if="forecast.temp.length" class="temp">
      <div v-for="temp in forecast.temp" :key="temp.city">
        <span class="city">{{ temp.city }}</span>
        <span class="max">{{ supportEmpty(temp.max) }}<span class="unit">℃</span></span>
        <span class="min">{{ supportEmpty(temp.min) }}<span class="unit">℃</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    date: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      iconClass: 'weatherIcon/iconClass',
      statusClass: 'weatherIcon/statusClass'
    }),
    name () {
      return this.value.area || ''
    },
    forecast () {
      return this.value.forecast[this.date] || {}
    }
  },
  methods: {
    supportEmpty (string) {
      return String(string) || '--'
    }
  }
}
</script>

<style lang="scss" scoped>
$weather-color: (
  sunny: #ff9400,
  cloud: #333,
  rain: #0833ff,
  snow: #333,
  night: #ffc400
);

.area {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border: 1px solid #fff;
  min-height: 400px;
  padding: 40px 20px;
  text-align: center;
  letter-spacing: 0.02em;

  .name {
    margin: 0;
    font-size: 24px;
    line-height: (40 / 32);
  }

  .date {
    margin: 10px 0 0;
    font-size: 16px;
    line-height: (20 / 16);
  }

  .wi {
    display: block;
    padding: 25px 0;
    font-size: 60px;
    border-radius: 50%;
  }

  .weather {
    font-size: 18px;
    line-height: (20 / 18);
    font-weight: bold;
  }

  .info {
    margin: 10px 0 0;

    p {
      margin: 5px 0 0;
      font-size: 14px;
      line-height: (20 / 14);
    }
  }

  .rain {
    margin-top: 20px;

    .title {
      margin: 0;
      display: block;
      font-size: 14px;
      line-height: (20 / 14);
      font-weight: bold;
    }

    .list {
      display: flex;
      margin-top: 10px;

      > * {
        margin: 0 5px;
      }
    }

    .time {
      display: block;
      text-align: center;
      font-size: 12px;
      line-height: (20 / 12);
    }

    .rainy {
      display: block;
      text-align: center;
      font-size: 22px;
      line-height: (30 / 22);
      font-weight: bold;

      .unit {
        font-size: 12px;
        line-height: (30 / 12);
        font-weight: normal;
      }
    }
  }

  .temp {
    margin-top: 10px;

    .city {
      margin-top: 10px;
      display: block;
      font-size: 14px;
      line-height: (20 / 14);
      font-weight: bold;
    }

    .min,
    .max {
      display: inline-block;
      font-size: 22px;
      line-height: (30 / 22);
      font-weight: bold;

      .unit {
        font-size: 12px;
        line-height: (30 / 12);
        font-weight: normal;
      }
    }

    .min {
      color: #0833ff;

      &::before {
        content: '/ ';
        color: #333;
        font-weight: normal;
      }
    }

    .max {
      color: #ff3308;
    }
  }

  @each $key, $color in $weather-color {
    &.#{$key} {
      background: linear-gradient(to bottom, rgba($color, 0.05) 20%, rgba($color, 0.2) 80%);
      border-color: mix($color, #fff, 20%);
      .wi { color: #{$color}; }
    }
  }
}
</style>
