import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import What from '../views/What.vue'
import Post from '../views/Post.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/What',
    name: 'What',
    component: What,

  },
  {
    path: '/Post',
    name: 'Post',
    component: Post
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
