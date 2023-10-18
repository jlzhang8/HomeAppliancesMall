<template>
    <div class="zuji">
        <div class="zuji-top">
            <div class="zuji-top-left">
                <div class="zuji-top-jianto" @click="back">&lt;</div>
                <div class="zuji-top-zi">历史记录</div>
            </div>
            <div class="zuji-top-right">
                <div class="zuji-top-mokuaiyi" v-show="!guanlikais && !chuangdu">
                    <div class="zuji-right-zuo" @click="qingkong">清空</div>
                    <div class="zuji-right-you" @click="bianji">编辑</div>
                </div>
                <div class="zuji-top-mokuaier" @click="wancheng" v-show="guanlikais && !chuangdu">完成</div>
            </div>
        </div>
        <!-- 全部商品 -->
        <div class="zuji-bottom">
            <div class="yidengr-gowu" v-show="!chuangdu">
                <!-- 购物车的商品 -->
                <div class="yidengr-gowu-sp">
                    <!-- 循环的每一个商品 -->
                    <div class="yidengr-gowu-sp-meige" v-for="(item, index) in lishi" :key="index">
                        <!-- 左边的点击 -->
                        <div class="yidengr-gowu-sp-meige-left" v-show="guanlikais">
                            <div class="yidengr-gowu-sp-meige-left-img" @click="xiaodian(index)"
                                :class="{ atme: !item.last }">
                                <img v-show="item.last" class="auto-img" src="../assets/duiduidui.png" />
                            </div>
                        </div>
                        <!-- 右边的商品介绍 -->
                        <div class="yidengr-gowu-sp-meige-right" @click="tiaozhuanxq(item.id)">
                            <!-- 商品图片 -->
                            <div class="yidengr-gowu-sp-meige-right-left">
                                <img class="auto-img" :src="item.url" />
                            </div>
                            <!-- 商品名字价格等 -->
                            <div class="yidengr-gowu-sp-meige-right-right">

                                <div class="yidengr-gowu-sp-meige-right-right-name">{{ item.name }}</div>

                                <div class="yidengr-gowu-sp-meige-right-right-price">
                                    <div class="yidengr-gowu-sp-meige-right-right-price-jiage">￥{{ item.price }}</div>


                                    <div class="yidengr-gowu-sp-meige-right-right-price-jibu" v-show="!guanlikais">
                                        <div class="yidengr-gowu-sp-meige-right-right-price-jibu-jia" @click="jia(index)">
                                            <img class="auto-img" src="../assets/jia.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="zuji-kong" v-show="chuangdu">
                <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="还没有足迹" />
            </div>
        </div>
        <!-- 下面的全选和删除 -->
        <div class="zujixi" v-show="guanlikais && !chuangdu">
            <van-submit-bar button-text="删除" @submit="onSubmit">
                <van-checkbox v-model="checked" @click="quanxuan">全选</van-checkbox>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Zuji',
    data() {
        return {
            lishi: [],
            guanlikais: false,
            checked: false,
            chuangdu: false
        }
    },
    created() {
        let ll = JSON.parse(localStorage.getItem('lishi'))
        //
        if (ll) {
            this.lishi = ll
        }
        //
        if(this.lishi.length == 0){
            this.chuangdu = true
        }
    },
    methods: {
        qingkong() {
            this.lishi = [];
            this.chuangdu = true;
            this.checked = false;
            localStorage.setItem('lishi', JSON.stringify(this.lishi))
            this.$root.zuji = 0
        },
        bianji() {
            this.guanlikais = true
        },
        wancheng() {
            this.guanlikais = false
        },
        quanxuan() {
            //
            this.lishi.forEach(v => {
                v.last = this.checked
            })
            localStorage.setItem('lishi', JSON.stringify(this.lishi))
        },
        onSubmit() {
            //
            let tt = new Array
            for (let t = 0; t < this.lishi.length; t++) {
                if (this.lishi[t].last) {
                    let duix = new Object
                    for (let key in this.lishi[t]) {
                        duix[key] = this.lishi[t][key]
                    }
                    tt.unshift(duix)
                    this.lishi.splice(t, 1)
                    t--
                }
            }
            if (tt.length == 0) {
                return
            }

            this.$root.zuji -= tt.length
            if (this.lishi.length == 0) {
                this.chuangdu = true
            }
            localStorage.setItem('lishi', JSON.stringify(this.lishi))
            this.fzhuang()
        },

        xiaodian(index) {
            //
            this.lishi[index].last = !this.lishi[index].last
            this.fzhuang()
            localStorage.setItem('lishi', JSON.stringify(this.lishi))
        },
        jia() {
            //
        },
        tiaozhuanxq(id) {
            this.$router.push({ name: 'Details', query: id })
        },
        //封装每次点击后全选亮不亮和小米亮不亮
        fzhuang() {
            for (let i = 0; i < this.lishi.length; i++) {
                if (!this.lishi[i].last) {
                    this.checked = false
                    return
                }
            }
            this.checked = true
            if (this.lishi.length == 0) {
                this.checked = false
            }
        },
        back() {
            this.$router.back()
        },
    },
}
</script>

