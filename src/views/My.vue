<template>
    <div class="my">
        <!-- 上面用户区域 -->
        <div class="top">
            <div class="top-hui">
                <div class="top-hui-erwei">
                    <div class="top-hui-zi">会员码</div>
                    <div class="top-hui-ma">
                        <img class="auto-img" src="../assets/mamama.png" />
                    </div>
                </div>
                <div class="top-hui-tubiao top-shang">
                    <img class="auto-img" src="../assets/shezhi.png" />
                </div>
                <div class="top-hui-tubiao top-xia">
                    <img class="auto-img" src="../assets/xinxin.png" />
                </div>
            </div>

            <div class="top-yonghu">
                <div class="top-yonghu-tox">
                    <img class="auto-img" src="../assets/my-active.png" />
                </div>
                <div class="top-yonghu-id">
                    <div class="top-yonghu-id-name">{{ duix.name }}</div>
                    <div class="top-yonghu-id-id">
                        <div class="top-xiaomi">小米ID {{ duix.id }}</div>
                        <div class="top-xiaomi">勋章2枚 ></div>
                    </div>
                </div>
            </div>

            <div class="top-mijin">
                <div class="top-mijin-kuai" v-for="(item,index) in mijin" :key="index">
                    <div class="top-mijin-kuai-top">{{ item.title }}</div>
                    <div class="top-mijin-kuai-xia">{{ item.name }}</div>
                </div>
                <div class="top-mijin-img">
                    <div class="top-mijin-img-ii">
                        <img class="auto-img" src="../assets/qianbao.png" />
                    </div>
                    <div class="top-mijin-kuai-xiaaa">钱包</div>
                </div>
            </div>
        </div>
        <!-- 城市会员 -->
        <div class="chengshi">
            <div class="chengshi-top">
                <div class="chengshi-top-left">
                    <div class="chengshi-top-left-img">
                        <img class="auto-img" src="../assets/zhuanshi.png" />
                    </div>
                    <div class="chengshi-top-left-zi">Lv.1 城市会员</div>
                </div>
                <div class="chengshi-top-right">></div>
            </div>


            <div class="chengshi-xia">
                <div class="chengshi-xia-yy">
                    <div class="chengshi-xia-yy-left">
                        <div class="chengshi-xia-yy-left-name">米金星球</div>
                        <div class="chengshi-xia-yy-left-mi">31米金待领取</div>
                    </div>
                    <div class="chengshi-xia-yy-right">
                        <img class="auto-img" src="../assets/xingqiu.png" />
                    </div>
                </div>
                <div class="chengshi-xia-yy">
                    <div class="chengshi-xia-yy-left">
                        <div class="chengshi-xia-yy-left-name">米金商城</div>
                        <div class="chengshi-xia-yy-left-mi">买前先兑券</div>
                    </div>
                    <div class="chengshi-xia-yy-right">
                        <img class="auto-img" src="../assets/shangdian.png" />
                    </div>

                </div>


            </div>
        </div>

        <!-- 事件操作区域 -->
        <div class="shijian">
            <div class="shijian-top">
                <div class="shijian-top-zi zzzzz" @click="tiaoshocan">
                    <span>收藏</span>
                    <span class="shijian-top-zi-span">{{ $root.shocan }}</span>
                </div>
                <div class="shijian-top-zi zzzzz" @click="tiaozuji">
                    <span>足迹</span>
                    <span class="shijian-top-zi-span">{{ $root.zuji }}</span>
                </div>
                <div class="shijian-top-zi">
                    <span>关注</span>
                    <span class="shijian-top-zi-span">0</span>
                </div>
            </div>
            <div class="shijian-xia">
                <div class="shijian-xia-ge" v-for="(item,index) in fukuan" :key="index" @click="tiaozhuanddan(item)">
                    <div class="shijian-xia-ge-img">
                        <img class="auto-img" :src="item.url" />
                    </div>
                    <div class="shijian-xia-ge-zi">{{ item.title }}</div>
                </div>
            </div>
        </div>
        <!-- 小米服务区域 -->
        <div class="fuwu">
            <div class="fuwu-top">
                <div class="fuwu-top-left">服务</div>
                <div class="fuwu-top-right">
                    <span class="fuwu-ff">查看更多</span>
                    <span>></span>
                </div>
            </div>
            <div class="fuwu-xia">
                <div class="top-tup" v-for="(item,index) in top" :key="index">
                    <div class="top-tup-img">
                        <img class="auto-img" :src="item.url" />
                    </div>
                    <div class="top-tup-zi">{{ item.title }}</div>
                </div>
            </div>
        </div>
        <!-- 为你精选 -->
        <div class="jinxuan">
            <div class="cainixi-zi">为你精选</div>
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
</template>

