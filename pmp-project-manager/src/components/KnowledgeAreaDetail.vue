<template>
  <div class="knowledge-area-detail">
    <button class="btn" @click="$router.back()">返回</button>
    <h1>{{ area?.name || '知识领域详情' }}</h1>
    <p v-if="area">{{ area.fullDescription }}</p>
    <div v-if="area">
      <h3>主要过程</h3>
      <ul>
        <li v-for="process in area.processList" :key="process">{{ process }}</li>
      </ul>
      <h3>关键输出</h3>
      <ul>
        <li v-for="output in area.keyOutputs" :key="output">{{ output }}</li>
      </ul>
      <h3>工具与技术</h3>
      <div class="tools">
        <span v-for="tool in area.tools" :key="tool" class="tool-tag">{{ tool }}</span>
      </div>
    </div>
    <div v-else>
      <p>未找到该知识领域。</p>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { knowledgeAreas } from './KnowledgeAreasData.js'
const route = useRoute()
const areaId = Number(route.params.id)
const area = computed(() => knowledgeAreas.find(a => a.id === areaId))
</script>
<style scoped>
.knowledge-area-detail {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(37,99,235,0.08);
  padding: 2rem;
}
h1 {
  color: #2563eb;
  margin-bottom: 1rem;
}
h3 {
  margin-top: 1.5rem;
  color: #1e40af;
}
ul {
  margin: 0.5rem 0 1rem 1.5rem;
}
.tool-tag {
  display: inline-block;
  background: #e0e7ef;
  color: #2563eb;
  border-radius: 16px;
  padding: 0.3rem 1rem;
  margin: 0.2rem 0.5rem 0.2rem 0;
  font-size: 0.95rem;
}
.btn {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
}
.btn:hover {
  background: #1e40af;
}
</style> 