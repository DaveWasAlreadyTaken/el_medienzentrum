<template>
  <v-card
      v-if="!isTermin"
      class="mx-auto rounded my-10"
      max-width="400"
      elevation="0"
      color="background"
  >
    <v-carousel
        height="200"
        hide-delimiters
        v-if="object?.meta?.bilder?.length>0"

    >
      <template #next="{props}">
        <v-btn class="mx-2 rounded text-white" @click="props.onClick()" style="background-color: rgba(0, 0, 0, 0.5);z-index:3;position:absolute;right:0px;bottom:5px" icon variant="text">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </v-btn>
      </template>
      <template #prev="{props}">
        <v-btn @click="props.onClick" variant="flat" class="rounded" style="background-color: rgba(0, 0, 0, 0.5);z-index:3;position:absolute;right:70px;bottom:5px" icon="mdi-chevron-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>

          </svg>
        </v-btn>
      </template>
      <v-carousel-item  class="align-end text-white" v-for="(bild,$index) of object.meta.bilder" :src="bild" :key="$index"
                       cover>

      </v-carousel-item>

    </v-carousel>
    <v-sheet color="transparent" class="d-flex justify-center align-center" v-else height="200px">
      <span>Keine Bilder vorhanden</span>
    </v-sheet>
    <v-card-title class="text-wrap" v-html="object.title.rendered"></v-card-title>
    <v-card-subtitle class="">
      <span v-for="kat of object.meta.kategorie" class="text-uppercase" :key="kat">{{kat.replace("_"," ")}}</span>

    </v-card-subtitle>

    <v-card-text>
      <div v-html="object?.meta?.beschreibung?.substr(0,250)"></div>
    </v-card-text>

    <v-card-actions>
      <DetailsPopupMobile :beschreibung="object?.meta?.beschreibung" mobile :object="object"/>

    </v-card-actions>
  </v-card>
</template>

<script>
import DetailsPopupMobile from "@/components/DetailsPopupMobile";
export default {
  name: "MobileObject",
  components: {DetailsPopupMobile},
  props:{
    object:Object
  },
 computed:{
    isTermin(){
      if(!this.object) return false;
      else if(this.object.meta.kategorie.includes('termine')) return true;
      else return false;
    },
  }
}
</script>

<style scoped>

</style>