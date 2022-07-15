<template>
  <ion-page>
    <ion-content>
    <div class="form">
      <div class="cercle">
        <ion-icon :src="getIcon('person')" />
      </div>
      <h3>LOGIN</h3>
      <input type="text" placeholder="Username">
      <input type="text" placeholder="Password">
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
      username:"", password:"", logs:"", loging_in:false,
    }
  },
  methods:{
    login(){
      this.$store.state.user = {
        username: this.username,
        password: this.password
      }
      if(this.$route.path == "/login"){
        this.$router.push("/")
      } else {
        this.$router.push(this.$route.path)
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