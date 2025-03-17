<template>
  <div
    class="card"
    :style="{
      height: height,
      width: width,
      backgroundColor: backgroundColor,
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
      <slot name="header"></slot>
    </div>
    <el-divider v-if="divider"></el-divider>
    <div class="body" :style="{backgroundColor: backgroundColor}">
      <slot name="body">卡片内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleCard',
  props: {
    cardId: String,
    icon: String,
    title: String,
    divider: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '500px'
    },
    backgroundColor: {
      type: String,
      default: 'white'
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
.card {
  padding: 10px;
  margin: 5px;
  border-radius: 2%;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  overflow-y: auto;
}
.card:hover {
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);
}
.header {
  background-color: rgb(0, 0, 0, 0);
}
.title {
  font-weight: bold;
  display: inline;
}
.el-divider--horizontal {
  margin: 10px 0;
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
.el-divider--horizontal[data-v-2aa72868]{
  margin: 7px 0;
}
</style>