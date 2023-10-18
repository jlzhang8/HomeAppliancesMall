<template>
    <div class="shopping">
        <div class="shopping-to">
            <span>购物车</span>
            <span v-show="$root.last && !chuangdu" class="shopping-bianji" @click="qiehuanbj"
                v-html="ziti ? `编辑` : '完成'"></span>

        </div>

        <!-- 没有登入的情况 -->
        <div class="mydengr" v-if="!$root.last">
            <van-empty description="还没有登入，先登入吧">
                <van-button round type="danger" class="bottom-button" @click="tiaodengt">登入</van-button>
            </van-empty>
        </div>
        <div class="yidengr" v-if="$root.last">
            <div class="duoduoduo" v-show="chuangdu">
                <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                    description="购物车还是空的" />
                <button class="yideng-ann" @click="suibian">随便看看</button>
            </div>
            <!-- 全部商品 -->
            <div class="yidengr-gowu" v-show="!chuangdu">
                <!-- 小米自营 -->
                <div class="yidengr-gowu-top">
                    <div class="yidengr-gowu-top-left">
                        <div class="yidengr-gowu-top-left-img" @click="ziyingdian" :class="{ atme: ziying }">
                            <img v-show="!ziying" class="auto-img" src="../assets/duiduidui.png" />
                        </div>
                        <div class="yidengr-gowu-top-left-zi">小米自营</div>
                    </div>

                    <div class="yidengr-gowu-top-right">
                        <div class="yidengr-gowu-top-right-img">
                            <img class="auto-img" src="../assets/jinggao.png" />
                        </div>
                        <div class="yidengr-gowu-top-left-zi" v-html="jisuan > 69 ? '以免运费' : '满69元免运费'"></div>
                    </div>
                </div>
                <!-- 购物车的商品 -->
                <div class="yidengr-gowu-sp">
                    <!-- 循环的每一个商品 -->
                    <div class="yidengr-gowu-sp-meige" v-for="(item, index) in gowuche" :key="index">
                        <!-- 左边的点击 -->
                        <div class="yidengr-gowu-sp-meige-left">
                            <div class="yidengr-gowu-sp-meige-left-img" @click="xiaodian(index)"
                                :class="{ atme: !item.last }">
                                <img v-show="item.last" class="auto-img" src="../assets/duiduidui.png" />
                            </div>
                        </div>
                        <!-- 右边的商品介绍 -->
                        <div class="yidengr-gowu-sp-meige-right">
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
                                    <div class="yidengr-gowu-sp-meige-right-right-price-jibu">
                                        <div class="yidengr-gowu-sp-meige-right-right-price-jibu-jian" @click="jian(index)">
                                            <img class="auto-img" src="../assets/jian.png" />
                                        </div>
                                        <div class="yidengr-gowu-sp-meige-right-right-price-jibu-zi">{{ item.value }}</div>
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
        </div>
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

        <!-- 最下面的结算 -->
        <div class="sp-jiesuan" v-show="$root.last && !chuangdu">
            <div class="sp-jiesuan-bianji" v-show="ziti">
                <van-submit-bar :price="jisuan * 100" button-text="提交订单" @submit="onSubmit">
                    <van-checkbox @click="a" v-model="checked">全选</van-checkbox>
                </van-submit-bar>
            </div>
            <div class="sp-jiesuan-wancheng">
                <div class="sp-jiesuan-wancheng-left" @click="aa">
                    <div class="sp-jiesuan-wancheng-img" :class="{ atme: !checked }">
                        <img v-show="checked" class="auto-img" src="../assets/duiduidui.png" />
                    </div>
                    <div class="sp-jiesuan-wancheng-xuan">全选</div>
                </div>
                <div class="sp-jiesuan-wancheng-right">
                    <div class="sp-jiesuan-zuo zuoyou" @click="yirushocjia">移入收藏 {{ yiru }}</div>
                    <div class="sp-jiesuan-you zuoyou" @click="dianjishanchu">删除 {{ shanchu }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Shopping',
    data() {
        return {
            dibu: [],
            gowuche: [],
            chuangdu: true,
            bianjixians: false,
            bianjiqiehuan: true,
            //判定是编辑还是完成
            ziti: true,
            // value: 1,
            sjs: 10,
            checked: true,
            //判定小米自营是否点亮
            ziying: false
        }
    },

    created() {
        this.sjs = Math.floor(Math.random() * (10 + 1) + 10)

        let sc = JSON.parse(localStorage.getItem('gowuche'))
        if (sc) {
            this.gowuche = sc
        }
        if (this.gowuche.length == 0) {
            this.chuangdu = true
        } else {
            this.chuangdu = false
        }
        let tt = localStorage.getItem('id')
        if (tt) {
            this.aja(tt)
        } else {
            this.aja(12290)
        }
        this.fzhuang()
    },
    methods: {
        dianjishanchu() {
            let tt = new Array
            for (let t = 0; t < this.gowuche.length; t++) {
                if (this.gowuche[t].last) {
                    let duix = new Object
                    for (let key in this.gowuche[t]) {
                        duix[key] = this.gowuche[t][key]
                    }
                    tt.unshift(duix)
                    this.gowuche.splice(t, 1)
                    t--
                }
            }
            if (tt.length == 0) {
                return
            }
            let gowujianshu = 0;
            for (let i = 0; i < tt.length; i++) {
                gowujianshu += tt[i].value
            }
            this.$root.gowu -= gowujianshu
            if (this.gowuche.length == 0) {
                this.chuangdu = true
            }
            localStorage.setItem('gowuche', JSON.stringify(this.gowuche))
            this.fzhuang()
        },
        qiehuanbj() {
            this.ziti = !this.ziti
        },
        aa() {
            this.checked = !this.checked
            this.gowuche.forEach(v => {
                v.last = this.checked
            })
            localStorage.setItem('gowuche', JSON.stringify(this.gowuche))
            this.fzhuang()
        },
        a() {
            this.gowuche.forEach(v => {
                v.last = this.checked
            })
            localStorage.setItem('gowuche', JSON.stringify(this.gowuche))
            this.fzhuang()
        },
        onSubmit() {
            //
            let tt = new Array
            for (let t = 0; t < this.gowuche.length; t++) {
                if (this.gowuche[t].last) {
                    let duix = new Object
                    for (let key in this.gowuche[t]) {
                        duix[key] = this.gowuche[t][key]
                    }
                    tt.unshift(duix)
                    this.gowuche.splice(t, 1)
                    t--
                }
            }
            if (tt.length == 0) {
                //
                return
            }

            if (this.gowuche.length == 0) {
                this.chuangdu = true
            }
            let mai = JSON.parse(localStorage.getItem('gomai'))
            if (!mai) {
                mai = []
            }
            let gowujianshu = 0;
            let qian = 0
            let shuzu = [];
            for (let i = 0; i < tt.length; i++) {
                shuzu.unshift(tt[i])
                gowujianshu += tt[i].value
                qian += Number(tt[i].price)
                //
            }
            //获取商品下单的时间
            let sj = new Date()
            let nian = sj.getFullYear()
            let yue = this.buling(sj.getMonth() + 1)
            let ri = this.buling(sj.getDate())
            let shi = this.buling(sj.getHours())
            let fen = this.buling(sj.getMinutes())
            let zfuc = `${nian}-${yue}-${ri} ${shi}:${fen}`
            this.$root.gowu -= gowujianshu
            mai.unshift([2, zfuc, gowujianshu, qian, shuzu])
            localStorage.setItem('gomai', JSON.stringify(mai))
            localStorage.setItem('gowuche', JSON.stringify(this.gowuche))
            this.fzhuang()
        },
        //封装数字不足10补0
        buling(zhi) {
            return zhi > 9 ? zhi : '0' + zhi
        },
        yirushocjia() {
            let tt = new Array
            for (let t = 0; t < this.gowuche.length; t++) {
                if (this.gowuche[t].last) {
                    let duix = new Object
                    for (let key in this.gowuche[t]) {
                        duix[key] = this.gowuche[t][key]
                    }
                    tt.unshift(duix)
                }
            }
            if (tt.length == 0) {
                return
            }
            let scjia = JSON.parse(localStorage.getItem('shochan'))
            let aakaig = false
            if (!scjia) {
                scjia = []
                aakaig = true
            }
            if (aakaig) {
                tt.forEach((item, index) => {
                    scjia.unshift(item)
                })
            } else {
                for (let i = 0; i < tt.length; i++) {
                    let kaiguan = true
                    for (let k = 0; k < scjia.length; k++) {
                        if (tt[i].id == scjia[k].id) {
                            kaiguan = false
                        }
                    }
                    if (kaiguan) {
                        scjia.unshift(tt[i])
                        this.$root.shocan++
                    }
                }
            }
            //

            localStorage.setItem('shochan', JSON.stringify(scjia))
        },
        //封装每次点击后全选亮不亮和小米亮不亮
        fzhuang() {
            let kaiguan = true
            let shu = 0
            let kg = true
            let xia = true
            for (let i = 0; i < this.gowuche.length; i++) {
                if (this.gowuche[i].last) {
                    if (kg) {
                        this.ziying = false
                        shu++
                        kg = false
                    }
                } else {
                    if (xia) {
                        this.checked = false
                        kaiguan = false
                        xia = false
                        shu++
                    }

                }
                if (shu == 2) {
                    break
                }
            }
            if (kaiguan) {
                this.checked = true
            }
            if (kg) {
                this.ziying = true
            }
        },
        xiaodian(index) {
            this.gowuche[index].last = !this.gowuche[index].last
            localStorage.setItem('gowuche', JSON.stringify(this.gowuche))
            this.fzhuang()
        },
        ziyingdian() {
            //
            this.ziying = !this.ziying
            //
            this.gowuche.forEach(v => {
                v.last = !this.ziying
            })
            localStorage.setItem('gowuche', JSON.stringify(this.gowuche))
            this.fzhuang()
        },
        jia(index) {
            //
            let kk = JSON.parse(localStorage.getItem('gowuche'))
            let ii = kk[index].value
            let gowushujia = this.$root.gowu
            ii++
            if (ii > this.sjs) {
                ii = this.sjs
            } else {
                gowushujia++
            }
            this.$root.gowu = gowushujia
            kk[index].value = ii
            this.gowuche[index].value = ii

            localStorage.setItem('gowuche', JSON.stringify(kk))
        },
        jian(index) {
            //
            let kk = JSON.parse(localStorage.getItem('gowuche'))
            let ii = kk[index].value
            let gowujian = this.$root.gowu
            ii--
            if (ii == 0) {
                ii = 1
            } else {
                gowujian--
            }
            this.$root.gowu = gowujian
            kk[index].value = ii
            this.gowuche[index].value = ii
            localStorage.setItem('gowuche', JSON.stringify(kk))
        },
        tiaodengt() {
            this.$router.push({ name: 'Dengru' })
        },
        suibian() {
            this.$router.push({ name: 'Home' })
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
    },
    computed: {
        jisuan() {
            let zhi = 0
            this.gowuche.filter(v => {
                if (v.last) {
                    zhi += v.price * v.value
                }
            })
            return zhi
        },
        yiru() {
            let zhi = 0
            this.gowuche.filter(v => {
                if (v.last) {
                    zhi++
                }
            })
            return zhi
        },
        shanchu() {
            let zhi = 0
            this.gowuche.filter(v => {
                if (v.last) {
                    zhi += v.value
                }
            })
            return zhi
        }
    }


}
</script>

<style lang="less" scoped>
.shopping {
    background-color: #f0f0f0;
    padding: 60px 10px 50px;




    .yidengr {
        position: relative;

        .custom-image .van-empty__image {
            width: 90px;
            height: 90px;
        }

        .yideng-ann {
            padding: 4px 13px;
            border: 1px solid #b6b6b6;
            background-color: transparent;
            position: absolute;
            bottom: 10px;
            left: 39%;
            border-radius: 15px;
            color: #7e7e7e;
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

::v-deep .van-submit-bar {
    position: fixed;
    left: 0px;
    bottom: 50px;
    padding-bottom: 3px;
}

::v-deep .van-submit-bar__button--danger {
    background: #ff6700 !important;
}

::v-deep .van-checkbox__icon--checked .van-icon {
    color: #fff;
    background-color: #f75707;
    border-color: #f75707;
}

.sp-jiesuan {
    position: fixed;
    left: 0px;
    bottom: 50px;
    padding-bottom: 0px;
    width: 100%;
    height: 50px;

    .sp-jiesuan-bianji {
        width: 100%;
        height: 50px;
    }

    .sp-jiesuan-wancheng {
        padding-top: 10px;

        width: 100%;
        height: 100%;
        // background-color: red;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        background-color: white;
        margin-bottom: 1px;
        display: flex;
        justify-content: space-between;

        .sp-jiesuan-wancheng-left {
            display: flex;
            padding-left: 9px;
            padding-top: 6px;

            .sp-jiesuan-wancheng-img {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                box-sizing: border-box;
                margin-right: 5px;

                &.atme {
                    border: 1px solid #ddd;
                }
            }

            .sp-jiesuan-wancheng-xuan {
                font-size: 15px;
                // font-weight: bold;
            }
        }

        .sp-jiesuan-wancheng-right {
            display: flex;
            padding-right: 8px;

            .zuoyou {
                padding: 4px 0px;
                font-size: 14px;
                color: #636363;
                border: 1px solid #bcbcbc;
                box-sizing: border-box;
                width: 85px;
                text-align: center;
                height: 30px;
                line-height: 22px;
                border-radius: 15px;
                background-color: #f5f3f3;
            }

            .sp-jiesuan-zuo {
                margin-right: 12px;
            }

            // .sp-jiesuan-you {}
        }

    }
}

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
            padding-top: 11px;
            border-bottom: 1px solid #ddd;

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
                    width: 90px;
                    margin-right: 7px;
                    background-color: #f0efef;
                }

                .yidengr-gowu-sp-meige-right-right {
                    margin-top: 10px;

                    .yidengr-gowu-sp-meige-right-right-name {
                        font-size: 15px;
                        font-weight: bold;
                    }

                    .yidengr-gowu-sp-meige-right-right-beizhi {
                        padding: 3px 5px;
                        border-radius: 5px;
                        background-color: #f0efef;
                        color: #636363;
                        display: inline-block;
                        margin: 8px 0;
                    }

                    .yidengr-gowu-sp-meige-right-right-price {
                        display: flex;
                        justify-content: space-between;

                        .yidengr-gowu-sp-meige-right-right-price-jiage {
                            font-size: 16px;
                            font-weight: bold;
                            color: #ff6700;
                        }

                        .yidengr-gowu-sp-meige-right-right-price-jibu {
                            margin-left: 66px;
                            display: flex;

                            .yidengr-gowu-sp-meige-right-right-price-jibu-jian {
                                width: 22px;
                            }

                            .yidengr-gowu-sp-meige-right-right-price-jibu-zi {
                                font-weight: bold;
                                font-size: 15px;
                                margin: 3px 7px 0;
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

.shopping-to {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    font-size: 18px;
    font-weight: bold;
    box-sizing: border-box;
    padding-top: 20px;
    background-color: white;
    text-align: center;

    .shopping-bianji {
        font-size: 14px;
        font-weight: 500;
        margin-right: 5px;
        position: absolute;
        bottom: 18px;
        right: 14px;
    }

}

.mydengr {
    .bottom-button {
        width: 160px;
        height: 40px;
    }
}
</style>