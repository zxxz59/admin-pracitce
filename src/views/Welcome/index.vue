<template>
  <div class="welcome-container">
    <el-row type="flex" align="middle" justify="center">
      <el-image
        style="width: 50%; height: 50%"
        :src="require('@/assets/image/welcome.png')"
        fit="contain"
      ></el-image>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WelcomeIndex',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.welcome-container {
  .el-row {
    height: 600px;
  }
}
</style>
