<template>
  <div @click="$emit('click')" class="room-item">
    <div style="width: 50px; height: 50px;">
      <img :src="room.roomAvatarSrc" alt="用户头像">
    </div>
    <div style="width: calc(100% - 140px);">
      <h3 style="margin: 1px 4px;">{{ room.roomName }}</h3>
      <p class="message-text">{{ room.newMessageUserName }}: {{ room.newMessageText }}</p>
    </div>
    <div style="margin: 3px; margin-left: auto;">
      <el-badge :value="room.unreadMessageNum" class="item" style="margin-left: 60px;"></el-badge>
      <div style="color: rgba(0, 0, 0, 0.4); text-align: right;">{{ room.newMessageDate?.split(' ')[0] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomItem',
  props: {
    room: {type: Object},
  },
  methods: {

  }
}
</script>

<style scoped>
.room-item {
  width: calc(100% - 6px);
  height: 50px; 
  margin: 3px; 
  padding: 8px 2px; 
  padding-top: 2px; 
  display: flex;
}
.message-text {
  margin: 2px 6px; 
  text-overflow: ellipsis;
  white-space: nowrap; 
  overflow: hidden;
}
</style>