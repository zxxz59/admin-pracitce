<template>
  <div class="UserIndex-container">
    <BreadCrumb :bread="$route" />
    <!-- 内容 -->
    <my-card>
      <template>
        <!-- #region === nav -->
        <el-row :gutter="20" style="height: 50px" type="flex" align="middle">
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="searchText"
              @keyup.enter.native="getGoods"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getGoods"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              @click="$router.push({ name: 'addgoods' })"
              >添加商品</el-button
            >
          </el-col>
        </el-row>
        <!-- #endregion -->
        <!-- #region ===表格 -->
        <template>
          <el-table
            :data="goods"
            border
            style="width: 100%; margin-top: 20px"
            v-loading="loading"
            :row-class-name="tableRowClassName"
            class="tableclass"
          >
            <el-table-column type="index" label="#" width="50" hight="25">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="550">
            </el-table-column>
            <el-table-column
              prop="goods_price"
              label="商品价格（元）"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量">
            </el-table-column>
            <el-table-column prop="add_time" label="创建时间">
              <template v-slot="{ row }">
                {{ row.add_time | dealTime }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190">
              <template v-slot="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-edit"
                  @click="editbtn(row.goods_id)"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="delBtn(row.goods_id)"
                >
                  删除
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
            :page-sizes="[10, 20, 50]"
            :page-size="page.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
        <!-- #endregion -->
      </template>
    </my-card>
  </div>
</template>

<script>
import { getGoodsAPI, delGoodsAPI } from '@/api/goods'
export default {
  name: 'GoodsIndex',
  components: {},
  data() {
    return {
      goods: [],
      searchText: '',
      page: {
        pagesize: 10,
        pagenum: 1
      },
      total: 0, // 总数量
      loading: false
    }
  },
  created() {
    this.getGoods()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    },
    async getGoods() {
      this.loading = true
      try {
        const data = await getGoodsAPI({
          ...this.page,
          query: this.searchText
        })
        this.goods = data.goods
        this.page.pagenum = data.pagenum - 0
        this.total = data.total
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async delBtn(id) {
      try {
        await this.$confirm('确认删除此商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delGoodsAPI(id)
        this.getGoods()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    editbtn(id) {
      this.$router.push({
        name: 'addgoods',
        query: {
          goodsId: id
        }
      })
    },
    handleSizeChange(val) {
      this.page.pagesize = val
      this.getGoods()
    },
    handleCurrentChange(val) {
      this.page.pagenum = val
      this.getGoods()
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
