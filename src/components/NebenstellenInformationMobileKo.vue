<template>
  <v-card
      elevation="0"

      width="400px"
      max-width="500"
  >
    <v-carousel cycle hide-delimiters height="200px">
      <v-carousel-item
          :src="require('@/assets/ko-1.webp')"
          cover
      ></v-carousel-item>
      <v-carousel-item
          :src="require('@/assets/ko-2.webp')"
          cover
      ></v-carousel-item>
      <v-carousel-item
          :src="require('@/assets/ko-3.webp')"
          cover
      ></v-carousel-item>
    </v-carousel>

    <v-card-text>
      <div class="px-4">85092 Kösching, Ingolstädter Straße 111</div>

      <v-card-subtitle>Kontakt</v-card-subtitle>
      <v-list>
        <v-list-item href="tel:0845691891960" title="08456 / 918919-60">
          <template #prepend>
            <v-icon>mdi-phone</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="08456 / 918919-65">
          <template #prepend>
            <v-icon>mdi-printer</v-icon>
          </template>
        </v-list-item>
        <v-tooltip text="koesching@medienzentrum-eichstaett.de">

          <template #activator="{props}">
        <v-list-item v-bind="props" href="mailto:koesching@medienzentrum-eichstaett.de" title="koesching@medienzentrum-eichstaett.de">
          <template #prepend>
            <v-icon>mdi-mail</v-icon>
          </template>
        </v-list-item>

          </template>
        </v-tooltip>
      </v-list>
      <v-card-subtitle>Mitarbeiter</v-card-subtitle>
      <v-list>

        <v-list-item title="Brigitte Brüll" subtitle="Mitarbeiterin" :prepend-avatar="require('@/assets/brigittebruell.webp')">

        </v-list-item>

      </v-list>
      <v-card-subtitle>Öffnungszeiten</v-card-subtitle>
      <div class="px-4">
        <p>Dienstag:     7 Uhr bis 15 Uhr</p>
        <p>Mittwoch:     12 Uhr bis 15 Uhr</p>
        <p>Donnerstag:     12 Uhr bis 15 Uhr</p>
        <p>Freitags geschlossen.</p>
        <p>Während der Ferien geschlossen !</p>
      </div>
    </v-card-text>


  </v-card>
</template>

<script>
export default {
  name: "NebenstellenInformationMobileKo",

}
</script>

<style scoped>

</style>