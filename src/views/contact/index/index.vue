<template>
  <div class="contact-index">
    <el-row :gutter="0" style="height: 100%;">
      <el-col :span="7" style="padding: 5px; height: 100%;">
        <el-tabs type="border-card" :stretch=true style="height: 100%;">
          <el-tab-pane label="联系人" style="height: calc(100% - 45px);">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchUserInput"
              @keyup.enter.native="searchUser"
              >
            </el-input>
            <el-collapse style="height: 100%; overflow: hidden; overflow-y: auto; margin-top: 15px; position: relative;">
              <el-collapse-item title="我的好友" :name="1">
                <div v-loading="friendListLoading">
                  <friend-item
                    v-for="friend in friendList"
                    :key="friend.friendUserId"
                    :friend="friend"
                    @click="openAndInitChatCard(friend.friendUserId, friend.friendAvatarSrc)"
                  ></friend-item>
                </div>
              </el-collapse-item>
              <el-collapse-item title="其他分组" :name="2">
                <div v-for="i in 5" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
                  <img src="../../home/img/组织头像.png" alt="用户头像">
                  <div>
                    <h3 style="margin: 1px 4px;">用户名称</h3>
                    <p style="margin: 2px 6px;">最新消息</p>
                  </div>  
                  <div style="margin: 3px; margin-left: auto;">
                    <el-badge :value="3" class="item" style="margin-left: 60px;"></el-badge>
                    <div style="color: rgba(0, 0, 0, 0.4); text-align: right;">2025-5-10</div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div v-if="userSearched" class="search-results-card">
              <div style="width: 100%; height: 30px; line-height: 30px;">
                “{{ searchUserInput }}”的搜索结果为：
                <el-button @click="closeUserSearch" icon="el-icon-close" class="search-button"></el-button>
              </div>
              <div v-loading="searchUserLoading">
                <friend-item
                  v-for="friend in searchUsers"
                  :key="friend.friendUserId"
                  :friend="friend"
                  @click="openAndInitChatCard(friend.friendUserId, friend.friendAvatarSrc)"
                ></friend-item>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="群聊" style="height: calc(100% - 45px);">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchRoomInput"
              @keyup.enter.native="searchRoom"
            ></el-input>
            <el-collapse style="height: 100%; overflow: hidden; overflow-y: auto; margin-top: 15px;">
              <el-collapse-item title="我创建的群聊" :name="1">
                <div v-if="myCreateRooms.length != 0" v-loading="myCreateRoomLoading">
                  <room-item
                    v-for="room in myCreateRooms"
                    :key="room.roomId"
                    :room="room"
                    @click="openAndInitRoomCard(room.roomId)"
                  ></room-item>
                </div>
                <div v-else></div>
              </el-collapse-item>
              <el-collapse-item title="我管理的群聊" :name="2">
                <div v-if="myAdminRooms.length != 0" v-loading="myAdminRoomLoading">
                  <room-item
                    v-for="room in myAdminRooms"
                    :key="room.roomId"
                    :room="room"
                    @click="openAndInitRoomCard(room.roomId)"
                  ></room-item>
                </div>
                <div v-else></div>
              </el-collapse-item>
              <el-collapse-item title="我加入的群聊" :name="3">
                <div v-if="myJoinRooms.length != 0" v-loading="myJoinRoomLoading">
                  <room-item
                    v-for="room in myJoinRooms"
                    :key="room.roomId"
                    :room="room"
                    @click="openAndInitRoomCard(room.roomId)"
                  ></room-item>
                </div>
                <div v-else></div>
              </el-collapse-item>
            </el-collapse>
            <div v-if="roomSearched" class="search-results-card">
              <div style="width: 100%; height: 30px; line-height: 30px;">
                “{{ searchRoomInput }}”的搜索结果为：
                <el-button @click="closeRoomSearch" icon="el-icon-close" class="search-button"></el-button>
              </div>
              <div v-loading="searchRoomLoading">
                <room-item
                  v-for="room in searchRooms"
                  :key="room.roomId"
                  :room="room"
                  @click="openAndInitRoomCard(room.roomId)"
                ></room-item>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17" style="padding: 5px; height: 100%;">
        <chat-card v-if="chatCard" :avatar="currentFriendAvatar" :message="message" @closeCahtCard="closeCahtCard"></chat-card>
        <chat-room-card v-if="roomCard" @closeRoomCard="closeRoomCard"></chat-room-card>
        <div v-if="empty" class="empty-block">
          <div style="position: relative;">
            <img src="../img/空状态.png" alt="空状态图片" width="500px">
            <div @click="openAddFriend" class="add-friend-button" style="bottom: 35px; right: 85px; padding: 0px; background-color: white; border: 0px; cursor: pointer;">
              <div class="add-friend-button"></div>
              <img src="../img/字.png" alt="添加好友按钮" width="130px">
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="添加好友"
      :visible.sync="addFriend"
      width="80%">
      <div>
        <el-input v-model="addUserInput" prefix-icon="el-icon-search" placeholder="输入用户名查找用户"></el-input>
        <div>
          <div style="width: 100%; height: 40px; padding: 0px 20px; line-height: 40px; font-size: 18px;">好友推荐</div>
          <table style="width: calc(100% - 20px); padding: 0px 10px;">
            <tr>
              <td>
                <div style="display: flex; margin: 5px; padding: 5px; border: 1px solid black;">
                  <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
                  <div>
                    <h3 style="margin: 9px;">用户名称</h3>
                  </div>
                </div>
              </td>
              <td>
                <div style="display: flex; margin: 5px; padding: 5px; border: 1px solid black;">
                  <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
                  <div>
                    <h3 style="margin: 9px;">用户名称</h3>
                  </div>
                </div>
              </td>
              <td>
                <div style="display: flex; margin: 5px; padding: 5px; border: 1px solid black;">
                  <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
                  <div>
                    <h3 style="margin: 9px;">用户名称</h3>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style="display: flex; margin: 5px; padding: 5px; border: 1px solid black;">
                  <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
                  <div>
                    <h3 style="margin: 9px;">用户名称</h3>
                  </div>
                </div>
              </td>
              <td>
                <div style="display: flex; margin: 5px; padding: 5px; border: 1px solid black;">
                  <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
                  <div>
                    <h3 style="margin: 9px;">用户名称</h3>
                  </div>
                </div>
              </td>
              <td>
                <div style="display: flex; margin: 5px; padding: 5px; border: 1px solid black;">
                  <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
                  <div>
                    <h3 style="margin: 9px;">用户名称</h3>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFriend = false">取 消</el-button>
        <el-button type="primary" @click="addFriend = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FriendItem from '../components/FriendItem.vue';
