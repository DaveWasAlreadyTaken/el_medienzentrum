<template>
  <div>
    <v-container class="hidden-md-and-up">
  <MobileObject v-for="object of filteredObjects" :key="object.id" :object="object"/>
</v-container>
<v-container class="hidden-sm-and-down" style="min-height: 80vh">
  <div style="position:relative;cursor:pointer;z-index:1" class="d-flex justify-end">
    <div class="mx-2 custom-tab" v-for="object of filteredObjects" :key="object.id" @click="selectObject(object.id)" :class="{'active': isActive(object.id)}"  v-html="object.title.rendered">

    </div>
  </div>
  <v-row style="min-height: 50vh">
    <v-col class="d-flex align-center justify-center" cols="4">
      <div style="z-index:1;font-size: 3rem; color:white; -webkit-text-stroke: 1px black;" ref="name" class="px-2 text-center py-1 animate__animated" v-if="currentObject">
        {{currentObject.meta.name}}
      </div>
    </v-col>
    <v-col class="d-flex align-center"  cols="4">
      <div ref="currentParentPos" style="position:relative;width:100%;height:100%">
      <div ref="sliderParent" class="slider-parent">
        <div ref="middle" style="position: absolute;z-index:1; bottom:0; left:50%;transform:translateX(-50%)">
        <SliderItem :object="currentObject"/>
        </div>
        <div ref="left" style="position: absolute;z-index:1; bottom:50%; left:0;transform:translateX(-50%)">
        <SliderItem  :object="leftObject"/>
        </div>
        <div ref="right" style="position: absolute; z-index:1; bottom:50%; right:0;transform:translateX(50%)">
        <SliderItem  style="" :object="rightObject"/>
        </div>
      </div>
      </div>

    </v-col>
    <v-col class="d-flex align-center" cols="4">
      <v-sheet class="py-4 px-8 rounded d-flex flex-wrap align-center" style="z-index:0"  min-height="300px" color="transparent">
        <p v-if="currentObject" v-html="currentObject.meta.beschreibung"></p>
        <p>
          <DetailsPopup :object="currentObject"/>
        </p>
      </v-sheet>
    </v-col>
  </v-row>

</v-container>
    <v-footer class="d-flex justify-space-between" app>
      <div style="width:100%" class="d-flex justify-space-between hidden-sm-and-down">
        <NebenstellenInformation/>
      <div>
        <v-btn :disabled="moving" class="mx-2" @click="moveLeft" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-btn :disabled="moving" class="mx-2" @click="move" icon><v-icon>mdi-arrow-right</v-icon></v-btn>

      </div><div>KÖ</div>
      </div>
      <div class="hidden-md-and-up">

        <v-btn @click="drawer=!drawer">Eichstätt</v-btn>
      </div>
    </v-footer>
    <v-navigation-drawer
        app
        width="500px"
        v-model="drawer"
    >
      <NebenstellenInformationMobile/>
    </v-navigation-drawer>
  </div>

</template>

<script>
import SliderItem from "@/components/SliderItem";
import {useAppStore} from "@/stores/app.module";
import DetailsPopup from "@/components/DetailsPopup";
import NebenstellenInformation from "@/components/NebenstellenInformation";
import MobileObject from "@/components/MobileObject";
import NebenstellenInformationMobile from "@/components/NebenstellenInformationMobile";
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
  },
  components: {NebenstellenInformationMobile, MobileObject, NebenstellenInformation, DetailsPopup, SliderItem},
  data(){
    return{
      drawer:false,
      rotation:0,
      moving:false
    }
  },
  mounted() {
    this.initializeSlider();
    this.appStore.setFilter(this.filter);
  },
  computed:{

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
    isActive(id){
      if(!this.currentObject) return false;

      return id===this.currentObject.id;
    },
    selectTest(){
      this.selectObject(169)
    },
    selectObject(objectId){
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
      this.$refs.right.style.transform="rotateZ(-90deg) translateX(-50%)";
      this.$refs.middle.style.transform="rotateZ(-90deg) translateX(-50%)";
      this.$refs.sliderParent.style.transform="rotateZ("+90+"deg)";
       setTimeout(()=>{
        this.appStore.setSelectedObject(this.rightObject);
        this.appStore.setSelectedIndex(this.filteredObjects.findIndex(x=> x.id ===this.rightObject.id));

        this.$refs.right.style.opacity='0';
         this.appStore.initObjects();

          this.$refs.sliderParent.style.transition="none";
          this.$refs.sliderParent.style.transform="rotateZ(0)";
        this.$refs.right.style.transition="none";
        this.$refs.right.style.transform="rotateZ(0)";
        this.$refs.middle.style.transition="none";
        this.$refs.middle.style.transform="rotateZ(0) translateX(-60%) translateY(-10%)";

          this.$refs.right.style.opacity='1';
          this.$refs.name.classList.add("animate__flipInY");
          setTimeout(()=>{
            this.$refs.name.classList.remove("animate__flipInY");
          },1000);
          this.moving=false;
      },2000);
    },
    initializeSlider(){
      let currentParentPos = this.$refs.currentParentPos.getBoundingClientRect();
      let sliderParent=this.$refs.sliderParent;
      sliderParent.style.width=window.innerWidth*5+"px";
      sliderParent.style.height=window.innerWidth*5+"px";

      sliderParent.style.top=(currentParentPos.bottom-sliderParent.clientHeight)+"px";
      sliderParent.style.left=((this.$refs.currentParentPos.clientWidth/2)-sliderParent.clientWidth/2)+"px";
    },
    moveLeft(){
      this.moving=true;
      this.$refs.sliderParent.style.transition="transform 2s ease-in-out";
      this.$refs.left.style.transition="transform 2s ease-in-out";
      this.$refs.middle.style.transition="transform 2s ease-in-out";
      if(this.rotation===360) this.rotation=0;
      this.rotation+=90;
      this.$refs.left.style.transform="rotateZ(90deg) translateX(30%)";
      this.$refs.middle.style.transform="rotateZ(90deg) translateX(50%)";
      this.$refs.sliderParent.style.transform="rotateZ(-"+90+"deg)";
      setTimeout(()=>{
        this.appStore.setSelectedObject(this.leftObject);
        this.appStore.setSelectedIndex(this.filteredObjects.findIndex(x=> x.id ===this.leftObject.id));

        this.$refs.right.style.opacity='0';
        this.appStore.initObjects();

        this.$refs.sliderParent.style.transition="none";
        this.$refs.sliderParent.style.transform="rotateZ(0)";
        this.$refs.left.style.transition="none";
        this.$refs.left.style.transform="rotateZ(0)";
        this.$refs.middle.style.transition="none";
        this.$refs.middle.style.transform="rotateZ(0) translateX(-60%) translateY(-10%)";

        this.$refs.right.style.opacity='1';
        this.$refs.name.classList.add("animate__flipInY");
        setTimeout(()=>{
          this.$refs.name.classList.remove("animate__flipInY");
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
  border-bottom: 2px solid grey;
}
.slider-parent{
  transition: transform 2s ease-in-out;
  #background-color: grey;
  border-radius: 100%;
  position: absolute;
  border:20px solid #fafafa;
  #-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  #box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

  
}
</style>