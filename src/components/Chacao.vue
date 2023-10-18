<template>
    <div class="chacao">
        <slot name="biaoti">
            <div class="dd">小米</div>
        </slot>
        <div class="xians " :class="{ xiahua: tt }">
            <slot name="zi">
                <div class="wenzi">
                    低至5.83元 x 24 期

                </div>
            </slot>
            <div class="jianto">
                &gt;
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Chacao',
    props: {
        tt: {
            default: false
        }
    }
}
</script>

<style lang="less" scoped>
.chacao {
    font-size: 12px;
    display: flex;
    background-color: white;

    .dd {
        font-weight: bold;
        width: 30px;
        text-align: center;
        margin: 10px 8px;
    }

    .xiahua {
        border-bottom: 1px solid #ddd;
    }

    .xians {
        width: calc(100% - 60px);
        padding: 10px 8px;
        display: flex;
        justify-content: space-between;
        padding-right: 10px;
        line-height: 16px;

        .jianto {
            font-size: 16px;
            color: #aba8a8;
            display: flex;
            align-items: center;
        }
    }
}
</style>