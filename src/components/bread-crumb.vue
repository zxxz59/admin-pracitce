<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ bread.meta.before }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ bread.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  components: {},
  props: {
    bread: {
      type: [String, Object],
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss"></style>
