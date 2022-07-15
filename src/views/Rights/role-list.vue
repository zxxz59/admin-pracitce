<template>
  <div class="rolelist-container">
    <BreadCrumb :bread="$route" />
    <my-card>
      <el-row>
        <el-button size="middle" type="primary">添加角色</el-button>
      </el-row>

      <!-- #region ===表单  -->
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 30px"
        border
        v-loading="loading"
      >
        <el-table-column type="expand" label="#">
          <template v-slot="{ row }">
            <el-row
              v-for="(item, index) in row.children"
              :key="index"
              :class="['borderbottom', index === 0 ? 'bordertop' : '']"
              type="flex"
              align="middle"
            >
              <!-- 一级列表 -->
              <el-col :span="6">
                <el-tag>{{ item.authName }} </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <!-- 二级列表 -->
                <el-row
                  v-for="(item2, index) in item.children"
                  :key="index"
                  type="flex"
                  align="middle"
                  :class="[index === 0 ? '' : 'bordertop']"
                >
                  <el-col :span="6">
                    <el-tag type="success"> {{ item2.authName }} </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级列表 -->
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3, index) in item2.children"
                      :key="index"
                      closable
                      type="warning"
                      @close="closeTag"
                    >
                      {{ item3.authName }}
                      <i class="el-icon-caret-right"></i>
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template>
            <el-button size="small" type="primary" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button size="small" type="success" icon="el-icon-delete">
              删除
            </el-button>
            <el-button size="small" type="info" icon="el-icon-setting">
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- #endregion -->
    </my-card>
  </div>
</template>

<script>
import { roleListAPI } from '@/api/rights'
export default {
  name: 'RoleList',
  components: {},
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  created() {
    this.rightsTree()
  },
  methods: {
    async rightsTree() {
      this.loading = true
      try {
        this.tableData = await roleListAPI()
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    closeTag() {}
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.el-row {
  margin: 10px;
}
.el-tag {
  margin: 5px;
}
.bordertop {
  border-top: 1px solid #dcdcdc;
}
.borderbottom {
  border-bottom: 1px solid #dcdcdc;
}
:deep(.demo-table-expand) {
  font-size: 0;
}
:deep(.demo-table-expand label) {
  width: 90px;
  color: #99a9bf;
}
:deep(.demo-table-expand .el-form-item) {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
