<template>
    <div class="shocan">
        <div class="shocan-top">
            <div class="shocan-top-left">
                <div class="shocan-top-jianto" @click="back">&lt;</div>
                <div class="shocan-top-zi">喜欢的商品</div>
            </div>
            <div class="shocan-top-right">
                <div class="shocan-top-img" @click="tiaozhuan">
                    <img class="auto-img" src="../assets/shopping.png" />
                </div>
                <div class="shocan-top-guanli" @click="quehuan" v-html="chuangdu ? ' ' : guanlikais ? '完成' : '管理'"></div>
            </div>
        </div>
        <div class="shocan-zhong">
            <div class="shocan-zhong-mei" v-show="chuangdu">
                <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="还没有收藏" />
            </div>
            <!-- 全部商品 -->
            <div class="shocan-zhong-you" v-show="!chuangdu">

                <div class="yidengr-gowu">
                    <!-- 购物车的商品 -->
                    <div class="yidengr-gowu-sp">
                        <!-- 循环的每一个商品 -->
                        <div class="yidengr-gowu-sp-meige" v-for="(item, index) in canshuzu" :key="index">
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

                                    <div class="yidengr-gowu-sp-meige-right-right-beizhi">{{ item.beizhi }}</div>

                                    <div class="yidengr-gowu-sp-meige-right-right-price">
                                        <div class="yidengr-gowu-sp-meige-right-right-price-jiage">￥{{ item.price }}</div>


                                        <div class="yidengr-gowu-sp-meige-right-right-price-jibu" v-show="!guanlikais">
                                            <div class="yidengr-gowu-sp-meige-right-right-price-jibu-jia"
                                                @click="jia(index)">
                                                <img class="auto-img" src="../assets/jia.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shocan-xia">
            <!-- 为你精选 -->
            <div class="jinxuan">
                <div class="cainixi-zi">
                    <div class="cainixi-zi-left cainixi-zi-fff"></div>
                    <span>猜你喜欢</span>
                    <div class="cainixi-zi-right cainixi-zi-fff"></div>
                </div>
                <div class="cainidi-img">
                    <div class="cainixi-left">
                        <div class="cainixi-ddd" v-for="(item, index) in dibu" :key="index">
                            <div class="cainixi-xxx" v-if="index % 2 == 0" @click="zhuan(item.product_id)">
                                <div class="cainixi-ddd-img">
                                    <img class="auto-img" :src="item.image_url" />
                                </div>
                                <div class="chini-kkk">
                                    <div class="cainixi-ddd-name">{{ item.name }}</div>
                                    <div class="cainixi-ddd-iwenzi">￥{{ item.price }}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="cainixi-left">
                        <div class="cainixi-ddd" v-for="(item, index) in dibu" :key="index">
                            <div class="cainixi-xxx" v-if="index % 2 != 0" @click="zhuan(item.product_id)">
                                <div class="cainixi-ddd-img">
                                    <img class="auto-img" :src="item.image_url" />
                                </div>
                                <div class="chini-kkk">
                                    <div class="cainixi-ddd-name">{{ item.name }}</div>
                                    <div class="cainixi-ddd-iwenzi">￥{{ item.price }}</div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="shocan-xiamian" v-show="guanlikais && !chuangdu">
            <van-submit-bar button-text="删除" @submit="onSubmit">
                <van-checkbox v-model="chekk" @click="quanxuan">全选</van-checkbox>
            </van-submit-bar>
            <div class="shocan-xiamian-qli">
                <div class="shocan-xiamian-img">
                    <img class="auto-img" src="../assets/saoba.png" />
                </div>
                <div class="shocan-xiamian-zi">清理失效商品</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Shocan',
    data() {
        return {
            dibu: [],
            canshuzu: [],
            chuangdu: true,
            guanlikais: false,
            chekk: true,

        }
    },
    created() {
        let tt = localStorage.getItem('id')
        if (tt) {
            this.aja(tt)
        } else {
            this.aja(12290)
        }
        let sc = JSON.parse(localStorage.getItem('shochan'))
        if (!sc) {
            sc = []
        }
        //
        this.canshuzu = sc
        if (sc.length == 0) {
            this.chuangdu = true
        } else {
            this.chuangdu = false
        }
        this.fzhuang()
    },
    methods: {
        tiaozhuanxq(id) {
            this.$router.push({ name: 'Details', query: id })
        },
        xiaodian(index) {
            //
            this.canshuzu[index].last = !this.canshuzu[index].last
            this.fzhuang()
            localStorage.setItem('shochan', JSON.stringify(this.canshuzu))
        },
        jia() {
            //
        },
        quanxuan() {
            //
            this.canshuzu.forEach(v => {
                v.last = this.chekk
                //
            })
            localStorage.setItem('shochan', JSON.stringify(this.canshuzu))
        },
        onSubmit() {
            //
            let tt = new Array
            for (let t = 0; t < this.canshuzu.length; t++) {
                if (this.canshuzu[t].last) {
                    let duix = new Object
                    for (let key in this.canshuzu[t]) {
                        duix[key] = this.canshuzu[t][key]
                    }
                    tt.unshift(duix)
                    this.canshuzu.splice(t, 1)
                    t--
                }
            }
            if (tt.length == 0) {
                return
            }

            this.$root.shocan -= tt.length
            if (this.canshuzu.length == 0) {
                this.chuangdu = true
            }
            localStorage.setItem('shochan', JSON.stringify(this.canshuzu))
            this.fzhuang()
        },
        quehuan() {
            this.guanlikais = !this.guanlikais
        },
        tiaozhuan() {
            this.$router.push({ name: 'Shopping' })
        },
        //封装每次点击后全选亮不亮和小米亮不亮
        fzhuang() {
            for (let i = 0; i < this.canshuzu.length; i++) {
                if (!this.canshuzu[i].last) {
                    this.chekk = false
                    return
                }
            }
            this.chekk = true
            if (this.canshuzu.length == 0) {
                this.chekk = false
            }
        },
        back() {
            this.$router.back()
        },
        aja(id) {
            this.axios({
                method: 'get',
                url: '/miproduct/recom_btm',
                params: {
                    commodity_id: id
                }
            }).then(res => {
                this.dibu = res.data.data.related_recommend.data
                //
            }).catch(err => {
                //

            })
        },
        zhuan(id) {
            this.$router.push({ name: 'Details', query: id })
        }
    }
}
</script>

