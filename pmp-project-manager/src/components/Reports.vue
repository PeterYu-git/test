<template>
  <div class="reports">
    <h1>项目报告</h1>
    <p>这里可以查看和导出各类PMP项目管理相关的统计报表、进度报告、风险报告等。</p>
    <div class="card">
      <h2>示例报告</h2>
      <ul>
        <li>项目进度报告</li>
        <li>项目预算报告</li>
        <li>风险与问题报告</li>
        <li>资源分配报告</li>
        <li>相关方沟通报告</li>
      </ul>
      <p style="color:#888;">（你可以在这里自定义和扩展更多报表内容）</p>
    </div>
  </div>
</template>

<script setup>
// 预留后续数据和交互逻辑
</script>

<style scoped>
.reports {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-top: 2rem;
}

.card h2 {
  color: #667eea;
  margin-bottom: 1rem;
}

ul {
  margin: 1rem 0 1.5rem 1.5rem;
  color: #444;
}
</style> 