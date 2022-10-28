<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/events">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h3>Dépenser moins !</h3>
      <ion-item class="round ion-no-padding">
        <ion-label position="floating">Nom de l’événement (*)</ion-label>
        <ion-input type="text" 
          placeholder="Nom de l’événement (*)"
          @IonChange="nom=$event.target.value"
          :value="nom" clearInput/>
      </ion-item>
      <ion-item class="round dates ion-no-padding">
        <ion-label id="date">Date de l’événement (*)</ion-label>
        <div>{{ formatedDate(date)}}</div>
        <ion-popover trigger="date" size="cover">
          <ion-datetime
            @ionChange="chooseDate"
            presentation="date"
            :min="min_date"
            :max="max_date"
            :v-model="date"/>
        </ion-popover>
      </ion-item>
      <ion-item class="round dates ion-no-padding">
        <ion-label id="time">L'heure de l’événement (*)</ion-label>
        <div>{{ formatedTime(time) }}</div>
        <ion-popover trigger="time" size="cover">
          <ion-datetime
            @ionChange="chooseTime"
            presentation="time"
            :value="time"/>
        </ion-popover>
      </ion-item>
      <ion-item class="round ion-no-padding">
        <ion-label position="floating">Adresse de l’événement (*)</ion-label>
        <ion-input type="text" 
          placeholder="Adresse de l’événement (*)"
          @IonChange="address=$event.target.value"
          :value="address" clearInput/>
      </ion-item>
      <ion-item class="round ion-no-padding">
        <ion-label position="floating">E-mail du responsable</ion-label>
        <ion-input type="email" 
          placeholder="E-mail du responsable"
          @IonChange="email=$event.target.value"
          :value="email" clearInput/>
      </ion-item>
      <ion-item class="round ion-no-padding">
        <ion-label position="floating">Numéro du premier contact (*)</ion-label>
        <ion-input type="tel" 
          placeholder="Numéro du premier contact (*)"
          @IonChange="tel_1=$event.target.value"
          :value="tel_1" clearInput/>
      </ion-item>
      <ion-item class="round ion-no-padding">
        <ion-label position="floating">Numéro du deuxième contact</ion-label>
        <ion-input type="tel" 
          placeholder="Numéro du deuxième contact"
          @IonChange="tel_2=$event.target.value"
          :value="tel_2" clearInput/>
      </ion-item>
      <ion-item class="round ion-no-padding">
        <ion-label position="floating">E-mail</ion-label>
        <ion-input type="email" 
          placeholder="E-mail"
          @IonChange="email=$event.target.value"
          :value="email" clearInput/>
      </ion-item>
      <ion-item class="ion-no-padding multiline">
        <ion-label position="floating">Autres informations à faire savoir</ion-label>
        <ion-textarea 
          placeholder="Autres informations à faire savoir"
          @keyup="details=$event.target.value"
          :value="details"/>
      </ion-item>
      <input
        type="file" id="image"
        accept=".JPEG, .PNG, .JPG"
        @change="e => loadImage(e)">
      <ion-button
        class="ion-no-padding"
        expand=full
        v-if="!image"
        @click="chooseImage">
        <ion-icon :src="getIcon('cameraOutline')"
          style="margin-right: 5px;"/>
        selectionner image
      </ion-button>
      <div class="image"
        v-show="!!image"
        @click="chooseImage">
        <img src="" alt="" id="image_preview">
      </div>
      <div class="place labels">
        <div class="nom">
          Lieu (<span>{{ nb_places }} places)</span>
        </div>
        <div class="nombre">Nombre</div>
      </div>
      <div class="place" v-for="place in places">
        <input type="text"
          class="nom" 
          placeholder="Nom du lieu"
          v-model="place.nom">
        <input type="number"
          class="nombre" 
          min=1 placeholder="Nombre"
          v-model="place.nombre">
      </div>
      <ion-col class="button ion-no-padding ion-activatable ripple-parent">
        <a @click="anotherPlace">
          + Ajouter une place 
        </a>
        <ion-ripple-effect/>
      </ion-col>
      <div class="center" v-if="in_progress">
        {{ progress.toFixed(2) }} %
      </div>
      <ion-col class="options">
        <ion-button expand="full" size="small" routerLink="/">
          ANULLER
        </ion-button>
        <ion-button expand="full" size="small" @click="postEvent">
          VALIDER
        </ion-button>
      </ion-col>
    </ion-content>
  </ion-page>
