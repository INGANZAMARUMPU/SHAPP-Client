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
      <ion-list>
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
          <ion-label position="floating">Telephone</ion-label>
          <ion-input type="text"
            placeholder="Telephone"
            @IonChange="telephone=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item-divider color="light">INFORMATIONS DE CONNEXION</ion-item-divider>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">OBR Username</ion-label>
          <ion-input type="text"
            placeholder="nom d'utilisateur OBR"
            @IonChange="username=$event.target.value"
            clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Password</ion-label>
          <ion-input type=password
            placeholder="Password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-button color="primary" expand="block" @click="save">
          Valider
        </ion-button>
      </ion-list>
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
.kiosk{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.licence{
  color: green;
  margin-top: 10px;
}
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
</style>
