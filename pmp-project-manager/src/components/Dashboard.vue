<template>
  <div class="dashboard">
    <h1>项目管理仪表板</h1>
    
    <!-- 关键指标卡片 -->
    <div class="metrics-grid">
      <div class="metric-card" v-for="metric in metrics" :key="metric.title">
        <h3>{{ metric.title }}</h3>
        <div class="metric-value">{{ metric.value }}</div>
        <div class="metric-change" :class="metric.change > 0 ? 'positive' : 'negative'">
          {{ metric.change > 0 ? '+' : '' }}{{ metric.change }} 本周
        </div>
      </div>
    </div>

    <!-- 项目状态分布 -->
    <div class="grid-2">
      <div class="card">
        <h3>项目状态分布</h3>
        <div class="status-chart">
          <div class="status-item">
            <span class="status-dot active"></span>
            <span>进行中 ({{ activeProjects }})</span>
          </div>
          <div class="status-item">
            <span class="status-dot completed"></span>
            <span>已完成 ({{ completedProjects }})</span>
          </div>
          <div class="status-item">
            <span class="status-dot delayed"></span>
            <span>延期 ({{ delayedProjects }})</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>PMP知识领域概览</h3>
        <div class="knowledge-areas">
          <div class="area-item" v-for="area in knowledgeAreas" :key="area.name">
            <div class="area-header">
              <span class="area-name">{{ area.name }}</span>
              <span class="area-progress">{{ area.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: area.progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="card">
      <h3>最近活动</h3>
      <div class="activity-list">
        <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
          <div class="activity-icon" :class="activity.type"></div>
          <div class="activity-content">
            <div class="activity-title">{{ activity.title }}</div>
            <div class="activity-time">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const activeProjects = ref(8)
const completedProjects = ref(12)
const delayedProjects = ref(2)
const teamEfficiency = ref(85)

// PMP知识领域数据
const knowledgeAreas = ref([
  { name: '项目整合管理', progress: 90 },
  { name: '项目范围管理', progress: 85 },
  { name: '项目时间管理', progress: 78 },
  { name: '项目成本管理', progress: 82 },
  { name: '项目质量管理', progress: 88 },
  { name: '项目资源管理', progress: 75 },
  { name: '项目沟通管理', progress: 92 },
  { name: '项目风险管理', progress: 80 },
  { name: '项目采购管理', progress: 70 },
  { name: '项目相关方管理', progress: 85 }
])

// 最近活动数据
const recentActivities = ref([
  {
    id: 1,
    type: 'project',
    title: '新项目"企业ERP系统升级"已创建',
    time: '2小时前'
  },
  {
    id: 2,
    type: 'task',
    title: '需求分析阶段已完成',
    time: '4小时前'
  },
  {
    id: 3,
    type: 'risk',
    title: '识别到新的技术风险',
    time: '6小时前'
  },
  {
    id: 4,
    type: 'milestone',
    title: '项目里程碑"系统设计完成"已达成',
    time: '1天前'
  },
  {
    id: 5,
    type: 'team',
    title: '新团队成员张三已加入项目',
    time: '2天前'
  }
])

// 新增的metrics数组
const metrics = ref([
  { title: '活跃项目', value: activeProjects.value, change: 2 },
  { title: '完成项目', value: completedProjects.value, change: 1 },
  { title: '延期项目', value: delayedProjects.value, change: 1 },
  { title: '团队效率', value: teamEfficiency.value + '%', change: 5 }
])
</script>

<style scoped>
.dashboard {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dashboard h1 {
  margin-bottom: 2rem;
  color: var(--primary-dark);
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
}

.metric-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(37,99,235,0.08);
  text-align: center;
  border: 1px solid var(--border);
}

.metric-card h3 {
  color: var(--primary);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.metric-change {
  font-size: 0.9rem;
  font-weight: 500;
}

.metric-change.positive {
  color: #22c55e;
}

.metric-change.negative {
  color: #ef4444;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
}

.card {
  background: var(--card-bg);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(37,99,235,0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
}

.status-chart {
  margin-top: 1rem;
}

.status-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.75rem;
}

.status-dot.active {
  background: #3b82f6;
}

.status-dot.completed {
  background: #22c55e;
}

.status-dot.delayed {
  background: #ef4444;
}

.knowledge-areas {
  margin-top: 1rem;
}

.area-item {
  margin-bottom: 1rem;
}

.area-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.area-name {
  font-size: 0.95rem;
  color: var(--primary-dark);
}

.area-progress {
  font-size: 0.85rem;
  color: var(--text-light);
}

.progress-bar {
  height: 6px;
  background: #e0e7ef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  transition: width 0.3s ease;
}

.activity-list {
  margin-top: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.1rem;
  color: #fff;
}

.activity-icon.project {
  background: var(--primary);
}

.activity-icon.task {
  background: #22c55e;
}

.activity-icon.risk {
  background: #facc15;
  color: #222;
}

.activity-icon.milestone {
  background: #3b82f6;
}

.activity-icon.team {
  background: #6366f1;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 500;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.85rem;
  color: var(--text-light);
}

@media (max-width: 900px) {
  .dashboard {
    max-width: 100vw;
    padding: 0 0.5rem;
  }
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .dashboard h1 {
    font-size: 1.3rem;
  }
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style> 