<template>
  <div v-if="object" style="width:500px;cursor:pointer;height:50vh;z-index:1; position:relative" class="d-flex justify-end align-end">


    <TerminItem v-if="object.meta.kategorie.includes('termine')" :termin="object"/>
    <div style="height:100%" class="d-flex justify-center align-center" v-else-if="object.meta.viewerbilder && object.meta.viewerbilder.length>0">
      <ObjectViewer  :current="current" :ref="object.id" v-if="!resetObject && current" :images="object.meta.viewerbilder" :datei-praefix="object.meta.dateipraefix" :title="this.object.title.rendered" :id="object.id"/>
      <img style="width: 100%;max-height: 35vh;position:relative;" v-else-if="object.meta.viewerbilder[0]" :src="object.meta.viewerbilder[0]"/>
      <img style="width: 100%;position: relative" v-else :src="'https://placehold.co/600x400?text='+object.title.rendered.replace(' ','+')"/>
    </div>
    <img style="width: auto;max-width: 100%; max-height: 35vh;position:relative;bottom: 50%;
    transform: translateY(50%);" class="mx-auto" v-else-if="object.meta.bilder[0]" :src="object.meta.bilder[0]"/>
    <img style="width: 100%;bottom: 50%; height:35vh; position: relative;
    transform: translateY(50%);" v-else :src="'https://placehold.co/600x400?text='+object.title.rendered.replace(' ','+')"/>
    </div>
</template>

<script>
import ObjectViewer from "@/components/ObjectViewer";
import TerminItem from "@/components/TerminItem";
import {useAppStore} from "@/stores/app.module";
export default {
  name: "SliderItem",
  setup(){
    const appStore = useAppStore();

    return {appStore}
  },
  components: {TerminItem, ObjectViewer},
  props:{
    newObject:Boolean,
    object:Object,
    current:Boolean
  },
  computed:{
    resetObject(){
      console.log(this.appStore.resetObject)
      return this.appStore.resetObject;
    }
  }
}
</script>

<style lang="scss">
.ribbon {
  $default-right: 10px;
  $default-top: 30px;
  $default-color: #2ca7d8;
  $default-width: 30px;
  $default-height: 45px;

  position: absolute;
  z-index:99;
  right: var(--right, $default-right);
  top: var(--top, $default-top);

  filter: drop-shadow(2px 3px 2px rgba(black, 0.5));

> .content {
  color: white;
  font-size: 0.8rem;
  text-align: center;
  font-weight: 400;
  background: var(--color, $default-color) linear-gradient(45deg, rgba(black, 0) 0%, rgba(white, 0.25) 100%);
  padding: 8px 2px 4px;


  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%);

  width: var(--width, $default-width);
  min-height: var(--height, $default-height);

  transition: clip-path 1s, padding 1s, background 1s;
}

&.slant-up > .content {
   clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), 50% calc(100% - 6px), 0 100%);
 }

&.slant-down > .content {
   clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 6px), 0 calc(100% - 12px));
 }

&.down > .content {
   clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), 50% 100%, 0 calc(100% - 8px));
 }

&.up > .content {
   clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 8px), 0 100%);
 }

&.check > .content {
   clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), 40% 100%, 0 calc(100% - 12px));
 }
}
</style>