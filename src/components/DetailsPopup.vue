<template>
<v-dialog min-height="90%" :fullscreen="mobile" style="z-index:99999999" v-model="show">
  <template #activator="{props}">
    <div class="animate__wobble animate__animated" ref="mehrAnzeigenButton">
    <v-btn v-if="!mobile" @click="show=true" class="mt-4 hover-btn " variant="outlined" color="black"  v-bind="props">Mehr anzeigen <v-icon class="ml-2">mdi-open-in-new</v-icon></v-btn>
    <v-btn v-else class="mt-4 hover-btn" variant="text" size="small" color="black"  v-bind="props">Mehr anzeigen <v-icon class="ml-2">mdi-open-in-new</v-icon></v-btn>
    </div>
  </template>
  <v-card min-height="95vh" >
    <v-toolbar color="accent">
      <v-toolbar-title class="text-center" v-html="object?.meta?.name"></v-toolbar-title>

      <v-btn style="position:absolute;right:0;top:50%;transform: translateY(-50%)" icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <div class="d-flex justify-space-between">
      <div class="object-list-popup" style="width:10%;max-height: 100%;overflow-y:scroll;">
        <div style="max-height: 80vh" class="d-flex justify-center flex-wrap">
          <div @click="selected={beschreibung:true,text:beschreibung}" class="my-1 mx-2 hvr-button bg-black-lighten-5 border d-flex flex-wrap justify-center align-center align-content-center" style="width:100%;height:100px;cursor:pointer">Beschreibung</div>
          <div v-ripple @click="openViewer" class="my-1 mx-2 hvr-button bg-black-lighten-5 border d-flex flex-wrap justify-center align-center align-content-center" style="width:100%;min-height:100px;cursor:pointer" v-if="object && object.meta.viewerbilder && object.meta.viewerbilder.length>0">
            <v-icon>mdi-rotate-3d</v-icon>
            <span class="text-center" style="width:100%">Ansicht</span>
          </div>
          <div class="d-flex justify-center" style="width:100%" v-for="(image,$index) of files" :key="$index" >

            <v-img class="my-1 px-2" v-if="image && !image.datei && image.datei!='' && (image.includes('.jpg') || image.includes('.png'))" style="cursor:pointer" @click="selected=image" :src="image"></v-img>
            <div  v-ripple @click="selected={video:true,video:image}" class="my-1 mx-2 hvr-button bg-black-lighten-5 border d-flex flex-wrap justify-center align-center align-content-center" style="width:100%;height:100px;cursor:pointer" v-else-if="image && !image.datei && image.datei!='' && (image.includes('.mp4'))">
              <v-icon>mdi-video</v-icon>
              <span class="text-center" style="font-size:0.8rem;width:100%">Video</span>
            </div>
            <div  v-ripple @click="selectPDF(image)" class="my-1 mx-2 hvr-button bg-black-lighten-5 border d-flex flex-wrap justify-center align-center align-content-center" style="width:100%;height:100px;cursor:pointer" v-else-if="image && image.datei && image.datei.includes('.pdf')">
              <v-icon>mdi-file-pdf-box</v-icon>
              <span class="text-center" style="font-size:0.8rem;width:100%">{{image.name}}</span>
            </div>
            <div v-ripple @click="download(image)" class="my-1 mx-2 hvr-button bg-black-lighten-5 border d-flex flex-wrap justify-center align-center align-content-center" style="width:100%;min-height:100px;cursor:pointer" v-else>
              <v-icon>mdi-file</v-icon>
              <span class="text-center" style="font-size:0.8rem;width:100%">{{image.name}}</span>
            </div>

          </div>

          <div class="d-flex justify-center" style="width:100%" v-for="(link,$index) of object.meta.benutzerdefiniertelinks" :key="$index">
            <a  v-ripple target="_blank" :href="link.link" class="my-1 hvr-button mx-2 bg-black-lighten-5 border flex-wrap d-flex justify-center align-center align-content-center" style="width:100%;height:100px;cursor:pointer">
              <v-icon>mdi-link</v-icon>
              <span class="text-center" style="width:100%">{{link.label}}</span>
            </a>
          </div>
        </div>
      </div>
      <div style="max-height: 100%;" class="mx-auto d-flex justify-center align-center">
        <div v-if="selected?.viewer" style="max-width: 800px">
          <ObjectViewerDetails v-if="selected?.viewer" current :ref="object.id" :images="object.meta.viewerbilder" :datei-praefix="object.meta.dateipraefix" :title="object.title.rendered" :id="object.id"/>
        </div>
        <div v-else-if="selected?.beschreibung" style="max-width: 500px" v-html="beschreibung"></div>
        <div v-else-if="selected?.video" style="max-width: 500px">
          <video width="520" height="340" controls>
            <source :src="selected.video" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>

        <div v-else-if="selected && selected.docId">
          <PDFViewer :file="pdfFile" :pages="pages" @updatePdf="updatePDF" :selected="selected"/>
        </div>
          <v-img class="rounded" max-height="600px" v-else :src="selected"></v-img>



      </div>
    </div>
  </v-card>
</v-dialog>
</template>

<script>
import {usePDF} from '@tato30/vue-pdf'
import {downloadUsingAnchorElement} from "@/services/file.service";
import PDFViewer from "@/components/PDFViewer";
import ObjectViewerDetails from "@/components/ObjectViewerDetails";
import {useAppStore} from "@/stores/app.module";

export default {
  name: "DetailsPopup",
  components: {
    ObjectViewerDetails,
    PDFViewer
  },
  setup(){
    const appStore = useAppStore();
    return{appStore}
  },
  props:{
    mobile:Boolean,
    object:Object,
    showFromOutside:Boolean,
    beschreibung:String,
    wobble:Boolean,
  },
  data(){
    return{
      show:false,
      selected:null,
      pages:0,
      pdfURL:null,
      pdfFile:null
    }
  },
  watch:{
    wobble(){
      if(this.wobble){
        this.$refs.mehrAnzeigenButton.classList.add("animate__wobble");
      }else{
        this.$refs.mehrAnzeigenButton.classList.remove("animate__wobble");
      }
    },
    showFromOutside(){
      this.show=this.showFromOutside;
    },
    files(){
      if(this.beschreibung.length>150 || this.files.length<=0){
        this.selected={beschreibung:true,text:this.beschreibung}
      }else {
        this.selected = this.files[0];

      }
    }
  },
  mounted() {
    //console.log("Refs",this.$refs);
    //this.$refs.mehrAnzeigenButton.classList.add("animate__animated")
    //console.log("Objekt",this.object)
    if(this.beschreibung.length>150 || this.files.length<=0){
      this.selected={beschreibung:true,text:this.beschreibung}
    }
    else {
      this.selected = this.files[0];
    }
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
    openViewer(){
      this.appStore.setReset(true);
      this.selected={viewer:true}
    },
    updatePDF(value){
      this.selected=value;
    },
    async selectPDF(file) {
      console.log("File", file)
      let blob = await fetch(file.datei.replace("http://","https://")).then(r => r.blob());
      this.pdfFile=file;
      const pdfUrl = URL.createObjectURL(blob);
      this.pdfURL=pdfUrl;
      const pdf = usePDF(pdfUrl);
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
      this.$emit("toggleDialog",this.show);
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