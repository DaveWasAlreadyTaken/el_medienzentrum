<template>
  <v-dialog style="z-index:999999"  v-model="show">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Impressum</v-toolbar-title>
        <v-spacer/>
        <v-btn @click="toggleImpressum" icon="mdi-close"></v-btn>
      </v-toolbar>
<v-container class="py-15">
  <br/>
  <strong>Herausgeber</strong>

  <p>Medienzentrum Eichst&auml;tt </p><p> R&ouml;merstra&szlig;e 14</p><p> 85072 Eichst&auml;tt</p>

  <p>http://www.medienzentrum-eichstaett.de</p>
<br/>
  <strong>Kontakt</strong>
  <p> Medienzentrum Eichst&auml;tt</p><p> R&ouml;merstra&szlig;e 14</p><p> 85072 Eichst&auml;tt</p>

  <p>Telefon: 08421 / 934576</p>

  <p> E-Mail: leiter@medienzentrum-eichstaett.de</p>
<br>
  <strong>Vertretungsberechtigter</strong>

  <p>Der Internetauftritt des Medienzentrums Eichst&auml;tt wird betreut von Herrn Christoph Schmidt, Leiter Medienzentrum</p>

  <p>F&uuml;r die Inhalte ist verantwortlich Herr Christoph Schmidt</p>
<br/>
  <strong>Nutzungsbedingungen</strong><p>
  Texte, Bilder, Grafiken sowie die Gestaltung dieser Internetseiten unterliegen dem Urheberrecht. Sie d&uuml;rfen von Ihnen nur zum privaten und sonstigen eigenen Gebrauch im Rahmen des &sect; 53 Urheberrechtsgesetz (UrhG) verwendet werden. Eine Vervielf&auml;ltigung oder Verwendung dieser Seiten oder Teilen davon in anderen elektronischen oder gedruckten Publikationen und deren Ver&ouml;ffentlichung ist nur mit unserer Einwilligung gestattet. Diese erteilen auf Anfrage die f&uuml;r den Inhalt Verantwortlichen. Weiterhin k&ouml;nnen Texte, Bilder, Grafiken und sonstige Dateien ganz oder teilweise dem Urheberrecht Dritter unterliegen. Auch &uuml;ber das Bestehen m&ouml;glicher Rechte Dritter geben Ihnen die f&uuml;r den Inhalt Verantwortlichen n&auml;here Ausk&uuml;nfte.</p>

  <p>Der Nachdruck und die Auswertung von Pressemitteilungen und Reden sind mit Quellenangabe allgemein gestattet.</p>
<br>
  <strong>Haftungsausschluss</strong><p> Alle auf dieser Internetseite bereitgestellten Informationen haben wir nach bestem Wissen und Gewissen erarbeitet und gepr&uuml;ft. Eine Gew&auml;hr f&uuml;r die jederzeitige Aktualit&auml;t, Richtigkeit, Vollst&auml;ndigkeit und Verf&uuml;gbarkeit der bereit gestellten Informationen k&ouml;nnen wir allerdings nicht &uuml;bernehmen. Ein Vertragsverh&auml;ltnis mit den Nutzern des Internetangebots kommt nicht zustande.</p>

  <p>Wir haften nicht f&uuml;r Sch&auml;den, die durch die Nutzung dieses Internetangebots entstehen. Dieser Haftungsausschluss gilt nicht, soweit die Vorschriften des &sect; 839 BGB (Haftung bei Amtspflichtverletzung) einschl&auml;gig sind. F&uuml;r etwaige Sch&auml;den, die beim Aufrufen oder Herunterladen von Daten durch Schadsoftware oder der Installation oder Nutzung von Software verursacht werden, wird nicht gehaftet.</p>
<br>
  <strong>Links</strong><p> Von unseren eigenen Inhalten sind Querverweise (&#8222;Links&ldquo;) auf die Webseiten anderer Anbieter zu unterscheiden. Durch diese Links erm&ouml;glichen wir lediglich den Zugang zur Nutzung fremder Inhalte nach &sect; 8 Telemediengesetz. Bei der erstmaligen Verkn&uuml;pfung mit diesen Internetangeboten haben wir diese fremden Inhalte daraufhin &uuml;berpr&uuml;ft, ob durch sie eine m&ouml;gliche zivilrechtliche oder strafrechtliche Verantwortlichkeit ausgel&ouml;st wird. Wir k&ouml;nnen diese fremden Inhalte aber nicht st&auml;ndig auf Ver&auml;nderungen &uuml;berpr&uuml;fen und daher auch keine Verantwortung daf&uuml;r &uuml;bernehmen. F&uuml;r illegale, fehlerhafte oder unvollst&auml;ndige Inhalte und insbesondere f&uuml;r Sch&auml;den, die aus der Nutzung oder Nichtnutzung von Informationen Dritter entstehen, haftet allein der jeweilige Anbieter der Seite.</p>
</v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import {useAppStore} from "@/stores/app.module";

export default {
  name: "ImpressumView",
  setup(){
    const appStore = useAppStore();
    return {
      appStore
    }
  },
  methods:{
    toggleImpressum(){
      this.appStore.toggleImpressum();
    }
  },
  computed:{
    show(){
      return this.appStore.showImpressum;
    }
  }
}
</script>

<style scoped>

</style>