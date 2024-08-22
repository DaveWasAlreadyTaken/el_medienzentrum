<template>
  <div style="position:relative">

    <div style="position:relative;z-index:99">EI</div>
    <div style="" class="nebenstelle">
      <div class="nebenstelle-content" style="">

            <v-card

                width="400px"
                max-width="500"
            >
              <v-carousel height="200px">
                <v-carousel-item
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover
                ></v-carousel-item>
              </v-carousel>

              <v-card-text>
                <div class="px-4">85072 Eichstätt, Römerstraße 14</div>

                <v-card-subtitle>Kontakt</v-card-subtitle>
                <v-list>
                  <v-list-item title="08421 / 934576">
                    <template #prepend>
                      <v-icon>mdi-phone</v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="08421 / 934577">
                    <template #prepend>
                      <v-icon>mdi-printer</v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="verleih@medienzentrum-eichstaett.de">
                    <template #prepend>
                      <v-icon>mdi-mail</v-icon>
                    </template>
                  </v-list-item>
                </v-list>
                <v-card-subtitle>Mitarbeiter</v-card-subtitle>
                <v-list>
                  <v-list-item title="Andreas Glöckl" subtitle="Leiter Medienzentrum" :prepend-avatar="require('@/assets/andreas.webp')">

                  </v-list-item>
                  <v-list-item title="Michaela Bauernfeind" subtitle="Mitarbeiterin">

                  </v-list-item>
                  <v-list-item title="Peter Randelzhofer" subtitle="Mitarbeiter" prepend-avatar="">
                  </v-list-item>
                </v-list>
                <v-card-subtitle>Öffnungszeiten</v-card-subtitle>
                <div class="px-4">
                  <p>Mo. bis Do.  13 Uhr bis 15 Uhr</p>
                  <p>Dienstag:     8 Uhr bis 10 Uhr</p>
                  <p>Freitags geschlossen.</p>
                  <p>Während der Ferien geschlossen !</p>
                </div>
              </v-card-text>


            </v-card>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "NebenstellenInformation"
}
</script>

<style scoped>
.nebenstelle{
  width:300px;height:300px;border-radius: 100%;position:absolute;top:0;right:0;    transform: translate(30%, -30%);
  background-color: whitesmoke;
  transition: all 2s ease-in-out;


}
.nebenstelle:hover .nebenstelle-content{
  left:20%;
  top:30%;
}
.nebenstelle:hover{
  transform: translate(80%,-80%);
  width:100vw;
  height:100vw;
}
.nebenstelle-content{
  transition: all 2s ease-in-out;
  position:absolute;left:-100%;top:-100%;

}

</style>