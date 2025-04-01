<template>
  <div style="margin-top: 10px;">
    <div v-for="notify in groupNotifies" :key="notify.id" class="notify-item">
      <div class="notify-content" style="width: 75px; height: 87px;">
        <img :src="notify.fromUserAvatarSrc" alt="用户头像" class="user-avatar">
      </div>
      <div class="notify-content" style="flex: 1">
        <h3 style="margin: 0px; margin-top: 10px;">{{ notify.title }}</h3>
        <p class="notify-content-text">{{ notify.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupNotify',
  props: {
    groupNotifies: {type: Array},
  }
}
</script>

<style scoped>
.notify-item:hover .notify-content {
  background-color: rgb(236, 245, 255);
}
.notify-item {
  display: flex; 
  border: 1px solid rgb(217, 236, 255);
}
.user-avatar {
  width: 55px;
  height: 55px;
  padding: 14px 10px; 
  border-radius: 50%;
}
.notify-content-text {
  margin: 0px; 
  font-size: 14px; 
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2; 
  overflow: hidden;
}
</style>