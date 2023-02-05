<template>
  <div class="dialog" v-if="active">
    <ion-col class="body ion-padding">
      <h3>{{ event.nomEvenement }}</h3>
      <div class="qr">
        <img :src="event.logoImage" />
      </div>
      <div class="descr">
        <div>ID: <strong>{{ place_id }}</strong></div>
        <div>Mr/Mme: {{ item.nomInvite }} {{ item.prenomInvite }}</div>
        <div>Catégorie: {{ item.place.nomPlace }}</div>
        <div>Personnes autorisées: {{ item.nombreInvites }} places</div>
      </div>
      <ion-button @click="inOut" expand="full">        
        <ion-spinner v-if="sending" fill=clear
          name="crescent" style="margin: 0 10px;"/>
        {{item.etat != 1?"Autoriser l'entrée":"Faire la sortie"}}
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
    return {
      sending:false
    }
  },
  computed:{
    qr_data(){
      return JSON.stringify(this.item)
    },
    place_id(){
      let list = this.item.place_id.split("_")
      return list[1]+list[2]
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
        this.$store.state.evenemts[this.event.nomEvenement]["affectations"][this.item.place_id] = this.item
        localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
      }).catch((error) => {
        this.sending = false
        console.log(error)
        this.errorOrRefresh(error, this.inOut)
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
  position: relative;
  margin: auto;
  border: 2px solid #aaa;
  height: 200px;
  overflow-y: hidden;
  margin-bottom: 10px;
}
.qr img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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