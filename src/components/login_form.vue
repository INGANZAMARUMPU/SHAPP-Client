<template>
  <ion-page>
    <ion-content>
    <ion-col class="center-h ion-padding">
      <ion-col class="center">
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Username</ion-label>
          <ion-input type=text placeholder="Username"
            @IonChange="username=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Password</ion-label>
          <ion-input type=password placeholder="Password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-label color="danger">{{ logs }}</ion-label>
        <ion-button expand="block" @click="login">
          <ion-spinner v-if="loging_in"
            name="crescent" color="light" style="margin: 0 10px;"/>
          CONNEXION
        </ion-button>
      </ion-col>
    </ion-col>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {
      username:"", password:"", logs:"", loging_in:false
    }
  },
  methods:{
    login(){
      this.logs = ""
      this.loging_in = true
      axios.post(this.url+"/login/", 
        {"username": this.username, "password":this.password}
      ).then((response) => {
        let active_kiosk = JSON.parse(localStorage.getItem("active_kiosk"))
        if(active_kiosk){
          let ids = response.data.kiosks.map(x => x.id)
          if(!ids.includes(active_kiosk.id)){
            this.logs = `Seul les utilisateurs du kiosk "${active_kiosk.nom}" peuvent se connecter`
            return
          }
        }
        this.$store.state.user = response.data
        this.$store.state.user.username = this.username
      }).catch((error) => {
        console.log(error)
        this.logs = this.cleanString(error.response.data)
      }).finally(() => {
        this.loging_in = false
      })
    },
  }
}
</script>
<style>
.center-h{
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
}
</style>