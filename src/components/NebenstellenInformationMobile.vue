<template>
  <v-card
      elevation="0"

      width="400px"
      max-width="500"
  >
    <v-carousel cycle hide-delimiters height="200px">
      <v-carousel-item
          :src="require('@/assets/ei-1.webp')"
          cover
      ></v-carousel-item>
      <v-carousel-item
          :src="require('@/assets/ei-2.webp')"
          cover
      ></v-carousel-item>
      <v-carousel-item
          :src="require('@/assets/ei-3.webp')"
          cover
      ></v-carousel-item>
    </v-carousel>

    <v-card-text>
      <div class="px-4">85072 Eichstätt, Römerstraße 14</div>

      <v-card-subtitle>Kontakt</v-card-subtitle>
      <v-list>
        <v-list-item href="tel:08421934576" title="08421 / 934576">
          <template #prepend>
            <v-icon>mdi-phone</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="08421 / 934577">
          <template #prepend>
            <v-icon>mdi-printer</v-icon>
          </template>
        </v-list-item>
        <v-tooltip text="verleih@medienzentrum-eichstaett.de">

          <template #activator="{props}">
            <v-list-item v-bind="props" href="mailto:verleih@medienzentrum-eichstaett.de" title="verleih@medienzentrum-eichstaett.de">
              <template #prepend>
                <v-icon>mdi-mail</v-icon>
              </template>
            </v-list-item>

          </template>
        </v-tooltip>
      </v-list>
      <v-card-subtitle>Mitarbeiter</v-card-subtitle>
      <v-list>
        <v-list-item title="Michaela Bauernfeind" subtitle="Mitarbeiterin" :prepend-avatar="require('@/assets/Neues-Bild-6.webp')">

        </v-list-item>
        <v-list-item title="Peter Randelzhofer" subtitle="Mitarbeiter" :prepend-avatar="require('@/assets/Neues-Bild-5.webp')">
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
</template>

<script>
export default {
  name: "NebenstellenInformationMobile",

}
</script>

<style scoped>

</style>