import RoomItem from '../components/RoomItem.vue';
import ChatCard from '../components/ChatCard.vue';
import ChatRoomCard from '../components/ChatRoomCard.vue';
import { getMyFriends, searchMyFriends } from '@/api/contact/friend';
import { getMyCreateRooms, getMyAdminRooms, getMyJoinRooms, searchMyRooms } from '@/api/contact/room';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ContactIndex',

  components: {
    FriendItem, RoomItem, ChatCard, ChatRoomCard,
  },

  computed: {
    empty() {
      return this.chatCard == false && this.roomCard == false;
    },
    ...mapState('webSocket', ['socket', 'currentFriendId'])
  },
  
  data() {
    return {
      chatCard: false,
      roomCard: false,
      rightMenu: false,
      currentFriendAvatar: '',

      userSearched: false,
      searchUserInput: '',
      searchUserLoading: true,
      searchUsers: [],
      roomSearched: false,
      searchRoomInput: '',
      searchRoomLoading: true,
      searchRooms: [],
      
      addFriend: false,
      addUserInput: '',
      
      friendList: [],
      friendListLoading: true,
      myCreateRooms: [],
      myCreateRoomLoading: true,
      myAdminRooms: [],
      myAdminRoomLoading: true,
      myJoinRooms: [],
      myJoinRoomLoading: true,

      users: [],
      message: {},
    }
  },

  methods: {
    ...mapActions('webSocket', ['connectSocket', 'closeSocket', 'setCurrentFriendId', 'setCurrentRoomId']),
    closeCahtCard() {
      this.chatCard = false;
    },
    closeRoomCard() {
      this.roomCard = false;
    },
    openAndInitChatCard(friendId, friendAvatar) {
      this.rightMenu = false;
      this.roomCard = false;
      this.chatCard = true;
      this.setCurrentFriendId(friendId);
      this.currentFriendAvatar = friendAvatar;
    },
    openAndInitRoomCard(roomId) {
      this.chatCard = false;
      this.roomCard = true;
      this.setCurrentRoomId(roomId);
    },
    searchUser() {
      if (this.searchUserInput == '') {
        return;
      }
      this.searchUserLoading = true;
      searchMyFriends({searchCriteria: this.searchUserInput}).then(res => {
        this.searchUsers = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.searchUserLoading = false;
      })
      this.userSearched = true;
    },
    searchRoom() {
      if (this.searchRoomInput == '') {
        return;
      }
      this.searchRoomLoading = true;
      searchMyRooms({searchCriteria: this.searchRoomInput}).then(res => {
        this.searchRooms = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.searchRoomLoading = false;
      })
      this.roomSearched = true;
    },
    closeUserSearch() {
      this.userSearched = false;
    },
    closeRoomSearch() {
      this.roomSearched = false;
    },
    openRightMenu() {
      this.rightMenu = this.rightMenu == false ? true : false;
    },
    openAddFriend() {
      this.addFriend = true;
    },
    initFriendList() {
      this.friendListLoading = true;
      getMyFriends().then(res => {
        this.friendList = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.friendListLoading = false;
      })
    },
    initMyCreateRooms() {
      this.myCreateRoomLoading = true;
      getMyCreateRooms().then(res => {
        this.myCreateRooms = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.myCreateRoomLoading = false;
      })
    },
    initMyAdminRooms() {
      this.myAdminRoomLoading = true;
      getMyAdminRooms().then(res => {
        this.myAdminRooms = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.myAdminRoomLoading = false;
      })
    },
    initMyJoinRooms() {
      this.myJoinRoomLoading = true;
      getMyJoinRooms().then(res => {
        this.myJoinRooms = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.myJoinRoomLoading = false;
      })
    },
  },

  mounted() {
    this.initFriendList();
    this.initMyCreateRooms();
    this.initMyAdminRooms();
    this.initMyJoinRooms();
    this.connectSocket();
    
    this.socket.onmessage = (msg) => {
      console.log("收到数据====" + msg.data);
      let ms = msg.data.replace(/\r\n/g, "\\r\\n");
      let data = JSON.parse(ms);
      console.log(data)
      if (data.users) {
        this.users = data.users;
        console.log(this.users);
      } else {
        this.message = data;
      }
    };
  },

  beforeDestroy() {
    this.closeSocket();
  }

}
</script>

