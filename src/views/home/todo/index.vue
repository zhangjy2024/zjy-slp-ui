<!-- <template>
  <div>代办页面</div>
</template> -->
<template>
  <div class="background">
    <div
      class="card"
      :style="{
        height: `${height}px`,
        width: `${width}px`
      }"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="header">
        <i v-if="icon" :class="icon" style="display: inline; font-weight: bold;"></i>
        <div class="title">
          {{ title }}
        </div>
        <i v-if="more" class="el-icon-more more">
          <div class="more-menu" @click="removeById">
            删除
          </div>
        </i>
      </div>
      <div class="body">
        <solt name="body">卡片内容</solt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDo',
  props: {
    cardId: {
      type: String
    },
    icon: {
      type: String,
      default: 'el-icon-chat-dot-square'
    },
    title: {
      type: String,
      default: '卡片标题'
    },
    more: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  methods: {
    removeById() {
      alert("将自定义面板卡片ID列表存入本地，记得回去改登录页面，清空本地Storage的时候不要全清了")
    }
  }
}
</script>

<style scoped>
.background {
  height: 900px;
  padding: 10px;
  background-color: rgb(247, 247, 247);
}
.card {
  padding: 10px;
  margin: 10px;
  background-color: white;
  border-radius: 2%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
}
.title {
  font-weight: bold;
  display: inline;
  background-color: white;
}
.more {
  float: right;
  padding: 5px;
  position: relative;
}
.more:hover .more-menu {
  display: block;
}
.more-menu {
  display: none;
  width: 90px;
  height: 40px;
  background-color: white;
  position: absolute;
  top: 15px;
  left: 15px;
  text-align: center;
  line-height: 40px;
  border-radius: 2%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.body {
  height: 90%;
  background-color: white;
}
</style>