<style lang="less" scoped>
::v-deep .van-submit-bar {
    padding-bottom: 10px;
}
::v-deep .van-button--danger{
    background-color: #ff6700 !important;
}

::v-deep .van-submit-bar__bar {
    justify-content: space-between;
}

.shocan-xiamian {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    padding-bottom: 10px;

    .shocan-xiamian-qli {
        position: absolute;
        left: 108px;
        top: -32px;
        display: flex;
        z-index: 100;
        font-size: 15px;
        color: #717171;

        .shocan-xiamian-img {
            width: 20px;
        }
    }
}

.shocan {
    .shocan-top {
        padding: 10px;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        background-color: rgb(248, 248, 248);
        border-bottom: 1px solid #ddd;

        .shocan-top-left {
            display: flex;
            font-size: 15px;
            font-weight: bold;

            .shocan-top-jianto {
                padding-right: 13px;
                line-height: 22px;
            }
        }

        .shocan-top-right {
            display: flex;
            font-size: 13px;
            line-height: 24px;

            .shocan-top-img {
                margin-right: 20px;
                width: 20px;
            }
        }
    }

    .shocan-zhong {
        .shocan-zhong-mei {
            .custom-image .van-empty__image {
                width: 90px;
                height: 90px;
            }
        }

        .shocan-zhong-you {
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
                                    font-size: 15px;
                                    font-weight: 500;
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

    .shocan-xia {
        .jinxuan {
            padding: 0 10px;
            // background-color: white;

            .cainixi-zi {
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
                margin-bottom: 10px;
                display: flex;
                justify-content: center;

                .cainixi-zi-fff {
                    width: 20px;
                    height: 2px;
                    position: relative;
                    top: 10px;
                }

                .cainixi-zi-left {
                    left: -10px;
                    background-image: linear-gradient(to right, white, #717171, black);
                }

                .cainixi-zi-right {
                    right: -10px;
                    background-image: linear-gradient(to left, white, #717171, black);

                }
            }

            .chini-kkk {
                background-color: #dfdddd;
            }

            .cainidi-img {
                display: flex;
                justify-content: space-between;

                .cainixi-left {
                    width: 48%;

                    .cainixi-ddd {
                        width: 100%;
                        background-color: white;
                        margin-top: 10px;

                        .cainixi-xxx {
                            width: 100%;

                            .cainixi-ddd-img {
                                width: 100%;
                            }

                            .cainixi-ddd-name {
                                font-size: 13px;
                                font-weight: bold;
                                height: 26px;
                                margin: 8px 0;
                                box-sizing: border-box;
                                padding: 4px;
                            }

                            .cainixi-ddd-iwenzi {
                                font-size: 15px;
                                font-weight: bolder;
                                color: #f75707;
                                padding-bottom: 2px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>