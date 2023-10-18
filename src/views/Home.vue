<template>
    <div>
        <div>
            <router-view></router-view>
        </div>
        <!-- 顶部大图片区域 -->
        <div class="top">
            <div class="top-shang">
                <div class="top-shang-tt">
                    <img class="auto-imga" src="../assets/tobudatu.png">
                </div>
                <div class="top-tobu" :class="{ atme: islast }">
                    <div class="top-tobu-yi top-tobu-yiqi" v-show="!islast">
                        <img class="auto-img" src="../assets/icon-to.png">
                    </div>
                    <div class="top-tobu-er" :class="{ atme: islast }" @click="tiaoSosuo">
                        <div class="top-tobu-er-sosuo top-tobu-er-ii">
                            <img class="auto-img" src="../assets/sosuo.png">
                        </div>
                        <div class="top-tobu-er-input ">
                            <input :class="{ atme: islast }" type="text" placeholder="请输入您的商品">
                        </div>
                        <div class="top-tobu-er-soma top-tobu-er-ii">
                            <img class="auto-img" src="../assets/saoyisao.png" />
                        </div>
                    </div>
                    <div class="top-tobu-san top-tobu-yiqi">
                        <img class="auto-img" v-show="!islast" src="../assets/erweima.png">
                        <img class="auto-img" v-show="islast" src="../assets/heierweima.png">
                    </div>
                    <div class="top-tobu-si top-tobu-yiqi">
                        <img class="auto-img" v-show="!islast" src="../assets/xiaoxi.png">
                        <img class="auto-img" v-show="islast" src="../assets/pinglun.png">
                    </div>
                </div>
            </div>

            <div class="top-zhong">
                <div class="top-zhong-shoji top-zhong-jjj">
                    <div class="top-zhong-wenz">Xiaomi Pad 6 Pro</div>
                    <div class="top-zhong-xiaozi">年度旗舰新品</div>
                    <div class="top-zhong-img">
                        <img class="auto-img" src="../assets/shojiyi.png" />
                    </div>
                </div>
                <div class="top-zhong-shobiao top-zhong-jjj">
                    <div class="top-zhong-wenz">小米手环8 NFC版</div>
                    <div class="top-zhong-xiaozi">多样快拆时尚腕带</div>
                    <div class="top-zhong-img">
                        <img class="auto-img" src="../assets/shobiaoyi.png" />
                    </div>
                </div>
                <div class="top-zhong-shoyinji top-zhong-jjj">
                    <div class="top-zhong-wenz">科技潮品</div>
                    <div class="top-zhong-xiaozi">重磅换新发布</div>
                    <div class="top-zhong-img">
                        <img class="auto-img" src="../assets/shoyinji.png" />
                    </div>
                </div>
            </div>

            <div class="top-xia fu">
                <div class="top-xia-tis">
                    <div class="top-xia-tis-zi">
                        <div class="top-xia-tis-img">
                            <img class="auto-img" src="../assets/emichenggo.png" />
                        </div>
                        <div class="top-xia-tis-wenzi">官方商城</div>
                    </div>

                    <div class="top-xia-tis-zi">
                        <div class="top-xia-tis-img">
                            <img class="auto-img" src="../assets/emichenggo.png" />
                        </div>
                        <div class="top-xia-tis-wenzi">售后无忧</div>
                    </div>

                    <div class="top-xia-tis-zi">
                        <div class="top-xia-tis-img">
                            <img class="auto-img" src="../assets/emichenggo.png" />
                        </div>
                        <div class="top-xia-tis-wenzi">资质证照</div>
                    </div>
                </div>
                <div class="top-xia-xuanz fu">
                    <div class="top-xia-xuanz-zi" @click="dianji(index, item)" :class="{ active: gaoliang === index }"
                        v-for="(item, index) in wenzi" :key="index">{{
                            item.name }}</div>
                </div>
            </div>
        </div>

        <!-- 轮播图区域 -->
        <div class="left">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in datup" :key="index">
                    <img class="auto-img" :src="item.url" />
                </van-swipe-item>
            </van-swipe>
        </div>


        <!-- 瀑布流商品区域 -->
        <div class="buttom ">
            <div class="buttom-left">
                <Shangp :ttt="item" v-for="(item, index) in zhong" :key="index" v-if="index % 2 == 0" @ggg="dian">
                </Shangp>
            </div>
            <div class="buttom-right">
                <Shangp :ttt="item" v-for="(item, index ) in zhong " :key="index" v-if="index % 2 != 0" @ggg="dian">
                </Shangp>
            </div>
        </div>
        <div class="buttom-tui " v-for="(item, index) in changtiao " :key="index">
            <div class="buttom-tuijain fu">
                <img class="auto-img" :src="item.url" />

            </div>
        </div>
    </div>
