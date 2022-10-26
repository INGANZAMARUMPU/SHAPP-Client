<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button routerLink="search">
            <ion-icon slot="icon-only" :icon="getIcon('search')"/>
          </ion-button>
          <ion-button id="menu-toggler">
            <ion-icon slot="icon-only"
              :ios="getIcon('ellipsisHorizontal')"
              :md="getIcon('ellipsisVertical')"/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-popover trigger="menu-toggler" dismiss-on-select="true" show-backdrop="false">
        <ion-content>
          <ion-list lines="none">
            <ion-item button  routerLink="/credit">
              <ion-label>Achat Credits</ion-label>
              <ion-icon :src="getIcon('cashOutline')"/>
            </ion-item>
            <ion-item button routerLink="/password">
              <ion-label>Mot de passe</ion-label>
              <ion-icon :src="getIcon('pencil')"/>
            </ion-item>
            <ion-item button @click="logOut">
              <ion-label>Deconnexion</ion-label>
              <ion-icon :src="getIcon('powerOutline')"/>
            </ion-item>
            <ion-item button routerLink="/about">
              <ion-label>À propos de SHAPP</ion-label>
              <ion-icon :src="getIcon('helpCircleOutline')"/>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content class="ion-no-padding">
      <div class="credit">
        vous avez {{ money(this.user.quantite_credit) }} credits
      </div>
      <br>
      <EventItem v-for="item in events"
        :item="item"
        @scan="startScan"/>
      <ion-fab-button class="todo-fab" @click="createEvent">
        <ion-icon :src="getIcon('add')"></ion-icon>
      </ion-fab-button>
    </ion-content>
    <DialogScan
      :active = "scan_shown"
      @scanned = "displayInfos"
      @close = "close"/>
    <DialogResults
      :active = "scan_results_shown"
      :item = "scan_results"
      @close = "close"/>
  </ion-page>
</template>

<script>
import DialogScan from "../components/dialog_scan"
import DialogResults from "../components/dialog_scan_results"
import EventItem from "../components/event_item"

export default {
  components:{
    EventItem,
    DialogScan,
    DialogResults,
  },
  data(){
    return {
      scan_shown:false,
      scan_results_shown:false,
      scan_results:null,
      event:null,
      events: []
    }
  },
  watch:{
    "$store.state.evenemts"(new_val){
      if(!!new_val){
        this.events = Object.values(new_val)
      }
    },
  },
  methods:{
    close(){
      this.scan_shown = false
      this.scan_results_shown = false
      this.event = null
    },
    startScan(event){
      this.scan_shown = true
      this.event = event
    },
    createEvent(){
      if(this.user.quantite_credit < 5){
        this.makeToast("vous devez avoir 5 credits au minimum pour créer un evenement")
      }
      this.router.push("/event")
    },
    displayInfos(result){
      let places = this.event.places
      try {
        this.scan_results = JSON.parse(result.result)
        for(let place of places){
          if(place.nom == this.scan_results.nom && place.nombre >= this.scan_results.no){
            this.scan_shown = false
            this.scan_results_shown = true
            break
          }
        }
        if(this.scan_shown){
          this.makeToast('erreur', `la place ${this.scan_results.nom} n'existe pas dans ${this.event.nom}`)
        }
      } catch(e) {
        this.makeToast('erreur', "Code Qr invalide")
      }
    }
  },
  mounted(){
    if(Object.keys(this.$store.state.evenemts).length == 0){
      this.$store.state.evenemts = JSON.parse(localStorage.getItem("evenemts"))
    } else {
      this.events = this.$store.state.evenemts
    }
  }
}
</script>
<style scoped>
</style>