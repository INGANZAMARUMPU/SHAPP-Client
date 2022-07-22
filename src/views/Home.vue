<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="secondary">
          <ion-button @click="showSearch">
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
            <ion-item button  @click="displayCredit">
              <ion-label>Achat Credits</ion-label>
              <ion-icon :src="getIcon('cashOutline')"/>
            </ion-item>
            <ion-item button @click="logOut">
              <ion-label>Deconnexion</ion-label>
              <ion-icon :src="getIcon('powerOutline')"/>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content class="ion-no-padding">
      <EventItem v-for="item in events"
        :item="item"
        @scan="startScan"/>
      <ion-fab-button class="todo-fab" @click="addEvent">
        <ion-icon :src="getIcon('add')"></ion-icon>
      </ion-fab-button>
    </ion-content>
    <DialogEvent
      :active = "event_shown"
      :item = "event"
      @close = "close"/>
    <DialogScan
      :active = "scan_shown"
      @scanned = "displayInfos"
      @close = "close"/>
    <DialogCredit
      :active = "credit_shown"
      @close = "close"/>
    <DialogResults
      :active = "scan_results_shown"
      :item = "scan_results"
      @close = "close"/>
    <ion-searchbar show-cancel-button="always" debounce="0" id="searchbar"
      @ionCancel="closeSearch" @search="search($event.target.value)"/>
  </ion-page>
</template>

<script>
import DialogEvent from "../components/dialog_event"
import DialogScan from "../components/dialog_scan"
import DialogResults from "../components/dialog_scan_results"
import DialogCredit from "../components/dialog_credit"
import EventItem from "../components/event_item"

export default {
  components:{
    DialogEvent,
    EventItem,
    DialogScan,
    DialogResults,
    DialogCredit,
  },
  data(){
    return {
      event_shown:false,
      scan_shown:false,
      scan_results_shown:false,
      credit_shown:false,
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
    showSearch(){
      let searchbar = document.getElementById("searchbar")
      searchbar.classList.add("shown")
    },
    closeSearch(event){
      let searchbar = document.getElementById("searchbar")
      searchbar.classList.remove("shown")
    },
    close(){
      this.event_shown = false
      this.scan_shown = false
      this.scan_results_shown = false
      this.credit_shown = false
      this.event = null
    },
    addEvent(){
      this.event_shown = true
    },
    displayCredit(){
      this.credit_shown = true
    },
    startScan(event){
      this.scan_shown = true
      this.event = event
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