<template>
    <div class="dingdan">
        <div class="dingdan-top">
            <div class="dingdan-top-left">
                <div class="dingdan-top-jianto" @click="back">&lt;</div>
                <div class="dingdan-top-zi">我的订单</div>
            </div>
            <div class="dingdan-top-right">
                <div class="dingdan-top-sosuo">
                    <img class="auto-img" src="../assets/sosuo.png" />
                </div>
                <div class="dingdan-top-img" @click="tiaozhuanshop">
                    <img class="auto-img" src="../assets/shopping.png" />
                </div>
            </div>
        </div>

        <div class="dingdan-xia">
            <van-tabs v-model="active" animated swipeable>
                <van-tab v-for="(kk, ind) in xuan" :key="ind" :title="kk.title">
                    <!-- 有数据的情况下 -->
                    <div class="dingdan-x" v-show="changdu">
                        <div class="dingdan-waimian" v-for="(item, index) in dingdan" :key="index">
                            <div class="dingdan-xia-you" v-if="item[0] == active || active == 0">
                                <!-- 一次购买商品的上部分 -->
                                <div class="dingdan-xia-you-top">
                                    <div class="dingdan-xia-you-top-left">
                                        <div class="dingdan-xia-you-top-img">
                                            <img class="auto-img" src="../assets/iconxiaomi.png" />
                                        </div>
                                        <div class="dingdan-xia-you-top-zi">小米商城</div>
                                    </div>
                                    <div class="dingdan-xia-you-top-right"
                                        v-html="item[0] == 0 ? '已收货' : item[0] == 1 ? '待付款' : item[0] == 2 ? '待收货' : '待评价'">
                                    </div>
                                </div>
                                <!-- 一次购买的所有商品 -->
                                <div class="dingdan-xia-you-zhong" v-for="(tt, ii) in item[4]" :key="ii">
                                    <div class="dingdan-xia-you-zhong-left">
                                        <img class="auto-img" :src="tt.url" />
                                    </div>
                                    <div class="dingdan-xia-you-zhong-right">
                                        <div class="dingdan-xia-you-zhong-shang">
                                            <div class="dingdan-xia-you-zhong-name">{{ tt.name }}</div>
                                            <div class="dingdan-xia-you-zhong-price">￥{{ tt.price }}</div>
                                        </div>
                                        <div class="dingdan-xia-you-zhong-xia">
                                            <div class="dingdan-xia-you-zhong-beizhi">{{ tt.beizhi }}</div>
                                            <div class="dingdan-xia-you-zhong-value">x{{ tt.value }}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 一次购买商品的下部分 -->
                                <div class="dingdan-xia-you-xia">
                                    <div class="dingdan-xia-you-xia-top">
                                        <div class="dingdan-xia-you-xia-left">{{ item[1] }}</div>
                                        <div class="dingdan-xia-you-xia-right">
                                            <div class="dingdan-xia-you-xia-zi">共{{ item[2] }}件商品 实付金额：</div>
                                            <div class="dingdan-xia-you-xia-price">￥{{ item[3] }}</div>
                                        </div>
                                    </div>
                                    <div class="dingdan-xia-you-xia-bottom" @click="shanchu(index)" v-if="item[0] == 0">删除订单
                                    </div>
                                    <div class="dingdan-xia-you-xia-bottom" @click="qufukuan(index)" v-if="item[0] == 1">去付款
                                    </div>
                                    <div class="dingdan-xia-you-xia-bottom" @click="querenshohuo(item, index)"
                                        v-if="item[0] == 2">
                                        确认收货</div>
                                    <div class="dingdan-xia-you-xia-bottom" @click="qupingjia(index)" v-if="item[0] == 3">
                                        去评价
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 没有数据所以显示空状态 -->
                    <div class="dingdan-xia-meiyou" v-show="kk.last">
                        <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                            :description="kk.text" />
                    </div>
                    <!-- 下面的猜你喜欢 -->
                    <div class="dingd-xia" v-if="ind > 0">
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
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
 
