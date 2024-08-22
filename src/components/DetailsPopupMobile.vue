<template>
<v-dialog scrollable v-model="show">
  <template #activator="{props}">
    <v-btn v-if="!mobile" class="mt-4 hover-btn" variant="outlined" color="black"  v-bind="props">Mehr anzeigen <v-icon class="ml-2">mdi-open-in-new</v-icon></v-btn>
    <v-btn v-else class="mt-4 hover-btn" variant="text" size="small" color="black"  v-bind="props">Mehr anzeigen <v-icon class="ml-2">mdi-open-in-new</v-icon></v-btn>

  </template>
  <v-card style="max-height: 100%">
    <v-toolbar color="accent">
      <v-toolbar-title v-html="object?.title?.rendered"></v-toolbar-title>
      <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card-text>
    <v-card-subtitle class="px-5 py-5">
      <h3>Beschreibung</h3>
      <div v-if="beschreibung" style="max-width: 100%;text-wrap: normal;word-break: break-all;
    white-space: normal;" v-html="beschreibung"></div>
      <span v-else>Keine Beschreibung vorhanden</span>
    </v-card-subtitle>

    <div v-if="object && object.meta?.viewerbilder && object.meta?.viewerbilder.length>0">

      <v-card-subtitle><h3>3D Objekt</h3></v-card-subtitle>
      <ObjectViewerDetails v-if="object && show" current :ref="object.id" :images="object.meta.viewerbilder" :datei-praefix="object.meta.dateipraefix" :title="object.title.rendered" :id="object.id"/>
    </div>

    <div v-if="object.meta.bilder.length>0">
    <v-card-subtitle class="px-5"><h3>Bilder</h3></v-card-subtitle>
    <div class="pa-5">
      <v-carousel
          height="200"
          hide-delimiters

      >
        <template #next="{props}">
          <v-btn class="mx-2 rounded text-white" @click="props.onClick()" style="background-color: rgba(255, 255, 255, 0.5);z-index:3;position:absolute;right:0px;bottom:5px" icon variant="text">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </v-btn>
        </template>
        <template #prev="{props}">
          <v-btn @click="props.onClick" variant="flat" class="rounded" style="background-color: rgba(255, 255, 255, 0.5);z-index:3;position:absolute;right:70px;bottom:5px" icon="mdi-chevron-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>

            </svg>
          </v-btn>
        </template>
        <v-carousel-item  class="align-end text-white" v-for="(bild,$index) of object.meta.bilder" :src="bild" :key="$index"
                          cover>

        </v-carousel-item>

      </v-carousel>
    </div>

    </div>
    <v-card-subtitle class="px-5"><h3>Dokumente</h3></v-card-subtitle>


    <v-list class="mx-5">


          <div class="d-flex justify-center" style="width:100%" v-for="(image,$index) of files" :key="$index" >

            <v-list-item style="width: 100%" @click="selectPDF(image)" align="left" v-if="image && image.datei && image.datei.includes('.pdf')" :title="image.name">
              <template #prepend>
                <v-icon>mdi-file-pdf-box</v-icon>
              </template>
            </v-list-item>
            <v-list-item style="width: 100%" @click="download(image)" v-else-if="image && image.datei">
              <template #title>
                <span v-if="image.name">{{image.name}}</span>
                <span v-else>Kein Titel</span>
              </template>
              <template #prepend>
              <v-icon>mdi-file</v-icon>
              </template>

            </v-list-item>
          </div>
    </v-list>
      <v-list>
          <div class="d-flex justify-center" style="width:100%" v-for="(link,$index) of object.meta.benutzerdefiniertelinks" :key="$index">
            <v-list-item :title="link.label" target="_blank" :href="link.link" >
              <template #prepend>
                <v-icon>mdi-link</v-icon>
              </template>

            </v-list-item>
          </div>
         </v-list>
      <v-dialog width="100%" v-model="showPdf">
        <v-toolbar>
          <v-btn icon="mdi-close" @click="showPdf=false"></v-btn>
          <v-spacer/>
          <div class="d-flex  align-center justify-center align-center pr-5">
            <v-btn size="small" variant="flat" class="rounded" style="background-color: rgba(44, 66, 116, 0.1);" @click="page = page > 1 ? page - 1 : page" icon="mdi-chevron-left"></v-btn>
            <span class="mx-3">{{page}}/{{pages}}</span>
            <v-btn size="small" variant="flat" class="rounded" style="background-color: rgba(44, 66, 116, 0.1);" @click="page = page < pages ? page + 1 : page" icon="mdi-chevron-right"></v-btn>
          </div>
        </v-toolbar>
        <v-card>
       <div v-if="selected?.docId">

          <VuePDF fit-parent :pdf="selected" :page="page" />
        </div>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</v-dialog>
</template>

<script>
import {usePDF, VuePDF} from '@tato30/vue-pdf'
import {downloadUsingAnchorElement} from "@/services/file.service";
import ObjectViewerDetails from "@/components/ObjectViewerDetails";

export default {
  name: "DetailsPopupMobile",
  components: {
    ObjectViewerDetails,
    VuePDF
  },
  props:{
    mobile:Boolean,
    object:Object,
    showFromOutside:Boolean,
    beschreibung:String
  },
  data(){
    return{
      showPdf:false,
      show:false,
      selected:null,
      page:1,
      pages:0
    }
  },
  watch:{
    showFromOutside(){
      this.show=this.showFromOutside;
    },
  },
  mounted() {
    //console.log("Objekt",this.object)
    this.selected=null;
  },
  computed:{
    files(){

      if(!this.object) return [];
      let result=this.object.meta.bilder;
      let dateien=[]
      if(!this.object.meta.dateien) return [];
      for(let datei of Object.values(this.object.meta.dateien)){
        dateien.push(this.convertProxyObjectToPojo(datei));
      }
      result= result.concat(dateien);

      return result;
    }
  },
  methods:{
    async selectPDF(file) {
      this.selected=file;
      this.showPdf=true;
      console.log("File", file)
      let blob = await fetch(file.datei).then(r => r.blob());
      const pdf = usePDF(URL.createObjectURL(blob));
      console.log("Pdf", pdf);
      this.pages=pdf.pages;
      this.selected = pdf.pdf;

    },
    download(file){
      downloadUsingAnchorElement(file);
    },
    convertProxyObjectToPojo(proxyObj) {
      return {...proxyObj};
    },
    close(){
      this.show=false;
    }
  }
}
</script>

<style scoped>
.object-list-popup{

}
/* width */
.object-list-popup::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.object-list-popup::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.object-list-popup::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.object-list-popup::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.hover-btn:hover{
  background-color:black;
  color:white!important;
  transition: background-color,color 0.5s ease;
}
.hvr-button{
  transition: background-color 0.5s ease;
  transition: color 0.5s ease;
}
.hvr-button:hover{
  background-color: rgb(44,66,116);
  color:white;
}
</style>