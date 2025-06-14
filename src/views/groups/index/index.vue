<template>
  <el-card class="box-card groups-index-card" style="width: 100%; height: calc(100vh - 10px);">
    <div slot="header" class="clearfix">
      <el-dropdown v-if="groups != 0" @command="handleCommand" v-loading="miniGroupsLoading">
        <div class="el-dropdown-link active-group-link">
          <img :src="activeGroup.groupAvatarSrc" alt="组织头像" class="group-avatar">
          <div class="group-name" style="width: 180px;">
            {{ activeGroup.name }}<i class="el-icon-arrow-down el-icon--right" style="float: right; margin-top: 6px;"></i>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="groups-select-dropdown-menu">
          <el-dropdown-item v-for="group in miniGroups" :key="group.id" :command="group.id">
            <div class="el-dropdown-link group-link">
              <img :src="group.groupAvatarSrc" alt="组织头像" class="group-avatar">
              <div class="group-name">{{ group.name }}</div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-else>添加组织</el-button>
      <div style="padding: 10px; float: right;">
        <el-button class="edit-button edit-module-button" type="text">编辑模块</el-button>
      </div>
    </div>
    <table v-if="groups != 0" class="group-main-table">
      <tr style="height: 450px;">
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织详情"
            v-loading="groupDetailLoading"
            @click=""
          >
            <template v-slot:body>
              <group-detail :groupDetail="groupDetail"></group-detail>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织成员"
            v-loading="groupMembersLoading"
            @click="toDetail('member')"
          >
            <template v-slot:body>
              <group-member :groupMembers="groupMembers"></group-member>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织通知"
            v-loading="groupNotifyLoading"
            @click="toDetail('notify')"
          >
            <template v-slot:body>
              <group-notify v-for="groupNotify in groupNotifies" :key="groupNotify.id" :groupNotify="groupNotify" @click.native="notifyDialogVisible = true"></group-notify>
              <div v-show="groupNotifies.length == 0" style="width: 100%; line-height: 90px; text-align: center;">暂无通知</div>
            </template>
          </module-card>
        </td>
      </tr>
      <tr style="height: 450px;">
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织群聊"
            v-loading="groupRoomLoading"
          >
            <template v-slot:body>
              <group-rooms v-for="groupRoom in groupRooms" :key="groupRoom.roomId" :groupRoom="groupRoom"></group-rooms>
              <div v-show="groupRooms.length == 0" style="width: 100%; line-height: 90px; text-align: center;">暂无群聊</div>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织任务"
            v-loading="groupTasksLoading"
            @click="toDetail('task')"
          >
            <template v-slot:body>
              <group-tasks v-for="groupTask in groupTasks" :key="groupTask.id" :groupTask="groupTask" @click.native="showTaskDetail(taskDetail)"></group-tasks>
              <div v-show="groupTasks.length == 0" style="width: 100%; line-height: 90px; text-align: center;">暂无任务</div>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织资源"
            v-loading="groupResourcesLoading"
            @click="toDetail('resource')"
          >
          <template v-slot:body>
            <group-resource v-for="groupResource in groupResources" :key="groupResource.id" :groupResource="groupResource" @click.native="showResourceDetail(resource)"></group-resource>
            <div v-show="groupResources.length == 0" style="width: 100%; line-height: 90px; text-align: center;">暂无资源</div>
          </template>
        </module-card>
        </td>
      </tr>
      <!-- <tr style="height: 450px;">
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织管理"
            v-loading="groupRoomLoading"
          >
            <template v-slot:body>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
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
            </template>
          </module-card>
        </td>
      </tr> --> 
    </table>
    <div v-else>
      暂无组织
    </div>

    <notify-detail
      :visible.sync="notifyDialogVisible"
      :notification="currentNotification"
      @confirm="handleNotificationConfirm"
      @clear="handleNotificationClear"
    />

    <group-task-detail 
      :taskDialogVisible.sync="taskDetailVisible" 
      :taskDetail="taskDetail"
    />

    <!-- 资源详情对话框 -->
    <resource-detail 
      :visible.sync="resourceDetailVisible"
      :resource="currentResource"
      @download="handleDownload"
    />
  </el-card>
