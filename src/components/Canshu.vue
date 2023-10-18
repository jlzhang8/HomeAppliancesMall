<template>
    <div class="canshu">
        <div class="canshu-img">
            <img class="auto-img" :src="ii.icon" />
        </div>
        <div class="canshu-name on-suo">
            {{ ii.name }}
        </div>
        <div class="canshu-xq on-suo">
            {{ ii.bottom_title }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Canshu',
    props: {
        ii: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style lang="less" scoped>
.canshu {
    width: 70px;
    margin: 0 8px;
    // height: 60px;
    text-align: center;

    .canshu-img {
        width: 15px;
        display: inline-block;
        margin: 0 auto;
    }

    .canshu-name {
        font-size: 12px;
        width: 100%;
        margin: 2px 0;
    }

    .canshu-xq {
        width: 100%;
        font-size: 8px;
    }

}
</style>