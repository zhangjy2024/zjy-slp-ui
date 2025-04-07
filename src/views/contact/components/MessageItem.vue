<template>
  <div class="message">
    <img v-if="!IsMy" :src="avatar == undefined ? message.fromUserAvatarSrc : avatar" alt="好友头像" class="user-avatar">
    <div class="text" :class="IsMy ? 'my' : ''">{{ message.text }}</div>
    <img v-if="IsMy" :src="currentUserAvatar" alt="好友头像" class="user-avatar">
  </div>
</template>

<script>

export default {
  name: 'MessageItem',
  props: {
    message: { type: Object },
    avatar: { type: String },
  },
  computed: {
    currentUserId() {
      return JSON.parse(sessionStorage.getItem('user_info') || '{}').id;
    },
    currentUserAvatar() {
      return JSON.parse(sessionStorage.getItem('user_info') || '{}').avatarSrc;
    },
    IsMy: {
      get() {
        return this.message.fromUserId === this.currentUserId;
      }
    }
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped>
.message {
  padding: 10px; 
  display: flex; 
  align-items: flex-start;
}
.text {
  max-width: 500px;
  padding: 12px;
  background-color: white;
  border-radius: 5px;
  word-wrap: break-word;
  word-break: break-word;
  line-height: 1;
  font-size: 18px;
  margin-left: 10px;
}
.my {
  margin-right: 10px; 
  margin-left: auto;
  background-color: rgb(217, 236, 255);
}
.user-avatar {
  width: 45px; 
  height: 45px; 
  border-radius: 50%;
}
</style>