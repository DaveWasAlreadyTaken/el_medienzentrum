<template>
  <div class="hero"></div>
  <div class="bg-background">
  <v-container>
    <h1 style="transform: translateY(-50%)" class="rounded text-center bg-white px-15 py-10 medienzentrum-text">Der besondere Service des Medienzentrums</h1>
    <v-row class="py-15">
      <v-col cols="6">
      <h2 class="medienzentrum-text font-weight-black">Einleitungstext <br/>Lorem Ipsum</h2>
      </v-col>

      <v-col cols="6" class="text-poppins">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </v-col>

    </v-row>
    <v-row >
      <v-col cols="3">
        <a class="text-decoration-none" href="#3ddruck">
        <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s2 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
          <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">3D Druck</strong>
        </v-sheet>
        </a>
      </v-col>
      <v-col cols="3">
        <a class="text-decoration-none" href="#plakatdruck">
        <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s4 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
          <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Großformatdruck</strong>
        </v-sheet>
        </a>
      </v-col>
      <v-col cols="3">
        <a class="text-decoration-none" href="#diascan">
        <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s1 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
          <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Diascan</strong>
        </v-sheet>
        </a>
      </v-col>
      <v-col cols="3">
        <a href="#drohnenflug" class="text-decoration-none">
        <v-sheet rounded style="width:100%;height:300px;position: relative; cursor: pointer" elevation="1"  class="bg-s3 text-hover-grow-parent d-flex align-center justify-center flex-wrap">
          <strong class="d-flex justify-center align-center text-hover-grow px-2 py-1">Drohnenflug</strong>
        </v-sheet>
        </a>
      </v-col>


    </v-row>
    <CallToAction/>
  </v-container>
    <div class="bg-white">
      <v-container>
        <h2 class="mt-15 mb-10">Services</h2>
        <div id="3ddruck" style="height:200px" class="d-flex bg-background mb-10">
          <div style="height:100%;">
            <v-img cover height="100%" width="300px" :src="require('@/assets/drucker2.jpg')"></v-img>
          </div>
          <div  class="pa-10 d-flex justify-left align-content-center flex-wrap" style="height:100%">
            <h3 style="width:100%" class="medienzentrum-text">3D Druck</h3>
            <p style="width:100%;">Wir drucken für Sie 3D Objekte in einer maximalen Größe von ca. 210 x 190 x 300 mm mit einem Filament aus PLA.</p>

            <p style="width:100%">Benötgt werden 3D Formate wie STL, OBJ, DAE und AMF.</p>

            <v-btn class="mt-5">Jetzt ausleihen</v-btn><v-btn class="mt-5" variant="text">Datenblatt</v-btn>
          </div>
        </div>
        <div id="diascan" style="height:200px" class="d-flex bg-background mb-10">
          <div style="height:100%;">
            <v-img cover height="100%" width="300px" :src="require('@/assets/dia.jpg')"></v-img>
          </div>
          <div  class="pa-10 d-flex justify-left align-content-center flex-wrap" style="height:100%">
            <h3 style="width:100%" class="medienzentrum-text">Digitalisierung von Dias</h3>
            <p>Sie wollen einen Digitalscan Ihres Dias ?   Wir erledigen das für Sie. Professionell in höchster Qualität bis 10.000 dpi. </p>


            <v-btn class="mt-5">Jetzt kontaktieren</v-btn>
          </div>
        </div>
        <div id="plakatdruck" style="height:200px" class="d-flex bg-background mb-10">
          <div style="height:100%;">
            <v-img cover height="100%" width="300px" :src="require('@/assets/großformatdruck.jpg')"></v-img>
          </div>
          <div  class="pa-10 d-flex justify-left align-content-center flex-wrap" style="height:100%">
            <h3 style="width:100%" class="medienzentrum-text">Plakatdruck</h3>
            <small style="width:100%">auch als Fotodruck für DIN A3, A2, A1, A0</small>
            <p style="width:100%">Wir benötigen nur eine PDF-Datei per Mail oder Stick. Sie bekommen das gewünschte Format als Fotodruck oder auf Plakatpapier.</p>


            <v-btn class="mt-5">Jetzt kontaktieren</v-btn>
          </div>
        </div>
        <div id="drohnenflug" style="height:200px" class="d-flex bg-background mb-10">
          <div style="width:400px;">
            <v-carousel height="100%" style="width:300px" hide-delimiters>
              <v-carousel-item
                  :src="require('@/assets/drohne1.jpg')"
                  cover
              ></v-carousel-item>

              <v-carousel-item
                  :src="require('@/assets/drohne2.jpg')"
                  cover
              ></v-carousel-item>

              <v-carousel-item
                  :src="require('@/assets/drohne3.jpg')"
                  cover
              ></v-carousel-item>
              <v-carousel-item
                  :src="require('@/assets/drohne4.jpg')"
                  cover
              ></v-carousel-item>
            </v-carousel>
          </div>
          <div  class="pa-10 d-flex justify-left align-content-center flex-wrap" style="height:100%">
            <h3 style="width:100%" class="medienzentrum-text">Drohnenflug</h3>
            <p style="width:100%">Drohne: <strong>Typhoon H Plus</strong><small> mit fest angebauter UHD Kamera</small></p>
            <p style="width:100%" class="text-red">Voraussetzug ist ein Nachweis über Umgang einer Drohne und Kenntnisse über die Rechtslage !</p>
            <v-list-item class="mt-5" width="300px" href="https://mz-ei.gemeinde-entwickler.de/wp-content/uploads/Dokumente/Datenblatt-Drohne.pdf" title="Datenblatt Drohne" prepend-icon="mdi-file-pdf-box"

            ></v-list-item>

            <v-btn class="mt-5">Jetzt anfordern</v-btn>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import CallToAction from "@/views/CallToAction";

export default {
  name: "ServiceView",
  components: {CallToAction},
  created() {
    console.log("Hash",this.$route.hash);
  },
  watch:{
    $route(){
      if(document.getElementById(this.$route.hash.replace('#',''))) document.getElementById(this.$route.hash.replace('#','')).scrollIntoView({ block: "center" });
    }
  }
}
</script>

<style scoped>
.bg-s1{
  background-size: cover;
  background-image: url('~@/assets/dia.jpg');
}
.bg-s2{
  background-size: cover;
  background-image: url('~@/assets/drucker2.jpg');
}
.bg-s3{
  background-size: cover;
  background-image: url('~@/assets/drohne1.jpg');
}
.bg-s4{
  background-size: cover;
  background-image: url('~@/assets/großformatdruck2.jpg');
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
</style>