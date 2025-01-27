<template>
  <div class="card p-3 w-100 w-md-75 mx-auto">
    <h2>➕ Add Task</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-2">
        <input type="text" v-model="title" class="form-control" placeholder="Task title" required />
      </div>
      <div class="mb-2">
        <textarea
          v-model="description"
          class="form-control"
          placeholder="Task description"
        ></textarea>
      </div>
      <div class="mb-2">
        <input type="date" v-model="due_date" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Add Task</button>
    </form>
  </div>
</template>

<script>
import { addTask } from '@/api/tasks.js'

export default {
  data() {
    return {
      title: '',
      description: '',
      due_date: '',
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.title || !this.due_date) {
        alert('Title and Due Date are required!')
        return
      }

      await addTask({
        title: this.title,
        description: this.description,
        due_date: this.due_date,
      })

      this.$emit('taskAdded')
      this.title = ''
      this.description = ''
      this.due_date = ''
    },
  },
}
</script>