</template>

<script>
import Shangp from '../components/Shangp.vue'
export default {
    name: 'Home',
    components: {
        Shangp
    },

    data() {
        return {
            wenzi: [],
            gaoliang: 1,
            genduo: [],
            chushi: [],
            zhong: [],
            datup: [],
            changtiao: [],
            scroll: 0,
            islast: false

        }
    },
    created() {
        this.aa()
        this.datu()
        this.huoqu(10288)
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        tiaoSosuo() {
            //
            this.$router.push({ name: 'Sosuo' })
        },
        handleScroll() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop

            if (this.scroll > 160) {
                this.islast = true
            } else if (this.scroll <= 160) {
                this.islast = false
            }
        },
        dian(e) {
            // //
            this.$router.push({ name: 'Details', query: e })
        },
        dianji(index, item) {
            if (this.gaoliang == index) {
                return
            }
            this.gaoliang = index
            //
            let page_id = item.page_id
            this.huoqu(page_id)
        },
        jisuan() {
            //
            this.zhong = []
            this.changtiao = []
            let kaig = true
            let kk = false
            this.chushi.forEach((item, index) => {
                // //
                let duix;
                if (item.body.items == undefined) {
                    if (kk) {
                        // //
                        kaig = true
                        let cc = this.changtiao.length - 1
                        this.changtiao.splice(cc, 1)
                    }

                }
                else if (item.body.items.length >= 1) {
                    item.body.items.forEach((item, index) => {
                        if (item.material_id == undefined && item.product_id == undefined) {
                            kk = true
                            if (kaig) {
                                // //
                                duix = {
                                    url: item.img_url,
                                    url_img: item.img_url_webp,
                                    last: false
                                }
                                kaig = false
                            } else {
                                // //
                                duix = {
                                    url: item.img_url,
                                    url_img: item.img_url_webp,
                                    type: item.path_type,
                                    last: false
                                }
                                kaig = false
                                let cc = this.zhong.length - 1
                                this.changtiao.splice(cc, 1)
                            }
                            this.changtiao.push(duix)
                        } else if (item.product_id) {
                            kk = false
                            kaig = true
                            // //
                            let xx = {
                                name: item.product_name,
                                jieshao: item.product_brief,
                                url: item.img_url,
                                url_img: item.img_url_webp,
                                price: item.product_price,
                                jiaprice: item.show_price,
                                id: item.product_id,
                                last: true
                            }
                            this.zhong.push(xx)
                        }

                    })
                }

            })
            // //
            // //
        },
        //获取五个大图片
        datu() {
            this.axios({
                method: 'get',
                url: '/home/page',
                params: {
                    page_type: "activity",
                    page_id: 10288
                }
            }).then(res => {
                // //
                let aa = res.data.data.data.sections[0]
                // //
                aa.body.items.forEach((item, index) => {
                    let ddd = {
                        id: item.material_id,
                        url: item.img_url,
                        url_img: item.img_url_webp,
                    }
                    this.datup.push(ddd)
                })


            }).catch(err => {
                // //

            })

        },

        // 获取点击五个获取文件
        huoqu(page_id) {
            this.axios({
                method: 'get',
                url: '/home/page',
                params: {
                    page_type: "activity",
                    page_id
                }
            }).then(res => {
                // //
                this.chushi = res.data.data.data.sections
                // //
                // //
                this.jisuan()


            }).catch(err => {
                // //

            })
        },

        // 获取推荐等待五个的
        aa() {
            this.axios({
                method: 'get',
                url: '/home/page',
                params: {
                }
            }).then(res => {
                // //

                //
                this.wenzi = res.data.data.tabs;

            }).catch(err => {
                // //

            })

        }
    },
    computed: {

    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    }

}
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}

