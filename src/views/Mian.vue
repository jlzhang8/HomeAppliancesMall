<template>
    <div class="mian">
        <div>
                <router-view></router-view>
        </div>
        <div class="mian-tt">
            <van-tabbar v-model="active" active-color="#ff6700">
                <van-tabbar-item v-for="(item, index) in shuzu" :key="index" :to="{ name: item.name }" :badge="index != 3 ? '' : !$root.last ? '' : $root.gowu == 0 ? '' : $root.gowu">
                    <span>{{ item.title }}</span>
                    <template #icon="props">
                        <img :src="props.active ? item.activeIcon : item.inactiveIcon">
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Mian',
    data() {
        return {
            active: 0,
            gowuc: 0,
            shuzu: [
                {
                    title: '首页',
                    activeIcon: require('../assets/home-active.png'),
                    inactiveIcon: require('../assets/home.png'),
                    name: 'Home'
                },
                {
                    title: '分类',
                    activeIcon: require('../assets/sort-active.png'),
                    inactiveIcon: require('../assets/sort.png'),
                    name: 'Sort'
                },
                {
                    title: '服务',
                    activeIcon: require('../assets/serve-active.png'),
                    inactiveIcon: require('../assets/serve.png'),
                    name: 'Serve'
                },
                {
                    title: '购物车',
                    activeIcon: require('../assets/shopping-active.png'),
                    inactiveIcon: require('../assets/shopping.png'),
                    name: 'Shopping'
                },
                {
                    title: '我的',
                    activeIcon: require('../assets/my-active.png'),
                    inactiveIcon: require('../assets/my.png'),
                    name: 'My'
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.mian-tt {
    position: absolute;
    left: 0;
    bottom: 0;
}

.van-tabbar-item .van-info {
    background-color: #ff6700 !important;
}
</style>