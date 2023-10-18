<template>
    <div class="dengru">
        <div class="zhuche-fanhui" @click="back">&lt; <span class="fff">返回</span></div>

        <div class="drngru-yonghu">
            <div class="drngru-yonghu-img">
                <img src="../assets/iconxiaomi.png" />
            </div>
            <div class="drngru-yonghu-zi">欢迎回来</div>
        </div>
        <van-form @submit="onSubmit">
            <van-field class="border" v-model="username" name="name" label="用户名/账号" placeholder="用户名/账号"
                :rules="[{ required: true, message: '请填写用户名/账号' }]" />
            <van-field class="border" v-model="password" type="password" name="pass" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button class="annshang" round block type="info" native-type="submit">登入</van-button>
            </div>
        </van-form>
        <button class="ann-xia" @click="onBbbb">注册账号</button>

    </div>
</template>

<script>
export default {
    name: 'Dengru',
    data() {
        return {
            username: '',
            password: '',
            zhanghao: [],
            ll: false
        }
    },
    created() {
        let mm = localStorage.getItem('zhmm')
        if (mm) {
            this.zhanghao = JSON.parse(mm)
        }
    },
    methods: {
        onSubmit(values) {
            for (let i = 0; i < this.zhanghao.length; i++) {
                if (values.name == this.zhanghao[i].name || values.name == this.zhanghao[i].zhanghao) {
                    if (values.pass == this.zhanghao[i].pass) {
                        //
                        this.ll = true
                        this.$root.last = true
                        this.$router.push({ name: 'My', query: { name: this.zhanghao[i].name, id: this.zhanghao[i].zhanghao } })

                    } else {
                        //
                    }
                    break
                }
            }
            this.username = ''
            this.password = ''
            //
        },
        onBbbb() {
            //
            this.$router.push({ name: 'Zhuche' })
        },
        back() {
            this.$router.back()
        },
    },
    beforeRouteLeave(to, from, next) {
        //
        //
        //
        to.meta.isLogin = this.$root.last;
        next();
    }
}
</script>

<style lang="less" scoped>
.dengru {
    padding: 150px 10px 232px;
    background-color: #f1f0f0;

    .fff {
        margin-left: 3px;
    }

    .zhuche-fanhui {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #60abf1;

    }

    .drngru-yonghu {
        display: flex;
        padding-left: 100px;
        margin-bottom: 20px;

        .drngru-yonghu-zi {
            font-size: 22px;
            font-weight: bold;
            color: #ff6700;
            line-height: 50px;
            margin-left: 10px;
        }

    }

    .ann-xia {
        margin-top: 20px;
        display: block;
        width: 90%;
        padding: 0 0.4rem;
        background-image: linear-gradient(to left, #f08640, #fa6306, #fa4306);
        border: 0.02667rem solid #1989fa;
        border-color: #ff6700;
        line-height: 1.2;
        text-align: center;
        box-sizing: border-box;
        height: 1.17333rem;
        border-radius: 26.64rem;
        margin-left: 18px;
        font-size: 16px;
        font-weight: bold;
        color: rgb(245, 245, 245);
    }

    .border {
        border-radius: 30px;
        margin: 2px 0;
    }
}


.annshang {
    background-image: linear-gradient(to right, #f08640, #fa6306, #fa4306) !important;
    border-color: #ff6700 !important;
    font-size: 16px;
    font-weight: bold;
    color: rgb(245, 245, 245);
}
</style>