</template>

<script>
import ModuleCard from '@/components/ModuleCard/index.vue';
import GroupDetail from '../components/GroupDetail.vue';
import GroupMember from '../components/GroupMember.vue';
import GroupNotify from '../components/GroupNotify.vue';
import GroupRooms from '../components/GroupRooms.vue';
import GroupTasks from '../components/GroupTasks.vue';
import GroupResource from '../components/GroupResource.vue';
import NotifyDetail from '../../home/components/NotifyDetail.vue';
import GroupTaskDetail from '../task/GroupTaskDetail.vue';
import ResourceDetail from '../resource/ResourceDetail.vue';
import { getMiniGroups } from '@/api/groups/groups';
import { mapState, mapMutations } from 'vuex';
import { getGroupDetailById } from '@/api/groups/groups'
import { getGroupMembersById } from '@/api/groups/member';
import { getGroupNotifies } from '@/api/notify';
import { getGroupRooms } from '@/api/contact/room'
import { getGroupTasks } from '@/api/groups/tasks'
import { getResourceListByGroupId } from '@/api/groups/resource'
  
export default {
  name: 'GroupsIndex',

  components: {
    ModuleCard, GroupDetail, GroupMember, GroupNotify, GroupRooms, GroupTasks, GroupResource, 
    NotifyDetail, GroupTaskDetail, ResourceDetail,
  },

  computed: {
    ...mapState('groups', ['currentGroupId'])
  },

  watch: {
    currentGroupId: {
      immediate: true,
      handler (newVal, oldValue) {
        if (!newVal) return;
        this.initGroupDetail();
        this.initGroupMembers();
        this.initGroupNotifies();
        this.initGroupRooms();
        this.initGroupTasks();
        this.initGroupResources();
      }

    }
  },

  data() {
    return {
      groups: null,
      miniGroups: [],
      miniGroupsLoading: true,
      activeGroup: {},
      groupDetail: {},
      groupDetailLoading: true,
      groupMembers: [],
      groupMembersLoading: true,
      groupNotifies: [],
      groupNotifyLoading: true,
      groupRooms: [],
      groupRoomLoading: true,
      groupTasks: [],
      groupTasksLoading: true,
      groupResources: [],
      groupResourcesLoading: true,
      notifyForm: {
        title: '',
        content: '',
        sendToAll: true,
        selectedMembers: []
      },
      notifyDialogVisible: false,
      currentNotification: {
        id: '123',
        type: 'org',
        senderName: '张经理',
        senderAvatar: 'https://example.com/avatar.jpg',
        title: '关于下周项目评审的通知',
        content: '请各位团队成员准备好项目进展报告，下周一上午10点在会议室进行项目中期评审。\n\n需要准备材料：\n1. 项目进度报告\n2. 遇到的问题及解决方案\n3. 下一阶段计划',
        sendTime: new Date(),
        confirmed: false
      },
      taskDetailVisible: false,
      taskDetail: {
        id: 2,
        name: '用户反馈处理',
        description: '处理上周收集的用户反馈，分类整理并分配给相应团队',
        status: 'completed',
        endTime: '2023-12-15 14:00:00',
        designator: {
          id: 3,
          name: '王五',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        },
        processor: {
          id: 1,
          name: '张三',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }
      },
      resourceDetailVisible: false,
      currentResource: {
        id: null,
        name: '',
        uploader: '',
        size: '',
        description: '',
        uploadTime: '',
        url: ''
      },
      resource: {
        id: 1,
        name: '项目需求文档.pdf',
        uploader: '张三',
        size: '2.4MB',
        description: '项目前期需求调研和文档编写，包含功能清单和原型设计',
        uploadTime: '2023-06-15 14:30:00',
        url: '/files/project-doc.pdf'
      },
    }
  },

  methods: {
    ...mapMutations('groups', ['setCurrentGroup']),

    initMiniGroups() {
      this.miniGroupsLoading = true;
      getMiniGroups().then(res => {
        if(res.data.data.length == 0) {
          this.groups = this.miniGroups.length;
          return;
        }
        this.miniGroups = res.data.data;
        this.activeGroup = this.miniGroups[0];
        this.setCurrentGroup(this.activeGroup.id);
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.miniGroupsLoading = false;
      })
    },

    handleCommand(command) {
      this.setCurrentGroup(command)
      this.activeGroup = this.miniGroups.find(group => group.id === this.currentGroupId);
    },

    initGroupDetail() {
      this.groupDetailLoading = true;
      getGroupDetailById({groupId: this.currentGroupId}).then(res => {
        this.groupDetail = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.groupDetailLoading = false;
      })
    },

    initGroupMembers() {
      this.groupMembersLoading = true;
      getGroupMembersById({groupId: this.currentGroupId}).then(res => {
        this.groupMembers = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.groupMembersLoading = false;
      })
    },

    initGroupNotifies() {
      this.groupNotifyLoading = true;
      getGroupNotifies({groupId: this.currentGroupId}).then(res => {
        this.groupNotifies = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.groupNotifyLoading = false;
      })
    },

    initGroupRooms() {
      this.groupRoomLoading = true;
      getGroupRooms({groupId: this.currentGroupId}).then(res => {
        this.groupRooms = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.groupRoomLoading = false;
      })
    },

    initGroupTasks() {
      this.groupTasksLoading = true;
      getGroupTasks({groupId: this.currentGroupId}).then(res => {
        this.groupTasks = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.groupTasksLoading = false;
      })
    },

    initGroupResources() {
      this.groupResourcesLoading = true;
      getResourceListByGroupId({groupId: this.currentGroupId}).then(res => {
        this.groupResources = res.data.data;
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.groupResourcesLoading = false;
      })
    },

    toDetail(param) {
      this.$router.push('/groups/' + param);
    },

    handleNotificationConfirm(id, withClear) {
      this.$message.success(`通知${id}已确认${withClear ? '并清除' : ''}`)
      // 这里调用API更新通知状态
      if (withClear) {
        this.notifyDialogVisible = false
        this.groupNotifies.pop();
      } else {
        this.currentNotification.confirmed = true
      }
    },

    handleNotificationClear(id) {
      this.$message.success(`通知${id}已清除`)
      this.notifyDialogVisible = false
      // 这里调用API清除通知
    },

    // 显示任务详情
    showTaskDetail(task) {
      this.taskDetail = {
        id: task.id,
        name: task.name,
        designator: {
          name: task.designator.name,
          avatar: task.designator.avatar
        },
        processor: {
          name: task.processor.name
        },
        endTime: task.endTime,
        status: task.status,
        objective: task.objective,
        description: task.description
      }
      this.taskDetailVisible = true
    },

    showResourceDetail(resource) {
      this.currentResource = resource
      this.resourceDetailVisible = true
    },

    handleDownload(resource) {
      this.$message.success(`开始下载: ${resource.name}`)
      // 实际项目中这里应该是调用下载API或直接打开文件链接
      window.open(resource.url, '_blank')
    },

  },

  mounted() {
    this.initMiniGroups();
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
.group-link {
  display: flex; 
  padding: 6px; 
  border: 1px solid rgb(217, 236, 255); 
  background-color: rgb(236, 245, 255);
}
.active-group-link {
  display: flex; 
  background-color: rgb(236, 245, 255); 
  padding: 6px; 
  border-radius: 6px;
}
.group-avatar {
  width: 30px; 
  height: 30px;
  border: 1px solid rgb(160, 207, 255);
}
.group-name {
  margin: auto 4px; 
  font-size: 17px; 
  color: black; 
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
.groups-select-dropdown-menu {
  width: 231px; 
  padding: 0px;
}
.groups-select-dropdown-menu .el-dropdown-menu__item {
  padding: 0px;
}
.edit-button :hover {
  color: rgb(100, 100, 100);
}
.group-main-table {
  height: 100%; 
  width: 100%; 
  table-layout: fixed; 
  margin-bottom: 18px;
}
.el-table__body-wrapper {
  overflow-y: auto;
}
.resource-item:hover {
  background-color: rgb(236, 245, 255);
}
.edit-module-button {
  padding: 3px 0; 
  margin: auto 10px; 
  color: black; 
  font-size: 17px;
}
</style>