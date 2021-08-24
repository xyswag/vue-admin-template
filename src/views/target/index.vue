<template>
  <div class="my-container">
    <el-header height="48px">
      <el-form v-model="reportFormData" :inline="true">
        <el-form-item>
          <div class="form-label" slot="label">时间范围：</div>
          <el-date-picker
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy/MM/dd"
            v-model="reportFormData.startDate"
            size="small"
            placeholder="开始日期"
            :picker-options="startPickerOptions"
          ></el-date-picker>
          <span style="color: #666; font-size: 12px">到</span>
          <el-date-picker
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy/MM/dd"
            v-model="reportFormData.endDate"
            size="small"
            placeholder="结束日期"
            :picker-options="endPickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            size="small"
            @click="createReportMultiple"
            >生成报表</el-button
          >
        </el-form-item>
      </el-form>
    </el-header>
    <el-container style="height: calc(100% - 48px)">
      <el-aside style="width: 50%">
        <div class="checkbox-wrap tit">
          <el-checkbox v-model="targetData.checkAll" @change="targetCheckAll"
            >全选</el-checkbox
          >
          <el-select
            filterable
            multiple
            collapse-tags
            reserve-keyword
            placeholder="搜索指标"
            size="small"
          >
            <el-option
              v-for="(item, index) in targetData.list"
              :key="index"
              :label="item.title"
              :value="item.id"
            >
              <div
                style="display: flex; flex-flow: row nowrap; overflow: hidden"
              >
                <div class="my-checkbox">
                  <el-checkbox
                    :label="item.id"
                    :value="targetData.checkedData.indexOf(item.id) != -1"
                    @change="(checked) => searchTargetChange(checked, item.id)"
                  >
                  </el-checkbox>
                </div>
                <div
                  style="flex-grow: 1"
                  @click.stop="changeTargetCurrent(index)"
                >
                  {{ index + 1 + "、" + item.title }}
                </div>
              </div>
            </el-option>
          </el-select>
        </div>
        <el-checkbox-group
          style="height: calc(100% - 41px); overflow: auto"
          v-model="targetData.checkedData"
          @change="targetCheck"
        >
          <div
            class="checkbox-wrap"
            v-for="(item, index) in targetData.list"
            :key="index"
            :class="index === targetData.current ? 'current' : ''"
            :id="'checkbox-wrap-' + index"
          >
            <div style="display: flex; flex-flow: row nowrap; overflow: hidden">
              <div class="my-checkbox">
                <el-checkbox :label="item.id"></el-checkbox>
              </div>
              <div
                style="flex-grow: 1"
                @click.stop="changeTargetCurrent(index)"
              >
                {{ index + 1 + "、" + item.title }}
              </div>
            </div>
            <div
              class="child-wrap"
              :class="
                index === targetData.current ||
                targetData.checkedData.indexOf(item.id) != -1
                  ? 'current'
                  : ''
              "
              v-if="item.catheter"
            >
              <div style="margin-left: 30px">导管选择：</div>
              <div style="flex-grow: 1; display: flex">
                <div style="margin-right: 30px">
                  <el-checkbox-group
                    v-model="catheterData.checkAll"
                    @change="catheterCheckAll"
                  >
                    <el-checkbox label="全部"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <el-checkbox-group
                  class="child-checkbox-wrap"
                  v-model="catheterData.checkedData"
                  @change="catheterCheck"
                >
                  <el-checkbox
                    v-for="(childrenItem, childrenIndex) in catheterData.list"
                    :key="childrenIndex"
                    :label="childrenItem.id"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </el-checkbox-group>
      </el-aside>
      <el-main>
        <div
          v-for="(item, index) in targetData.list"
          :key="index"
          v-show="index == targetData.current"
        >
          <div
            class="value-wrap"
            v-for="(dItem, dIndex) in item.detail"
            :key="dIndex"
          >
            <el-button
              type="primary"
              plain
              size="small"
              @click="createReportSingle(dItem.btnMethod, index, dIndex)"
              >{{
                item.detail.length > 1
                  ? "生成" + dItem.name + "报表"
                  : "生成报表"
              }}</el-button
            >
            <div v-for="(eItem, eIndex) in dItem.explanation" :key="eIndex">
              {{ eItem }}
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <!-- 生成报表弹窗 -->
    <el-dialog
      custom-class="create-report-case"
      top="10vh"
      width="90%"
      title=""
      :visible.sync="dialogVisible"
      @close="clearDialog"
    >
      <report-detail
        :mydata.sync="createReportData"
        @close="dialogVisible = false"
      ></report-detail>
    </el-dialog>
  </div>
