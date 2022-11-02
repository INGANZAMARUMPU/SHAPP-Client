<template>
  <div class="dialog" v-if="active">
    <ion-col class="body ion-padding">
      <h3>{{ event.nomEvenement }}</h3>
      <div class="qr">
        <img :src="'https://weka-pesa.com/shapp_images/logo_image/'+event.logoImage" />
      </div>
      <div class="descr">
        <div>ID: {{ item.place_id }}</div>
        <div>Mr/Mme: {{ item.nomInvite }} {{ item.prenomInvite }}</div>
        <div>Catégorie: {{ item.place.nomPlace }}</div>
        <div>Personnes autorisées: {{ item.nombreInvites }} places</div>
      </div>
      <ion-button @click="inOut" expand="full">        
        <ion-spinner v-if="sending" fill=clear
          name="crescent" style="margin: 0 10px;"/>
        {{item.etat == 0?"Autoriser l'entrée":"Faire la sortie"}}
      </ion-button>
      <ion-col class="options">
        <ion-button fill=clear @click="close">Fermer</ion-button>
      </ion-col>
    </ion-col>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false},
    event:{type:Object, required:false}
  },
  data(){
    sending:false
  },
  computed:{
    qr_data(){
      return JSON.stringify(this.item)
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    inOut(){
      this.sending = true
      let data = {
        "etat": this.item.etat == 0?1:0
      }
      axios.put(this.url+`/invitation/statut/${this.item.id}`, data, this.headers)
      .then((response) => {
        this.item.etat = response.data.etat
        this.sending = false
        this.$store.state.evenemts[this.item.nomEvenement] = this.item
        localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
      }).catch((error) => {
        this.sending = false
        console.log(error)
        this.errorOrRefresh(error, this.fetchData)
      });
    }
  },
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.ion-padding{
  padding-bottom: 5px;
}
.body{
  max-height: 80vh;
  overflow-y: hidden;
}
.content{
  height: calc(80vh - 100px);
  overflow-y: auto;
}
.qr{
  margin: auto;
  border: 2px solid #aaa;
}
h3{
  margin: 0;
}
#qr_img{
  display: inline-block;
  width: 100%;
}
.descr{
  margin: auto;
}
.descr *{
  text-align: left;
}
</style>