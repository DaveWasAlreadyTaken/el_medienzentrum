<template>
  <v-menu class="elevation-1" location="bottom"  open-on-hover>
    <template #activator="{props}">
      <v-btn :class="{'selected':filter=== menuId }" size="small" v-bind="props" text class="text-capitalize" @click="goTo(href)" v-html="title"></v-btn>
    </template>
    <v-list class="elevation-1 px-5">
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="setFilter(item.link)"
      >
        <v-list-item-title style="font-size:0.8rem">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {useAppStore} from "@/stores/app.module";

export default {
  name: "MenuDropdown",
  setup(){
    const appStore = useAppStore();
    return{
      appStore
    }
  },
  computed:{
    filter(){
      return this.appStore.filter;
    }
  },
  props:{
    menuId:String,
    title:String,
    items:Array,
    link:Boolean,
    href:String
  },
  methods:{
    goTo(link){
      this.$router.push(link)
    },
    setFilter(filter){
      if(this.link) this.$router.push(filter);
      else {
        if(this.$route.name!="Home" || this.$route.name!="HomeF") this.$router.push("/"+filter)
        else this.appStore.setFilter(filter);
      }
    }
  }
}
</script>

<style scoped>
.selected{
  background-color: rgba(44, 66, 116, 1);
  color:white!important;
}
</style>