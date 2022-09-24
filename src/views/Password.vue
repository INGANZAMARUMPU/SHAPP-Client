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
    <ion-content class="ion-no-padding">
      <div class="rectangle">
        <div class="cercle">
          <img class="un" src="/logo.png">
        </div>
        <h3>
          Bienvenue {{ user.usename }}
        </h3>
      </div>
      <h3>Vous pouvez modifier votre mot de passe ici</h3>
      <div class="ion-padding">
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez votre ancien mot de passe (*)</ion-label>
          <ion-input type=password
            placeholder="Tapez votre ancien mot de passe (*)"
            :value="old_password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez le nouveau mot de passe (*)</ion-label>
          <ion-input type=password
            placeholder="Tapez le nouveau mot de passe (*)"
            :value="new_password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Confirmez le nouveau mot de passe (*)</ion-label>
          <ion-input type=password
            placeholder="Confirmez le nouveau mot de passe (*)"
            :value="confir_password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-button expand="full" @click="changePassword" style="margin-top: 40px;">
          <ion-spinner v-if="loging_in"
            name="crescent" color="light" style="margin: 0 10px;"/>
          S'identifier
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  data(){
    return {
      old_password:"",
      new_password:"",
      confir_password:""
    }
  },
  methods:{
    changePassword(){
    }
  }
}
</script>
<style scoped>
.rectangle{
  position: relative;
  top: -40px;
  background-color: var(--ion-color-primary);
  padding: 20px 0 10px 0;
}
.rectangle h3{
  color: white;
}
.cercle{
  border-color: var(--secondary-color);
}
.ion-padding{
  padding: 20px;
}
.ion-padding>*{
  margin-bottom: 10px;
}
</style>