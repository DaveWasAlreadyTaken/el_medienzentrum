<template>
<v-dialog style="z-index:9999999999999999"  v-model="showReactive">
  <v-card>
    <v-toolbar color="blue">
      <v-btn @click="showReactive=false" icon="mdi-close" varient="text"></v-btn>
    </v-toolbar>
    <iframe style="min-height: 80vh" width="100%" height="100%" src="https://www.bildungsmedien-online.de/M4Merkur/b11/prog/wm.aspx">

    </iframe>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: "WebMerkur",
  props:{
    show:Boolean,
  },
  computed:{
    showReactive:{
      get(){
        return this.show;
      },
      set(value){
        this.$emit('toggle',value);
      }
    }
  }
}
</script>

<style scoped>

</style>