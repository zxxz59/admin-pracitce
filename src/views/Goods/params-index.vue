<template>
  <div>
    <BreadCrumb :bread="$route" />
    <my-card style="min-height: 500px">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        style="margin-bottom: 20px"
      >
      </el-alert>
      <!-- 选择商品分类 -->
      <el-row>
        <span>选择商品分类: </span>
        <el-cascader
          v-model="cascaderData"
          :options="catList"
          @change="cascaderChange"
          :props="cascaderprops"
          :show-all-levels="true"
          style="margin-bottom: 20px"
        ></el-cascader>
      </el-row>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="cascaderChange">
        <el-tab-pane label="动态参数" name="0">
          <params-table
            v-if="activeName === '0'"
            :activeName="activeName - 0"
            :cascaderData="cascaderData"
          />
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="1">
          <params-table
            v-if="activeName === '1'"
            :activeName="activeName - 0"
            :cascaderData="cascaderData"
          />
        </el-tab-pane>
      </el-tabs>
    </my-card>
  </div>
</template>

<script>
import { getCategoriesAPI } from '@/api/goods'
import ParamsTable from './components/params-table.vue'
export default {
  name: 'ParamsIndex',
  components: { ParamsTable },
  data() {
    return {
      catList: [],
      // BUG 暂时写默认值
      cascaderData: [1988, 1989, 2099],
      cascaderprops: {
        label: 'cat_name',
        value: 'cat_id'
      },
      activeName: '2'
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        this.catList = await getCategoriesAPI()
      } catch (error) {
        console.log(error)
      }
    },
    cascaderChange() {
      if (this.cascaderData.length !== 3) {
        this.cascaderData = []
        this.$message.error('请选择三级分类')
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss"></style>
