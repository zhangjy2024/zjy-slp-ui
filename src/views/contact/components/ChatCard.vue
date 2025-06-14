<template>
  <el-card class="box-card" style="height: 100%; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px;line-height: 40px;padding: 6px">{{ user.userName }}</span>
      <el-button icon="el-icon-close" class="button-icon header-button-item" @click="closeCahtCard" style="margin-left: 9px; margin-top: 2px;"></el-button>
      <el-button icon="el-icon-more" class="button-icon header-button-item" @click="openRightMenu"></el-button>
      <el-button icon="iconfont icon-shipin" class="button-icon header-button-item"></el-button>
      <el-button icon="iconfont icon-dianhua" class="button-icon header-button-item"></el-button>
    </div>
    <div style="height: calc(100% - 50px); display: flex; padding: 0px;">
      <div class="left-content" v-loading="contentLoading">
        <div class="chat-box" ref="scrollable">
          <message-item 
            v-for="message in messageList" 
            :key="message.id"
            :message="message"
            :avatar="avatar"
          ></message-item>
        </div>
        <div class="input-box">
          <div class="block">
            <div class="toolbar">
              <el-button icon="iconfont icon-biaoqing-xue" class="button-icon toolbar-button"></el-button>
              <el-button icon="el-icon-picture-outline-round" class="button-icon toolbar-button"></el-button>
              <el-button icon="el-icon-folder-opened" class="button-icon toolbar-button"></el-button>
            </div>
          </div>
          <div class="input">
            <div style="background-color: rgba(247, 247, 247, 1);">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="10000"
                rows="8"
                @keyup.enter.exact.native="sendMessage"
                @keydown.enter.exact.native="handleKeydown"
              ></el-input>
              <el-button type="primary" icon="el-icon-s-promotion" circle class="send-button" @click="sendMessage"></el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="contact-info" v-loading="infoLoading" v-show="rightMenu">
        <div class="info-header">
          <img :src="avatar" alt="用户头像" class="info-avatar">
          <div>
            <h3 class="info-header-text">
              <i :class="iconClass" style="font-weight: 700;"></i>
              {{ user.remark ? user.remark : user.userName }}
            </h3>
            <p class="info-header-text">用户名：{{ user.userName }}</p>
          </div>
        </div>
        <div style="width: calc(100% - 10px); margin: 0px 5px;">
          <div class="info-content-item">
            <div class="info-content-label">手机</div>
            <div class="info-content-text">{{ user.phone }}</div>
          </div>
          <div class="info-content-item">
            <div class="info-content-label">邮箱</div>
            <div class="info-content-text">{{ user.email }}</div>
          </div>
          <div class="info-content-item">
            <div class="info-content-label">等级</div>
            <div class="info-content-text">各种等级图标</div>
          </div>
          <div class="info-footer">
            <el-button type="primary">修改备注</el-button>
            <el-button type="danger">删除好友</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'vuex';
import MessageItem from './MessageItem.vue';
import { getFriendMessages } from '@/api/contact/friend';
import { getFriendInfo } from '@/api/user';

export default {
  name: 'RoomCard',
  components: {
    MessageItem,
  },
  props: {
    avatar: { type: String },
    message: { type: Object }
  },
  computed: {
    ...mapState('webSocket', ['socket', 'currentFriendId', ]),
    currentUserId() {
      return JSON.parse(sessionStorage.getItem('user_info') || '{}').id;
    },
    iconClass() {
      return this.user.sex === 'W' ? 'el-icon-female' : 'el-icon-male';
    }
  },
  watch: {
    currentFriendId: {
      immediate: true,
      handler(newVal, oldVal) {
        if(!newVal) return;
        this.initFriendInfo();
        this.initFriendMessages();
      }
    },
    message: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.messageList.push(newVal)
      }
    },
  },
  data() {
    return {
      user: {},
      messageList: {},
      infoLoading: true,
      contentLoading: true,
      rightMenu: false,
      textarea: '',
    }
  },
  methods: {
    openRightMenu() {
      this.rightMenu = this.rightMenu == false;
    },
    closeCahtCard() {
      this.$emit("closeCahtCard")
    },
    initFriendInfo() {
      this.infoLoading = true;
      getFriendInfo({friendId: this.currentFriendId}).then(res => {
        this.user = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.infoLoading = false;
      })
    },
    initFriendMessages() {
      this.contentLoading = true;
      getFriendMessages({friendId: this.currentFriendId}).then(res => {
        this.messageList = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.contentLoading = false;
      })
    },
    sendMessage() {
      if (!this.currentFriendId) {
        this.$message('目标用户出问题了');
        return;
      }
      if (/^\s*$/.test(this.textarea)) {
        this.$message('不可以发送空消息');
        return;
      } else {
        let message = { targetId: this.currentFriendId, text: this.textarea };
        this.socket.send(JSON.stringify(message));
        this.messageList.push({ fromUserId: this.currentUserId, text: this.textarea });
        this.textarea = '';
      }
    },
    handleKeydown(event) {
      event.preventDefault();
      return false;
    }
  },
  updated() {
    const scrollable = this.$refs.scrollable;
    scrollable.scrollTop = scrollable.scrollHeight;
  },
}
</script>

<style scoped>
.header-button-item {
  width: 40px; 
  height: 40px; 
  padding: 2px; 
  background-color: rgba(0, 0, 0, 0); 
  border: 0px; 
  float: right;
}
.left-content {
  width: 100%; 
  min-width: 60%; 
  height: calc(100% + 22px);
  overflow-y: auto;
  display: flex; 
  flex-direction: column; 
  position: relative;
}
.chat-box {
  width: 100%; 
  overflow-y: auto; 
  background-color: rgba(247, 247, 247, 1); 
  flex: 1; 
  display: flex; 
  flex-direction: column;
}
.toolbar-button {
  padding: 4px; 
  background-color: rgba(0, 0, 0, 0); 
  border: 0px; 
  margin: 0px 10px;
}
.toolbar {
  margin: auto 0px; 
  height: 100%; 
  display: flex; 
  align-items: center; 
  border-top: 2px solid rgb(217, 236, 255);
}
.input-box {
  min-height: 206px;
}
.block {
  height: 50px;
  background-color: rgba(247, 247, 247, 1); 
}
.input {
  height: calc(100% - 70px);
  padding: 10px 5px; 
  background-color: rgba(247, 247, 247, 1);
}
.send-button {
  width: 50px; 
  height: 50px; 
  font-size: 25px; 
  padding: 8px; 
  margin: 10px; 
  display: block; 
  position: absolute; 
  bottom: 20px; 
  right: 20px;
}
.contact-info {
  width: 40%; 
  height: calc(100% + 22px); 
  background-color: rgba(247, 247, 247, 1); 
  border-left: 2px solid rgb(217, 236, 255);
}
.info-header {
  display: flex; 
  margin: 20px 10px 6px; 
  padding: 10px; 
  background-color: white; 
  border-radius: 5px;
}
.info-avatar {
  width: 60px; 
  height: 60px; 
  border-radius: 50%;
}
.info-header-text {
  margin: 5px 10px; 
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 1; 
  overflow: hidden;
}
.info-content-item {
  width: calc(100% - 36px); 
  background-color: white; 
  margin: 5px; 
  padding: 13px; 
  border-radius: 5px; 
  display: flex;
}
.info-content-label {
  width: 25%; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
  overflow: hidden;
}
.info-content-text {
  width: 75%; 
  padding-left: 10px; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
  overflow: hidden;
}
.info-footer {
  width: 100%;
  padding: 3px 0px; 
  display: flex; 
  justify-content: center;
}
</style>