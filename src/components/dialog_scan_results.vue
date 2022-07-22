<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Evenement</h3>
      <div class="qr">
        <img id="qr_img"/>
      </div>
      <div class="descr">
        <div>Nom de la place</div>
        <h3>{{ item.nom }}</h3>
        <div>Numero de la place</div>
        <h3>{{ item.no }}</h3>
      </div>
      <ion-col class="options">
        <ion-button fill=clear @click="close">Fermer</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false}
  },
  data(){
    return {
    }
  },
  computed:{
    qr_data(){
      return JSON.stringify(this.item)
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
      } else {
      }
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    generateQRs(){
      let data = btoa(this.qr_data)
      QRCode.toDataURL(data).then(src => {
        qr_img.setAttribute("src", src)
      })
    }
  },
  mounted(){
    setTimeout(this.generateQRs, 1000)
  }
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
  width: 200px;
  height: 200px;
  margin: auto;
  border: 2px solid #aaa;
}
#qr_img{
  display: inline-block;
  width: 100%;
}
.descr{
  width: 200px;
  margin: auto;
}
.descr *{
  text-align: left;
}
</style>