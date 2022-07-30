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
            <h5>{{ item.pays }} {{ item.telephone }}</h5>        
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
              :value="pays"
              @IonChange="pays=$event.target.value"
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
              type="text" v-model="pays"
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
          </div>
          <ion-button expand=full v-else @click="sendOTP">
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
      pays:"",
      code_sent:false
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
    changePhoneNumber(){
      let user = JSON.parse(localStorage.getItem("unvalidated_user"))
      user.pays = this.pays
      this.item.pays = this.pays
      user.telephone = this.telephone
      this.item.telephone = this.telephone
      localStorage["unvalidated_user"] = JSON.stringify(user)
      this.changing = false
    },
    sendOTP(){
      console.log('Receiving CODE')
      this.code_sent = true
      let user = JSON.parse(localStorage.getItem("unvalidated_user"))
      user.code_sent = this.code_sent
      localStorage["unvalidated_user"] = JSON.stringify(user)
    },
    checkOTP(){
      let data = {
        phone: this.item.pays+this.item.telephone,
        otp: this.confirm_code
      }
      axios.post(this.url+"/verifyotp", data)
      .then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.error(error);
      })
    }
  },
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
</style>