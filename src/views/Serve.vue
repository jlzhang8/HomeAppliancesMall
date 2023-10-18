<template>
    <div class="serve">
        <div class="sosuo">
            <van-search shape="round" background="#ededed" placeholder="请输入搜索关键词" />
            <div class="sosuo-img">
                <div class="sosuo-img-aa">
                    <img class="auto-img" src="../assets/mokuai.png" alt="">
                </div>
            </div>
        </div>
        <!-- 上吗图片 -->
        <div class="top">
            <div class="top-tup" v-for="(item,index) in top" :key="index">
                <div class="top-tup-img">
                    <img class="auto-img" :src="item.url" />
                </div>
                <div class="top-tup-zi">{{ item.title }}</div>
            </div>
        </div>

        <!-- 我的设备 -->

        <div class="shebei">
            <div class="shebei-zi">我的设备</div>
            <div class="shebei-shoji">
                <div class="shebei-shoji-top">
                    <span class="shoji-top-ss">自动识别手机保修期于跟多米家设备</span>
                    <span class="shoji-top-s">立即识别</span>
                </div>
                <div class="shebei-shoji-zhong">
                    <div class="shebei-shoji-zhong-img">
                        <img class="auto-img" src="../assets/homishoji.png" />
                    </div>
                    <div class="shebei-shoji-zhong-zi">
                        <div class="shebei-shoji-zhong-zi-yi on-suo">Redmi K20 Pro 尊享版 12G+512GB</div>
                        <div class="shebei-shoji-zhong-zi-er">保修期：立即识别后查看</div>
                        <div class="shebei-shoji-zhong-zi-san">当前设备</div>
                    </div>
                </div>
                <div class="shebei-shoji-xia">
                    <div class="shebei-shoji-xia-da" v-for="(item,index) in shoji" :key="index">
                        <div class="shebei-shoji-xia-img">
                            <img class="auto-img" :src="item.url" />
                        </div>
                        <div class="shebei-shoji-xia-zi">{{ item.title }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 服务优选 -->
        <div class="fuwyyou">
            <div class="fuwuyou-top">服务优选</div>
            <div class="fuwuyou-xia">
                <div class="fuwuyou-xia-left">
                    <div class="fuwuyou-xia-left-p">首销惊喜价32元起</div>
                    <div class="fuwuyou-xia-left-zi">小米定制.专业摄影</div>
                </div>
                <div class="fuwuyou-xia-left">
                    <div class="fuwuyou-xia-left-p">MiCare无忧版</div>
                    <div class="fuwuyou-xia-left-zi">全新上市 首发七折</div>
                </div>

            </div>
        </div>

        <!-- 猜你想问 -->
        <div class="caicai">
            <div class="caicai-top">
                <div class="caicai-top-left">猜你想问</div>
                <div class="caicai-top-right">
                    <div class="caicai-top-tt">换一换</div>
                    <div class="caicai-top-img">
                        <img class="auto-img" src="../assets/huanyihuan.png" />
                    </div>
                </div>
            </div>

            <div class="caicai-wen">
                <ul>
                    <li v-for="item in lll">{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Serve',
    data() {
        return {

            top: [
                {
                    title: '我要安装',
                    url: require('../assets/anzhuang.png')
                },
                {
                    title: '我要维修',
                    url: require('../assets/weixiu.png')
                },
                {
                    title: '我要退换',
                    url: require('../assets/tuihuan.png')
                },
                {
                    title: '服务进度',
                    url: require('../assets/jindu.png')
                },
                {
                    title: '以旧换新',
                    url: require('../assets/huanxin.png')
                },
                {
                    title: '维修价格',
                    url: require('../assets/jiage.png')
                },
                {
                    title: '我要贴膜',
                    url: require('../assets/tiemo.png')
                },
                {
                    title: '全部服务',
                    url: require('../assets/quanbu.png')
                },
            ],
            shoji: [
                {
                    title: '手机自检',
                    url: require('../assets/zhijian.png')
                },
                {
                    title: '电池换新',
                    url: require('../assets/dianchi.png')
                },
                {
                    title: '后盖彩膜',
                    url: require('../assets/caimo.png')
                },
                {
                    title: '以旧换新',
                    url: require('../assets/jiuhuanxin.png')
                },
            ],
            lll: [
                '我的订单多久发货',
                '我向取消/修改订单',
                '小米售后服务政策',
                '如何申请售后',
                '售后申请如何取消或者修改',
            ]
        }
    },
   
}
</script>

<style lang="less" scoped>
.serve {
    background-color: #ededed;
    padding: 10px;
    padding-bottom: 60px;
    box-sizing: border-box;


    .top {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        padding-bottom: 5px;
        box-sizing: border-box;
        background-color: white;
        margin-top: 12px;
        margin-bottom: 15px;
        border-radius: 10px;

        .top-tup {
            width: 25%;
            margin-bottom: 15px;

            .top-tup-img {
                width: 30%;
                margin-left: 35%;
                margin-bottom: 5px;
            }

            .top-tup-zi {
                text-align: center;
            }
        }
    }

    .shebei {
        .shebei-zi {
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
        }

        .shebei-shoji {
            padding: 15px 8px;
            background-color: white;
            box-sizing: border-box;
            width: 100%;
            border-radius: 10px;

            .shebei-shoji-top {
                width: calc(100% - 15px);
                padding: 8px;
                background-color: #ededed;
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                color: black;
                border-radius: 5px;

                .shoji-top-s {
                    font-size: 12px;
                    color: white;
                    background-color: #ff7600;
                    padding: 5px 7px;
                    border-radius: 11px;
                    text-align: center;
                }

                .shoji-top-ss {
                    margin-top: 5px;
                }
            }

            .shebei-shoji-zhong {
                display: flex;
                margin-top: 12px;

                .shebei-shoji-zhong-img {
                    width: 80px;
                    margin: 0 12px;
                }

                .shebei-shoji-zhong-zi {
                    padding-top: 12px;
                    width: 240px;

                    .shebei-shoji-zhong-zi-yi {
                        font-size: 18px;
                        font-weight: bold;
                    }

                    .shebei-shoji-zhong-zi-er {
                        margin: 5px 0;
                    }

                    .shebei-shoji-zhong-zi-san {
                        border: 1px solid #cbcbcb;
                        padding: 0px 4px;
                        padding-bottom: 2px;
                        border-radius: 3px;
                        display: inline-block;
                        color: #8d8d8d;
                    }
                }




            }

            .shebei-shoji-xia {
                width: 100%;
                box-sizing: border-box;
                padding: 20px;
                display: flex;
                text-align: center;

                .shebei-shoji-xia-da {
                    width: 25%;

                    .shebei-shoji-xia-img {
                        margin-left: 26%;
                        margin-bottom: 10px;
                        width: 50%;
                    }
                }
            }
        }
    }

    .fuwyyou {
        .fuwuyou-top {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .fuwuyou-xia {
            display: flex;
            justify-content: space-between;

            .fuwuyou-xia-left {
                padding: 15px 10px;
                width: 49%;
                background-color: white;
                border-radius: 10px;
                box-sizing: border-box;
                padding-left: 15px;

                .fuwuyou-xia-left-p {
                    font-weight: bold;
                    font-size: 14px;
                    margin-bottom: 6px;
                }

                .fuwuyou-xia-left-zi {
                    color: #8d8d8d;
                    font-size: 8px;
                }
            }
        }
    }

    .caicai {
        .caicai-top {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .caicai-top-left {
                font-size: 16px;
                font-weight: bold;
            }

            .caicai-top-right {
                display: flex;
                font-size: 10px;
                color: #8d8d8d;

                .caicai-top-img {
                    width: 13px;
                    margin-left: 3px;
                    margin-top: 1px;
                }
            }
        }

        .caicai-wen {
            padding: 15px 10px;
            padding-bottom: 1px;
            border-radius: 10px;
            background-color: white;

            ul {
                margin-left: 15px;
            }

            li {
                margin-bottom: 20px;
                margin-left: 5px;
                list-style-type: disc;
            }
        }
    }
}

.sosuo {
    display: flex;

    .sosuo-img {
        width: 14%;
        box-sizing: border-box;
        padding: 15px;
        background-color: #ededed;

        .sosuo-img-aa {
            width: 100%;

        }
    }

    ::v-deep .van-search {
        width: 86%;
    }
}
</style>