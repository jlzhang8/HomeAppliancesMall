<template>
    <div class="box" ref="box">
        <!-- 最上面的图片展示 -->
        <div class="xialunbo">
            <van-swipe @change="onChange">
                <van-swipe-item v-for="(item,index) in to" :key="index">
                    <img class="auto-img" :src="item.img_url" />
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator">{{ chushi + 1 }} / {{ zuida }}</div>
                </template>
            </van-swipe>
        </div>
        <!-- 价格和文字 -->
        <div class="jiage">
            <!-- 价格 -->
            <div class="jiage-pacit">
                <div class="jiage-pacit-jg">
                    <div class="jiage-min">￥{{ price.min }}</div>
                    <div class="jiage-max" v-if="price.max != price.min">￥{{ price.max }}
                        <div class="jiage-xian"></div>
                    </div>
                </div>
                <div class="jiage-pacit-img">
                    <div class="jiage-ii">
                        <img class="auto-img" src="../assets/xiaold.png" />
                    </div>
                    <span>降价提醒</span>
                </div>
            </div>
            <!-- 文字 -->
            <div class="jiage-wenzi">
                <div class="jiage-wenzi-name">
                    <div class="jiage-wenzi-j">{{ name }}</div>
                    <div class="jiage-wenzi-tu">
                        <div class="jiage-wenzi-img">
                            <img class="auto-img" src="../assets/shangc.png" />
                        </div>
                    </div>
                </div>
                <div class="jiage-wenzi-jieshao" v-for="(item, index) in wenzi" :key="index">{{ item }}</div>
            </div>
            <!-- 推荐字样 -->
            <div class="jiage-tuijian" v-for="(item, index) in tuijain" :key="index">
                {{ item }}
            </div>
            <!-- 选购指南 -->
            <div class="jiage-xuango">
                <div class="jiage-xuango-tup">
                    <img class="auto-img" src="../assets/zhinanzhen.png" />
                </div>
                <div class="jiage-xuango-wenzi">选购指南</div>
            </div>
            <!-- 关键参数 is_page_show -->
            <div class="jiage-canshu" v-if="canshu.list" @click="canshudian">
                <div class="jiage-duo" v-for="(item, index) in canshu.list" :key="index">
                    <div v-if="item.is_page_show">
                        <Canshu :ii="item"></Canshu>
                    </div>
                </div>
            </div>
        </div>

        <!-- 下方购物车 收藏等 -->
        <div class="gowuche">
            <van-goods-action>
                <van-goods-action-icon icon="service-o" text="客服" />
                <van-goods-action-icon :icon="shoc ? 'like' : 'like-o'" :text="!$root.last ? '收藏' : shoc ? '已收藏' : '收藏'"
                    :color="shoc ? '#ff7600' : ''" @click="onClickIcon" />
                <van-goods-action-icon icon="cart-o" @click="tiaozhuansc" text="购物车"
                    :badge="!$root.last ? '' : $root.gowu == 0 ? '' : $root.gowu" />
                <van-goods-action-button @click="gwuchexians" type="warning" text="加入购物车" />
                <van-goods-action-button @click="gomaixians" type="danger" text="立即购买" />
            </van-goods-action>
        </div>

        <!-- 分期 -->
        <div class="fenqi" @click="fenqxians">
            <Chacao :tt=false>
                <template #biaoti>
                    <div class="dd">分期</div>
                </template>
                <template #zi>
                    <div class="wenzi">
                        {{ duix.fenqi }}
                    </div>
                </template>
            </Chacao>
        </div>
        <!-- 已选，送至 等等 -->
        <div class="yidui">
            <!-- 已选-->
            <div class="yixuanaa" @click="yixuanxians">
                <Chacao :tt=true>
                    <template #biaoti>
                        <div class="dd">已选</div>
                    </template>
                    <template #zi>
                        <div class="wenzi">
                            {{ yixuanzi }}
                        </div>
                    </template>
                </Chacao>
            </div>

            <Chacao :tt=true>
                <template #biaoti>
                    <div class="dd">送至</div>
                </template>
                <template #zi>
                    <div class="wenzi">
                        广州市 从化区
                    </div>
                </template>
            </Chacao>
            <Chacao :tt=true>
                <template #biaoti>
                    <div class="dd">门店</div>
                </template>
                <template #zi>
                    <div class="wenzi">
                        小米之家广东广州黄埔楼名店城专卖店新世纪广场分店
                    </div>
                </template>
            </Chacao>
            <div class="fuwuaaa" @click="fuwuxians">
                <Chacao :tt=false>
                    <template #biaoti>
                        <div class="dd">服务</div>
                    </template>
                    <template #zi>
                        <div class="wenzi fuwuzzaa">
                            <div class="fuwuzz" v-for="item in fuwu" v-if="item.is_page_show">
                                <div class="fuwuzz-img">
                                    <img class="auto-img" src="../assets/fuwygo.png" alt="">
                                </div>
                                <div class="fuwuzz-zi">
                                    {{ item.title }}
                                </div>
                            </div>
                        </div>
                    </template>
                </Chacao>
            </div>

        </div>

        <!-- 米圈 -->
        <div class="miquan">
            <div class="miquan-top">
                <div class="miquan-top-zi">米圈</div>
                <div class="miquan-top-tu">
                    <div class="miquan-top-tup">
                        <div class="miquan-img" ref="miqimg" v-for="(item, index) in miquan.tu" v-if="index < 3">
                            <img class="auto-img" :src="item.user_avatar" />
                        </div>
                    </div>
                    <div class="miquan-top-hudong">快来互动吧&nbsp;&nbsp;></div>
                </div>
            </div>
            <!-- 买家秀 -->
            <div class="miquan-maijia">
                <div class="miquan-maijia-top">
                    <div class="miquan-maijia-top-mai">买家秀</div>
                    <div class="miquan-maijia-top-plun">共{{ miquan.zi.comments_total }}条评论&nbsp;&nbsp;></div>
                </div>
                <div class="miquan-maijia-zi">
                    <div class="miquan-maijia-zi-wenzi" v-for="item in miquan.zi.comment_tags">{{ item.tag_name }}</div>
                </div>
                <div class="miquan-maijia-tu">
                    <div class="miquan-maijia-tup" v-for="(item, index) in miquan.tu" v-if="index < 4">
                        <img class="auto-img" :src="item.comment_images[0]" />
                    </div>
                </div>

            </div>
        </div>
        <!-- 商品详情 -->
        <div class="xiangq" ref="xiangq" id="555666">
            <div class="xiangq-bbb">
                <div class="xiangq-top">
                    <div class="xiangq-top-xxx" @click="dian(index)" :class="{ atme: index == youxian }"
                        v-for="(item, index) in xqname">{{ item }}
                    </div>
                </div>
            </div>

            <!-- 商品介绍 -->
            <div class="xiangq-tupjs" v-show="youxian == 0">
                <div class="xiangq-img" v-for="item in xqtu[0]">
                    <img class="auto-img" :src="item.body.img_url" />
                </div>
            </div>
            <!-- 商品参数 -->
            <div class="xiangq-tupcanshu" v-show="youxian == 1">
                <div class="canshu-img" v-for="item in xqtu[1]">
                    <img class="auto-img" :src="item.body.img_url" />
                </div>
            </div>
        </div>

        <!-- 商品头部 -->
        <div class="shangpto" :style="{ backgroundColor: islast ? `white` : `transparent` }">
            <div class="shangpto-left shangptottt" @click="back"
                :style="{ backgroundColor: islast ? `white` : `#0000004d` }">
                <img class="auto-img" src="../assets/jiantobai.png" v-show="!islast" />
                <img class="auto-img" src="../assets/jiantohei.png" v-show="islast" />
            </div>
            <div class="shangpto-zhong" v-show="islast">
                <van-tabs v-model="active">
                    <van-tab title="商品"></van-tab>
                    <van-tab class="xiangqing" title="详情"></van-tab>
                    <van-tab title="推荐"></van-tab>
                </van-tabs>
            </div>
            <div class="shangpto-right">
                <div class="right-shangc shangptottt" :style="{ backgroundColor: islast ? `white` : `#0000004d` }">
                    <img class="auto-img" src="../assets/shangcbai.png" v-show="!islast" />
                    <img class="auto-img" src="../assets/shangchei.png" v-show="islast" />
                </div>
                <div class="right-shenglh shangptottt" :style="{ backgroundColor: islast ? `white` : `#0000004d` }">
                    <img class="auto-img" src="../assets/shenglhbai.png" v-show="!islast" />
                    <img class="auto-img" src="../assets/shenglhhei.png" v-show="islast" />
                </div>
            </div>
        </div>

        <!-- 猜你喜欢 -->
        <div class="cainixi">
            <div class="cainixi-zi">猜你喜欢</div>
            <div class="cainidi-img">
                <div class="cainixi-left">
                    <div class="cainixi-ddd" v-for="(item, index) in xihuan">
                        <div class="cainixi-xxx" v-if="index % 2 == 0" @click="zzjj(item.product_id)">
                            <div class="cainixi-ddd-img">
                                <img class="auto-img" :src="item.image_url" />
                            </div>
                            <div class="cainixi-ddd-name">{{ item.name }}</div>
                            <div class="cainixi-ddd-iwenzi">￥{{ item.price }}</div>
                        </div>

                    </div>
                </div>
                <div class="cainixi-left">
                    <div class="cainixi-ddd" v-for="(item, index) in xihuan">
                        <div class="cainixi-xxx" v-if="index % 2 != 0" @click="zzjj(item.product_id)">
                            <div class="cainixi-ddd-img">
                                <img class="auto-img" :src="item.image_url" />
                            </div>
                            <div class="cainixi-ddd-name">{{ item.name }}</div>
                            <div class="cainixi-ddd-iwenzi">￥{{ item.price }}</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <!-- 参数等等的弹起 -->
        <div class="tanchuxq">
            <!-- 参数弹窗 -->
            <div class="tancanshu" v-if="canshu.list">
                <van-overlay :show="show" @click="show = false">
                    <div class="wrapper" @click.stop>
                        <div class="block">
                            <div class="tancanshu-top">{{ canshu.name }}</div>
                            <div class="tancanshu-xia">
                                <div class="tancanshu-xia-nro">
                                    <div class="tancanshu-xia-nro-kk" v-for="item in canshu.list">
                                        <div class="tancanshu-xia-nr-type">{{ item.name }}</div>
                                        <div class="tancanshu-xia-nr-name">{{ item.value }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-overlay>
            </div>
            <!-- 分期弹窗 -->
            <div class="tanfenqi">
                <van-overlay :show="kaigaun" @click="kaigaun = false">
                    <div class="wrapper" @click.stop>
                        <div class="block">
                            <div class="tanfenqi-top">
                                <div class="tanfenqi-top-img">
                                    <img class="auto-img" :src="xiaotup" />
                                </div>
                                <div class="tanfenqi-top-zi">
                                    <div class="tanfenqi-top-zi-top">￥{{ price.min }}</div>
                                    <div class="tanfenqi-top-zi-xia">{{ name }}</div>
                                </div>
                            </div>

                            <div class="tanfenqi-zhong">
                                <div class="tanfenqi-zhong-zi" @click="fenqqiehuan(index)" :class="{ atme: fqmor == index }"
                                    v-for="(item, index) in fenqiwenzi">{{ item.title }}</div>
                            </div>

                            <div class="tanfenqi-xia">
                                <div class="tanfenq-for" v-for="(tt, ii)  in  fenqijge22">
                                    <div class="show" v-show="fqmor == ii">
                                        <div class="tanfenqi-xia-text" v-for="(item, index) in tt">
                                            <div class="tanfenqi-xia-text-top">{{ item.title }}</div>
                                            <div class="tanfenqi-xia-text-xia">{{ item.detail }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="tanfenqi-ann">立即购买</button>
                        </div>
                    </div>
                </van-overlay>
            </div>
            <!-- 服务弹窗 -->
            <div class="tanfuwu">
                <van-overlay :show="fukai" @click="fukai = false">
                    <div class="wrapper" @click.stop>
                        <div class="block">
                            <div class="tanfuwu-top">服务说明</div>
                            <div class="tanfuwu-xia">
                                <div class="tanfuwu-xia-kuai" v-for="item in fuwu">
                                    <div class="tanfuwu-xia-kuai-top">
                                        <div class="tanfuwu-xia-kuai-top-img">
                                            <img src="../assets/fuwygoxuan.png" />
                                        </div>
                                        <div class="tanfuwu-xia-kuai-top-zi">{{ item.title }}</div>
                                    </div>
                                    <div class="tanfuwu-xia-kuai-xia" v-html="item.desc"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-overlay>
            </div>
        </div>
        <!-- 弹出框 购买和加入收藏夹和已选 -->
        <div class="yimaishocan">
            <!-- 加入购物车 -->
            <div class="yimaishocan-che" v-show="gowuchekai">
                <Gookk :gomai="maimaimai" :xiangqerwei="xiangwei" @laichuan="chuangguolai" @laiquer="gowucheqr" :id="id"
                    :name="name" title="加入购物车"> </Gookk>
            </div>
            <!-- 立即购买 -->
            <div class="yimaishocan-mai" v-show="gomaikai">
                <Gookk :gomai="maimaimai" :xiangqerwei="xiangwei" @laichuan="lijiguolai" @laiquer="gomaiqr" :id="id"
                    :name="name" title="立即购买"> </Gookk>
            </div>
            <!-- 已选 -->
            <div class="yimaishocan-xuan" v-show="xuangokai">
                <Gookk :gomai="maimaimai" :xiangqerwei="xiangwei" @laichuan="yixuanguolai" @laiquer="yixuanqr" :id="id"
                    :name="name" title="确认已选"></Gookk>
            </div>
        </div>
    </div>
</template>

<script>
import Gookk from '../components/Gookk.vue';
import Chacao from '../components/Chacao.vue';
import Canshu from '../components/Canshu.vue';
export default {
    name: 'Details',
    components: {
        Chacao,
        Canshu,
        Gookk
    },
    data() {
        return {
            id: 16176,
            // 控制弹窗开关区
            show: false,
            kaigaun: false,
            fukai: false,
            fqmor: 0,
            active: 0,
            //购买 购物车 选购 开关
            gomaikai: false,
            gowuchekai: false,
            xuangokai: false,
            // 判定头部样式
            islast: false,
            //商品数量
            shuliang: 1,
            shoc: 0,
            to: [],
            canshu: {},
            chushi: 0,
            zuida: 8,
            page: 0,
            lkai: 0,
            left: 0,
            name: '小米商城',
            wenzi: [],
            price: {},
            // 商品小图片
            xiaotup: '',
            // text
            tuijain: [],
            // 分期
            fenqiwenzi: [],
            fenqijge: [],
            fenqijge22: [],
            duix: { fenqi: '', yixuan: '' },
            // 服务
            fuwu: [],
            // 米圈
            miquan: {
                tu: [],
                zi: []
            },
            // 商品详情
            xqname: [],
            xqtu: [],
            youxian: 0,
            scroll: '',
            //获取第一次详情距顶部的距离
            julilast: true,
            juli: '',
            xihuan: [],
            xiangwei: [[''], [], [], []],
            maimaimai: [],
            yixuanzi: ''

        }
    },
    created() {
        let id = this.$route.query
        this.id = id
        //
        this.aja(id)
        this.caini(id)
        let long = JSON.parse(localStorage.getItem('shochan'))
        if (long) {
            //
            for (let i = 0; i < long.length; i++) {
                if (long[i].id == this.id) {
                    this.shoc = true
                    break
                }
            }
            if (!this.shoc) {
                this.shoc = false
            }
        } else {
            //
            this.shoc = false
        }
        //

    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },

    methods: {
        tiaozhuansc() {
            this.$router.push({ name: 'Shopping' })
        },
        //确认购买部分
        gowucheqr(e) {
            if (!this.$root.last) {
                this.$router.push({ name: 'Dengru' })
                return
            }
            let che = JSON.parse(localStorage.getItem('gowuche'))
            if (!che) {
                che = []
            }
            let jinlai = false
            let kg = false;
            let iii = 0;
            for (let i = 0; i < che.length; i++) {
                if (che[i].id != e.id) {
                } else {
                    jinlai = true
                    iii = i
                    if (e.beizhi == che[i].beizhi && e.name == che[i].name && e.price == che[i].price && e.beizhi == che[i].beizhi) {
                        kg = true
                        break
                    }
                }
            }
            if (jinlai) {
                //
                if (kg) {
                    che[iii].value += e.value
                    localStorage.setItem('gowuche', JSON.stringify(che))
                } else {
                    che.unshift({ ...e, last: true })
                    localStorage.setItem('gowuche', JSON.stringify(che))
                }
            } else {
                //
                che.unshift({ ...e, last: true })
                localStorage.setItem('gowuche', JSON.stringify(che))
            }
            this.$root.gowu += e.value
            this.gowuchekai = false
        },
        gomaiqr(e) {
            if (!this.$root.last) {
                this.$router.push({ name: 'Dengru' })
                return
            }
            let sj = new Date()
            let nian = sj.getFullYear()
            let yue = this.buling(sj.getMonth() + 1)
            let ri = this.buling(sj.getDate())
            let shi = this.buling(sj.getHours())
            let fen = this.buling(sj.getMinutes())
            let zfuc = `${nian}-${yue}-${ri} ${shi}:${fen}`
            let mai = JSON.parse(localStorage.getItem('gomai'))
            if (!mai) {
                mai = []
            }
            let shuzu = [2, zfuc, e.value, e.price, [e]]
            mai.unshift(shuzu)
            localStorage.setItem('gomai', JSON.stringify(mai))

            this.gomaikai = false
            // //
        },
        yixuanqr(e) {
            this.yixuanzi = e.name + e.beizhi + ' x ' + e.value
            this.xuangokai = false
        },
        //封装数字不足10补0
        buling(zhi) {
            return zhi > 9 ? zhi : '0' + zhi
        },
        //点击黑色部分隐藏区域
        chuangguolai() {
            this.gowuchekai = false
        },
        lijiguolai() {
            this.gomaikai = false
        },
        yixuanguolai() {
            this.xuangokai = false
        },
        //小米分期和花呗分期切换
        fenqqiehuan(index) {
            if (index == this.fqmor) {
                return
            }
            this.fqmor = index
        },
        //点击唐弹窗显示区域
        canshudian() {
            this.show = true
        },
        fuwuxians() {
            this.fukai = true
        },
        fenqxians() {
            this.kaigaun = true
        },
        yixuanxians() {
            this.xuangokai = true
        },
        gwuchexians() {
            this.gowuchekai = true
        },
        gomaixians() {
            this.gomaikai = true
        },
        zzjj(id) {
            //
            this.aja(id)
            this.chushi = 0
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 1)
        },
        back() {
            this.$router.back()
        },
        handleScroll() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop

            if (this.scroll > 260) {
                this.islast = true
            } else if (this.scroll <= 260) {
                this.islast = false
            }
        },
        dian(index) {
            if (index == this.youxian) {
                return
            }
            this.youxian = index
        },

        onChange(index) {
            this.chushi = index;
        },
        //收藏点击
        onClickIcon() {
            if (this.$root.last) {
                this.shoc = !this.shoc
                let sc = JSON.parse(localStorage.getItem('shochan'))
                if (!sc) {
                    sc = []
                }
                if (this.shoc) {
                    let aa = this.xiangwei[0][0].name
                    let zz = new RegExp(this.name)
                    let jia = aa.replace(zz, '')
                    sc.unshift({
                        url: this.xiaotup,
                        name: this.name,
                        price: this.price.min,
                        id: this.id,
                        beizhi: jia,
                    })
                    localStorage.setItem('shochan', JSON.stringify(sc))
                    this.$root.shocan++
                } else {
                    // delete sc[this.id]
                    for (let i = 0; i < sc.length; i++) {
                        if (sc[i].id == this.id) {
                            sc.splice(i, 1)
                            break
                        }
                    }
                    localStorage.setItem('shochan', JSON.stringify(sc))
                    this.$root.shocan--
                }
            } else {
                this.$router.push({ name: 'Dengru' })
            }

        },

        aja(id) {
            this.axios({
                method: 'get',
                url: '/miproduct/view?',
                params: {
                    commodity_id: id
                }
            }).then(ret => {
                this.wenzi = []
                this.tuijain = []
                this.fenqijge22 = []
                // 获取数组的长度
                let tt = ret.data.data.goods_info.length - 1
                //获取头部的图片
                this.to = ret.data.data.goods_info[tt].gallery_v3
                //获取商品的参数 比如手机像素之类的
                this.canshu = ret.data.data.goods_info[tt].class_parameters
                // //
                //获取商品名称
                this.name = ret.data.data.product_info.name
                //获取单个文字介绍
                let bb = ret.data.data.product_info.product_desc_ext
                //获取数组文字介绍
                let cc = ret.data.data.product_info.sell_point_desc
                //获取商品价格
                this.price.max = ret.data.data.goods_info[0].multi_market_price.first
                this.price.min = ret.data.data.goods_info[0].multi_price.first

                //提示活动
                let huodong = ret.data.data.goods_tpl_datas
                for (let key in huodong) {
                    huodong[key].sections.forEach((item) => {
                        if (item.body.text) {
                            this.tuijain.push(item.body.text)
                        }
                    })
                }
                this.tuijain.splice(1)
                //获取最多图片数量
                this.zuida = this.to.length

                //添加单文字介绍
                if (bb) {
                    this.wenzi.push(bb)
                }
                //循环添加文字介绍
                cc.forEach(item => {
                    this.wenzi.push(item)
                })

                //获取分期数据
                this.duix.fenqi = ret.data.data.goods_info[0].multi_instalment_info.first.detail_info
                let fq = ret.data.data.goods_info[0].multi_instalment.first.list
                fq.forEach((item, index) => {
                    //获取什么分期 比如小米分期
                    if (index == 1) {
                        this.fenqiwenzi.push({ title: item.Title, last: true })

                    } else {
                        this.fenqiwenzi.push({ title: item.Title, last: false })
                    }
                    let zz = []
                    //循环获取多少钱乘多少期 和 手续费等
                    item.Detail.forEach((tt, ii) => {
                        if (ii == 0) {
                            zz.push({ detail: tt.tab_detail, title: tt.tab_title, last: true })
                        } else {
                            zz.push({ detail: tt.tab_detail, title: tt.tab_title, last: false })
                        }
                    })
                    this.fenqijge22.push(zz)
                })

                //获取已选数据
                let xx = ret.data.data.seo.keywords
                this.duix.yixuan = xx.replace(/\,/g, ' ')

                //获取服务数据
                this.fuwu = ret.data.data.goods_info[0].service_refound_policy_list.list_new
                //

                // 获取米圈买家秀数图片据
                this.miquan.tu = ret.data.data.goods_share_datas.comments.list
                // 获取米圈买家秀数文字据
                this.miquan.zi = ret.data.data.goods_share_datas.comments.detail


                // //
                //获取商品小图片
                this.xiaotup = ret.data.data.goods_info[0].image_share
                //
                // 获取商品详情
                let xq = ret.data.data.goods_tpl_datas
                for (let key in xq) {
                    xq[key].sections.forEach(item => {
                        if (item.view_type == "product_info_tab") {
                            item.body.items.forEach((item, index) => {
                                if (index < 2) {
                                    this.xqname[index] = item.tab_name
                                }
                                this.xqtu[index] = item.page_info
                            })
                        }
                    })
                }
                //获取购买数据
                this.maimaimai = ret.data.data.buy_option
                // //
                let top = [];
                let shu = -1
                //获取全部商品数据
                let shuju = ret.data.data.goods_info
                shuju.forEach(item => {
                    if (top.indexOf(item.price) == -1) {
                        top.push(item.price)
                        shu++
                        this.xiangwei[shu] = []
                    }
                    this.xiangwei[shu].push({
                        name: item.name,
                        price: item.price,
                        url: item.image_share
                    })

                })
                this.yixuanzi = this.xiangwei[0][0].name + ' x1'
                //设置足迹记录
                let lishi = JSON.parse(localStorage.getItem('lishi'))
                if (!lishi) {
                    lishi = []
                }
                let kaiguan = true
                for (let i = 0; i < lishi.length; i++) {
                    if (lishi[i].id == this.id) {
                        if (i == 0) {
                            kaiguan = false
                        } else {
                            lishi.splice(i, 1)
                            this.$root.zuji--
                        }
                        break
                    }
                }
                if (kaiguan) {
                    lishi.unshift({
                        id: this.id,
                        url: this.xiaotup,
                        name: this.xiangwei[0][0].name,
                        last: false,
                        price: this.price.min
                    })
                    this.$root.zuji++
                    if (lishi.length > 20) {
                        lishi.splice(20, 1)
                        this.$root.zuji--
                    }

                    localStorage.setItem('lishi', JSON.stringify(lishi))
                }

            }).catch(err => {
                //
            })
        },
        caini(id) {
            this.axios({
                method: 'get',
                url: '/miproduct/recom_btm',
                params: {
                    commodity_id: id
                }
            }).then(res => {
                this.xihuan = res.data.data.related_recommend.data
                //

            }).catch(err => {
                //

            })
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style lang="less" scoped>
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: #0000004d;
}

.ann-gowuc {
    width: 110px;
}

.yimaishocan {
    position: fixed;
    top: 0;
}

.fenqi {
    margin: 7px 0;
}



::v-deep .van-overlay {
    background-color: rgba(0, 0, 0, 0.5);
}

.tancanshu {
    .tancanshu-top {
        position: sticky;
        top: 0;
        left: 0;
        height: 30px;
        padding-top: 10px;
        text-align: center;
        line-height: 30px;
        font-size: 15px;
        font-weight: bold;
    }

    .tancanshu-xia {
        padding: 10px 15px;
        overflow-y: scroll;

        .tancanshu-xia-nro {
            overflow-y: scroll;


            .tancanshu-xia-nro-kk {
                margin: 15px 0;
                display: flex;
            }

            .tancanshu-xia-nr-type {
                color: #929191;
                width: 100px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }

            .tancanshu-xia-nr-name {
                color: black;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
}

.tanfenqi {
    padding: 10px;

    .tanfenqi-ann {
        position: fixed;
        bottom: 10px;
        width: 85%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        left: 7%;
        border-radius: 15px;
        background-color: #ff6700;
        color: white;
        border: 1px solid #ff7600;
    }

    .tanfenqi-top {
        display: flex;
        padding-top: 12px;
        padding-left: 12px;
        margin-bottom: 10px;

        .tanfenqi-top-img {
            width: 85px;
            margin-right: 20px;
            background-color: #f0efef;
        }

        .tanfenqi-top-zi {
            padding-top: 20px;

            .tanfenqi-top-zi-top {
                font-size: 18px;
                font-weight: bold;
                color: #ff6700;
                margin-bottom: 10px;
            }

            .tanfenqi-top-zi-xia {
                font-size: 14px;
                color: black;
            }
        }
    }

    .tanfenqi-zhong {
        // margin: 10px 0;
        display: flex;
        border-radius: 10px;
        background-color: white;
        font-size: 10px;
        justify-content: center;
        border: 1px solid #ddd;
        border-radius: 15px;
        overflow: hidden;
        width: 95%;
        margin-left: 6px;

        .tanfenqi-zhong-zi {
            width: 50%;
            text-align: center;
            padding: 4px;
            box-sizing: border-box;

            &.atme {
                color: #ff6700;
                background-color: #d8d7d7;
            }
        }
    }

    .tanfenqi-xia {

        padding: 10px;

        .show {
            .tanfenqi-xia-text {
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
            }

            .tanfenqi-xia-text-top {
                font-weight: bold;
                font-size: 14px;
            }

            .tanfenqi-xia-text-xia {
                color: #ff6700;
                margin-top: 10px;
            }
        }


    }
}

.tanfuwu {
    .tanfuwu-top {
        width: 100%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 15px;
        font-weight: bold;
        position: fixed;
        left: 0;
        padding-top: 10px;


    }

    .tanfuwu-xia {
        padding-top: 40px;

        .tanfuwu-xia-kuai {
            padding-left: 10px;

            .tanfuwu-xia-kuai-top {
                display: flex;
                margin: 10px 0;

                .tanfuwu-xia-kuai-top-img {
                    width: 10px;
                    margin-right: 6px;
                }

                .tanfuwu-xia-kuai-top-zi {
                    font-size: 13px;
                    font-weight: 600;
                }
            }

            .tanfuwu-xia-kuai-xia {
                padding-left: 30px;
                margin-bottom: 10px;
            }
        }
    }
}

.tanchuxq {
    .block {
        position: absolute;
        bottom: 0;
        height: 500px;
        width: 100%;
        background-color: white;
    }
}

.box {
    background-color: #efefef;
    padding-bottom: 50px;
    overflow: hidden;
    width: 375px;
    box-sizing: border-box;

}

.cainixi {
    padding: 0 10px;
    background-color: white;

    .cainixi-zi {
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .cainidi-img {
        display: flex;
        justify-content: space-between;

        .cainixi-left {
            width: 48%;

            .cainixi-ddd {
                width: 100%;

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
                    }

                    .cainixi-ddd-iwenzi {
                        font-size: 15px;
                        font-weight: bolder;
                        color: #f75707;
                    }
                }
            }
        }
    }
}

.shangpto {
    position: fixed;
    top: 0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;


    .shangptottt {
        box-sizing: border-box;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        padding: 3px;
        margin-top: 9px;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .shangpto-zhong {
        display: flex;
        margin-left: 35px;

        ::v-deep .van-tab {
            margin: 0 8px;

        }

        ::v-deep .van-tabs__line {
            background-color: #ff6700;
        }

        ::v-deep .van-tab--active {
            color: #ff6700;
            font-weight: bold;
        }
    }

    .shangpto-right {
        display: flex;
        margin-right: 23px;

        .right-shangc {
            margin-right: 12px;
        }
    }
}

.xiangq {
    .xiangq-bbb {
        position: sticky;
        top: 64px;

        .xiangq-top {
            display: flex;
            justify-content: space-around;
            padding: 10px;
            background-color: #fff;
            margin-top: 10px;

            .xiangq-top-xxx {
                font-size: 12px;

                &.atme {
                    color: #ff6700;
                }
            }
        }
    }

}

.xialunbo {
    width: 100%;

    ::v-deep .element.style {
        width: 100%;
    }

    ::v-deep .custom-indicator[data-v-14d957f8] {
        padding: 2px 6px;
        border-radius: 9px;
        background-color: #0000004d;
        bottom: 15px;
        right: 15px;
        color: white;
        font-size: 12px
    }
}

.miquan {
    padding: 8px 10px;
    background-color: white;
    margin-top: 8px;


    .miquan-top {
        display: flex;
        justify-content: space-between;

        .miquan-top-zi {
            font-size: 14px;
            font-weight: bold;

        }

        .miquan-top-tu {

            font-size: 12px;
            display: flex;

            .miquan-top-tup {
                display: flex;
                margin-right: 5px;
                position: relative;

                .miquan-img {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid #fff;
                }
            }
        }
    }

    .miquan-maijia {
        border: 1px solid #efefef;
        border-radius: 10px;
        padding: 10px;
        margin-top: 12px;

        .miquan-maijia-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            .miquan-maijia-top-mai {
                font-size: 14px;
                font-weight: bold;
            }

            .miquan-maijia-top-plun {
                font-size: 10px;
                color: #ff6700;
            }
        }

        .miquan-maijia-zi {
            display: flex;
            flex-flow: row wrap;

            .miquan-maijia-zi-wenzi {
                padding: 3px 8px;
                font-size: 10px;
                border-radius: 9px;
                background-color: #ebe9e9;
                color: #4a4949;
                margin-right: 10px;
                margin-bottom: 10px;
            }

        }

        .miquan-maijia-tu {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;

            .miquan-maijia-tup {
                width: 24%;
                height: 60px;
                overflow: hidden;
                border-radius: 5px;
            }
        }
    }
}

.gowuche {
    .van-info {
        background-color: #ff6700 !important;
    }
}


.jiage {
    padding: 10px;
    background-color: white;

    .jiage-canshu {
        display: flex;
        overflow-x: auto;
        padding: 10px 0;
        border-top: 1px solid #ddd;
    }

    .jiage-pacit {
        height: 40px;
        display: flex;
        justify-content: space-between;

        .jiage-pacit-jg {
            height: 100%;
            display: flex;

            .jiage-min {
                font-size: 22px;
                font-weight: bold;
                color: #ff6700;
                line-height: 40px;
                margin-right: 4px;

            }

            .jiage-max {
                color: #676767;
                line-height: 45px;
                font-size: 14px;
                position: relative;
                display: inline-block;

                .jiage-xian {
                    position: absolute;
                    width: 80%;
                    height: 1px;
                    background-color: #676767;
                    top: 55%;
                    left: 30%;
                }
            }
        }

        .jiage-pacit-img {
            width: 63px;
            font-size: 12px;
            color: #ff6700;
            display: flex;
            margin-top: 10px;

            .jiage-ii {
                width: 13px;
                margin-top: 2px;
                margin-right: 2px;
            }
        }
    }

    .jiage-wenzi {
        .jiage-wenzi-name {
            display: flex;
            justify-content: space-between;
            margin-top: 6px;
            padding-bottom: 2px;

            .jiage-wenzi-j {
                font-size: 16px;
                font-weight: bold;
            }

            .jiage-wenzi-tu {
                margin-top: 4px;
            }
        }

        .jiage-wenzi-jieshao {
            font-size: 12px;
            color: #4a4949;
            margin: 3px 0;
        }

    }

    .jiage-tuijian {
        padding: 1px 5px;
        font-size: 12px;
        background-color: #efefef;
        border-radius: 7px;
        color: #4a4949;
        display: inline-block;
        margin-top: 8px;
    }

    .jiage-xuango {
        color: black;
        display: flex;
        height: 14px;
        line-height: 14px;
        margin-top: 10px;
        margin-bottom: 8px;

        .jiage-xuango-tup {
            width: 14px;
            margin-right: 3px;
        }
    }
}

.fuwuzzaa {
    display: flex;
    flex-flow: row wrap;

    .fuwuzz {
        color: #929191;
        display: flex;
        margin-right: 15px;

        .fuwuzz-img {
            width: 12px;
            margin-right: 5px;
            margin-top: 3px;
        }
    }
}
</style>