</template>

<script>
import ReportDetail from "@/components/ReportDetail/index.vue";
import {
  targetList,
  targetIdList,
  catheterList,
  catheterIdList,
} from "@/utils/targets.js";
export default {
  components: { ReportDetail },
  props: {
    time: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      measuredTime: this.time, //'7:00',
      targetData: {
        // 指标数据
        checkAll: false, // 是否全选
        checkedData: [], // 已选择的指标
        list: [], // 指标所有可选数据
        idList: [], // 全选的值
        current: -1, // 当前点击的指标index
      },
      catheterData: {
        // 导管数据
        checkAll: false, // 是否全选
        checkedData: [], // 已选择的导管
        list: [], // 全部可选数据
        idList: [], // 全选的值
      },
      dialogVisible: false, // 生成报表弹窗是否显示
      createReportData: {
        // 生成报表的弹窗数据
        isshow: "createOne", // createOne生成报表单个指标；createAll生成报表多个指标；show显示报表
        // methodName: '',  // 接口的method参数
        // start: '',       // 开始时间
        // end: '',         // 结束时间
        // targetIndex: [], // 指标index
        // childIndex: ''   // 指标子项index
      },
      reportFormData: {
        startDate: "",
        endDate: "",
        checkCatheterData: [],
      },
      startPickerOptions: {
        disabledDate: (time) => {
          if (this.reportFormData.endDate) {
            let start = time.valueOf();
            let end = new Date(this.reportFormData.endDate).valueOf();
            return start > end;
          }
          return false;
        }, 
      },
      endPickerOptions: {
        disabledDate: (time) => {
          if (this.reportFormData.startDate) {
            let start = new Date(this.reportFormData.startDate).valueOf();
            let end = time.valueOf();
            return start > end;
          }
          return false;
        },
      },
    };
  },
  created: function () {
    this.targetData.list = targetList;
    this.targetData.idList = targetIdList;
    this.catheterData.list = catheterList;
    this.catheterData.idList = catheterIdList;
    this.targetData.current = 0;
  },
  methods: {
    // 指标全选
    targetCheckAll(val) {
      this.targetData.checkedData = val
        ? [].concat(this.targetData.idList)
        : [];
    },
    // 勾选单个指标
    targetCheck(val) {
      let checkCount = val.length;
      this.targetData.checkAll = checkCount === this.targetData.idList.length;
    },
    // 点击指标切换右侧解释文字
    changeTargetCurrent(i) {
      this.targetData.current = i;

      document.querySelector(`#checkbox-wrap-${i}`).scrollIntoView(true);
    },
    // 生成报表(多个指标)
    createReportMultiple() {
      if (!this.reportFormData.startDate || !this.reportFormData.endDate) {
        this.$message.error("请选择时间范围");
        return false;
      }
      if (this.targetData.checkedData.length == 0) {
        // 多个指标 但未勾选指标
        this.$message.error("请勾选要生成报表的指标");
        return false;
      }

      if (
        this.targetData.checkedData.indexOf(15) != -1 &&
        this.catheterData.checkedData.length == 0
      ) {
        // 15是CRBSI发病率，需要选择导管
        this.$message.error("请选择导管");
        return false;
      }

      this.createReportData = {
        isshow: "createAll",
        methodName: "GetAllData",
        start: `${this.reportFormData.startDate} ${this.measuredTime}`,
        end: `${this.reportFormData.endDate} ${this.measuredTime}`,
        targetIndex: this.targetData.checkedData,
        catheter: this.catheterData.checkedData, // 导管
      };
      console.log(this.createReportData);
      // return false;
      this.dialogVisible = true;
    },
    // 生成报表(单个指标)
    createReportSingle(methodName, target, child) {
      if (!this.reportFormData.startDate || !this.reportFormData.endDate) {
        this.$message.error("请选择时间范围");
        return false;
      }

      if (methodName == "ICUCRBSIIncidenceRate" && this.catheterData.checkedData.length == 0) {
        this.$message.error("请选择导管");
        return false;
      }
      this.createReportData = {
        isshow: "createOne",
        methodName: methodName,
        start: `${this.reportFormData.startDate} ${this.measuredTime}`,
        end: `${this.reportFormData.endDate} ${this.measuredTime}`,
        targetIndex: target,
        childIndex: child,
        catheter: this.catheterData.checkedData, // 导管
      };

      this.dialogVisible = true;
    },
    // 导管全选
    catheterCheckAll(val) {
      this.catheterData.checkedData = val ? [].concat(this.catheterData.idList) : [];
    },
    // 导管单选
    catheterCheck(val) {
      let count = val.length; // 已选中的个数
      this.catheterData.checkAll = count === this.catheterData.list.length;
    },
    // 勾选搜索指标
    searchTargetChange(val, id) {
      let i = this.targetData.checkedData.indexOf(id);
      if (val) {
        this.targetData.checkedData.push(id); // 选中的值中没有这个就加入
      } else {
        this.targetData.checkedData.splice(i, 1); // 选中的值中有这个就去掉
      }
      // 判断是否全选
      // console.log( this.targetData.checkedData.length === this.targetData.idList.length );
      if ( this.targetData.checkedData.length === this.targetData.idList.length ) {
        this.targetData.checkAll = true;
      } else {
        this.targetData.checkAll = false;
      }
    },
    // 关闭生成报表的弹窗
    clearDialog() {
      console.log("close");
      this.createReportData = {
        // 生成报表的弹窗数据
        isshow: "createOne", // create生成报表；show显示报表
        methodName: "", // 接口的method参数
        start: "", // 开始时间
        end: "", // 结束时间
        targetIndex: [], // 指标index
        childIndex: "", // 指标子项index
      };
    },
  },
};
</script>

