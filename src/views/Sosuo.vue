<template>
    <div class="sosuo">
        <!-- 头部的搜索框 -->
        <div class="sosuo-top">
            <div class="sosuo-top-fanhui" @click="back" v-html="`<`"></div>
            <form action="/">
                <van-search v-model="value" @input="sosuoinput" placeholder="请输入商品关键词" @search="onSearch" />
            </form>
            <div class="sosuo-top-sss" @click="dianjisosuo">搜索</div>
        </div>
        <!-- 搜索历史 -->
        <div class="sosuo-lishi" v-show="sosuolis.length != 0">
            <div class="sosuo-lishi-top">
                <div class="sosuo-lishi-zi">搜索历史</div>
                <div class="sosuo-lishi-img">
                    <img class="auto-img" src="../assets/lajitong.png" />
                </div>
            </div>

            <div class="sosuo-lishi-nro">
                <div class="sosuo-lishi-xunh" v-for="(item, index) in sosuolis" :key="index">{{ item }}</div>
            </div>
        </div>
        <!-- 小米热搜 -->
        <div class="sosuo-xiaomi">
            <div class="sosuo-xiaomi-top">
                <div class="sosuo-img-ii">
                    <img class="auto-img " src="../assets/reso.png" />
                </div>
                <div class="sosuo-img-zi">小米热搜</div>
            </div>
            <div class="sosuo-xiaomi-xia">

                <div class="sosuo-xiaomi-xuan" v-for="(item, index) in reso" :key="index" v-show="index < 10"
                    @click="tiaozhuanxq(item.action.path, item.action.type)">
                    <div class="sosuo-xiaomi-xuan-left">
                        <img class="auto-img" :src="item.image_url" />
                    </div>
                    <div class="sosuo-xiaomi-xuan-right">
                        <div class="sosuo-xiaomi-xuan-right-zi">{{ item.name }}</div>
                        <div class="sosuo-xiaomi-xuan-right-biao">热</div>
                    </div>
                </div>


            </div>
        </div>
        <!-- 搜索推荐 -->
        <div class="sosuo-tuijian" v-show="tanchu && tuijian.length != 0">
            <div class="sosuo-tuijian-xuam" v-for="(item, index) in tuijian" :key="index" @click="dianjisossss(item.title)">
                <div class="sosuo-tuijian-name">{{ item.title }}</div>
                <div class="sosuo-tuijian-biao">
                    <div class="sosuo-tuijian-nro" v-for="(tt, ii) in item.class_params"  :key="ii" v-show="ii < 3">{{ tt.name }}</div>
                </div>
            </div>
        </div>

        <!-- 商品详情 -->
        <div class="sosuo-xq">
            <div class="sosuo-xq-top">
                <div class="sosuo-xq-top-shang">
                    <van-tabs v-model="active" sticky>
                        <van-tab v-for="(index,ii) in 4" :key="ii" :title="'选项 ' + index">
                            内容 {{ index }}
                        </van-tab>
                    </van-tabs>
                </div>
                <div class="sosuo-xq-top-xia"></div>
            </div>

            <div class="sosuo-xq-xia">

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Sosuo',
    data() {
        return {
            value: '',
            reso: [],
            sosuolis: [],
            tanchu: false,
            tuijian: [],
            ding: null,
            gaol: [],
            spxq: true,
            active:0,
        };
    },
    created() {
        this.rs();
        let ss = JSON.parse(localStorage.getItem('sosuo'));
        if (ss) {
            this.sosuolis = ss
        }
    },
    methods: {
        //点击搜索推荐搜索
        dianjisossss(val) {
            this.value = val
            this.tanchu = false
            this.shangpsosuo(val)
        },
        tiaozhuanxq(id, type) {
            //
            //
            if ('product' == type) {
                this.$router.push({ name: 'Details', query: id })
            }
        },
        //持续搜索延时器
        sosuoinput(val) {
            if (this.ding) {
                clearTimeout(this.ding)
            }
            if (val == '') {
                this.tanchu = false
                return
            }
            this.ding = setTimeout(() => {
                this.saxios(val)
            }, 600)
            //
        },
        onSearch(val) {
            if (val == '') {
                //
                return
            }
            this.tanchu = false
            if (this.ding) {
                clearTimeout(this.ding)
                this.ding = null
            }
            this.sosuolis.unshift(val)
            this.value = ''
            //
            localStorage.setItem('sosuo', JSON.stringify(this.sosuolis))
        },
        dianjisosuo() {
            if (this.value == '') {
                //
                return
            }
            this.tanchu = false
            if (this.ding) {
                clearTimeout(this.ding)
                this.ding = null
            }
            this.sosuolis.unshift(this.value)
            this.value = ''
            //
            localStorage.setItem('sosuo', JSON.stringify(this.sosuolis))
        },
        //封装搜索推荐axios
        saxios(value) {
            this.axios({
                method: 'get',
                url: '/hisearch/suggestion_v3',
                params: {
                    query: value
                }
            }).then(res => {
                //
                this.tuijian = res.data.data.list
                this.tanchu = true
            }).catch(err => {
                //
            })
        },
        //封装商品搜索
        shangpsosuo(value) {
            this.axios({
                method: 'get',
                url: '/hisearch/query_v3',
                params: {
                    query: value
                }
            }).then(res => {
                //
            }).catch(err => {
                //
            })
        },
        back() {
            this.$router.back()
        },
        rs() {
            this.axios({
                method: 'get',
                url: '/home/recommendBlank'
            }).then(res => {
                this.reso = res.data.data.recom_list
            }).catch(err => {
                //
            })
        },
    },
}
</script>

