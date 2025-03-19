<template>
  <div style="display: flex;" @click="clearBadge">
    <div style="padding: 10px 0px; padding-left: 10px;">
      <img class="from-user-avatar" :src="notify.fromUserAvatarSrc" alt="系统图片">
    </div>
    <div style="padding: 10px 0px; padding-right: 10px;">
      <h3 style="margin: 0px; margin-left: 5px; line-height: 20px;">{{ notify.title }}</h3>
      <p class="notify-content">
        &ensp;&ensp;&ensp;&ensp;{{ notify.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotifyItem',

  props: {
    notify: { type: Object }
  },

  data() {
    return {

    }
  },

  methods: {
    clearBadge() {
      let type = '';
      if (this.notify.hasOwnProperty("groupId")) {
        type = 'g';
      } else if (this.notify.hasOwnProperty("circleId")) {
        type = 'c';
      } else {
        type = 's';
      }
      this.$emit("clearNotify", this.notify.id, type)
    }
  }
}
</script>

<style scoped>
.notify-content {
  margin: 0px; 
  margin-left: 5px; 
  line-height: 17px; 
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2; 
  overflow: hidden;
}
.from-user-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%; 
  margin-top: 3px;
}
</style>