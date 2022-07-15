<template>
  <div class="rolelist-constainer">
    <BreadCrumb :bread="$route" />
    <my-card>
      <el-table
        :data="rightsData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        border
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
      rightsData: []
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
      try {
        this.rightsData = await rightsListAPI()
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
::v-deep.el-table .warning-row {
  background: oldlace;
}

::v-deep .el-table .success-row {
  background: #f0f9eb;
}
</style>
