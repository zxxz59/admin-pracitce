<template>
  <div class="login-container">
    <div class="form-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username" style="width: 85%">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入账户"
            prefix-icon="el-icon-user"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 85%">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="middle"
            type="primary"
            style="width: 100px"
            @click="loginFn"
          >
            登录
          </el-button>
          <el-button
            size="middle"
            type="info"
            style="width: 100px"
            @click="reset"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
export default {
  name: '',
  components: {},
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() { },
  methods: {
    async loginFn() {
      try {
        await this.$refs.loginForm.validate()
        // TODO
        const a = await loginAPI(this.ruleForm)
        console.log(a)
        this.$router.push('/home')
        this.$message.success('登录成功')
      } catch (error) {
        this.$message.error('error')
      }
    },
    reset() {
      this.$refs.loginForm.resetFields()
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/image/run.jpg') no-repeat 0 0/100vw 100vh ;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    padding: 30px 15px;
    box-sizing: border-box;
    width: 450px;
    height: 240px;
    background-color: #fff;
    opacity: 0.8;
    border-radius: 10px;
  }
}
</style>
