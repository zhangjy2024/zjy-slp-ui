<template>
  <div class="contact-index">
    <el-row :gutter="0" style="height: 100%;">
      <el-col :span="7" style="padding: 5px; height: 100%;">
        <el-tabs type="border-card" :stretch=true style="height: 100%;">
          <el-tab-pane label="联系人" style="height: calc(100% - 45px);">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchUsersInput"
              @keyup.enter.native="searchUser"
              >
            </el-input>
            <el-collapse style="height: 100%; overflow: hidden; overflow-y: auto; margin-top: 15px; position: relative;">
              <el-collapse-item title="我的好友" :name="1">
                <div @click="openAndInitChatCard" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
                  <img src="../../home/img/组织头像.png" alt="用户头像" @click.stop="openFriendInfo">
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
            <div v-if="userSearched" style="height: calc(100% - 80px); width: calc(100% - 20px); background-color: white; position: absolute; top: 60px; left: 0px; padding: 10px;">
              <div style="width: 100%; height: 30px; line-height: 30px;">
                “{{ searchUsersInput }}”的搜索结果为：
                <el-button @click="closeUserSearch" icon="el-icon-close" style="width: 30px; height: 30px; float: right; padding: 0px; background-color: rgba(0, 0, 0, 0); border: 0px;"></el-button>
              </div>
              <div @click="openAndInitChatCard" style="width: calc(100% - 6px); height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="群聊" style="height: calc(100% - 45px);">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="searchRoomInput">
            </el-input>
            <el-collapse style="height: 100%; overflow: hidden; overflow-y: auto; margin-top: 15px;">
              <el-collapse-item title="我创建的群聊" name="1">
                <div @click="openAndInitRoomCard" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
                  <img src="../../home/img/组织头像.png" alt="用户头像">
                  <div>
                    <h3 style="margin: 1px 4px;">群聊名称</h3>
                    <p style="margin: 2px 6px;">群聊成员：最新消息</p>
                  </div>              
                  <div style="margin: 3px; margin-left: auto;">
                    <el-badge :value="3" class="item" style="margin-left: 60px;"></el-badge>
                    <div style="color: rgba(0, 0, 0, 0.4); text-align: right;">2025-5-10</div>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="我管理的群聊" name="2">
                <div v-for="i in 3" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
                  <img src="../../home/img/组织头像.png" alt="用户头像">
                  <div>
                    <h3 style="margin: 1px 4px;">群聊名称</h3>
                    <p style="margin: 2px 6px;">群聊成员：最新消息</p>
                  </div>  
                  <div style="margin: 3px; margin-left: auto;">
                    <el-badge :value="3" class="item" style="margin-left: 60px;"></el-badge>
                    <div style="color: rgba(0, 0, 0, 0.4); text-align: right;">2025-5-10</div>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="我加入的群聊" name="3">
                <div v-for="i in 4" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
                  <img src="../../home/img/组织头像.png" alt="用户头像">
                  <div>
                    <h3 style="margin: 1px 4px;">群聊名称</h3>
                    <p style="margin: 2px 6px;">群聊成员：最新消息</p>
                  </div>  
                  <div style="margin: 3px; margin-left: auto;">
                    <el-badge :value="3" class="item" style="margin-left: 60px;"></el-badge>
                    <div style="color: rgba(0, 0, 0, 0.4); text-align: right;">2025-5-10</div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div v-if="roomSearched" style="height: calc(100% - 80px); width: calc(100% - 20px); background-color: white; position: absolute; top: 60px; left: 0px; padding: 10px;">
              <div @click="openAndInitChatCard" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
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
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17" style="padding: 5px; height: 100%;">
        <el-card v-if="chatCard" class="box-card" style="height: 100%; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
          <div slot="header" class="clearfix">
            <div>
              <span style="font-size: 20px;line-height: 40px;padding: 6px">用户名称</span>
              <el-button icon="el-icon-close" class="button-icon" @click="closeCahtCard" style="width: 40px; height: 40px; padding: 2px; background-color: rgba(0, 0, 0, 0); border: 0px; float: right; margin-left: 9px; margin-top: 2px;"></el-button>
              <el-button icon="el-icon-more" class="button-icon" @click="openRightMenu" style="width: 40px; height: 40px; padding: 2px; background-color: rgba(0, 0, 0, 0); border: 0px; float: right;"></el-button>
              <el-button icon="iconfont icon-shipin" class="button-icon" style="width: 40px; height: 40px; padding: 2px; background-color: rgba(0, 0, 0, 0); border: 0px; float: right;"></el-button>
              <el-button icon="iconfont icon-dianhua" class="button-icon" style="width: 40px; height: 40px; padding: 2px; background-color: rgba(0, 0, 0, 0); border: 0px; float: right;"></el-button>
            </div>
          </div>
          <div style="height: calc(100% - 50px); display: flex; padding: 0px;">
            <div class="left-content" style="width: 100%; min-width: 60%; height: calc(100% + 22px);overflow-y: auto;display: flex; flex-direction: column; position: relative;">
              <div class="caht-box" style="width: 100%; overflow-y: auto; background-color: rgba(247, 247, 247, 1); flex: 1; display: flex; flex-direction: column;">
                <div v-for="i in 10" style="padding: 10px; display: flex; align-items: flex-start;">
                  <img src="../../home/img/组织头像.png" alt="好友头像" width="45px" height="45px" style="border-radius: 50%;">
                  <div class="message">你好啊</div>
                </div>
                <div v-for="i in 10" style="padding: 10px; display: flex; align-items: flex-start;">
                  <div class="message" style="margin-right: 10px; margin-left: auto; background-color: rgb(217, 236, 255);">你好啊</div>
                  <img src="../../home/img/组织头像.png" alt="好友头像" width="45px" height="45px" style="border-radius: 50%;">
                </div>
              </div>
              <div class="input-box" style="min-height: 206px;">
                <div class="block" style="background-color: rgba(247, 247, 247, 1); height: 50px;">
                  <div style="margin: auto 0px; height: 100%; display: flex; align-items: center; border-top: 2px solid rgb(217, 236, 255);">
                    <el-button icon="iconfont icon-biaoqing-xue" class="button-icon" style="padding: 4px; background-color: rgba(0, 0, 0, 0); border: 0px; margin: 0px 10px;"></el-button>
                    <el-button icon="el-icon-picture-outline-round" class="button-icon" style="padding: 4px; background-color: rgba(0, 0, 0, 0); border: 0px; margin: 0px 10px;"></el-button>
                    <el-button icon="el-icon-folder-opened" class="button-icon" style="padding: 4px; background-color: rgba(0, 0, 0, 0); border: 0px; margin: 0px 10px;"></el-button>
                  </div>
                </div>
                <div class="input" style="padding: 10px 5px; height: calc(100% - 70px);background-color: rgba(247, 247, 247, 1);">
                  <div style="background-color: rgba(247, 247, 247, 1);">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="textarea"
                      maxlength="10000"
                      rows="8"
                    ></el-input>
                    <el-button type="primary" icon="el-icon-s-promotion" circle style="width: 50px; height: 50px; font-size: 25px; padding: 8px; margin: 10px; display: block; position: absolute; bottom: 20px; right: 20px;"></el-button>
                  </div>  
                </div>
              </div>
            </div>
            <div class="contact-info" v-show="rightMenu" style="width: 40%; height: calc(100% + 22px); background-color: rgba(247, 247, 247, 1); border-left: 2px solid rgb(217, 236, 255);">
              <div style="display: flex; margin: 20px 10px 6px; padding: 10px; background-color: white; border-radius: 5px;">
                <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%;">
                <div>
                  <h3 style="margin: 5px 10px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">性别符号 用户备注aaaa奥奥</h3>
                  <p style="margin: 5px 10px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;">用户名:用户原名称</p>
                </div>
              </div>
              <div style="width: calc(100% - 10px); margin: 0px 5px;">
                <div style="width: calc(100% - 36px); background-color: white; margin: 5px; padding: 13px; border-radius: 5px; display: flex;">
                  <div style="width: 25%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">手机</div>
                  <div style="width: 75%; padding-left: 10px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">15265225325</div>
                </div>
                <div style="width: calc(100% - 36px); background-color: white; margin: 5px; padding: 13px; border-radius: 5px; display: flex;">
                  <div style="width: 25%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">邮箱</div>
                  <div style="width: 75%; padding-left: 10px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">3389626871@qq.com</div>
                </div>
                <div style="width: calc(100% - 36px); background-color: white; margin: 5px; padding: 13px; border-radius: 5px; display: flex;">
                  <div style="width: 25%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">等级</div>
                  <div style="width: 75%; padding-left: 10px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">各种等级图标</div>
                </div>
                <div style="width: 100%; padding: 3px 0px; display: flex; justify-content: center;">
                  <el-button type="primary">修改备注</el-button>
                  <el-button type="danger">删除好友</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <el-card v-if="roomCard" class="box-card" style="height: 100%; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
          <div slot="header" class="clearfix">
            <div>
              <span style="font-size: 20px;line-height: 40px;padding: 6px">群聊名称</span>
              <el-button icon="el-icon-close" class="button-icon" @click="closeRoomCard" style="width: 40px; height: 40px; padding: 2px; background-color: rgba(0, 0, 0, 0); border: 0px; float: right; margin-left: 9px; margin-top: 2px;"></el-button>  
            </div>
          </div>
          <div style="height: calc(100% - 50px); display: flex; padding: 0px;">
            <div class="left-content" style="width: 75%; height: calc(100% + 22px);overflow-y: auto;display: flex; flex-direction: column; position: relative;">
              <div class="caht-box" style="width: 100%; overflow-y: auto; background-color: rgba(247, 247, 247, 1); flex: 1; display: flex; flex-direction: column;">
                <div v-for="i in 10" style="padding: 10px; display: flex; align-items: flex-start;">
                  <img src="../../home/img/组织头像.png" alt="好友头像" width="45px" height="45px" style="border-radius: 50%;">
                  <div class="message">你好啊</div>
                </div>
                <div v-for="i in 10" style="padding: 10px; display: flex; align-items: flex-start;">
                  <div class="message" style="margin-right: 10px; margin-left: auto; background-color: rgb(217, 236, 255);">你好啊</div>
                  <img src="../../home/img/组织头像.png" alt="好友头像" width="45px" height="45px" style="border-radius: 50%;">
                </div>
              </div>
              <div class="input-box" style="min-height: 206px;">
                <div class="block" style="background-color: rgba(247, 247, 247, 1); height: 50px;">
                  <div style="margin: auto 0px; height: 100%; display: flex; align-items: center; border-top: 2px solid rgb(217, 236, 255);">
                    <el-button icon="iconfont icon-biaoqing-xue" class="button-icon" style="padding: 4px; background-color: rgba(0, 0, 0, 0); border: 0px; margin: 0px 10px;"></el-button>
                    <el-button icon="el-icon-picture-outline-round" class="button-icon" style="padding: 4px; background-color: rgba(0, 0, 0, 0); border: 0px; margin: 0px 10px;"></el-button>
                    <el-button icon="el-icon-folder-opened" class="button-icon" style="padding: 4px; background-color: rgba(0, 0, 0, 0); border: 0px; margin: 0px 10px;"></el-button>
                  </div>
                </div>
                <div class="input" style="padding: 10px 5px; height: calc(100% - 70px);background-color: rgba(247, 247, 247, 1);">
                  <div style="background-color: rgba(247, 247, 247, 1);">
                    <el-input
                      type="textarea"
                      placeholder="请输入内容"
                      v-model="textarea"
                      maxlength="10000"
                      rows="8"
                    ></el-input>
                    <el-button type="primary" icon="el-icon-s-promotion" circle style="width: 50px; height: 50px; font-size: 25px; padding: 8px; margin: 10px; display: block; position: absolute; bottom: 20px; right: 20px;"></el-button>
                  </div>  
                </div>
              </div>
            </div>
            <div class="contact-info" style="width: 25%; height: calc(100% + 22px); background-color: rgba(247, 247, 247, 1); border-left: 2px solid rgb(217, 236, 255);">
              <div style="height: 30%; border-bottom: 2px solid rgb(217, 236, 255); padding: 10px;">
                <div style="padding-bottom: 3px;">群聊简介</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;简介啊啊啊啊啊啊啊啊啊啊啊啊</div>
              </div>
              <div style="height: 20px; padding: 10px;">
                <div>群聊成员</div>
                <div style="display: flex; align-items: center; margin: 5px;">
                  <img src="../../home/img/组织头像.png" alt="成员头像" style="width: 30px; border-radius: 50%; margin-right: 10px;">
                  <div>成员名称</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <div v-if="empty" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <div style="position: relative;">
            <img src="../img/空状态.png" alt="空状态图片" width="500px">
            <div @click="openAddFriend" class="add-friend-button" style="position: absolute; bottom: 35px; right: 87px; padding: 0px; background-color: white; border: 0px; cursor: pointer;">
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
export default {
  name: 'ContactIndex',

  computed: {
    empty() {
      return this.chatCard == false && this.roomCard == false ? true : false;
    },

  },
  
  data() {
    return {
      textarea: '',
      chatCard: false,
      roomCard: false,
      rightMenu: false,
      userSearched: false,
      searchUsersInput: '',
      roomSearched: false,
      searchRoomInput: '',
      addFriend: false,
      addUserInput: '',
    }
  },

  methods: {
    closeCahtCard() {
      this.chatCard = false;
    },
    closeRoomCard() {
      this.roomCard = false;
    },
    openAndInitChatCard() {
      this.rightMenu = false;
      this.roomCard = false;
      this.chatCard = true;

    },
    openAndInitRoomCard() {
      this.chatCard = false;
      this.roomCard = true;

    },
    searchUser() {
      if (this.searchUsersInput == '') {
        return;
      }
      this.userSearched = true;

    },
    closeUserSearch() {
      this.userSearched = false;
    },
    openFriendInfo() {
      alert("用户信息弹窗")
    },
    openRightMenu() {
      this.rightMenu = this.rightMenu == false ? true : false;
    },
    openAddFriend() {
      this.addFriend = true;
    },
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
.message {
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
.add-friend-button {
  width: 127px;
  height: 35px;
  position: absolute;
  z-index: 99;
}
.add-friend-button :hover {
  background-color: rgb(255, 255, 255, 0.5);
}
</style>