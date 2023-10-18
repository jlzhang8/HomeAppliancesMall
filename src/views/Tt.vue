<template>
  <!-- 遮罩层 -->
  <div class="gomai" @click="chuan">
    <div class="gomai-zhaiti" @click.stop="mmy">
      <div class="gomai-top">

        <div class="gomai-top-left">
          <img class="auto-img" :src="xiangqerwei[yiwei][erwei].url ? xiangqerwei[yiwei][erwei].url : ''" />
        </div>

        <div class="gomai-top-right">
          <div class="gomai-top-right-top">￥{{ xiangqerwei[yiwei][erwei].price }}</div>
          <div class="gomai-top-right-buttom">{{ xiangqerwei[yiwei][erwei].name }}</div>
        </div>
      </div>

      <div class="gomai-xia" v-for="(item, index) in gomai" :key="index">
        <div class="gomai-xia-title">{{ item.name }}</div>
        <div class="gomai-xia-nro">
          <div class="gomai-xia-nro-xx" :class="{ atme: index == 1 ? ii == erwei : ii == yiwei }" @click="huan(index, ii)"
            v-for="(tt, ii) in item.list " :key="ii" v-show="index == 0 ? ii < xiangqerwei.length : ii < changdu">{{ tt.name }}
          </div>
        </div>
      </div>
      <!-- 计步器 -->
      <div class="gomai-jibu">
        <div class="gomai-jibu-left">购买数量</div>
        <div class="gomai-jibu-right">
          <van-stepper v-model="value" disable-input />
        </div>
      </div>
      <!-- 确认按钮 -->
      <div class="gomai-ann">
        <slot name="queren">
          <div class="gomai-ann-qr" @click="qr">确认</div>
        </slot>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Tt',
  data() {
    return {
      gomai: [],
      xiangqerwei: [[''], [], [], []],
      yiwei: 0,
      erwei: 0,
      san: 0,
      value: 1,
      changdu: 4
    }

  },
  created() {
    this.aja()
  },
  methods: {
    huan(index, ii) {
      if (index == 0) {
        if (ii == this.yiwei) {
          return
        }

        this.yiwei = ii
        let aa = this.xiangqerwei[this.yiwei].length
        if (this.erwei > (aa - 1)) {
          this.erwei = 0
        }

        this.changdu = aa
      } else if (index == 1) {
        if (ii == this.erwei) {
          return
        }
        this.erwei = ii
      } else {
        if (ii == this.san) {
          return
        }
        this.san = ii
      }
    },
    mmy() {
      //
    },
    chuan() {
      //
    },
    qr() {

    },
    aja() {
      this.axios({
        method: 'get',
        url: '/miproduct/view?',
        params: {
          commodity_id: 16176
        }
      }).then(ret => {
        this.xiangqerwei = []
        this.gomai = ret.data.data.buy_option
        let top = [];
        let shu = -1
        //获取全部商品数据
        let shuju = ret.data.data.goods_info
        shuju.forEach(item => {
          if (top.indexOf(item.price) == -1) {
            top.push(item.price)
            shu++
            this.xiangqerwei[shu] = []
          }
          this.xiangqerwei[shu].push({
            name: item.name,
            price: item.price,
            url: item.image_share
          })

        })
        //
        //
      }).catch(err => {

      })
    }

  }

}
</script>

<style lang="less" scoped>
.gomai {
  height: 667px;
  width: 100%;
  background-color: rgba(0, 0, 0, .5);
  position: relative;

  ::v-deep .van-stepper__minus::before {
    color: #323233;
  }

  .gomai-ann {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 8px 15px;
    padding-bottom: 15px;

    .gomai-ann-qr {
      width: 345px;
      height: 35px;
      font-size: 16px;
      font-weight: bolder;
      text-align: center;
      line-height: 35px;
      background-color: #ff6700;
      color: white;
      border-radius: 22px;
    }
  }

  .gomai-jibu {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 15px;


    .gomai-jibu-left {
      font-size: 16px;
      font-weight: bold;
    }

    .gomai-jibu-right {}
  }

  .gomai-zhaiti {
    height: 400px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgb(244, 244, 244);
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
    padding-top: 90px;

    .gomai-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 10px;
      display: flex;

      .gomai-top-left {
        width: 70px;
        margin-right: 10px;
        background-color: #e4e4e4;
      }

      .gomai-top-right {
        padding-top: 13px;

        .gomai-top-right-top {
          font-size: 16px;
          font-weight: bold;
          color: #ff6700;
          margin-bottom: 6px;
        }

        .gomai-top-right-buttom {
          font-size: 10px;
        }
      }
    }

    .gomai-xia {
      margin-top: 10px;
      padding-left: 10px;

      .gomai-xia-title {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .gomai-xia-nro {
        // margin-bottom: 6px;
        display: flex;
        flex-wrap: wrap;

        .gomai-xia-nro-xx {
          padding: 5px 10px;
          background-color: #e2e2e2;
          border: 1px solid transparent;
          border-radius: 15px;
          margin-right: 15px;
          margin-bottom: 10px;
          // font-weight: bold;
          font-size: 14px;

          &.atme {
            color: #ff4400;
            border: 1px solid #ff4400;
            background-color: rgb(237, 215, 210);
          }
        }
      }
    }
  }

}
</style> 