<template>
<div>

<HeroSection3 :object="object" :subfilter="subfilter" :filter="filter"/>

</div>
</template>

<script>
import HeroSection3 from "@/components/HeroSection3";
export default {
  name: "HomepageView",
  components: {HeroSection3},
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

}
</script>

<style scoped>

</style>