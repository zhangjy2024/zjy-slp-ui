<template>
  <div class="posts-card" @click="toDetail">
    <div style="display: flex;">
      <img src="../../home/img/组织头像.png" alt="发布者头像" class="avatar">
      <div>
        <div style="display: flex;">
          <h3 style="margin: 5px 5px 0; margin-top: 13px;">testUser</h3>
          <!-- <div>图标</div> -->
        </div>
        <div style="display: flex;">
          <!-- <div>图标</div> -->
          <p style="margin: 5px;">前端开发交流</p>
        </div>
      </div>
      <h1 style="margin: auto 20px; font-size: 28px;">Vue2笔记</h1>
      <div style="height: 50px;margin-top: 17px; margin-left: auto; display: flex;">
        <p style="margin: 10px 0px;">1279</p> <i class="el-icon-view" style="font-size: 24px; margin: 10px 5px; margin-right: 15px;"></i>
        <p style="margin: 10px 0px;">132</p> <i class="iconfont icon-like" style="font-size: 23px; margin: 10px 5px; margin-right: 15px;"></i>
        <p style="margin: 10px 0px;">124</p> <i class="el-icon-chat-line-square" style="font-size: 24px; margin: 9px 5px; margin-right: 15px;"></i>
      </div>
    </div>
    <div style="margin: 0px 15px;">
      <p style="margin: 2px;">### JS表达式
{{ }}中写的都是JS表达式
插值语法：解析标签体内容       指令语法：解析标签(包括标签属性、内容、绑定事件等)
### 数据绑定

动态的给标签属性绑定值

​                v-bind:value=""：单向绑定……</p>
    </div>
    <div style="height: 130px; width: calc(100% - 30px); display: flex; justify-content: space-between; margin: 0px 15px; position: absolute; bottom: 10px;">
      <div style="width: 100%; height: 100%; display: flex; overflow: hidden;">
        <img src="../../home/img/1.png" alt="文章内图片" style="height: calc(100% - 10px); width: calc(100% - 10px); margin: 5px; object-fit: cover;">
      </div>
      <div style="width: 100%; height: 100%; display: flex; overflow: hidden;">
        <img src="../../home/img/2.png" alt="文章内图片" style="height: calc(100% - 10px); width: calc(100% - 10px); margin: 5px; object-fit: cover;">
      </div>
      <div style="width: 100%; height: 100%; display: flex; overflow: hidden;">
        <img src="../../home/img/3.png" alt="文章内图片" style="height: calc(100% - 10px); width: calc(100% - 10px); margin: 5px; object-fit: cover;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsItem',
  methods: {
    toDetail() {
      this.$router.replace('/square/posts')
    }
  }
}
</script>

<style scoped>
.posts-card {
  width: calc(100% - 60px); 
  height: 260px; 
  margin: 10px 5px; 
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; 
  padding-bottom: 15px;
  position: relative;
}
.posts-card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;
  background-color: white;
}
.avatar {
  width: 54px; 
  height: 54px; 
  border-radius: 50%; 
  margin: 12px 12px 0px;
}
</style>