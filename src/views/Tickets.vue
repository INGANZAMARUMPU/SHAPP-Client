<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/">
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
      <h3>{{ evenemt.nom }}</h3>
      <ion-col v-for="place in evenemt.places">
        <ion-item-divider color="light">{{ place.nom.toUpperCase() }}</ion-item-divider>
        <div class="qrs">
          <div class="item" v-for="i in place.nombre">
            <div class="qr">
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
    <ion-searchbar show-cancel-button="always" debounce="0" id="ticketsearch"
      @ionCancel="closeSearch" @search="search($event.target.value)"/>
  </ion-page>
</template>

<script>
import QRCode from 'qrcode'
import { Share } from '@capacitor/share';
import { Directory, Filesystem } from '@capacitor/filesystem';

export default {
  components:{ },
  data(){
    return {
      evenemt:{}
    }
  },
  methods:{
    generateP(nom, no){
      return JSON.stringify({
        'nom':nom,
        'no':no
      })
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
  },
  mounted(){
    let nom = this.$route.params.nom
    this.evenemt = this.$store.state.evenemts[nom]
    this.makeToast("Generation des QRs en cours")
    setTimeout(this.generateQRs, 1000)
  }
}
</script>
<style scoped>
h3{
  text-align: center;
  margin: 0!important;
}
.qrs{
  display: grid;
  grid-template-columns: repeat(auto-fill, 90px);
  justify-content: space-between;
}
.qr{
  margin-top: 10px;
  width: 90px;
  height: 90px;
  background-color: #ddd;
  border: 2px solid #aaa;
}
.descr{
  display: flex;
  justify-content: center;
  align-items: center;
}
.share{
  font-size: 9px;
  margin-left: 5px;
}
</style>