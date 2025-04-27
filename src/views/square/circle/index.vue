<template>
  <div class="circle-container">
    <el-page-header @back="goBack" content="圈子列表" style="width: calc(100% - 20px); height: 60px; background-color: white; padding-left: 20px;"></el-page-header>
    <!-- 上半部分：热门圈子 -->
    <div class="circle-top-section">
      <div class="popular-circles">
        <h2 class="section-title">热门圈子</h2>
        <div class="circle-grid">
          <div 
            v-for="circle in popularCircles" 
            :key="circle.id" 
            class="circle-card"
            @click="handleRowClick(circle)"
          >
            <div class="circle-avatar">
              <el-avatar :size="60" :src="circle.avatar"></el-avatar>
            </div>
            <div class="circle-info">
              <h3 class="circle-name">{{ circle.name }}</h3>
              <p class="creator">创建人: {{ circle.creator }}</p>
              <div class="circle-meta">
                <el-tag :type="getCircleTypeTag(circle.type)" size="small">
                  {{ getCircleTypeText(circle.type) }}
                </el-tag>
                <span class="member-count">
                  <i class="el-icon-user"></i> {{ circle.memberCount }}
                </span>
                <span class="post-count">
                  <i class="el-icon-document"></i> {{ circle.postCount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="circle-actions">
        <div class="action-buttons">
          <el-button 
            type="primary" 
            icon="el-icon-plus" 
            class="create-btn"
            @click="goToCreateCircle"
          >
            创建圈子
          </el-button>
          <el-button 
            type="primary" 
            icon="el-icon-user" 
            class="create-btn"
            @click="goToMyCircle"
          >
            我的圈子
          </el-button>
        </div>
      </div>
    </div>

    <!-- 下半部分：全部圈子列表 -->
    <div class="circle-list-section">
      <div style="display: flex;">
        <h2 class="section-title" style="display: block;">全部圈子</h2>
        <div class="list-header">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索圈子名称或创建人"
            clearable
            style="width: 300px; margin: auto 20px;"
            @clear="handleSearch"
            @keyup.enter.native="handleSearch"
          >
            <template #append>
              <el-button icon="el-icon-search" @click="handleSearch"></el-button>
            </template>
          </el-input>
        </div>
      </div>
      
      <el-table
        :data="filteredCircles"
        style="width: calc(100% - 60px); padding: 5px 30px;"
        v-loading="loading"
        @row-click="handleRowClick"
      >
        <el-table-column label="圈子头像" width="100">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="240"></el-table-column>
        <el-table-column prop="name" label="圈子名称"></el-table-column>
        <el-table-column label="圈子类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getCircleTypeTag(row.type)" size="small">
              {{ getCircleTypeText(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="成员人数" width="140">
          <template #default="{ row }">
            <span><i class="el-icon-user"></i> {{ row.memberCount }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCircles"
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
  name: 'CircleList',
  data() {
    return {
      loading: false,
      searchKeyword: '',
      popularCircles: [
        {
          id: 1,
          name: '前端开发交流',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          creator: '张工程师',
          type: 'public',
          memberCount: 1245,
          postCount: 356
        },
        {
          id: 2,
          name: '产品经理俱乐部',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          creator: '李产品',
          type: 'public',
          memberCount: 892,
          postCount: 215
        },
        {
          id: 3,
          name: '设计师交流圈',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          creator: '王设计',
          type: 'approval',
          memberCount: 756,
          postCount: 189
        },
        {
          id: 4,
          name: '产品经理俱乐部',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          creator: '李产品',
          type: 'public',
          memberCount: 892,
          postCount: 215
        },
        {
          id: 5,
          name: '设计师交流圈',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          creator: '王设计',
          type: 'approval',
          memberCount: 756,
          postCount: 189
        }
      ],
      allCircles: [
        {
          id: 4,
          name: 'Vue技术交流',
          creator: '赵前端',
          avatar: '',
          type: 'public',
          memberCount: 432
        },
        {
          id: 5,
          name: 'React技术圈',
          creator: '钱工程师',
          avatar: '',
          type: 'public',
          memberCount: 387
        },
        {
          id: 6,
          name: 'Node.js后端',
          creator: '孙开发',
          avatar: '',
          type: 'approval',
          memberCount: 298
        },
        {
          id: 7,
          name: 'UI设计分享',
          creator: '周设计师',
          avatar: '',
          type: 'public',
          memberCount: 256
        },
        {
          id: 8,
          name: '产品思维训练',
          creator: '吴产品',
          avatar: '',
          type: 'approval',
          memberCount: 187
        }
      ],
      currentPage: 1,
      pageSize: 10,
      totalCircles: 0
    }
  },
  computed: {
    filteredCircles() {
      let result = this.allCircles
      
      // 搜索过滤
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(circle => 
          circle.name.toLowerCase().includes(keyword) || 
          circle.creator.toLowerCase().includes(keyword)
        )
      }
      
      this.totalCircles = result.length
      
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
    getCircleTypeText(type) {
      const typeMap = {
        public: '公开',
        approval: '需审核'
      }
      return typeMap[type] || '未知类型'
    },
    getCircleTypeTag(type) {
      return type === 'public' ? 'success' : 'warning'
    },
    goToCreateCircle() {
      this.$router.push('/circle/create')
    },
    goToMyCircle() {
      this.$router.push('/circle/create')
    },
    handleSearch() {
      this.currentPage = 1
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    handleRowClick(row) {
      this.$router.push({
        name: 'CircleDetail',
        query: {
          id: row.id
        },
      });
    }
  },
  created() {
    this.totalCircles = this.allCircles.length
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

.section-title {
  color: #303133;
  margin: 9px 10px;
}

.circle-container {
  padding: 0px;
  background-color: rgb(245, 245, 245);
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

/* 上半部分布局 */
.circle-top-section {
  display: flex;
  margin-bottom: 30px;
}

.popular-circles {
  flex: 7;
  margin: 20px;
  margin-bottom: 0px;
  padding: 10px;
  background-color: #fff;
}

.circle-actions {
  flex: 2;
  margin: 20px;
  margin-bottom: 0px;
  padding: 10px;
  background-color: #fff;
}

/* 热门圈子网格 */
.circle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.circle-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  transition: all 0.3s;
  cursor: pointer;
}

.circle-card:hover {
  background-color: #f0f7ff;
  transform: translateY(-3px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.circle-avatar {
  margin-right: 15px;
}

.circle-info {
  flex: 1;
}

.circle-name {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #303133;
}

.creator {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #606266;
}

.circle-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #909399;
}

/* 操作按钮区域 */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.create-btn {
  width: 180px;
  height: 50px;
  margin: 20px auto;
  margin-bottom: 0px;
}

/* 下半部分列表 */
.circle-list-section {
  margin: 30px 20px;
  padding: 10px;
  background-color: #fff;

}

.list-header {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

/* 表格行点击效果 */
.el-table >>> .el-table__row {
  cursor: pointer;
}

.el-table >>> .el-table__row:hover {
  background-color: #f5f7fa;
}
</style>