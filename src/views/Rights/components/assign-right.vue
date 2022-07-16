<template>
  <el-dialog
    title="分配权限"
    :visible="assignRightDialog"
    width="30%"
    ref="dialog"
    @close="$emit('close')"
  >
    <el-tree
      v-loading="loading"
      :data="data"
      ref="eltree"
      show-checkbox
      node-key="id"
      :default-checked-keys="defaultKey"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>
    <el-row type="flex" justify="center">
      <el-button size="small" type="warning" @click="$emit('close')">
        取消
      </el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="small" type="primary" @click="okBtn">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { rightsTreeAPI, assignRightsAPI } from '@/api/rights'
import { getDefaultList } from '@/utils'

export default {
  name: 'AssignRight',
  components: {},
  props: {
    assignRightDialog: {
      type: Boolean,
      default: false
    },
    roleRights: {
      type: Array,
      default: () => []
    },
    roleId: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultKey: [],
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
        this.data = await rightsTreeAPI()
        getDefaultList(this.roleRights, this.defaultKey)
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async okBtn() {
      const keys = [
        ...this.$refs.eltree.getCheckedKeys(),
        ...this.$refs.eltree.getHalfCheckedKeys()
      ].join(',')
      try {
        await assignRightsAPI(this.roleId, { rids: keys })
        this.$message.success('操作成功')
        this.$emit('close')
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss"></style>
