<template>
  <div class="card p-3 w-100 w-md-75 mx-auto">
    <h2>📋 Task List</h2>
    <div class="btn-group mb-3">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        class="btn btn-outline-primary"
        :class="{ active: filter === option.value }"
        @click="setFilter(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <ul v-if="filteredTasks.length" class="list-group">
      <li
        v-for="(task, index) in visibleTasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span :class="{ 'text-decoration-line-through': task.completed }">
          {{ task.title }}
        </span>
        <div>
          <button
            class="btn btn-success btn-sm me-2"
            @click="markAsCompleted(task.id)"
            aria-label="Complete Task"
            title="Complete"
          >
            ✔
          </button>
          <button
            class="btn btn-danger btn-sm"
            @click="removeTask(task.id)"
            aria-label="Delete Task"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </li>
    </ul>
    <p v-else>There is nothing to do in this condition .</p>

    <button
      v-if="visibleTasks.length < filteredTasks.length"
      class="btn btn-outline-secondary w-100 mt-2"
      @click="loadMore"
    >
      More
    </button>
  </div>
</template>

<script>
import { completeTask, deleteTask, getTasks } from '@/api/tasks.js'

export default {
  data() {
    return {
      tasks: [],
      filter: 'all',
      filterOptions: [
        { label: 'All task', value: 'all' },
        { label: 'Completed task', value: 'completed' },
        { label: 'Uncompleted task', value: 'incomplete' },
      ],
      itemsPerPage: 10,
      visibleCount: 10,
    }
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'completed') return this.tasks.filter((task) => task.completed)
      if (this.filter === 'incomplete') return this.tasks.filter((task) => !task.completed)
      return this.tasks
    },
    visibleTasks() {
      return this.filteredTasks.slice(0, this.visibleCount)
    },
  },
  async created() {
    this.tasks = await getTasks()
  },
  methods: {
    async fetchTasks() {
      this.tasks = await getTasks()
    },
    async markAsCompleted(id) {
      await completeTask(id)
      this.fetchTasks()
    },
    async removeTask(id) {
      await deleteTask(id)
      this.fetchTasks()
    },
    setFilter(filter) {
      this.filter = filter
      this.visibleCount = 10
    },
    loadMore() {
      this.visibleCount += this.itemsPerPage
    },
  },
}
</script>
