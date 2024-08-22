<template>
  <v-app-bar style="font-size:0.7rem; " :color="headerColor" elevation="0" class="px-15 app-bar-hover" app>
      <v-spacer/>
    <v-btn :class="{'selected':filter==null}" size="small" @click="$router.push('/')" text class="text-capitalize">Updated</v-btn>
    <v-btn :class="{'selected':filter==='termine'}" size="small" @click="$router.push('/k/termine')" text class="text-capitalize">News</v-btn>
    <v-btn :class="{'selected':filter==='filme'}" size="small" @click="$router.push('/k/filme')" text class="text-capitalize">Filme</v-btn>


    <MenuDropdown  :menu-id="'robotics'" title="Robotics" href="/k/robotics" :items="roboticsItems"/>
    <MenuDropdown  :menu-id="'audio'" title="Audio/ Video" href="/k/audio" :items="audioVideoItems"/>
    <MenuDropdown  :menu-id="'objekte3d'" title="3D Geräte" href="/k/objekte3d" :items="ThreedItems"/>
    <v-btn :class="{'selected':filter=='sonstiges'}" size="small" @click="$router.push('/k/sonstiges')" text class="text-capitalize">sonst. geräte</v-btn>

    <v-btn :class="{'selected':filter==='online_dienste'}" size="small" @click="$router.push('/k/online_dienste')" text class="text-capitalize">Service</v-btn>
    <v-btn size="small" text class="text-capitalize" @click="toggleDatenschutz">Datenschutz</v-btn>
    <v-btn size="small" text class="text-capitalize" @click="toggleImpressum">Impressum</v-btn>

  </v-app-bar>
</template>

<script>
import MenuDropdown from "@/components/MenuDropdown";
import {useAppStore} from "@/stores/app.module";
export default {
  name: "HeaderNew",
  components: {MenuDropdown},
  setup(){
    const appStore = useAppStore();
    return{appStore}
  },
methods:{
  toggleDatenschutz(){
    this.appStore.toggleDatenschutz();
  },toggleImpressum(){
    this.appStore.toggleImpressum();
  }
},
  computed:{
    headerColor(){
      if(this.color){
        return this.color;
      }else if(this.orange) return '#ff9800';
      else return 'white';
    },
    filter(){
      return this.appStore.filter;
    }
  },
  created(){

      /**window.addEventListener('keydown', (e) => {
        if (e.key == 'o') {
          this.color=null;
          this.orange = !this.orange;
        }
      });window.addEventListener('keydown', (e) => {
        if (e.key == 'p') {
          if(this.colorIndex>=this.colors.length+1) this.colorIndex=0;
          this.color= this.colors[this.colorIndex];
          this.colorIndex++;
        }
      });
*/
  },
  data(){
    return{
      color:null,
      colors:[
        'red',
        'pink',
          'purple',
          'indigo',
          'deep-purple',
          'blue',
          'light-blue',
          'cyan',
          'teal',
          'green',
          'light-green',
          'lime',
          'yellow',
          'amber',
          'orange',
          'deep-orange',
          'brown',
          'blue-grey',
          'grey',
          'black'
      ],
      colorIndex:0,
      orange:true,
      roboticsItems:[
        {
          title:"Klassen 1-3",
          link: "k/robotics/q/class1To3"
        },
        {
          title:"Klassen 2-6",
          link: "k/robotics/q/class2To6"
        },
        {
          title:"Klassen 5 -",
          link: "k/robotics/q/class5-"
        },
      ],audioVideoItems:[
        {
          title:"Lautsprecher",
          link: "k/audio/q/lautsprecher"
        },{
          title:"Beamer",
          link: "k/audio/q/beamer"
        },{
          title:"Fototechnik",
          link: "k/audio/q/fototechnik"
        },{
          title:"Videokameras",
          link: "k/audio/q/videokameras"
        },{
          title:"Spezialgeräte",
          link: "k/audio/q/spezialgeräte"
        },
      ],
      ThreedItems:[
        {
          title:"3D Drucker",
          link: "k/objekte3d/q/3ddrucker"
        },
        {
          title:"VR Brillen",
          link: "k/objekte3d/q/vrbrillen"
        },
        {
          title:"Beamer",
          link: "k/objekte3d/q/beamer"
        },
      ],
      onlineDiensteItems:[
        {
          title:"Devicemanagement",
          link:"/online-dienste#devicemanagement"
        },
        {
          title:"Next Cloud",
          link:"/objekt/1018"
        },
        {
          title:"Fast Viewer",
          link:"/objekt/1011"
        },
      ],
      medienverleihItems:[
        {
          title:"DVD Lehrfilme",
          link:"dvd_lehrfilme"
        },
        {
          title:"Foto/ Video",
          link:"foto_video"
        },
        {
          title:"Erste Hilfe",
          link:"erste_hilfe"
        },
        {
          title:"Audio",
          link:"audio"
        },
        {
          title:"Gestalten / Entwerfen",
          link:"3d_drucker"
        },
        {
          title:"Navigation",
          link:"navigation"
        },
        {
          title:"Robotics",
          link:"robotics"
        },
        {
          title:"Funkübertragung",
          link:"funk_uebertragung"
        },
      ],
      serviceItems:[
        {
          title:"Großformatdruck",
          link:"/services#plakatdruck"
        },
        {
          title:"3D Druck",
          link:"/3d_drucker"
        },
        {
          title:"Dia Scan",
          link:"/services#diascan"
        },
        {
          title:"Drohnenflug",
          link:"/services#drohnenflug"
        },
      ]
    }
  }
}
</script>

<style scoped>
.selected{
  background-color: rgba(44, 66, 116, 1);
  color:white!important;
}
.app-bar-hover button:hover{
  background-color: rgba(44, 66, 116, 1);
  color:white!important;
}
</style>