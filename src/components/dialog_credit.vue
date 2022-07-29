<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Confirmation</h3>
      <div class="content">
        <div>
          Votre credit est de: <b>123</b><br><br>
          Pour recharger veuillez inserer le code d'activation reçu ici:
        </div>
        <div>
          <input type="text" name="" v-model="credit_code">
        </div>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          Quitter
        </ion-button>
        <ion-button fill=clear @click="save">Verifier</ion-button>
      </ion-col>
    </div>  
  </div>
</template>

<script>
import { popoverController } from '@ionic/vue';

export default {
  props: {
    active:{type:Boolean, required:true},
  },
  data(){
    return {
      credit_code:"",
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    save(){
    }
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
  overflow-y: hidden;
}
.content{
  overflow-y: auto;
}
input{
  width: 100%;
  font-size: 1.2em;
  padding: 5px 15px;
  text-align: center;
}
</style>