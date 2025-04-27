<template>
  <div class="resource-container">
    <!-- 顶部操作栏 -->
    <div class="resource-header">
      <el-page-header @back="goBack" content="组织资源" style="width: 100%; height: 60px; background-color: white;"></el-page-header>
      <el-button 
        type="primary" 
        icon="el-icon-upload" 
        @click="showUploadDialog"
      >
        上传资源
      </el-button>
    </div>

    <!-- 资源列表 -->
    <div class="resource-list">
      <el-row :gutter="20">
        <el-col 
          v-for="resource in resourceList" 
          :key="resource.id" 
          :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
        >
          <resource-item 
            :resource="resource" 
            @click.native="showResourceDetail(resource)"
            @download="handleDownload"
          />
        </el-col>
      </el-row>

      <el-empty v-if="resourceList.length === 0" description="暂无资源"></el-empty>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 上传资源对话框 -->
    <el-dialog
      title="上传资源"
      :visible.sync="uploadDialogVisible"
      width="500px"
    >
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        multiple
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">支持单个文件最大500MB</div>
      </el-upload>
    </el-dialog>

    <!-- 资源详情对话框 -->
    <resource-detail 
      :visible.sync="detailVisible"
      :resource="currentResource"
      @download="handleDownload"
    />
  </div>
</template>

<script>
import ResourceItem from './ResourceItem.vue'
import ResourceDetail from './ResourceDetail.vue'

export default {
  name: 'ResourceList',
  components: {
    ResourceItem,
    ResourceDetail
  },
  data() {
    return {
      resourceList: [
        {
          id: 1,
          name: '项目需求文档.pdf',
          uploader: '张三',
          size: '2.4MB',
          description: '项目前期需求调研和文档编写，包含功能清单和原型设计',
          uploadTime: '2023-06-15 14:30:00',
          url: '/files/project-doc.pdf'
        },
        {
          id: 2,
          name: '用户调研报告.docx',
          uploader: '李四',
          size: '1.8MB',
          description: '2023年第二季度用户调研结果分析报告',
          uploadTime: '2023-06-10 09:15:00',
          url: '/files/user-research.docx'
        },
        {
          id: 3,
          name: '产品原型图.zip',
          uploader: '王五',
          size: '45.6MB',
          description: '包含所有功能模块的高保真原型图',
          uploadTime: '2023-06-05 16:45:00',
          url: '/files/prototype.zip'
        }
      ],
      currentPage: 1,
      pageSize: 12,
      total: 0,
      uploadDialogVisible: false,
      detailVisible: false,
      currentResource: {
        id: null,
        name: '',
        uploader: '',
        size: '',
        description: '',
        uploadTime: '',
        url: ''
      }
    }
  },
  created() {
    this.fetchResources()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    fetchResources() {
      // 模拟API调用
      this.total = this.resourceList.length
    },
    showUploadDialog() {
      this.uploadDialogVisible = true
    },
    handleUploadSuccess(response, file) {
      this.$message.success('上传成功')
      this.uploadDialogVisible = false
      this.fetchResources()
    },
    beforeUpload(file) {
      const isLt500M = file.size / 1024 / 1024 < 500
      if (!isLt500M) {
        this.$message.error('文件大小不能超过500MB')
      }
      return isLt500M
    },
    showResourceDetail(resource) {
      this.currentResource = resource
      this.detailVisible = true
    },
    handleDownload(resource) {
      this.$message.success(`开始下载: ${resource.name}`)
      // 实际项目中这里应该是调用下载API或直接打开文件链接
      window.open(resource.url, '_blank')
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchResources()
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

.resource-container {
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.resource-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.resource-list {
  min-height: 300px;
  margin-bottom: 20px;
}

.pagination {
  text-align: center;
}

.upload-demo {
  text-align: center;
}
</style>