<template>
  <div class="knowledge-areas">
    <h1>PMP知识领域</h1>
    <p class="subtitle">项目管理知识体系指南 (PMBOK) 的10个知识领域</p>
    
    <div class="areas-grid">
      <div 
        v-for="area in knowledgeAreas" 
        :key="area.id" 
        class="area-card"
        @click="goToDetail(area)"
      >
        <div class="area-header">
          <div class="area-icon" :style="{ backgroundColor: area.color }">
            {{ area.icon }}
          </div>
          <div class="area-info">
            <h3>{{ area.name }}</h3>
            <p>{{ area.description }}</p>
          </div>
        </div>
        <div class="area-stats">
          <div class="stat">
            <span class="stat-label">过程数</span>
            <span class="stat-value">{{ area.processes }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">完成度</span>
            <span class="stat-value">{{ area.completion }}%</span>
          </div>
        </div>
        <div class="area-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: area.completion + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 知识领域详情模态框 -->
    <div v-if="selectedArea" class="modal-overlay" @click="selectedArea = null">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedArea.name }}</h2>
          <button class="close-btn" @click="selectedArea = null">&times;</button>
        </div>
        <div class="modal-content">
          <div class="area-detail">
            <h4>描述</h4>
            <p>{{ selectedArea.fullDescription }}</p>
            
            <h4>主要过程</h4>
            <ul class="process-list">
              <li v-for="process in selectedArea.processList" :key="process">
                {{ process }}
              </li>
            </ul>
            
            <h4>关键输出</h4>
            <ul class="output-list">
              <li v-for="output in selectedArea.keyOutputs" :key="output">
                {{ output }}
              </li>
            </ul>
            
            <h4>工具与技术</h4>
            <div class="tools-grid">
              <span 
                v-for="tool in selectedArea.tools" 
                :key="tool" 
                class="tool-tag"
              >
                {{ tool }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { knowledgeAreas } from './KnowledgeAreasData.js'

const router = useRouter()
const selectedArea = ref(null)

function goToDetail(area) {
  router.push(`/knowledge-areas/${area.id}`)
}
</script>

<style scoped>
.knowledge-areas h1 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.subtitle {
  color: #6c757d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.area-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.area-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.area-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.area-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.area-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.area-info p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.area-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.area-progress {
  margin-top: 1rem;
}

.progress-bar {
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
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
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #2c3e50;
}

.modal-content {
  padding: 1.5rem;
}

.area-detail h4 {
  color: #2c3e50;
  margin: 1.5rem 0 0.75rem 0;
  font-size: 1.1rem;
}

.area-detail h4:first-child {
  margin-top: 0;
}

.area-detail p {
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.process-list,
.output-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.process-list li,
.output-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
  color: #495057;
}

.process-list li:last-child,
.output-list li:last-child {
  border-bottom: none;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tool-tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .areas-grid {
    grid-template-columns: 1fr;
  }
  
  .area-header {
    flex-direction: column;
    text-align: center;
  }
  
  .area-icon {
    margin: 0 0 1rem 0;
  }
  
  .area-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 