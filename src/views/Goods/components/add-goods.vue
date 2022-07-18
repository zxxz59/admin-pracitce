<template>
  <div>
    <BreadCrumb :bread="$route" />
    <my-card>
      <!-- 提示 -->
      <el-alert title="添加商品" type="info" show-icon center></el-alert>
      <!-- 进度条 -->
      <el-steps
        :space="200"
        :active="stepActive - 0"
        finish-status="success"
        align-center
        class="step"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- #region === 标签页 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-tabs
          :tab-position="'left'"
          style="min-height: 400px"
          v-model="stepActive"
          :before-leave="toggleTabs"
        >
          <el-tab-pane name="0" label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="ruleForm.goods_cat"
                :options="catList"
                @change="cascaderChange"
                :props="cascaderprops"
                :show-all-levels="false"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="1" label="商品参数">
            <el-form-item
              :label="item.attr_name"
              prop="attrs"
              v-for="item in attributesList"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals" size="mini">
                <el-checkbox
                  :label="item2"
                  v-for="(item2, index) in item.attr_vals"
                  :key="index"
                  border
                >
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品属性">
            <el-form-item
              :label="item.attr_name"
              v-for="(item, index) in onlyAttributesList"
              :key="index"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品图片">定时任务</el-tab-pane>
          <el-tab-pane name="4" label="商品内容">角色管理</el-tab-pane>
        </el-tabs>
      </el-form>
      <!-- #endregion -->
    </my-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import {
  getCategoriesAPI,
  getAttributesAPI,
  getAttributesOnlyAPI
} from '@/api/goods'
export default {
  name: 'AddGoods',
  components: {},
  data() {
    return {
      stepActive: 0,
      catList: [],
      ruleForm: {
        goods_name: '',
        // BUG 暂时写固定值
        goods_cat: [1988, 1989, 2099],
        goods_price: 0,
        goods_number: 1,
        goods_weight: 0,
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品类别', trigger: 'blur' }
        ]
      },
      cascaderprops: {
        label: 'cat_name',
        value: 'cat_id'
      },
      attributesList: [],
      onlyAttributesList: []
    }
  },
  created() {
    this.getCategories()
    console.log(request)
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
      if (this.ruleForm.goods_cat.length !== 3) {
        this.ruleForm.goods_cat = []
      }
    },
    toggleTabs(activeName, oldActiveName) {
      if (activeName === '1') {
        if (this.ruleForm.goods_cat.length !== 0) {
          this.getAttributes()
          return true
        } else {
          this.$message.error('请先选择商品分类')
          return false
        }
      }
      if (activeName === '2') {
        this.getAttributesOnly()
        return true
      }
    },
    async getAttributes() {
      try {
        this.attributesList = await getAttributesAPI(this.ruleForm.goods_cat[2])
        this.attributesList.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getAttributesOnly() {
      try {
        this.onlyAttributesList = await getAttributesOnlyAPI(
          this.ruleForm.goods_cat[2]
        )
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.step {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  color: cadetblue;
}
:deep(.el-step__title) {
  font-size: 12px;
  line-height: 30px;
}
:deep(.el-form .el-form-item__label) {
  font-weight: 400;
}
:deep(.el-checkbox.is-bordered.is-checked) {
  margin: 0;
  margin-right: 10px;
}
</style>
