<template>
  <el-aside :width="isCollapse ? '63px' : '240px'">
    <template>
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
    </template>

    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#dcdcdc"
      unique-opened
      router
    >
      <el-submenu
        :index="item.id + ''"
        v-for="(item, index) in menmusList"
        :key="index"
      >
        <template slot="title">
          <i :class="icon(item.path)"></i>
          <span slot="title">{{ item.authName }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="obj.path + ''"
            v-for="(obj, index) in item.children"
            :key="index"
          >
            <i class="el-icon-menu"></i>
            {{ obj.authName }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { getMenusListAPI } from '@/api/permission'
import { deepFind } from '@/utils'
export default {
  name: 'AsideIndex',

  data() {
    return {
      isCollapse: false,
      menmusList: [],
      routers: []
    }
  },
  created() {
    this.getMenusList()
    this.routers = this.$router.options.routes
  },
  methods: {
    async getMenusList() {
      this.menmusList = await getMenusListAPI()
    },
    icon(path) {
      return deepFind(this.routers, path)
    }
  },
  computed: {},
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.el-aside {
  background-color: gainsboro;
}
.topBtn {
  display: inline-block;
  height: 56px;
}
</style>