<style>
.contact-index {
  height: calc(100vh - 10px);
  background-color: white;
}
.el-tabs__content{
  height: calc(100% - 80px);
  overflow-y: auto;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.el-card__header {
  padding: 10px;
  border-bottom: 2px solid rgb(217, 236, 255);
  background-color: rgba(247, 247, 247, 1);
}
.button-icon i {
  font-size: 30px !important;
  font-weight: bold;
}
.el-card__body {
  padding: 0px;
  height: calc(100% - 40px);
  overflow-y: auto;
}
.el-textarea__inner {
  border: 0;
  resize: none;
}
.el-textarea__inner{
 font-family:"Microsoft" !important;
 font-size:16px !important;
}
.el-collapse-item__header {
  font-size: 18px;
}
.el-collapse-item__content {
  padding: 0px;
}
.search-results-card {
  height: calc(100% - 80px); 
  width: calc(100% - 20px); 
  background-color: white; 
  position: absolute; 
  top: 60px; 
  left: 0px; 
  padding: 10px;
}
.search-button {
  width: 30px; 
  height: 30px; 
  float: right; 
  padding: 0px; 
  background-color: rgba(0, 0, 0, 0); 
  border: 0px;
}
.add-friend-button {
  width: 130px;
  height: 37px;
  position: absolute;
  z-index: 99;
}
.add-friend-button :hover {
  background-color: rgb(255, 255, 255, 0.5);
}
.empty-block {
  width: 100%; 
  height: 100%; 
  display: flex; 
  justify-content: center; 
  align-items: center;
}
</style>