</template>

<script>
import { popoverController } from '@ionic/vue';

export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false}
  },
  data(){
    return {
      nom:"",
      date:"",
      time:"",
      address:"",
      time:"",
      email:"",
      image:"",
      places:[
        { nom:"principal", nombre:1 }
      ],
      tel_1:"",
      tel_2:"",
      details:"",
      progress:0
    }
  },
  computed:{
    nb_places(){
      return this.places.reduce((acc, x) =>{
        return acc += x.nombre
      }, 0)
    },
    in_progress(){
      return this.progress < 100 && this.progress > 0
    },
    min_date(){
      return new Date().toISOString()
    },
    max_date(){
      let date = new Date()
      date.setFullYear(date.getFullYear() + 4)
      return date.toISOString()
    },
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
    anotherPlace(){
      this.places.push({nom:"", nombre:""})
    },
    chooseDate(event){
      this.date = event.target.value
      popoverController.dismiss()
    },
    chooseTime(event){
      this.time = event.target.value
      popoverController.dismiss()
    },
    loadImage(event){
      let file = event.target.files[0]
      this.image_name = file.name
      this.image_type = file.type
      if (file.size>300_000) {
        this.makeToast("l'image ne peut pas depasser 300ko")
      } else {
        this.image = file
        let fr = new FileReader();
        let vue = this
        fr.onload = function(){
          window.image_preview.src = fr.result;
          vue.image_base64 = fr.result;
        }
        fr.readAsDataURL(file);
      }
    },
    chooseImage(){
      let button = document.getElementById("image")
      button.click()
    },
    postEvent(){
      let data = new FormData()

      let time = this.time.split("T")[1]

      data.append("nomEvenement", this.nom)
      data.append("dateEvenement", this.date.split("T")[0])
      data.append("heureEvenement", time.split("+")[0])
      data.append("adresseEvenement", this.address)
      data.append("emailResponsable", this.email)
      data.append("numeroContact1", this.tel_1)
      data.append("numeroContact2", this.tel_2)
      data.append("file", this.image)
      data.append("autresInfos", this.details)
      
      if(this.$store.state.evenemts == null){
        this.$store.state.evenemts = {}
      }
      for(let place of this.places){
        data.append("places", `${place.nom},${place.nombre}`)
      }
      this.headers.onUploadProgress = progressEvent => {
        this.progress = (progressEvent.loaded / progressEvent.total) * 100;
      }
      axios.post(this.url+`/save/evenement`, data, this.headers)
      .then((response) => {
        this.makeToast("Evenement créé avec success")
        this.$store.state.evenemts[this.nom] = response.data
        localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
        this.user.quantite_credit -= this.nb_places
        this.$router.push("/events")
      }).catch((error) => {
        this.errorOrRefresh(error, this.postEvent)
      });
    }
  }
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.ion-no-padding, .place, .field{
  margin: 10px;
}
textarea{
  width: 100%;
}
.image{
  width: 100%;
  height: 150px;
  background-color: #eee;
  margin: 10px 0;
  overflow: hidden;
  position: relative;
}
.image img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
input[type=file]{
  display: none;
}
.field>*{
  display: block;
  width: 100%;
}
.place{
  width: calc(100% - 20px);
  display: flex;
  margin-bottom: 10px;
}
.place>*{
  width: 70px;
  border: none;
}
.place .nom{
  flex-grow: 1;
  margin-right: 10px;
  border-radius: 20px 0 0 20px;
}
input.nom{
  padding: 10px 30px;
}
input.nombre{
  padding: 10px 20px;
}
.place input{
  height: 40px;
}
.place .nombre{
  text-align: center;
  border-radius: 0 20px 20px 0;
}
.button{
  display: block;
  text-align: center;
}
.options{
  display: flex;
  justify-content: space-between;
}
.options ion-button{
  height: 40px;
}
.dates{
  padding: 10px 0 10px 0;
}
.dates ion-label{
  margin: 5px 0 20px 0;
}
.dates div{
  margin-top: -15px;
}
.multiline{
  border-radius: 30px !important;
  padding-left: 30px !important;
  font-size: 0.9em;
  border: 1px solid #ffffff;
  border-bottom: 0px !important;
  box-shadow: none !important;
  background-color: white;
  height: 70px;
}
ion-item.multiline::part(native) {
  background: #fff0;
  border-bottom: 0;
  margin-top: 5px;
}
</style>