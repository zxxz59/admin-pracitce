<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <el-row type="flex" align="middle" style="height: 60px">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <img src="~@/assets/image/eye.png" alt="" style="width: 50px" />
              &nbsp; &nbsp;
              <i style="font-size: 18px">代码敲敲有限公司</i>
            </div>
          </el-col>
          <el-col :span="8">
            <el-row type="flex" align="middle" justify="end">
              <el-col :span="4">
                {{ username }}
              </el-col>
              <el-col :span="4">
                <el-button type="danger" size="samll" @click="logout"
                  >退出</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <aside-index />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideIndex from './components/aside-index.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeIndex',
  components: { AsideIndex },
  data() {
    return {}
  },
  created() {},
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  watch: {}
}
</script>

<style scoped lang="scss">
.home-container {
  height: 100vh;

  .el-header {
    background: url('@/assets/image/navbar.jpg') no-repeat 0 60%/100%;
  }

  .el-main {
    background-color: #eaedf1;
  }
}
</style>
