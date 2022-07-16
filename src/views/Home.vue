<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
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
    <ion-content class="ion-padding">
      <EventItem v-for="event in events" item="event"/>
      <ion-fab-button class="todo-fab" @click="addTodo">
        <ion-icon :src="getIcon('add')"></ion-icon>
      </ion-fab-button>
    </ion-content>
    <DialogEvent
      :active = "event_shown"
      :item = "event"
      @close = "close"/>
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
      events: Object.values(this.$store.state.evenemts)
    }
  },
  watch:{
    "$store.state.evenemts"(new_val){
      this.events = Object.values(new_val)
    }
  },
  methods:{
    showSearch(){},
    close(){
      this.event_shown = false
      this.event = null
    },
    addTodo(){
      this.event_shown = true
    }
  },
  mounted(){
    if(Object.keys(this.$store.state.evenemts).length == 0){
      this.$store.state.evenemts = JSON.parse(localStorage.getItem("evenemts"))
      console.log(this.$store.state.evenemts)
    }
  }
}
</script>