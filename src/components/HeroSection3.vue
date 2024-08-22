<template>
  <div>
    <v-container class="hidden-md-and-up">
      <h1 class="text-poppins pt-5">Medienverleih.</h1>
      <div class="mb-5 mt-0">Entdecke unsere Objekte:</div>
      <v-text-field v-model="filterMobile.search" placeholder="Suche..."></v-text-field>
      <v-select  v-model="filterMobileKategorie" :items="[{label:'Audio/ Video',value:'audio'},{label:'Robotics',value:'robotics'},{label:'Service',value:'service'},{label:'Spstige Geräte',value:'sonstiges'},{label:'3D Objekte',value:'objekte3d'},{label:'Filme',value:'filme'}]" item-value="value" item-title="label" placeholder="Kategorie"></v-select>
      <!--<v-select @change="refreshFilter" clearable  v-model="filterMobileSubKategorie" :items="subkategorieItems" item-value="value" item-title="label" placeholder="Unterkategorie"></v-select>
      -->
      <v-sheet height="300px" class="d-flex justify-center align-center" v-if="loadingObjects">
        <v-progress-circular size="large" indeterminate></v-progress-circular>
      </v-sheet>
      <div v-else-if="filteredMobile.length<=0">
        <v-sheet height="300px" class="d-flex justify-center align-center">
          <span>Keine Objekte gefunden :(</span>
        </v-sheet>
      </div>
      <MobileObject v-for="object of filteredMobile" :key="object.id" :object="object"/>
</v-container>
    <div style="width:100%;background: linear-gradient(180deg, rgba(44,66,116,0.4) 0%, rgba(255,255,255,1) 100%);
    z-index: 999;
    position: relative;" class=" d-flex justify-end px-15 pt-5">
      <div style="position:relative;cursor:pointer;z-index:1;max-width: 60vw; align-self: end" class="d-flex justify-end">
        <div style="width:60vw" v-if="loadingObjects"> <v-progress-linear style="width: 100%" indeterminate></v-progress-linear></div>
        <div style="width:60vw" v-else-if="filteredObjects.length<=0">
          <v-sheet color="transparent" height="50px" class="d-flex justify-center align-center">
            <span>Keine Objekte gefunden :(</span>
          </v-sheet>
        </div>
        <div v-else class="d-flex align-center" style="width:100%">
          <span v-if="!filter" style="font-size:0.8rem; font-weight: bold; width:150px">Neueste Objekte</span>
        <v-slide-group class="hidden-sm-and-down" style="width:100%" v-model="selectedObject"  center-active show-arrows>
          <v-slide-group-item v-slot="{ isSelected}"   v-for="object of filteredObjects" :value="object.id" :key="object.id"  >
            <div style="font-size:12px" :class="{'active': isSelected}" @click="selectObject(object.id)" class="ml-4 custom-tab align-center" v-text="object.meta.name"></div>
          </v-slide-group-item>
        </v-slide-group>
        </div>
      </div>
    </div>
<v-container class="px-0 pr-1 hidden-sm-and-down" style="">

  <v-row style="min-height: 45vh;margin-top:3em;margin-bottom: 4em;">
    <v-col class="d-flex align-center justify-end" cols="3">
      <v-btn :disabled="moving" @click="moveLeft" size="large" variant="flat" class="rounded mb-4" style="background-color: rgba(44, 66, 116, 0.1);z-index:3;margin-right:6em;" icon="mdi-chevron-left">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2c4274" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>

        </svg>
      </v-btn>
    </v-col>
    <v-col class="d-flex align-center"  cols="6">
      <!--<v-img width="250px" style="position:absolute;  z-index:3;left:50%;top:45%;transform:translate(-50%,-50%)" :src="require('@/assets/plate.png')"></v-img>
-->
      <div ref="currentParentPos" style="position:relative;width:100%;height:100%">
      <div ref="sliderParent" class="slider-parent">

        <div ref="middle" @click="showFromOutside=!showFromOutside" style="position: absolute;z-index:1; bottom:-30px; left:50.05%;transform:translateX(-50%) translateY(-10%)">

          <SliderItem :new-object="!filter" current v-if="currentObject" :object="currentObject"/>
          <ItemShadow/>
        </div>
        <div ref="left" style="position: absolute;z-index:1; bottom:50.4%; left:0.1%;transform:translateX(-50%)">
          <ItemShadow/>
        <SliderItem :new-object="!filter" :object="leftObject"/>

        </div>
        <div ref="right" style="position: absolute; z-index:1; bottom:50.4%; right:0.1%;transform:translateX(50%)">
          <ItemShadow/>
        <SliderItem :new-object="!filter" style="" :object="rightObject"/>
        </div>
      </div>
      </div>

    </v-col>
    <v-col class="d-flex align-center" cols="3">
      <v-btn :disabled="moving" class="rounded mb-4" @click="move" style="background-color: rgba(44, 66, 116, 0.1);z-index:3;margin-left:6em;" icon variant="text" size="large">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2c4274" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </v-btn>
    </v-col>
  </v-row>

</v-container>
    <v-container style="position:relative;z-index:9999;" ref="container" class="hidden-sm-and-down animate__animated">
      <v-row class="ml-0 ml-md-10 ml-lg-0">
        <v-col style="position:relative; transform: translateY(-25%)" v-if="currentObject" class="" cols="5">
          <div style="width:100%;z-index:1;font-weight: bolder;font-size: 1rem; color:white; -webkit-text-stroke: 0.8px #2c4274;" class=" text-left animate__animated text-poppins" >
            <span v-for="kat of currentObject.meta.kategorie" class="text-uppercase" :key="kat">{{kat.replace("_"," ")}}</span>
          </div>
          <div v-if="isTermin" style="z-index:1;font-size: 3rem;margin-top: 0px;letter-spacing: 2px ; color:black;font-weight: bolder" ref="name" class="text-left animate__animated  text-poppins">
            <span class="hidden-md-and-down" style="font-size: 3rem;">{{removeTags(currentObject.title.rendered)}}</span>
            <span class="hidden-lg-and-up" style="font-size: 1rem;">{{removeTags(currentObject.title.rendered)}}</span>


          </div>
          <div v-else :class="{'smaller-text':currentObject.meta.name.length>20}" style="z-index:1;margin-top: 0px;letter-spacing: 2px ; color:black;font-weight: bolder" ref="name" class=" text-left animate__animated text-poppins " >
            <span class="hidden-md-and-down" style="font-size: 2rem;">{{removeTags(currentObject.meta.name)}}</span>
            <span class="hidden-lg-and-up" style="font-size: 1rem;">{{removeTags(currentObject.meta.name)}}</span>
          </div>

        </v-col>
        <v-col v-if="!isTermin" class="d-flex flex-wrap align-center" cols="7">

            <div class="hidden-md-and-down" style="width: 100%" v-if="currentObject"><span v-html="beschreibungOhneTags.substr(0,150)"></span><span v-if="beschreibungOhneTags.length>150">...</span></div>
            <div class="hidden-lg-and-up" style="width: 100%;font-size:0.8rem;" v-if="currentObject" ><span v-html="beschreibungOhneTags.substr(0,150)"></span><span v-if="beschreibungOhneTags.length>150">...</span></div>

            <div>
              <DetailsPopup :beschreibung="currentObject.meta.beschreibung" :wobble="wobbleDetails" @toggleDialog="toggleDetailsPopup" :show-from-outside="showFromOutside" v-if="currentObject && hasDataforPopup" :object="currentObject"/>
              <!--<div class="px-2" v-if="customLinks">
              <v-btn target="_blank" v-for="(link,$index) of customLinks" :key="$index" class="mx-2 my-2" :href="link.link">{{link.label}}</v-btn>
              </div>-->
            </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer color="transparent" class="pa-md-0 pa-0 pt-2 d-flex justify-space-between" app>

    <v-btn flat class="pa-md-5 pb-md-5 pa-2 animate__animated animate__delay-1s animate__bounce standort-btn" style="border-radius: 0 20px 0 0;height:auto" color="accent" size="large" @click="drawer=!drawer"><span class="hidden-sm-and-down">Standort <br/></span> Eichstätt</v-btn>
    <v-btn flat size="large" class="pa-md-5 pb-md-10 animate__delay-3s pa-2 hidden-md-and-up standort-btn animate__animated animate__bounce" style="border-radius: 20px 20px 0 0;height:auto;color:white;" color="#8dc874" href="https://www.bildungsmedien-online.de/M4Merkur/b11/prog/wm.aspx" target="_blank">Web Merkur</v-btn>
      <v-btn flat class="pa-md-5 pb-md-5 pa-2 animate__animated animate__delay-2s animate__bounce standort-btn" style="border-radius: 20px 0 0 0;height:auto" color="accent" size="large" @click="drawerKo=!drawerKo"><span class="hidden-sm-and-down">Standort <br/></span> Kösching</v-btn>

    </v-footer>
    <v-navigation-drawer
        app
        style="z-index:9999999999"
        width="500px"
        v-model="drawer"
        temporary
    >
      <NebenstellenInformationMobile/>
    </v-navigation-drawer>
    <v-navigation-drawer
        style="z-index:9999999999"
        temporary
        app
        width="500px"
        v-model="drawerKo"
        location="right"
    >
      <NebenstellenInformationMobileKo/>
    </v-navigation-drawer>
    <div class="hidden-sm-and-down" style="position: absolute;right:0;top:50%;transform: rotateZ(90deg) translateX(-50%) translateY(-60%);">
    <v-btn target="_blank" class="py-8 px-4 align-center animate__animated animate__delay-3s animate__wobble d-flex align-center" href="https://www.bildungsmedien-online.de/M4Merkur/b11/prog/wm.aspx" style="background-color:#8dc874;color:white;">Web Merkur</v-btn>
    </div>

      <WebMerkur :show="showWebMerkur" @toggle="toggleWebMerkur"/>
    <div class="hidden-sm-and-down" style="position: absolute;left:0;top:50%;transform: rotateZ(270deg) translateX(50%) translateY(-40%);">
      <v-btn class=" py-8 px-4 align-center animate__animated animate__delay-6s animate__wobble d-flex align-center" href="https://medienzentrum-eichstaett.apptivate.it/" target="_blank" style="background-color:#8dc874;color:white;">Zur App</v-btn>

    </div>
  </div>

</template>

<script>
import SliderItem from "@/components/SliderItem";
import {useAppStore} from "@/stores/app.module";
import DetailsPopup from "@/components/DetailsPopup";
import MobileObject from "@/components/MobileObject";
import NebenstellenInformationMobile from "@/components/NebenstellenInformationMobile";
import ItemShadow from "@/components/ItemShadow";
import NebenstellenInformationMobileKo from "@/components/NebenstellenInformationMobileKo";
import WebMerkur from "@/components/WebMerkur";
export default {
  name: "HeroSection",
  setup(){
    const appStore = useAppStore();

    return {
      appStore
    }
  },
  props:{
    filter:{
      default:null,
      type:String
    },
    subfilter:{
      default:null,
      type:String
    },
    object:{
      default:null,
      type:String
    }
  },
  watch:{
    filterMobileKategorie(){
      switch(this.filterMobileKategorie){
        case 'robotics':
          this.subkategorieItems= [{label:'Klassen 1-3',value:'class1To3'},{label:'Klassen 2-6',value:'class2To6'},{label:'Klassen 5-',value:'class5'}]
          break;
        case 'audio':
          this.subkategorieItems=  [{label:'Lautsprecher',value:'lautsprecher'},{label:'Beamer',value:'beamer'},{label:'Fototechnik',value:'fototechnik'},{label:'Videokameras',value:'videokameras'},{label:'Spezialgeräte',value:'spezialgeräte'}]
          break;
        case 'objekte3d':
          this.subkategorieItems=  [{label:'3D Drucker',value:'3ddrucker'},{label:'VR Brillen',value:'vrbrillen'},{label:'360 Grad Kameras',value:'camera360'}]
          break;
      }
    },
    filter(){
      this.filterMobileKategorie=this.filter;
      this.initializeSlider();
      this.appStore.setFilter(this.filter,this.subfilter);
      if(this.appStore.currentObject) this.selectObject(this.appStore.currentObject.id);
      else this.selectObject(null);
    },
    subfilter(){
      this.filterMobileKategorie=this.filter;
      this.initializeSlider();
      this.appStore.setFilter(this.filter,this.subfilter);
      if(this.appStore.currentObject) this.selectObject(this.appStore.currentObject.id);
      else this.selectObject(null);
    },
    object(){

      if(this.object) {
        this.initializeSlider();
        this.selectObject(this.object);

      }
      }
  },
  components: {
    WebMerkur,
    NebenstellenInformationMobileKo,
    ItemShadow,
    NebenstellenInformationMobile, MobileObject, DetailsPopup, SliderItem},
  data(){
    return{
      mobileFilterRefresh:0,
      filteredObjectsMobile:[],
      subkategorieItems:[],
      wobbleDetails:true,
      showFromOutside:false,
      selectedObject:null,
      drawer:false,
      drawerKo:false,
      rotation:0,
      moving:false,
      showWebMerkur:false,
      filterMobile:{
        search:"",
        kategorie:null
      }
    }
  },
  mounted() {
    this.initializeSlider();
    //console.log(this.currentObject?.meta.benutzerdefiniertelinks.length);
    this.filterMobileKategorie=this.filter;
    this.filterObjectsMobile();
    this.appStore.setFilter(this.filter,this.subfilter);
  },
  computed:{
    filterMobileKategorie:{
      get(){
        return this.appStore.filterMobile.kategorie;
      },set(value){
        this.appStore.setFilterMobile(value);
      }
    },
    filterMobileSubKategorie:{
      get(){
        return this.appStore.filterMobile.subkategorie;
      },set(value){
        this.appStore.setSubFilterMobile(value);
      }
    },
    beschreibungOhneTags(){
      if(!this.currentObject || !this.currentObject.meta || !this.currentObject.meta.beschreibung) return '';
      else return this.removeTags(this.currentObject.meta.beschreibung)
    },
    loadingObjects(){
      return this.appStore.loading;
    },
    hasDataforPopup(){
      if(!this.currentObject) return false;
      else if((this.currentObject.meta.bilder && this.currentObject.meta.bilder.length>0) || (this.currentObject.meta.dateien && this.currentObject.meta.dateien.length>0) || (this.currentObject.meta.benutzerdefiniertelinks && this.currentObject.meta.benutzerdefiniertelinks.length>0 || this.currentObject?.meta?.benutzerdefiniertelinks!=null) ) return true;
      else return false;
    },
    isTermin(){
      if(!this.currentObject) return false;
      else if(this.currentObject.meta.kategorie.includes('termine')) return true;
      else return false;
    },
    customLinks(){
      if(this.currentObject){
        let empty= this.currentObject.meta.benutzerdefiniertelinks.length===0
        console.log(empty);
        if(empty) return null;
        else return Object.values(this.currentObject.meta.benutzerdefiniertelinks);
      }

      return null;

    },
    filteredMobile(){
      this.mobileFilterRefresh;
      let result= this.appStore.objects;
      result= result.filter(x=> x.title.rendered.includes(this.filterMobile.search));
      if(this.filterMobileKategorie!=null){
        if(this.filterMobileKategorie==='service'){
          result =result.filter(x=>x.meta.kategorie.includes(this.filterMobileKategorie) || x.meta.kategorie.includes('bilder') || x.meta.kategorie.includes('online_dienste') )
        }else result =result.filter(x=>x.meta.kategorie.includes(this.filterMobileKategorie))
        if(this.filterMobileSubKategorie!=null){
          switch(this.filter){
            case 'robotics':
              result= result.filter(x=>x.meta.subcatrobotics === this.filterMobileSubKategorie);
              break;
            case 'audio':
              result= result.filter(x=>x.meta.subcataudiovideo === this.filterMobileSubKategorie);
              break;
            case 'objekte3d':
              result= result.filter(x=>x.meta.subcat3d === this.filterMobileSubKategorie);
              break;
          }
          return result;
        }

      }
      return result;
    },
    filteredObjects(){
      return this.appStore.filteredObjects;
    },
    selectedIndex(){
      return this.appStore.selectedIndex;
    },
    objects(){
      return this.appStore.objects;
    },
    leftObject(){
      return this.appStore.leftObject;
    },
    rightObject(){
      return this.appStore.rightObject;
    },
    currentObject(){
      return this.appStore.currentObject;
    }
  },
  methods: {
    refreshFilter(){
      this.mobileFilterRefresh++;
    },
    filterObjectsMobile(){
      let result= this.appStore.objects;
      result= result.filter(x=> x.title.rendered.includes(this.filterMobile.search));
      console.log("Filter",result);
      if(this.filterMobileKategorie!=null){
        result =result.filter(x=>x.meta.kategorie.includes(this.filterMobileKategorie))
        if(this.filterMobileSubKategorie!=null){
          switch(this.filter){
            case 'robotics':
              result= result.filter(x=>x.meta.subcatrobotics === this.filterMobileSubKategorie);
              break;
            case 'audio':
              result= result.filter(x=>x.meta.subcataudiovideo === this.filterMobileSubKategorie);
              break;
            case 'objekte3d':
              result= result.filter(x=>x.meta.subcat3d === this.filterMobileSubKategorie);
              break;
          }
        }

      }
      this.filteredObjectsMobile=result;
    },

    toggleWebMerkur(value){
      this.showWebMerkur=value;
    },
    open(link){
      window.open(link,"_blank");
    },
    toggleDetailsPopup(value){
      this.showFromOutside=value;
    },
    removeTags(str) {
      if ((str===null) || (str===''))
        return false;
      else
        str = str.toString();

      // Regular expression to identify HTML tags in
      // the input string. Replacing the identified
      // HTML tag with a null string.
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    isActive(id){
      if(!this.currentObject) return false;

      return id===this.currentObject.id;
    },
    selectTest(){
      this.selectObject(169)
    },
    selectObject(objectId){
      this.selectedObject=objectId;
      //console.log(this.objects.findIndex(x=>x.id===objectId))
      //this.rightObject=this.objects[this.objects.findIndex(x=>x.id===objectId)];
      this.appStore.selectObject(objectId);
      this.move();
    },
    move(){
      this.moving=true;

      this.$refs.sliderParent.style.transition="transform 2s ease-in-out";
      this.$refs.right.style.transition="transform 2s ease-in-out";
      this.$refs.middle.style.transition="transform 2s ease-in-out";
      if(this.rotation===360) this.rotation=0;
      this.rotation+=90;
      this.$refs.right.style.transform="rotateZ(-90deg) translateX(-55%)";
      this.$refs.middle.style.transform="rotateZ(-90deg) translateX(-50%)";
      this.$refs.sliderParent.style.transform="rotateZ("+90+"deg)";
       setTimeout(()=>{
        //this.appStore.setSelectedObject(this.rightObject);
        this.appStore.setSelectedIndex(this.filteredObjects.findIndex(x=> x.id ===this.rightObject.id));
         this.selectedObject=this.filteredObjects.findIndex(x=> x.id ===this.rightObject.id)

         this.$refs.right.style.opacity='0';
         this.appStore.initObjects();

          this.$refs.sliderParent.style.transition="none";
          this.$refs.sliderParent.style.transform="rotateZ(0)";
        this.$refs.right.style.transition="none";
        this.$refs.right.style.transform="rotateZ(0)";
        this.$refs.middle.style.transition="none";
        this.$refs.middle.style.transform="rotateZ(0) translateX(-50%) translateY(-10%)";

          this.$refs.right.style.opacity='1';
          if(this.$refs.name) {
            this.wobbleDetails=false;
            this.$refs.container.$el.classList.add("animate__fadeIn");

            setTimeout(()=>{
              this.wobbleDetails=true;
            },1000);
            setTimeout(() => {
              this.$refs.container.$el.classList.remove("animate__fadeIn");

            }, 1000);
          }
          this.moving=false;
      },2000);
    },
    initializeSlider(){
      let currentParentPos = this.$refs.currentParentPos.getBoundingClientRect();
      let sliderParent=this.$refs.sliderParent;
      sliderParent.style.width=window.innerWidth*5+"px";
      sliderParent.style.height=window.innerWidth*5+"px";

      //sliderParent.style.top=(currentParentPos.bottom-sliderParent.clientHeight)+"px";
      sliderParent.style.top=(currentParentPos.bottom-130-sliderParent.clientHeight)+"px";
      //sliderParent.style.top=(currentParentPos.bottom-200-sliderParent.clientHeight)+"px";
      sliderParent.style.left=((this.$refs.currentParentPos.clientWidth/2)-sliderParent.clientWidth/2)+"px";
    },
    moveLeft(){
      this.moving=true;
      this.$refs.sliderParent.style.transition="transform 2s ease-in-out";
      this.$refs.left.style.transition="transform 2s ease-in-out";
      this.$refs.middle.style.transition="transform 2s ease-in-out";
      if(this.rotation===360) this.rotation=0;
      this.rotation+=90;
      this.$refs.left.style.transform="rotateZ(90deg) translateX(55%)";
      this.$refs.middle.style.transform="rotateZ(90deg) translateX(50%)";
      this.$refs.sliderParent.style.transform="rotateZ(-"+90+"deg)";
      setTimeout(()=>{
        //this.appStore.setSelectedObject(this.leftObject);
        this.appStore.setSelectedIndex(this.filteredObjects.findIndex(x=> x.id ===this.leftObject.id));
        this.selectedObject=this.filteredObjects.findIndex(x=> x.id ===this.leftObject.id)
        this.$refs.right.style.opacity='0';
        this.appStore.initObjects();

        this.$refs.sliderParent.style.transition="none";
        this.$refs.sliderParent.style.transform="rotateZ(0)";
        this.$refs.left.style.transition="none";
        this.$refs.left.style.transform="rotateZ(0)";
        this.$refs.middle.style.transition="none";
        this.$refs.middle.style.transform="rotateZ(0) translateX(-49%) translateY(-10%)";

        this.$refs.right.style.opacity='1';
        this.$refs.container.$el.classList.add("animate__fadeIn");
        this.wobbleDetails=false;
        setTimeout(() => {
          this.wobbleDetails=true;
        },1000);
        setTimeout(()=>{
          this.$refs.container.$el.classList.remove("animate__fadeIn");

        },1000);
        this.moving=false;

      },2000);
    },
  },

}
</script>

<style scoped>
.custom-tab{
  transition: border 0.1s ease-in-out;
}
.active{
  border-bottom: 2px solid rgba(44, 66, 116, 1);;
}
.slider-parent{
  transition: transform 2s ease-in-out;
  /**background-color: #F8F8F8F8;*/
  background: rgb(255,255,255);
  background: radial-gradient(circle, rgba(255,255,255,1) 70.3%, #ff9800 70.7%);
  border-radius: 100%;
  position: absolute;
  border:0px solid #2c4274;
  #-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  #box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

  
}
.title{
  font-size: 2rem;
}


@media only screen and (max-width: 900px){
  .title{
    font-size: 1rem!important;
  }
}
.smaller-text{
  font-size:2rem!important;
}
.text-poppins{
  font-family: Poppins, sans-serif;
}
</style>