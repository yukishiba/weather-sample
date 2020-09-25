import axios from 'axios'
import Vue from 'vue'

export const state = () => ({
  apiRoot: 'https://weather-jp.github.io/jma-weather-api/data/forecast/',
  list: [],
  error: null
})

export const getters = {
  ready (state) {
    return Boolean(state.list.length)
  },
  areas: (state) => {
    return state.list
  },
  areaIndex: (state) => {
    return state.list.length ? state.list.map(obj => obj.id) : []
  },
  area: state => (id) => {
    return state.list.filter(obj => obj.id === id)[0] || null
  }
}

export const mutations = {
  setList (state, payload) {
    state.list = payload
  },
  setDetail (state, payload) {
    const areaIndex = state.list.length ? state.list.map(obj => obj.id) : []
    const index = areaIndex.indexOf(payload.id)
    if (~index) {
      Vue.set(state.list, index, payload)
    }
  },
  setError (state, error) {
    state.error = error
  },
  removeError (state) {
    state.error = null
  }
}

export const actions = {
  async getList ({ state, getters, commit }, force = false) {
    if (force || !getters.ready) {
      try {
        commit('removeError')
        const res = await axios.get(state.apiRoot + 'index.json')
        if (res.data) {
          commit('setList', res.data)
        }
      } catch (error) {
        commit('setError', error)
      }
    }
  },
  async getDetail ({ state, getters, commit, dispatch }, id) {
    if (!getters.areaIndex.includes(id)) {
      await dispatch('getList', true)
    }
    try {
      commit('removeError')
      const res = await axios.get(state.apiRoot + id + '.json')
      if (res.data) {
        commit('setDetail', res.data)
      }
    } catch (error) {
      commit('setError', error)
    }
  }
}