<script>
export default {
    name: 'Dingdan',
    data() {
        return {
            active: 0,
            dibu: [],
            dingdan: [],
            changdu: true,
            xuan: [
                {
                    title: '全部',
                    last: true,
                    text: '暂时还没有订单'
                },
                {
                    title: '待付款',
                    last: true,
                    text: '没有待付款订单'
                },
                {
                    title: '待收货',
                    last: true,
                    text: '没有待收货订单'
                },
                {
                    title: '待评价',
                    last: true,
                    text: '没有待评价订单'
                }
            ],
            erwei: [[], [], [], []]
        }
    },
    methods: {
        //点击按钮区域
        shanchu(index) {
            //
            this.dingdan.splice(index, 1)
            this.panding(0)
            //
            localStorage.setItem('lishi', JSON.stringify(this.dingdan))
        },
        qufukuan(index) {
            //
        },
        querenshohuo(item, index) {
            // //
            //
            let kk = [...this.dingdan[index]]
            kk[0] = 0
            this.dingdan.splice(index,1,kk)
            this.panding(2)
            // //

            //
            localStorage.setItem('lishi', JSON.stringify(this.dingdan))
        },
        qupingjia(index) {
            //
        },
        //封装判定是否没有数据
        panding(shu) {
            let tt = true
            for (let i = 0; i < this.dingdan.length; i++) {
                if (this.dingdan[i][0] == shu) {
                    //
                    tt = false
                    break
                }
            }
            //
            if (tt) {
                //
                this.xuan[shu].last = true
            }

        },
        zhuan(id) {
            this.$router.push({ name: 'Details', query: id })
        },
        tiaozhuanshop() {
            this.$router.push({ name: 'Shopping' })
        },
        back() {
            this.$router.back()
        }
    },
    created() {
        let kk = this.$route
        let shuzu = kk.params
        this.active = Number(kk.query)
        for (let key in kk.params) {
            this.dibu.push(kk.params[key])
        }
        let mai = JSON.parse(localStorage.getItem('gomai'))
        if (mai) {
            this.dingdan = mai
            this.xuan[0].last = false
        }
        if (this.dingdan.length == 0) {
            this.changdu = false
        }
        this.dingdan.forEach((v, i) => {
            this.xuan[v[0]].last = false
            if (v[0] == 0) {
                this.erwei[0].push(v)
            } else {
                this.erwei[v[0]].push(v)
                this.erwei[0].push(v)
            }
        })
    }

}
</script>

<style lang="less" scoped>
.dingdan {
    padding-top: 41px;
    background-color: #ebebeb;

    .dingdan-x {
        margin-top: -0px;
    }



    .dingdan-xia-you {
        background-color: white;
        margin-top: 8px;
        padding-left: 10px;

        .dingdan-xia-you-top {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #a7a6a6;
            padding: 5px 8px;
            margin-left: -10px;

            .dingdan-xia-you-top-left {
                display: flex;
                font-size: 13px;
                font-weight: 600;

                .dingdan-xia-you-top-img {
                    margin-right: 5px;
                    width: 20px;
                }
            }

            .dingdan-xia-you-top-right {
                color: #ff4800;
            }
        }

        .dingdan-xia-you-zhong {
            display: flex;
            padding: 12px 10px;
            padding-left: 0px;
            border-top: 1px solid #ddd;
            margin-top: -1px;

            .dingdan-xia-you-zhong-left {
                width: 60px;
                height: 60px;
                margin-right: 6px;
                background-color: #717171;
            }

            .dingdan-xia-you-zhong-right {
                width: 295px;

                .dingdan-xia-you-zhong-shang {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    color: black;
                    margin-top: 6px;
                    overflow: hidden;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;

                    .dingdan-xia-you-zhong-name {
                        font-weight: 600;
                        width: 245px;
                    }

                    .dingdan-xia-you-zhong-price {
                        color: #a5a5a5;
                        width: 80px;
                        text-align: center;
                        font-size: 13px;
                    }
                }

                .dingdan-xia-you-zhong-xia {
                    display: flex;
                    justify-content: space-between;
                    font-size: 10px;
                    color: #a5a5a5;
                    margin-top: 10px;
                    overflow: hidden;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;

                    .dingdan-xia-you-zhong-beizhi {
                        width: 245px;
                        font-size: 12px;
                    }

                    .dingdan-xia-you-zhong-value {
                        width: 80px;
                        text-align: center;
                    }
                }
            }
        }

        .dingdan-xia-you-xia {
            box-sizing: border-box;
            margin-left: -10px;
            border-top: 1px solid #ddd;

            padding: 10px 15px 10px 10px;

            .dingdan-xia-you-xia-top {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                color: #a5a5a5;
                box-sizing: border-box;

                .dingdan-xia-you-xia-left {
                    font-size: 8px;
                }

                .dingdan-xia-you-xia-right {
                    display: flex;

                    .dingdan-xia-you-xia-zi {
                        color: black;
                        margin-right: 5px;
                    }

                    .dingdan-xia-you-xia-price {
                        font-size: 16px;
                    }
                }
            }

            .dingdan-xia-you-xia-bottom {
                padding: 4px 6px;
                font-size: 10px;
                border: 1px solid #ddd;
                color: #717171;
                display: inline-block;
                position: relative;
                left: 290px;
            }
        }
    }

    .dingdan-top {
        position: fixed;
        top: 0;
        left: 0;
        padding: 10px 20px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        background-color: #fafafa;

        .dingdan-top-left {
            display: flex;
            font-size: 15px;
            font-weight: 600;

            .dingdan-top-jianto {
                padding-right: 13px;
                margin-top: 2px;
            }
        }

        .dingdan-top-right {
            display: flex;

            .dingdan-top-sosuo {
                width: 20px;
                margin-right: 15px;
            }

            .dingdan-top-img {
                width: 20px;
            }
        }
    }

    .dingd-xia {
        padding: 0 10px;

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

.custom-image .van-empty__image {
    width: 90px;
    height: 90px;
}

::v-deep .van-tabs__line {
    background-color: #ff6700;
    height: 2px;
}

::v-deep .van-tab--active {
    color: #ff6700;
}
</style>