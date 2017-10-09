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
          <v-text-field box  placeholder="What needs to be done?" v-model="title" @keyup.enter="addTodo()"></v-text-field>

          <v-card class="elevation-0">
            <v-card-text>
              <v-layout row v-for="(todo,index) in todos" :key='todo.title'>
                <v-checkbox :label="todo.title" :value="index" v-model="indexes" :class="getClass(todo.active)"></v-checkbox>
                <v-btn flat icon color="prey">
                  <v-icon>cancel</v-icon>
                </v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-layout row md10 center >
            <a href='#/All'><v-btn @click="condition=`all`" flat :class="getBtnClass('all')">All</v-btn></a>
            <a  href='#/active'><v-btn flat @click="condition=`active`" :class="getBtnClass('active')">Active</v-btn></a>
            <a  href='#/completed'><v-btn @click="condition=`completed`" flat  :class="getBtnClass('completed')">Completed</v-btn></a>
          </v-layout>
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
      console.log(this.condition,1111)
      return  this.loadedTodosByCondition(this.condition)
    }
   
  },
  methods: {
    addTodo() {
      if(this.title==''){
        return
      }
      this.$store.commit('addTodo', this.title)
      this.title = ''
    },
    getClass(isActive){
      if(!isActive){
        return "done"
      }
    },
     getBtnClass(btn) {
      if(btn==this.condition){
        return "selected"
      }
    }
  }
}

</script>
<style>

.textInput {
  border: solid 1px 
}
.done {
  color:green
}
a {
  text-decoration: none
}
.selected {
  color:red
}
</style>

