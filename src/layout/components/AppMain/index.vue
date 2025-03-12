<template>
  <div class="app-main">
    <!-- 右侧内容 -->
    <router-view style="height: 100%;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain',

}
</script>

<style scoped>
.app-main {
  height: calc(100vh - 20px);
  padding: 5px;
}
</style>