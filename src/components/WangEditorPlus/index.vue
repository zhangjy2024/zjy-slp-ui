<!--WangEditor封装-->
<template>
  <div class="editor-plus" :class="{ 'no-border': model === 'read' }" :style="{ height: height }">
    <!-- 工具栏 -->
    <Toolbar
      v-show="model==='edit'"
      style="border-bottom: 1px solid #eff0f0"
      :editor="editor"
      class="custom-wang-editor"
      :defaultConfig="toolbarConfig"
    />

    <!-- 编辑器 -->
    <Editor
      style="flex: 1; overflow-y: auto; min-height: 300px;"
      :defaultConfig="editorConfig"
      v-model="html"
      @onCreated="onCreated"
      @onChange="updateValue"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  name: "WangEditorPlus",
  props: {
    value: { type: String, default: ''},
    model: { type: String, default: 'read' },
    height: { type: String, default: '100%' },
  },
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: this.value, // 组件内部属性存储内容
      toolbarConfig: {
        excludeKeys: 'group-video',
      },
      editorConfig: {
        readOnly: this.model==='read',
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            base64LimitSize: 1024*1024*1024
          }
        }
      }
    }
  },
  watch: {
    value(newValue) {
      // 当父组件的 value 更新时，同步更新 html
      this.html = newValue;
    },
    // 监听编辑模式变更
    model(newValue) {
      console.log(newValue);
      this.editorConfig.readOnly = newValue==='read';
      if (newValue==='read'){
        this.editor.disable();
      } else {
        this.editor.enable();
      }
    },
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },

    // 更新v-model绑定的值
    updateValue(editor) {
      // 在 Vue 中，v-model 会自动处理 input 事件，触发 input 事件时，Vue 会自动将这个事件与v-model的值关联起来
      this.$emit('input', editor.getHtml());
    }
  },
  mounted() {
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
}
</script>

<style>
.editor-plus{
  border: 2px solid #eff0f0;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  flex-direction: column;
}
.editor-plus.no-border {
  border: none !important;  /* 在read模式下去掉边框 */
}

.custom-wang-editor{
  ::v-deep .w-e-bar-divider{
    display: none;
  }
}
</style>