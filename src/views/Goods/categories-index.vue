<template>
  <div>
    <BreadCrumb :bread="$route" />
    <my-card>
      <el-button type="success" size="middle" @click="add">
        添加分类
      </el-button>
      <el-table
        :data="categories"
        row-key="cat_id"
        border
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        style="width: 100%; margin-top: 20px; min-height: 350px"
        v-loading="loading"
        :row-class-name="tableRowClassName"
        class="tableclass"
      >
        <el-table-column type="index" label="#" width="50" hight="25">
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="250">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" width="250">
          <template>
            <i class="el-icon-success" style="color: #3eaf7c"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序" width="250">
          <template v-slot="{ row }">
            <el-tag v-if="row.cat_level === 0" type="success">等级一</el-tag>
            <el-tag v-else-if="row.cat_level === 1" type="info">等级二</el-tag>
            <el-tag v-else type="warning">等级三</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editbtn(row.cat_id)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="delBtn(row.cat_id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- #region === 分页栏 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pagenum"
          :page-sizes="[5, 10, 20]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- #endregion -->
    </my-card>
    <!-- #region === 添加分类弹出层 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="50%"
      center
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        class="demo-addForm"
      >
        <el-form-item label="分类名称" prop="cat_name" style="width: 85%">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            ref="addCascader"
            v-model="value"
            :options="addChoose"
            :props="addprops"
            @change="addCascaderChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBtn"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- #endregion -->
  </div>
</template>

<script>
import {
  getCategoriesDetailAPI,
  delCategoriesAPI,
  addCategoriesAPI
} from '@/api/goods'
export default {
  name: 'CategoriesIndex',
  components: {},
  data() {
    return {
      categories: [],
      loading: false,
      total: 0,
      page: {
        pagenum: 1,
        pagesize: 5
      },
      // 添加分类
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      addDialogVisible: false,
      addChoose: [],
      addprops: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        checkStrictly: true
      },
      value: []
    }
  },
  created() {
    this.getCategoriesDetail()
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    },
    async getCategoriesDetail(type) {
      this.loading = true
      try {
        const res = await getCategoriesDetailAPI({ ...this.page, type })
        this.page.pagenum = res.pagenum + 1
        this.page.pagesize = res.pagesize
        this.total = res.total
        this.categories = res.result
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    editbtn() {},
    async delBtn(id) {
      try {
        await delCategoriesAPI(id)
        this.$message.success('删除成功')
        this.getCategoriesDetail()
      } catch (error) {
        console.log(error)
      }
    },
    async add() {
      this.addDialogVisible = true
      try {
        this.addChoose = await getCategoriesDetailAPI({ type: [2] })
      } catch (error) {
        console.log(error)
      }
    },
    async addBtn() {
      try {
        await addCategoriesAPI(this.addForm)
        this.$message.success('添加成功')
        this.addDialogVisible = false
        this.getCategoriesDetail()
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange(val) {
      this.page.pagesize = val
      this.getCategoriesDetail()
    },
    handleCurrentChange(val) {
      this.page.pagenum = val
      this.getCategoriesDetail()
    },
    addCascaderChange() {
      const node = this.$refs.addCascader.getCheckedNodes()[0].data
      this.addForm.cat_pid = node.cat_pid
      this.addForm.cat_level = node.cat_level + 1
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
:deep(.el-table .warning-row) {
  background: oldlace;
}

:deep(.el-table .success-row) {
  background: #f0f9eb;
}
:deep(.el-table) {
  font-size: 14px;
}

</style>
