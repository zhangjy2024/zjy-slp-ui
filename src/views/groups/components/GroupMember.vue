<template>
  <div>
    <el-table
      :data="groupMembers"
      style="width: 100%; height: calc(100% - 60px);"
    >
      <el-table-column
        prop="createdDate"
        label="加入日期"
        width="110"
        :formatter="formatDate">
      </el-table-column>
      <el-table-column
        prop="memberName"
        label="姓名"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="memberType"
        label="成员身份"
        width="90"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.memberType === 'ADMIN' ? 'primary' : 'success'"
            disable-transitions>{{ getMemberTypeText(scope.row.memberType) }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GroupMember',
  props: {
    groupMembers: { type: Array }
  },
  data() {
    return {
      
    }
  },
  methods: {
    formatDate(row) {
      return row.createdDate ? row.createdDate.split(' ')[0] : '';
    },
    getMemberTypeText(value) {
      const mapping = [
        { text: '创建者', value: 'ADMIN' },
        { text: '成员', value: 'USER' }
      ];
      const found = mapping.find(item => item.value === value);
      return found ? found.text : value;
    }
  }
}
</script>