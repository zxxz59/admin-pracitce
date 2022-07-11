<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><slot name="two"></slot></el-breadcrumb-item>
    <el-breadcrumb-item><slot name="three"></slot></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  components: {},
  data() {
    return {}
  },
  created() { },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang='scss'>
</style>
