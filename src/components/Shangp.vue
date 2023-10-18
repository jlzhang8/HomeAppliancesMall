<template>
    <div class="shangp" @click="jj(ttt.id)">
        <div class="top">
            <img class="auto-img" :src="ttt.url" />
        </div>
        <div class="buttom">
            <div class="name on-suo nbian">{{ttt.name}}</div>
            <div class="enname on-suo nbian">{{ttt.jieshao}}</div>
            <div class="prisc on-suo nbian">￥{{ttt.price}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Shangp',
    props: {
        ttt: {
            type: Object,
            defaulr() {
                return {}
            }
        }
    },
    methods:{
        jj(id){
            this.$emit('ggg',id)
        }
    }
}
</script>

<style lang="less" scoped>
.shangp {
    width: 175px;
    background-color: white;
    padding-bottom: 15px;
    margin-bottom: 10px;

    .top {
        width: 100%;
    }

    .nbian {
        padding-left: 10px;
    }

    .name {
        font-weight: bold;
        font-size: 14px;
        margin-top: 10px;
    }

    .enname {
        font-size: 8px !important;
        margin: 5px 0;
    }

    .prisc {
        font-weight: bold;
        font-size: 14px !important;
    }
}
</style>