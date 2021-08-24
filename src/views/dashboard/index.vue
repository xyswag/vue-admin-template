<template>
    <div>
        <div class="d-flex">
            <div>
                <div class="d-flex">
                    <div class="chart-wrap">
                        <div>今日入院</div>
                        <div>699</div>
                    </div>
                    <div class="chart-wrap">
                        <div>今日入科</div>
                        <div>20</div>
                    </div>
                    <div class="chart-wrap">
                        <div>预计病死</div>
                        <div>20</div>
                    </div>
                </div>
                
                <div class="d-flex">
                    <div class="chart-wrap">
                        <div>今日入院</div>
                        <div>699</div>
                    </div>
                    <div class="chart-wrap">
                        <div>今日入科</div>
                        <div>20</div>
                    </div>
                    <div class="chart-wrap">
                        <div>预计病死</div>
                        <div>20</div>
                    </div>
                </div>
            </div>
            <div class="chart-wrap d-flex">
                <div style="width: 350px; height: 250px; margin: 10px;">
                    <v-chart ref="chart1" class="my-charts" :auto-resize="true"></v-chart>
                </div>
                <div style="width: 350px; height: 250px; margin: 10px;">
                    <v-chart ref="chart2" class="my-charts" :auto-resize="true"></v-chart>
                </div>
            </div>  
        </div>
        <div class="d-flex">
            <div class="chart-wrap d-flex">
                <div style="width: 350px; height: 250px; margin: 10px;">
                    <v-chart ref="chart3" class="my-charts" :auto-resize="true"></v-chart>
                </div>
            </div>  
            <div class="chart-wrap d-flex">
                <div style="width: 350px; height: 250px; margin: 10px;">
                    <v-chart ref="chart4" class="my-charts" :auto-resize="true"></v-chart>
                </div>
            </div>  
            <div class="chart-wrap d-flex">
                <div style="width: 350px; height: 250px; margin: 10px;">
                    <v-chart ref="chart5" class="my-charts" :auto-resize="true"></v-chart>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                titStyle: {
                    fontSize: 14,
                    color: '#666'
                }
            }
        },
        mounted() {
            this.initEchart();
        },
        methods: {
            initEchart() {
                const chart1 = this.$refs.chart1
                if (chart1) {
                    chart1.setOption({
                        title: {
                            text: "ICU 患者收治率",
                            textStyle: this.titStyle,
                            bottom: 0
                        },
                        tooltip: {},
                        legend: {
                            data: ["ICU 收治患者数", "全院收治患者数"],
                            bottom: 25,
                        },
                        xAxis: {
                            name: '月份',
                            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        },
                        yAxis:{
                            name: '患者数'
                        },
                        series: [
                            {
                                name: "全院收治患者数",
                                type: "bar",
                                stack: '患者数',
                                data: [10, 28, 41, 30, 50, 71, 51, 27, 20, 40, 28, 18]
                            },
                            {
                                name: "ICU 收治患者数",
                                type: "bar",
                                stack: '患者数',
                                data: [5, 20, 36, 10, 10, 52, 20, 20, 18, 37, 20, 12]
                            }
                        ]
                    })
                }
                
                const chart2 = this.$refs.chart2
                if (chart2) {
                    chart2.setOption({
                        title: {
                            text: "ICU 患者收治床日率",
                            textStyle: this.titStyle,
                            bottom: 0
                        },
                        tooltip: {},
                        legend: {
                            show: false
                        },
                        xAxis: {
                            name: '月份',
                            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        },
                        yAxis:{
                            name: '百分比'
                        },
                        series: [
                            {
                                name: "ICU 患者收治床日率",
                                type: "line",
                                smooth: true,
                                data: [0.4, 1.2, 1.6, 1.3, 2.1, 1.5, 1.3, 1.8, 2.3, 1.7, 1.5, 2.4]
                            },
                            {
                                name: "2021 计划 1.59%",
                                type: "line",
                                smooth: true,
                                data: [2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6]
                            }
                        ]
                    })
                }

                const chart3 = this.$refs.chart3
                if (chart3) {
                    chart3.setOption({
                        title: {
                            text: "APACHE Ⅱ评分≥15分患者收治率（入ICU24小时内）",
                            textStyle: this.titStyle,
                            bottom: 0
                        },
                        tooltip: {},
                        legend: {
                            show: false
                        },
                        xAxis: {
                            name: '月份',
                            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        },
                        yAxis:{
                            name: '百分比'
                        },
                        series: [
                            {
                                name: "数据",
                                type: "bar",
                                smooth: true,
                                data: [30, 38, 40, 43, 54, 60, 63, 57, 62, 48, 38, 40]
                            }
                        ]
                    })
                }

                const chart4 = this.$refs.chart4
                if (chart4) {
                    chart4.setOption({
                        title: {
                            text: "感染性休克3h/6h集束化治疗（bundle）完成率",
                            textStyle: this.titStyle,
                            bottom: 0
                        },
                        tooltip: {},
                        legend: {
                            data: ['感染人数', '3h bundle', '6h bundle'],
                            bottom: 25
                        },
                        xAxis: {
                            name: '月份',
                            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        },
                        yAxis:{
                            name: '感染人数（人）'
                        },
                        series: [
                            {
                                name: "感染人数",
                                type: "line",
                                smooth: true,
                                stack: '感染人数',
                                areaStyle: {},
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [31, 42, 59, 72, 93, 107, 125, 111, 99, 83, 68, 52]
                            },
                            {
                                name: "3h bundle",
                                type: "line",
                                smooth: true,
                                stack: '感染人数',
                                areaStyle: {},
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [26, 39, 52, 68, 85, 91, 118, 104, 91, 75, 52, 41]
                            },
                            {
                                name: "6h bundle",
                                type: "line",
                                smooth: true,
                                stack: '感染人数',
                                areaStyle: {},
                                emphasis: {
                                    focus: 'series'
                                },
                                data: [20, 30, 35, 48, 65, 78, 100, 88, 75, 54, 42, 38]
                            }
                        ]
                    })
                }

                const chart5 = this.$refs.chart5
                if (chart5) {
                    chart5.setOption({
                        title: {
                            text: "",
                            textStyle: this.titStyle,
                            bottom: 0
                        },
                        tooltip: {},
                        legend: {
                            data: ["实际病死患者数量", "预计病死患者数量"],
                            bottom: 20
                        },
                        xAxis: {
                            name: '月份',
                            data: ["1月", "2月", "3月", "4月", "5月"]
                        },
                        yAxis:{
                            name: '人数（人）'
                        },
                        series: [
                            {
                                name: "实际病死患者数量",
                                type: "bar",
                                data: [4, 13, 13, 23, 24]
                            },
                            {
                                name: "预计病死患者数量",
                                type: "bar",
                                data: [11, 16, 22, 28, 27]
                            }
                        ]
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .d-flex {
        display: flex;
    }
    .chart-wrap {
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        width: fit-content;
        margin: 10px;
    }
    .my-charts {
        width: 100%;
        height: 100%;
    }
</style>