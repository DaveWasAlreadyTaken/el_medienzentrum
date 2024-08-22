<template>
<v-sheet rounded elevation="1" class="px-10 py-5 d-flex flex-column justify-space-between" v-if="termin"  height="350px" width="100%" color="white">
  <div>
  <h2 v-html="termin.meta?.thema"></h2>

    <div class="mt-4" v-if="date">
      <v-icon>mdi-calendar</v-icon><span v-html="date"></span>
    </div>
    </div>
  <div v-if="termin.meta?.beschreibung">
    <p v-text="termin.meta?.beschreibung"></p>
  </div>
  <div v-if="termin.meta?.ort">
    <v-icon>mdi-map-marker</v-icon><span v-html="termin.meta?.ort"></span><br/>
  </div>
</v-sheet>
</template>

<script>
export default {
  name: "TerminItem",
  props:{
    termin:Object
  },
  computed:{
    date() {
      if (this.termin.meta?.von && this.termin.meta?.bis) {
        let moment = require('moment')
        moment.locale('de')
        return moment(this.termin.meta?.von).format('lll') + " - " + moment(this.termin.meta?.bis).format('lll');
      }else return null;
    }
  }
}
</script>

<style scoped>

</style>