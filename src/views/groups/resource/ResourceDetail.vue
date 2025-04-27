<template>
  <el-dialog
    :title="`资源详情 - ${resource.name}`"
    :visible="dialogVisible"
    width="600px"
    @close="handleClose"
  >
    <div class="resource-detail">
      <div class="detail-header">
        <div class="file-icon">
          <i :class="getFileIcon(resource.name)"></i>
        </div>
        <div class="file-info">
          <h3>{{ resource.name }}</h3>
          <p class="file-meta">
            <span>上传者: {{ resource.uploader }}</span>
            <span>大小: {{ resource.size }}</span>
            <span>上传时间: {{ formatDate(resource.uploadTime) }}</span>
          </p>
        </div>
      </div>

      <div class="detail-content">
        <h4>资源描述</h4>
        <p class="description">{{ resource.description || '暂无描述' }}</p>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关闭</el-button>
      <el-button 
        type="primary" 
        @click="$emit('download', resource)"
      >
        <i class="el-icon-download"></i> 下载资源
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ResourceDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    resource: {
      type: Object,
      default: () => ({
        id: null,
        name: '',
        uploader: '',
        size: '',
        description: '',
        uploadTime: '',
        url: ''
      })
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      }
    }
  },
  methods: {
    getFileIcon(filename) {
      const extension = filename.split('.').pop().toLowerCase()
      const iconMap = {
        pdf: 'el-icon-document',
        doc: 'el-icon-document',
        docx: 'el-icon-document',
        xls: 'el-icon-document',
        xlsx: 'el-icon-document',
        ppt: 'el-icon-document',
        pptx: 'el-icon-document',
        zip: 'el-icon-folder-opened',
        rar: 'el-icon-folder-opened',
        jpg: 'el-icon-picture',
        jpeg: 'el-icon-picture',
        png: 'el-icon-picture',
        gif: 'el-icon-picture',
        mp4: 'el-icon-video-camera',
        mov: 'el-icon-video-camera',
        mp3: 'el-icon-microphone',
        txt: 'el-icon-tickets'
      }
      return iconMap[extension] || 'el-icon-document'
    },
    formatDate(dateStr) {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
  },
  watch: {
    visible(newVal) {
      this.$emit('update:visible', newVal)
    }
  }
}
</script>

<style scoped>
.resource-detail {
  padding: 0 20px;
}

.detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.file-icon {
  font-size: 60px;
  color: #409EFF;
  margin-right: 20px;
}

.file-info h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.file-meta {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.file-meta span {
  margin-right: 15px;
}

.detail-content h4 {
  color: #303133;
  font-size: 16px;
  margin-bottom: 10px;
}

.description {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
}

.dialog-footer {
  text-align: right;
}
</style>