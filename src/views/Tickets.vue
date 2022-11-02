<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/events">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Tickets</ion-title>
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
      <h3>{{ evenemt.nomEvenement }}</h3>
      <ion-col v-for="place in evenemt.places">
        <ion-item-divider color="light">{{ place.nom.toUpperCase() }}</ion-item-divider>
        <div class="qrs">
          <div class="item" v-for="i in place.nombre">
            <div class="personne">
              {{ getFullName(getPerson(evenemt, place, i)) }}
            </div>
            <div class="qr ion-activatable ripple-parent"
              @click="affecter(place, i)">
              <ion-ripple-effect/>
              <img :id="generateP(place.nom,i)" class="qr_img"/>
            </div>
            <div class="descr">
              Place {{ i }}
              <ion-button size=small fill="clear"
                @click="share(generateP(place.nom,i))"
                class="ion-no-padding share">
                <ion-icon slot="icon-only" :icon="getIcon('shareSocial')"/>
              </ion-button>
            </div>
          </div>
        </div>
      </ion-col>
    </ion-content>
    <DialogAffectation
      :active= "affect_shown"
      :event="evenemt" 
      :place="active_place" 
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
      affectations:{}
    }
  },
  methods:{
    generateP(nom, no){
      return JSON.stringify({
        'nom':nom,
        'no':no
      })
    },
    getPerson(evenemt, place, i){
      let key = `${evenemt.id}_${place.id}_${i}`
      return this.affectations[key]
    },
    getFullName(person){
      if(person){
        return `${person.nomInvite} ${person.prenomInvite}`
      }
      return "*Non affectée*"
    },
    affecter(place, i){
      this.affect_shown = true
      this.active_place = {"place":place, "no":i}
    },
    saveAffectation(affectation){
      this.affect_shown = false
      this.affectations.push(affectation)
    },
    close(){
      this.affect_shown = false
      this.active_place = null
    },
    showSearch(){
      let searchbar = document.getElementById("ticketsearch")
      searchbar.classList.add("shown")
    },
    closeSearch(event){
      let searchbar = document.getElementById("ticketsearch")
      searchbar.classList.remove("shown")
    },
    generateQRs(){
      let qr_imgs = document.getElementsByClassName("qr_img");
      let data
      for(let qr_img of qr_imgs){
        data = btoa(qr_img.getAttribute("id"))
        QRCode.toDataURL(data).then(src => {
          qr_img.setAttribute("src", src)
        })
      }
    },
    share(id){
      let url = document.getElementById(id).getAttribute("src")
      let file_name = "invitation.png"
      Filesystem.writeFile({
        path: file_name,
        data: url,
        directory: Directory.Cache
      }).then(() => {
        return Filesystem.getUri({
          directory: Directory.Cache,
          path: file_name
        });
      }).then((uriResult) => {
        Share.share({
          text: `Salut!\n\nCeci est votre invitation dans l'evenement\n\n*${this.evenemt.nom}*`,
          title: 'Votre invitation',
          url: uriResult.uri,
          dialogTitle: "Partage d'invitation",
        });
      });
    },
    fetchAffectations(){
      axios.get(this.url+`/invitation/${this.evenemt.id}`, this.headers)
      .then((response) => {
        let key
        for(let item of response.data){
          key = `${this.evenemt.id}_${item.place.id}_${item.idInvitation}`
          this.affectations[key] = item
        }
        this.fetchData()
      }).catch((error) => {
        console.error(error)
        this.errorOrRefresh(error, this.fetchAffectations)
      }).finally(() => {
      });
    },
    fetchData(){
      axios.get(this.url+`/evenement/places/${this.evenemt.id}`, this.headers)
      .then((response) => {
        this.evenemt["places"] = []
        for(let place of response.data){
          this.evenemt["places"].push({
            id: place.id,
            nom: place.nomPlace,
            nombre: parseInt(place.nombre)
          })
        }
        this.$store.state.evenemts[this.evenemt.nom] = this.evenemt
        this.$store.state.evenemts[this.evenemt.nom]["affectations"] = this.affectations
        localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
      }).catch((error) => {
        this.errorOrRefresh(error, this.fetchData)
      }).finally(() => {
        this.makeToast("Generation des codes QRs")
        setTimeout(this.generateQRs, 1000)
      });
    }
  },
  mounted(){
    let nom = this.$route.params.nom
    this.evenemt = this.$store.state.evenemts[nom]
    this.fetchAffectations()
  }
}
</script>
<style scoped>
h3{
  text-align: center;
  margin: 0!important;
  padding-bottom: 0;
}
.qrs{
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  justify-content: space-between;
}
.qr{
  width: 90px;
  height: 90px;
  background-color: #ddd;
  border: 2px solid #aaa;
  position: relative;
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
img{
  width: 100%;
}
.personne{
  font-size: .8em;
  text-align: center;
  margin-top: 5px;
}
</style>