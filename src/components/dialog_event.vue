<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Evenement</h3>
      <div class="content">
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Nom de l'evenement</ion-label>
          <ion-input type="text" 
            placeholder="Nom de l'evenement"
            @IonChange="nom=$event.target.value"
            :value="nom" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Date de l'evenement</ion-label>
          <ion-input type="date" 
            placeholder="Date de l'evenement"
            @IonChange="date=$event.target.value"
            :value="date"
            :min="new Date().toISOString().split('T')[0]" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Addresse de l'evenement</ion-label>
          <ion-input type="text" 
            placeholder="Addresse de l'evenement"
            @IonChange="address=$event.target.value"
            :value="address" clearInput/>
        </ion-item>
        <input
          type="file" id="image"
          accept=".JPEG, .PNG, .JPG"
          @change="e => loadImage(e)">
        <ion-col  class="ion-no-padding">
          <ion-button expand=full @click="chooseImage">
            <ion-icon :src="getIcon('cameraOutline')"
              style="margin-right: 5px;"/>
            selectionner image
          </ion-button>
        </ion-col>
        <div class="image">
          <img src="" alt="" id="image_preview">
        </div>
        <div class="field">
          <label>Details</label>
          <textarea rows="4" 
            placeholder="Details"
            v-model="details"/>
        </div>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Numero de telephone</ion-label>
          <ion-input type="text" 
            placeholder="Numero de telephone"
            @IonChange="tel_1=$event.target.value"
            :value="tel_1" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Numero de telephone 2</ion-label>
          <ion-input type="text" 
            placeholder="Numero de telephone"
            @IonChange="tel_2=$event.target.value"
            :value="tel_2" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">E-mail</ion-label>
          <ion-input type="email" 
            placeholder="E-mail"
            @IonChange="email=$event.target.value"
            :value="email" clearInput/>
        </ion-item>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          ANULLER
        </ion-button>
        <ion-button fill=clear @click="save">VALIDER</ion-button>
      </ion-col>
    </div>
  </div>
</template>

<script >
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
      image:"",
      image_name:"",
      image_type:"",
      image_base64:"",
      details:"",
      tel_1:"",
      tel_2:"",
      email:""
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
          image_preview.src = fr.result;
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
        image:null,
        nom: this.nom,
        date: this.date,
        address: this.address,
        image_name: this.image_name,
        image_type: this.image_type,
        image_base64: this.image_base64,
        details: this.details,
        tel_1: this.tel_1,
        tel_2: this.tel_2,
        email: this.email
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
</style>