<template>
    <div class="my-container">
      <el-container>
        <el-aside width="30%">
            <div class="title-wrap tit">
                <el-select v-model="tagValue" placeholder="请选择标签" size="small">
                    <el-option v-for="(item, index) in tagData" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-input v-model="searchValue" placeholder="请输入报表名称" size="small"></el-input>
                <el-button type="primary" size="small" @click="getReportDataList">查询</el-button>
            </div>
            <div class="titles-container" v-loading="loading">
                <template v-if="reportData.list.length > 0">
                    <div 
                        class="title-wrap" 
                        v-for="(item, index) in reportData.list" 
                        :key="index" 
                        :class="index === reportData.current ? 'current' : ''" 
                        @click="changeReportCurrent(index, item.id)"
                    >
                        <div>{{item.title}}</div>
                        <div 
                            class="target-wrap" 
                            v-for="(targetItem, targetIndex) in item.target" 
                            :key="targetIndex"
                        >
                            {{targetItem}}
                        </div>
                    </div>
                </template>
                <template v-else>
                    <empty-item title="暂无报表"></empty-item>
                </template>
            </div>
        </el-aside>
        <el-main class="report-main">
            <template v-if="detailData.id">
                <report-detail :mydata.sync="detailData" @changeTag="showNewTag"></report-detail>
            </template>
            <template v-else>
                <empty-item title="请先选择报表"></empty-item>
            </template>
        </el-main>
      </el-container>
    </div>
</template>

<script>
    import ReportDetail from '@/components/ReportDetail/index.vue';
    import EmptyItem from '@/components/EmptyItem/index.vue';
    export default {
        components: { ReportDetail, EmptyItem },
        data() {
            return {
                loading: true,
                reportData: {
                    list: [],       // 报表列表数据
                    current: 0,     // 当前点击的报表index
                    detail: {}      // 当前点击的报表详情数据
                },
                tagData: [
                    {label: '全部', value: ''},
                    {label: '已上报卫生厅', value: '已上报卫生厅'},
                    {label: '已上报医院', value: '已上报医院'},
                    {label: '已上报科室', value: '已上报科室'},
                    {label: '自定义标签', value: '自定义标签'}
                ],
                tagValue: '',
                searchValue: '',
                detailData: {
                    // isshow: '',
                    // id: '',      // 报表id
                }
            }
        },
        mounted: function() {
            this.getReportDataList();
        },
        methods: {
            // 切换存档报表
            changeReportCurrent(index, id) {
                this.reportData.current = index;
                this.detailData = {isshow: 'show', id: id};
            },
            // 获取存档报表列表数据
            getReportDataList() {
                this.loading = true;
                this.$axios.get(this.GLOBAL.base_url + '/Controllers/Ninghai.ashx', {
                    params: {
                        method: 'GetQualityControlReportList',
                        ReportName: this.searchValue,
                        ReportTag: this.tagValue
                    }
                }).then(res => {
                    console.log(res);
                    let result = JSON.parse(res.data.data);
                    // console.log(result)
                    this.reportData.list = result.map(item => {
                        return {
                            id: item.Id,
                            title: item.ReportName ? item.ReportName : '暂无报表名称',
                            target: item.ReportTag && item.ReportTag != '' ? item.ReportTag.split(',') : []
                        }
                    });
                    // console.log(this.reportData.list)
                    if(result.length > 0) {
                        this.changeReportCurrent(0, result[0].Id);
                    } else {
                        this.detailData = {};
                    }
                }).catch(err =>{
                    console.log(err);
                }).finally(() => {  
                    this.loading = false;
                })
            },
            // 显示当前报表新的标签
            showNewTag(data) {
                console.log(data);
                let curr = this.reportData.current;
                this.reportData.list[curr].target = data;
            }
        }
    }
</script>

<style scoped>
  .my-container {
    height: calc(100vh - 50px);
  }
  .el-container {
    height: 100%;
  }
  .el-aside { 
    border: 1px solid #E5E5E5; 
    background-color: #FFFFFF; 
    height: 100%; 
    padding: 7px; 
    box-sizing: border-box;
  }
  .report-main {
    background-color: #F8FBFE; 
    padding: 10px; 
    background-color: #FAFAFA; 
    padding: 0;
  }
  .el-button.is-plain:hover { 
    color: #4A8FEB; 
    background: none; 
    border-color: #4A8FEB;
  }
  .el-button--primary.is-plain { 
    color: #4A8FEB; 
    background: none; 
    border-color: #4A8FEB; 
  }
  .title-wrap {
    color: #333; 
    font-size: 14px; 
    height: 40px; 
    line-height: 40px; 
    font-weight: 400; 
    padding: 0; 
    display: flex; 
    flex-flow: row nowrap; 
    align-items: center;
    border-bottom: 1px solid #E5E5E5; 
    padding: 0;
  }
  .titles-container {
    overflow: auto; 
    height: calc(100% - 41px);
  }
  .titles-container .title-wrap {
    border: none; 
    min-width: 100%; 
    width: max-content; 
    padding: 0 5px;
    box-sizing: border-box;
  }
  .titles-container .title-wrap > div {
    flex-shrink: 0;
  }
  .title-wrap.current {
    border-radius: 4px; 
    color: #4891FF; 
    background-color: #E5EFFF;
  }
  .target-wrap {
    background-color: #4891FF; 
    color: white; 
    width: 80px; 
    height: 25px; 
    line-height: 25px; 
    border-radius: 4px; 
    text-align: center; 
    margin-left: 10px; 
    font-size: 12px;
  }
</style>
