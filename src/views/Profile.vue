<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button slot="start" routerLink="/login">
              <ion-icon :src="getIcon('arrowBack')"></ion-icon>
            </ion-button>
          </ion-buttons>
        <ion-title>SHAPP</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h3>Créez Votre profile SHAPP</h3>
      <ion-col>
        <ion-item-divider color="light">PROFILE BASIC</ion-item-divider>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Nom</ion-label>
          <ion-input type="text"
            placeholder="Nom"
            :value="nom"
            @IonChange="nom=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Prenom</ion-label>
          <ion-input type="text"
            placeholder="Prenom"
            :value="prenom"
            @IonChange="prenom=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Pays</ion-label>
          <ion-select
            multiple="false"
            :value="pays"
            @IonChange="pays=$event.target.value"
            cancel-text="laisser" ok-text="Choisir">
            <ion-select-option value="+250">
              Rwanda
            </ion-select-option>
            <ion-select-option value="+243">
              RDC
            </ion-select-option>
            <ion-select-option value="+257">
              Burundi
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div style="display: flex; padding: 10px;">
          <input
            type="text" v-model="pays"
            style="text-align: center;width:70px; margin-right: 5px;">
          <input
            type="tel" v-model="telephone"
            placeholder="Numéro de télephone" 
            style="padding: 5px 10px; width:100px; flex-grow: 1;">
        </div>
        <br>
        <ion-item-divider color="light">INFORMATIONS DE CONNEXION</ion-item-divider>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Nom d'utilisateur</ion-label>
          <ion-input type="text"
            placeholder="Username"
            :value="username"
            @IonChange="username=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input type=password
            placeholder="Password"
            :value="password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <br>
        <ion-button color="primary" expand="block" @click="save">
          Valider
        </ion-button>
      </ion-col>
    </ion-content>
    <DialogConfirm
      :active = "confirm_shown"
      :item = "unvalidated_user"
      @close = "close"/>
  </ion-page>
</template>

<script>
import DialogConfirm from '../components/dialog_confirm'

export default {
  components:{
    DialogConfirm,
  },
  data(){
    return {
      nom: "",
      prenom: "",
      telephone: "",
      username: "",
      password: "",
      pays:"",
      unvalidated_user:null,
      confirm_shown: false
    }
  },
  methods:{
    close(){
      this.$router.push("/login")
    },
    save(){
      this.makeToast("Success", "Votre compte sera bientôt valider après paiement")
      this.unvalidated_user = {      
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.telephone,
        username: this.username,
        password: this.password,
        pays: this.pays
      }
      localStorage["unvalidated_user"] = JSON.stringify(this.unvalidated_user)
    }
  },
  mounted(){
    let str_unvalidated_user = localStorage["unvalidated_user"]
    if(!!str_unvalidated_user){
      this.unvalidated_user = JSON.parse(str_unvalidated_user)
      this.nom = this.unvalidated_user.nom
      this.prenom = this.unvalidated_user.prenom
      this.telephone = this.unvalidated_user.telephone
      this.username = this.unvalidated_user.username
      this.password = this.unvalidated_user.password
      this.pays = this.unvalidated_user.pays

      this.confirm_shown = true
    }
  }
}
</script>
<style scoped>
ion-button{
  margin: 10px;
}
ion-label label{
  font-weight: 650;
}
.descr{
  white-space: wrap!important;
}
h3{
  text-align: center;
}
.ion-no-padding{
  margin: 0 10px;
}
input, select{
  padding: 5 10px!important;
}
</style>
