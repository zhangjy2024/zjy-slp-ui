<template>
  <div>
    <el-page-header @back="goBack" content="文章详情" style="width: calc(100% - 20px); height: 60px; background-color: white; padding-left: 20px;"></el-page-header>
    <div class="article-detail-container">
      <!-- 文章头部信息 -->
      <div class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        
        <div class="article-meta">
          <div class="author-info">
            <el-avatar :size="50" :src="article.author.avatar"></el-avatar>
            <div class="author-details">
              <p class="author-name">{{ article.author.name }}</p>
              <p class="publish-time">
                <i class="el-icon-time"></i>
                {{ formatDate(article.publishTime) }}
              </p>
            </div>
          </div>
          
          <div class="stats">
            <span class="view-count">
              <i class="el-icon-view"></i> {{ article.viewCount }} 浏览
            </span>
            <span class="like-count" @click="handleLike">
              <i :class="['el-icon-star-on', { 'liked': isLiked }]"></i> 
              {{ article.likeCount }} 收藏
            </span>
          </div>
        </div>
        
        <div class="tags-and-topics">
          <el-tag 
            v-if="article.circle" 
            type="info" 
            class="circle-tag"
            @click="goToCircle(article.circle.id)"
          >
            <i class="el-icon-collection"></i> {{ article.circle.name }}
          </el-tag>
          
          <el-tag 
            v-for="topic in article.topics" 
            :key="topic.id" 
            class="topic-tag"
            @click="goToTopic(topic.id)"
          >
            #{{ topic.name }}
          </el-tag>
          
          <el-tag 
            v-for="tag in article.tags" 
            :key="tag" 
            type="success" 
            class="content-tag"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>

      <!-- 文章内容 -->
      <div class="article-content">
        <wang-editor-plus 
          :value="article.content" 
          model="read" 
          height="auto"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="article-actions">
        <el-button-group>
          <el-button 
            :type="isLiked ? 'danger' : ''" 
            @click="handleLike"
          >
            <i class="iconfont icon-like"></i> 
            {{ isLiked ? '已点赞' : '点赞' }} ({{ article.likeCount }})
          </el-button>
          <el-button @click="focusCommentInput">
            <i class="el-icon-chat-line-square"></i> 评论 ({{ comments.length }})
          </el-button>
          <el-button 
            :type="isLiked ? 'danger' : ''" 
            @click="handleLike"
          >
            <i class="el-icon-star-on"></i> 
            {{ isLiked ? '已收藏' : '收藏' }} ({{ article.likeCount }})
          </el-button>
        </el-button-group>
      </div>

      <!-- 评论区 -->
      <div class="comment-section" ref="commentSection">
        <h3 class="comment-title">评论 ({{ comments.length }})</h3>
        
        <div class="comment-input">
          <el-input
            type="textarea"
            :rows="3"
            v-model="commentContent"
            placeholder="写下你的评论..."
            ref="commentInput"
          ></el-input>
          <div class="comment-submit">
            <el-button 
              type="primary" 
              size="small" 
              @click="submitComment"
              :disabled="!commentContent.trim()"
            >
              发表评论
            </el-button>
          </div>
        </div>
        
        <div class="comment-list">
          <div 
            v-for="comment in comments" 
            :key="comment.id" 
            class="comment-item"
          >
            <div class="comment-author">
              <el-avatar :size="40" :src="comment.author.avatar"></el-avatar>
              <div class="comment-author-info">
                <span class="author-name">{{ comment.author.name }}</span>
                <span class="comment-time">{{ formatDate(comment.createTime) }}</span>
                <span class="author-name" style="float: right; margin-right: 20px;">
                  112<i class="iconfont icon-like"></i> 
                </span>
              </div>
            </div>
            <div class="comment-content">
              {{ comment.content }}
            </div>
          </div>
          
          <el-empty v-if="comments.length === 0" description="暂无评论"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WangEditorPlus from '@/components/WangEditorPlus'

