import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import ProjectList from '../components/ProjectList.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'ProjectList',
    component: ProjectList
  },
  {
    path: '/knowledge-areas',
    name: 'KnowledgeAreas',
    component: () => import('../components/KnowledgeAreas.vue')
  },
  {
    path: '/knowledge-areas/:id',
    name: 'KnowledgeAreaDetail',
    component: () => import('../components/KnowledgeAreaDetail.vue')
  },
  {
    path: '/processes',
    name: 'Processes',
    component: () => import('../components/Processes.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../components/Reports.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 