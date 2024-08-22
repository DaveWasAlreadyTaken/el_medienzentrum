<template>
  <div class="d-flex justify-center align-center mt-2" style="position: relative">
    <v-btn size="small" style="position:absolute;top:0;right:0" icon="mdi-printer" @click="print"></v-btn>
    <v-btn size="small" style="position:absolute;top:0px;right:50px" icon="mdi-content-save" @click="download"></v-btn>
    <v-btn variant="flat" class="rounded" style="background-color: rgba(44, 66, 116, 0.1);"
           @click="page = page > 1 ? page - 1 : page" icon="mdi-chevron-left"></v-btn>
    <span class="mx-3">{{page}}/{{pages}}</span>
    <v-btn variant="flat" class="rounded" style="background-color: rgba(44, 66, 116, 0.1);"
           @click="page = page < pages ? page + 1 : page" icon="mdi-chevron-right"></v-btn>
  </div>
  <VuePDF :pdf="selected" :page="page"/>
</template>
<script>

import {VuePDF} from '@tato30/vue-pdf'
//import print from 'print-js'
import printJS from "print-js";
import { downloadUsingAnchorElementNewTab} from "@/services/file.service";
export default {
  name: 'PDFViewer',
  components:{VuePDF},
  data(){
    return{
      page:1
    }
  },
  computed:{

  },
  props: {
    file:Object,
    selected: Object,
    pages:Number
  },
  methods: {
    async print() {
      console.log("File",this.file);
      let blob = await fetch(this.file.datei.replace("http://","https://")).then(r => r.blob());
      const pdfUrl = URL.createObjectURL(blob);
      printJS(pdfUrl);
    },
    download(){
      let file = this.file;
      file.datei=file.datei.replace("http://","https://");
      downloadUsingAnchorElementNewTab(file);
    },
  }
}
</script>
