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
  height: calc(100% - 2px);
  padding: 1px;
}
</style>