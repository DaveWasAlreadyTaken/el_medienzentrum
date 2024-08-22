<template>
  <v-footer style="background: transparent" class="d-flex justify-space-between" app>
    <div>EI</div>
    <div>
      <v-btn icon><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-btn @click="move" icon><v-icon>mdi-arrow-right</v-icon></v-btn>

    </div><div>KÖ</div>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  methods:{
    moveRight(){
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
        this.appStore.setSelectedIndex(this.objects.findIndex(x=> x.id ===this.rightObject.id));

        this.$refs.right.style.opacity='0';
        this.appStore.initObjects();

        this.$refs.sliderParent.style.transition="none";
        this.$refs.sliderParent.style.transform="rotateZ(0)";
        this.$refs.right.style.transition="none";
        this.$refs.right.style.transform="rotateZ(0) translateX(-60%) translateY(-10%)";
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
  }
}
</script>

<style scoped>

</style>