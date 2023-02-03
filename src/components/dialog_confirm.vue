<template>
  <div class="dialog" v-if="active">
    <div class="body ion-padding">
      <h3>Confirmation</h3>
      <div class="content">
        <div>
          <p>
            Une code de confirmation de 6 chiffres 
            {{ code_sent?"a été":"sera" }}
            envoyé au numero
          </p>
          <ion-col class="phone">
            <h5>{{ item.codePays }} {{ item.telephone }}</h5>        
            <ion-button fill=clear size="small"
              @click="toggleChangePhoneNumber"
              v-if="!code_sent"
              color="secondary" class="ion-no-padding">
              {{ changing?'laisser':'changer' }}
            </ion-button>
          </ion-col>
        </div>
        <div v-if="changing">
          <ion-item class="ion-no-padding">
            <ion-label position="floating">Pays</ion-label>
            <ion-select
              multiple="false"
              :value="codePays"
              @IonChange="codePays=$event.target.value"
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
          <div style="display: flex; padding: 10px 0;">
            <input
              type="text" v-model="codePays"
              style="text-align: center;width:90px; margin-right: 5px;">
            <input
              type="tel" v-model="telephone"
              placeholder="Numéro de télephone" 
              style="padding: 5px 10px; width:100px; flex-grow: 1;">
          </div>
        </div>
        <ion-col class="ion-no-padding" v-else>
          <div v-if="code_sent">
            <p>Veuillez saisir le code ici</p>
            <input type="text" name="" placeholder="------"
              class="confirm" v-model="confirm_code">
            <div class="right">
              {{ remaining }}
            </div>
          </div>
          <ion-button expand=full v-else @click="sendOTP">
            <ion-spinner v-if="sending_otp"
              name="crescent" color="light" style="margin: 0 10px;"/>
            recevoir le code
          </ion-button>
        </ion-col>
      </div>
      <ion-col class="options">
        <ion-button fill=clear color="medium" @click="close">
          Quitter
        </ion-button>
        <ion-button fill=clear v-show="changing" @click="changePhoneNumber">
          Changer
        </ion-button>
        <ion-button fill=clear @click="checkOTP"  v-show="!changing">
          Verifier
        </ion-button>
      </ion-col>
      <ion-spinner
        v-if="checking_otp"
        name="crescent"
        color="primary"
        class="centered"/>
    </div>
  </div>
</template>

<script>
import { popoverController } from '@ionic/vue';

export default {
  props: {
    active:{type:Boolean, required:true},
    item:{type:Object, required:false}
  },
  data(){
    return {
      confirm_code: "",
      changing: false,
      new_phone_number:"",
      telephone: "",
      codePays:"",
      code_sent:!!this.item?this.item.code_sent:false,
      sending_otp:false,
      checking_otp:false,
      remaining:60
    }
  },
  watch:{
    confirm_code(new_val){
      if(new_val.length > 6){
        this.confirm_code = new_val.substring(0, 6)
      }
    },
    item(new_val){
      if(!!new_val){
        this.code_sent = new_val.code_sent
        this.codePays = new_val.codePays
        this.telephone = new_val.telephone
      }
    },
    active(new_val){
      if(this.code_sent){
        this.countDown()
      }
    },
    code_sent(new_val){
      let user = JSON.parse(localStorage.getItem("unvalidated_user"))
      user.code_sent = this.code_sent
      localStorage["unvalidated_user"] = JSON.stringify(user)
      if(new_val){
        this.countDown()
      }
    }
  },
  methods: {
    close(){

      this.$emit("close")
    },
    save(){
    },
    toggleChangePhoneNumber(){
      this.changing = !this.changing
    },
    countDown(){
      let vue = this
      let counter = window.setInterval(() => {
        vue.remaining -= 1
        if(vue.remaining == 0){
          window.clearInterval(counter)
          vue.code_sent = false
          vue.sending_otp = false
        }
      },1000)
    },
    changePhoneNumber(){
      let user = JSON.parse(localStorage.getItem("unvalidated_user"))
      user.codePays = this.codePays
      this.item.codePays = this.codePays
      user.telephone = this.telephone
      this.item.telephone = this.telephone
      localStorage["unvalidated_user"] = JSON.stringify(user)
      this.changing = false
    },
    sendOTP(){
      this.sending_otp = true

      let data = new FormData()
      data.append("phone", this.item.codePays + this.item.telephone)

      axios.post(this.url+"/sendotp", data, this.formHeaders)
      .then((response) => {      
        this.code_sent = true
      }).catch((error) => {
        console.error(error);
        this.makeToast("erreur", error.response.data)
      }).finally(() => {
        this.sending_otp = false
      })
    },
    checkOTP(){
      if(this.confirm_code.length != 6){
        this.makeToast("Veuillez saisir un code valide")
        return
      }
      this.sending_otp = true
      
      let data = new FormData()
      data.append("phone", this.item.codePays + this.item.telephone)
      data.append("otp", this.confirm_code)

      axios.post(this.url+"/verifyotp", data)
      .then((response) => {
        this.makeToast("success", response.data)
        this.postUser()
      }).catch((error) => {
        console.error(error);
        this.makeToast("erreur", error.response.data)
      }).finally(() => {
        this.sending_otp = false
      })
    },
    postUser(){
      this.sending_otp = true
      let data = JSON.parse(JSON.stringify(this.item))
      delete(data["code_sent"])
      axios.post(this.url+"/user/register", data, this.force_json)
      .then((response) => {
        this.makeToast("success", response.data)
        this.login()
      }).catch((error) => {
        console.error(error);
        this.makeToast("erreur", error.response.data)
        this.sending_otp = false
      })
    },
    login(){
      let data = new FormData()
      data.append("username", this.item.username)
      data.append("password", this.item.password)

      axios.post(this.url+"/login", data)
      .then((response) => {
        this.makeToast("logged in successfully")
        this.$store.state.user = response.data
        this.$store.state.user.username = this.item.username
      }).catch((error) => {
        console.log(error)
        this.makeToast("auto login failed")
      }).finally(() => {
        this.$router.push("/")
        this.item = null
        localStorage.removeItem("unvalidated_user")
      })
    },
  },
  mounted(){
    if(this.code_sent){
      this.countDown()
    }
  }
};
</script>
<style scoped>
.options{
  padding-bottom: 0;
}
.ion-padding{
  padding-bottom: 5px;
}
.body{
  overflow-y: hidden;
}
input{
  width: 100%;
  font-size: 1.2em;
  padding: 5px 15px;
  text-align: center;
}
.phone{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h5{
  margin: 0;
}
.confirm{
  text-align: center;
  letter-spacing: 10px;
  font-size: 1.5em;
}
.centered{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  height: 50px;
  width: 50px;
}
.right{
  text-align: right;
  font-size: .8em;
  color: var(--ion-color-primary);
}
</style>