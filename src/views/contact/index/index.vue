<template>
  <div class="contact-index">
    <el-row :gutter="0" style="height: 100%;">
      <el-col :span="7" style="padding: 5px; height: 100%;">
        <el-tabs type="border-card" :stretch=true style="height: 100%;">
          <el-tab-pane label="联系人" style="height: calc(100% - 45px);">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input">
            </el-input>
            <el-collapse style="height: 100%; overflow: hidden; overflow-y: auto; margin-top: 15px;">
              <el-collapse-item title="我的好友" name="1">
                <div style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
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
              <el-collapse-item v-for="i in 3" title="其他分组" :name="i">
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
          </el-tab-pane>
          <el-tab-pane label="群聊" style="height: calc(100% - 45px);">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input">
            </el-input>
            <el-collapse style="height: 100%; overflow: hidden; overflow-y: auto; margin-top: 15px;">
              <el-collapse-item title="我创建的群聊" name="1">
                <div style="width: 100% - 6px; height: 50px; margin: 3px; padding: 8px 2px; padding-top: 2px; display: flex;">
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
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17" style="padding: 5px; height: 100%;">
        <el-card class="box-card" style="height: 100%; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">
          <div slot="header" class="clearfix">
            <div>
              <span style="font-size: 20px;line-height: 40px;padding: 6px">用户名称</span>
              <i class="iconfont icon-shipin" style="font-size: 30px;float: right; margin: 6px 10px;margin-right: 15px;"></i>
              <i class="iconfont icon-dianhua" style="font-size: 30px;float: right; margin: 6px 10px;"></i>
            </div>
          </div>
          <div style="height: calc(100% - 50px); display: flex; padding: 0px; position: relative;">
            <div class="left-content" style="width: 75%; height: calc(100% + 22px);overflow-y: auto;display: flex; flex-direction: column;">
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
                    <i class="iconfont icon-biaoqing-xue" style="font-size: 30px;margin: 0px 9px;"></i>
                    <i class="el-icon-picture-outline-round" style="font-size: 30px;margin: 0px 9px;"></i>
                    <i class="el-icon-folder-opened" style="font-size: 30px;margin: 0px 9px;"></i>
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
                    <el-button type="primary" icon="el-icon-s-promotion" circle style="width: 50px; height: 50px; font-size: 25px; padding: 8px; margin: 10px; display: block; position: absolute; bottom: -10px; right: 26%;"></el-button>
                  </div>  
                </div>
              </div>
            </div>
            <div class="contact-info" style="width: 25%; height: calc(100% + 22px); background-color: rgba(247, 247, 247, 1); border-left: 2px solid rgb(217, 236, 255);"></div>
          </div>
        </el-card>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ContactIndex',
  
  data() {
    return {
      input: '',
      textarea: ''
    }
  },

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
</style>