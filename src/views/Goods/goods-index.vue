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
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
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
                  @click="roleBtn(row)"
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
  </div>
</template>

<script>
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
        ]
      },
      // role
      roleDialog: false,
      roleList: null,
      roleValue: '',
      user: null
    }
  },
  created() {},

  methods: {},
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
