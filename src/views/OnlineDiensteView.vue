<template>
  <div class="hero"></div>
  <div class="bg-background">
    <v-container>
      <h1 style="transform: translateY(-50%)" class="rounded text-center bg-white px-15 py-10 medienzentrum-text">Unsere Online Dienste</h1>
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
          <a class="text-decoration-none" href="#next">
            <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s1 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
              <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">NEXT Cloud</strong>
            </v-sheet>
          </a>
        </v-col>
        <v-col cols="4">
          <a class="text-decoration-none" href="#fast">
            <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s3 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
              <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Fastviewer</strong>
            </v-sheet>
          </a>
        </v-col>
        <v-col cols="4">
          <a href="#eye" class="text-decoration-none">
            <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s4 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
              <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Eye on it</strong>
            </v-sheet>
          </a>
        </v-col>


      </v-row>
      <CallToAction/>
    </v-container>
<v-container class="py-15 text-poppins">
    <v-row>
    <v-col cols="6">
      <v-card id="next" min-height="550px"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">
              NEXT Cloud
            </v-card-title>

            <v-card-subtitle>Der Cloud Speicher <br/>des Medienzentrums Eichstätt.</v-card-subtitle>


          </div>

          <v-avatar
              class="ma-3"
              size="125"
              rounded="0"
          >
            <v-img :src="require('@/assets/nextcloud-logo.jpg')"></v-img>
          </v-avatar>



        </div>
        <v-container>
          <v-divider/>
        <v-list-subheader>Anleitungen</v-list-subheader>
        <v-list-item href="https://mz-ei.gemeinde-entwickler.de/wp-content/uploads/Dokumente/Registrierung-Cloud.pdf" title="REGISTRIERUNG NEXTCLOUD">
          <template #prepend>
            <v-icon>mdi-file-pdf-box</v-icon>
          </template>
        </v-list-item>
          <v-list-item href="https://mz-ei.gemeinde-entwickler.de/wp-content/uploads/Dokumente/datenhochladen-1.pdf" title="DATEN IN CLOUD LADEN UND SYNCHRONISATION">
          <template #prepend>
            <v-icon>mdi-file-pdf-box</v-icon>
          </template>
        </v-list-item>
          <v-list-item href="https://mz-ei.gemeinde-entwickler.de/wp-content/uploads/Dokumente/Daten-freigeben-2.pdf" title="DATEN FREIGEBEN">
          <template #prepend>
            <v-icon>mdi-file-pdf-box</v-icon>
          </template>
        </v-list-item>
          <v-list-item href="https://mz-ei.gemeinde-entwickler.de/wp-content/uploads/Dokumente/NextCloud-Talk.pdf" title="TALK ALS ALTERNATIVE ZU WHATSAPP">
          <template #prepend>
            <v-icon>mdi-file-pdf-box</v-icon>
          </template>
        </v-list-item>
          <v-list-item href="https://mz-ei.gemeinde-entwickler.de/wp-content/uploads/Dokumente/personenbezogene-Daten-verschluesseln.pdf" title="PERSONENBEZOGENE DATEN VERSCHLÜSSELN">
          <template #prepend>
            <v-icon>mdi-file-pdf-box</v-icon>
          </template>
        </v-list-item>
          <v-list-item href="https://mz-ei.gemeinde-entwickler.de/wp-content/uploads/Dokumente/Grosse-Lehrerkonferenz-durchfuehren.pdf" title="KALENDER IN DER CLOUD">
          <template #prepend>
            <v-icon>mdi-file-pdf-box</v-icon>
          </template>
        </v-list-item>

        </v-container>
        <v-card-actions>
          <v-btn
              href="https://cloud.mz-ei.de/index.php/login"
          >Zur Cloud</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card id="fast" min-height="550px"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5">
            Fast Viewer
          </v-card-title>

          <v-card-subtitle>Fernwartungstool für Systembetreuer <br/> des Landkreises Eichstätt.</v-card-subtitle>


        </div>

        <v-avatar
            class="ma-3"
            size="125"
            rounded="0"
        >
          <v-img :src="require('@/assets/fastviewer-Logo.webp')"></v-img>
        </v-avatar>



      </div>
      <v-container>
        <v-divider/>

      </v-container>
      <v-card-actions>

      </v-card-actions>
    </v-card>

    </v-col>
    <v-col>
      <v-card id="eye"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">
              Eye on IT
            </v-card-title>

            <v-card-subtitle>DIE IT-GERÄTEVERWALTUNG DES  <br/> LANDRATSAMTES EICHSTÄTT</v-card-subtitle>


          </div>

          <v-avatar
              class="ma-3"
              size="125"
              rounded="0"
          >
            <v-img class="rounded-circle" :src="require('@/assets/eye-on-it-logo.png')"></v-img>
          </v-avatar>



        </div>
        <v-card-text>
          <v-divider/>
          <div class="py-5">
          Für Tablets, Laptops, PCs und alle IT Geräte
          Einstellung der Software
          Problembehebung mit Tiket System
          </div>
        </v-card-text>
        <v-card-actions>
        <v-btn href="https://eyeonit.mz-ei.de/auth/login?returnUrl=%2Fcare%2Fdashboard">Login</v-btn>
        </v-card-actions>
      </v-card>

    </v-col>
  </v-row>
</v-container>
  </div>
</template>

<script>
import {downloadUsingAnchorElement} from "@/services/file.service";
import CallToAction from "@/views/CallToAction";

export default {
  name: "OnlineDiensteView",
  components: {CallToAction},
  methods:{
    download(file){
      downloadUsingAnchorElement(file)
    }
  },
  watch:{
    $route(){
      if(document.getElementById(this.$route.hash.replace('#',''))) document.getElementById(this.$route.hash.replace('#','')).scrollIntoView({ block: "center" });
    }
  },
  created() {
    if(this.section){
      console.log(this.section)
      const element = document.getElementById(this.section);
      element.scrollIntoView();
    }
  },
  props:{
    section:String
  }
}
</script>

<style scoped>
.slider-parent{
  width:200%;
  height:200%;
  transition: transform 2s ease-in-out;
  background-color: #F8F8F8F8;
  border-radius: 100%;
  position: absolute;
  top:0;
  left:50%;
  transform: translateY(-85%) translateX(-50%);
  border:20px solid #F8F8F8F8;
  #-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  #box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);


}

.text-hover-grow{
  background-color: white; border-radius: 7px;
  width:90%;
  height:50px;
}
.text-hover-grow{
  transition: all 0.5s ease-in-out;
}
.text-hover-grow-parent:hover .text-hover-grow{
  width:100%;
  height:100%;
}
.bg-s1{
  background-size: contain;
  background-repeat: no-repeat;
  background-position-y: center;
  background-image: url('~@/assets/nextcloud-logo.jpg');
}
.bg-s2{
  background-size: contain;
  background-image: url('~@/assets/drucker2.jpg');
}
.bg-s3{
  background-size: contain;
  background-repeat: no-repeat;
  background-position-y: center;
  background-image: url('~@/assets/fastviewer-Logo.webp');
}
.bg-s4{
  background-size: contain;
  background-color: lightgrey;
  background-image: url('~@/assets/eye-on-it-logo.png');
}
</style>