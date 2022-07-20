<template>
  <div>
    <BreadCrumb :bread="$route" />
    <my-card>
      <!-- #region === nav -->
      <el-row :gutter="20" style="height: 50px" type="flex" align="middle">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="searchText"
            @keyup.enter.native="searchBtn"
          >
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- #endregion -->
      <!-- #region ===表格 -->
      <template>
        <el-table
          :data="orders"
          border
          style="width: 100%; margin-top: 20px"
          v-loading="loading"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="index" label="#" width="50"> </el-table-column>
          <el-table-column prop="username" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="mg_state" label="状态" width="150">
            <template v-slot="{ row }">
              <el-switch
                v-model="row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(row.id, row.mg_state)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="primary" icon="el-icon-edit" circle>
                {{ row.id }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- #endregion -->
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
  </div>
</template>

<script>
export default {
  name: 'OrderIndex',
  components: {},
  data() {
    return {
      loading: false,
      searchText: '',
      orders: [],
      page: {
        pagenum: 1,
        pagesize: 5
      },
      total: null // 总数量
    }
  },
  created() {},
  methods: {
    async getOrdersList() {},
    async searchBtn() {},
    handleSizeChange(val) {
      this.page.pagesize = val
      this.getOrdersList()
    },
    handleCurrentChange(val) {
      this.page.pagenum = val
      this.getOrdersList()
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
</style>
