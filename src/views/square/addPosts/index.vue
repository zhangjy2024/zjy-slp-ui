<template>
  <div>
    <el-page-header @back="goBack" content="发布文章" style="width: 100%; height: 60px; background-color: white;"></el-page-header>
    <div style="display: flex; justify-content: center;">
      <div style="width: calc(100% - 100px); height: calc(100vh - 170px); background-color: white; padding: 20px; margin-top: 20px;">
        <div style="width: 40%; height: 180px;">
          <el-form :model="postsData" label-width="80px">
            <el-form-item label="文章标题">
              <el-input v-model="postsData.title"></el-input>
            </el-form-item>
            <div style="display: flex;">
              <el-form-item label="参与话题">
                <el-select v-model="postsData.topic" placeholder="请选择参与话题">
                  <el-option label="话题一" value="huati1"></el-option>
                  <el-option label="话题二" value="huati2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属圈子">
                <el-select v-model="postsData.circles" placeholder="请选择所属圈子">
                  <el-option label="圈子名称" value="huati1"></el-option>
                  <el-option label="圈子名称" value="huati2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="添加标签">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
          </el-form>
        </div>
        <WangEditorPlus v-model="postsContent" :model="editorModel" height="calc(100% - 260px)"/>
        <el-button @click="release" style="float: right; margin: 20px; background-color: rgba(217, 236, 255);">发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import WangEditorPlus from "@/components/WangEditorPlus/index.vue";

export default {
  components: { WangEditorPlus },
  data() {
    return {
      postsData: {
        title: '',
        topic: '',
        circles: '',
      },
      postsContent: '',
      editorModel: 'edit',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    release() {
      console.log(this.postsContent)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    goBack() {
      this.$router.go(-1);
    }
  },
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-page-header__title, .el-page-header__content {
  display: flex;
  align-items: center;
}
.el-page-header__left {
  padding-left: 15px;
}
</style>