body {
    background-color: #eeecec;
}

.fu {
    width: 96px;
    margin: 0 auto;
}

.top {
    width: 100%;
    height: 500px;
    background-color: #ddd;

    .top-shang {

        height: 60%;
        position: relative;
        z-index: 1;

        .top-shang-tt {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;

            .auto-imga {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .top-tobu-yiqi {
            width: 14%;
            padding: 0 10px;
        }

        .top-tobu {
            width: 100%;

            position: fixed;
            top: 0px;
            z-index: 999;
            display: flex;
            justify-content: space-between;
            // background-color: rgba(0, 0, 0, .2);
            padding: 0 5px;
            padding: 10px 0 6px 0;

            // border-radius: 15px;
            &.atme {
                background-color: white;
            }

            .top-tobu-er {
                width: 55%;
                display: flex;
                justify-content: space-between;
                height: 35px;
                background-color: white;
                border-radius: 13px;
                padding: 0 10px;

                &.atme {
                    background-color: #e9e8e8;
                    width: 68%;
                    margin-left: 7px;
                }

                .top-tobu-er-ii {
                    width: 10%;
                    margin-top: 6px;
                }

                .top-tobu-er-input {
                    width: 65%;
                    height: 80%;
                    margin-top: 3px;

                    input {
                        width: 100%;
                        outline: none;
                        height: 100%;
                        border: 1px solid transparent;

                        &.atme {
                            background-color: #e9e8e8;
                        }

                    }
                }
            }
        }
    }

    .top-zhong {
        z-index: 2;
        position: absolute;
        width: 97%;
        top: 240px;
        left: 5px;
        display: flex;
        height: 110px;
        justify-content: space-between;

        .top-zhong-jjj {
            width: 33%;
            flex-grow: 1;
            text-align: center;
            background-color: white;
            box-sizing: border-box;
            // padding: 10px;
            background-color: #eae9e9;
            position: absolute;
            left: 2px;
            height: 100%;

            .top-zhong-wenz {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 3px;
                margin-top: 5px;
            }

            .top-zhong-xiaozi {
                margin-bottom: 3px;
                font-size: 10px;
            }

            .top-zhong-img {
                width: 50%;
                // position: absolute;
                // left: 10px;
                // bottom: 10px;
                margin-left: 30px;
                margin-top: 10px;
            }
        }

        .top-zhong-shobiao {
            top: -10px;
            left: 122px;
            height: calc(100% + 10px);
            background-color: #f7f2f2;

            .top-zhong-img {
                width: 60%;
                margin-left: 25px;
            }
        }

        .top-zhong-shoyinji {
            left: 242px;
        }
    }

    .top-xia {
        width: 100%;
        padding: 10px;
        height: 40%;
        padding-top: 70px;
        background-color: white;

        .top-xia-tis {
            display: flex;
            padding: 10px 20px;
            width: 100%;
            justify-content: space-between;

            .top-xia-tis-zi {
                width: 23%;
                display: flex;
                color: #b6b4b4;
                line-height: 14px;

                .top-xia-tis-img {
                    width: 20%;
                    margin-right: 5px;

                }

                .top-xia-tis-wenzi {
                    font-size: 10px;

                }
            }

        }

        .top-xia-xuanz {
            display: flex;
            height: 40px;
            width: 100%;
            margin-top: 10px;
            border-radius: 22px;
            overflow: hidden;

            .top-xia-xuanz-zi {
                text-align: center;
                width: 20%;
                line-height: 40px;
                background-color: #ece9e9;

                &.active {
                    background-color: #ff6700;
                    color: white;
                }
            }
        }
    }
}

.left {
    padding: 0 7.5px;
    height: 188px;
    margin-top: -15px;

    .my-swipe .van-swipe-item {
        height: 100%;
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;

    }
}

.buttom {
    width: 100%;
    // height: 500px;
    background-color: #e8e6e6;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-bottom: 10px;

    .buttom-left {
        margin-left: 7.5px;
        margin-top: 10px;
    }

    .buttom-right {
        margin-right: 7.5px;
        margin-top: 10px;
    }
}

.buttom-tui {
    background-color: #e8e6e6;

    width: 100%;
    padding-bottom: 62px;

    .buttom-tuijain {
        width: 96%;
    }
}
</style>