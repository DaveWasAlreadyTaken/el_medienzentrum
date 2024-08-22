<template>
  <div class="hero"></div>
  <div class="bg-background">
    <v-container>
      <h1 style="transform: translateY(-50%)" class="rounded text-center bg-white px-15 py-10 medienzentrum-text">Die Informationsseite des Medienzentrums</h1>
      <v-row class="py-15">
        <v-col cols="6">
          <h2 class="medienzentrum-text font-weight-black">Einleitungstext <br/>Lorem Ipsum</h2>
        </v-col>

        <v-col cols="6" class="text-poppins">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </v-col>

      </v-row>
      <v-row >
        <v-col cols="4">
          <a class="text-decoration-none" href="#termine">
            <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s2 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
              <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Termine</strong>
            </v-sheet>
          </a>
        </v-col>
        <v-col cols="4">
          <a class="text-decoration-none" href="#rechtliches">
            <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s4 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
              <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Rechtliches</strong>
            </v-sheet>
          </a>
        </v-col>
        <v-col cols="4">
          <a class="text-decoration-none" href="#informationen">
            <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s1 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
              <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Informationen</strong>
            </v-sheet>
          </a>
        </v-col>


      </v-row>
      <CallToAction
      />
    </v-container>
  </div>
  <div>
    <v-container>
      <div id="termine" class="my-15">
        <h2 class="mb-5">Termine</h2>
        <div class="d-flex justify-start">
          <TerminItem v-for="termin of termine" :key="termin.id" :termin="termin"/>
        </div>
      </div>
      <div id="rechtliches" class="my-15">
        <h2>Rechtliches</h2>
        <v-list>
          <v-list-item v-for="item of rechtliches" :key="item.id" :title="item.title?.rendered" :href="item.meta?.link"/>
        </v-list>
      </div>
      <div id="informationen" class="my-15">
        <h2>Allgemeinde Informationen</h2>
        <v-list>
          <v-list-item v-for="item of informationen" :key="item.id" :title="item.title?.rendered" :href="item.meta?.link"/>
        </v-list>
      </div>
    </v-container>
  </div>
</template>

<script>
import CallToAction from "@/views/CallToAction";
import {useAppStore} from "@/stores/app.module";
import TerminItem from "@/components/TerminItem";
export default {
  name: "TermineRechtlichesInformationenView",
  components: {TerminItem, CallToAction},
  setup(){
    const appStore = useAppStore();
    appStore.getTermine();
    appStore.getRechtliches();
    appStore.getInformationen();
    return {
      appStore
    }
  },
  computed:{
    termine(){
      return this.appStore.termine
    },
    rechtliches(){
      return this.appStore.rechtliches;
    },
    informationen(){
      return this.appStore.informationen;
    }
  }
}
</script>

<style scoped>

</style>