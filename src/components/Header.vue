<template>
  <v-app-bar style="font-size:0.7rem; " :color="headerColor" elevation="0" class="px-15 app-bar-hover" app>
      <v-spacer/>
    <v-btn :class="{'selected':filter==null}" size="small" @click="$router.push('/')" text class="text-capitalize">Neue Objekte</v-btn>

    <MenuDropdown  :menu-id="'home'" title="Medienverleih" href="/" :items="medienverleihItems"/>
    <v-btn :class="{'selected':filter==='services'}" size="small" @click="$router.push('/services')" text class="text-capitalize">Services</v-btn>

   <!-- <MenuDropdown menu-id="services" link title="Service" href="/services" :items="serviceItems"/>-->
    <v-btn :class="{'selected':filter==='termine'}" size="small" @click="$router.push('/termine')" text class="text-capitalize">Termine</v-btn>
    <v-btn :class="{'selected':filter==='rechtliches'}" size="small" @click="$router.push('/rechtliches')" text class="text-capitalize">Rechtliches</v-btn>
    <v-btn :class="{'selected':filter==='informationen'}" size="small" @click="$router.push('/informationen')" text class="text-capitalize">Informationen</v-btn>
    <!--<MenuDropdown menu-id="online_dienste" link title="Online Dienste" href="/online_dienste" :items="onlineDiensteItems"/>-->
    <v-btn :class="{'selected':filter==='online_dienste'}" size="small" @click="$router.push('/online_dienste')" text class="text-capitalize">Online Dienste</v-btn>

    <v-btn :class="{'selected':filter==='bilder'}" size="small" text class="text-capitalize" @click="$router.push('/bilder')">Bilder/ Fotos</v-btn>
    <v-btn size="small" text class="text-capitalize" @click="toggleDatenschutz">Datenschutz</v-btn>
    <v-btn size="small" text class="text-capitalize" @click="toggleImpressum">Impressum</v-btn>

  </v-app-bar>
</template>

<script>
import MenuDropdown from "@/components/MenuDropdown";
import {useAppStore} from "@/stores/app.module";
export default {
  name: "HeaderComponent",
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