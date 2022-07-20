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
    <ion-searchbar show-cancel-button="always" debounce="0" id="searchbar"
      @ionCancel="closeSearch" @search="search($event.target.value)"/>
  </ion-page>
</template>

<script>
import DialogEvent from "../components/dialog_event"
import EventItem from "../components/event_item"

export default {
  components:{ DialogEvent, EventItem },
  data(){
    return {
      event_shown:false,
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
      this.event = null
    },
    addEvent(){
      this.event_shown = true
    },
    startScan(evenemnt){
      this.makeToast("", "Ouverture du QR scanner...")
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