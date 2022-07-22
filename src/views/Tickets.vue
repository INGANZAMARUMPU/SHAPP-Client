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
                class="ion-no-padding">
                <ion-icon slot="icon-only" :icon="getIcon('logoWhatsapp')"/>
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
      console.log(url)
      fetch(url).then(res => res.blob()).then(blob => {
        const file = new File([blob], "invitation.png",{ type: "image/png" })
        this.send(file)
      })
    },
    send(image_file) {
      if (!('share' in navigator)) {
        return
      }
      const files = [image_file]
      const shareData = {
        text: `Ça c'est votre invitation dans l'evenement`,
        title: 'Votre invitation',
        files,
      }
      if (navigator.canShare(shareData)) {
        try {
          navigator.share(shareData)
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error(err.name, err.message)
          }
        }
      } else {
        console.warn('Sharing not supported', shareData)
      }
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
ion-button{
  font-size: 9px;
  margin-left: 5px;
}
</style>