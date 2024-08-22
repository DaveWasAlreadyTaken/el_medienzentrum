<template>

<v-dialog max-width="600px" v-model="show">
  <v-card class="pa-10">
    <v-card-text>
      Plötzlich und unerwartet ist am Sonntag, den 12.11.2023 unser Leiter des Medienzentrums Herr Andreas Glöckl verstorben.
      <br/>Wir bitte um Verständnis, dass unsere Dienste in nächster Zeit nur eingeschränkt angeboten werden können.

    </v-card-text>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: "BannerComponent",
  data(){
    return{
      show:true,
    }
  }
}
</script>

<style scoped>

</style>