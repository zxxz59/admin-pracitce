<template>
  <div>
    <BreadCrumb>
      <template #two>用户管理</template>
      <template #three>用户列表</template>
    </BreadCrumb>
    <el-image
      style="width: 100px; height: 100px"
      :src="require('@/assets/image/welcome.jpg')"
      :fit="fit"
    ></el-image>
  </div>
</template>

<script>
export default {
  name: 'UserIndex',
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
