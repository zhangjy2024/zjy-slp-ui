<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:8081/file/upload/user/avatar"
      :show-file-list="false"
      :headers="uploadHeaders"
      :on-success="getUploadSuccessHandler"
      :on-error="handleUploadError">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        uploadHeaders: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
      };
    },
    methods: {
      getUploadSuccessHandler() {
        return (response, file, fileList) => {
          this.imageUrl = response.data;
        };
      },
      handleUploadError(err) {
        console.error("上传失败：", err);
        this.$message.error("文件上传失败！");
      },
      
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>