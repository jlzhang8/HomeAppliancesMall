<template>
    <div class="sort">
        <div class="sort-sosuo">
            <form action="/">
                <van-search v-model="value" show-action placeholder="搜索商品" @search="onSearch" @cancel="onCancel" />
            </form>
        </div>
        <div class="sort-nro">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item :title="item.name" v-for="(item, index) in chebian" :key="index" @click="sos(item.id, index)" />
            </van-sidebar>
        </div>

        <!-- 暂时全部的区域 -->

        <div class="quanbu">
            <div class="quanbu-img" v-for="(item,index) in tup" :key="index">
                <img class="auto-img" :src="item.body.items[0].img_url" />
            </div>
            <div class="quanbu-top">
                <van-tabs>
                    <van-tab v-for="(item, index) in xiaosj"  :key="index" :title="item.title">
                    </van-tab>
                </van-tabs>
            </div>
            <div class="quanbu-nro">


                <div class="jiego" v-for="(item, index) in dasj" :key="index">
                    <div class="jiago-title">{{ item.body.title }}</div>
                    <div class="jiago-tt" v-if="!item.body.is_expad">
                        <div class="jiago-sp" v-for="(tt, ii) in item.body.product_list" :key="ii"
                            @click="chuan(tt.product_id, tt.action.type)">
                            <div class="jiago-sp-img">
                                <img class="auto-img" :src="tt.puzzle_url" />
                            </div>
                            <div class="jiago-sp-wenzi">
                                <div class="jiago-sp-name">{{ tt.name }}</div>
                                <div class="jiago-sp-price">
                                    <span class="jiago-span">￥</span>
                                    {{ tt.price }}
                                    <span class="jiago-span">起</span>
                                    <div class="jiago-kk" v-if="tt.labels" v-for="(eee,kk) in tt.labels" :key="kk">
                                        {{ eee }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="jiago-dddd" v-if="!item.body.is_expad">
                        <div class="jiago-iii" v-for="(kk,ee) in item.body.items" :key="eer" @click="chuan(kk.action.path, kk.action.type)">
                            <div class="jiago-ssss-img">
                                <img class="auto-img" :src="kk.img_url" />
                            </div>
                            <div class="jiago-ssss-name on-suo">{{ kk.product_name }}</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
import router from '@/router';

export default {
    name: "Sort",
    data() {
        return {
            chebian: [],
            activeKey: 1,
            value: "",
            name: '',
            xiaosj: [],
            dasj: [],
            tup: []
        };
    },
    created() {
        this.aja();
    },
    methods: {
        chuan(id, type) {
            if (type == 'cate') {
                //
                return
            }
            localStorage.setItem('id', id)
            this.$router.push({ name: 'Details', query: id })
        },
        sos(id, index) {
            if (index == this.activeKey) {
                return
            }
            this.shuju(id)
            //

        },
        onSearch(val) {
            //
        },
        onCancel() {
            //
        },
        //获取分类
        aja() {
            this.chebian = [];
            this.axios({
                method: "get",
                url: "/home/category_v2"
            }).then(ree => {
                let aa = ree.data.data;
                aa.forEach((item, index) => {
                    this.chebian.push({ name: item.category_name, id: item.category_id });
                });
                // //
                this.shuju(this.chebian[this.activeKey].id)
            }).catch(eer => {
                //
            });
        },
        //用分类的ID获取数据
        shuju(id) {
            this.axios({
                method: "get",
                url: "/home/category_v2",
                params: {
                    cat_id: id
                }
            }).then(ree => {
                // let aa = ree.data.data;
                // //
                this.tup = []
                this.name = ree.data.data[0].category_name
                this.xiaosj = ree.data.data[0].title_list
                let kk = ree.data.data[0].category_list
                let rr = []
                kk.forEach(item => {
                    if (item.body.items || item.body.product_list) {
                        rr.push(item)
                    }
                })
                this.tup.push(rr[0])
                rr.splice(0, 1)
                this.dasj = rr
                //
            }).catch(eer => {
                //
            });
        }
    },
    components: { router }
}
</script>

<style lang="less" scoped>
.sort {

    .quanbu {
        width: calc(100% - 110px);
        position: absolute;
        top: 56px;
        left: 101px;
        height: 700px;
        // background-color: #ddd;
        overflow-y: auto;

        .quanbu-nro {

            .jiago-title {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 8px;
            }

            .jiego {
                width: 100%;
                margin-top: 15px;
                display: flex;
                flex-wrap: wrap;

                .jiago-dddd {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    padding-bottom: 40px;


                    .jiago-iii {
                        width: 33%;
                        text-align: center;

                        .jiago-ssss-img {
                            width: 100%;
                        }
                    }
                }

                .jiago-tt {
                    width: 100%;
                }

                .jiago-sp {
                    width: 100%;
                    border-radius: 10px;
                    background-color: #ebebeb;
                    padding: 1px 1px;
                    box-sizing: border-box;
                    display: flex;
                    margin-bottom: 6px;

                    .jiago-sp-img {
                        width: 60px;
                        margin-right: 8px;
                    }

                    .jiago-sp-wenzi {
                        margin-top: 10px;

                        .jiago-sp-name {
                            font-size: 14px;
                            display: -webkit-box;
                            overflow: hidden;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            margin-bottom: auto;
                        }

                        .jiago-sp-price {
                            font-size: 14px;
                            font-weight: bold;
                            margin-top: 4px;
                            display: flex;

                            .jiago-span {
                                font-size: 8px;
                                font-weight: 100;
                                color: black;
                                margin-top: 1px;
                            }

                            .jiago-kk {
                                padding: 0px 2px;
                                border: 1px solid #b07838;
                                color: #b07838;
                                font-size: 10px;
                                margin-left: 6px;
                            }
                        }
                    }

                }


            }
        }

        .quanbu-img {
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
        }

        .quanbu-top {
            display: flex;
        }
    }
}

.sort-nro {
    width: 90px;
}

::v-deep .van-tab {
    width: 30%;
}

::v-deep .van-tabs__line {
    background-color: #ff6700;
}

::v-deep .van-sidebar-item--select::before {
    width: 3px;
    height: 20px;
    background-color: #ff6700;
}

::v-deep .van-sidebar-item {
    padding: 15px 3px;
    padding-left: 10px;
}

::v-deep .van-sidebar-item {
    width: 90px;
    font-size: 10px;
}

::v-deep .van-sidebar-item--select {
    font-weight: bolder;
    color: #ff6700;
}

::v-deep .van-search__content {
    border-radius: 17px;
}
</style>