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
        {{is_out?"Autoriser l'entrée":"Faire la sortie"}}
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
      is_out: true
    }
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
      this.is_out = !this.is_out 
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