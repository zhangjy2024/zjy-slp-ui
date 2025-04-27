<template>
  <div class="history-container">
    <h2 class="history-title">浏览历史</h2>
    
    <div class="history-list">
      <posts-item 
        v-for="i in 4"
      />
      <el-empty v-if="historyPosts.length === 0" description="暂无浏览历史"></el-empty>
    </div>
  </div>
</template>

<script>
import PostsItem from '../components/PostsItem.vue';

export default {
  name: 'HistoryView',
  components: {
    PostsItem
  },
  data() {
    return {
      historyPosts: [
        {
          id: 1,
          author: {
            name: '张工程师',
            avatar: require('@/views/home/img/组织头像.png'),
            tag: '资深前端'
          },
          title: 'Vue 3.2 新特性深度解析',
          content: 'Vue 3.2 引入了许多令人兴奋的新特性，本文将详细分析这些新功能的使用场景和最佳实践...',
          images: [
            require('@/views/home/img/组织海报图.jpg'),
            require('@/views/home/img/组织海报图.jpg'),
            require('@/views/home/img/组织海报图.jpg')
          ],
          viewCount: 1279,
          likeCount: 132,
          commentCount: 124
        },
        {
          id: 2,
          author: {
            name: '李架构师',
            avatar: require('@/views/home/img/组织头像.png'),
            tag: '系统架构'
          },
          title: 'React性能优化全攻略',
          content: '本文将分享React应用性能优化的完整方案，包括代码分割、懒加载、memo使用等技巧...',
          images: [
            require('@/views/home/img/组织海报图.jpg'),
            require('@/views/home/img/组织海报图.jpg'),
            require('@/views/home/img/组织海报图.jpg')
          ],
          viewCount: 892,
          likeCount: 156,
          commentCount: 87
        },
        {
          id: 3,
          author: {
            name: '王设计师',
            avatar: require('@/views/home/img/组织头像.png'),
            tag: 'UI/UX设计'
          },
          title: 'Figma高级技巧分享',
          content: '本文将介绍Figma中一些不为人知的高级技巧，帮助您提升设计效率...',
          images: [
            require('@/views/home/img/组织海报图.jpg'),
            require('@/views/home/img/组织海报图.jpg'),
            require('@/views/home/img/组织海报图.jpg')
          ],
          viewCount: 756,
          likeCount: 98,
          commentCount: 45
        }
      ]
    }
  }
}
</script>

<style scoped>
.history-container {
  height: 100%;
  overflow: auto;
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.history-title {
  color: #303133;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.history-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
  gap: 20px;
}

.history-item {
  transition: transform 0.3s;
}

.history-item:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .history-list {
    grid-template-columns: 1fr;
  }
}
</style>