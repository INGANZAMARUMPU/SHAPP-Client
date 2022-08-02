<template>
  <ion-page>
    <ion-content>
    <div class="logo">
      <img class="un" src="/logo.png">
      <img class="deux" src="/logo.png">
      <img class="un" src="/logo.png">
    </div>
    <div class="form">
      <div class="cercle">
        <ion-icon :src="getIcon('person')" />
      </div>
      <h3>LOGIN</h3>
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password"
        v-model="password" @keyup.enter="login">
      <ion-button expand="block" @click="login">
        <ion-spinner v-if="loging_in"
          name="crescent" color="light" style="margin: 0 10px;"/>
        CONNEXION
      </ion-button>
      <div>
        Besoin d'un compte?
        <br>
        <ion-button fill="clear"
          size="small" color="primary"
          routerLink="/profile">
          s'incrire
        </ion-button>
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
  padding: 40px 30px 0 30px;
}
h3{
  color: var(--ion-color-primary);
}
.form>*{
  display: block;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
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
.form>input{
  border: 2px solid var(--ion-color-primary);
  padding: 5px 0;
  border-radius: 5px;
}
</style>