<template>
  <div class="resource-item">
    <div class="resource-icon">
      <i :class="getFileIcon(resource.name)"></i>
    </div>
    <div class="resource-info">
      <p class="resource-name" :title="resource.name">{{ resource.name }}</p>
      <p class="resource-meta">
        <span class="uploader">{{ resource.uploader }}</span>
        <span class="size">{{ resource.size }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceItem',
  props: {
    resource: {
      type: Object,
      required: true
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
    }
  }
}
</script>

<style scoped>
.resource-item {
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.resource-item:hover {
  background-color: #f0f7ff;
  transform: translateY(-3px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.resource-icon {
  font-size: 40px;
  color: #409EFF;
  margin-bottom: 10px;
}

.resource-info {
  width: 100%;
  text-align: center;
}

.resource-name {
  margin: 0;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resource-meta {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #909399;
  display: flex;
  justify-content: space-between;
}
</style>