<style scoped>
  .my-container {
    height: 100%;
  }
  .el-header {
    font-size: 12px;
    color: #333;
    padding: 3px 12px;
    background-color: #f2f2f2;
  }
  .el-aside {
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
    height: 100%;
    padding: 7px;
    box-sizing: border-box;
  }
  .checkbox-wrap {
    color: #333;
    font-size: 12px;
    min-height: 40px;
    line-height: 40px;
    font-weight: 400;
    padding: 0 5px;
  }
  .checkbox-wrap.tit {
    font-weight: bold;
    border-bottom: 1px dashed #ddd;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .checkbox-wrap.current {
    border-radius: 4px;
    background: #dbe9fb;
  }
  .my-checkbox {
    width: 25px;
  }
  .my-checkbox .el-checkbox__label {
    display: none !important;
  }
  .el-checkbox {
    width: 100%;
  }
  .child-checkbox-wrap .el-checkbox {
    width: unset;
  }
  .el-checkbox__label {
    font-size: 12px;
    color: #333;
  }
  .child-wrap {
    display: none;
  }
  .child-wrap.current {
    display: flex;
  }
  .el-main {
    background-color: #f8fbfe;
    padding: 10px;
  }
  .el-container .el-form-item {
    margin: 0;
  }
  .form-label {
    color: #333;
    font-size: 12px;
    font-weight: 400;
  }
  .value-wrap {
    padding: 20px 30px;
    background-color: #ffffff;
    margin-bottom: 10px;
    font-size: 12px;
    color: #333;
    line-height: 20px;
    box-sizing: border-box;
  }
  .value-wrap .el-button {
    margin-bottom: 12px;
  }
  .el-button.is-plain:hover {
    color: #4a8feb;
    background: none;
    border-color: #4a8feb;
  }
  .el-button--primary.is-plain {
    color: #4a8feb;
    background: none;
    border-color: #4a8feb;
  }
  .create-report-case {
    color: #333;
    font-size: 12px;
    height: 80%;
  }
  .create-report-case .el-dialog__body {
    height: calc(100% - 40px);
    padding: 10px;
    box-sizing: border-box;
  }
</style>


