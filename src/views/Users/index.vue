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
              @keyup.enter.native="searchBtn"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchBtn"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="userbtn(0)">添加用户</el-button>
          </el-col>
        </el-row>
        <!-- #endregion -->
        <!-- #region ===表格 -->
        <template>
          <el-table
            :data="users"
            border
            style="width: 100%; margin-top: 20px"
            v-loading="loading"
          >
            <el-table-column type="index" label="#" width="180">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话"> </el-table-column>
            <el-table-column prop="role_name" label="角色"> </el-table-column>
            <el-table-column prop="mg_state" label="状态">
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
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="userbtn(row.id)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="delBtn(row.id)"
                ></el-button>
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  circle
                ></el-button>
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
      </template>
    </my-card>
    <!-- #region === 添加、编辑弹出层 -->
    <el-dialog
      :title="dialogToggle ? '编辑用户' : '添加用户'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width: 85%"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- #endregion -->
  </div>
</template>

<script>
import { getUsersListAPI, editUsersStateAPI, delUserAPI } from '@/api/user'
export default {
  name: 'UserIndex',
  components: {},
  data() {
    return {
      searchText: '',
      users: [],
      page: {
        pagenum: 1,
        pagesize: 5
      },
      total: null, // 总数量
      loading: false,
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      dialogVisible: false,
      // 编辑用户为true,添加用户为false
      dialogToggle: false,
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [],
        mobile: []
      }
    }
  },
  created() {
    this.getUsersList()
  },

  methods: {
    async getUsersList() {
      try {
        this.loading = true
        const data = await getUsersListAPI({
          ...this.page,
          query: this.searchText
        })
        this.total = data.total
        this.users = data.users
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async switchChange(id, type) {
      try {
        await editUsersStateAPI(id, type)
      } catch (error) {
        console.log(error)
      }
    },
    async delBtn(id) {
      try {
        await this.$confirm('此操作将永久删除人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })

        await delUserAPI(id)
        this.getUsersList()
      } catch (error) {
        console.log(error)
      }
    },
    async userbtn(id) {
      this.dialogVisible = true
      if (id) {
        this.dialogToggle = true
      } else {
        this.dialogToggle = false
      }
    },
    handleSizeChange(val) {
      this.page.pagesize = val
      this.getUsersList()
    },
    handleCurrentChange(val) {
      this.page.pagenum = val
      this.getUsersList()
    },
    searchBtn() {
      this.getUsersList()
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss"></style>
