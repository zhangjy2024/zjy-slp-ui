<template>
  <div class="chat-room-item">
    <img :src="chatRoom.roomAvatarSrc" alt="群聊头像" style="width: 60px; height: 60px; border-radius: 50%; margin: 10px 7px;">
    <div>
      <h3 style="margin: 10px 0px;">{{ chatRoom.roomName }}</h3>
      <div>群聊简介:{{ chatRoom.description }}</div>
    </div>
    <div style="margin: 15px; margin-left: auto;">
      <div style="color: rgba(0, 0, 0, 0.4);">{{ chatRoom.createdDate.split(" ")[0] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRoomItem',

  props: {
    chatRoom: { type: Object }
  },

  data() {
    return {

    }
  },

}
</script>

<style scoped>
.chat-room-item {
  width: 100% - 10px;
  height: 85px;
  display: flex;
  margin-bottom: -1px;
  border: 1px solid rgba(217, 236, 255);
}
</style>