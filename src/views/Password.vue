<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SHAPPU</ion-title>
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
        <h3>Modifier votre mot de passe ici</h3>
      </div>
      <div class="ion-padding">
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez votre ancien mot de passe (*)</ion-label>
          <ion-input type=password
            placeholder="Tapez votre ancien mot de passe (*)"
            :value="old_password"
            @IonChange="old_password=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Tapez le nouveau mot de passe (*)</ion-label>
          <ion-input type=password
            placeholder="Tapez le nouveau mot de passe (*)"
            :value="new_password"
            @IonChange="new_password=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="round ion-no-padding">
          <ion-label position="floating">Confirmez le nouveau mot de passe (*)</ion-label>
          <ion-input type=password
            placeholder="Confirmez le nouveau mot de passe (*)"
            :value="confirm_password"
            @IonChange="confirm_password=$event.target.value" clearInput/>
        </ion-item>
        <ion-button expand="full" @click="changePassword" style="margin-top: 40px;">
          <ion-spinner v-if="loging_in"
            name="crescent" color="light" style="margin: 0 10px;"/>
          Confirmer
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
      confirm_password:"",
      loging_in: false
    }
  },
  methods:{
    changePassword(){
      if(!this.new_password || !this.confirm_password || !this.old_password){
        this.makeToast("Erreur", "tout les champs sont requis")
        return
      }
      if(this.new_password!=this.confirm_password){
        this.makeToast("Erreur", "le mot de passe que vous avez tapé n'est pas confirmé")
        return
      }
      let data = new FormData()
      data.append("oldPassword", this.old_password)
      data.append("newPassword", this.new_password)
      data.append("confirmNewPassword", this.confirm_password)
      
      axios.put(this.url+`/password/update`, data, this.headers)
      .then((response) => {
        this.makeToast(response.data)
        this.$router.push("/events")
      }).catch((error) => {
        this.errorOrRefresh(error, this.postEvent)
      });
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
  padding: 0 20px 20px 20px;
}
.ion-padding>*{
  margin-bottom: 10px;
}
</style>