<template>
  <el-aside :width="isCollapse ? '63px' : '300px'">
    <el-button
      class="topBtn"
      type="primary"
      icon="el-icon-d-arrow-right"
      style="width: 100%; font-size: 18px"
      v-if="isCollapse"
      @click="isCollapse = !isCollapse"
    ></el-button>
    <el-button
      v-else
      class="topBtn"
      type="primary"
      icon="el-icon-d-arrow-left"
      style="width: 100%; font-size: 25px"
      @click="isCollapse = !isCollapse"
    >
    </el-button>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#dcdcdc"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            选项1
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            权限列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <i class="el-icon-menu"></i>
            商品列表
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-menu"></i>
            分类参数
          </el-menu-item>
          <el-menu-item index="3-4">
            <i class="el-icon-menu"></i>
            商品分类
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <i class="el-icon-menu"></i>
            订单列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <i class="el-icon-menu"></i>
            数据报表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'AsideIndex',
  components: {},

  data() {
    return { isCollapse: false }
  },
  created() { },
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang='scss'>
.el-aside {
  background-color: gainsboro;
}
.topBtn {
  display: inline-block;
  height: 56px;
}
</style>
