<template>
  <div @click="$emit('click')" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
    <div style="width: 50px; height: 50px;">
      <img :src="friend.friendAvatarSrc" alt="用户头像" @click.stop="openFriendInfo" class="friend-avatar">
    </div>
    <div style="width: calc(100% - 140px);">
      <h3 style="margin: 1px 4px;">{{ friend.friendUserName }}</h3>
      <p style="margin: 2px 6px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{ friend.newMessageText }}</p>
    </div>              
    <div style="margin: 3px; margin-left: auto;">
      <el-badge :value="friend.unreadMessageNum" class="item" style="margin-left: 60px;"></el-badge>
      <div style="color: rgba(0, 0, 0, 0.4); text-align: right;">{{ friend.newMessageDate?.split(' ')[0] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FriendItem',
  props: {
    friend: {type: Object}
  },
  methods: {
    openFriendInfo() {
      alert("用户信息弹窗")
    },
  },
}
</script>

<style scoped>
.friend-avatar {
  width: 50px;
  height: 50px;
}
</style>