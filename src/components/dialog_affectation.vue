<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Partagez cette invitation à :</h3>
      <div class="content">
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Saisissez le Prénom (*)</ion-label>
          <ion-input type="text" 
            placeholder="Saisissez le Prénom (*)"
            @IonChange="prenom=$event.target.value"
            :value="prenom" clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Saisissez le nom (*)</ion-label>
          <ion-input type="text" 
            placeholder="Saisissez le nom (*)"
            @IonChange="nom=$event.target.value"
            :value="nom" clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Numero de téléphone (*)</ion-label>
          <ion-input type="telephone" 
            placeholder="Numero de téléphone (*)"
            @IonChange="telephone=$event.target.value"
            :value="telephone" clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Nombre des personnes autorisées (*)</ion-label>
          <ion-input type="number" 
            placeholder="Nombre des personnes autorisées (*)"
            @IonChange="nombre=$event.target.value"
            :value="nombre" clearInput/>
        </ion-item>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="postInvitation">
          <ion-spinner v-if="sending"
            name="crescent" style="margin: 0 10px;"/>
          Enregister
        </ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script>
import { popoverController } from '@ionic/vue';

export default {
  props: {
    active:{type:Boolean, required:true},
    event:{type:Object, required:false},
    place:{type:Object, required:false},
    item:{type:Object, required:false},
  },
  data(){
    return {
      nom:"",
      prenom:"",
      nombre:"",
      telephone:"",
      sending:false
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
        this.nom = new_val.prenomInvite
        this.prenom = new_val.nomInvite
        this.telephone = new_val.phoneNumber
        this.nombre = new_val.nombreInvites
      } else {
        this.nom = ""
        this.prenom = ""
        this.nombre = ""
        this.telephone = ""
      }
    }
  },
  methods: {
    close(){
      this.$emit("close")
    },
    postInvitation(){
      this.sending = true
      let data = {
        "prenomInvite": this.prenom,
        "nomInvite": this.nom,
        "phoneNumber": this.telephone,
        "nombreInvites": parseInt(this.nombre),
        "idInvitation": this.place.no
      }
      axios.post(this.url+`/save/invite/${this.place.place.nom}/${this.event.id}`, data, this.headers)
      .then((response) => {
        this.makeToast("success", "invitation affectée avec succes")
      
        let key = `${this.event.id}_${this.place.place.id}_${this.place.no}`
        this.$store.state.evenemts[this.event.nomEvenement]["affectations"][key] = data
        localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
        this.$emit("created", response.data)
      }).catch((error) => {
        console.error(error);
        this.makeToast("erreur", error.response.data)
      }).finally(() => {
        this.sending = false
      })
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
  max-height: 80vh;
  overflow-y: hidden;
  background-color: #f0f0f0!important;
}
h3{
  margin: 0;
  padding-top: 0;
}
.round{
  margin-bottom: 10px;
}
</style>