import * as types from '../mutation-types'

const state = {
  trip: {},
  items: [],
}

const getters = {
  trip: state => state.trip,
  items: state => state.items,
}

const actions = {
  addTrip ({ commit, state }, trip) {
    commit(types.ADD_TRIP, trip)
  },
  getItems ({ commit, state }, items) {
    commit(types.GET_ITEMS, items)
  },
}

const mutations = {
  [types.ADD_TRIP] (state, trip) {
    state.trip = {
      ...state.trip,
      ...{ ...trip }
    }
  },
  [types.GET_ITEMS] (state, items) {
    state.items = Object.values(items).map((i, k) => ({
      id: Object.keys(items)[k],
      ...i
    }))
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
