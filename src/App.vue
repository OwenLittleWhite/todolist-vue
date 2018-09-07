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
          <v-layout row>
            <v-icon center>add_box</v-icon>

            <v-text-field box placeholder="What needs to be done?" v-model="title" @keyup.enter="addTodo()"></v-text-field>
          </v-layout>

          <v-card class="elevation-0">
            <v-card-text>
              <v-layout row v-for="todo in todos" :key='todo.id'>
                <v-checkbox :label="todo.title" :value="todo.id" v-model="ids" :class="getClass(todo.active)"></v-checkbox>
                <v-btn flat icon color="prey" @click="deleteTodo(todo.id)">
                  <v-icon>cancel</v-icon>
                </v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-layout row md10 center>
            <a href='#/All'>
              <v-btn @click="condition=`all`" flat :class="getBtnClass('all')">All</v-btn>
            </a>
            <a href='#/active'>
              <v-btn flat @click="condition=`active`" :class="getBtnClass('active')">Active</v-btn>
            </a>
            <a href='#/completed'>
              <v-btn @click="condition=`completed`" flat :class="getBtnClass('completed')">Completed</v-btn>
            </a>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      <v-flex xs12 sm12 class="text-xs-center">
        <p>© {{ new Date().getFullYear() }} Owen, All Rights Reserved </p>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      condition: "all",
      title: "",
      ids: localStorage.getItem("ids")
        ? JSON.parse(localStorage.getItem("ids"))
        : []
    };
  },
  computed: {
    ...mapGetters({
      loadedTodosByCondition: "loadedTodosByCondition"
    }),
    ...mapMutations({
      // updateActiveByIndexes: 'updateActiveByIndexes'
    }),
    todos() {
      this.$store.commit("updateActiveByIds", this.ids);
      return this.loadedTodosByCondition(this.condition);
    }
  },
  methods: {
    deleteTodo(id) {
      this.$store.commit("deleteTodo", id);
    },
    addTodo() {
      if (this.title == "") {
        return;
      }
      this.$store.commit("addTodo", this.title);
      this.title = "";
    },
    getClass(isActive) {
      if (!isActive) {
        return "done";
      }
    },
    getBtnClass(btn) {
      if (btn == this.condition) {
        return "selected";
      }
    }
  }
};
</script>
<style>
.textInput {
  border: solid 1px;
}

.done {
  color: green;
}

a {
  text-decoration: none;
}

.selected {
  color: red;
}
</style>