<script>
export default {
    name: 'My',
    data() {
        return {
            active: 1,
            top: [
                {
                    title: '我要安装',
                    url: require('../assets/anzhuang.png')
                },
                {
                    title: '一键退换',
                    url: require('../assets/qiehuan.png')
                },
                {
                    title: '一键维修',
                    url: require('../assets/weixiu.png')
                },
                {
                    title: '服务进度',
                    url: require('../assets/jindu.png')
                },
                {
                    title: '小米之家',
                    url: require('../assets/iconxiaomi.png')
                },
                {
                    title: '客服中心',
                    url: require('../assets/chengkefu.png')
                },
                {
                    title: '以旧换新',
                    url: require('../assets/huanxin.png')
                },
                {
                    title: '手机电池',
                    url: require('../assets/ludianchi.png')
                },
            ],
            mijin: [
                {
                    title: '132',
                    name: '米金'
                },
                {
                    title: '32',
                    name: '优惠券'
                },
                {
                    title: '0元',
                    name: '红包'
                },
                {
                    title: '20万元',
                    name: '最高额度'
                },

            ],
            fukuan: [
                {
                    url: require('../assets/qianbao.png'),
                    title: '待付款',
                    last: true,
                    atme: '1'
                },
                {
                    url: require('../assets/shohuo.png'),
                    title: '待收货',
                    last: true,
                    atme: '2'
                },
                {
                    url: require('../assets/pinglun.png'),
                    title: '待评价',
                    last: true,
                    atme: '3'
                },
                {
                    url: require('../assets/shoho.png'),
                    title: '退换/售后',
                    last: false
                },
                {
                    url: require('../assets/dingdan.png'),
                    title: '全部订单',
                    last: true,
                    atme: '0'
                }
            ],
            dibu: [],
            duix: {}
        }
    },
    methods: {
        tiaozhuanddan(item) {
            if (item.last) {
                this.$router.push({
                    name: 'Dingdan', query: item.atme, params
                        : this.dibu
                })
            }
        },
        zhuan(id) {
            //
            this.$router.push({ name: 'Details', query: id })
        },
        aa(e) {
            //
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
        tiaoshocan() {
            this.$router.push({ name: 'Shocan' })
        },
        tiaozuji() {
            this.$router.push({ name: 'Zuji' })
        },
    },
    created() {
        this.duix = this.$route.query
        //
        let tt = localStorage.getItem('id')
        if (tt) {
            this.aja(tt)
        } else {
            this.aja(12290)
        }
    },
    beforeRouteEnter(to, from, next) {

        //判断是否登录
        if (to.meta.isLogin) {
            // //
            next();
        } else {
            // //

            //跳转到登录页面
            next('/dengru');
        }

    },

}
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}

