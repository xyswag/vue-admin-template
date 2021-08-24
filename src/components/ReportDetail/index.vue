<template>
    <div class="my-container" v-loading="loading">
        <div class="value-wrap">
            <template v-if="pageData.isshow == 'show'">
                <div class="title-wrap">
                    <div>
                        <div class="title">{{reportName}}</div>
                        <div>时间范围：{{reportTimeRange}}</div>
                    </div>
                    <el-form :inline="true">
                        <el-button type="primary" size="small" plain @click="printPage">打印</el-button>
                        <el-form-item size="small">
                            <el-select  
                                v-model="tagValue" 
                                placeholder="选择或输入标签" 
                                multiple 
                                filterable 
                                allow-create
                            >
                                <el-option 
                                    v-for="(item, index) in tagData" 
                                    :key="index" 
                                    :label="item.label" 
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                            <el-button type="primary" size="small" @click="saveNewTag">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="link-wrap">
                    <div>
                        跳转：
                        <el-select v-model="jumpSelectValue" size="small">
                            <el-option 
                                v-for="(item, index) in reportData" 
                                :key="index"
                                :name="item.ReportContent.title" 
                                :value="item.ReportContent.title" 
                            >
                                <div @click="jumpTo(index)">{{item.ReportContent.title}}</div>
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="title-wrap">
                    <div class="text-center">时间范围：{{reportTimeRange}}</div>
                </div>
                <div class="link-wrap">
                    <div>
                        跳转：
                        <el-select v-model="jumpSelectValue" size="small">
                            <el-option 
                                v-for="(item, index) in reportData" 
                                :key="index"
                                :name="item.ReportContent.title" 
                                :value="item.ReportContent.title" 
                            >
                                <div @click="jumpTo(index)">{{item.ReportContent.title}}</div>
                            </el-option>
                        </el-select>
                    </div>
                    <el-form :inline="true">
                        <el-button type="primary" size="small" plain @click="archiveData.visible = true">存档</el-button>
                        <el-button type="primary" size="small" plain @click="printPage">打印</el-button>
                    </el-form>
                </div>
            </template>
            <div class="tables-wrap">
                <template v-if="reportData.length > 0">
                    <div v-for="(item, index) in reportData" 
                        :key="index"
                        :id="'table-wrap-' + index" 
                        class="table-wrap" :class="index == activeIndex ? 'active' : ''" 
                    >
                        <div class="font-bold">{{item.ReportContent.title}}</div>
                        <div style="text-indent: 2em;">{{item.ReportContent.explain}}</div>
                        <el-table :data="item.ReportContent.data" style="width: 100%" border :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
                            <el-table-column prop="name" label="名称" min-width="37%"></el-table-column>
                            <el-table-column label="算法" min-width="37%">
                                <template slot-scope="scope">
                                    <div class="fraction-wrap">
                                        <div style="overflow-x: auto; margin-right: 5px;">
                                            <div class="molecular" @click="showDetail(scope.row.molecular)">{{scope.row.molecular.name}}({{scope.row.molecular.data ? scope.row.molecular.data.length : 0}})</div>
                                            <div class="denominator" @click="showDetail(scope.row.denominator)">{{scope.row.denominator.name}}({{scope.row.denominator.data ? scope.row.denominator.data.length : 0}})</div>
                                        </div>
                                        <div style="flex-shrink: 0;">{{scope.row.suffix}}</div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="result" label="数据" min-width="25%"></el-table-column>
                        </el-table>
                    </div>
                </template>
                <template v-else>
                    <empty-item title="暂无数据"></empty-item>
                </template>
            </div>
        </div>
        <!-- 报表病例数据弹窗 -->
        <el-dialog :append-to-body="true" custom-class="report-case-dialog" :visible.sync="reportCaseData.visible" center @closed="chearReportCaseData">
            <div slot="title" class="dialog-title">{{reportCaseData.title}}</div>
            <div class="time-wrap">时间范围：{{reportTimeRange}}</div>
            <el-table 
                :data="reportCaseData.currData" 
                border 
                :cell-style="cellStyle" 
                :header-row-style="headerRowStyle" 
                :header-cell-style="caseHeaderCellStyle"
            >
                <el-table-column 
                    v-for="(item, index) in reportCaseData.column" 
                    :key="index"
                    :property="item.prop" 
                    :label="item.label" 
                    min-width="100" 
                ></el-table-column>
            </el-table>
            <el-pagination
                background
                layout="total,prev,pager,next"
                :page-size="reportCaseData.pageSize"
                :total="reportCaseData.allData.length"
                :current-page="reportCaseData.currPage"
                @current-change="pageChange"
            ></el-pagination>
        </el-dialog>
        <!-- 报表存档弹窗 -->
        <el-dialog :append-to-body="true" title="存档" :visible.sync="archiveData.visible" @close="clearArchiveData">
            <el-form size="small" v-model="archiveData" label-width="60px">
                <el-form-item label="名称：">
                    <el-input v-model="archiveData.name" placeholder="请输入报表名称"></el-input>
                </el-form-item>
                <el-form-item label="标签：">
                    <el-select 
                        v-model="archiveData.tag" 
                        multiple 
                        filterable 
                        allow-create 
                        placeholder="选择或输入标签"
                    >
                        <el-option 
                            v-for="(item, index) in tagData" 
                            :key="index" 
                            :label="item.label" 
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveReport">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
    
