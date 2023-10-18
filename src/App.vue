<template>
  <div id="app">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.auto-img{
  width: 100%;
  display: block;
}

.on-suo{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>
