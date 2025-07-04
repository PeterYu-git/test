<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <h2>PMP项目管理平台</h2>
      </div>
      <div class="nav-menu">
        <router-link to="/" class="nav-link">仪表板</router-link>
        <router-link to="/projects" class="nav-link">项目列表</router-link>
        <router-link to="/knowledge-areas" class="nav-link">知识领域</router-link>
        <router-link to="/processes" class="nav-link">过程组</router-link>
        <router-link to="/reports" class="nav-link">报告</router-link>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  --primary: #2563eb;
  --primary-light: #3b82f6;
  --primary-dark: #1e40af;
  --bg: #f6f8fa;
  --card-bg: #fff;
  --border: #e5e7eb;
  --text: #222;
  --text-light: #6b7280;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--bg);
  color: var(--text);
}
#app {
  min-height: 100vh;
  background: var(--bg);
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  color: #fff;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 12px rgba(37,99,235,0.08);
}
.nav-brand h2 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
}
.nav-menu {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  white-space: nowrap;
}
.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.2s;
  flex-shrink: 0;
}
.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255,255,255,0.15);
}
.main-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
}
@media (max-width: 900px) {
  .main-content {
    max-width: 100vw;
    padding: 1.2rem 0.5rem;
  }
  .navbar {
    padding: 1rem;
  }
  .nav-menu {
    gap: 0.5rem;
    flex-wrap: nowrap;
  }
}
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background: #5a6fd8;
}

.btn-secondary {
  background: #6c757d;
}

.btn-secondary:hover {
  background: #5a6268;
}

.grid {
  display: grid;
  gap: 1rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-active {
  background: #d4edda;
  color: #155724;
}

.status-completed {
  background: #d1ecf1;
  color: #0c5460;
}

.status-delayed {
  background: #f8d7da;
  color: #721c24;
}
</style>
