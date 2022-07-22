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
            @IonChange="nom=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Prenom</ion-label>
          <ion-input type="text"
            placeholder="Prenom"
            @IonChange="prenom=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Pays</ion-label>
          <ion-select
            multiple="false"
            @IonChange="pays=$event.target.value"
            cancel-text="laisser" ok-text="Choisir">
            <ion-select-option value="+250">
              Rwanda
            </ion-select-option>
            <ion-select-option value="+256">
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
            @IonChange="username=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input type=password
            placeholder="Password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <br>
        <ion-button color="primary" expand="block" @click="save">
          Valider
        </ion-button>
      </ion-col>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {
      nom: "",
      prenom: "",
      telephone: "",
      username: "",
      password: "",
      pays:""
    }
  },
  methods:{
    save(){
      this.makeToast("Success", "Votre compte sera bientôt valider après paiement")
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
