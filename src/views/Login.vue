<template>
  <ion-page>
    <ion-content>
    <div class="logo">
      <img class="un" src="/logo.png">
      <img class="deux" src="/logo.png">
      <img class="un" src="/logo.png">
    </div>
    <div class="form">
      <h3>Content de te revoir !</h3>
      <div class="cercle">
        <img class="un" src="/logo.png">
      </div>
      <br><br>
      <ion-item class="ion-no-padding">
        <ion-label position="floating">Tapez Nom d’utilisateur (*)</ion-label>
        <ion-input type="text"
          placeholder="Tapez Nom d’utilisateur (*)"
          :value="username"
          @IonChange="username=$event.target.value"
          clearInput/>
      </ion-item>
      <ion-item class="ion-no-padding">
        <ion-label position="floating">Tapez Mot de passe (*)</ion-label>
        <ion-input type=password
          placeholder="Tapez Mot de passe (*)"
          :value="password"
          @IonChange="password=$event.target.value" clearInput/>
      </ion-item>
      <ion-button expand="full" @click="login">
        <ion-spinner v-if="loging_in"
          name="crescent" color="light" style="margin: 0 10px;"/>
        S'identifier
      </ion-button>
      <div class="center">
        Besoin d'un compte?
        <ion-button fill="clear"
          class="ion-no-padding link"
          size="small" color="primary"
          routerLink="/profile">
          s'incrire
        </ion-button>
      </div>
      <div class="center" style="margin-top: 30px;">
        <a class="url" href="https://shapp.jkm-tech.com" target="_blank">
          Visitez : https://shapp.jkm-tech.com
        </a>
      </div>
    </div>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {
      username:"", password:"", loging_in:false,
    }
  },
  methods:{
    login(){
      this.loging_in = true
      if(this.username.length < 3 || this.password.length < 3){
        console.log(this.username, this.password)
        this.makeToast("Vous devez saisir tout ces champs")
        return
      }
      
      let data = new FormData()
      data.append("username", this.username)
      data.append("password", this.password)

      axios.post(this.url+"/login", data)
      .then((response) => {
        this.$store.state.user = response.data
        this.$store.state.user.username = this.username
        if(this.$route.path == "/login"){
          this.$router.push("/")
        } else {
          this.$router.push(this.$route.path)
        }
      }).catch((error) => {
        console.log(error)
        this.makeToast("username or password are incorrect")
      }).finally(() => {
        this.loging_in = false
      })
    },
  }
}
</script>
<style scoped>
.logo{
  position: fixed;
  opacity: .1;
  top: 0;
  z-index: -1;
}
.logo .un{
  transform: rotate(40deg) scale(1.5);
}
.logo .deux{
  transform: scale(1.5);
}
.form {
  padding: 40px 30px 30px 30px;
}
h3{
  font-weight: 700;
}
.form>*{
  margin-bottom: 20px;
}
.cercle{
  width: 120px;
  height: 120px;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin: 40px auto 0 auto;
  padding-top: 10px;
  border: 2px solid white;
  box-shadow: 0 0 0 2px var(--ion-color-primary);
}
.cercle>*{
  font-size: 8em;
  margin-left: -5px;
  color: var(--ion-color-primary);
}
.center{
  text-align: center;
}
</style>