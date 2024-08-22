<template>
<v-app-bar app>
  <img class="hidden-md" style="height:80%" :src="require('@/assets/logo.png')"/>
  <v-spacer/>
  <v-app-bar-nav-icon @click="drawer=!drawer" ></v-app-bar-nav-icon>
</v-app-bar>
  <v-navigation-drawer style="z-index:999999999" class="py-5" app v-model="drawer" location="right">

    <v-list-subheader class="ml-3">Medienverleih</v-list-subheader>

      <v-list-item @click="setFilterMobile('dvd_lehrfilme')" title="DVD Lehrfilme"></v-list-item>
      <v-list-item @click="setFilterMobile('foto_video')" title="Foto/ Video"></v-list-item>
      <v-list-item @click="setFilterMobile('erste_hilfe')" title="Erste Hilfe"></v-list-item>
      <v-list-item @click="setFilterMobile('audio')" title="Audio"></v-list-item>
      <v-list-item @click="setFilterMobile('3d_drucker')" title="Gestalten / Entwerfen"></v-list-item>
      <v-list-item @click="setFilterMobile('navigation')" title="Navigation"></v-list-item>
      <v-list-item @click="setFilterMobile('robotics')" title="Robotics"></v-list-item>
      <v-list-item  @click="setFilterMobile('funk_uebertragung')" title="Funkübertragung"></v-list-item>
    <v-list-subheader class="ml-3">Weiteres</v-list-subheader>
      <v-list-item  @click="setFilterMobile('services')" title="Services"></v-list-item>
      <v-list-item  @click="setFilterMobile('online_dienste')" title="Online Dienste"></v-list-item>
      <v-list-item @click="setFilterMobile('rechtliches')" title="Rechtliches"></v-list-item>
      <v-list-item @click="setFilterMobile('informationen')" title="Informationen"></v-list-item>
      <v-list-item @click="setFilterMobile('bilder')" title="Bilder"></v-list-item>
      <v-list-item @click="setFilterMobile('termine')" title="Termine"></v-list-item>
    <v-list-item @click="toggleDatenschutz" title="Datenschutz"></v-list-item>
    <v-list-item @click="toggleImpressum" title="Impressum"></v-list-item>


  </v-navigation-drawer>
</template>

<script>
import {useAppStore} from "@/stores/app.module";

export default {
  name: "MobileHeader",
  data(){
    return{
      drawer:false,
    }
  },
  setup(){
    const appStore = useAppStore();
    return{appStore}
  },
  methods:{
    toggleDatenschutz(){
      this.appStore.toggleDatenschutz();
    },toggleImpressum(){
      this.appStore.toggleImpressum();
    },
    setFilterMobile(value){
      this.appStore.setFilterMobile(value);
      this.drawer=false;
    }
  },
}
</script>

<style scoped>

</style>