<template>
  <div style="margin-top: 10px;">
    <div class="room-item">
      <div style="width: 50px; height: 50px;">
        <img :src="groupRoom.roomAvatarSrc" alt="群聊头像">
      </div>
      <div style="width: calc(100% - 150px);">
        <h3 style="margin: 1px 4px;">{{ groupRoom.roomName }}</h3>
        <p style="width: 100%; margin: 2px 6px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ groupRoom.newMessageUserName }}: {{ groupRoom.newMessageText }}</p>
      </div>              
      <div style="margin: 3px; margin-left: auto;">
        <el-badge :value="groupRoom.unreadMessageNum" class="item" style="margin-left: 60px;"></el-badge>
        <div style="color: rgba(0, 0, 0, 0.4); text-align: right; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ groupRoom.newMessageDate?.split(' ')[0] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupRooms',
  props: {
    groupRoom: { type: Object }
  },

}
</script>

<style scoped>
.room-item {
  width: 100% - 6px; 
  height: 50px; 
  margin: 3px; 
  padding: 10px 5px; 
  display: flex;
}
.room-item:hover {
  background-color: rgb(236, 245, 255);
}
</style>