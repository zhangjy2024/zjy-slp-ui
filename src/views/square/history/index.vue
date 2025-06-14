<template>
  <div class="history-container">
    <h2 class="history-title">浏览历史</h2>
    
    <div class="history-list">
      <posts-item 
      />
      <div class="posts-card" style="width: calc(100% - 60px); height: 180px; margin: 10px 5px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
              <div style="display: flex;">
                <img src="../../home/img/组织头像.png" alt="发布者头像" style="width: 54px; height: 54px; border-radius: 50%; margin: 12px 12px 0px;">
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
                <div style="height: 50px;margin-top: 17px; margin-left: auto; display: flex;">
                  <p style="margin: 10px 0px;">1279</p> <i class="el-icon-view" style="font-size: 24px; margin: 10px 5px; margin-right: 15px;"></i>
                  <p style="margin: 10px 0px;">132</p> <i class="iconfont icon-like" style="font-size: 23px; margin: 10px 5px; margin-right: 15px;"></i>
                  <p style="margin: 10px 0px;">124</p> <i class="el-icon-chat-line-square" style="font-size: 24px; margin: 9px 5px; margin-right: 15px;"></i>
                </div>
              </div>
              <div style="margin: 0px 15px;">
                <h2 style="margin: 2px; font-size: 23px;">前端开发交流圈建立啦，快来加入我们吧！</h2>
                <p style="margin: 2px;">每天分享前端开发经验，助力知识共享共同进步！</p>
              </div>
            </div>
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