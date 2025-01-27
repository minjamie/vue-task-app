<script setup></script>

<template>
  <div class="container mt-4">
    <h1 class="text-center">📝 Task Dashboard</h1>
    <task-list />
    <task-form />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

export default {
  components: {
    TaskList,
    TaskForm,
  },
}
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
