<template>
  <el-card class="box-card groups-index-card" style="width: 100%; height: calc(100vh - 10px);">
    <div slot="header" class="clearfix">
      <el-dropdown @command="handleCommand" v-loading="miniGroupsLoading">
        <div class="el-dropdown-link" style="display: flex; background-color: rgb(236, 245, 255); padding: 6px; border-radius: 6px;">
          <img :src="activeGroup.groupAvatarSrc" alt="组织头像" width="30px" height="30px" style="border: 1px solid rgb(160, 207, 255);" >
          <div style="margin: auto 4px; font-size: 17px; color: black; width: 180px;">{{ activeGroup.name }}<i class="el-icon-arrow-down el-icon--right" style="float: right; margin-top: 6px;"></i></div>
        </div>
        <el-dropdown-menu slot="dropdown" class="groups-select-dropdown-menu" style="width: 231px; padding: 0px;">
          <el-dropdown-item v-for="group in miniGroups" :key="group.id" :command="group.id">
            <div class="el-dropdown-link" style="display: flex; padding: 6px; border: 1px solid rgb(217, 236, 255); background-color: rgb(236, 245, 255);">
              <img :src="group.groupAvatarSrc" alt="组织头像" width="30px" height="30px" style="border: 1px solid rgb(160, 207, 255);" >
              <div style="margin: auto 4px; font-size: 17px; color: black;">{{ group.name }}</div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="padding: 10px; float: right;">
        <el-button class="edit-button edit-module-button" type="text">编辑模块</el-button>
      </div>
    </div>
    <table style="height: 100%; width: 100%; table-layout: fixed; margin-bottom: 18px;">
      <tr style="height: 50%;">
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织详情"
            v-loading="groupDetailLoading"
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
          >
            <template v-slot:body>
              <group-notify :groupNotifies="groupNotifies"></group-notify>
              <div v-show="groupNotifies.length == 0" style="width: 100%; line-height: 90px; text-align: center;">暂无通知</div>
            </template>
          </module-card>
        </td>
      </tr>
      <tr>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织群聊"
            v-loading="groupRoomLoading"
          >
            <template v-slot:body>
              <group-rooms :groupRooms="groupRooms"></group-rooms>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织任务"
            v-loading="groupTasksLoading"
          >
            <template v-slot:body>
              <group-tasks :groupTasks="groupTasks"></group-tasks>
            </template>
          </module-card>
        </td>
        <td style="width: 50%; overflow: hidden; padding: 10px;">
          <module-card
            width="94%"
            height="calc(100% - 20px)"
            title="组织资源"
            v-loading="groupResourcesLoading"
          >
          <template v-slot:body>
            <group-resource :groupResources="groupResources"></group-resource>
          </template>
        </module-card>
        </td>
      </tr>
    </table>
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
    ModuleCard, GroupDetail, GroupMember, GroupNotify, GroupRooms, GroupTasks, GroupResource
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
    }
  },

  methods: {
    ...mapMutations('groups', ['setCurrentGroup']),

    initMiniGroups() {
      this.miniGroupsLoading = true;
      getMiniGroups().then(res => {
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
    }

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