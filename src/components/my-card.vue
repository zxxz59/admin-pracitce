<template>
  <el-card class="box-card">
    <slot> </slot>
  </el-card>
</template>

<script>
export default {
  name: '',
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
.box-card {
  margin-top: 30px;
  box-shadow: 0 1px rgba(0, 0, 0, 0.15);
}
</style>
