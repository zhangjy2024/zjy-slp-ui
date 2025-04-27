<template>
  <div class="topic-container" style="height: calc(100% - 100px);">
    <el-page-header @back="goBack" content="话题列表" style="width: 100%; height: 60px; background-color: white;"></el-page-header>
    <div style="margin: 0px 20px;">
      <!-- 头部区域 -->
      <div class="topic-header">
        <h1>话题探索</h1>
        <p class="subtitle">发现社区中的热门讨论主题</p>
        
        <div class="search-bar">
          <el-input
            placeholder="搜索话题..."
            prefix-icon="el-icon-search"
            v-model="searchKeyword"
            clearable
            @clear="handleSearch"
            @keyup.enter.native="handleSearch"
            >
          </el-input>
        </div>
      </div>

      <!-- 话题列表 -->
      <div class="topic-list">
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="6" animated />
        </div>

        <template v-else>
          <div 
            v-for="topic in filteredTopics" 
            :key="topic.id" 
            class="topic-card"
            @click="viewTopic(topic.id)"
          >
            <div class="topic-content">
              <h3 class="topic-name">{{ topic.name }}</h3>
              <div class="topic-meta">
                <span class="post-count">
                  <i class="el-icon-document"></i>
                  {{ topic.postCount }} 篇文章
                </span>
                <span class="post-count">
                  <i class="el-icon-chat-line-square"></i>
                  {{ topic.postCount }} 评论
                </span>
              </div>
              <p class="topic-desc" v-if="topic.description">{{ topic.description }}</p>
            </div>
          </div>

          <el-empty v-if="filteredTopics.length === 0" description="未找到相关话题"></el-empty>
        </template>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalTopics"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TopicList',
  data() {
    return {
      loading: false,
      searchKeyword: '',
      followedTopics: [1, 3], // 模拟已关注的话题ID
      topics: [
        {
          id: 1,
          name: 'Vue.js',
          description: '关于Vue框架的技术讨论和最佳实践分享',
          postCount: 1245,
          followerCount: 892
        },
        {
          id: 2,
          name: 'React',
          description: 'React生态系统的技术交流和经验分享',
          postCount: 987,
          followerCount: 756
        },
        {
          id: 3,
          name: '前端性能优化',
          description: '网站性能优化技巧和实战经验',
          postCount: 765,
          followerCount: 632
        },
        {
          id: 4,
          name: 'TypeScript',
          postCount: 543,
          followerCount: 421
        },
        {
          id: 5,
          name: 'Node.js',
          description: '服务端JavaScript开发技术交流',
          postCount: 432,
          followerCount: 387
        },
        {
          id: 6,
          name: 'Webpack配置',
          postCount: 321,
          followerCount: 256
        }
      ],
      currentPage: 1,
      pageSize: 8,
      totalTopics: 0
    }
  },
  computed: {
    filteredTopics() {
      let result = this.topics
      
      // 搜索过滤
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(topic => 
          topic.name.toLowerCase().includes(keyword) ||
          (topic.description && topic.description.toLowerCase().includes(keyword))
        )
      }
      
      this.totalTopics = result.length
      
      // 分页
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return result.slice(start, end)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchTopics() {
      this.loading = true
      // 模拟API调用
      setTimeout(() => {
        this.loading = false
        this.totalTopics = this.topics.length
      }, 800)
    },
    handleSearch() {
      this.currentPage = 1
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    viewTopic(topicId) {
      this.$router.push({
        name: 'TopicDetail',
        query: {
          id: topicId
        }
      })
      
    },
    toggleFollow(topicId) {
      if (this.isFollowing(topicId)) {
        this.followedTopics = this.followedTopics.filter(id => id !== topicId)
        this.$message.success('已取消关注')
      } else {
        this.followedTopics.push(topicId)
        this.$message.success('关注成功')
      }
    },
    isFollowing(topicId) {
      return this.followedTopics.includes(topicId)
    }
  },
  created() {
    this.fetchTopics()
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

.topic-container {
  width: 100%;
}

.topic-header {
  text-align: center;
  margin-bottom: 40px;
}

.topic-header h1 {
  font-size: 32px;
  color: #303133;
  margin-bottom: 10px;
}

.subtitle {
  color: #909399;
  font-size: 16px;
  margin-bottom: 30px;
}

.search-bar {
  max-width: 500px;
  margin: 0 auto;
}

.topic-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.topic-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 140px;
  cursor: pointer;
  transition: all 0.3s;
  border-left: 4px solid #409EFF;
}

.topic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
}

.topic-content {
  margin-bottom: 15px;
}

.topic-name {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #303133;
}

.topic-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #909399;
}

.topic-meta i {
  margin-right: 5px;
}

.topic-desc {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-actions {
  text-align: right;
}

.loading-container {
  grid-column: 1 / -1;
  padding: 20px 0;
}

.pagination {
  margin-top: 30px;
  text-align: center;
}

@media (max-width: 768px) {
  .topic-list {
    grid-template-columns: 1fr;
  }
  
  .topic-header h1 {
    font-size: 26px;
  }
}
</style>