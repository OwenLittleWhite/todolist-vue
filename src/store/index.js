import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedTodos: [],
    count:0
  },
  mutations: {
    addTodo(state, title) {
      state.loadedTodos.push({
        id:state.count,
        title: title,
        active: true
      })
      state.count++
    },
    deleteTodo(state, id) {
      let temp = []
      state.loadedTodos.forEach(function (todo) {
        if (todo.id != id) {
          temp.push(todo)
        }
      })
      state.loadedTodos = temp
    },
    updateActiveByIds(state, ids) {
      state.loadedTodos.forEach(function (todo,index) {
        if (ids.indexOf(todo.id) == -1) {
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
