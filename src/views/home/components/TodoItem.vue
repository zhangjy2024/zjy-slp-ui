<template>
  <table class="table" @click="toDetail">
    <tr>
      <td style="width: 25%;height: 70px;"><el-avatar :size="50" :src="task.designatorAvatarSrc"></el-avatar></td>
      <td style="width: 75%;">
        <h4 style="margin: 0;">{{ task.taskName }}</h4>
        <p style="font-size:14px; margin: 0;">指派人:{{ task.designatorName }}</p>
        <p style="font-size:14px; margin: 0;">任务结束时间:{{ task?.taskEndDate?.split(" ")[0] || "暂无时间" }}</p>
      </td>
    </tr>
    <tr style="height: 50px; overflow: hidden;">
      <td colspan="2" class="detail-content">
        &ensp;&ensp;&ensp;&ensp;任务描述:{{ task.taskDescription }}
      </td>
    </tr>
    <img src="../img/finished.png" alt="已完成" style="width: 80px; position: absolute; top: 0px; right: 10px;">
  </table>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    task: { type: Object }
  },

  data() {
    return {

    }
  },
  methods: {
    toDetail() {
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.table {
  width: 263px;
  height: 135px;
  position: relative;
  padding: 5px;
  margin: 0px;
  border-radius: 4%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  table-layout: fixed;
}
.table:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.detail-content {
  width: 240px;
  height: 3em;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5em;
  white-space: normal;
}
</style>