.my {
    background-color: #f0efef;
    padding-bottom: 100px;

    .top {
        background-color: white;
        width: 100%;

        .top-hui {
            // height: 30px;
            display: flex;
            padding: 12px 0;
            padding-left: 240px;

            .top-hui-erwei {
                display: flex;
                line-height: 15px;

                .top-hui-zi {
                    margin-top: 2px;
                }

                .top-hui-ma {
                    width: 18px;
                    margin-left: 6px;
                }
            }

            .top-hui-tubiao {
                width: 16px;

            }

            .top-shang {
                margin: 0 15px;
            }

            .top-xia {
                margin-right: 10px;
            }
        }

        .top-yonghu {
            display: flex;
            padding: 0 10px;

            .top-yonghu-tox {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                background-color: red;
            }

            .top-yonghu-id {
                width: 70%;
                height: 40px;

                .top-yonghu-id-name {
                    font-size: 14px;
                    font-weight: bold;
                }

                .top-yonghu-id-id {
                    display: flex;
                    margin-top: 10px;

                    .top-xiaomi {
                        padding: 2px 8px;
                        border-radius: 10px;
                        font-size: 12px;
                        color: rgb(48, 48, 48);
                        background-color: #f0efef;
                        margin-right: 5px;
                    }
                }
            }
        }

        .top-mijin {
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .top-mijin-kuai {
                .top-mijin-kuai-top {
                    font-size: 15px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    text-align: center;
                }

                .top-mijin-kuai-xia {
                    font-size: 10px;
                    color: rgb(164, 164, 164);
                }
            }

            .top-mijin-img {
                .top-mijin-img-ii {
                    width: 30px;
                }

                .top-mijin-kuai-xiaaa {
                    font-size: 10px;
                    text-align: center;
                    color: rgb(164, 164, 164);

                }
            }
        }
    }

    .chengshi {
        padding: 8px 5px;
        margin: 10px;
        background-image: linear-gradient(to right, #f59351, #ff6700);
        border-radius: 10px;

        .chengshi-top {
            display: flex;
            justify-content: space-between;
            margin-top: 3px;
            color: white;


            .chengshi-top-left {
                display: flex;

                .chengshi-top-left-img {
                    width: 20px;
                    margin-right: 5px;
                }

                .chengshi-top-left-zi {
                    font-size: 14px;
                    font-weight: bold;
                }
            }

        }

        .chengshi-xia {
            display: flex;
            justify-content: space-between;

            .chengshi-xia-yy {
                width: 49%;
                background-color: white;
                border-radius: 5px;
                padding: 13px 8px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                padding-right: 10px;

                .chengshi-xia-yy-right {
                    width: 42px;
                }

                .chengshi-xia-yy-left {
                    .chengshi-xia-yy-left-name {
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .chengshi-xia-yy-left-mi {
                        font-size: 10px;
                        color: #ff6700;
                        margin-top: 3px;
                    }
                }
            }
        }
    }

    .shijian {
        padding: 10px;
        margin: 10px;
        background-color: white;

        .shijian-top {
            display: flex;
            padding-top: 3px;
            padding-bottom: 8px;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;

            .zzzzz {
                border-right: 1px solid #ddd;

            }

            .shijian-top-zi {
                width: 33%;
                color: #939393;
                font-size: 12px;
                text-align: center;

                .shijian-top-zi-span {
                    font-weight: bold;
                    color: black;
                    margin-left: 3px;
                }
            }
        }

        .shijian-xia {
            display: flex;
            justify-content: space-between;
            padding: 15px 3px 1px;
            box-sizing: border-box;

            .shijian-xia-ge {
                width: 20%;
                text-align: center;

                .shijian-xia-ge-img {
                    width: 42%;
                    margin-left: 30%;
                    margin-bottom: 5px;
                }
            }
        }
    }

    .fuwu {
        margin: 10px;
        padding: 10px;
        background-color: white;
        border-radius: 10px;
        padding-bottom: 0;

        .fuwu-top {
            display: flex;
            justify-content: space-between;
            color: #a8a8a8;

            .fuwu-ff {
                margin-right: 6px;
            }

            .fuwu-top-left {
                font-size: 14px;
                font-weight: bold;
                color: black;
            }
        }

        .fuwu-xia {
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 5px;
            box-sizing: border-box;
            margin-top: 12px;
            margin-bottom: 15px;

            .top-tup {
                width: 25%;
                margin-bottom: 15px;

                .top-tup-img {
                    width: 40%;
                    margin-left: 32%;
                    margin-bottom: 5px;
                }

                .top-tup-zi {
                    text-align: center;
                }
            }
        }
    }

    .jinxuan {
        padding: 0 10px;
        // background-color: white;

        .cainixi-zi {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
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

// .van-tabbar--fixed {
//     position: absolute !important;
//     top: 20px !important;
// }
</style>