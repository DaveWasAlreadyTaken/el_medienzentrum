<template>
  <v-app id="app" class="bg-primary">

  <HeaderNew v-if="!$vuetify.display.mobile"/>


    <MobileHeader v-else/>

    <img @click="$router.push('/')" class="hidden-sm-and-down" style="position: absolute;cursor:pointer;z-index:1222;top:20px;left:20px; width:23%" :src="require('@/assets/logo.png')"/>

    <v-main class="main">
    <router-view></router-view>
      <DatenschutzView/>
      <ImpressumView/>
    </v-main>
  </v-app>
</template>

<script>
import {useAppStore} from "@/stores/app.module";
import MobileHeader from "@/components/MobileHeader";
import DatenschutzView from "@/views/Datenschutz";
import ImpressumView from "@/views/Impressum";
import HeaderNew from "@/components/HeaderNew";


export default {
  name: 'App',
  setup(){
    const appStore = useAppStore();

    appStore.getObjects();
    appStore.getTermine();
  },
  components: {
    HeaderNew,
    ImpressumView,
    DatenschutzView,
    MobileHeader,

  },
  created(){
    console.log(this.$vuetify.display.mobile);
  }
}
</script>

<style>
@import "style/global.scss";
@media only screen and (min-width: 992px){
  html,body {
    overflow:hidden!important;
    scroll-behavior: smooth;
  }
}
#app {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
