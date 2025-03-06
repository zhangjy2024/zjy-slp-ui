<template>
  <table class="table">
    <tr>
      <td style="width: 25%;height: 70px;"><el-avatar :size="50" :src="circleUrl"></el-avatar></td>
      <td style="width: 75%;">
        <h4 style="margin: 0;">{{ groupName }}</h4>
        <p style="font-size:14px; margin: 0;">指派人:{{ taskDesignee }}</p>
        <p style="font-size:14px; margin: 0;">任务结束时间:{{ taskEndDate }}</p>
      </td>
    </tr>
    <tr style="height: 50px; overflow: hidden;">
      <td colspan="2" class="detail-content">
        &ensp;&ensp;&ensp;&ensp;任务描述:{{ taskDetail }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    circleUrl: {
      type: String,
      default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    groupName: String,
    taskDesignee: String,
    taskEndDate: String,
    taskDetail: String
  },

  data() {
    return {

    }
  }
}
</script>

<style scoped>
.table {
  width: 265px;
  height: 135px;
  padding: 5px;
  margin: 5px;
  border-radius: 4%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  table-layout: fixed;
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