<template>
  <div>
    <BreadCrumb :bread="$route" />
    <my-card>
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
        <el-tab-pane label="动态参数" name="0">动态参数</el-tab-pane>
        <el-tab-pane label="静态属性" name="1">静态属性</el-tab-pane>
      </el-tabs>
    </my-card>
  </div>
</template>

<script>
import {
  getCategoriesAPI,
  getAttributesAPI,
  getAttributesOnlyAPI
} from '@/api/goods'
export default {
  name: 'ParamsIndex',
  components: {},
  data() {
    return {
      catList: [],
      // BUG 暂时写默认值
      cascaderData: [1988, 1989, 2099],
      cascaderprops: {
        label: 'cat_name',
        value: 'cat_id'
      },
      activeName: '0',
      attributesList: [],
      onlyAttributesList: []
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
    // 判断哪一个标签页取值
    getWhich() {
      if (this.activeName === '0') {
        this.getAttributes()
      }
      if (this.activeName === '1') {
        this.getAttributesOnly()
      }
    },
    async getAttributes() {
      try {
        this.attributesList = await getAttributesAPI(this.cascaderData[2])
        this.attributesList.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getAttributesOnly() {
      try {
        console.log(1)
        this.onlyAttributesList = await getAttributesOnlyAPI(
          this.cascaderData[2]
        )
        this.onlyAttributesList.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
      } catch (error) {
        console.log(error)
      }
    },
    cascaderChange() {
      if (this.cascaderData.length !== 3) {
        this.cascaderData = []
        this.$message.error('请选择三级分类')
      } else {
        this.getWhich()
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss"></style>
