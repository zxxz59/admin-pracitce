<template>
  <div>
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
          <el-button size="small" type="primary" icon="el-icon-edit">
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
          <el-button size="small" type="info" icon="el-icon-setting">
            {{ row }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  delAttributeAPI,
  getAttributesAPI,
  getAttributesOnlyAPI
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
      inputValue: '',
      inputVisible: false,
      attributesList: []
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
