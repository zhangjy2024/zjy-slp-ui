<template>
  <div class="circle-content-container">
    <el-page-header @back="goBack" content="圈子详情" style="width: calc(100% - 20px); height: 60px; background-color: white; padding-left: 20px;"></el-page-header>
    <div style="margin: 20px; padding: 10px; background-color: white;">
      <!-- 圈子头部信息 -->
      <div class="circle-header">
        <div class="header-main">
          <el-avatar :size="80" :src="circleInfo.avatar" class="circle-avatar"></el-avatar>
          <div class="circle-meta">
            <h1 class="circle-name">{{ circleInfo.name }}</h1>
            <p class="circle-description">{{ circleInfo.description }}</p>
            <div class="circle-stats">
              <span class="stat-item">
                <i class="el-icon-user"></i> 圈主: {{ circleInfo.owner }}
              </span>
              <span class="stat-item">
                <i class="el-icon-collection-tag"></i> 任务: {{ circleInfo.taskCount }}
              </span>
              <span class="stat-item">
                <i class="el-icon-document"></i> 文章: {{ circleInfo.postCount }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="header-actions">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreatePost">发布文章</el-button>
          <div></div>
          <el-button icon="el-icon-star-off" @click="handleFollowCircle">
            {{ isFollowing ? '已关注' : '关注圈子' }}
          </el-button>
        </div>
      </div>

      <!-- 文章列表 -->
      <div class="post-list">
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="3" animated />
        </div>
        
        <template v-else>
          <!-- <posts-item 
            v-for="post in posts" 
            :key="post.id" 
            :post="post"
            @click.native="viewPostDetail(post.id)"
          /> -->

          <posts-item v-for="i in 7"></posts-item>
          
          <el-empty v-if="posts.length === 0" description="暂无文章"></el-empty>
        </template>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPosts"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostsItem from '../components/PostsItem.vue'

export default {
  name: 'CircleContent',
  components: {
    PostsItem
  },
  data() {
    return {
      loading: false,
      isFollowing: false,
      circleInfo: {
        id: 1,
        name: '前端开发交流圈',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        description: '专注于前端技术交流与分享，涵盖Vue、React、TypeScript等前沿技术',
        owner: '张工程师',
        taskCount: 15,
        postCount: 356
      },
      posts: [
        {
          id: 1,
          author: {
            name: '李前端',
            avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            tag: '资深前端工程师'
          },
          title: 'Vue 3.2 新特性深度解析',
          content: 'Vue 3.2 引入了许多令人兴奋的新特性，本文将详细分析这些新功能的使用场景和最佳实践...',
          images: [
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
          ],
          viewCount: 1279,
          likeCount: 132,
          commentCount: 124
        },
        {
          id: 2,
          author: {
            name: '王架构师',
            avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            tag: '前端架构师'
          },
          title: 'React性能优化全攻略',
          content: '本文将分享React应用性能优化的完整方案，包括代码分割、懒加载、memo使用等技巧...',
          images: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
          ],
          viewCount: 892,
          likeCount: 156,
          commentCount: 87
        }
      ],
      currentPage: 1,
      pageSize: 10,
      totalPosts: 0
    }
  },
  created() {
    this.fetchCircleData()
    this.fetchPosts()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchCircleData() {
      // 模拟API调用获取圈子信息
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    fetchPosts() {
      // 模拟API调用获取文章列表
      this.loading = true
      setTimeout(() => {
        this.totalPosts = this.posts.length
        this.loading = false
      }, 800)
    },
    handleCreatePost() {
      this.$router.push(`/circle/${this.circleInfo.id}/create-post`)
    },
    handleFollowCircle() {
      this.isFollowing = !this.isFollowing
      this.$message.success(this.isFollowing ? '关注成功' : '已取消关注')
    },
    viewPostDetail(postId) {
      this.$router.push(`/post/${postId}`)
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchPosts()
    }
  }
}
</script>

<style scoped>
::v-deep .el-page-header__title,::v-deep .el-page-header__content {
  display: flex;
  align-items: center;
}

::v-deep .el-page-header__left {
  padding-left: 15px;
}

.circle-content-container {
  padding: 0px;
  background-color: rgb(245, 245, 245);
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* 圈子头部样式 */
.circle-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

.header-main {
  display: flex;
}

.circle-avatar {
  margin-right: 20px;
}

.circle-meta {
  flex: 1;
}

.circle-name {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #303133;
}

.circle-description {
  margin: 0 0 15px 0;
  color: #606266;
  font-size: 15px;
  line-height: 1.6;
}

.circle-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  color: #909399;
  font-size: 14px;
}

.stat-item i {
  margin-right: 5px;
}

.header-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

/* 文章列表样式 */
.post-list {
  min-height: 500px;
  padding: 0px 50px;
}

.loading-container {
  padding: 20px 0;
}

/* 分页样式 */
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>