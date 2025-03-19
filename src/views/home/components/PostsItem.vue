<template>
  <div class="posts-item">
    <h2 style="margin: 0px 5px;">{{ posts.title }}</h2>
    <div>
      <el-tag v-for="tag in posts.tagList" :key="tag.id" size="small" style="margin: 2px 5px;">{{ tag.name }}</el-tag>
      {{ posts.postsSummary }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsItem',

  props: {
    posts: { type: Object }
  },

  data() {
    return {

    }
  },
}
</script>

<style scoped>
.posts-item {
  margin-bottom: 5px; 
  padding: 3px; 
  border-left: 6px solid rgba(217, 236, 255); 
  border-top: 1px solid rgba(217, 236, 255);
}
</style>