<style lang="less" scoped>
.sosuo {
    background-color: rgb(243, 243, 243);
    padding-bottom: 50px;

    .sosuo-tuijian {
        width: 100%;
        height: 612px;
        position: fixed;
        top: 54px;
        left: 0;
        background-color: rgb(243, 243, 243);

        .sosuo-tuijian-xuam {
            display: flex;
            justify-content: space-between;
            padding: 15px 10px;
            border-bottom: 1px solid #ddd;

            .sosuo-tuijian-name {
                width: 140px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                .gaoliang {
                    color: #ff6700;
                }

            }

            .sosuo-tuijian-biao {
                display: flex;

                .sosuo-tuijian-nro {
                    padding: 5px;
                    border-radius: 4px;
                    background-color: white;
                    margin-right: 5px;
                }
            }
        }
    }

    .sosuo-top {
        width: 100%;
        display: flex;

        .sosuo-top-fanhui {
            width: 30px;
            font-size: 30px;
            line-height: 52px;
            text-align: center;
            padding-left: 7px;
        }

        .sosuo-top-sss {
            width: 50px;
            font-size: 16px;
            text-align: center;
            line-height: 40px;
            padding-top: 5px;
            padding-right: 12px;
        }
    }

    .sosuo-lishi {
        margin-top: 5px;

        .sosuo-lishi-top {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: bold;
            padding: 5px 10px;

            .sosuo-lishi-img {
                width: 22px;
                margin-right: 5px;
            }
        }

        .sosuo-lishi-nro {
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            font-size: 13px;

            .sosuo-lishi-xunh {
                padding: 5px 10px;
                border-radius: 5px;
                margin-right: 7px;
                margin-bottom: 7px;
                background-color: white;
            }
        }
    }

    .sosuo-xiaomi {
        padding: 15px;
        margin: 10px;
        background-image: linear-gradient(to bottom, #f3a57b 0px, #f4dacc 30px, #fff);

        .sosuo-xiaomi-top {
            display: flex;
            font-size: 16px;
            font-weight: bold;
            color: #ff4e00;
            margin-left: -4px;
            margin-bottom: 15px;

            .sosuo-img-ii {
                width: 30px;
                margin-right: 5px;
            }

            .sosuo-img-zi {
                line-height: 35px;
            }


        }

        .sosuo-xiaomi-xia {
            display: flex;
            flex-wrap: wrap;

            .sosuo-xiaomi-xuan {
                width: 158px;
                margin-right: 4px;
                display: flex;
                margin-bottom: 20px;

                .sosuo-xiaomi-xuan-left {
                    width: 50px;
                }

                .sosuo-xiaomi-xuan-right {
                    width: 108px;
                    display: flex;
                    flex-wrap: wrap;
                    overflow: hidden;
                    box-sizing: border-box;
                    padding-left: 5px;

                    .sosuo-xiaomi-xuan-right-zi {
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .sosuo-xiaomi-xuan-right-biao {
                        border: 1px solid #ff4e00;
                        box-sizing: border-box;
                        background-color: #f1b9a1;
                        color: #ff4e00;
                        font-size: 10px;
                        line-height: 10px;
                        height: 15px;
                        padding: 2px;

                    }
                }
            }

        }
    }

}

::v-deep .van-search__content {
    border-radius: 15px;
    background-color: white;
}

::v-deep .van-search {
    width: 295px;
    background-color: rgb(243, 243, 243);
}
</style>