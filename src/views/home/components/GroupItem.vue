<template>
  <div>
    <div style="position: relative;display: flex; justify-content: center;margin-top: 5px;">
      <div class="gradient-box" style="position: absolute; z-index: 2;"></div>
      <img src="../img/组织海报图.jpg" alt="组织海报图" style="width: 98%;height: 150px; object-fit: cover; position: absolute;">
      <img src="../img/组织头像.png" alt="组织头像" style="width: 70px;height: 70px; object-fit: cover;position: absolute; top: 60px; left: 15px; z-index: 99;border: 10px solid rgb(220, 240, 255, 0.5);border-radius: 5%;">
      <h1 style="position: absolute; z-index: 20;top: 75px;left: 110px;">原神，启动！</h1>
      <p style="position: absolute; z-index: 20; top: 110px;left: 112px;">欢迎加入原神社区</p>
    </div>
    <div class="group-content" style="width: 100%; height: 200px; overflow: hidden; overflow-y: auto;">
      <el-tabs style="width: 95%;" v-model="activeName" type="card" class="tabs">
        <el-tab-pane label="组织简介" name="groupSummary">
          <el-descriptions class="margin-top" :column="3" :border="true">
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                创建者
              </template>
              提瓦特之神
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
              </template>
              18100000000
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                标签
              </template>
              <el-tag size="small" style="margin: 2px 5px;">开发团队</el-tag>
              <el-tag size="small" style="margin: 2px 5px;">闲聊</el-tag>
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-office-building"></i>
                联系地址
              </template>
              江苏省苏州市吴中区吴中大道 1188 号
            </el-descriptions-item>
            <el-descriptions-item :span="3">
              <template slot="label">
                <i class="el-icon-office-building"></i>
                组织简介
              </template>
              滴滴滴滴滴啊啊啊啊啊啊啊啊啊啊
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane class="group-tab-members" label="组织成员" name="groupMembers">
          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%;margin-top: -17px;">
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="tag"
              label="身份"
              width="100"
              :filters="[{ text: '创建者', value: '创建者' }, { text: '管理员', value: '管理员' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '创建者' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="组织通知" name="groupNotify">
          <el-table
            :data="tableData2"
            style="width: 100%;margin-top: -15px;"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="组织资源" name="groupResource">
          <el-table
            :data="tableData"
            style="width: 100%;margin-top: -10px;">
            <el-table-column
              prop="date"
              label="资源名"
              width="190">
            </el-table-column>
            <el-table-column
              prop="name"
              label="上传者"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="大小">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupItem',

  data() {
    return {
      activeName: 'groupSummary',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '创建者'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '管理员'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '创建者'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '管理员'
      }],
      tableData2: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },

  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  }
}
</script>

<style scoped>
.gradient-box {
  width: 100%;
  height: 150px;
  background: linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%);
}
.group-content {
  width: 95%;
  margin: auto;
  margin-top: 152px;
  padding: 0px 15px;
}
.group-tab-members {
  padding: 0 10px;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>