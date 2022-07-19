<template>
  <div>
    <el-button
      size="middle"
      type="primary"
      v-if="activeName === 0"
      @click="addDialogVisible = true"
    >
      添加参数
    </el-button>
    <el-button
      size="middle"
      type="warning"
      v-else
      @click="addDialogVisible = true"
    >
      添加属性
    </el-button>
    <el-table
      :data="attributesList"
      style="width: 100%; margin-top: 30px"
      border
    >
      <el-table-column type="expand" label="#">
        <template v-slot="{ row }">
          <el-row type="flex">
            <el-tag
              :key="index"
              v-for="(item, index) in row.attr_vals"
              closable
              :disable-transitions="false"
              @close="handleClose(item)"
            >
              {{ item }}
            </el-tag>
            <!-- HACK -->
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag
            </el-button>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="attr_name"> </el-table-column>
      <el-table-column label="操作" prop="desc">
        <template v-slot="{ row }">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="editBtn(row.cat_id, row.attr_id)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="success"
            icon="el-icon-delete"
            @click="delBtn(row.cat_id, row.attr_id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- #region === 添加对话框 -->
    <el-dialog
      title="添加"
      :visible.sync="addDialogVisible"
      width="30%"
      center
      v-if="addDialogVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="输入名称" prop="attr_name" style="width: 85%">
          <el-input v-model="ruleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消 </el-button>
        <el-button type="primary" @click="addBtn" v-if="this.ruleForm.attr_id">
          确 定
        </el-button>
        <el-button type="primary" @click="editOkBtn" v-else> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- #endregion -->
    <!-- #region === 编辑对话框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="30%"
      center
      v-if="editDialogVisible"
    >
      <el-form
        :model="editruleForm"
        :rules="rules"
        ref="editruleForm"
        label-width="100px"
      >
        <el-form-item label="输入名称" prop="attr_name" style="width: 85%">
          <el-input v-model="editruleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消 </el-button>
        <el-button type="primary" @click="editOkBtn"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- #endregion -->
  </div>
</template>

<script>
import {
  delAttributeAPI,
  getAttributesAPI,
  getAttributesOnlyAPI,
  addAttributeAPI,
  getAttributeOneAPI,
  editAttributeOneAPI
} from '@/api/goods'
export default {
  name: 'ParamsTable',
  components: {},
  props: {
    activeName: {
      type: Number,
      default: 0
    },
    cascaderData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 标签输入框的值
      inputValue: '',
      // 标签输入框是否显现
      inputVisible: false,
      // 遍历数组
      attributesList: [],
      // 添加弹出框
      addDialogVisible: false,
      // 编辑弹出框
      editDialogVisible: false,
      // 弹出框的值
      ruleForm: {
        attr_name: ''
      },
      editruleForm: {
        attr_name: ''
      },
      rules: {
        attr_name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      editrules: {
        attr_name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getWhich()
  },
  methods: {
    // 判断哪一个标签页取值
    getWhich() {
      if (this.activeName === 0) {
        this.getAttributes()
      }
      if (this.activeName === 1) {
        this.getAttributesOnly()
      }
    },
    async getAttributes() {
      try {
        this.attributesList = await getAttributesAPI(this.cascaderData[2])
        this.attributesList.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getAttributesOnly() {
      try {
        console.log(1)
        this.attributesList = await getAttributesOnlyAPI(this.cascaderData[2])
        this.attributesList.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
      } catch (error) {
        console.log(error)
      }
    },
    async addBtn() {
      const type = this.activeName ? 'only' : 'many'
      try {
        await addAttributeAPI(this.cascaderData[2], {
          attr_sel: type,
          attr_name: this.ruleForm.attr_name
        })
        this.getWhich()
        this.$message.success('添加成功')
        this.addDialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    // [ ]
    async delBtn(id, attrid) {
      try {
        await this.$confirm('确认删除此商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delAttributeAPI(id, attrid)
        this.$message.success('删除成功')
        this.getWhich()
      } catch (error) {
        console.log(error)
      }
    },
    async editBtn(id, attrid) {
      this.editDialogVisible = true
      try {
        const type = this.activeName ? 'only' : 'many'
        this.editruleForm = await getAttributeOneAPI(id, attrid, {
          attr_sel: type
        })
      } catch (error) {
        console.log(error)
      }
    },
    async editOkBtn() {
      try {
        await editAttributeOneAPI(
          this.editruleForm.cat_id,
          this.editruleForm.attr_id,
          this.editruleForm
        )
        this.getWhich()
        this.$message.success('编辑成功')
        this.editDialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    handleClose(item) {
      console.log(item)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(row) {
      if (this.inputValue) {
        row.attr_vals.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
:deep(.el-table) {
  font-size: 14px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
