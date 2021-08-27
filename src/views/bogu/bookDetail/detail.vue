<template>
    <div>
        <div class="d-flex">
            <div class="name">{{book}}</div>
            <div style="flex-grow: 1;"><el-tag type="primary" effect="dark">书籍内容及拓展</el-tag></div>
            <div>返回 <el-link type="primary" :underline="false">我的书架</el-link></div>
        </div>
        <el-row style="height: calc(100vh - 104px)">
            <el-col :span="6" style="display: flex; flex-direction: column; height: 100%">
                <div style="flex-shrink: 0; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; color: #555; height: 50px; line-height: 50px; font-weight: bold; text-align: center">目录</div>
                <div style="flex-grow: 1; overflow-y: auto">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        style="height: 100%"
                        >
                        <el-submenu v-for="item in menu" :key="item.id" :index="item.id">
                            <template slot="title">
                                <span>{{item.name}}</span>
                            </template>
                            <template v-for="item2 in item.children">
                                <template v-if="item2.children && item2.children.length > 0">
                                    <el-submenu :key="item2.id" :index="item2.id">
                                        <template slot="title">{{item2.name}}</template>
                                        <el-menu-item v-for="item3 in item2.children" :key="item3.id" :index="item3.id" @click="plantList = item3.children">{{item3.name}}</el-menu-item>
                                    </el-submenu>
                                </template>
                                <template v-else>
                                    <el-menu-item :key="item2.id" :index="item2.id">{{item2.name}}</el-menu-item>
                                </template>
                            </template>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-col>
            <template v-if="plantList.length > 0">
                <el-col :span="4" style="border-right: 1px solid #ddd; padding: 0 20px; height: 100%; overflow-y: auto;">
                    <div v-for="(item, index) in plantList" :key="item.id" class="plant">
                        <span :class="index == plantCurrent ? 'current' : ''" @click="changePlant(index)">{{item.name}}</span>
                    </div>
                </el-col>
            </template>
            <template v-if="plantDetail.name">
                <el-col :span="14" style="padding: 20px; height: 100%; overflow-y: auto;">
                    <div style=" font-size: 13px; color: #333; line-height: 30px;">
                        <div style="text-align: center;">
                            <b style="font-size: 16px; margin-right: 30px;">{{plantDetail.name}}</b>
                            <span>别名：{{plantDetail.alias}}</span>
                        </div>
                        <div style="display: flex; flex-flow: row wrap;">
                            <div v-for="(item, index) in plantDetail.images" :key="index" style="margin: 10px; text-align: center; color: #555;">
                                <el-image :src="item.img" fit="contain" style="width: 180px; height: 120px; border: 1px solid #ddd;"></el-image>
                                <div>{{item.name}}</div>
                            </div>
                        </div>
                        <div v-for="(item, index) in plantDetail.other" :key="index"><b>[{{item.field}}]</b> {{item.value}}</div>
                    </div>
                </el-col>
            </template>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            book: '常用园林植物彩色图鉴',
            menu: [
                {
                    id: '1',
                    name: '园林植物学基础知识',
                    children: [
                        {
                            id: '1-1',
                            name: '01 落叶阔叶乔木'
                        },
                        {
                            id: '1-2',
                            name: '02 落叶阔叶乔木'
                        },
                        {
                            id: '1-3',
                            name: '03 落叶阔叶乔木'
                        },
                        {
                            id: '1-4',
                            name: '04 落叶阔叶乔木'
                        }
                    ]
                },
                {
                    id: '2',
                    name: '园林植物按性状与用途分类',
                    children: [
                        {
                            id: '2-1',
                            name: '05 落叶阔叶乔木'
                        },
                        {
                            id: '2-2',
                            name: '06 落叶阔叶小乔木'
                        },
                        {
                            id: '2-3',
                            name: '07 落叶阔叶灌木'
                        },
                        {
                            id: '2-4',
                            name: '08 常绿藤本与匍匐植物'
                        },
                        {
                            id: '2-5',
                            name: '09 落叶藤本与匍匐植物'
                        },
                        {
                            id: '2-6',
                            name: '10 特型植物'
                        },
                        {
                            id: '2-7',
                            name: '11 观赏竹类'
                        },
                        {
                            id: '2-8',
                            name: '12 水生植物'
                        },
                        {
                            id: '2-9',
                            name: '13 草本植物',
                            children: [
                                {
                                    id: '2-9-1',
                                    name: '13.1 一二年生花卉',
                                    children: [
                                        {id: '111', name: '金盏菊'},
                                        {id: '222', name: '万寿菊'},
                                        {id: '333', name: '孔雀草'},
                                        {id: '444', name: '皇帝菊'},
                                        {id: '555', name: '百日菊'},
                                        {id: '666', name: '南非万寿菊'},
                                        {id: '777', name: '针叶菊'},
                                        {id: '888', name: '雏菊'},
                                        {id: '999', name: '天人菊'},
                                        {id: '11', name: '勋章菊'},
                                        {id: '22', name: '蛇目菊'},
                                        {id: '33', name: '白晶菊'},
                                        {id: '44', name: '波斯菊'},
                                        {id: '55', name: '藿香蓟'},
                                        {id: '66', name: '玛格丽特'},
                                        {id: '77', name: '矮牵牛'},
                                        {id: '771', name: '矮牵牛'},
                                        {id: '772', name: '矮牵牛'},
                                        {id: '773', name: '矮牵牛'},
                                        {id: '774', name: '矮牵牛'},
                                        {id: '775', name: '矮牵牛'},
                                        {id: '776', name: '矮牵牛'},
                                        {id: '88', name: '蛾蝶花'}
                                    ]
                                },
                                {
                                    id: '2-9-2',
                                    name: '13.2 多年生宿根花卉'
                                },
                                {
                                    id: '2-9-3',
                                    name: '13.3 多年生球根花卉'
                                },
                                {
                                    id: '2-9-4',
                                    name: '13.4 多年生常绿草本'
                                }
                            ]
                        }
                    ]
                }
            ],
            plantList: [],
            plantCurrent: 0,
            plantDetail: {}
        }
    },
    methods: {
        changePlant(i) {
            let imgData = 'data:image/jpeg;base64,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'
        
            this.plantCurrent = i;
            this.plantDetail = {
                name: '波斯菊',
                alias: '秋英 大波斯菊',
                other: [
                    {field: '学名', value: 'Cosmos bipinnatus'},
                    {field: '科属', value: '菊科•秋英属'},
                    {field: '花期', value: '5～11月'},
                    {field: '花色', value: '粉色、白色、黄色、洋红色'},
                    {field: '产地与习性', value: '原产于墨西哥及南美其它地区，一年生花卉。阳性，喜光，不耐荫；能耐贫瘠土壤，但不耐积水；高温会影响正常开花和花朵的大小。'}
                ],
                images: [
                    {name: '波斯菊', img: imgData},
                    {name: '波斯菊白花品种', img: imgData},
                    {name: '波斯菊单独花', img: imgData},
                    {name: '波斯菊粉红品种', img: imgData},
                    {name: '波斯菊单独花', img: imgData},
                    {name: '波斯菊粉红品种', img: imgData}
                ]
            };
        }
    }
}
</script>

<style lang="scss" scoped>
    .d-flex {
        display: flex;
        flex-flow: row nowrap;
        padding: 10px 20px;
        line-height: 32px;
        font-size: 14px;
        color: #333;
        border-bottom: 1px solid #ddd;

        .name {
            font-weight: bold;
            color: #4891FF;
            font-size: 16px;
            margin-right: 20px;
        }
    }
    .plant {
        color: #333;
        font-size: 13px;
        height: 40px;
        line-height: 40px;

        span {
            cursor: pointer;
        }
        span.current {
            color: #4891FF
        }
    }
</style>