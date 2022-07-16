<template>
  <div>
    <BreadCrumb :bread="$route" />
    <el-switch
      v-model="windowValue"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="视窗模式"
      style="margin-top: 20px"
    >
    </el-switch>
    <my-card :class="windowValue ? 'rolelist-constainer' : ''">
      <el-table
        :data="rightsData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        border
        v-loading="loading"
      >
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="300">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="300">
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="{ row }">
            <el-tag type="danger" v-if="row.level === '0'">等级一</el-tag>
            <el-tag type="success" v-else-if="row.level === '1'">等级二</el-tag>
            <el-tag type="warning" v-else-if="row.level === '2'">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </my-card>
    <el-backtop :bottom="150">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        <i class="el-icon-caret-top"></i>
        up
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { rightsListAPI } from '@/api/rights'
export default {
  name: 'RightList',
  components: {},
  data() {
    return {
      rightsData: [],
      loading: false,
      windowValue: false
    }
  },
  created() {
    this.rightsList()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    },
    async rightsList() {
      this.loading = true
      try {
        this.rightsData = await rightsListAPI()
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
// 暂测子组件滚动加el返回组件没用
.rolelist-constainer {
  height: 100vh;
  overflow-y: auto;
}
:deep(.el-table .warning-row) {
  background: oldlace;
}

:deep(.el-table .success-row) {
  background: #f0f9eb;
}
</style>
