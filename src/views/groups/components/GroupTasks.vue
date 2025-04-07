<template>
  <div style="margin-top: 10px;">
    <div class="task-item">
      <div style="display: flex;">
        <img :src="groupTask.designatorAvatarSrc" alt="指派人头像" class="user-avatar">
        <div style="padding: 5px; width: 100%;">
          <h2 style="margin: 0px; font-size: 22px;">{{ groupTask.taskName }}</h2>
          <div style="display: flex; margin-top: 3px;">
            <p style="margin: 0px; font-size: 14px; width: 40%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">指派人：{{ groupTask.designatorName }}</p>
            <p style="margin: 0px; font-size: 14px; width: 60%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">结束时间：{{ groupTask.taskEndDate?.split(' ')[0] }}</p>
          </div>
        </div>
      </div>
      <p class="task-desc">
        &ensp;&ensp;&ensp;&ensp;任务描述：{{ groupTask.taskDescription }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupTasks',
  props: {
    groupTask: { type: Object }
  }
}
</script>

<style scoped>
.task-item {
  padding-bottom: 10px; 
  padding-left: 5px;
}
.task-item:hover {
  background-color: rgb(236, 245, 255);
}
.user-avatar {
  width: 45px; 
  height: 45px;
  margin: 5px; 
  margin-top: 9px;
}
.task-desc {
  margin: 0px; 
  padding: 0 5px; 
  font-size: 14px; 
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2; 
  overflow: hidden;
}
</style>