<template>
  <div class="register-container">
    <div class="register-form">
      <h2 class="form-title">注册新账号</h2>
      
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px">
        <!-- 邮箱输入 -->
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="registerForm.email" 
            placeholder="请输入邮箱地址"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        
        <!-- 验证码输入 -->
        <el-form-item label="验证码" prop="code">
          <div class="code-input">
            <el-input 
              v-model="registerForm.code" 
              placeholder="请输入验证码"
              prefix-icon="el-icon-lock"
            ></el-input>
            <el-button 
              type="primary" 
              :disabled="isCountingDown"
              @click="sendVerificationCode"
              class="send-code-btn"
            >
              {{ countdownText }}
            </el-button>
          </div>
        </el-form-item>
        
        <!-- 用户名输入 -->
        <el-form-item label="登录名" prop="username">
          <el-input 
            v-model="registerForm.username" 
            placeholder="请输入登录名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        
        <!-- 密码输入 -->
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="registerForm.password" 
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-key"
            show-password
          ></el-input>
        </el-form-item>
        
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button 
            type="primary" 
            @click="submitRegister" 
            class="register-btn"
            :loading="isRegistering"
          >
            立即注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    // 密码强度验证
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'));
      } else {
        callback();
      }
    };
    
    return {
      // 注册表单数据
      registerForm: {
        email: '',
        code: '',
        username: '',
        password: ''
      },
      // 表单验证规则
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      // 验证码倒计时
      countdown: 60,
      isCountingDown: false,
      // 注册状态
      isRegistering: false
    }
  },
  computed: {
    countdownText() {
      return this.isCountingDown ? `${this.countdown}秒后重新获取` : '获取验证码';
    }
  },
  methods: {
    // 发送验证码
    sendVerificationCode() {
      this.$refs.registerForm.validateField('email', (valid) => {
        if (!valid) {
          this.$message.error('请输入正确的邮箱地址');
          return;
        }
        
        // 模拟发送验证码
        this.isCountingDown = true;
        this.startCountdown();
        
        // 实际项目中这里调用API发送验证码
        this.$message.success(`验证码已发送至 ${this.registerForm.email}`);
      });
    },
    
    // 开始倒计时
    startCountdown() {
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
          this.isCountingDown = false;
          this.countdown = 60;
        }
      }, 1000);
    },
    
    // 提交注册
    submitRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.isRegistering = true;
          
          // 模拟注册请求
          setTimeout(() => {
            this.isRegistering = false;
            this.$message.success('注册成功！');
            // 实际项目中这里跳转到登录页或其他页面
          }, 1500);
        }
      });
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-form {
  width: 450px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
}

.code-input {
  display: flex;
}

.send-code-btn {
  margin-left: 10px;
  width: 120px;
}

.register-btn {
  width: 100%;
  margin-top: 10px;
}
</style>