<template>
    <div class="zhuche">
        <div class="zhuche-fanhui" @click="back">&lt; <span class="fff">返回</span></div>
        <div class="zhuche-dr" @click="dr">去登入</div>
        <div class="zhuche-zc" @click="zc">点击注册</div>
        <div class="drngru-yonghu">
            <div class="drngru-yonghu-img">
                <img src="../assets/iconxiaomi.png" />
            </div>
            <div class="drngru-yonghu-zi">注册账号</div>
        </div>
        <div class="zhuche-shu">
            <!-- 输入任意文本 -->
            <van-field class="bianju" v-model="text" label="用户名" />
            <!-- 允许输入正整数，调起纯数字键盘 -->
            <van-field class="bianju" v-model="digit" type="digit" label="数字账号" />

            <!-- 输入密码 -->
            <van-field class="bianju" v-model="password" type="password" label="密码" />
        </div>

    </div>
</template>

<script>
export default {
    name: 'Zhuche',
    data() {
        return {
            text: '',
            digit: '',
            password: '',
            zhanghao: []

        };
    },
    created() {
        let kkk = localStorage.getItem('zhmm')
        if (kkk) {
            this.zhanghao = JSON.parse(kkk)
            //
        }
    },
    methods: {
        back() {
            this.$router.back()
        },

        zc() {
            if (this.text != '' && this.digit != '' && this.password != '') {
                for (let i = 0; i < this.zhanghao.length; i++) {
                    if (this.zhanghao[i].name == this.text || this.zhanghao[i].zhanghao == this.digit) {
                        // Toast({
                        //     message: '账号或用户名已存在',
                        //     position: 'top',
                        // });
                        //
                        return
                    }
                }
                let huoqu = JSON.parse(localStorage.getItem('zhmm'))
                if (!huoqu) {
                    huoqu = []
                }
                huoqu.push({
                    name: this.text,
                    zhanghao: this.digit,
                    pass: this.password
                })
                localStorage.setItem('zhmm', JSON.stringify(huoqu))
                // Toast({
                //     message: '注册成功',
                //     position: 'top',
                // });
                //

                this.password = ''
                this.digit = ''
                this.text = ''
            }
        },
        dr() {
            this.$router.back()
        },
    }
}
</script>

<style lang="less" scoped>
.zhuche {
    background-color: #f1f0f0;
    padding: 130px 10px 328px;

    .fff {
        margin-left: 3px;
    }

    .bianju {
        margin: 2px;
        border-radius: 30px;
    }


    .zhuche-fanhui {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #60abf1;
    }

    .zhuche-dr {
        position: absolute;
        bottom: 190px;
        left: 25px;
        width: 86%;
        border-radius: 25px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-image: linear-gradient(to right, #f08640, #fa6306, #fa4306);
        font-size: 16px;
        font-weight: bold;
        color: rgb(245, 245, 245);
    }

    .zhuche-zc {
        position: absolute;
        bottom: 250px;
        left: 25px;
        width: 86%;
        border-radius: 25px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-image: linear-gradient(to left, #f08640, #fa6306, #fa4306);

        font-size: 16px;
        font-weight: bold;
        color: rgb(245, 245, 245);
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
}
</style>