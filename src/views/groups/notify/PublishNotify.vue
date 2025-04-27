<template>
  <!-- 发布通知对话框 -->
  <el-dialog
    title="发布组织通知"
    :visible="dialogVisible"
    width="850px"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form :model="notifyForm" :rules="rules" ref="notifyForm">
      <el-form-item label="通知标题" prop="title">
        <el-input
          v-model="notifyForm.title"
          placeholder="请输入通知标题"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="通知内容" prop="content">
        <el-input
          type="textarea"
          v-model="notifyForm.content"
          :rows="5"
          placeholder="请输入通知内容"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="接收人">
        <el-radio-group v-model="notifyForm.sendToAll">
          <el-radio :label="true">组织全员</el-radio>
          <el-radio :label="false">指定成员</el-radio>
        </el-radio-group>

        <div v-if="!notifyForm.sendToAll" class="member-selector">
          <el-transfer
            v-model="notifyForm.selectedMembers"
            :data="memberOptions"
            :titles="['组织成员', '接收人']"
            filterable
            filter-placeholder="请输入成员姓名"
          >
            <span slot-scope="{ option }">
              <el-avatar :size="24" :src="option.avatar" style="vertical-align: middle; margin-right: 5px;"></el-avatar>
              {{ option.label }}
            </span>
          </el-transfer>
        </div>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button 
        type="primary" 
        @click="handlePublish"
        :loading="publishing"
      >
        发布通知
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PublishNotify',
  props: {
    notifyDialogVisible: { type: Boolean, default: false }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.notifyDialogVisible;
      }
    }
  },
  data() {
    return {
      publishing: false,
      memberOptions: [
        {
          key: 1,
          label: '张三',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        },
        {
          key: 2,
          label: '李四',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        },
        {
          key: 3,
          label: '王五',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        },
        {
          key: 4,
          label: '赵六',
          avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
        }
      ],
      rules: {
        title: [
          { required: true, message: '请输入通知标题', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入通知内容', trigger: 'blur' },
          { min: 5, max: 500, message: '长度在 5 到 500 个字符', trigger: 'blur' }
        ]
      },
      notifyForm: {
        title: '',
        content: '',
        sendToAll: true,
        selectedMembers: []
      },
    }
  },
  methods: {
    handlePublish() {
      this.$refs.notifyForm.validate((valid) => {
        if (valid) {
          this.publishing = true
          // 模拟API调用
          setTimeout(() => {
            this.$message.success('通知发布成功')
            this.$emit('update:notifyDialogVisible', false);
            this.publishing = false;
          }, 1000)
        }
      })
    },
    handleClose() {
      this.$emit('update:notifyDialogVisible', false);
    },
  },
  mounted() {
  }
}
</script>