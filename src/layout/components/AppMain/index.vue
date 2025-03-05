<template>
  <div class="app-main">
    <!-- 右侧内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain',

}
</script>

<style scoped>
.app-main {
  height: 100vh;
}
</style>