export default {
  name: 'ArticleDetail',
  components: {
    WangEditorPlus
  },
  data() {
    return {
      article: {
        id: 1,
        title: 'Vue 3.2 新特性深度解析',
        content: '<p>Vue 3.2 引入了许多令人兴奋的新特性...</p>',
        author: {
          id: 1,
          name: '张工程师',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        },
        publishTime: '2023-06-15T14:30:00',
        viewCount: 1245,
        likeCount: 132,
        circle: {
          id: 1,
          name: '前端开发交流圈'
        },
        topics: [
          { id: 1, name: 'Vue.js' },
          { id: 2, name: '前端框架' }
        ],
        tags: ['Vue3', '新特性', '前端']
      },
      comments: [
        {
          id: 1,
          content: '这篇文章写得非常好，解决了我很多疑惑！',
          author: {
            id: 2,
            name: '李前端',
            avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          },
          createTime: '2023-06-15T15:30:00'
        },
        {
          id: 2,
          content: '感谢分享，期待更多关于Vue3的文章',
          author: {
            id: 3,
            name: '王架构师',
            avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
          },
          createTime: '2023-06-16T09:15:00'
        }
      ],
      commentContent: '',
      isLiked: false
    }
  },
  computed: {
    isAuthor() {
      // 实际项目中应该从用户信息获取
      return this.article.author.id === 1 // 假设当前用户ID是1
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatDate(dateStr) {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    handleLike() {
      this.isLiked = !this.isLiked
      this.article.likeCount += this.isLiked ? 1 : -1
      // 实际项目中这里应该调用API
    },
    focusCommentInput() {
      this.$refs.commentInput.focus()
      this.$refs.commentSection.scrollIntoView({ behavior: 'smooth' })
    },
    submitComment() {
      if (!this.commentContent.trim()) return
      
      const newComment = {
        id: this.comments.length + 1,
        content: this.commentContent,
        author: {
          id: 1, // 当前用户ID
          name: '当前用户', // 实际项目中应该用真实用户信息
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        },
        createTime: new Date().toISOString()
      }
      
      this.comments.unshift(newComment)
      this.commentContent = ''
      // 实际项目中这里应该调用API
    },
    handleEdit() {
      this.$router.push(`/article/edit/${this.article.id}`)
    },
    goToCircle(circleId) {
      this.$router.push(`/circle/${circleId}`)
    },
    goToTopic(topicId) {
      this.$router.push(`/topic/${topicId}`)
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

.article-detail-container {
  width: 82%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.article-header {
  margin-bottom: 10px;
  padding-bottom: 0px;
  border-bottom: 1px solid #ebeef5;
}

.article-title {
  font-size: 28px;
  color: #303133;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-details {
  margin-left: 15px;
}

.author-name {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.publish-time {
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #909399;
}

.stats {
  color: #909399;
  font-size: 14px;
}

.stats span {
  margin-left: 15px;
  cursor: pointer;
}

.stats i {
  margin-right: 5px;
}

.stats .liked {
  color: #F56C6C;
}

.tags-and-topics {
  margin-top: 20px;
}

.circle-tag,
.topic-tag,
.content-tag {
  margin-right: 10px;
  cursor: pointer;
}

.article-content {
  margin-bottom: 30px;
  min-height: 300px;
}

.article-actions {
  margin-bottom: 40px;
  text-align: center;
}

.comment-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.comment-title {
  color: #303133;
  margin-bottom: 20px;
}

.comment-input {
  margin-bottom: 30px;
}

.comment-submit {
  margin-top: 10px;
  text-align: right;
}

.comment-item {
  padding: 15px 0;
  border-bottom: 1px dashed #ebeef5;
}

.comment-author {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-author-info {
  width: 100%;
  margin-left: 10px;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
}

.comment-time {
  font-size: 12px;
  color: #909399;
}

.comment-content {
  font-size: 14px;
  line-height: 1.6;
  color: #606266;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 22px;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .stats {
    margin-top: 15px;
    width: 100%;
  }
}
</style>