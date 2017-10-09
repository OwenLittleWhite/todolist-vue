<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 class="text-xs-center text-sm-center">
        <h3 xs12 sm10 md8 offset-sm1 offset-md2 class="blue--text">TODOs</h3>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-text-field name="input-1-3" placeholder="What needs to be done?" v-model="title" @keyup.enter="addTodo()"></v-text-field>

          <v-card class="elevation-0">
            <v-card-text>
              <v-layout row v-for="(todo,index) in todos" :key='todo.title'>
                <v-checkbox :label="todo.title" :value="todo.index" v-model="indexes"></v-checkbox>
                <v-btn flat icon color="prey">
                  <v-icon>cancel</v-icon>
                </v-btn>
              </v-layout>
            </v-card-text>
          </v-card>

        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      <v-flex xs12 sm12 class="text-xs-center">
        <p>Explore our awesome abstracts!</p>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      condition: 'all',
      title: '',
      indexes: []
    }
  },
  computed: {

    ...mapGetters({
      loadedTodosByCondition: 'loadedTodosByCondition'
    }),
    ...mapMutations({
     // updateActiveByIndexes: 'updateActiveByIndexes'
    }),
    todos() {
     
      this.$store.commit('updateActiveByIndexes', this.indexes)
      return  this.loadedTodosByCondition(this.condition)
    }
  },
  methods: {
    addTodo() {
      this.$store.commit('addTodo', this.title)
      this.title = ''
    },
    makeItDone() {

    }
  }
}

</script>
