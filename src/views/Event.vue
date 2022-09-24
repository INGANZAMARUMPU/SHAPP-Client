<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPP</ion-title>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/">
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
      <ion-item class="round ion-no-padding">
        <ion-label>Date de l’événement (*)</ion-label>
        <ion-input id="date" class="ion-text-end" :value="formatedDate(date)"/>
        <ion-popover trigger="date" size="cover">
          <ion-datetime
            @ionChange="chooseDate"
            presentation="date"
            :min="min_date"
            :max="max_date"
            :value="date"/>
        </ion-popover>
      </ion-item>
      <ion-item class="round ion-no-padding">
        <ion-label>L'heure de l’événement (*)</ion-label>
        <ion-input id="time" class="ion-text-end" :value="formatedDate(date)"/>
        <ion-popover trigger="time" size="cover">
          <ion-datetime
            @ionChange="chooseDate"
            presentation="time"
            :min="min_date"
            :max="max_date"
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
    
      <input
        type="file" id="image"
        accept=".JPEG, .PNG, .JPG"
        @change="e => loadImage(e)">
      <ion-button class="ion-no-padding" expand=full @click="chooseImage">
        <ion-icon :src="getIcon('cameraOutline')"
          style="margin-right: 5px;"/>
        selectionner image
      </ion-button>
      <div class="image" v-show="image_base64">
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
      <ion-col class="options">
        <ion-button expand="full" size="small" routerLink="/">
          ANULLER
        </ion-button>
        <ion-button expand="full" size="small" @click="save">
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
      address:"",
      time:"",
      email:"",
      image:"",
      image_name:"",
      image_type:"",
      image_base64:"",
      places:[
        { nom:"principal", nombre:1 }
      ],
      tel_1:"",
      tel_2:"",
    }
  },
  computed:{
    nb_places(){
      return this.places.reduce((acc, x) =>{
        return acc += x.nombre
      }, 0)
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
    loadImage(event){
      let file = event.target.files[0]
      this.image_name = file.name
      this.image_type = file.type
      if (file.size>300_000) {
        this.logs = "l'image ne peut pas depasser 300ko"
      } else {
        this.logs = ""
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
    save(){
      let data = {
        image:this.image,
        nom: this.nom,
        date: this.date,
        address: this.address,
        time: this.time,
        email: this.email,
        image_name: this.image_name,
        image_type: this.image_type,
        image_base64: this.image_base64,
        places:this.places,
        tel_1: this.tel_1,
        tel_2: this.tel_2,
        email: this.email
      }
      if(this.$store.state.evenemts == null){
        this.$store.state.evenemts = {}
      }
      this.$store.state.evenemts[this.nom] = data
      localStorage['evenemts'] = JSON.stringify(this.$store.state.evenemts)
      this.$emit("close")
    }
  }
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.ion-no-padding, .place{
  margin: 10px;
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
.place input{
  padding: 5px 10px;
}
.place>*{
  width: 70px;
}
.place .nom{
  flex-grow: 1;
  margin-right: 10px;
}
.place .nombre{
  text-align: center;
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
</style>