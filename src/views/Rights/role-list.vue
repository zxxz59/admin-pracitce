<template>
  <div class="rolelist-container">
    <BreadCrumb :bread="$route" />
    <my-card>
      <el-row>
        <el-button size="middle" type="primary" @click="roles(0)">
          添加角色
        </el-button>
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
              v-for="item in row.children"
              :key="item.id"
              :class="['borderbottom', index === 0 ? 'bordertop' : '']"
              type="flex"
              align="middle"
            >
              <!-- 一级列表 -->
              <el-col :span="6">
                <el-tag closable @close="closeTag(row, item.id)"
                  >{{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18">
                <!-- 二级列表 -->
                <el-row
                  v-for="item2 in item.children"
                  :key="item2.id"
                  type="flex"
                  align="middle"
                  :class="[index === 0 ? '' : 'bordertop']"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="closeTag(row, item2.id)"
                    >
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级列表 -->
                  <el-col :span="18">
                    <!-- HACK -->
                    <!--,, 开启动画根据ID删除，要把key绑成id不然动画会出现在最后一个 -->
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      type="warning"
                      @close="closeTag(row, item3.id)"
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
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="roles(row.id)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="success"
              icon="el-icon-delete"
              @click="delRoles(row.id)"
            >
              删除
            </el-button>
            <el-button
              size="small"
              type="info"
              icon="el-icon-setting"
              @click="assignBtn(row.children, row.id)"
            >
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- #endregion -->
    </my-card>

    <!-- #region === 添加角色弹出层 -->
    <el-dialog
      :title="isAdd ? '添加' : '编辑'"
      :visible.sync="addDialog"
      width="30%"
      center
      ref="dialog"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-if="addDialog"
      >
        <el-form-item label="角色名称" prop="roleName" style="width: 85%">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" style="width: 85%">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false"> 取 消 </el-button>
        <el-button type="primary" @click="okBtn"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- #endregion -->
    <!-- #region === 分配角色弹出层 -->
    <assign-right
      :assignRightDialog="assignRightDialog"
      :roleRights="roleRights"
      v-if="assignRightDialog"
      @close="closeAssign"
      :roleId="roleId"
    />
    <!-- #endregion -->
  </div>
</template>

<script>
import {
  roleListAPI,
  addRolesAPI,
  delRloesAPI,
  personalRolesAPI,
  editRolesAPI,
  delRights
} from '@/api/rights'
import AssignRight from './components/assign-right.vue'
export default {
  name: 'RoleList',
  components: { AssignRight },
  data() {
    return {
      tableData: [],
      loading: false,
      addDialog: false,
      assignRightDialog: false,
      isAdd: true,
      ruleForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      },
      roleRights: [],
      roleId: null
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
    async addRoles() {
      try {
        await addRolesAPI(this.ruleForm)
        this.$message.success('添加成功')
      } catch (error) {
        console.log(error)
      }
    },
    async editRoles() {
      try {
        await editRolesAPI(this.ruleForm)
        this.$message.success('修改成功')
        this.closeDialog()
        this.ruleForm = {
          roleName: '',
          roleDesc: ''
        }
      } catch (error) {
        console.log(error)
      }
    },
    async roles(id) {
      this.addDialog = true
      if (id) {
        this.isAdd = false
        this.ruleForm = await personalRolesAPI(id)
      } else {
        this.isAdd = true
      }
    },
    async delRoles(id) {
      try {
        await delRloesAPI(id)
        this.$message.success('删除成功')
        this.rightsTree()
      } catch (error) {
        console.log(error)
      }
    },
    async closeTag(row, rightId) {
      try {
        await this.$confirm('确认删除此权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // HACK 跟新思维
        // ,,局部更新
        row.children = await delRights(row.id, rightId)
      } catch (error) {
        console.log(error)
      }
    },
    okBtn() {
      if (this.ruleForm.roleId) {
        this.editRoles()
      } else {
        this.addRoles()
        console.log('add')
      }
      this.closeDialog()
    },
    closeDialog() {
      this.addDialog = false
      this.rightsTree()
    },
    assignBtn(rights, id) {
      this.roleRights = rights
      this.roleId = id
      this.assignRightDialog = true
    },
    closeAssign() {
      this.assignRightDialog = false
      this.rightsTree()
    }
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
