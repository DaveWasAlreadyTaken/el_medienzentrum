<template>
  <div id="wrapper" >
  <div :id="'-holder'">
    <img v-if="id" class="viewerItem" id="id" :alt="title" :src="images[images.findIndex(x => x.includes('_001'))]">
  </div>
  </div>

</template>

<script>
import {JavascriptViewer} from "@3dweb/360javascriptviewer";
import {useAppStore} from "@/stores/app.module";
export default {
  name: "ObjectViewer",
  setup(){
    const appStore = useAppStore();
    return{
      appStore
    }
  },
  props:{
    id:Number,
    title:String,
    images:Array,
    current:Boolean,
    dateiPraefix:String
  },
  data(){
  },
  mounted() {
      this.start();
    },
  watch:{
    current(){
      //if(!newValue) this.$destroy();
    },
    viewerReactive(){
      if(this.images.length>0) {
        if(this.viewer) this.viewer.destroy();
       this.start();
      }
    }
  },
  beforeUnmount() {
    //this.$refs[this.id+'-holder'].remove();
    console.log("Element",document.getElementById('-holder'))
    if(document.getElementById(this.id+'-holder'))document.getElementById(this.id+'-holder').remove();
    if(this.viewer) this.viewer.destroy();
  },
  computed:{
    sortedImages(){
      let images = this.images;
      //console.log("Test",images[0].substr(images[0].length-7,3));
      return images.sort((x,y) => x.substr(x.length-7,3)-y.substr(y.length-7,3));
    },
    viewer:{
      get(){
        return this.appStore.viewer;
      },set(value){
        this.appStore.setViewer(value);
      }

    },
    element(){
      return document.getElementById('id');
    },
    viewerReactive(){
      return new JavascriptViewer({
        mainHolderId: '-holder',
        mainImageId: 'id',
        imageUrlFormat: this.dateiPraefix+'_xxx.jpg',
        imageUrls: this.sortedImages,
        totalFrames: 120,
        speed: 20,
        extraImageClass:'viewerItem',
        defaultProgressBar: true
      });
    }
  },
  methods:{
    destroy(){
      this.appStore.destroyViewer();
    },
    reset(value){
      this.appStore.setReset(value);
    },
    start(){
      //console.log("Src",this.element.src);
      this.element.src=this.sortedImages[this.sortedImages.findIndex(x => x.includes('_001'))];
      //console.log("Src",this.element.src);
      document.getElementById("id").src=this.element.src;
      this.appStore.setViewer(this.viewerReactive);
      if(!this.element){
    return null;
      /**  let g = document.createElement('img');
        g.setAttribute("id", "id");
        let wrapper = document.createElement("div");
        wrapper.setAttribute("id","-holder")
        wrapper.appendChild(g);
        document.getElementById("wrapper").appendChild(wrapper);

        console.log("Created Elemetn",g);
**/
      }
      console.log("ViewerReactive",this.viewerReactive);
      if(this.viewerReactive){
        this.viewerReactive.start().then(() => {
          console.log("Start")
          this.viewerReactive.rotateDegrees(1440).then(() => {
            // continue with your amazing intro
          })
        });
      }
    },
    initObject(){
      //if(this.viewer) this.viewer.destroy();
      if(!document.getElementById(this.id)){
        console.log("No Element");
        return null;
      }

     this.viewer = new JavascriptViewer({
       mainHolderId: this.id+'-holder',
       mainImageId: this.id,
       imageUrlFormat: this.id+'_xxx.jpg',
       //imageUrls: this.images,
       totalFrames: 120,
       speed: 20,
       extraImageClass:'viewerItem',
       defaultProgressBar: true
     });

      // use events for example
      this.viewer.events().loadImage.on((progress) => {
        console.log(progress)
      })

      this.viewer.events().started.on((result) => {
        // use a promise or a start event to trigger things
        console.log("Result",result);
      })
    if(this.viewer) {
      this.viewer.start().then(() => {
        console.log("Start")
        this.viewer.rotateDegrees(360).then(() => {
          // continue with your amazing intro
        })
      });
    }
    }
  }
}


</script>

<style scoped>
</style>