<template>
  <div>
    <div class="group-header">
      <div class="gradient-box"></div>
      <img class="group-poster" :src=group.galleryImages alt="组织海报图">
      <img class="group-avatar" :src=group.groupAvatarSrc alt="组织头像">
      <h1 class="group-name">{{ group.name }}</h1>
      <p class="group-description">{{ group.description }}</p>
    </div>
    <div class="group-content">
      <el-tabs style="width: 95%;" v-model="activeName" type="card" class="tabs">
        <el-tab-pane label="组织简介" name="groupSummary">
          <el-descriptions class="margin-top" :column="3" :border="true">
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                创建者
              </template>
              {{ group.adminName }}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
              </template>
              {{ group.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                标签
              </template>
              <el-tag v-for="item in group.tagList" :key="item.id" size="small" style="margin: 2px 5px;">{{ item.tagName }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-office-building"></i>
                联系地址
              </template>
              {{ group.address }}
            </el-descriptions-item>
            <el-descriptions-item :span="3">
              <template slot="label">
                <i class="el-icon-office-building"></i>
                组织简介
              </template>
              {{ group.detail }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane class="group-tab-members" label="组织成员" name="groupMembers">
          <el-table
            ref="filterTable"
            :data="group.memberList"
            style="width: 100%;margin-top: -17px;">
            <el-table-column
              prop="memberName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="memberType"
              label="身份"
              width="130"
              :filters="[{ text: '创建者', value: '创建者' }, { text: '用户', value: '用户' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.memberType === 'ADMIN' ? 'primary' : 'success'"
                  disable-transitions>{{ getMemberTypeText(scope.row.memberType) }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="组织通知" name="groupNotify">
          <el-table
            :data="group.notifyList"
            style="width: 100%;margin-top: -15px;"
            >
            <el-table-column
              prop="fromUserName"
              label="发送人"
              width="120">
            </el-table-column>
            <el-table-column
              prop="title"
              label="通知标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="text"
              label="通知内容">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="组织资源" name="groupResource">
          <el-table
            :data="group.resourceList"
            style="width: 100%;margin-top: -10px;">
            <el-table-column
              prop="resourceName"
              label="资源名"
              width="210">
            </el-table-column>
            <el-table-column
              prop="adminName"
              label="上传者"
              width="120">
            </el-table-column>
            <el-table-column
              prop="resourceSize"
              label="大小(MB)">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupItem',

  props: {
    group: { type: Object }
  },

  data() {
    return {
      activeName: 'groupSummary',
    }
  },

  methods: {
    filterTag(value, row) {
      console.log(value)
      return row.tag === value;
    },
    getMemberTypeText(value) {
      const mapping = [
        { text: '创建者', value: 'ADMIN' },
        { text: '成员', value: 'USER' }
      ];
      const found = mapping.find(item => item.value === value);
      return found ? found.text : value;
    }
  },

  mounted() {

  }
}
</script>

<style scoped>
.group-header {
  position: relative;
  display: flex; 
  justify-content: center;
  margin-top: 5px;
}
.group-poster {
  width: 98%;
  height: 150px; 
  object-fit: cover; 
  position: absolute;
}
.group-avatar {
  width: 70px;
  height: 70px; 
  object-fit: cover;
  position: absolute; 
  top: 60px; 
  left: 15px; 
  z-index: 99;
  border: 10px solid rgb(220, 240, 255, 0.5);
  border-radius: 5%;
}
.group-name {
  position: absolute; 
  z-index: 20;
  top: 75px;
  left: 110px;
}
.group-description {
  position: absolute; 
  z-index: 20; 
  top: 110px;
  left: 112px;
}
.gradient-box {
  width: 100%;
  height: 150px;
  background: linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%);
  position: absolute; 
  z-index: 2;
}
.group-content {
  width: 100%;
  height: 200px;
  margin: auto;
  margin-top: 152px;
  padding: 0px 15px;
  overflow: hidden; 
  overflow-y: auto;
}
.group-tab-members {
  padding: 0 10px;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>