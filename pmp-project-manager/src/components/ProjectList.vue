<template>
  <div class="project-list">
    <div class="page-header">
      <h1>项目列表</h1>
      <button class="btn" @click="showCreateModal = true">创建新项目</button>
    </div>

    <!-- 筛选器 -->
    <div class="filters card">
      <div class="filter-group">
        <label>状态筛选:</label>
        <select v-model="statusFilter" class="filter-select">
          <option value="">全部状态</option>
          <option value="active">进行中</option>
          <option value="completed">已完成</option>
          <option value="delayed">延期</option>
          <option value="planning">规划中</option>
        </select>
      </div>
      <div class="filter-group">
        <label>优先级:</label>
        <select v-model="priorityFilter" class="filter-select">
          <option value="">全部优先级</option>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
      </div>
      <div class="filter-group">
        <label>项目经理:</label>
        <select v-model="managerFilter" class="filter-select">
          <option value="">全部经理</option>
          <option v-for="manager in managers" :key="manager" :value="manager">{{ manager }}</option>
        </select>
      </div>
    </div>

    <!-- 项目表格 -->
    <div class="card">
      <table class="project-table">
        <thead>
          <tr>
            <th>项目名称</th>
            <th>项目经理</th>
            <th>状态</th>
            <th>优先级</th>
            <th>开始日期</th>
            <th>结束日期</th>
            <th>进度</th>
            <th>预算</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in filteredProjects" :key="project.id">
            <td>
              <div class="project-name">
                <strong>{{ project.name }}</strong>
                <div class="project-description">{{ project.description }}</div>
              </div>
            </td>
            <td>{{ project.manager }}</td>
            <td>
              <span class="status-badge" :class="'status-' + project.status">
                {{ getStatusText(project.status) }}
              </span>
            </td>
            <td>
              <span class="priority-badge" :class="'priority-' + project.priority">
                {{ getPriorityText(project.priority) }}
              </span>
            </td>
            <td>{{ formatDate(project.startDate) }}</td>
            <td>{{ formatDate(project.endDate) }}</td>
            <td>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
                </div>
                <span class="progress-text">{{ project.progress }}%</span>
              </div>
            </td>
            <td>¥{{ formatNumber(project.budget) }}</td>
            <td>
              <div class="action-buttons">
                <button class="btn-small" @click="viewProject(project)">查看</button>
                <button class="btn-small btn-secondary" @click="editProject(project)">编辑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 创建项目模态框 -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal" @click.stop>
        <h3>创建新项目</h3>
        <form @submit.prevent="createProject">
          <div class="form-group">
            <label>项目名称</label>
            <input v-model="newProject.name" type="text" required>
          </div>
          <div class="form-group">
            <label>项目描述</label>
            <textarea v-model="newProject.description" rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>项目经理</label>
              <select v-model="newProject.manager" required>
                <option v-for="manager in managers" :key="manager" :value="manager">{{ manager }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>优先级</label>
              <select v-model="newProject.priority" required>
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>开始日期</label>
              <input v-model="newProject.startDate" type="date" required>
            </div>
            <div class="form-group">
              <label>结束日期</label>
              <input v-model="newProject.endDate" type="date" required>
            </div>
          </div>
          <div class="form-group">
            <label>预算 (万元)</label>
            <input v-model="newProject.budget" type="number" min="0" step="0.1" required>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="showCreateModal = false">取消</button>
            <button type="submit" class="btn">创建项目</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const showCreateModal = ref(false)
const statusFilter = ref('')
const priorityFilter = ref('')
const managerFilter = ref('')

// 项目经理列表
const managers = ref(['张三', '李四', '王五', '赵六'])

// 新项目数据
const newProject = ref({
  name: '',
  description: '',
  manager: '',
  priority: 'medium',
  startDate: '',
  endDate: '',
  budget: 0
})

// 项目数据
const projects = ref([
  {
    id: 1,
    name: '企业ERP系统升级',
    description: '将现有ERP系统升级到最新版本，提升业务流程效率',
    manager: '张三',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    progress: 65,
    budget: 150
  },
  {
    id: 2,
    name: '移动应用开发',
    description: '开发企业移动端应用，支持iOS和Android平台',
    manager: '李四',
    status: 'active',
    priority: 'medium',
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    progress: 45,
    budget: 200
  },
  {
    id: 3,
    name: '数据中心迁移',
    description: '将现有数据中心迁移到云端，提升系统可靠性',
    manager: '王五',
    status: 'completed',
    priority: 'high',
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    progress: 100,
    budget: 300
  },
  {
    id: 4,
    name: '网络安全加固',
    description: '全面升级网络安全防护体系，符合最新安全标准',
    manager: '赵六',
    status: 'delayed',
    priority: 'high',
    startDate: '2024-01-01',
    endDate: '2024-04-30',
    progress: 30,
    budget: 80
  },
  {
    id: 5,
    name: '客户关系管理系统',
    description: '开发新的CRM系统，提升客户服务质量',
    manager: '张三',
    status: 'planning',
    priority: 'medium',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    progress: 0,
    budget: 120
  }
])

// 计算属性：筛选后的项目
const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const statusMatch = !statusFilter.value || project.status === statusFilter.value
    const priorityMatch = !priorityFilter.value || project.priority === priorityFilter.value
    const managerMatch = !managerFilter.value || project.manager === managerFilter.value
    return statusMatch && priorityMatch && managerMatch
  })
})

// 方法
function getStatusText(status) {
  const statusMap = {
    active: '进行中',
    completed: '已完成',
    delayed: '延期',
    planning: '规划中'
  }
  return statusMap[status] || status
}

function getPriorityText(priority) {
  const priorityMap = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return priorityMap[priority] || priority
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

function formatNumber(num) {
  return num.toLocaleString()
}

function viewProject(project) {
  alert(`查看项目: ${project.name}`)
}

function editProject(project) {
  alert(`编辑项目: ${project.name}`)
}

function createProject() {
  const project = {
    id: projects.value.length + 1,
    ...newProject.value,
    status: 'planning',
    progress: 0
  }
  projects.value.push(project)
  showCreateModal.value = false
  newProject.value = {
    name: '',
    description: '',
    manager: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
    budget: 0
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
}

.project-table {
  width: 100%;
  border-collapse: collapse;
}

.project-table th,
.project-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.project-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.project-name {
  max-width: 200px;
}

.project-description {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.priority-high {
  background: #f8d7da;
  color: #721c24;
}

.priority-medium {
  background: #fff3cd;
  color: #856404;
}

.priority-low {
  background: #d1ecf1;
  color: #0c5460;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #6c757d;
  min-width: 40px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal h3 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-group textarea {
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .project-table {
    font-size: 0.8rem;
  }
  
  .project-table th,
  .project-table td {
    padding: 0.5rem;
  }
}
</style> 