import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedTodos: []
  },
  mutations: {
    addTodo(state, title) {
      state.loadedTodos.push({
        title: title,
        active: true
      })
    },
    updateActiveByIndexes(state, indexes) {
      state.loadedTodos.forEach(function (todo, index) {
        if (indexes.indexOf(index) == -1) {
          state.loadedTodos[index].active = true
        } else {
          state.loadedTodos[index].active = false
        }
      })
    }
  },
  getters: {
    loadedTodosByCondition(state) {
      return (condition) => {
        if (condition && condition.toLowerCase() == 'active') {
          return state.loadedTodos.filter(todo => {
            return todo.active === true
          })
        } else if (condition && condition.toLowerCase() == 'completed') {
          return state.loadedTodos.filter(todo => {
            return todo.active === false
          })
        } else {
          return state.loadedTodos
        }
      }
    }
  },
  actions: {

  }
})
