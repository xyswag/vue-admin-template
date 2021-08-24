<template>
    <div class="container">
        <div>
            <el-image
                :src="require('@/assets/images/empty.png')"
                class="img"
            >
                <i slot="error" class="icon el-icon-warning-outline"></i>
            </el-image>
            <div class="tips">{{tips}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmptyItem',
    props: {
        title: {    // 提示信息
            type: String,
            default: '',
            required: false
        }
    },
    data() {
        return {
            tips: this.title
        }
    }
}
</script>

<style>
    .container {
        text-align: center;
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .img {
        width: 160px;
        height: 160px;
        text-align: center;
        line-height: 160px;
    }
    .icon {
        font-size: 24px;
        color: #666;
    }
    .tips {
        width: 160px;
        text-align: center;
    }
</style>