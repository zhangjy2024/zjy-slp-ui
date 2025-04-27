<template>
  <div class="member-management-container">
    <el-page-header @back="goBack" content="组织成员" style="width: 100%; height: 60px; background-color: white;"></el-page-header>
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="输入姓名搜索成员"
        clearable
        @clear="handleSearch"
        @keyup.enter.native="handleSearch"
      >
        <template #append>
          <el-button icon="el-icon-search" @click="handleSearch"></el-button>
        </template>
      </el-input>
    </div>

    <!-- 成员表格 -->
    <el-table
      :data="filteredMembers"
      style="width: 100%"
      v-loading="loading"
    >
      <!-- 加入日期列 -->
      <el-table-column prop="joinDate" label="加入日期" width="180" sortable>
        <template #default="{ row }">
          {{ formatDate(row.joinDate) }}
        </template>
      </el-table-column>

      <!-- 头像列 -->
      <el-table-column label="头像" width="100">
        <template #default="{ row }">
          <el-avatar :size="50" :src="row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <!-- 姓名列 -->
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>

      <!-- 成员类型列 -->
      <el-table-column label="成员类型" width="150">
        <template #default="{ row }">
          <el-tag :type="getMemberTypeTagType(row.type)">
            {{ getMemberTypeText(row.type) }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-link
            type="primary"
            :underline="false"
            @click="handleSetAdmin(row)"
            v-if="row.type !== 'creator' && row.type !== 'admin'"
          >
            设为管理员
          </el-link>
          <span v-else class="no-action">不可操作</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalMembers"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberManagement',
  data() {
    return {
      loading: false,
      searchKeyword: '',
      members: [
        {
          id: 1,
          name: '张三',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          type: 'creator',
          joinDate: '2023-01-15T08:30:00'
        },
        {
          id: 2,
          name: '李四',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'admin',
          joinDate: '2023-02-20T14:15:00'
        },
        {
          id: 3,
          name: '王五',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          type: 'member',
          joinDate: '2023-03-10T10:00:00'
        },
        {
          id: 4,
          name: '赵六',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
          type: 'member',
          joinDate: '2023-04-05T16:45:00'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      totalMembers: 0
    }
  },
  computed: {
    filteredMembers() {
      let result = this.members
      
      // 搜索过滤
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(member => 
          member.name.toLowerCase().includes(keyword)
        )
      }
      
      this.totalMembers = result.length
      
      // 分页
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return result.slice(start, end)
    }
  },
  created() {
    this.fetchMembers()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchMembers() {
      this.loading = true
      // 模拟API调用
      setTimeout(() => {
        this.loading = false
        this.totalMembers = this.members.length
      }, 800)
    },
    handleSearch() {
      this.currentPage = 1
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    formatDate(dateStr) {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    },
    getMemberTypeText(type) {
      const typeMap = {
        creator: '创建者',
        admin: '管理员',
        member: '成员'
      }
      return typeMap[type] || '未知类型'
    },
    getMemberTypeTagType(type) {
      const typeMap = {
        creator: 'danger',
        admin: 'warning',
        member: ''
      }
      return typeMap[type]
    },
    handleSetAdmin(member) {
      this.$confirm(`确定要将 ${member.name} 设为管理员吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 实际项目中这里调用API
        member.type = 'admin'
        this.$message.success(`${member.name} 已成为管理员`)
      }).catch(() => {})
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

.member-management-container {
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.search-bar {
  margin-bottom: 20px;
  width: 300px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.no-action {
  color: #909399;
  font-size: 14px;
}

.el-table {
  margin-top: 20px;
}

.el-avatar {
  cursor: pointer;
  transition: transform 0.3s;
}

.el-avatar:hover {
  transform: scale(1.1);
}
</style>