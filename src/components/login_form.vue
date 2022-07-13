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
      this.$store.state.user = {
        username: this.username,
        password: this.password
      }
      // this.logs = ""
      // this.loging_in = true
      // axios.post(this.url+"/login/", 
      //   {"username": this.username, "password":this.password}
      // ).then((response) => {
      //   this.$store.state.user = response.data
      //   this.$store.state.user.username = this.username
      // }).catch((error) => {
      //   console.log(error)
      //   this.logs = this.cleanString(error.response.data)
      // }).finally(() => {
      //   this.loging_in = false
      // })
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