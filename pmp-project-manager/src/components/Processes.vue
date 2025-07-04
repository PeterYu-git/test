<template>
  <div class="processes">
    <h1>PMP过程组</h1>
    <p class="subtitle">项目管理生命周期的5个过程组</p>
    
    <div class="process-flow">
      <div 
        v-for="(process, index) in processGroups" 
        :key="process.id" 
        class="process-step"
        :class="{ active: selectedProcess?.id === process.id }"
        @click="selectProcess(process)"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <h3>{{ process.name }}</h3>
          <p>{{ process.description }}</p>
          <div class="step-stats">
            <span class="stat">{{ process.processes }} 个过程</span>
            <span class="stat">{{ process.completion }}% 完成</span>
          </div>
        </div>
        <div class="step-arrow" v-if="index < processGroups.length - 1">→</div>
      </div>
    </div>

    <!-- 过程组详情 -->
    <div v-if="selectedProcess" class="process-detail card">
      <div class="detail-header">
        <h2>{{ selectedProcess.name }}</h2>
        <div class="process-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: selectedProcess.completion + '%' }"></div>
          </div>
          <span class="progress-text">{{ selectedProcess.completion }}% 完成</span>
        </div>
      </div>
      
      <div class="detail-content">
        <div class="detail-section">
          <h4>描述</h4>
          <p>{{ selectedProcess.fullDescription }}</p>
        </div>
        
        <div class="detail-section">
          <h4>主要过程</h4>
          <div class="processes-grid">
            <div 
              v-for="process in selectedProcess.processList" 
              :key="process.name"
              class="process-item"
            >
              <div class="process-icon" :style="{ backgroundColor: selectedProcess.color }">
                {{ process.icon }}
              </div>
              <div class="process-info">
                <h5>{{ process.name }}</h5>
                <p>{{ process.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h4>关键输出</h4>
          <ul class="output-list">
            <li v-for="output in selectedProcess.keyOutputs" :key="output">
              {{ output }}
            </li>
          </ul>
        </div>
        
        <div class="detail-section">
          <h4>与其他过程组的关系</h4>
          <div class="relationships">
            <div 
              v-for="relation in selectedProcess.relationships" 
              :key="relation.target"
              class="relationship-item"
            >
              <span class="relation-arrow">→</span>
              <span class="relation-target">{{ relation.target }}</span>
              <span class="relation-desc">{{ relation.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 过程组概览 -->
    <div class="overview-grid">
      <div class="overview-card" v-for="process in processGroups" :key="process.id">
        <div class="overview-header">
          <div class="overview-icon" :style="{ backgroundColor: process.color }">
            {{ process.icon }}
          </div>
          <h3>{{ process.name }}</h3>
        </div>
        <div class="overview-stats">
          <div class="stat-item">
            <span class="stat-label">过程数</span>
            <span class="stat-value">{{ process.processes }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">完成度</span>
            <span class="stat-value">{{ process.completion }}%</span>
          </div>
        </div>
        <div class="overview-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: process.completion + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedProcess = ref(null)

const processGroups = ref([
  {
    id: 1,
    name: '启动过程组',
    icon: '🚀',
    color: '#667eea',
    description: '定义新项目或新项目阶段，获得项目授权',
    fullDescription: '启动过程组包含定义一个新项目或现有项目的一个新阶段，授权开始该项目或阶段的一组过程。在启动过程组中，定义初步范围和落实初步财务资源，识别那些将相互作用并影响项目总体结果的内外部相关方，选定项目经理。',
    processes: 2,
    completion: 95,
    processList: [
      {
        name: '制定项目章程',
        icon: '📜',
        description: '编写一份正式批准项目并授权项目经理在项目活动中使用组织资源的文件的过程'
      },
      {
        name: '识别相关方',
        icon: '👥',
        description: '定期识别项目相关方，分析和记录他们的利益、参与度、相互依赖性、影响力和对项目成功的潜在影响的过程'
      }
    ],
    keyOutputs: [
      '项目章程',
      '相关方登记册',
      '假设日志'
    ],
    relationships: [
      {
        target: '规划过程组',
        description: '项目章程和相关方信息为详细规划提供基础'
      }
    ]
  },
  {
    id: 2,
    name: '规划过程组',
    icon: '📋',
    color: '#764ba2',
    description: '明确项目范围，优化目标，为实现目标制定行动方案',
    fullDescription: '规划过程组包含明确项目范围，定义和优化目标，为实现目标制定行动方案的一组过程。规划过程组制定用于指导项目实施的项目管理计划和项目文件。由于项目管理的复杂性，可能需要通过多个反馈循环进行渐进式规划。',
    processes: 24,
    completion: 85,
    processList: [
      {
        name: '制定项目管理计划',
        icon: '📊',
        description: '定义、准备和协调项目计划的所有组成部分，并把它们整合为综合项目管理计划的过程'
      },
      {
        name: '收集需求',
        icon: '📝',
        description: '为实现项目目标而确定、记录并管理相关方的需要和需求的过程'
      },
      {
        name: '定义范围',
        icon: '🎯',
        description: '制定项目和产品详细描述的过程'
      },
      {
        name: '创建WBS',
        icon: '🔧',
        description: '将项目可交付成果和项目工作分解为较小的、更易于管理的组件的过程'
      }
    ],
    keyOutputs: [
      '项目管理计划',
      '需求文件',
      '项目范围说明书',
      '工作分解结构',
      '进度基准',
      '成本基准'
    ],
    relationships: [
      {
        target: '执行过程组',
        description: '项目管理计划指导项目执行'
      },
      {
        target: '监控过程组',
        description: '项目管理计划作为监控和控制的基准'
      }
    ]
  },
  {
    id: 3,
    name: '执行过程组',
    icon: '⚡',
    color: '#f093fb',
    description: '完成项目管理计划中确定的工作，以满足项目规范要求',
    fullDescription: '执行过程组包含完成项目管理计划中确定的工作，以满足项目规范要求的一组过程。本过程组需要按照项目管理计划来协调人员和资源，管理相关方参与，以及整合并实施项目活动。',
    processes: 10,
    completion: 78,
    processList: [
      {
        name: '指导与管理项目工作',
        icon: '🎮',
        description: '为实现项目目标而领导和执行项目管理计划中所确定的工作，并实施已批准变更的过程'
      },
      {
        name: '管理项目知识',
        icon: '🧠',
        description: '使用现有知识并生成新知识，以实现项目目标，并且帮助组织学习的过程'
      },
      {
        name: '获取资源',
        icon: '👥',
        description: '获取项目所需的团队成员、设施、设备、材料、用品和其他资源的过程'
      },
      {
        name: '建设团队',
        icon: '🤝',
        description: '提高工作能力，促进团队成员互动，改善团队整体氛围，以提高项目绩效的过程'
      }
    ],
    keyOutputs: [
      '可交付成果',
      '工作绩效数据',
      '问题日志',
      '变更请求',
      '项目文件更新'
    ],
    relationships: [
      {
        target: '监控过程组',
        description: '执行过程中产生的工作绩效数据用于监控'
      }
    ]
  },
  {
    id: 4,
    name: '监控过程组',
    icon: '👁️',
    color: '#4facfe',
    description: '跟踪、审查和调整项目进展与绩效，识别必要的计划变更',
    fullDescription: '监控过程组包含跟踪、审查和调整项目进展与绩效，识别必要的计划变更并启动相应变更的一组过程。本过程组的关键作用是持续并有规律地观察和测量项目绩效，从而识别与项目管理计划的偏差。',
    processes: 12,
    completion: 82,
    processList: [
      {
        name: '监控项目工作',
        icon: '📊',
        description: '跟踪、审查和报告整体项目进展，以实现项目管理计划中确定的绩效目标的过程'
      },
      {
        name: '实施整体变更控制',
        icon: '🔄',
        description: '审查所有变更请求，批准变更，管理对可交付成果、项目文件和项目管理计划的变更的过程'
      },
      {
        name: '确认范围',
        icon: '✅',
        description: '正式验收已完成的项目可交付成果的过程'
      },
      {
        name: '控制范围',
        icon: '🎯',
        description: '监督项目和产品的范围状态，管理范围基准变更的过程'
      }
    ],
    keyOutputs: [
      '工作绩效报告',
      '变更请求',
      '项目管理计划更新',
      '项目文件更新',
      '验收的可交付成果'
    ],
    relationships: [
      {
        target: '执行过程组',
        description: '监控结果可能触发执行过程组的调整'
      },
      {
        target: '收尾过程组',
        description: '监控确保项目满足收尾条件'
      }
    ]
  },
  {
    id: 5,
    name: '收尾过程组',
    icon: '🏁',
    color: '#43e97b',
    description: '正式完成或结束项目、阶段或合同',
    fullDescription: '收尾过程组包含为正式完成或结束项目、阶段或合同而开展的过程。本过程组验证可交付成果的完成，确保所有目标都已实现，正式验收项目或阶段成果，并有序地结束项目或阶段。',
    processes: 1,
    completion: 90,
    processList: [
      {
        name: '结束项目或阶段',
        icon: '🎉',
        description: '终结项目、阶段或合同的所有活动的过程'
      }
    ],
    keyOutputs: [
      '最终产品、服务或成果',
      '项目文件',
      '组织过程资产更新',
      '经验教训登记册'
    ],
    relationships: [
      {
        target: '启动过程组',
        description: '收尾经验为未来项目启动提供参考'
      }
    ]
  }
])

function selectProcess(process) {
  selectedProcess.value = process
}
</script>

<style scoped>
.processes h1 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.subtitle {
  color: #6c757d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.process-flow {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.process-step {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.process-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.process-step.active {
  border: 2px solid #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.step-content p {
  margin: 0 0 0.75rem 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.step-stats {
  display: flex;
  gap: 1rem;
}

.step-stats .stat {
  font-size: 0.8rem;
  color: #495057;
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.step-arrow {
  font-size: 1.5rem;
  color: #6c757d;
  margin-left: 1rem;
}

.process-detail {
  margin-bottom: 2rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.detail-header h2 {
  margin: 0;
  color: #2c3e50;
}

.process-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  width: 200px;
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
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.detail-content {
  display: grid;
  gap: 2rem;
}

.detail-section h4 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.detail-section p {
  color: #495057;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.processes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.process-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.process-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.process-info h5 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.process-info p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.output-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.output-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
  color: #495057;
}

.output-list li:last-child {
  border-bottom: none;
}

.relationships {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.relationship-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.relation-arrow {
  color: #667eea;
  font-weight: bold;
}

.relation-target {
  font-weight: 500;
  color: #2c3e50;
  min-width: 120px;
}

.relation-desc {
  color: #6c757d;
  font-size: 0.9rem;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.overview-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.overview-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.overview-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.overview-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.overview-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.stat-item {
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
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.overview-progress {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .process-step {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 0 1rem 0;
  }
  
  .step-arrow {
    display: none;
  }
  
  .detail-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .processes-grid {
    grid-template-columns: 1fr;
  }
  
  .overview-grid {
    grid-template-columns: 1fr;
  }
}
</style> 