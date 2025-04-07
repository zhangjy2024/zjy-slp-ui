<template>
  <el-card class="box-card" style="height: 100%; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
    <div slot="header" class="clearfix">
      <div>
        <span style="font-size: 20px;line-height: 40px;padding: 6px">{{ room.roomName }}</span>
        <el-button icon="el-icon-close" class="button-icon header-close-button" @click="closeRoomCard"></el-button>  
      </div>
    </div>
    <div style="height: calc(100% - 50px); display: flex; padding: 0px;">
      <div class="left-content" v-loading="contentLoading">
        <div class="chat-box">
          <message-item 
            v-for="message in messageList" 
            :key="message.id"
            :message="message"
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
                v-model="RoomTextarea"
                maxlength="10000"
                rows="8"
              ></el-input>
              <el-button type="primary" icon="el-icon-s-promotion" circle class="send-button"></el-button>
            </div>  
          </div>
        </div>
      </div>
      <div class="room-info" v-loading="infoLoading">
        <div class="info-header">
          <div style="padding-bottom: 3px;">群聊简述</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ room.description }}</div>
        </div>
        <div style="height: 20px; padding: 10px;">
          <div>群聊成员</div>
          <div v-for="member in room.memberList" :key="member.id" class="member-list">
            <div style="width: 30px; height: 30px; margin-right: 10px; overflow: hidden;">
              <img :src="member.avatarSrc" alt="成员头像" class="member-avatar">
            </div>
            <div>{{ member.userName }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'vuex';
import MessageItem from './MessageItem.vue';
import { getRoomInfo, getRoomMessages } from '@/api/contact/room'

export default {
  name: 'ChatRoomCard',
  components: {
    MessageItem,
  },
  computed: {
    ...mapState('webSocket', ['socket', 'currentRoomId'])
  },
  data() {
    return {
      room: {},
      contentLoading: true,
      infoLoading: true,
      messageList: [],
      RoomTextarea: '',
    }
  },
  methods: {
    closeRoomCard() {
      this.$emit("closeRoomCard")
    },
    initRoomInfo() {
      this.infoLoading = true;
      getRoomInfo({roomId: this.currentRoomId}).then(res => {
        this.room = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.infoLoading = false;
      })
    },
    initRoomMessages() {
      this.contentLoading = true;
      getRoomMessages({roomId: this.currentRoomId}).then(res => {
        this.messageList = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.contentLoading = false;
      })
    }
  },
  mounted() {
    this.initRoomInfo();
    this.initRoomMessages();
  }
}
</script>

<style scoped>
.header-close-button {
  width: 40px; 
  height: 40px; 
  padding: 2px; 
  background-color: rgba(0, 0, 0, 0); 
  border: 0px; 
  float: right; 
  margin-left: 9px; 
  margin-top: 2px;
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
.left-content {
  width: 75%; 
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
.input-box {
  min-height: 206px;
}
.block {
  height: 50px;
  background-color: rgba(247, 247, 247, 1); 
}
.toolbar {
  margin: auto 0px; 
  height: 100%; 
  display: flex; 
  align-items: center; 
  border-top: 2px solid rgb(217, 236, 255);
}
.toolbar-button {
  padding: 4px; 
  background-color: rgba(0, 0, 0, 0); 
  border: 0px; 
  margin: 0px 10px;
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
.room-info {
  width: 25%; 
  height: calc(100% + 22px); 
  background-color: rgba(247, 247, 247, 1); 
  border-left: 2px solid rgb(217, 236, 255);
}
.info-header {
  height: 30%; 
  border-bottom: 2px solid rgb(217, 236, 255); 
  padding: 10px;
}
.member-avatar {
  width: 30px; 
  height: 30px;
  border-radius: 50%; 
  margin-right: 10px;
}
.member-list {
  display: flex; 
  align-items: center;
  margin: 5px;
}
</style>