<style lang="less" scoped>
.zuji {
    box-sizing: border-box;
    width: 375px;
    overflow: hidden;
    ::v-deep .van-submit-bar__bar {
        justify-content: space-between;
        padding-bottom: 10px;
    }

    ::v-deep .van-submit-bar__button--danger {
        background-color: #ff6700 !important;
    }

    .zuji-top {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ddd;

        .zuji-top-left {
            display: flex;
            font-size: 15px;

            .zuji-top-jianto {
                padding-right: 13px;
            }
        }

        .zuji-top-right {
            display: flex;

            .zuji-top-mokuaiyi {
                display: flex;
                font-size: 14px;

                .zuji-right-zuo {
                    margin-right: 20px;
                }
            }

            .zuji-top-mokuaier {
                color: #ff5100;
                font-size: 14px;
            }
        }
    }

    .zuji-bottom {
        .yidengr-gowu {
            margin: 10px;
            padding: 10px;
            border-radius: 10px;
            background-color: white;

            .yidengr-gowu-top {
                margin-bottom: 5px;
                display: flex;
                justify-content: space-between;

                .yidengr-gowu-top-left {
                    display: flex;
                    font-size: 14px;
                    font-weight: bold;

                    .yidengr-gowu-top-left-img {
                        width: 17px;
                        height: 17px;
                        margin-right: 6px;
                        margin: 3px;
                        box-sizing: border-box;
                        border-radius: 50%;
                        overflow: hidden;

                        &.atme {
                            border: 1px solid #636363;
                        }
                    }
                }

                .yidengr-gowu-top-right {
                    display: flex;
                    color: #7e7e7e;
                    padding-top: 2px;

                    .yidengr-gowu-top-right-img {
                        width: 13px;
                        margin-right: 4px;
                        margin-top: 2px;
                    }
                }
            }

            .yidengr-gowu-sp {
                .yidengr-gowu-sp-meige {
                    display: flex;
                    padding-bottom: 14px;
                    width: 100%;
                    padding-top: 11px;

                    overflow: hidden;

                    .yidengr-gowu-sp-meige-left {
                        padding-right: 12px;
                        display: flex;

                        .yidengr-gowu-sp-meige-left-img {
                            width: 17px;
                            height: 17px;
                            margin-top: 36px;
                            border-radius: 50%;
                            overflow: hidden;
                            box-sizing: border-box;

                            &.atme {
                                border: 1px solid #bbbaba;
                            }
                        }
                    }

                    .yidengr-gowu-sp-meige-right {
                        display: flex;
                        overflow: hidden;

                        .yidengr-gowu-sp-meige-right-left {
                            width: 110px;
                            margin-right: 7px;
                            background-color: #f0efef;
                        }

                        .yidengr-gowu-sp-meige-right-right {
                            // margin-top: 10px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid #bdbcbc;

                            .yidengr-gowu-sp-meige-right-right-name {
                                font-size: 13px;
                                // font-weight: 500;
                                display: -webkit-box;
                                overflow: hidden;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }

                            .yidengr-gowu-sp-meige-right-right-beizhi {
                                color: #636363;
                                display: inline-block;
                            }

                            .yidengr-gowu-sp-meige-right-right-price {
                                display: flex;
                                justify-content: space-between;
                                margin-top: 42px;
                                width: 210px;

                                .yidengr-gowu-sp-meige-right-right-price-jiage {
                                    font-size: 16px;
                                    font-weight: bold;
                                    color: #ff6700;
                                }

                                .yidengr-gowu-sp-meige-right-right-price-jibu-jia {
                                    width: 22px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>