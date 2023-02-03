<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/events">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Presences</ion-title>
        <ion-buttons slot="secondary">
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
      <h3>{{ evenemt.nomEvenement }}</h3>
      <ion-col v-for="place in evenemt.places">
        {{ place }}
      </ion-col>
    </ion-content>
    <DialogAffectation
      :active= "affect_shown"
      :event="evenemt" 
      :place="active_place"
      :item="active_person"
      @created= "saveAffectation"
      @close="close"/>
  </ion-page>
</template>

<script>
import QRCode from 'qrcode'
import { Share } from '@capacitor/share';
import { Directory, Filesystem } from '@capacitor/filesystem';
import DialogAffectation from "../components/dialog_affectation"

export default {
  components:{ DialogAffectation },
  data(){
    return {
      evenemt:{},
      affect_shown:false,
      active_place: null,
      active_person: null
    }
  },
  methods:{
    generateID(place, no){
      return `${this.evenemt.id}_${place.id}_${no}`
    },
    getPerson(place, i){
      let key = `${this.evenemt.id}_${place.id}_${i}`
      return this.evenemt.affectations[key]
    },
    getFullName(person){
      if(person){
        return `${person.nomInvite} ${person.prenomInvite}`
      }
      return ""
    },
  },
  mounted(){
    let nom = this.$route.params.nom
    this.evenemt = this.$store.state.evenemts[nom]
  }
}
</script>
<style scoped>
h3{
  text-align: center;
  margin: 0!important;
  padding-bottom: 0;
}
.descr{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
}
.share{
  font-size: 9px;
  margin-left: 5px;
}
ion-button{
  height: 30px;
}
.personne{
  font-size: .8em;
  text-align: center;
  margin-top: 5px;
}
</style>