<script>
    import {targetList} from '@/utils/targets.js';
    import EmptyItem from '@/components/EmptyItem/index.vue';
    export default {
        name: 'ReportDetail',
        props: {
            mydata: {    // isshow：show显示存档的报表，createOne生成报表(单个指标),createAll生成报表（多个指标）；isshow为show时传:报表id（id）；isshow为createOne时传:开始时间（start）、结束时间（end）、指标（target）;isshow为createAll是额外多一个导管（catheter）
                type: Object,
                required: true
            }
        },
        components: { EmptyItem },
        data() {
            return {
                loading: true,
                ChineseOrder: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'],
                pageData: this.mydata,      // 参数
                jumpSelectValue: '',        // 跳转到哪一项报表数据
                targetList: [],         // 所有指标数据
                reportName: '',         // 报表名称
                reportTimeRange: '',    // 时间范围
                reportData: [],         // 报表详情数据
                reportCaseData: {       // 报表【算法】列内各项分子分母的相关数据
                    visible: false,     // 弹窗是否显示
                    title: '',          // 弹窗标题
                    pageSize: 10,       // 每页显示几条
                    column: [],         // 表头
                    allData: [],        // 全部数据
                    currData: [],       // 当前页数据
                    currPage: 1         // 当前第几页
                },
                activeIndex: -1,    // 点击跳转到哪一个table-wrap
                archiveData: {      // 存档数据
                    visible: false, // 存档弹窗是否显示
                    name: '',
                    tag: ''         // 存档时选择的标签
                },
                tagValue: [],   // 打印时选择的标签
                tagData: [
                    {label: '已上报卫生厅', value: '已上报卫生厅'},
                    {label: '已上报医院', value: '已上报医院'},
                    {label: '已上报科室', value: '已上报科室'},
                ],
                headerRowStyle: {
                    color: '#333',
                    fontSize: '12px',
                    fontWeight: 'bold'
                },
                headerCellStyle: {
                    textAlign: 'center',
                    backgroundColor: '#F0F5FD'
                },
                cellStyle: {
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '12px'
                },
                caseHeaderCellStyle: {
                    textAlign: 'center',
                    backgroundColor: '#F8F8F8'
                }
            }
        },
        watch: {
            mydata: function(newVal, oldVal) {
                console.log(newVal)
                this.pageData = newVal;
                this.loading = true;
                if(newVal.isshow == 'show') {
                    this.getDataById();
                } else if (newVal.isshow == 'createOne') {
                    this.getDataByTime();
                } else if(newVal.isshow == 'createAll'){
                    this.getAllData();
                }
            }
        },
        mounted() {
            console.log(this.pageData)
            this.targetList = targetList;
            if(this.pageData.isshow == 'show') {
                this.getDataById();
            } else if(this.pageData.isshow == 'createOne'){
                this.getDataByTime();
            } else if(this.pageData.isshow == 'createAll'){
                this.getAllData();
            }
        },
        methods: {
            // 打印
            printPage() {
                var printData = [], tmpIndex = 1;
                this.reportData.forEach(item => {
                    item.ReportContent.data.forEach(childItem => {
                        printData.push({
                            index: tmpIndex,
                            name: childItem.name,
                            result: childItem.result
                        });
                        tmpIndex++;
                    })
                });
                this.$print({
                    printable: printData, 
                    properties: [
                        {field: 'index', displayName: '', columnSize: `20%`},
                        {field: 'name', displayName: '质控指标', columnSize: `60%`},
                        {field: 'result', displayName: '分值', columnSize: `20%`},
                    ], 
                    type: 'json',
                    gridHeaderStyle: 'text-align: center; border: 1px solid #ddd',
                    gridStyle: 'text-align: center; border: 1px solid #ddd',
                    header: this.reportName,
                    headerStyle: 'text-align: center; font-size: 24px; font-weight: bold;'
                })
            },
            // 获取报表详细数据(已存档的报表)
            getDataById() {
                this.$axios.get(this.GLOBAL.base_url + '/Controllers/Ninghai.ashx', {
                    params: {
                        method: 'GetQualityControlReportContent',
                        ParentId: this.pageData.id
                    }
                }).then(res => {
                    let resData = JSON.parse(res.data.data);
                    let dataList = resData.List;
                    dataList.forEach(item => {
                        item.ReportContent = JSON.parse(item.ReportContent)
                    })
                    
                    this.reportName = resData.QualityControlReport.ReportName;
                    this.reportTimeRange = resData.QualityControlReport.TimeFrame;
                    this.tagValue = resData.QualityControlReport.ReportTag == '' ? [] : resData.QualityControlReport.ReportTag.split(',');
                    this.reportData = dataList;
                }).catch(err => {
                    console.log(err);
                }).finally(() =>{
                    this.loading = false;
                })
            },
            // 获取报表详细数据（新的报表，单个指标）
            getDataByTime() {
                if(!this.pageData.methodName) {
                    return false;
                }
                if(this.pageData.methodName == 'test') {
                    this.$message.error('getDataByTime：接口未完成');
                    this.loading = false;
                    return false;
                }
                var subData = {
                    method: this.pageData.methodName,
                    StartTime: this.pageData.start,
                    EndTime: this.pageData.end
                };

                if(this.pageData.methodName == 'ICUCRBSIIncidenceRate') {
                    subData.CatheterType = this.pageData.catheter.join(',')
                }

                this.$axios.get(this.GLOBAL.base_url + '/Controllers/Ninghai.ashx', {
                    params: subData
                }).then(res => {
                    console.log(res);
                    console.log(this.pageData.targetIndex)

                    let resultData = JSON.parse(res.data.data);

                    if(resultData == null) {
                        this.$message.error('方法调用失败');
                        return false;
                    }

                    let tmpData = this.targetList[this.pageData.targetIndex];
                    let tmpDetailData = tmpData.detail[this.pageData.childIndex];

                    this.reportTimeRange = this.pageData.start + ' - ' + this.pageData.end;
                    this.reportData = [
                        {   
                            Sort: this.pageData.targetIndex + 1,    // 公式几
                            ReportContent: {
                                title: `${this.ChineseOrder[0]}:${tmpData.title}`,
                                explain: tmpDetailData.explanation.join(' '),
                                data: [
                                    {
                                        name: tmpDetailData.name,
                                        molecular: {name: tmpDetailData.molecular, data: resultData[tmpDetailData.resMole]},
                                        denominator: {name: tmpDetailData.denominator, data: resultData[tmpDetailData.resDeno]},
                                        suffix: tmpDetailData.suffix == 1000 ? '×1000‰' : '×100％',
                                        result: `${resultData[tmpDetailData.resRate]}${tmpDetailData.suffix == 1000 ? '‰' : '％'}`
                                    }
                                ]
                            }
                        }
                    ]
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    this.loading = false;
                })
            },
            // 获取报表详细数据（新的报表，多个指标）
            getAllData() {
                console.log(this.pageData);
                var methodNames = [], 
                    subData = {};

                this.pageData.targetIndex.forEach(i => {
                    methodNames.push(this.targetList[i].detail[0].btnMethod);
                });

                subData = {
                    method: 'GetAllData',
                    StartTime: this.pageData.start,
                    EndTime: this.pageData.end,
                    CatheterType: this.pageData.catheter.join(','),
                    CheckType: methodNames.join(',')
                }

                this.$axios.get(this.GLOBAL.base_url + '/Controllers/Ninghai.ashx', {
                    params: subData
                }).then(res => {
                    let resultData = JSON.parse(res.data.data);
                    if(resultData == null) {
                        this.$message.error('方法调用失败');
                        return false;
                    }
                    console.log(resultData);
                    var detailArr = [];
                    this.pageData.targetIndex.forEach((item, index) => {
                        let currTarget = this.targetList[item],    // 当前指标
                            resData = resultData[currTarget.dataName];  // 当前指标的返回结果
                        
                        var explanationData = [],
                            childData = [];

                        if(!resData) {
                            return;
                        }

                        currTarget.detail.forEach(i => {
                            explanationData.push(i.explanation.join(' '));
                            childData.push({
                                name: i.name,
                                molecular: {name: i.molecular, data: resData[i.resMole]},
                                denominator: {name: i.denominator, data: resData[i.resDeno]},
                                suffix: i.suffix == 1000 ? '×1000‰' : '×100％',
                                result: `${resData[i.resRate]}${i.suffix == 1000 ? '‰' : '％'}`
                            })
                        })
                        detailArr.push({
                            Sort: item + 1,
                            ReportContent: {
                                title: `${this.ChineseOrder[index]}:${currTarget.title}`,
                                explain: explanationData.join(' '),
                                data: childData
                            }
                        })
                    });

                    this.reportTimeRange = this.pageData.start + ' - ' + this.pageData.end;
                    this.reportData =  detailArr;
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    this.loading = false;
                })
            },
            // 跳转
            jumpTo(index) {
                this.activeIndex = index;
                document.querySelector(`#table-wrap-${index}`).scrollIntoView(true);
                setTimeout(() => {
                    this.activeIndex = -1;
                }, 2000)
            },
            // 显示报表病例数据
            showDetail(data) {
                // console.log(data.name);
                this.reportCaseData.title = `${data.name}(${data.data ? data.data.length : 0})`;
                switch(data.name) {
                    case 'ICU收治患者总数': {
                        this.reportCaseData.column = [
                            {prop: 'number', label: '序号'},
                            {prop: 'recordNum', label: '病历号'},
                            {prop: 'time', label: '入ICU时间'}
                        ];
                        break;
                    };
                    case '同期医院收治患者总数': {
                        this.reportCaseData.column = [
                            {prop: 'number', label: '序号'},
                            {prop: 'recordNum', label: '病历号'},
                            {prop: 'time', label: '入院时间'}
                        ];
                        break;
                    };
                    case 'APACHE Ⅱ评分≥15分患者': {
                        this.reportCaseData.column = [
                            {prop: 'number', label: '序号'},
                            {prop: 'recordNum', label: '病历号'},
                            {prop: 'time', label: '入ICU时间'},
                            {prop: 'score', label: 'APACHE Ⅱ评分'}
                        ];
                        break;
                    };
                    default: {
                        this.reportCaseData.column = [
                            {prop: 'number', label: '序号'},
                            {prop: 'recordNum', label: '病历号'}
                        ];
                        break;
                    }
                }
                
                if(data.data) {
                    this.reportCaseData.allData = data.data.map((item, index) => {
                        return {
                            number: index + 1,
                            recordNum: item.ZYHM,
                            time: item.INHOS_TIME,
                            score: item.APACHEScore
                        }
                    });
                } else {
                    this.reportCaseData.allData = [];
                }
                this.reportCaseData.currData = this.reportCaseData.allData.slice(0, 10);
                this.reportCaseData.visible = true;
            },
            // 病例数据切换分页
            pageChange(p) {
                let size = this.reportCaseData.pageSize;

                this.reportCaseData.currData = this.reportCaseData.allData.slice((p - 1) * size, p * size);
            },
            // 病例数据弹窗关闭后清除数据
            chearReportCaseData() {
                this.reportCaseData = {       // 报表【算法】列内各项分子分母的相关数据
                    visible: false,     // 弹窗是否显示
                    title: '',          // 弹窗标题
                    pageSize: 10,       // 每页显示几条
                    column: [],         // 表头
                    allData: [],        // 全部数据
                    currData: [],       // 当前页数据
                    currPage: 1         // 当前第几页
                }
            },
            // 报表存档
            saveReport() {
                if(this.archiveData.name == '') {
                    this.$message.error('请输入报表名称');
                    return false;
                }
                // if(this.archiveData.tag.length == 0) {
                //     this.$message.error('请选择标签');
                //     return false;
                // }
                var params = new URLSearchParams();
                params.append('method', 'SubmitQualityControlReport');
                params.append('ReportName', this.archiveData.name);
                params.append('ReportTag', this.archiveData.tag.join(','));
                params.append('TimeFrame', this.reportTimeRange);
                params.append('QualityControlReportContent', JSON.stringify(this.reportData));
                
                this.$axios.post(this.GLOBAL.base_url + '/Controllers/Ninghai.ashx', 
                params
                , {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
                }
                ).then(res => {
                    console.log(res);
                    if(res.data.message == '成功') {
                        this.$message({
                            message: '存档成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error('存档失败')
                    }
                    this.archiveData.visible = false;
                    this.$emit('close');
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    this.clearArchiveData();
                })
            },
            // 清空存档弹框的数据
            clearArchiveData() {
                this.archiveData.name = '';
                this.archiveData.tag = '';
            },
            // 添加新的标签
            saveNewTag() {
                console.log(this.tagValue);
                this.$axios.get(this.GLOBAL.base_url + '/Controllers/Ninghai.ashx', {
                    params: {
                        method: 'UpdateReportTag',
                        Id: this.pageData.id,
                        ReportTag: this.tagValue.join(',')
                    }
                }).then(res => {
                    console.log(res);
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$emit('changeTag', this.tagValue)
                }).catch(err => {
                    console.log(err);z
                }).finally(() => {

                })
            }
        }
    }
</script>

<style scoped>
    .my-container {height: 100%;}
    .text-center {
        text-align: center;
    }
    .font-bold {
        font-weight: bold;
    }
    .value-wrap {
        padding: 0; 
        color: #333; 
        font-size: 12px; 
        line-height: 20px; 
        height: 100%; 
        margin: 0; 
        box-sizing: border-box; 
        display: flex; 
        flex-flow: column nowrap;
    }
    .value-wrap .el-button {
        margin: 0;
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
        flex-shrink: 0; 
        display: flex; 
        flex-flow: row nowrap; 
        justify-content: space-between; 
        border-bottom: 1px solid #ddd; 
        padding: 8px 0; 
        margin: 0 10px;
        color: #333; 
        font-size: 14px; 
        line-height: 19px;
    }
    .title-wrap .title {
        font-size: 16px; 
        line-height: 21px; 
        font-weight: bold;
    }
    .link-wrap {
        flex-shrink: 0; 
        border-bottom: 1px solid #ddd; 
        padding: 8px 10px; 
        display: flex; 
        flex-flow: row nowrap; 
        align-items: center; 
        justify-content: space-between;
    }
    .tables-wrap {
        flex-shrink: 1; 
        overflow: auto; 
        height: calc(100% - 112px);
    }
    .table-wrap {
        padding: 8px 10px; 
        box-sizing: border-box;
        background-color: white;
        transition: background-color 1s;
        -webkit-transition: background-color 1s;
    }
    .table-wrap.active {
        background-color: #DBE9FB;
    }
    .el-table {
        margin-top: 8px;
    }
    .fraction-wrap {
        display: flex; 
        flex-flow: row nowrap; 
        align-items: center; 
        width: max-content;
        margin: 0 auto; 
        max-width: 100%;
    }
    .fraction-wrap .molecular {
        border-bottom: 1px solid #ddd; 
        cursor: pointer;
    }
    .fraction-wrap .denominator {
        cursor: pointer;
    }
    .report-case-dialog .el-dialog__title {
        font-size: 14px; 
        font-weight: bold; 
        color: #4A8FEB;
    }
    .report-case-dialog .el-dialog__body {
        padding: 10px; 
        border-top: 1px solid #ddd;
    }
    .dialog-title {
        color: #4A8FEB; 
        font-size: 14px; 
        font-weight: bold; 
        padding-bottom: 14px; 
        border-bottom: 1px solid #EBEBEB;
    }
    .time-wrap {
        color: #999; 
        font-size: 12px;
    }
    .el-pagination {
        padding: 10px 5px;
        text-align: center;
    }
</style>
