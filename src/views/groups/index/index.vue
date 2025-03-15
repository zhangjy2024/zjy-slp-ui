<template>
  <el-card class="box-card groups-index-card" style="width: 100%; height: calc(100vh - 10px);">
    <div slot="header" class="clearfix">
      <el-dropdown @command="handleCommand">
        <!-- <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span> -->
        <div class="el-dropdown-link" style="display: flex; background-color: rgb(236, 245, 255); padding: 6px; border-radius: 6px;">
          <img src="../../home/img/组织头像.png" alt="组织头像" width="30px" height="30px" style="border: 1px solid rgb(160, 207, 255);" >
          <div style="margin: auto 4px; font-size: 17px; color: black; width: 180px;">组织名称<i class="el-icon-arrow-down el-icon--right" style="float: right; margin-top: 6px;"></i></div>
        </div>
        <el-dropdown-menu slot="dropdown" class="groups-select-dropdown-menu" style="width: 231px; padding: 0px;">
          <el-dropdown-item command="a">
            <div class="el-dropdown-link" style="display: flex; padding: 6px; border: 1px solid rgb(217, 236, 255); background-color: rgb(236, 245, 255);">
              <img src="../../home/img/组织头像.png" alt="组织头像" width="30px" height="30px" style="border: 1px solid rgb(160, 207, 255);" >
              <div style="margin: auto 4px; font-size: 17px; color: black;">组织名称</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="b">
            <div class="el-dropdown-link" style="display: flex; padding: 6px; border: 1px solid rgb(217, 236, 255); background-color: rgb(236, 245, 255);">
              <img src="../../home/img/组织头像.png" alt="组织头像" width="30px" height="30px" style="border: 1px solid rgb(160, 207, 255);" >
              <div style="margin: auto 4px; font-size: 17px; color: black;">组织名称</div>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="c">
            <div class="el-dropdown-link" style="display: flex; padding: 6px; border: 1px solid rgb(217, 236, 255); background-color: rgb(236, 245, 255);">
              <img src="../../home/img/组织头像.png" alt="组织头像" width="30px" height="30px" style="border: 1px solid rgb(160, 207, 255);" >
              <div style="margin: auto 4px; font-size: 17px; color: black;">组织名称</div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="padding: 10px; float: right;">
        <el-button class="edit-button" style="padding: 3px 0; margin: auto 10px; color: black; font-size: 17px;" type="text">编辑模块</el-button>
      </div>
    </div>
    <table style="height: 100%; width: 100%; table-layout: fixed; margin-bottom: 18px;">
      <tr>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            title="组织详情"
          >
            <template v-slot:body>
              <div style="padding: 10px 0;">
                <div style="display: flex;">
                  <img src="../../home/img/组织头像.png" alt="组织头像" width="60px" height="60px" style="border: 10px solid rgb(220, 240, 255, 0.5);border-radius: 5%;">
                  <div>
                    <h1 style="margin: 10px;">组织名称</h1>
                    <el-tag size="small" style="margin: 0 8px;">学校</el-tag>
                  </div>
                </div>
                <el-descriptions style="padding-top: 10px;">
                  <el-descriptions-item label="组织描述" :span="3">组织描述</el-descriptions-item>
                </el-descriptions>
                <div class="block">
                  <el-carousel height="150px">
                    <el-carousel-item v-for="item in 3" :key="item">
                      <img src="../../home/img/组织海报图.jpg" alt="组织海报图" style="width: 100%;height: 150px; object-fit: cover;">
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <el-descriptions style="padding: 10px;">
                  <el-descriptions-item label="创建人">提瓦特之神</el-descriptions-item>
                  <el-descriptions-item label="成员数" :span="2">24</el-descriptions-item>
                  <el-descriptions-item label="手机号" :span="3">18100000000</el-descriptions-item> 
                  <el-descriptions-item label="联系地址" :span="3">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                  <el-descriptions-item label="组织详情" :span="3">组织详情</el-descriptions-item>
                </el-descriptions>
              </div>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            title="组织成员"
          >
            <template v-slot:body>
              <div>
                <el-table
                  :data="tableData"
                  style="width: 100%; height: calc(100% - 60px);"
                >
                  <el-table-column
                    prop="date"
                    label="加入日期"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="100"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    :show-overflow-tooltip="true">
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            title="组织通知"
          >
            <template v-slot:body>
              <div style="margin-top: 10px;">
                <div v-for="i in 10" class="notify-item" style="display: flex; border: 1px solid rgb(217, 236, 255);">
                  <div class="notify-content">
                    <img src="../../home/img/组织头像.png" alt="用户头像" style="width: 55px; height: 55px; padding: 14px 10px; border-radius: 50%;">
                  </div>
                  <div class="notify-content">
                    <h3 style="margin: 0px; margin-top: 10px;">通知标题</h3>
                    <p style="margin: 0px; font-size: 14px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">通知内容阿巴阿巴阿巴阿巴通知内容阿巴阿巴阿巴阿巴通知内容阿巴阿巴阿巴阿巴通知内容阿巴阿巴阿巴阿巴通知内容阿巴阿巴阿巴阿巴通知内容阿巴阿巴阿巴阿巴通知内容阿巴阿巴阿巴阿巴通知内容阿巴阿巴阿巴阿巴</p>
                  </div>
                </div>
              </div>
            </template>
          </module-card>
        </td>
      </tr>
      <tr>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            title="组织群聊"
          >
            <template v-slot:body>
              <div style="margin-top: 10px;">
                <div v-for="i in 12" class="room-item" style="width: 100% - 6px; height: 50px; margin: 3px; padding: 10px 5px; display: flex;">
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
              </div>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            title="组织任务"
          >
            <template v-slot:body>
              <div style="margin-top: 10px;">
                <div v-for="i in 9" class="task-item" style="padding-bottom: 10px; padding-left: 5px;">
                  <div style="display: flex;">
                    <img src="../../home/img/组织头像.png" alt="指派人头像" width="45px" height="45px" style="margin: 5px; margin-top: 9px;">
                    <div style="padding: 5px; width: 100%;">
                      <h2 style="margin: 0px; font-size: 22px;">任务名称</h2>
                      <div style="display: flex; margin-top: 3px;">
                        <p style="margin: 0px; font-size: 14px; width: 40%;">指派人:指派人名称</p>
                        <p style="margin: 0px; font-size: 14px; width: 60%;">结束时间:2025-5-10</p>
                      </div>
                    </div>
                  </div>
                  <p style="margin: 0px; padding: 0 5px; font-size: 14px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                    &ensp;&ensp;&ensp;&ensp;任务描述:阿八八八八八八八啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊阿八八八八八八八啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊阿八八八八八八八啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                  </p>
                </div>
              </div>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            title="组织资源"
          >
          <template v-slot:body>
              <div style="margin-top: 10px;">
                <div v-for="i in 9" class="resource-item" style="padding-bottom: 10px; padding-left: 5px;">
                  <div style="display: flex;">
                    <img src="../../home/img/组织头像.png" alt="上传者头像" width="45px" height="45px" style="margin: 5px; margin-top: 9px;">
                    <div style="padding: 5px; width: 100%;">
                      <h2 style="margin: 0px; font-size: 22px;">资源名称</h2>
                      <div style="display: flex; margin-top: 3px;">
                        <p style="margin: 0px; font-size: 14px; width: 40%;">上传者:上传者名称</p>
                        <p style="margin: 0px; font-size: 14px; width: 60%;">资源大小: 10MB</p>
                      </div>
                    </div>
                  </div>
                  <p style="margin: 0px; padding: 0 5px; font-size: 14px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;">
                    &ensp;&ensp;&ensp;&ensp;资源描述:阿八八八八八八八啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊阿八八八八八八八啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊阿八八八八八八八啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                  </p>
                </div>
              </div>
            </template>
        </module-card>
        </td>
      </tr>
    </table>
  </el-card>
</template>

<script>
import ModuleCard from '@/components/ModuleCard.vue';
  
export default {

  name: 'GroupsIndex',

  components: {
    ModuleCard,
  },

  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄啥玩意啊，文字呢？？？？'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },

  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
  }
}
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.groups-index-card .el-card__header {
  padding: 10px;
  background-color: rgb(217, 236, 255);
}
.groups-index-card .el-card__body {
  height: calc(100% - 62px);
  padding: 5px;
  overflow-y: auto;
}
.groups-select-dropdown-menu .el-dropdown-menu__item {
  padding: 0px;
}
.edit-button :hover {
  color: rgb(100, 100, 100);
}
.el-table__body-wrapper {
  overflow-y: auto;
}
.notify-item:hover .notify-content {
  background-color: rgb(236, 245, 255);
}
.room-item:hover {
  background-color: rgb(236, 245, 255);
}
.task-item:hover {
  background-color: rgb(236, 245, 255);
}
.resource-item:hover {
  background-color: rgb(236, 245, 255);
}
</style>