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
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchBtn"
            ></el-button>
          </el-input>
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
          <el-table-column prop="order_number" label="订单编号">
          </el-table-column>
          <el-table-column prop="order_price" label="订单价格">
          </el-table-column>
          <el-table-column prop="pay_status" label="是否付款">
            <template v-slot="{ row }">
              <el-tag type="danger" effect="dark" v-if="row.pay_status === '0'">
                未支付
              </el-tag>
              <el-tag type="success" effect="dark" v-else> 已支付 </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货"> </el-table-column>
          <el-table-column prop="create_time" label="下单时间">
            <template v-slot="{ row }">
              {{ row.create_time | dealTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="editAddress(row.order_id)"
              >
                修改收获地址
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
    <!-- #region === 弹出对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-cascader v-model="value" :options="options"></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okBtn"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- #endregion -->
  </div>
</template>

<script>
import { getOrdersListAPI } from '@/api/orders'
import city from '@/utils/city_element'
export default {
  name: 'OrderIndex',
  components: {},
  data() {
    return {
      dialogVisible: false,
      loading: false,
      searchText: '',
      orders: [],
      page: {
        pagenum: 1,
        pagesize: 5
      },
      total: null, // 总数量
      options: [],
      value: []
    }
  },
  created() {
    this.getOrdersList()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    },
    async getOrdersList() {
      this.loading = true
      try {
        const data = await getOrdersListAPI({
          ...this.page,
          query: this.searchText
        })
        this.page.pagenum = data.pagenum - 0
        this.total = data.total
        this.orders = data.goods
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    searchBtn() {
      this.$message.error('服务器繁忙，稍后重试')
    },
    handleSizeChange(val) {
      this.page.pagesize = val
      this.getOrdersList()
    },
    handleCurrentChange(val) {
      this.page.pagenum = val
      this.getOrdersList()
    },
    editAddress() {
      this.dialogVisible = true
      this.options = city
    },
    okBtn() {
      this.dialogVisible = false
      this.$message.warning('该地区暂时无法发货')
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
