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
              <ion-label>Achat Crédits</ion-label>
              <ion-icon :src="getIcon('cashOutline')"/>
            </ion-item>
            <ion-item button routerLink="/password">
              <ion-label>Mot de passe</ion-label>
              <ion-icon :src="getIcon('pencil')"/>
            </ion-item>
            <ion-item button @click="logOut">
              <ion-label>Déconnexion</ion-label>
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
      <CreditBar/>
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
      :event = "event"
      @close = "close"/>
  </ion-page>
</template>

<script>
import DialogScan from "../components/dialog_scan"
import DialogResults from "../components/dialog_scan_results"
import EventItem from "../components/event_item"
import CreditBar from "../components/credit_bar"

export default {
  components:{
    EventItem,
    DialogScan,
    DialogResults,
    CreditBar
  },
  data(){
    return {
      scan_shown:false,
      scan_results_shown:false,
      scan_results:null,
      event:null,
      events: Object.values(this.$store.state.evenemts)
    }
  },
  watch:{
    "$store.state.evenemts":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          this.events = Object.values(new_val)
        }
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
      this.fetchAffectations(event)
    },
    createEvent(){
      if(!this.user.quantite_credit || this.user.quantite_credit < 5){
        this.makeToast("Erreur", "Vous devez avoir 5 crédits au minimum pour créer un événement !")
      } else {
        this.$router.push("/event")
      }
    },
    displayInfos(result){
      try {
        this.scan_results = this.event.affectations[result.result]
        if(!!this.scan_results){
          this.scan_results.place_id = result.result
          this.scan_shown = false
          this.scan_results_shown = true
        }
        if(this.scan_shown){
          this.makeToast('erreur', `la place ${this.scan_results} n'existe pas dans ${this.event.nom}`)
        }
      } catch(e) {
        console.error(e)
        this.makeToast('erreur', "Code Qr invalide")
      }
    },
    fetchData(){
      axios.get(this.url+`/evenements`, this.headers)
      .then((response) => {
        let evenemts = {}
        for(let event of response.data){
          event["affectations"] = []
          evenemts[event.nomEvenement] = event
        }
        this.$store.state.evenemts = evenemts
        localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
      }).catch((error) => {
        this.errorOrRefresh(error, this.fetchData)
      })
    }
  },
  mounted(){
    if (Object.values(this.$store.state.evenemts).length == 0) {
      this.fetchData()
    }
  }
}
</script>
<style scoped>
</style>